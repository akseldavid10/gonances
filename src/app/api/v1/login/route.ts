import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const ACCESS_TOKEN_SECRET = new TextEncoder().encode(
  process.env.JWT_ACCESS_SECRET!,
);
const REFRESH_TOKEN_SECRET = new TextEncoder().encode(
  process.env.JWT_REFRESH_SECRET!,
);

// Hash dummy generado una sola vez (ej: bcrypt.hashSync("dummy_password", 10))
// Se usa para que bcrypt.compare tarde lo mismo exista o no el usuario.
const DUMMY_HASH =
  "$2a$10$CwTycUXWue0Thq9StjUM0uJ8gN8y8ycBhY1BqDLZI0FdAmXwQTs4a";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Si el usuario no existe o se registró con Google (no tiene hashed_password),
    // comparamos igual contra el dummy hash para no filtrar información por timing.
    const hashToCompare = user?.hashedPassword ?? DUMMY_HASH;
    const isPasswordValid = await bcrypt.compare(password, hashToCompare);

    if (!user || !user.hashedPassword || !isPasswordValid) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 },
      );
    }

    const now = Math.floor(Date.now() / 1000);

    // Access Token - 30 minutos
    const accessToken = await new SignJWT({
      sub: user.id,
      email: user.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt(now)
      .setExpirationTime(now + 30 * 60) // 30 min
      .sign(ACCESS_TOKEN_SECRET);

    // Refresh Token - 7 días
    const refreshToken = await new SignJWT({
      sub: user.id,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt(now)
      .setExpirationTime(now + 7 * 24 * 60 * 60) // 7 días
      .sign(REFRESH_TOKEN_SECRET);

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "prod",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 60, // 30 min en segundos
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "prod",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 días en segundos
    });

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
