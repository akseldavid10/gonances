import { type NextRequest, NextResponse } from "next/server";
import { authenticatedUserId } from "@/lib/api-auth";
import { convertedNumber, getExchangeRate } from "@/lib/exchange-rates";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const userId = await authenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }
  const now = new Date();
  const monthParam = request.nextUrl.searchParams.get("month");
  const yearParam = request.nextUrl.searchParams.get("year");
  const month = monthParam === null ? now.getUTCMonth() : Number(monthParam);
  const year = yearParam === null ? now.getUTCFullYear() : Number(yearParam);
  if (
    !Number.isInteger(month) ||
    month < 0 ||
    month > 11 ||
    !Number.isInteger(year) ||
    year < 1900 ||
    year > 9999
  ) {
    return NextResponse.json({ error: "Mes o año inválido" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { currency: true },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }
    const [{ rate }, records] = await Promise.all([
      getExchangeRate(user.currency),
      prisma.transaction.findMany({
        where: {
          userId,
          type: "EXPENSE",
          date: {
            gte: new Date(Date.UTC(year, month, 1)),
            lt: new Date(Date.UTC(year, month + 1, 1)),
          },
        },
        include: { category: true },
      }),
    ]);
    const byCategory = new Map<
      string,
      { category: string; color: string; amount: number }
    >();
    for (const record of records) {
      const row = byCategory.get(record.categoryId) ?? {
        category: record.category.name,
        color: record.category.color,
        amount: 0,
      };
      row.amount += record.amount.toNumber();
      byCategory.set(record.categoryId, row);
    }
    const total = [...byCategory.values()].reduce(
      (sum, row) => sum + row.amount,
      0,
    );
    const items = [...byCategory.entries()]
      .map(([categoryId, row]) => ({
        categoryId,
        ...row,
        amount: convertedNumber(row.amount, rate),
        percentage:
          total === 0 ? 0 : Math.round((row.amount / total) * 1000) / 10,
      }))
      .sort((a, b) => b.amount - a.amount);
    return NextResponse.json({
      currency: user.currency,
      items,
      total: convertedNumber(total, rate),
    });
  } catch {
    return NextResponse.json(
      { error: "No se pudo calcular el desglose" },
      { status: 500 },
    );
  }
}
