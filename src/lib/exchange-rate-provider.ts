import { CURRENCY_CODES, type CurrencyCode } from "./currencies";

export function providerFailure(value: unknown): string {
  const code =
    value && typeof value === "object"
      ? (value as Record<string, unknown>)["error-type"]
      : null;
  switch (code) {
    case "invalid-key":
      return "La llave de ExchangeRate-API no es válida";
    case "inactive-account":
      return "La cuenta de ExchangeRate-API no está activada";
    case "quota-reached":
      return "Se agotó la cuota de ExchangeRate-API";
    case "unsupported-code":
    case "malformed-request":
      return "ExchangeRate-API rechazó la configuración de la solicitud";
    default:
      return "El proveedor devolvió una respuesta de tasas inválida";
  }
}

export function providerRates(
  value: unknown,
): Record<CurrencyCode, string> | null {
  if (!value || typeof value !== "object") return null;
  const payload = value as Record<string, unknown>;
  if (payload.result !== "success" || payload.base_code !== "USD") return null;
  // El endpoint Standard con llave y el Open Access usan nombres distintos.
  const source = payload.conversion_rates ?? payload.rates;
  if (!source || typeof source !== "object" || Array.isArray(source))
    return null;
  const rates = {} as Record<CurrencyCode, string>;
  for (const code of CURRENCY_CODES) {
    const candidate = (source as Record<string, unknown>)[code];
    if (
      typeof candidate !== "number" ||
      !Number.isFinite(candidate) ||
      candidate <= 0 ||
      (code === "USD" && candidate !== 1)
    )
      return null;
    rates[code] = String(candidate);
  }
  return rates;
}
