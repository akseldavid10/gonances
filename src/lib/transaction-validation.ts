export function parseTransactionAmount(value: unknown): string | null {
  if (typeof value !== "number" && typeof value !== "string") return null;
  if (typeof value === "number" && !Number.isFinite(value)) return null;
  const amount = String(value).trim();
  if (!/^(?:0|[1-9]\d{0,14})(?:\.\d{1,2})?$/.test(amount)) return null;
  if (amount === "0" || amount === "0.0" || amount === "0.00") return null;
  return amount;
}

export function isValidTransactionDescription(
  value: unknown,
): value is string | null | undefined {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.length <= 200)
  );
}
