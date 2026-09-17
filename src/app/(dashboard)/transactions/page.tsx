import type { Metadata } from "next";
import { TransactionsBrowser } from "@/components/dashboard/transactions-browser";
import { PageHeader } from "@/components/ui/panel";

export const metadata: Metadata = { title: "Transacciones" };

export default async function TransactionsPage() {
  return (
    <>
      <PageHeader
        title="Transacciones"
        lead="Todo lo que has anotado. Busca, filtra por tipo o por fecha, y corrige lo que haga falta."
      />
      <TransactionsBrowser />
    </>
  );
}
