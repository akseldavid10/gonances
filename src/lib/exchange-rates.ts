import { Prisma } from "@/generated/prisma/client";
import type { CurrencyCode } from "@/lib/currencies";
import { providerFailure, providerRates } from "@/lib/exchange-rate-provider";

export {
  convertedNumber,
  currencyToUsd,
  usdToCurrency,
} from "@/lib/currency-conversion";

import { prisma } from "@/lib/prisma";

const CACHE_ID = "usd";
const REFRESH_INTERVAL_MS = 24 * 60 * 60 * 1000;
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

async function refreshRatesIfStale() {
  const now = new Date();
  const nextRefreshAt = new Date(now.getTime() + REFRESH_INTERVAL_MS);
  const claimed = await prisma.exchangeRateCache.updateMany({
    where: {
      id: CACHE_ID,
      nextRefreshAt: { lte: now },
    },
    data: { nextRefreshAt },
  });
  if (claimed.count !== 1) return;

  let rates: RateMap | null;
  try {
    const response = await fetch(providerUrl(), {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
    const payload: unknown = await response.json();
    rates = providerRates(payload);
    if (!response.ok || !rates) {
      console.warn(
        `[Tasas] ${providerFailure(payload)} (HTTP ${response.status}). Se conserva la caché; próximo intento en 24 horas.`,
      );
      return;
    }
  } catch {
    // Los errores de fetch pueden contener la URL con la llave privada.
    console.warn(
      "[Tasas] No se pudo consultar el proveedor. Revisa la configuración y la conexión. Se conserva la caché; próximo intento en 24 horas.",
    );
    return;
  }
  await prisma.exchangeRateCache.update({
    where: { id: CACHE_ID },
    data: { rates, fetchedAt: now, nextRefreshAt },
  });
}

export async function getExchangeRates() {
  await refreshRatesIfStale();
  const cache = await prisma.exchangeRateCache.findUnique({
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
