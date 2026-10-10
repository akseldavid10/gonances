import { Prisma } from "@/generated/prisma/client";
import { CURRENCY_CODES, type CurrencyCode } from "@/lib/currencies";

export {
  convertedNumber,
  currencyToUsd,
  usdToCurrency,
} from "@/lib/currency-conversion";

import { prisma } from "@/lib/prisma";

const CACHE_ID = "usd";
const REFRESH_INTERVAL_MS = 60 * 60 * 1000;
const RETRY_INTERVAL_MS = 60 * 1000;
const PROVIDER_BASE_URL =
  process.env.EXCHANGE_RATE_API_URL ?? "https://v6.exchangerate-api.com/v6";

function providerUrl() {
  const configuredUrl = PROVIDER_BASE_URL.trim();
  if (/\/latest\/USD\/?$/i.test(configuredUrl)) return configuredUrl;
  const apiKey = process.env.EXCHANGE_RATE_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("Falta configurar EXCHANGE_RATE_API_KEY");
  }
  return `${configuredUrl.replace(/\/+$/, "")}/${encodeURIComponent(apiKey)}/latest/USD`;
}

type RateMap = Record<CurrencyCode, string>;

function parseRates(value: Prisma.JsonValue): Partial<RateMap> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const rates: Partial<RateMap> = { USD: "1" };
  for (const code of ["EUR", "JPY", "GBP", "COP"] as const) {
    const candidate = value[code];
    if (typeof candidate !== "string") continue;
    try {
      if (new Prisma.Decimal(candidate).greaterThan(0)) rates[code] = candidate;
    } catch {
      // Una tasa inválida se omite y no se usa para convertir dinero.
    }
  }
  return rates;
}

function providerRates(value: unknown): RateMap | null {
  if (!value || typeof value !== "object") return null;
  const payload = value as Record<string, unknown>;
  if (payload.result !== "success" || payload.base_code !== "USD") return null;
  if (!payload.rates || typeof payload.rates !== "object") return null;
  const source = payload.rates as Record<string, unknown>;
  const rates = { USD: "1" } as RateMap;
  for (const code of ["EUR", "JPY", "GBP", "COP"] as const) {
    const candidate = source[code];
    if (
      typeof candidate !== "number" ||
      !Number.isFinite(candidate) ||
      candidate <= 0
    ) {
      return null;
    }
    rates[code] = String(candidate);
  }
  return rates;
}

async function refreshRatesIfStale(force = false) {
  const now = new Date();
  const nextRefreshAt = new Date(now.getTime() + REFRESH_INTERVAL_MS);
  const claimed = await prisma.exchangeRateCache.updateMany({
    where: {
      id: CACHE_ID,
      ...(force ? {} : { nextRefreshAt: { lte: now } }),
    },
    data: { nextRefreshAt },
  });
  if (claimed.count !== 1) return;

  try {
    const response = await fetch(providerUrl(), {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const rates = providerRates(await response.json());
    if (!rates) throw new Error("Respuesta de tasas inválida");
    await prisma.exchangeRateCache.update({
      where: { id: CACHE_ID },
      data: { rates, fetchedAt: now, nextRefreshAt },
    });
  } catch (error) {
    console.error("No se pudieron actualizar las tasas de cambio:", error);
    await prisma.exchangeRateCache.update({
      where: { id: CACHE_ID },
      data: { nextRefreshAt: new Date(Date.now() + RETRY_INTERVAL_MS) },
    });
  }
}

export async function getExchangeRates() {
  let cache = await prisma.exchangeRateCache.findUnique({
    where: { id: CACHE_ID },
    select: { rates: true, fetchedAt: true },
  });
  if (!cache) throw new Error("La caché de tasas no está inicializada");
  const cachedRates = parseRates(cache.rates);
  const incomplete = !CURRENCY_CODES.every((code) => cachedRates[code]);
  await refreshRatesIfStale(incomplete);
  cache = await prisma.exchangeRateCache.findUnique({
    where: { id: CACHE_ID },
    select: { rates: true, fetchedAt: true },
  });
  if (!cache) throw new Error("La caché de tasas no está inicializada");
  return { rates: parseRates(cache.rates), fetchedAt: cache.fetchedAt };
}

export async function getExchangeRate(currency: CurrencyCode) {
  const snapshot = await getExchangeRates();
  const value = snapshot.rates[currency];
  if (!value) throw new Error(`No hay una tasa disponible para ${currency}`);
  return { rate: new Prisma.Decimal(value), fetchedAt: snapshot.fetchedAt };
}
