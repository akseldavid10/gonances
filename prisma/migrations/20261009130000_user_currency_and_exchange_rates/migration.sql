CREATE TYPE "CurrencyCode" AS ENUM ('USD', 'EUR', 'JPY', 'GBP', 'COP');

ALTER TABLE "users"
  ADD COLUMN "currency" "CurrencyCode" NOT NULL DEFAULT 'USD';

CREATE TABLE "exchange_rate_cache" (
  "id" TEXT NOT NULL,
  "rates" JSONB NOT NULL,
  "fetched_at" TIMESTAMP(3) NOT NULL,
  "next_refresh_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "exchange_rate_cache_pkey" PRIMARY KEY ("id")
);

INSERT INTO "exchange_rate_cache" ("id", "rates", "fetched_at", "next_refresh_at")
VALUES ('usd', '{"USD":"1"}'::jsonb, NOW(), NOW());
