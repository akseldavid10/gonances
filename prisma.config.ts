import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL, // Usa la URL directa para migraciones
  },
  migrations: {
    path: "prisma/migrations",
  },
  schema: "prisma/schema.prisma",
});
