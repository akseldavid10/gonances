import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { revokeSession } from "@/lib/auth-session";

export async function POST() {
  const cookieStore = await cookies();
  let response: NextResponse;
  try {
    await revokeSession(
      cookieStore.get("refreshtoken")?.value,
      cookieStore.get("accesstoken")?.value,
    );
    response = NextResponse.json({ message: "Sesión cerrada correctamente" });
  } catch (error) {
    console.error("No se pudo revocar la sesión:", error);
    response = NextResponse.json(
      { error: "No se pudo cerrar la sesión de forma segura" },
      { status: 503 },
    );
  }

  response.cookies.delete("accesstoken");
  response.cookies.delete("refreshtoken");

  return response;
}
