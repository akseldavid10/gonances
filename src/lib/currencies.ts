export const CURRENCY_CODES = ["USD", "EUR", "JPY", "GBP", "COP"] as const;

export type CurrencyCode = (typeof CURRENCY_CODES)[number];

export const CURRENCIES: Record<
  CurrencyCode,
  { name: string; symbol: string }
> = {
  USD: { name: "Dólar estadounidense", symbol: "$" },
  EUR: { name: "Euro", symbol: "€" },
  JPY: { name: "Yen japonés", symbol: "¥" },
  GBP: { name: "Libra esterlina", symbol: "£" },
  COP: { name: "Peso colombiano", symbol: "$" },
};

export function isCurrencyCode(value: unknown): value is CurrencyCode {
  return (
    typeof value === "string" && CURRENCY_CODES.includes(value as CurrencyCode)
  );
}
