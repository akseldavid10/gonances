import assert from "node:assert/strict";
import { test } from "node:test";
import { categoryById, expensesByCategory, monthlyTrends } from "./data";
import { getDynamicFalseTransactions } from "./falseData";

test("los dos gráficos tienen datos distribuidos en los seis meses visibles", () => {
  // Incluye cambio de año, febrero bisiesto y fechas anteriores al antiguo anclaje.
  for (const now of [
    new Date(2026, 8, 25),
    new Date(2026, 9, 1),
    new Date(2027, 0, 1),
    new Date(2028, 1, 29),
    new Date(2025, 1, 1),
  ]) {
    const transactions = getDynamicFalseTransactions(now);
    const trends = monthlyTrends(6, transactions, now);
    const months = new Set(transactions.map((t) => t.date.slice(0, 7)));
    const start = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 5, 1),
    );
    const end = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1),
    );

    assert.equal(months.size, 6);
    assert.equal(
      new Set(transactions.map((t) => t.id)).size,
      transactions.length,
    );
    for (const transaction of transactions) {
      const date = new Date(transaction.date);
      assert.ok(
        date >= start && date < end,
        "Sin meses futuros o fuera del gráfico",
      );
      assert.equal(
        categoryById(transaction.categoryId)?.type,
        transaction.type,
      );
      assert.ok(transaction.amount > 0);
    }
    for (const trend of trends) {
      assert.ok(trend.incomes > 0 && trend.expenses > 0);
      const breakdown = expensesByCategory(
        trend.year,
        trend.month,
        transactions,
      );
      assert.equal(breakdown.length, 6);
      assert.ok(
        breakdown.every((row) => row.percentage > 0 && row.percentage < 100),
      );
      const total = breakdown.reduce((sum, row) => sum + row.amount, 0);
      assert.ok(Math.abs(total - trend.expenses) < 0.001);
      assert.ok(
        Math.abs(
          breakdown.reduce((sum, row) => sum + row.percentage, 0) - 100,
        ) < 0.5,
      );
    }
    assert.ok(new Set(trends.map((t) => t.expenses)).size > 1);
  }
});

test("las fechas son estables dentro del mes y avanzan juntas al siguiente", () => {
  const first = getDynamicFalseTransactions(new Date(2026, 11, 1));
  assert.deepEqual(first, getDynamicFalseTransactions(new Date(2026, 11, 31)));
  const next = getDynamicFalseTransactions(new Date(2027, 0, 1));

  first.forEach((transaction, index) => {
    const before = new Date(transaction.date);
    const after = new Date(next[index].date);
    assert.equal(
      after.getUTCFullYear() * 12 + after.getUTCMonth(),
      before.getUTCFullYear() * 12 + before.getUTCMonth() + 1,
    );
    assert.equal(after.getUTCDate(), before.getUTCDate());
    assert.equal(next[index].amount, transaction.amount);
    assert.equal(next[index].categoryId, transaction.categoryId);
  });
});
