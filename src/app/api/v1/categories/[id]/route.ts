import { type NextRequest, NextResponse } from "next/server";
import { ICON_NAMES } from "@/components/ui/category-icon";
import { authenticatedUserId } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: RouteContext) {
  const userId = await authenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
    }
    const { name, icon, color, type } = body as Record<string, unknown>;
    if (
      typeof name !== "string" ||
      !name.trim() ||
      name.trim().length > 24 ||
      typeof icon !== "string" ||
      !ICON_NAMES.includes(icon as (typeof ICON_NAMES)[number]) ||
      typeof color !== "string" ||
      !/^#[0-9a-fA-F]{6}$/.test(color) ||
      type !== undefined
    ) {
      return NextResponse.json(
        { error: "Datos de categoría inválidos" },
        { status: 400 },
      );
    }

    const category = await prisma.category.updateMany({
      where: { id, userId },
      data: { name: name.trim(), icon, color },
    });
    if (category.count === 0) {
      return NextResponse.json(
        { error: "Categoría no encontrada" },
        { status: 404 },
      );
    }
    const updated = await prisma.category.findUnique({ where: { id } });
    if (!updated) {
      return NextResponse.json(
        { error: "Categoría no encontrada" },
        { status: 404 },
      );
    }
    return NextResponse.json({
      item: {
        id: updated.id,
        name: updated.name,
        type: updated.type,
        icon: updated.icon ?? "Wallet",
        color: updated.color,
        isCustom: true,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "No se pudo actualizar la categoría" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  const userId = await authenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const category = await prisma.category.findFirst({ where: { id, userId } });
    if (!category) {
      return NextResponse.json(
        { error: "Categoría no encontrada" },
        { status: 404 },
      );
    }
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ message: "Categoría eliminada", id });
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "P2003") {
      return NextResponse.json(
        {
          error:
            "No se puede eliminar: hay transacciones que usan esta categoría",
        },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { error: "No se pudo eliminar la categoría" },
      { status: 500 },
    );
  }
}
