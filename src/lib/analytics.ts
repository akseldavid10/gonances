import { convertedNumber, getExchangeRate } from "@/lib/exchange-rates";
import { prisma } from "@/lib/prisma";

export async function getRecentTransactions(userId: string, now = new Date()) {
  const start = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 5, 1),
  );
  const end = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1),
  );
  const records = await prisma.transaction.findMany({
    where: { userId, date: { gte: start, lt: end } },
    include: { category: true },
    orderBy: { date: "asc" },
  });
  return records;
}

export async function getMonthlyAnalytics(userId: string, now = new Date()) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { currency: true },
  });
  if (!user) throw new Error("Usuario no encontrado");
  const { rate } = await getExchangeRate(user.currency);
  const start = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 5, 1),
  );
  const records = await getRecentTransactions(userId, now);
  const trends = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 5 + index, 15),
    );
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const monthRecords = records.filter(
      (record) =>
        record.date.getUTCFullYear() === year &&
        record.date.getUTCMonth() === month,
    );
    const incomes = monthRecords
      .filter((record) => record.type === "INCOME")
      .reduce((sum, record) => sum + record.amount.toNumber(), 0);
    const expenses = monthRecords
      .filter((record) => record.type === "EXPENSE")
      .reduce((sum, record) => sum + record.amount.toNumber(), 0);
    return {
      key: `${year}-${month}`,
      year,
      month,
      label: new Intl.DateTimeFormat("es", {
        month: "short",
        timeZone: "UTC",
      }).format(date),
      incomes: convertedNumber(incomes, rate),
      expenses: convertedNumber(expenses, rate),
    };
  });

  const grouped = new Map<
    string,
    { name: string; color: string; amount: number }
  >();
  for (const record of records) {
    if (record.type !== "EXPENSE" || record.category.type !== "EXPENSE")
      continue;
    const group = grouped.get(record.categoryId) ?? {
      name: record.category.name,
      color: record.category.color,
      amount: 0,
    };
    group.amount += record.amount.toNumber();
    grouped.set(record.categoryId, group);
  }
  const totalExpenses = [...grouped.values()].reduce(
    (sum, category) => sum + category.amount,
    0,
  );
  const expensesByCategory = [...grouped.entries()]
    .map(([categoryId, category]) => ({
      categoryId,
      category: category.name,
      color: category.color,
      amount: convertedNumber(category.amount, rate),
      percentage:
        totalExpenses === 0
          ? 0
          : Math.round((category.amount / totalExpenses) * 1000) / 10,
    }))
    .sort((a, b) => b.amount - a.amount);

  const [lifetimeGroups, currentMonthGroups] = await Promise.all([
    prisma.transaction.groupBy({
      by: ["type"],
      where: { userId },
      _sum: { amount: true },
    }),
    prisma.transaction.groupBy({
      by: ["type"],
      where: {
        userId,
        date: {
          gte: new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)),
          lt: new Date(
            Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1),
          ),
        },
      },
      _sum: { amount: true },
    }),
  ]);
  const sumFor = (groups: typeof lifetimeGroups, type: "INCOME" | "EXPENSE") =>
    groups.find((group) => group.type === type)?._sum.amount?.toNumber() ?? 0;

  const incomes = sumFor(currentMonthGroups, "INCOME");
  const expenses = sumFor(currentMonthGroups, "EXPENSE");

  return {
    summary: {
      total_balance: convertedNumber(
        sumFor(lifetimeGroups, "INCOME") - sumFor(lifetimeGroups, "EXPENSE"),
        rate,
      ),
      total_incomes: convertedNumber(incomes, rate),
      total_expenses: convertedNumber(expenses, rate),
    },
    monthlyTrends: trends,
    expensesByCategory,
    currentMonthExpenses: convertedNumber(expenses, rate),
    currency: user.currency,
    windowStart: start,
  };
}
