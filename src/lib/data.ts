/** Categorías de demostración y tipos/cálculos compartidos para la interfaz. */

export type TxType = "INCOME" | "EXPENSE";

export type Category = {
  id: string;
  name: string;
  type: TxType;
  icon: string;
  color: string;
  isCustom: boolean;
};

export type Transaction = {
  exchangeSnapshot?: import("./historical-currency").ExchangeSnapshot | null;
  id: string;
  amount: number;
  type: TxType;
  /** Opcional en la API: llega `null` si no se escribió nada. */
  description: string | null;
  date: string; // yyyy-mm-dd
  categoryId: string;
  category?: Pick<Category, "name" | "color" | "icon" | "type" | "isCustom">;
};

export const categories: Category[] = [
  {
    id: "c-food",
    name: "Alimentación",
    type: "EXPENSE",
    icon: "ShoppingBasket",
    color: "#c4611a",
    isCustom: false,
  },
  {
    id: "c-transport",
    name: "Transporte",
    type: "EXPENSE",
    icon: "Bus",
    color: "#4fbfa8",
    isCustom: false,
  },
  {
    id: "c-services",
    name: "Servicios",
    type: "EXPENSE",
    icon: "Plug",
    color: "#8e2a5f",
    isCustom: false,
  },
  {
    id: "c-pets",
    name: "Mascotas",
    type: "EXPENSE",
    icon: "HeartPulse",
    color: "#e07a88",
    isCustom: false,
  },
  {
    id: "c-leisure",
    name: "Ocio",
    type: "EXPENSE",
    icon: "Ticket",
    color: "#d9a81e",
    isCustom: false,
  },
  {
    id: "c-subs",
    name: "Suscripciones",
    type: "EXPENSE",
    icon: "Ticket",
    color: "#6d7c72",
    isCustom: false,
  },
  {
    id: "c-health",
    name: "Salud",
    type: "EXPENSE",
    icon: "HeartPulse",
    color: "#e07a88",
    isCustom: false,
  },
  {
    id: "c-home",
    name: "Hogar",
    type: "EXPENSE",
    icon: "House",
    color: "#1f4e9c",
    isCustom: false,
  },
  {
    id: "c-salary",
    name: "Sueldo",
    type: "INCOME",
    icon: "Wallet",
    color: "#1f6b4a",
    isCustom: false,
  },
  {
    id: "c-other-income",
    name: "Otros ingresos",
    type: "INCOME",
    icon: "PiggyBank",
    color: "#4d7a5f",
    isCustom: false,
  },
];

export const MAX_CUSTOM_CATEGORIES = 5;

export function categoryById(id: string): Category | null {
  return categories.find((c) => c.id === id) ?? null;
}

/* ── Agregados que hoy calcula el cliente y mañana devolverá /analytics ── */

export function inMonth(tx: Transaction, year: number, month: number) {
  const expected = `${year}-${String(month + 1).padStart(2, "0")}`;
  return tx.date.slice(0, 7) === expected;
}

/**
 * Resumen del mes hasta un día concreto. Comparar un mes a medias contra uno
 * cerrado siempre da un porcentaje falso, así que el panel compara la misma
 * altura de mes.
 */
export function summaryUpToDay(
  year: number,
  month: number,
  day: number,
  transactions: Transaction[],
) {
  const monthTx = transactions.filter(
    (t) => inMonth(t, year, month) && Number(t.date.slice(8, 10)) <= day,
  );
  return {
    incomes: monthTx
      .filter((t) => t.type === "INCOME")
      .reduce((s, t) => s + t.amount, 0),
    expenses: monthTx
      .filter((t) => t.type === "EXPENSE")
      .reduce((s, t) => s + t.amount, 0),
  };
}

export function summary(
  year: number,
  month: number,
  transactions: Transaction[],
) {
  const monthTx = transactions.filter((t) => inMonth(t, year, month));
  const incomes = monthTx
    .filter((t) => t.type === "INCOME")
    .reduce((s, t) => s + t.amount, 0);
  const expenses = monthTx
    .filter((t) => t.type === "EXPENSE")
    .reduce((s, t) => s + t.amount, 0);
  const balance = transactions.reduce(
    (s, t) => s + (t.type === "INCOME" ? t.amount : -t.amount),
    0,
  );
  return { balance, incomes, expenses, saved: incomes - expenses };
}

export function expensesByCategory(
  year: number,
  month: number,
  transactions: Transaction[],
) {
  const monthTx = transactions.filter(
    (t) => t.type === "EXPENSE" && inMonth(t, year, month),
  );
  const total = monthTx.reduce((s, t) => s + t.amount, 0) || 1;
  const grouped = new Map<string, number>();
  for (const t of monthTx) {
    grouped.set(t.categoryId, (grouped.get(t.categoryId) ?? 0) + t.amount);
  }
  return [...grouped.entries()]
    .map(([categoryId, amount]) => {
      const cat = categoryById(categoryId);
      const txCategory = monthTx.find(
        (transaction) => transaction.categoryId === categoryId,
      )?.category;
      return {
        categoryId,
        category: cat?.name ?? txCategory?.name ?? "Categoría",
        color: cat?.color ?? txCategory?.color ?? "#6d7c72",
        amount,
        percentage: Math.round((amount / total) * 1000) / 10,
      };
    })
    .sort((a, b) => b.amount - a.amount);
}

export function expensesByCategory2(transactions: Transaction[]) {
  const today = new Date();
  const month = today.getUTCMonth();
  const year = today.getUTCFullYear();

  const monthTx = transactions.filter(
    (t) => t.type === "EXPENSE" && inMonth(t, year, month),
  );
  const total = monthTx.reduce((s, t) => s + t.amount, 0) || 1;
  const grouped = new Map<string, number>();
  for (const t of monthTx) {
    grouped.set(t.categoryId, (grouped.get(t.categoryId) ?? 0) + t.amount);
  }
  return [...grouped.entries()]
    .map(([categoryId, amount]) => {
      const cat = categoryById(categoryId);
      const txCategory = monthTx.find(
        (transaction) => transaction.categoryId === categoryId,
      )?.category;
      return {
        categoryId,
        category: cat?.name ?? txCategory?.name ?? "Categoría",
        color: cat?.color ?? txCategory?.color ?? "#6d7c72",
        amount,
        percentage: Math.round((amount / total) * 1000) / 10,
      };
    })
    .sort((a, b) => b.amount - a.amount);
}

export function monthlyTrends(
  months = 6,
  transactions: Transaction[],
  today = new Date(),
) {
  const out: {
    key: string;
    label: string;
    year: number;
    month: number;
    incomes: number;
    expenses: number;
  }[] = [];
  const short = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
  ];
  for (let back = months - 1; back >= 0; back--) {
    const d = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - back, 1),
    );
    const year = d.getUTCFullYear();
    const month = d.getUTCMonth();
    const monthTx = transactions.filter((t) => inMonth(t, year, month));
    out.push({
      key: `${year}-${month}`,
      label: short[month],
      year,
      month,
      incomes: monthTx
        .filter((t) => t.type === "INCOME")
        .reduce((s, t) => s + t.amount, 0),
      expenses: monthTx
        .filter((t) => t.type === "EXPENSE")
        .reduce((s, t) => s + t.amount, 0),
    });
  }
  return out;
}

export function currentPeriod() {
  const d = new Date();
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() };
}

export function categoryIconFor(id: string) {
  const cat = categoryById(id);
  return cat?.icon ?? "HelpCircle";
}
