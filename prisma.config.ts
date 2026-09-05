import "dotenv/config";
import { definePrismaConfig } from "prisma/config";

export default definePrismaConfig({
  datasource: {
    url: process.env.DATABASE_URL, // Usa la URL directa para migraciones
  },
  migrations: {
    path: "prisma/migrations",
  },
  schema: "prisma/schema.prisma",
});
