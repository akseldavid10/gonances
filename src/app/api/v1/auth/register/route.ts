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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, password, username } = body;

    // Validar campos requeridos
    if (!email || !password || !username) {
      return NextResponse.json(
        {
          error: "email, password y username son requeridos",
        },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
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
        email,
        hashedPassword: hashedPassword,
        username,
      },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
      },
    });

    const now = Math.floor(Date.now() / 1000);

    const accesstoken = await new SignJWT({
      sub: user.id,
      email: user.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt(now)
      .setExpirationTime(now + 30 * 60) // 30 min
      .sign(ACCESS_TOKEN_SECRET);

    // Refresh Token - 7 días
    const refreshtoken = await new SignJWT({
      sub: user.id,
      email: user.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt(now)
      .setExpirationTime(now + 7 * 24 * 60 * 60) // 7 días
      .sign(REFRESH_TOKEN_SECRET);

    const cookieStore = await cookies();

    cookieStore.set("accesstoken", accesstoken, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "prod",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 60, // 30 min en segundos
    });

    cookieStore.set("refreshtoken", refreshtoken, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "prod",
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
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error interno del servidor",
      },
      { status: 500 },
    );
  }
}
