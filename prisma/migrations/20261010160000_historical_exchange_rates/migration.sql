ALTER TABLE "transactions"
  ADD COLUMN "original_amount" DECIMAL(18,2),
  ADD COLUMN "original_currency" "CurrencyCode",
  ADD COLUMN "exchange_snapshot" JSONB;

CREATE TABLE "historical_exchange_rates" (
  "date" DATE NOT NULL,
  "snapshot" JSONB NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "historical_exchange_rates_pkey" PRIMARY KEY ("date")
);
