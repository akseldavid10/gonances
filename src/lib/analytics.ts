import { Prisma } from "@/generated/prisma/client";
import { valuedTransactions } from "@/lib/historical-exchange-rates";
import { prisma } from "@/lib/prisma";

export async function getMonthlyAnalytics(userId: string, now = new Date()) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { currency: true },
  });
  if (!user) throw new Error("Usuario no encontrado");
  const records = await valuedTransactions(
    await prisma.transaction.findMany({
      where: { userId },
      include: { category: true },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    }),
    user.currency,
  );
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const start = new Date(Date.UTC(year, month - 5, 1));
  const end = new Date(Date.UTC(year, month + 1, 1));
  const sum = (rows: typeof records, type: "INCOME" | "EXPENSE") =>
    rows
      .filter((r) => r.type === type)
      .reduce((total, r) => total.plus(r.displayAmount), new Prisma.Decimal(0));
  const monthRows = (y: number, m: number) =>
    records.filter(
      (r) => r.date.getUTCFullYear() === y && r.date.getUTCMonth() === m,
    );
  const current = monthRows(year, month);
  const trends = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(Date.UTC(year, month - 5 + index, 15));
    const y = date.getUTCFullYear();
    const m = date.getUTCMonth();
    const rows = monthRows(y, m);
    return {
      key: `${y}-${m}`,
      year: y,
      month: m,
      label: new Intl.DateTimeFormat("es", {
        month: "short",
        timeZone: "UTC",
      }).format(date),
      incomes: sum(rows, "INCOME").toNumber(),
      expenses: sum(rows, "EXPENSE").toNumber(),
    };
  });
  const groups = new Map<
    string,
    { name: string; color: string; amount: Prisma.Decimal }
  >();
  for (const record of records) {
    if (record.type !== "EXPENSE" || record.date < start || record.date >= end)
      continue;
    const row = groups.get(record.categoryId) ?? {
      name: record.category.name,
      color: record.category.color,
      amount: new Prisma.Decimal(0),
    };
    row.amount = row.amount.plus(record.displayAmount);
    groups.set(record.categoryId, row);
  }
  const total = [...groups.values()].reduce(
    (s, r) => s.plus(r.amount),
    new Prisma.Decimal(0),
  );
  return {
    summary: {
      total_balance: sum(records, "INCOME")
        .minus(sum(records, "EXPENSE"))
        .toNumber(),
      total_incomes: sum(current, "INCOME").toNumber(),
      total_expenses: sum(current, "EXPENSE").toNumber(),
    },
    monthlyTrends: trends,
    expensesByCategory: [...groups.entries()]
      .map(([categoryId, row]) => ({
        categoryId,
        category: row.name,
        color: row.color,
        amount: row.amount.toNumber(),
        percentage: total.isZero()
          ? 0
          : row.amount.div(total).times(100).toDecimalPlaces(1).toNumber(),
      }))
      .sort((a, b) => b.amount - a.amount),
    currentMonthExpenses: sum(current, "EXPENSE").toNumber(),
    currency: user.currency,
    windowStart: start,
    records,
    monthCount: current.length,
  };
}
