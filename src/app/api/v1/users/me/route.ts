// app/api/users/me/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const accesstoken = (await cookies()).get("accesstoken")?.value;

    if (!accesstoken) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);

    let payload;
    try {
      const result = await jwtVerify(accesstoken, secret);
      payload = result.payload;
    } catch {
      return NextResponse.json(
        { error: "Token inválido o expirado" },
        { status: 401 },
      );
    }

    const userId = payload.sub as string;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        avatarUrl: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      username: user.username,
      avatar_url: user.avatarUrl,
      created_at: user.createdAt,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener el usuario" },
      { status: 500 },
    );
  }
}
