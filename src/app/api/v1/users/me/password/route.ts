import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { authenticatedUserId } from "@/lib/api-auth";
import { isStrongPassword } from "@/lib/password-policy";
import { prisma } from "@/lib/prisma";
import { allowRateLimitedRequest } from "@/lib/rate-limit";

export async function PUT(request: Request) {
  const userId = await authenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  try {
    if (
      !(await allowRateLimitedRequest(
        "password-change:user",
        userId,
        5,
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

    const body: unknown = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
    }
    const { currentPassword, newPassword } = body as Record<string, unknown>;
    if (typeof currentPassword !== "string" || !isStrongPassword(newPassword)) {
      return NextResponse.json(
        {
          error:
            "La nueva contraseña debe tener al menos 8 caracteres, un número y una mayúscula",
        },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user?.hashedPassword) {
      return NextResponse.json(
        { error: "Esta cuenta no tiene una contraseña local" },
        { status: 400 },
      );
    }
    if (!(await bcrypt.compare(currentPassword, user.hashedPassword))) {
      return NextResponse.json(
        {
          code: "CURRENT_PASSWORD_INVALID",
          error: "La contraseña actual es incorrecta",
        },
        { status: 403 },
      );
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: {
          hashedPassword: await bcrypt.hash(newPassword, 12),
          tokenVersion: { increment: 1 },
        },
      }),
      prisma.refreshSession.updateMany({
        where: { userId, revokedAt: null },
        data: { revokedAt: new Date() },
      }),
    ]);
    const cookieStore = await cookies();
    cookieStore.delete("accesstoken");
    cookieStore.delete("refreshtoken");
    return NextResponse.json({
      message: "Contraseña actualizada. Inicia sesión de nuevo.",
    });
  } catch {
    return NextResponse.json(
      { error: "No se pudo cambiar la contraseña" },
      { status: 500 },
    );
  }
}
