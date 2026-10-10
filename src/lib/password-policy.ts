export function isStrongPassword(value: unknown): value is string {
  if (typeof value !== "string" || value.length < 8) return false;
  if (!/\d/.test(value) || !/[A-ZÁÉÍÓÚÑ]/.test(value)) return false;
  return new TextEncoder().encode(value).length <= 72;
}
