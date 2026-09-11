// app/api/users/me/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import getInfoToken from "@/lib/getInfoToken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

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

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {
  try {
    const payload = await getInfoToken();

    if (!payload?.email || !payload?.sub) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: payload.email as string },
    });

    if (!user || user.id !== payload.sub) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    if (user.metodoAutenticacion === "local") {
      const { password } = await request.json();

      if (!password) {
        return NextResponse.json(
          { error: "Falta la contraseña" },
          { status: 400 },
        );
      }

      if (!user.hashedPassword) {
        return NextResponse.json(
          {
            error:
              "Esta cuenta entra con Google y no tiene contraseña configurada",
          },
          { status: 400 },
        );
      }

      const passwordMatches = await bcrypt.compare(
        password,
        user.hashedPassword,
      );

      if (!passwordMatches) {
        return NextResponse.json(
          { error: "Contraseña incorrecta" },
          { status: 401 },
        );
      }
    }

    // El schema tiene onDelete: Cascade en categories y transactions,
    // así que Prisma se encarga de borrar todo lo relacionado.
    await prisma.user.delete({
      where: { id: user.id },
    });

    const cookieStore = await cookies();

    cookieStore.delete("accesstoken");
    cookieStore.delete("refreshtoken");

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar la cuenta" },
      { status: 500 },
    );
  }
}
