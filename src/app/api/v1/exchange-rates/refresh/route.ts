import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { getExchangeRates } from "@/lib/exchange-rates";

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const authorization = request.headers.get("authorization");
  if (!secret) {
    return NextResponse.json(
      { error: "La actualización programada no está configurada" },
      { status: 503 },
    );
  }
  if (!authorization || !safeEqual(authorization, `Bearer ${secret}`)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const snapshot = await getExchangeRates();
    return NextResponse.json({
      ok: true,
      fetchedAt: snapshot.fetchedAt.toISOString(),
    });
  } catch (error) {
    console.error("No se pudo actualizar la caché de tasas:", error);
    return NextResponse.json(
      { error: "No se pudieron actualizar las tasas" },
      { status: 503 },
    );
  }
}
