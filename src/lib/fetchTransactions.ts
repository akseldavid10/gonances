import type { MovementType } from "@/generated/prisma/client";
import {
  expensesByCategory,
  monthlyTrends,
  type Transaction,
} from "@/lib/data";
import { convertedNumber, getExchangeRate } from "@/lib/exchange-rates";
import getInfoToken from "@/lib/getInfoToken";
import { prisma } from "@/lib/prisma";

function serializeTransaction(
  transaction: Awaited<ReturnType<typeof recentTransactions>>[number],
  rate: Parameters<typeof convertedNumber>[1],
): Transaction {
  return {
    id: transaction.id,
    amount: convertedNumber(transaction.amount, rate),
    type: transaction.type,
    description: transaction.description,
    date: transaction.date.toISOString().slice(0, 10),
    categoryId: transaction.categoryId,
    category: {
      name: transaction.category.name,
      color: transaction.category.color,
      icon: transaction.category.icon ?? "Wallet",
      type: transaction.category.type,
      isCustom: transaction.category.userId !== null,
    },
  };
}

function recentTransactions(userId: string, start: Date, end: Date) {
  return prisma.transaction.findMany({
    where: { userId, date: { gte: start, lt: end } },
    include: { category: true },
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
  });
}

export async function fetchDashboardData(referenceDate = new Date()) {
  const payload = await getInfoToken();
  if (typeof payload?.sub !== "string") throw new Error("No autenticado");

  const userId = payload.sub;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { currency: true },
  });
  if (!user) throw new Error("Usuario no encontrado");
  const { rate } = await getExchangeRate(user.currency);
  const year = referenceDate.getUTCFullYear();
  const month = referenceDate.getUTCMonth();
  const monthStart = new Date(Date.UTC(year, month, 1));
  const nextMonth = new Date(Date.UTC(year, month + 1, 1));
  const trendStart = new Date(Date.UTC(year, month - 5, 1));
  const [lifetime, current, monthCount, trendRecords, latest] =
    await Promise.all([
      prisma.transaction.groupBy({
        by: ["type"],
        where: { userId },
        _sum: { amount: true },
      }),
      prisma.transaction.groupBy({
        by: ["type"],
        where: { userId, date: { gte: monthStart, lt: nextMonth } },
        _sum: { amount: true },
      }),
      prisma.transaction.count({
        where: { userId, date: { gte: monthStart, lt: nextMonth } },
      }),
      recentTransactions(userId, trendStart, nextMonth),
      prisma.transaction.findMany({
        where: { userId },
        include: { category: true },
        orderBy: [{ date: "desc" }, { createdAt: "desc" }],
        take: 8,
      }),
    ]);
  const sum = (groups: typeof lifetime, type: MovementType) =>
    groups.find((group) => group.type === type)?._sum.amount?.toNumber() ?? 0;
  const trendsInput = trendRecords.map((transaction) =>
    serializeTransaction(transaction, rate),
  );
  const currentTransactions = trendsInput.filter((transaction) =>
    transaction.date.startsWith(
      `${year}-${String(month + 1).padStart(2, "0")}-`,
    ),
  );

  return {
    summary: {
      balance: convertedNumber(
        sum(lifetime, "INCOME") - sum(lifetime, "EXPENSE"),
        rate,
      ),
      incomes: convertedNumber(sum(current, "INCOME"), rate),
      expenses: convertedNumber(sum(current, "EXPENSE"), rate),
    },
    breakdown: expensesByCategory(year, month, currentTransactions),
    trends: monthlyTrends(6, trendsInput, referenceDate),
    recent: latest.map((transaction) =>
      serializeTransaction(transaction, rate),
    ),
    monthCount,
    currency: user.currency,
  };
}
