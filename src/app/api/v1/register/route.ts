import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

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

    // JWT_ACCESS_SECRET del .env
    const secret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);

    // Crear JWT firmado con HS256
    const accesstoken = await new SignJWT({
      id: user.id.toString(),
      email: user.email,
    })
      .setProtectedHeader({
        alg: "HS256",
        typ: "JWT",
      })
      .setIssuedAt()
      .setExpirationTime("30m")
      .sign(secret);

    const cookieStorage = await cookies();

    const isProduction = process.env.ENVIRONMENT === "prod";

    cookieStorage.set("accesstoken", accesstoken, {
      httpOnly: isProduction,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 60 * 30,
      path: "/",
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
