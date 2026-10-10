import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import {
  ExpenseTrendArea,
  IncomeExpenseBars,
  SeriesLegend,
} from "@/components/dashboard/charts";
import { PageHeader, Panel } from "@/components/ui/panel";
import { getMonthlyAnalytics } from "@/lib/analytics";
import { authenticatedUserId } from "@/lib/api-auth";
import { money, monthLabel } from "@/lib/format";

export const metadata: Metadata = { title: "Estadísticas" };

export default async function AnalyticsPage() {
  await connection();
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const userId = await authenticatedUserId();
  if (!userId) redirect("/login");
  const analytics = await getMonthlyAnalytics(userId, now);
  const currency = analytics.currency;
  const trends = analytics.monthlyTrends;
  const ranking = analytics.expensesByCategory.map((row) => ({
    cat: { id: row.categoryId, name: row.category, color: row.color },
    amount: row.amount,
  }));
  const top = ranking[0];
  const max = ranking[0]?.amount ?? 1;
  const monthExpenses = analytics.currentMonthExpenses;
  const daysElapsed = now.getUTCDate();
  const dailyAverage = monthExpenses / Math.max(1, daysElapsed);

  // El mes en curso va a medias, así que no compite por "el más caro".
  const closed = trends.slice(0, -1);
  const priciest = [...closed].sort((a, b) => b.expenses - a.expenses)[0];
  const saved = trends.reduce((s, m) => s + (m.incomes - m.expenses), 0);

  return (
    <>
      <PageHeader
        title="Estadísticas"
        lead="Los últimos seis meses de tu libro, leídos de corrido."
      />

      {/* Tres lecturas en una frase cada una: el número primero, la
          explicación después. */}
      <div className="grid divide-y divide-rule rounded-lg border border-rule bg-sheet sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <Finding
          amount={money(dailyAverage, currency)}
          text={`Es tu gasto promedio por día en ${monthLabel(year, month)}.`}
        />
        <Finding
          amount={money(priciest?.expenses ?? 0, currency)}
          text={`Fue el mes cerrado más caro, en ${
            priciest ? monthLabel(priciest.year, priciest.month) : "—"
          }.`}
        />
        <Finding
          amount={money(saved, currency)}
          text="Es lo que te quedó después de restar todos los gastos a todos los ingresos."
          tone={saved >= 0 ? "income" : "expense"}
        />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Panel
          title="Cómo evolucionó tu gasto"
          aside={
            <SeriesLegend items={[{ label: "Gastos", series: "expense" }]} />
          }
        >
          <ExpenseTrendArea data={trends} height={268} currency={currency} />
        </Panel>

        <Panel
          title="Ingresos contra gastos"
          aside={
            <SeriesLegend
              items={[
                { label: "Ingresos", series: "income" },
                { label: "Gastos", series: "expense" },
              ]}
            />
          }
        >
          <IncomeExpenseBars data={trends} height={268} currency={currency} />
        </Panel>
      </div>

      <div className="mt-5">
        <Panel
          title="En qué gastas más"
          aside={
            <span className="text-[13px] text-ink-faint">
              Acumulado de los últimos seis meses
            </span>
          }
        >
          {top ? (
            <p className="mb-5 max-w-[68ch] text-[15px] leading-relaxed text-ink-soft">
              <strong className="font-semibold text-ink">
                {top.cat?.name ?? "Categoría"}
              </strong>{" "}
              se lleva la mayor parte: {money(top.amount, currency)} en seis
              meses.
            </p>
          ) : null}

          <ul className="grid gap-3">
            {ranking.map((r) => (
              <li key={r.cat?.id ?? "cat"} className="grid gap-1.5">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[14px] text-ink">
                    {r.cat?.name ?? "Categoría"}
                  </span>
                  <span className="num text-[14px] text-ink-soft">
                    {money(r.amount, currency)}
                  </span>
                </div>
                <div className="h-2.5 rounded-sm bg-band">
                  <div
                    className="h-full rounded-sm"
                    style={{
                      width: `${Math.max(2, (r.amount / max) * 100)}%`,
                      backgroundColor: r.cat?.color ?? "#6d7c72",
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}

function Finding({
  amount,
  text,
  tone = "ink",
}: {
  amount: string;
  text: string;
  tone?: "ink" | "income" | "expense";
}) {
  const color =
    tone === "income"
      ? "text-income"
      : tone === "expense"
        ? "text-expense"
        : "text-ink";
  return (
    <div className="px-5 py-5">
      <p
        className={`engraved text-[clamp(1.7rem,3.2vw,2.2rem)] leading-none ${color}`}
      >
        {amount}
      </p>
      <p className="mt-2.5 max-w-[34ch] text-[14px] leading-relaxed text-ink-soft">
        {text}
      </p>
    </div>
  );
}
