import { NextResponse } from "next/server";
import { getMonthlyAnalytics } from "@/lib/analytics";
import { authenticatedUserId } from "@/lib/api-auth";

export async function GET() {
  const userId = await authenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }
  try {
    const analytics = await getMonthlyAnalytics(userId);
    return NextResponse.json({
      currency: analytics.currency,
      items: analytics.monthlyTrends,
    });
  } catch {
    return NextResponse.json(
      { error: "No se pudieron calcular las tendencias" },
      { status: 500 },
    );
  }
}
