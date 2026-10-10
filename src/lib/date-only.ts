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

/**
 * El día de calendario que ve alguien en `timeZone`, como medianoche UTC. Así
 * el resto del código puede seguir leyendo año, mes y día con getUTC*. Sin
 * zona, o con una que el runtime no conoce, se queda en el día UTC.
 */
export function calendarDateIn(instant: Date, timeZone?: string | null): Date {
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat("en-US", {
      timeZone: timeZone || "UTC",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).formatToParts(instant);
  } catch {
    return calendarDateIn(instant, "UTC");
  }
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === type)?.value);
  return new Date(Date.UTC(part("year"), part("month") - 1, part("day")));
}
