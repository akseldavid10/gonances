-- Refresh-token rotation state. JWT identifiers are random and are not secrets.
CREATE TABLE "refresh_sessions" (
    "id" TEXT NOT NULL,
    "family_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "used_at" TIMESTAMP(3),
    "revoked_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "refresh_sessions_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "refresh_sessions_user_id_expires_at_idx"
    ON "refresh_sessions"("user_id", "expires_at");
CREATE INDEX "refresh_sessions_family_id_idx"
    ON "refresh_sessions"("family_id");
ALTER TABLE "refresh_sessions"
    ADD CONSTRAINT "refresh_sessions_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "users"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

-- Atomic, expiring counters for authentication request throttling.
CREATE TABLE "rate_limit_buckets" (
    "key" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "window_started_at" TIMESTAMP(3) NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "rate_limit_buckets_pkey" PRIMARY KEY ("key")
);
CREATE INDEX "rate_limit_buckets_expires_at_idx"
    ON "rate_limit_buckets"("expires_at");

-- Transaction dates are calendar dates, not instants. Preserve their stored day.
ALTER TABLE "transactions"
    ALTER COLUMN "date" TYPE DATE USING "date"::date;
