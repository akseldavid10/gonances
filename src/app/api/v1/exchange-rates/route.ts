import { NextResponse } from "next/server";
import { authenticatedUserId } from "@/lib/api-auth";
import { getExchangeRates } from "@/lib/exchange-rates";

export async function GET() {
  const userId = await authenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  try {
    const snapshot = await getExchangeRates();
    return NextResponse.json({
      baseCode: "USD",
      rates: snapshot.rates,
      fetchedAt: snapshot.fetchedAt.toISOString(),
    });
  } catch (error) {
    console.error("No se pudieron consultar las tasas de cambio:", error);
    return NextResponse.json(
      { error: "No se pudieron consultar las tasas de cambio" },
      { status: 503 },
    );
  }
}
