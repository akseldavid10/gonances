/** Conserva explícitamente la verificación TLS que usa hoy pg-connection-string. */
export function databaseUrl(connectionString: string): string {
  const url = new URL(connectionString);
  if (
    url.searchParams.get("uselibpqcompat") !== "true" &&
    ["prefer", "require", "verify-ca"].includes(
      url.searchParams.get("sslmode") ?? "",
    )
  ) {
    url.searchParams.set("sslmode", "verify-full");
    return url.toString();
  }
  return connectionString;
}
