-- Add short-lived password reset tokens. Only hashes are stored in this table.
ALTER TABLE "users" ADD COLUMN "token_version" INTEGER NOT NULL DEFAULT 0;

CREATE TABLE "password_reset_tokens" (
    "id" TEXT NOT NULL,
    "token_hash" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "used_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "password_reset_tokens_token_hash_key"
    ON "password_reset_tokens"("token_hash");
CREATE INDEX "password_reset_tokens_user_id_expires_at_idx"
    ON "password_reset_tokens"("user_id", "expires_at");
ALTER TABLE "password_reset_tokens"
    ADD CONSTRAINT "password_reset_tokens_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "users"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

-- Preserve user categories when an account is deleted, matching the schema.
ALTER TABLE "categories" DROP CONSTRAINT "categories_user_id_fkey";
ALTER TABLE "categories" ADD CONSTRAINT "categories_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "users"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;

CREATE INDEX "categories_user_id_type_idx" ON "categories"("user_id", "type");
CREATE INDEX "transactions_user_id_date_idx" ON "transactions"("user_id", "date");
CREATE INDEX "transactions_category_id_idx" ON "transactions"("category_id");
