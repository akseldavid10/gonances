import { connection } from "next/server";
import { IncomeExpenseBars, SeriesLegend } from "@/components/dashboard/charts";
import { ExpenseBreakdown } from "@/components/dashboard/expense-breakdown";
import { LedgerSheet } from "@/components/landing/ledger-sheet";
import { ButtonLink } from "@/components/ui/button";
import { CategoryStamp } from "@/components/ui/category-icon";
import { expensesByCategory, monthlyTrends } from "@/lib/data";
import { getDynamicFalseTransactions } from "@/lib/falseData";
import { monthLabel } from "@/lib/format";
import { userToday } from "@/lib/user-today";

const features = [
  {
    icon: "ShoppingBasket",
    color: "#c4611a",
    title: "Cada gasto en su categoría",
    body: "Usa las categorías de siempre o crea las tuyas con su color y su icono. El café del lunes y el alquiler no se mezclan.",
  },
  {
    icon: "Ticket",
    color: "#d9a81e",
    title: "El mes entero en un gráfico",
    body: "El reparto por categoría y la comparación con los meses anteriores, sin escribir una sola fórmula.",
  },
  {
    icon: "Wallet",
    color: "#1f6b4a",
    title: "Tu libro es solo tuyo",
    body: "Entra con tu correo o con Google. Cada movimiento queda atado a tu cuenta y nadie más lo ve.",
  },
];

const steps = [
  {
    title: "Abre tu libro",
    body: "Crea la cuenta con tu correo o entra con Google. No pedimos datos bancarios.",
  },
  {
    title: "Anota el movimiento",
    body: "Cuanto fue, categoría, fecha y una descripción si quieres. Tres campos y listo, desde cualquier pantalla.",
  },
  {
    title: "Mira como fue tu mes",
    body: "El cuentas se hacen solas y el gráfico te dice en qué se fue el dinero antes de que termine el mes.",
  },
];

const faqs = [
  {
    q: "¿Se conecta con mi banco?",
    a: "No, y es a propósito. Gonances no pide claves de tu banco ni lee tus tarjetas: anotas tú, en unos segundos, y por eso sabes exactamente qué hay dentro.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Nada mientras dure la beta. Es un proyecto personal abierto, así que puedes usarlo y revisar el código.",
  },
  {
    q: "¿Puedo crear mis propias categorías?",
    a: "Sí, hasta cinco además de las que ya vienen. Eliges nombre, color e icono, y decides si es para ingresos o para gastos.",
  },
  {
    q: "¿Funciona en el celular?",
    a: "Sí. No hay app en las tiendas todavía, pero el sitio está pensado para anotar de pie, con una mano.",
  },
  {
    q: "¿Puedo trabajar con más de una moneda?",
    a: "Sí. Al entrar puedes ver y anotar tu libro en dólares, euros, yenes, libras esterlinas o pesos colombianos. La tasa se actualiza cada hora.",
  },
];

export default async function LandingPage() {
  await connection();
  const now = await userToday();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const transactions = getDynamicFalseTransactions(now);
  const breakdown = expensesByCategory(year, month, transactions);
  const trends = monthlyTrends(6, transactions, now);

  return (
    <>
      {/* ── Portada ───────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-290 px-5 pt-14 pb-16 sm:px-8 sm:pt-20 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.06fr)] lg:gap-16">
          <div>
            <h1 className="font-display text-[clamp(2.5rem,6.2vw,4.1rem)] leading-[1.02] tracking-[-0.02em] text-ink">
              Anota lo que ganas, lo que gastas, en qué y cuándo.
            </h1>
            <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-ink-soft">
              Gonances es tu libro de cuentas personal. Cada gasto o ganancia
              queda registrado, puedes dividirlos en categorías si quieres, el
              saldo se actualiza solo y el mes termina explicado en un gráfico
              sobre cómo usaste tu dinero.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="/register" size="lg">
                Crear mi cuenta gratis
              </ButtonLink>
              <a
                href="#asi-se-lee-tu-mes"
                className="text-[14px] text-ink-soft transition-colors hover:text-ink"
              >
                {"Ver panel de ejemplo"}
              </a>
            </div>
            <p className="mt-5 text-[13px] text-ink-faint">
              Gratis durante la beta. También puedes entrar con tu cuenta de
              Google.
            </p>
          </div>
          <LedgerSheet />
        </div>
      </section>

      {/* ── Características ───────────────────────────────────────────── */}
      <section
        id="caracteristicas"
        className="mx-auto max-w-290 scroll-mt-20 border-t border-rule px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
          <h2 className="font-display text-[clamp(1.9rem,3.4vw,2.7rem)] leading-tight tracking-[-0.015em] text-ink">
            Lo que hace por ti
          </h2>
          <div className="divide-y divide-rule">
            {features.map((f) => (
              <article
                key={f.title}
                className="flex gap-4 py-6 first:pt-0 last:pb-0"
              >
                <CategoryStamp icon={f.icon} color={f.color} size={34} />
                <div>
                  <h3 className="text-[17px] font-semibold text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 max-w-[58ch] text-[15px] leading-relaxed text-ink-soft">
                    {f.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cómo funciona: aquí el orden sí importa, por eso van numerados ── */}
      <section
        id="como-funciona"
        className="mx-auto max-w-290 scroll-mt-20 border-t border-rule px-5 py-16 sm:px-8 sm:py-20"
      >
        <h2 className="font-display text-[clamp(1.9rem,3.4vw,2.7rem)] leading-tight tracking-[-0.015em] text-ink">
          Cómo funciona
        </h2>
        <ol className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-10">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t-2 border-ink pt-4">
              <span className="engraved block text-[21px] leading-none text-ink">
                {i + 1}
              </span>
              <h3 className="mt-2 text-[17px] font-semibold text-ink">
                {s.title}
              </h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Demostración con datos de una cuenta de ejemplo ───────────── */}
      <section
        className="mx-auto max-w-290 scroll-mt-20 border-t border-rule px-5 py-16 sm:px-8 sm:py-20"
        id="asi-se-lee-tu-mes"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-[clamp(1.9rem,3.4vw,2.7rem)] leading-tight tracking-[-0.015em] text-ink">
              Así se lee tu mes
            </h2>
            <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-ink-soft">
              Estos son datos ficticios de seis meses completos, hasta{" "}
              {monthLabel(year, month)}. Se actualizan cada mes. Pasa el cursor
              por encima para ver los montos.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <figure className="m-0 rounded-lg border border-rule bg-sheet p-5 sm:p-6">
            <figcaption className="mb-5 flex items-baseline justify-between gap-4">
              <h3 className="text-[15px] font-semibold text-ink">
                En qué se fue el gasto
              </h3>
              <span className="text-[13px] text-ink-faint">
                {monthLabel(year, month)}
              </span>
            </figcaption>
            <ExpenseBreakdown rows={breakdown} height={230} />
          </figure>

          <figure className="m-0 rounded-lg border border-rule bg-sheet p-5 sm:p-6">
            <figcaption className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-[15px] font-semibold text-ink">
                Ingresos contra gastos
              </h3>
              <SeriesLegend
                items={[
                  { label: "Ingresos", series: "income" },
                  { label: "Gastos", series: "expense" },
                ]}
              />
            </figcaption>
            <IncomeExpenseBars data={trends} height={256} />
          </figure>
        </div>
      </section>

      {/* ── Preguntas frecuentes ──────────────────────────────────────── */}
      <section
        id="preguntas"
        className="mx-auto max-w-290 scroll-mt-20 border-t border-rule px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h2 className="font-display text-[clamp(1.9rem,3.4vw,2.7rem)] leading-tight tracking-[-0.015em] text-ink">
              Preguntas frecuentes
            </h2>
            <p className="mt-4 max-w-[38ch] text-[15px] leading-relaxed text-ink-soft">
              ¿Falta alguna? Escribe a{" "}
              <a
                className="text-ink underline underline-offset-4"
                href="mailto:gonances1@gmail.com"
              >
                gonances1@gmail.com
              </a>
            </p>
          </div>
          <div className="divide-y divide-rule border-y border-rule">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-medium text-ink marker:hidden">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-[20px] leading-none text-ink-faint transition-transform duration-150 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-ink-soft">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cierre ────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-290 px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-lg border border-ink/20 bg-sheet px-6 py-8 sm:px-8">
          <p className="max-w-[40ch] font-display text-[22px] leading-snug text-ink">
            Empieza el libro de este mes hoy, con un solo movimiento anotado.
          </p>
          <ButtonLink href="/register" size="lg">
            Crear mi cuenta gratis
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
