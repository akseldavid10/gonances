import assert from "node:assert/strict";
import { test } from "node:test";
import { inMonth, type Transaction } from "./data";
import { calendarDateIn, parseDateOnly, serializeDateOnly } from "./date-only";
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

test("calendar date follows the viewer time zone, not UTC", () => {
  // 21:00 del 30 de septiembre en Bogotá ya es 1 de octubre en UTC.
  const lateInBogota = new Date("2026-10-01T02:00:00Z");
  assert.equal(
    serializeDateOnly(calendarDateIn(lateInBogota, "America/Bogota")),
    "2026-09-30",
  );
  // Y en Tokio el mes cambia antes que en UTC.
  const earlyInTokyo = new Date("2026-09-30T20:00:00Z");
  assert.equal(
    serializeDateOnly(calendarDateIn(earlyInTokyo, "Asia/Tokyo")),
    "2026-10-01",
  );
});

test("calendar date falls back to UTC for a missing or unknown zone", () => {
  const instant = new Date("2026-10-01T02:00:00Z");
  assert.equal(serializeDateOnly(calendarDateIn(instant)), "2026-10-01");
  assert.equal(
    serializeDateOnly(calendarDateIn(instant, "Not/AZone")),
    "2026-10-01",
  );
});
