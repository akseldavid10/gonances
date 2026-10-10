import "dotenv/config";
import { categories } from "../src/lib/data";
import { prisma } from "../src/lib/prisma";

async function main() {
  for (const category of categories.filter((item) => !item.isCustom)) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {
        name: category.name,
        type: category.type,
        icon: category.icon,
        color: category.color,
        userId: null,
      },
      create: {
        id: category.id,
        name: category.name,
        type: category.type,
        icon: category.icon,
        color: category.color,
        userId: null,
      },
    });
  }
}

main()
  .catch((error) => {
    console.error("No se pudieron sembrar las categorías globales", error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
