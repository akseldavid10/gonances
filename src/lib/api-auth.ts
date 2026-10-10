import getInfoToken from "@/lib/getInfoToken";

export async function authenticatedUserId(): Promise<string | null> {
  const payload = await getInfoToken();
  return typeof payload?.sub === "string" ? payload.sub : null;
}
