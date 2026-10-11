// app/api/users/me/route.ts

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { deleteManagedAvatar } from "@/lib/cloudinary";
import { isCurrencyCode } from "@/lib/currencies";
import getInfoToken from "@/lib/getInfoToken";
import { prisma } from "@/lib/prisma";
import { allowRateLimitedRequest, requestIp } from "@/lib/rate-limit";

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
        avatarUrl: true,
        createdAt: true,
        metodoAutenticacion: true,
        currency: true,
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
        avatarUrl: user.avatarUrl,
        authMethod: user.metodoAutenticacion,
        currency: user.currency,
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

export async function PUT(request: Request) {
  try {
    const payload = await getInfoToken();
    if (typeof payload?.sub !== "string") {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
    }
    const { username, avatarUrl } = body as Record<string, unknown>;
    const currency = (body as Record<string, unknown>).currency;
    if (
      avatarUrl !== undefined ||
      (username !== undefined &&
        (typeof username !== "string" ||
          username.trim().length < 2 ||
          username.trim().length > 80)) ||
      (currency !== undefined && !isCurrencyCode(currency)) ||
      (username === undefined && currency === undefined)
    ) {
      return NextResponse.json(
        { error: "Datos de perfil inválidos" },
        { status: 400 },
      );
    }

    const user = await prisma.user.update({
      where: { id: payload.sub },
      data: {
        ...(typeof username === "string" ? { username: username.trim() } : {}),
        ...(currency !== undefined ? { currency } : {}),
      },
      select: {
        email: true,
        username: true,
        avatarUrl: true,
        createdAt: true,
        metodoAutenticacion: true,
        currency: true,
      },
    });
    const initials = user.username
      .trim()
      .split(/\s+/)
      .map((word) => word[0] ?? "")
      .join("")
      .slice(0, 2)
      .toUpperCase();
    return NextResponse.json({
      user: {
        username: user.username,
        email: user.email,
        avatarUrl: user.avatarUrl,
        initials,
        memberSince: user.createdAt.toISOString().slice(0, 10),
        authMethod: user.metodoAutenticacion,
        currency: user.currency,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "No se pudo actualizar el perfil" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const payload = await getInfoToken();

    if (typeof payload?.sub !== "string") {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    const ip = requestIp(request);
    const [userAllowed, ipAllowed] = await Promise.all([
      allowRateLimitedRequest("account-delete:user", user.id, 5, 15 * 60),
      ip
        ? allowRateLimitedRequest("account-delete:ip", ip, 20, 15 * 60)
        : Promise.resolve(true),
    ]);
    if (!userAllowed || !ipAllowed) {
      return NextResponse.json(
        {
          error:
            "Demasiados intentos. Espera unos minutos antes de volver a intentarlo.",
        },
        { status: 429, headers: { "Retry-After": String(15 * 60) } },
      );
    }

    if (user.metodoAutenticacion === "local") {
      const body: unknown = await request.json();
      const password =
        body && typeof body === "object"
          ? (body as Record<string, unknown>).password
          : null;

      if (
        typeof password !== "string" ||
        password.length === 0 ||
        new TextEncoder().encode(password).length > 72
      ) {
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
          {
            code: "CURRENT_PASSWORD_INVALID",
            error: "Contraseña incorrecta",
          },
          { status: 403 },
        );
      }
    }

    await deleteManagedAvatar(user.id);
    await prisma.$transaction(async (tx) => {
      await tx.transaction.deleteMany({ where: { userId: user.id } });
      await tx.category.deleteMany({ where: { userId: user.id } });
      await tx.user.delete({ where: { id: user.id } });
    });

    const cookieStore = await cookies();

    cookieStore.delete("accesstoken");
    cookieStore.delete("refreshtoken");

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error al eliminar la cuenta" },
      { status: 500 },
    );
  }
}
