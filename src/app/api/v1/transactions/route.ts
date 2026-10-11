import { type NextRequest, NextResponse } from "next/server";
import { MovementType, type Prisma } from "@/generated/prisma";
import { parseDateOnly, serializeDateOnly } from "@/lib/date-only";
import getInfoToken from "@/lib/getInfoToken";
import {
  HistoricalRateError,
  historicalAmount,
  manualSnapshot,
} from "@/lib/historical-currency";
import {
  getHistoricalRates,
  transactionSnapshot,
  valuedTransactions,
} from "@/lib/historical-exchange-rates";
import { prisma } from "@/lib/prisma";
import {
  isValidTransactionDescription,
  parseTransactionAmount,
} from "@/lib/transaction-validation";

export async function GET(req: NextRequest) {
  try {
    const payload = await getInfoToken();
    if (!payload?.sub) {
      return NextResponse.json({ message: "Token inválido" }, { status: 401 });
    }
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { currency: true },
    });
    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    const { searchParams } = req.nextUrl;
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);
    if (
      !Number.isInteger(page) ||
      page < 1 ||
      !Number.isInteger(limit) ||
      limit < 1 ||
      limit > 100
    ) {
      return NextResponse.json(
        { message: "page o limit inválido" },
        { status: 400 },
      );
    }
    const type = searchParams.get("type");
    if (type && !Object.values(MovementType).includes(type as MovementType)) {
      return NextResponse.json(
        { message: "type debe ser INCOME o EXPENSE" },
        { status: 400 },
      );
    }
    const startValue = searchParams.get("start_date");
    const endValue = searchParams.get("end_date");
    const start = startValue ? parseDateOnly(startValue) : undefined;
    const end = endValue ? parseDateOnly(endValue) : undefined;
    if (
      (startValue && !start) ||
      (endValue && !end) ||
      (start && end && start > end)
    ) {
      return NextResponse.json(
        { message: "Rango de fechas inválido" },
        { status: 400 },
      );
    }

    const where: Prisma.TransactionWhereInput = {
      userId: payload.sub,
    };
    const categoryId = searchParams.get("category_id");
    const search = searchParams.get("search");
    if (search && search.length > 100) {
      return NextResponse.json(
        { message: "La búsqueda no puede superar 100 caracteres" },
        { status: 400 },
      );
    }

    if (type) where.type = type as MovementType;
    if (categoryId) {
      where.categoryId = categoryId;
    }
    if (start || end) {
      where.date = {
        ...(start ? { gte: start } : {}),
        ...(end ? { lte: end } : {}),
      };
    }
    if (search) {
      where.OR = [
        { description: { contains: search, mode: "insensitive" } },
        {
          category: {
            is: { name: { contains: search, mode: "insensitive" } },
          },
        },
      ];
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ date: "desc" }, { createdAt: "desc" }],
        include: { category: true },
      }),
      prisma.transaction.count({ where }),
    ]);
    const valued = await valuedTransactions(items, user.currency);
    const serializedItems = valued.map((t) => ({
      id: t.id,
      amount: t.displayAmount,
      exchangeSnapshot: t.historicalSnapshot,
      originalAmount: t.originalAmount?.toNumber() ?? null,
      originalCurrency: t.originalCurrency,
      type: t.type,
      description: t.description,
      date: serializeDateOnly(t.date),
      categoryId: t.categoryId,
      createdAt: t.createdAt.toISOString(),
      category: {
        id: t.category.id,
        name: t.category.name,
        type: t.category.type,
        icon: t.category.icon,
        color: t.category.color,
      },
    }));

    return NextResponse.json({
      items: serializedItems,
      currency: user.currency,
      total,
      page,
      pages: Math.max(1, Math.ceil(total / limit)),
    });
  } catch (error) {
    if (error instanceof HistoricalRateError)
      return NextResponse.json(
        { message: error.message, code: "HISTORICAL_RATES_UNAVAILABLE" },
        { status: 503 },
      );
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
    if (!body || typeof body !== "object") {
      return NextResponse.json({ message: "Cuerpo inválido" }, { status: 400 });
    }
    const { amount, type, description, date, category_id } = body;

    if (amount === undefined || amount === null) {
      return NextResponse.json(
        { message: "El campo amount es requerido" },
        { status: 400 },
      );
    }

    const parsedAmount = parseTransactionAmount(amount);
    if (parsedAmount === null) {
      return NextResponse.json(
        {
          message:
            "amount debe ser positivo, tener hasta dos decimales y no exceder el máximo permitido",
        },
        { status: 400 },
      );
    }

    if (
      typeof type !== "string" ||
      !Object.values(MovementType).includes(type as MovementType)
    ) {
      return NextResponse.json(
        { message: "type debe ser INCOME o EXPENSE" },
        { status: 400 },
      );
    }

    if (typeof date !== "string" || !parseDateOnly(date)) {
      return NextResponse.json(
        { message: "date es requerido y debe ser una fecha válida" },
        { status: 400 },
      );
    }

    if (!isValidTransactionDescription(description)) {
      return NextResponse.json(
        { message: "description debe tener hasta 200 caracteres" },
        { status: 400 },
      );
    }

    if (typeof category_id !== "string" || !category_id) {
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
    const snapshot =
      body.exchange_rates !== undefined
        ? manualSnapshot(body.exchange_rates, date)
        : await getHistoricalRates(date);
    const usdAmount = historicalAmount(
      parsedAmount,
      user.currency,
      "USD",
      snapshot,
    );
    if (
      usdAmount.lessThanOrEqualTo(0) ||
      usdAmount.greaterThan("99999999.99")
    ) {
      return NextResponse.json(
        { message: "El monto convertido no cabe en el rango permitido" },
        { status: 400 },
      );
    }
    const transaction = await prisma.transaction.create({
      data: {
        amount: usdAmount,
        originalAmount: parsedAmount,
        originalCurrency: user.currency,
        exchangeSnapshot: snapshot,
        type: type as MovementType,
        description: description ?? null,
        date: parseDateOnly(date) as Date,
        userId: user.id,
        categoryId: category_id,
      },
    });

    // 6. Responder
    return NextResponse.json(
      {
        id: transaction.id,
        amount: Number(parsedAmount),
        exchangeSnapshot: snapshot,
        currency: user.currency,
        type: transaction.type,
        description: transaction.description,
        date: serializeDateOnly(transaction.date),
        category_id: transaction.categoryId,
        created_at: transaction.createdAt,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof HistoricalRateError)
      return NextResponse.json(
        { message: error.message, code: "HISTORICAL_RATES_UNAVAILABLE" },
        { status: 422 },
      );
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
    if (!body || typeof body !== "object") {
      return NextResponse.json({ message: "Cuerpo inválido" }, { status: 400 });
    }

    const { amount, type, description, date, category_id } = body;

    // 6. Validar amount
    let inputAmount: string | undefined;
    if (amount !== undefined && amount !== null) {
      const validAmount = parseTransactionAmount(amount);
      if (validAmount === null) {
        return NextResponse.json(
          {
            message:
              "amount debe ser positivo, tener hasta dos decimales y no exceder el máximo permitido",
          },
          { status: 400 },
        );
      }
      inputAmount = validAmount;
    }

    // 7. Validar type
    if (
      type !== undefined &&
      (typeof type !== "string" ||
        !Object.values(MovementType).includes(type as MovementType))
    ) {
      return NextResponse.json(
        { message: "type debe ser INCOME o EXPENSE" },
        { status: 400 },
      );
    }

    // Si no mandan type, conservamos el actual
    const finalType =
      (type as MovementType | undefined) ?? existingTransaction.type;

    if (!isValidTransactionDescription(description)) {
      return NextResponse.json(
        { message: "description debe tener hasta 200 caracteres" },
        { status: 400 },
      );
    }

    // 8. Validar date
    let parsedDate: Date | undefined;

    if (date !== undefined && date !== null) {
      if (typeof date !== "string") {
        return NextResponse.json(
          { message: "date debe ser una fecha válida" },
          { status: 400 },
        );
      }
      parsedDate = parseDateOnly(date) ?? undefined;

      if (!parsedDate) {
        return NextResponse.json(
          { message: "date debe ser una fecha válida" },
          { status: 400 },
        );
      }
    }

    // 9. Validar categoría
    if (
      category_id !== undefined &&
      (typeof category_id !== "string" || !category_id)
    ) {
      return NextResponse.json(
        { message: "category_id debe ser un identificador válido" },
        { status: 400 },
      );
    }
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
    const finalDate = serializeDateOnly(parsedDate ?? existingTransaction.date);
    const snapshot =
      body.exchange_rates !== undefined
        ? manualSnapshot(body.exchange_rates, finalDate)
        : finalDate === serializeDateOnly(existingTransaction.date)
          ? await transactionSnapshot(existingTransaction)
          : await getHistoricalRates(finalDate);
    // Cambiar solo fecha conserva el importe y moneda originales y aplica la nueva fecha.
    const originalAmount =
      inputAmount ??
      existingTransaction.originalAmount ??
      existingTransaction.amount;
    const originalCurrency =
      inputAmount !== undefined
        ? user.currency
        : (existingTransaction.originalCurrency ?? "USD");
    const parsedAmount = historicalAmount(
      originalAmount,
      originalCurrency,
      "USD",
      snapshot,
    );
    if (
      parsedAmount.lessThanOrEqualTo(0) ||
      parsedAmount.greaterThan("99999999.99")
    ) {
      return NextResponse.json(
        { message: "El monto convertido no cabe en el rango permitido" },
        { status: 400 },
      );
    }
    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: existingTransaction.id,
      },
      data: {
        ...(inputAmount !== undefined
          ? { originalAmount: inputAmount, originalCurrency: user.currency }
          : {}),
        exchangeSnapshot: snapshot,
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
      amount: historicalAmount(
        originalAmount,
        originalCurrency,
        user.currency,
        snapshot,
      ).toNumber(),
      exchangeSnapshot: snapshot,
      currency: user.currency,
      type: updatedTransaction.type,
      description: updatedTransaction.description,
      date: serializeDateOnly(updatedTransaction.date),
      category_id: updatedTransaction.categoryId,
      created_at: updatedTransaction.createdAt,
    });
  } catch (error) {
    if (error instanceof HistoricalRateError)
      return NextResponse.json(
        { message: error.message, code: "HISTORICAL_RATES_UNAVAILABLE" },
        { status: 422 },
      );
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
  } catch {
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
