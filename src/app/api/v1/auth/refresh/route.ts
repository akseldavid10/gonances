import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ACCESS_TOKEN_SECONDS,
  createAccessToken,
  REFRESH_TOKEN_SECONDS,
  rotateRefreshToken,
} from "@/lib/auth-session";

function clearSessionCookies(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  cookieStore.delete("accesstoken");
  cookieStore.delete("refreshtoken");
}

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshtoken")?.value;
  if (!refreshToken) {
    clearSessionCookies(cookieStore);
    return NextResponse.json(
      { message: "No hay sesión activa" },
      { status: 401 },
    );
  }

  try {
    const rotated = await rotateRefreshToken(refreshToken);
    if (!rotated) {
      clearSessionCookies(cookieStore);
      return NextResponse.json({ message: "Sesión inválida" }, { status: 401 });
    }
    const accesstoken = await createAccessToken(
      rotated.user,
      rotated.sessionId,
    );
    cookieStore.set("accesstoken", accesstoken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ACCESS_TOKEN_SECONDS,
    });
    cookieStore.set("refreshtoken", rotated.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: REFRESH_TOKEN_SECONDS,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("No se pudo renovar la sesión:", error);
    return NextResponse.json(
      {
        code: "SESSION_REFRESH_UNAVAILABLE",
        message: "No se pudo renovar la sesión",
      },
      { status: 503 },
    );
  }
}
