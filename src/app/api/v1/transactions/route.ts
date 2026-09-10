import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import getInfoToken from "@/lib/getInfoToken";
import { MovementType, Prisma } from "@/generated/prisma";

export async function GET(req: NextRequest) {
  try {
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
        orderBy: { createdAt: "desc" },
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
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
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

    // 3. Leer y validar body
    const body = await req.json();
    const { amount, type, description, date, category_id } = body;

    if (amount === undefined || amount === null) {
      return NextResponse.json(
        { message: "El campo amount es requerido" },
        { status: 400 },
      );
    }

    let parsedAmount = undefined;

    try {
      parsedAmount = Number(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return NextResponse.json(
          { message: "amount debe ser un número mayor a 0" },
          { status: 400 },
        );
      }
    } catch (error) {
      return NextResponse.json(
        { message: "amount debe ser un número" },
        { status: 400 },
      );
    }

    if (!type || !Object.values(MovementType).includes(type)) {
      return NextResponse.json(
        { message: "type debe ser INCOME o EXPENSE" },
        { status: 400 },
      );
    }

    if (!date || isNaN(new Date(date).getTime())) {
      return NextResponse.json(
        { message: "date es requerido y debe ser una fecha válida" },
        { status: 400 },
      );
    }

    if (!category_id) {
      return NextResponse.json(
        { message: "category_id es requerido" },
        { status: 400 },
      );
    }

    // 4. Verificar que la categoría exista, sea del usuario (o global) y coincida el tipo
    const category = await prisma.category.findFirst({
      where: {
        id: category_id,
        OR: [{ userId: user.id }, { userId: null }],
      },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Categoría no encontrada" },
        { status: 404 },
      );
    }

    if (category.type !== type) {
      return NextResponse.json(
        {
          message: `La categoría es de tipo ${category.type}, no coincide con type=${type}`,
        },
        { status: 400 },
      );
    }

    // 5. Crear transacción
    const transaction = await prisma.transaction.create({
      data: {
        amount: parsedAmount,
        type,
        description: description ?? null,
        date: new Date(date),
        userId: user.id,
        categoryId: category_id,
      },
    });

    // 6. Responder
    return NextResponse.json(
      {
        id: transaction.id,
        amount: transaction.amount.toNumber(),
        type: transaction.type,
        description: transaction.description,
        date: transaction.date,
        category_id: transaction.categoryId,
        created_at: transaction.createdAt,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    // 1. Obtener usuario desde el JWT
    const payload = await getInfoToken();

    if (!payload?.sub) {
      return NextResponse.json({ message: "Token inválido" }, { status: 401 });
    }

    // 2. Buscar usuario
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    // 3. Obtener ID de la transacción
    const { searchParams } = new URL(req.url);
    const transactionId = searchParams.get("id");

    if (!transactionId) {
      return NextResponse.json(
        { message: "El parámetro id es requerido" },
        { status: 400 },
      );
    }

    // 4. Buscar la transacción y comprobar que pertenece al usuario
    const existingTransaction = await prisma.transaction.findFirst({
      where: {
        id: transactionId,
        userId: user.id,
      },
    });

    if (!existingTransaction) {
      console.log("Transacción no encontrada");
      return NextResponse.json(
        { message: "Transacción no encontrada" },
        { status: 404 },
      );
    }

    // 5. Leer body
    const body = await req.json();

    const { amount, type, description, date, category_id } = body;

    // 6. Validar amount
    let parsedAmount: number | undefined = undefined;

    if (amount !== undefined && amount !== null) {
      parsedAmount = Number(amount);

      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return NextResponse.json(
          { message: "amount debe ser un número mayor a 0" },
          { status: 400 },
        );
      }
    }

    // 7. Validar type
    if (
      type !== undefined &&
      !Object.values(MovementType).includes(type as MovementType)
    ) {
      return NextResponse.json(
        { message: "type debe ser INCOME o EXPENSE" },
        { status: 400 },
      );
    }

    // Si no mandan type, conservamos el actual
    const finalType =
      (type as MovementType | undefined) ?? existingTransaction.type;

    // 8. Validar date
    let parsedDate: Date | undefined = undefined;

    if (date !== undefined && date !== null) {
      parsedDate = new Date(date);

      if (isNaN(parsedDate.getTime())) {
        return NextResponse.json(
          { message: "date debe ser una fecha válida" },
          { status: 400 },
        );
      }
    }

    // 9. Validar categoría
    const finalCategoryId = category_id ?? existingTransaction.categoryId;

    const category = await prisma.category.findFirst({
      where: {
        id: finalCategoryId,
        OR: [{ userId: user.id }, { userId: null }],
      },
    });

    if (!category) {
      console.log("Categoría no encontrada");
      return NextResponse.json(
        { message: "Categoría no encontrada" },
        { status: 404 },
      );
    }

    // La categoría debe coincidir con el tipo
    if (category.type !== finalType) {
      return NextResponse.json(
        {
          message: `La categoría es de tipo ${category.type}, no coincide con type=${finalType}`,
        },
        { status: 400 },
      );
    }

    // 10. Actualizar transacción
    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: existingTransaction.id,
      },
      data: {
        ...(parsedAmount !== undefined && {
          amount: parsedAmount,
        }),

        ...(type !== undefined && {
          type: finalType,
        }),

        ...(description !== undefined && {
          description: description,
        }),

        ...(parsedDate !== undefined && {
          date: parsedDate,
        }),

        ...(category_id !== undefined && {
          categoryId: finalCategoryId,
        }),
      },
    });

    // 11. Responder
    return NextResponse.json({
      id: updatedTransaction.id,
      amount: updatedTransaction.amount.toNumber(),
      type: updatedTransaction.type,
      description: updatedTransaction.description,
      date: updatedTransaction.date,
      category_id: updatedTransaction.categoryId,
      created_at: updatedTransaction.createdAt,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // 1. Obtener usuario desde el JWT
    const payload = await getInfoToken();

    if (!payload?.sub) {
      return NextResponse.json({ message: "Token inválido" }, { status: 401 });
    }

    // 2. Buscar usuario
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    // 3. Obtener el ID de la transacción
    const { searchParams } = new URL(req.url);
    const transactionId = searchParams.get("id");

    if (!transactionId) {
      return NextResponse.json(
        { message: "El parámetro id es requerido" },
        { status: 400 },
      );
    }

    // 4. Buscar la transacción y comprobar que pertenece al usuario
    const transaction = await prisma.transaction.findFirst({
      where: {
        id: transactionId,
        userId: user.id,
      },
    });

    if (!transaction) {
      return NextResponse.json(
        { message: "Transacción no encontrada" },
        { status: 404 },
      );
    }

    // 5. Eliminar la transacción
    await prisma.transaction.delete({
      where: {
        id: transaction.id,
      },
    });

    // 6. Responder
    return NextResponse.json({
      message: "Transacción eliminada correctamente",
      id: transaction.id,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
