import type { Metadata } from "next";
import Link from "next/link";
import { SwaggerReference } from "@/components/site/api-reference";

export const metadata: Metadata = { title: "Documentación de la API" };

export default function ApiDocsPage() {
  const specUrl = new URL(
    "/openapi.yaml",
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",
  ).toString();

  return (
    <section className="mx-auto max-w-290 px-5 py-10 sm:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl text-ink">Gonances API</h1>
        <Link className="text-sm underline" href="/redoc">
          Ver documentación ReDoc
        </Link>
      </div>
      <SwaggerReference specUrl={specUrl} />
    </section>
  );
}
