import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { IncomeExpenseBars, SeriesLegend } from "@/components/dashboard/charts";
import { ExpenseBreakdown } from "@/components/dashboard/expense-breakdown";
import { CategoryStamp } from "@/components/ui/category-icon";
import { PageHeader, Panel } from "@/components/ui/panel";
import { categoryById } from "@/lib/data";
import { fetchDashboardData } from "@/lib/fetchTransactions";
import { money, monthLabel, shortDate, signedMoney } from "@/lib/format";
import { userToday } from "@/lib/user-today";

export const metadata: Metadata = { title: "Panel" };

export default async function DashboardPage() {
  const referenceDate = await userToday();
  const year = referenceDate.getUTCFullYear();
  const month = referenceDate.getUTCMonth();
  const { summary, breakdown, trends, recent, monthCount, currency } =
    await fetchDashboardData(referenceDate);

  return (
    <>
      <PageHeader
        title={`Tu ${monthLabel(year, month)}`}
        lead={`${monthCount} movimientos anotados en lo que va del mes.`}
      />

      {/* Los tres totales viven en una sola hoja, separados por filete:
          son partes de la misma cuenta, no tres tarjetas sueltas. */}
      <div className="grid divide-y divide-rule rounded-lg border border-rule bg-sheet sm:grid-cols-3 sm:divide-x sm:divide-y-0 ">
        <Kpi
          label="Balance total"
          amount={summary.balance}
          tone="ink"
          currency={currency}
        />
        <Kpi
          label="Ingresos del mes"
          amount={summary.incomes}
          tone="income"
          currency={currency}
        />
        <Kpi
          label="Gastos del mes"
          amount={summary.expenses}
          tone="expense"
          currency={currency}
        />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Panel
          title="En qué se fue el gasto"
          aside={
            <span className="text-[13px] text-ink-faint">
              {monthLabel(year, month)}
            </span>
          }
        >
          <ExpenseBreakdown rows={breakdown} height={236} currency={currency} />
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
          <IncomeExpenseBars data={trends} height={262} currency={currency} />
        </Panel>
      </div>

      <div className="mt-5">
        <Panel
          title="Últimos movimientos"
          aside={
            <Link
              href="/transactions"
              className="inline-flex items-center gap-1.5 text-[14px] text-ink-soft underline-offset-4 hover:text-ink hover:underline"
            >
              Ver todas las transacciones
              <ArrowRight size={15} />
            </Link>
          }
          bodyClassName=""
        >
          {recent.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <p className="text-[15px] text-ink">
                Tu libro todavía está en blanco.
              </p>
              <p className="mx-auto mt-1.5 max-w-[46ch] text-[14px] text-ink-soft">
                Usa «Nueva transacción» arriba y el primer movimiento aparecerá
                aquí.
              </p>
            </div>
          ) : (
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Los ocho movimientos más recientes de tu libro
              </caption>
              <thead>
                <tr className="text-[12px] text-ink-faint">
                  <th scope="col" className="px-4 py-2 font-medium sm:px-5">
                    Fecha
                  </th>
                  <th scope="col" className="py-2 font-medium">
                    Concepto
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-right font-medium sm:px-5"
                  >
                    Monto
                  </th>
                </tr>
              </thead>
              <tbody>
                {recent.map((t) => {
                  const cat = categoryById(t.categoryId) ?? t.category;
                  return (
                    <tr
                      key={t.id}
                      className="border-t border-rule-soft even:bg-band/45"
                    >
                      <td className="px-4 py-2 align-middle text-[13px] whitespace-nowrap text-ink-faint sm:px-5">
                        {shortDate(t.date)}
                      </td>
                      <td className="py-2 align-middle">
                        <span className="flex items-center gap-3">
                          <CategoryStamp
                            icon={cat?.icon ?? "HelpCircle"}
                            color={cat?.color ?? "#6d7c72"}
                            size={26}
                          />
                          <span className="min-w-0">
                            <span className="block truncate text-[14px] leading-tight text-ink">
                              {t.description || cat?.name || "Sin descripción"}
                            </span>
                            <span className="block text-[12px] leading-tight text-ink-faint">
                              {cat?.name ?? "Categoría"}
                            </span>
                          </span>
                        </span>
                      </td>
                      <td
                        className={`num px-4 py-3 text-right align-middle text-[14px] whitespace-nowrap sm:px-5 ${
                          t.type === "INCOME" ? "text-income" : "text-expense"
                        }`}
                      >
                        {signedMoney(t.amount, t.type, currency)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </Panel>
      </div>
    </>
  );
}

function Kpi({
  label,
  amount,
  tone,
  currency,
}: {
  label: string;
  amount: number;
  tone: "ink" | "income" | "expense";
  currency: import("@/lib/currencies").CurrencyCode;
}) {
  const color =
    tone === "income"
      ? "text-income"
      : tone === "expense"
        ? "text-expense"
        : "text-ink";
  return (
    <div className="px-5 py-5">
      <p className="text-[13px] text-ink-soft">{label}</p>
      <p
        className={`engraved mt-1.5 text-[clamp(1.9rem,3.6vw,2.5rem)] leading-none ${color}`}
      >
        {money(amount, currency)}
      </p>
    </div>
  );
}
