-- Existing refresh rows represent token generations rather than stable sessions.
-- They cannot be converted without preserving already-consumed tokens, so this
-- migration intentionally signs users out while retaining all account data.
TRUNCATE TABLE "refresh_sessions";

-- Previous Google linking kept an attacker-chosen local password. There was no
-- explicit linking flow, so Google identities must no longer retain that path.
UPDATE "users"
SET "hashed_password" = NULL, "metodoAutenticacion" = 'google'
WHERE "google_id" IS NOT NULL;

ALTER TABLE "refresh_sessions"
  DROP COLUMN "family_id",
  DROP COLUMN "used_at",
  ADD COLUMN "current_refresh_token_id" TEXT NOT NULL,
  ADD COLUMN "previous_refresh_token_id" TEXT,
  ADD COLUMN "current_issued_at" TIMESTAMP(3) NOT NULL,
  ADD COLUMN "rotated_at" TIMESTAMP(3);

CREATE UNIQUE INDEX "refresh_sessions_current_refresh_token_id_key"
  ON "refresh_sessions"("current_refresh_token_id");
