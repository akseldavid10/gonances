import type { Transaction } from "./data";

type ExampleMovement = Omit<Transaction, "id" | "date"> & { day: number };

// Un mes completo de ejemplo: ingresos y seis categorías de gasto.
// Días <= 28 para que también sean válidos en febrero.
const monthlyExamples: ExampleMovement[] = [
  {
    day: 1,
    amount: 1850,
    type: "INCOME",
    description: "Sueldo mensual",
    categoryId: "c-salary",
  },
  {
    day: 3,
    amount: 620,
    type: "EXPENSE",
    description: "Alquiler",
    categoryId: "c-home",
  },
  {
    day: 5,
    amount: 145,
    type: "EXPENSE",
    description: "Compra del supermercado",
    categoryId: "c-food",
  },
  {
    day: 8,
    amount: 75,
    type: "EXPENSE",
    description: "Transporte",
    categoryId: "c-transport",
  },
  {
    day: 12,
    amount: 115,
    type: "EXPENSE",
    description: "Luz e internet",
    categoryId: "c-services",
  },
  {
    day: 15,
    amount: 180,
    type: "INCOME",
    description: "Trabajo freelance",
    categoryId: "c-other-income",
  },
  {
    day: 18,
    amount: 85,
    type: "EXPENSE",
    description: "Cine y salidas",
    categoryId: "c-leisure",
  },
  {
    day: 21,
    amount: 45,
    type: "EXPENSE",
    description: "Farmacia",
    categoryId: "c-health",
  },
  {
    day: 24,
    amount: 95,
    type: "EXPENSE",
    description: "Mercado del barrio",
    categoryId: "c-food",
  },
  {
    day: 28,
    amount: 62.5,
    type: "EXPENSE",
    description: "Cena",
    categoryId: "c-food",
  },
];

const monthlyVariation = [
  { income: 1, expense: 0.86 },
  { income: 0.98, expense: 1.04 },
  { income: 1.06, expense: 0.94 },
  { income: 1.01, expense: 1.12 },
  { income: 1.08, expense: 0.98 },
  { income: 1.04, expense: 1.06 },
];

/**
 * Seis meses de demostración, desde hace cinco meses hasta el mes actual.
 * Todo permanece estable dentro del mes y avanza al comenzar el siguiente.
 * Son meses completos ficticios, no movimientos reales acumulados hasta hoy.
 * Se calcula al llamar, nunca al importar el módulo, para evitar fechas obsoletas.
 */
export function getDynamicFalseTransactions(now = new Date()): Transaction[] {
  if (Number.isNaN(now.getTime())) {
    throw new RangeError("Fecha de referencia inválida");
  }

  return monthlyVariation.flatMap((variation, index) => {
    const month = new Date(now.getFullYear(), now.getMonth() - 5 + index, 1);
    const yearMonth = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, "0")}`;

    return monthlyExamples.map(({ day, ...movement }, movementIndex) => ({
      ...movement,
      id: `demo-${yearMonth}-${movementIndex + 1}`,
      amount:
        Math.round(
          movement.amount *
            (movement.type === "INCOME"
              ? variation.income
              : variation.expense) *
            100,
        ) / 100,
      // Hora local explícita: evita desplazar el día al interpretar una fecha UTC.
      date: `${yearMonth}-${String(day).padStart(2, "0")}T12:00:00`,
    }));
  });
}
