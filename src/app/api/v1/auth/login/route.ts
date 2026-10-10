import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createSessionTokens } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import {
  allowRateLimitedRequest,
  clearRateLimitBucket,
  requestIp,
} from "@/lib/rate-limit";

// Hash dummy generado una sola vez (ej: bcrypt.hashSync("dummy_password", 10))
// Se usa para que bcrypt.compare tarde lo mismo exista o no el usuario.
const DUMMY_HASH =
  "$2a$10$CwTycUXWue0Thq9StjUM0uJ8gN8y8ycBhY1BqDLZI0FdAmXwQTs4a";

export async function POST(request: Request) {
  try {
    const ip = requestIp(request);
    if (ip && !(await allowRateLimitedRequest("login:ip", ip, 60, 15 * 60))) {
      return NextResponse.json(
        {
          error:
            "Demasiados intentos. Espera unos minutos e inténtalo de nuevo.",
        },
        { status: 429, headers: { "Retry-After": String(15 * 60) } },
      );
    }

    const body: unknown = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
    }
    const { email, password } = body as Record<string, unknown>;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 },
      );
    }
    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 },
      );
    }
    const normalizedEmail = email.trim().toLowerCase();
    if (
      !(await allowRateLimitedRequest(
        "login:email",
        normalizedEmail,
        10,
        15 * 60,
      ))
    ) {
      return NextResponse.json(
        {
          error:
            "Demasiados intentos. Espera unos minutos e inténtalo de nuevo.",
        },
        { status: 429, headers: { "Retry-After": String(15 * 60) } },
      );
    }
    if (new TextEncoder().encode(password).length > 72) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 },
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        email: { equals: normalizedEmail, mode: "insensitive" },
      },
    });

    // Si el usuario no tiene hashed_password (se registró con Google),
    // o no existe, comparamos contra el dummy hash para no filtrar por timing.
    const hashToCompare = user?.hashedPassword ?? DUMMY_HASH;
    const isPasswordValid = await bcrypt.compare(password, hashToCompare);

    if (!user || !user.hashedPassword || !isPasswordValid) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 },
      );
    }

    await clearRateLimitBucket("login:email", normalizedEmail);
    const { accessToken, refreshToken } = await createSessionTokens(user);

    const cookieStore = await cookies();

    cookieStore.set("accesstoken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 60,
    });

    cookieStore.set("refreshtoken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatarUrl: user.avatarUrl,
        currency: user.currency,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
