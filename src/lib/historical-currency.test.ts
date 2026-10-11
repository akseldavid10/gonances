import assert from "node:assert/strict";
import test from "node:test";
import {
  HistoricalRateError,
  historicalAmount,
  manualSnapshot,
  parseHistoricalRates,
  readSnapshot,
} from "./historical-currency";

const date = "2026-09-10";
const old = manualSnapshot(
  { USD: "1", EUR: "0.9", GBP: "0.75", JPY: "150", COP: "3000" },
  date,
);
const current = manualSnapshot({ ...old.rates, COP: "5000" }, "2026-10-10");

test("a past USD expense stays at 30000 COP when today's rate rises to 5000", () => {
  const stored = JSON.parse(JSON.stringify(old));
  assert.equal(
    historicalAmount("10", "USD", "COP", stored).toString(),
    "30000",
  );
  assert.equal(
    historicalAmount("10", "USD", "COP", current).toString(),
    "50000",
  );
  assert.equal(
    historicalAmount("10", "USD", "COP", stored).toString(),
    "30000",
  );
});

test("totals convert each movement with its own snapshot before adding", () => {
  const total = historicalAmount("10", "USD", "COP", old).plus(
    historicalAmount("10", "USD", "COP", current),
  );
  assert.equal(total.toString(), "80000");
});

test("original amounts avoid the loss of cents from canonical USD rounding", () => {
  assert.equal(
    historicalAmount("30001", "COP", "COP", old).toString(),
    "30001",
  );
  assert.equal(historicalAmount("30001", "COP", "EUR", old).toString(), "9");
  assert.equal(historicalAmount("30001", "COP", "USD", old).toString(), "10");
});

test("changing the date uses the new snapshot but preserves original currency and amount", () => {
  assert.equal(historicalAmount("30000", "COP", "USD", old).toString(), "10");
  assert.equal(
    historicalAmount("30000", "COP", "USD", current).toString(),
    "6",
  );
  assert.equal(readSnapshot(old, "2026-10-10"), null);
});

test("historical responses retain actual publication dates, including non-business days", () => {
  const response = ["EUR", "GBP", "JPY", "COP"].map((quote) => ({
    base: "USD",
    quote,
    date,
    rate: Number(old.rates[quote as keyof typeof old.rates]),
  }));
  const snapshot = parseHistoricalRates(response, "2026-09-12");
  assert.equal(snapshot.date, "2026-09-12");
  assert.equal(snapshot.rateDates.COP, date);
  assert.equal(snapshot.source, "frankfurter");
  assert.throws(
    () => parseHistoricalRates(response.slice(1), date),
    HistoricalRateError,
  );
  assert.throws(
    () => parseHistoricalRates(response, "2026-09-09"),
    HistoricalRateError,
  );
  assert.throws(
    () =>
      parseHistoricalRates(
        [{ ...response[0], rate: 0 }, ...response.slice(1)],
        date,
      ),
    HistoricalRateError,
  );
});

test("manual rates must contain all five valid currencies and are explicitly attributed", () => {
  assert.equal(old.source, "manual");
  assert.throws(
    () => manualSnapshot({ ...old.rates, USD: "2" }, date),
    HistoricalRateError,
  );
  assert.throws(
    () => manualSnapshot({ ...old.rates, COP: "-1" }, date),
    HistoricalRateError,
  );
  assert.throws(() => manualSnapshot({ USD: "1" }, date), HistoricalRateError);
});
