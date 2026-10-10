import assert from "node:assert/strict";
import { test } from "node:test";
import { inMonth, type Transaction } from "./data";
import { parseDateOnly, serializeDateOnly } from "./date-only";
import { longDate, shortDate } from "./format";

test("date-only parser preserves valid calendar dates in UTC", () => {
  const parsed = parseDateOnly("2024-02-29");
  assert.ok(parsed);
  assert.equal(parsed.toISOString(), "2024-02-29T00:00:00.000Z");
  assert.equal(serializeDateOnly(parsed), "2024-02-29");
});

test("date-only parser rejects invalid or timestamp-shaped input", () => {
  assert.equal(parseDateOnly("2025-02-29"), null);
  assert.equal(parseDateOnly("2025-13-01"), null);
  assert.equal(parseDateOnly("2025-01-01T00:00:00Z"), null);
  assert.equal(parseDateOnly(null), null);
});

test("date-only display and month grouping do not shift calendar days", () => {
  const transaction = {
    id: "date-test",
    amount: 10,
    type: "EXPENSE",
    description: "Prueba",
    date: "2024-03-01",
    categoryId: "category-test",
  } satisfies Transaction;

  assert.equal(shortDate(transaction.date), "1 mar");
  assert.equal(longDate(transaction.date), "1 de marzo de 2024");
  assert.equal(inMonth(transaction, 2024, 2), true);
  assert.equal(inMonth(transaction, 2024, 1), false);
});
