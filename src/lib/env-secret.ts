export function jwtSecret(name: "JWT_ACCESS_SECRET" | "JWT_REFRESH_SECRET") {
  const value = process.env[name];
  if (!value || value.length < 32) {
    throw new Error(`${name} debe configurarse con al menos 32 caracteres`);
  }
  return new TextEncoder().encode(value);
}
