import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import getInfoToken from "@/lib/getInfoToken";
import { MovementType, Prisma } from "@/generated/prisma";

export async function GET(req: NextRequest) {
  try {
    // 1. Validar JWT
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { message: "Token no proporcionado" },
        { status: 401 },
      );
    }

    const payload = await getInfoToken(); // { email, sub }
    if (!payload?.sub) {
      return NextResponse.json({ message: "Token inválido" }, { status: 401 });
    }

    // 2. Buscar usuario en base de datos
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    // 3. Leer query params
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "10", 10);
    const type = searchParams.get("type"); // "INCOME" | "EXPENSE"
    const categoryId = searchParams.get("category_id");
    const startDate = searchParams.get("start_date");
    const endDate = searchParams.get("end_date");
    const search = searchParams.get("search");

    // 4. Armar filtros dinámicos
    const where: Prisma.TransactionWhereInput = {
      userId: user.id,
    };

    if (type && Object.values(MovementType).includes(type as MovementType)) {
      where.type = type as MovementType;
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate);
      if (endDate) where.date.lte = new Date(endDate);
    }

    if (search) {
      where.description = {
        contains: search,
        mode: "insensitive",
      };
    }

    // 5. Consultar con paginación
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: "desc" },
        include: { category: true },
      }),
      prisma.transaction.count({ where }),
    ]);

    // 6. Serializar Decimal -> number
    const serializedItems = items.map((t) => ({
      ...t,
      amount: t.amount.toNumber(),
    }));

    return NextResponse.json({
      items: serializedItems,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
