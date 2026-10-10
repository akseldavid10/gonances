import { type NextRequest, NextResponse } from "next/server";
import { ICON_NAMES } from "@/components/ui/category-icon";
import { MovementType, Prisma } from "@/generated/prisma/client";
import { authenticatedUserId } from "@/lib/api-auth";
import { MAX_CUSTOM_CATEGORIES } from "@/lib/data";
import { prisma } from "@/lib/prisma";

function serializeCategory(category: {
  id: string;
  name: string;
  type: MovementType;
  icon: string | null;
  color: string;
  userId: string | null;
}) {
  return {
    id: category.id,
    name: category.name,
    type: category.type,
    icon: category.icon ?? "Wallet",
    color: category.color,
    isCustom: category.userId !== null,
  };
}

export async function GET() {
  try {
    const userId = await authenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const categories = await prisma.category.findMany({
      where: { OR: [{ userId: null }, { userId }] },
      orderBy: [{ userId: "asc" }, { name: "asc" }],
    });

    return NextResponse.json({ items: categories.map(serializeCategory) });
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await authenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const body: unknown = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
    }
    const { name, type, icon, color } = body as Record<string, unknown>;
    if (
      typeof name !== "string" ||
      !name.trim() ||
      name.trim().length > 24 ||
      typeof type !== "string" ||
      !Object.values(MovementType).includes(type as MovementType) ||
      typeof icon !== "string" ||
      !ICON_NAMES.includes(icon as (typeof ICON_NAMES)[number]) ||
      typeof color !== "string" ||
      !/^#[0-9a-fA-F]{6}$/.test(color)
    ) {
      return NextResponse.json(
        { error: "Datos de categoría inválidos" },
        { status: 400 },
      );
    }

    let category = null;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        category = await prisma.$transaction(
          async (tx) => {
            const count = await tx.category.count({ where: { userId } });
            if (count >= MAX_CUSTOM_CATEGORIES) return null;
            return tx.category.create({
              data: {
                name: name.trim(),
                type: type as MovementType,
                icon,
                color,
                userId,
              },
            });
          },
          { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
        );
        break;
      } catch (error) {
        if (
          !(error instanceof Prisma.PrismaClientKnownRequestError) ||
          error.code !== "P2034" ||
          attempt === 2
        ) {
          throw error;
        }
      }
    }

    if (!category) {
      return NextResponse.json(
        { error: "Llegaste al máximo de cinco categorías" },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { item: serializeCategory(category) },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: "No se pudo crear la categoría" },
      { status: 500 },
    );
  }
}
