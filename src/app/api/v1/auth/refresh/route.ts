// app/api/v1/auth/refresh/route.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const ACCESS_SECRET = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
const REFRESH_SECRET = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET);

export async function POST() {
  try {
    const cookieStorage = await cookies();
    const refreshTokenCookie = cookieStorage.get("refreshtoken");

    if (!refreshTokenCookie?.value) {
      return NextResponse.json(
        { message: "No hay sesión activa" },
        { status: 401 },
      );
    }

    const refreshToken = refreshTokenCookie.value;

    let payload: { sub: string; email: string };

    try {
      const { payload: verified } = await jwtVerify(
        refreshToken,
        REFRESH_SECRET,
      );
      payload = verified as { sub: string; email: string };
    } catch {
      // Firma inválida o refresh token expirado: sesión muerta, no hay
      // vuelta atrás sin volver a hacer login.
      return NextResponse.json(
        { message: "Sesión expirada, inicia sesión de nuevo" },
        { status: 401 },
      );
    }

    // Reemitimos un access token nuevo con el mismo payload esencial.
    const newAccessToken = await new SignJWT({
      sub: payload.sub,
      email: payload.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30m")
      .sign(ACCESS_SECRET);

    cookieStorage.set("accesstoken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 30,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error en refresh:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
