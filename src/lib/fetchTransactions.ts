import { getMonthlyAnalytics } from "@/lib/analytics";
import { expensesByCategory, type Transaction } from "@/lib/data";
import getInfoToken from "@/lib/getInfoToken";

export async function fetchDashboardData(referenceDate = new Date()) {
  const payload = await getInfoToken();
  if (typeof payload?.sub !== "string") throw new Error("No autenticado");
  const analytics = await getMonthlyAnalytics(payload.sub, referenceDate);
  const transactions: Transaction[] = analytics.records.map((record) => ({
    id: record.id,
    amount: record.displayAmount,
    type: record.type,
    description: record.description,
    date: record.date.toISOString().slice(0, 10),
    categoryId: record.categoryId,
    category: {
      name: record.category.name,
      color: record.category.color,
      icon: record.category.icon ?? "Wallet",
      type: record.category.type,
      isCustom: record.category.userId !== null,
    },
  }));
  return {
    summary: {
      balance: analytics.summary.total_balance,
      incomes: analytics.summary.total_incomes,
      expenses: analytics.summary.total_expenses,
    },
    breakdown: expensesByCategory(
      referenceDate.getUTCFullYear(),
      referenceDate.getUTCMonth(),
      transactions,
    ),
    trends: analytics.monthlyTrends,
    recent: transactions.slice(0, 8),
    monthCount: analytics.monthCount,
    currency: analytics.currency,
  };
}
