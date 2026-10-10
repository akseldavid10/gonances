import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL no está configurada");

const adapter =
  process.env.DATABASE_ADAPTER === "pg"
    ? new PrismaPg({ connectionString })
    : new PrismaNeon({ connectionString });

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
