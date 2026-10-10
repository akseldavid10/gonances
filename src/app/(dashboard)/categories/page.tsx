import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CategoriesManager } from "@/components/dashboard/categories-manager";
import { PageHeader } from "@/components/ui/panel";
import { authenticatedUserId } from "@/lib/api-auth";
import type { Category } from "@/lib/data";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Categorías" };

export default async function CategoriesPage() {
  const userId = await authenticatedUserId();
  if (!userId) redirect("/login");
  const records = await prisma.category.findMany({
    where: { OR: [{ userId: null }, { userId }] },
    orderBy: [{ userId: "asc" }, { name: "asc" }],
  });
  const categories: Category[] = records.map((category) => ({
    id: category.id,
    name: category.name,
    type: category.type,
    icon: category.icon ?? "Wallet",
    color: category.color,
    isCustom: category.userId !== null,
  }));

  return (
    <>
      <PageHeader
        title="Categorías"
        lead="Las que vienen con Gonances y las que creas tú. Cada una tiene su tinta y su icono para reconocerla de un vistazo en la tabla y en los gráficos."
      />
      <CategoriesManager items={categories} />
    </>
  );
}
