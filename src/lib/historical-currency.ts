import { Prisma } from "@/generated/prisma/client";
import { CURRENCY_CODES, type CurrencyCode } from "./currencies";
import { parseDateOnly } from "./date-only";

export type ExchangeSnapshot = {
  date: string;
  source: "frankfurter" | "manual";
  rates: Record<CurrencyCode, string>;
  rateDates: Record<CurrencyCode, string>;
};

export class HistoricalRateError extends Error {
  constructor(date: string) {
    super(
      `No hay tasas históricas completas para ${date}. Reintenta o introduce las tasas manualmente.`,
    );
  }
}

export function parseHistoricalRates(
  value: unknown,
  date: string,
): ExchangeSnapshot {
  if (!parseDateOnly(date) || !Array.isArray(value))
    throw new HistoricalRateError(date);
  const rates = { USD: "1" } as ExchangeSnapshot["rates"];
  const rateDates = { USD: date } as ExchangeSnapshot["rateDates"];
  for (const code of CURRENCY_CODES.filter((code) => code !== "USD")) {
    const rows = value.filter(
      (row) => row?.base === "USD" && row?.quote === code,
    );
    const row = rows[0];
    if (
      rows.length !== 1 ||
      typeof row.rate !== "number" ||
      !Number.isFinite(row.rate) ||
      row.rate <= 0 ||
      typeof row.date !== "string" ||
      !parseDateOnly(row.date) ||
      row.date > date
    ) {
      throw new HistoricalRateError(date);
    }
    rates[code] = String(row.rate);
    rateDates[code] = row.date;
  }
  return { date, source: "frankfurter", rates, rateDates };
}

export function readSnapshot(
  value: unknown,
  date: string,
): ExchangeSnapshot | null {
  if (!value || typeof value !== "object") return null;
  const snapshot = value as ExchangeSnapshot;
  if (
    snapshot.date !== date ||
    !["frankfurter", "manual"].includes(snapshot.source)
  )
    return null;
  for (const code of CURRENCY_CODES) {
    const rate = snapshot.rates?.[code];
    const rateDate = snapshot.rateDates?.[code];
    if (
      typeof rate !== "string" ||
      rate.length > 40 ||
      !/^(?:0|[1-9]\d*)(?:\.\d+)?$/.test(rate) ||
      !Number.isFinite(Number(rate)) ||
      Number(rate) <= 0 ||
      typeof rateDate !== "string" ||
      !parseDateOnly(rateDate) ||
      rateDate > date
    )
      return null;
  }
  return snapshot.rates.USD === "1" ? snapshot : null;
}

export function manualSnapshot(value: unknown, date: string): ExchangeSnapshot {
  const snapshot = readSnapshot(
    {
      date,
      source: "manual",
      rates: value,
      rateDates: Object.fromEntries(CURRENCY_CODES.map((code) => [code, date])),
    },
    date,
  );
  if (!snapshot) throw new HistoricalRateError(date);
  return {
    ...snapshot,
    rates: Object.fromEntries(
      CURRENCY_CODES.map((code) => [code, snapshot.rates[code]]),
    ) as ExchangeSnapshot["rates"],
  };
}

export function historicalAmount(
  amount: Prisma.Decimal.Value,
  from: CurrencyCode,
  to: CurrencyCode,
  snapshot: ExchangeSnapshot,
) {
  return new Prisma.Decimal(amount)
    .times(snapshot.rates[to])
    .dividedBy(snapshot.rates[from])
    .toDecimalPlaces(2, Prisma.Decimal.ROUND_HALF_UP);
}
