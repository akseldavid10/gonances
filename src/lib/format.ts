import type { CurrencyCode } from "./currencies";
import type { Transaction } from "./data";

const currencyFormats = new Map<string, Intl.NumberFormat>();
const currencySuffixes: Record<CurrencyCode, string> = {
  USD: "$US",
  EUR: "€",
  JPY: "¥",
  GBP: "£",
  COP: "$COP",
};

function currencyFormat(currency: CurrencyCode, compact = false) {
  const key = `${currency}:${compact}`;
  let format = currencyFormats.get(key);
  if (!format) {
    format = new Intl.NumberFormat("es-CO", {
      style: "decimal",
      ...(compact
        ? { minimumFractionDigits: 0, maximumFractionDigits: 0 }
        : currency === "JPY"
          ? { minimumFractionDigits: 0, maximumFractionDigits: 0 }
          : { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      useGrouping: true,
    });
    currencyFormats.set(key, format);
  }
  return format;
}

function formattedAmount(
  amount: number,
  currency: CurrencyCode,
  compact = false,
) {
  return `${currencyFormat(currency, compact).format(amount)} ${currencySuffixes[currency]}`;
}

/** Monto con la moneda al final: 1.240,50 $US o -1.240,50 $US. */
export function money(amount: number, currency: CurrencyCode = "USD"): string {
  return formattedAmount(amount, currency);
}

/** Monto con signo explícito para movimientos: +1.240,50 $US / −320,00 $US. */
export function signedMoney(
  amount: number,
  type: "INCOME" | "EXPENSE",
  currency: CurrencyCode = "USD",
) {
  return `${type === "INCOME" ? "+" : "−"}${money(amount, currency)}`;
}

/** Monto redondeado para ejes de gráficos: 1.240 $US. */
export function moneyShort(
  amount: number,
  currency: CurrencyCode = "USD",
): string {
  return formattedAmount(Math.round(amount), currency, true);
}

const MONTHS = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const MONTHS_SHORT = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

/** 14 mar */
export function shortDate(iso: string): string {
  const [, month, day] = iso.slice(0, 10).split("-").map(Number);
  return `${day} ${MONTHS_SHORT[month - 1]}`;
}

/** 14 de marzo de 2026 */
export function longDate(iso: string): string {
  const [year, month, day] = iso.slice(0, 10).split("-").map(Number);
  return `${day} de ${MONTHS[month - 1]} de ${year}`;
}

/** marzo 2026 */
export function monthLabel(year: number, month: number): string {
  return `${MONTHS[month]} ${year}`;
}

export function monthShort(month: number): string {
  return MONTHS_SHORT[month];
}

export function negativePositive(
  items: Transaction[],
  currency: CurrencyCode = "USD",
) {
  let positivos = 0;
  let negativos = 0;

  items.forEach((item) => {
    if (item.type === "INCOME") {
      positivos += item.amount;
    } else {
      negativos += item.amount;
    }
  });

  return money(positivos - negativos, currency);
}
