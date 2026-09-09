// app/api/users/me/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import getInfoToken from "@/lib/getInfoToken";

export async function GET() {
  try {
    const payload = await getInfoToken();

    if (!payload) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    if (!payload.sub) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
      select: {
        email: true,
        username: true,
        createdAt: true,
        metodoAutenticacion: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    // Generar iniciales a partir del username
    const initials = user.username
      .trim()
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    console.log("todo termino bien");
    return NextResponse.json({
      user: {
        initials,
        username: user.username,
        email: user.email,
        authMethod: user.metodoAutenticacion,
        memberSince: user.createdAt.toISOString().split("T")[0],
      },
    });
  } catch (error) {
    console.error("Error al obtener el usuario:", error);

    return NextResponse.json(
      { error: "Error al obtener el usuario" },
      { status: 500 },
    );
  }
}
