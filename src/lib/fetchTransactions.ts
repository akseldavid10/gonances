import { cookies } from "next/headers";
import { Transaction } from "./data";

export async function fetchTransactions(): Promise<Transaction[]> {
  const response = await fetch("/api/v1/transactions", {
    headers: {
      Cookie: (await cookies()).toString(),
    },
  });

  if (!response.ok) {
    throw new Error("No se pudieron obtener las transacciones");
  }

  const data = await response.json();

  return data.items.map((t: any) => ({
    id: t.id,
    amount: Number(t.amount),
    type: t.type,
    description: t.description,
    date: t.date,
    categoryId: t.categoryId,
  }));
}
