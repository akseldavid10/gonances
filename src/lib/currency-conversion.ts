import { Prisma } from "@/generated/prisma/client";

export function usdToCurrency(
  amount: Prisma.Decimal.Value,
  rate: Prisma.Decimal.Value,
) {
  return new Prisma.Decimal(amount)
    .times(rate)
    .toDecimalPlaces(2, Prisma.Decimal.ROUND_HALF_UP);
}

export function currencyToUsd(
  amount: Prisma.Decimal.Value,
  rate: Prisma.Decimal.Value,
) {
  return new Prisma.Decimal(amount)
    .dividedBy(rate)
    .toDecimalPlaces(2, Prisma.Decimal.ROUND_HALF_UP);
}

export function convertedNumber(
  amount: Prisma.Decimal.Value,
  rate: Prisma.Decimal.Value,
) {
  return usdToCurrency(amount, rate).toNumber();
}
