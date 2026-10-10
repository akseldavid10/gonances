import { createHmac } from "node:crypto";
import { Prisma } from "@/generated/prisma/client";
import { jwtSecret } from "@/lib/env-secret";
import { prisma } from "@/lib/prisma";

export function requestIp(request: Request) {
  if (process.env.VERCEL) {
    return (
      request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip")?.trim() ??
      null
    );
  }
  if (process.env.TRUST_PROXY_HEADERS === "true") {
    return (
      request.headers.get("x-real-ip")?.trim() ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      null
    );
  }
  return null;
}

function bucketKey(scope: string, identity: string) {
  return createHmac("sha256", jwtSecret("JWT_ACCESS_SECRET"))
    .update(`${scope}\0${identity.toLowerCase()}`)
    .digest("hex");
}

export async function isRateLimitedRequest(
  scope: string,
  identity: string,
  limit: number,
  windowSeconds: number,
) {
  const bucket = await prisma.rateLimitBucket.findUnique({
    where: { key: bucketKey(scope, identity) },
    select: { count: true, windowStartedAt: true },
  });
  return Boolean(
    bucket &&
      Date.now() - bucket.windowStartedAt.getTime() < windowSeconds * 1000 &&
      bucket.count >= limit,
  );
}

export async function clearRateLimitBucket(scope: string, identity: string) {
  await prisma.rateLimitBucket.deleteMany({
    where: { key: bucketKey(scope, identity) },
  });
}

export async function allowRateLimitedRequest(
  scope: string,
  identity: string,
  limit: number,
  windowSeconds: number,
) {
  const key = bucketKey(scope, identity);
  const rows = await prisma.$queryRaw<Array<{ count: number }>>(Prisma.sql`
    INSERT INTO "rate_limit_buckets" ("key", "count", "window_started_at", "expires_at")
    VALUES (
      ${key},
      1,
      now(),
      now() + make_interval(secs => ${windowSeconds})
    )
    ON CONFLICT ("key") DO UPDATE SET
      "count" = CASE
        WHEN "rate_limit_buckets"."window_started_at" <= now() - make_interval(secs => ${windowSeconds})
        THEN 1 ELSE "rate_limit_buckets"."count" + 1
      END,
      "window_started_at" = CASE
        WHEN "rate_limit_buckets"."window_started_at" <= now() - make_interval(secs => ${windowSeconds})
        THEN now() ELSE "rate_limit_buckets"."window_started_at"
      END,
      "expires_at" = now() + make_interval(secs => ${windowSeconds})
    RETURNING "count"
  `);

  if (Math.random() < 0.01) {
    await prisma.rateLimitBucket.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
  }

  return (rows[0]?.count ?? limit + 1) <= limit;
}
