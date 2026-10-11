import { Prisma, type Transaction } from "@/generated/prisma/client";
import type { CurrencyCode } from "./currencies";
import { serializeDateOnly } from "./date-only";
import {
  type ExchangeSnapshot,
  HistoricalRateError,
  historicalAmount,
  parseHistoricalRates,
  readSnapshot,
} from "./historical-currency";
import { prisma } from "./prisma";

const pending = new Map<string, Promise<ExchangeSnapshot>>();

export function getHistoricalRates(date: string): Promise<ExchangeSnapshot> {
  const running = pending.get(date);
  if (running) return running;
  const task = loadHistoricalRates(date).finally(() => pending.delete(date));
  pending.set(date, task);
  return task;
}

async function loadHistoricalRates(date: string): Promise<ExchangeSnapshot> {
  const day = new Date(`${date}T00:00:00Z`);
  const cached = await prisma.historicalExchangeRate.findUnique({
    where: { date: day },
  });
  const snapshot = readSnapshot(cached?.snapshot, date);
  if (snapshot) return snapshot;
  let fetched: ExchangeSnapshot;
  try {
    if (date > new Date().toISOString().slice(0, 10))
      throw new HistoricalRateError(date);
    const response = await fetch(
      `https://api.frankfurter.dev/v2/rates?date=${encodeURIComponent(date)}&base=USD&quotes=EUR,JPY,GBP,COP`,
      {
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      },
    );
    if (!response.ok) throw new HistoricalRateError(date);
    fetched = parseHistoricalRates(await response.json(), date);
  } catch {
    throw new HistoricalRateError(date);
  }
  // La primera respuesta válida de cada fecha se conserva, incluso si la fuente revisa sus datos.
  const saved = await prisma.historicalExchangeRate.upsert({
    where: { date: day },
    update: {},
    create: { date: day, snapshot: fetched },
  });
  const result = readSnapshot(saved.snapshot, date);
  if (!result) throw new HistoricalRateError(date);
  return result;
}

export async function transactionSnapshot(
  transaction: Transaction,
): Promise<ExchangeSnapshot> {
  const date = serializeDateOnly(transaction.date);
  const existing = readSnapshot(transaction.exchangeSnapshot, date);
  if (existing) return existing;
  const snapshot = await getHistoricalRates(date);
  // No se reescribe amount ni se inventa la moneda original de movimientos antiguos.
  await prisma.transaction.updateMany({
    where: {
      id: transaction.id,
      date: transaction.date,
      exchangeSnapshot: { equals: Prisma.DbNull },
    },
    data: { exchangeSnapshot: snapshot },
  });
  return snapshot;
}

export async function valuedTransactions<T extends Transaction>(
  records: T[],
  currency: CurrencyCode,
) {
  const missing = new Map<string, string[]>();
  for (const record of records) {
    const date = serializeDateOnly(record.date);
    if (
      (!record.originalCurrency && currency === "USD") ||
      readSnapshot(record.exchangeSnapshot, date)
    )
      continue;
    missing.set(date, [...(missing.get(date) ?? []), record.id]);
  }
  const loaded = new Map<string, ExchangeSnapshot>();
  const dates = [...missing.entries()];
  // Concurrencia limitada para recuperar historiales grandes sin saturar el proveedor.
  for (let offset = 0; offset < dates.length; offset += 4) {
    await Promise.all(
      dates.slice(offset, offset + 4).map(async ([date, ids]) => {
        const snapshot = await getHistoricalRates(date);
        await prisma.transaction.updateMany({
          where: {
            id: { in: ids },
            date: new Date(`${date}T00:00:00Z`),
            exchangeSnapshot: { equals: Prisma.DbNull },
          },
          data: { exchangeSnapshot: snapshot },
        });
        loaded.set(date, snapshot);
      }),
    );
  }
  const result: (T & {
    displayAmount: number;
    historicalSnapshot: ExchangeSnapshot | null;
  })[] = [];
  for (const record of records) {
    // Los USD antiguos se pueden mostrar sin depender de una fuente externa.
    if (!record.originalCurrency && currency === "USD") {
      result.push({
        ...record,
        displayAmount: record.amount.toNumber(),
        historicalSnapshot: readSnapshot(
          record.exchangeSnapshot,
          serializeDateOnly(record.date),
        ),
      });
      continue;
    }
    const date = serializeDateOnly(record.date);
    const snapshot =
      readSnapshot(record.exchangeSnapshot, date) ?? loaded.get(date);
    if (!snapshot) throw new HistoricalRateError(date);
    result.push({
      ...record,
      historicalSnapshot: snapshot,
      displayAmount: historicalAmount(
        record.originalAmount ?? record.amount,
        record.originalCurrency ?? "USD",
        currency,
        snapshot,
      ).toNumber(),
    });
  }
  return result;
}
