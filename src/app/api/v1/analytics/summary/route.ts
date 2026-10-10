import { type NextRequest, NextResponse } from "next/server";
import { getMonthlyAnalytics } from "@/lib/analytics";
import { authenticatedUserId } from "@/lib/api-auth";

export async function GET(request: NextRequest) {
  const userId = await authenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }
  const month = Number(request.nextUrl.searchParams.get("month"));
  const year = Number(request.nextUrl.searchParams.get("year"));
  const now = new Date();
  const selectedMonth = request.nextUrl.searchParams.has("month")
    ? month
    : now.getUTCMonth();
  const selectedYear = request.nextUrl.searchParams.has("year")
    ? year
    : now.getUTCFullYear();
  if (
    !Number.isInteger(selectedMonth) ||
    selectedMonth < 0 ||
    selectedMonth > 11 ||
    !Number.isInteger(selectedYear) ||
    selectedYear < 1900 ||
    selectedYear > 9999
  ) {
    return NextResponse.json({ error: "Mes o año inválido" }, { status: 400 });
  }

  try {
    const analytics = await getMonthlyAnalytics(
      userId,
      new Date(
        Date.UTC(selectedYear, selectedMonth, Math.min(now.getUTCDate(), 28)),
      ),
    );
    return NextResponse.json({
      currency: analytics.currency,
      ...analytics.summary,
    });
  } catch {
    return NextResponse.json(
      { error: "No se pudo calcular el resumen" },
      { status: 500 },
    );
  }
}
