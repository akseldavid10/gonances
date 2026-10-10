import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createSessionTokens } from "@/lib/auth-session";
import { isStrongPassword } from "@/lib/password-policy";
import { prisma } from "@/lib/prisma";
import { allowRateLimitedRequest, requestIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const ip = requestIp(request);
    if (
      ip &&
      !(await allowRateLimitedRequest("register:ip", ip, 10, 60 * 60))
    ) {
      return NextResponse.json(
        {
          error: "Demasiados intentos de registro. Vuelve a probar más tarde.",
        },
        { status: 429, headers: { "Retry-After": "3600" } },
      );
    }

    const body: unknown = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
    }

    const { email, password, username, termsAccepted } = body as Record<
      string,
      unknown
    >;

    // Validar campos requeridos
    if (!email || !password || !username) {
      return NextResponse.json(
        {
          error: "email, password y username son requeridos",
        },
        { status: 400 },
      );
    }

    if (
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      typeof username !== "string" ||
      username.trim().length < 2 ||
      username.trim().length > 80 ||
      !isStrongPassword(password) ||
      termsAccepted !== true
    ) {
      return NextResponse.json(
        {
          error:
            "Revisa el correo, el nombre, la contraseña y la aceptación de términos",
        },
        { status: 400 },
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim();
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: { equals: normalizedEmail, mode: "insensitive" },
          },
          { username: normalizedUsername },
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "El email o el nombre de usuario ya está en uso",
        },
        { status: 409 },
      );
    }

    // Hashear la contraseña con bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        hashedPassword: hashedPassword,
        username: normalizedUsername,
      },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        tokenVersion: true,
        currency: true,
      },
    });

    const { accessToken, refreshToken } = await createSessionTokens(user);

    const cookieStore = await cookies();

    cookieStore.set("accesstoken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 60, // 30 min en segundos
    });

    cookieStore.set("refreshtoken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 días en segundos
    });
    // Respuesta
    return NextResponse.json(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        created_at: user.createdAt,
        currency: user.currency,
      },
      { status: 201 },
    );
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "El email o el nombre de usuario ya está en uso" },
        { status: 409 },
      );
    }
    return NextResponse.json(
      {
        error: "Error interno del servidor",
      },
      { status: 500 },
    );
  }
}
