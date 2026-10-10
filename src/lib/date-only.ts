const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;

export function parseDateOnly(value: unknown): Date | null {
  if (typeof value !== "string") return null;
  const match = DATE_ONLY.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }
  return date;
}

export function serializeDateOnly(value: Date): string {
  return value.toISOString().slice(0, 10);
}

export function dateOnlyFromLocalParts(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
