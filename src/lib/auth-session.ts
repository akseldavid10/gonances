import { randomUUID } from "node:crypto";
import { jwtVerify, SignJWT } from "jose";
import { jwtSecret } from "@/lib/env-secret";
import { prisma } from "@/lib/prisma";

export const ACCESS_TOKEN_SECONDS = 30 * 60;
export const REFRESH_TOKEN_SECONDS = 7 * 24 * 60 * 60;
const CONCURRENT_REFRESH_GRACE_MS = 10_000;

type SessionUser = { id: string; tokenVersion: number };

function unixSeconds(date: Date) {
  return Math.floor(date.getTime() / 1000);
}

async function signAccessToken(user: SessionUser, sessionId: string) {
  return new SignJWT({ sub: user.id, sid: sessionId, ver: user.tokenVersion })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${ACCESS_TOKEN_SECONDS}s`)
    .sign(jwtSecret("JWT_ACCESS_SECRET"));
}

async function signRefreshToken(
  user: SessionUser,
  sessionId: string,
  tokenId: string,
  issuedAt: Date,
  expiresAt: Date,
) {
  return new SignJWT({ sub: user.id, sid: sessionId, ver: user.tokenVersion })
    .setProtectedHeader({ alg: "HS256" })
    .setJti(tokenId)
    .setIssuedAt(unixSeconds(issuedAt))
    .setExpirationTime(unixSeconds(expiresAt))
    .sign(jwtSecret("JWT_REFRESH_SECRET"));
}

async function cleanExpiredRefreshSessions() {
  if (Math.random() >= 0.01) return;
  await prisma.refreshSession.deleteMany({
    where: { expiresAt: { lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
  });
}

export async function createSessionTokens(user: SessionUser) {
  await cleanExpiredRefreshSessions();
  const sessionId = randomUUID();
  const tokenId = randomUUID();
  const issuedAt = new Date(Math.floor(Date.now() / 1000) * 1000);
  const expiresAt = new Date(issuedAt.getTime() + REFRESH_TOKEN_SECONDS * 1000);
  const [accessToken, refreshToken] = await Promise.all([
    signAccessToken(user, sessionId),
    signRefreshToken(user, sessionId, tokenId, issuedAt, expiresAt),
  ]);

  await prisma.refreshSession.create({
    data: {
      id: sessionId,
      userId: user.id,
      currentRefreshTokenId: tokenId,
      currentIssuedAt: issuedAt,
      expiresAt,
    },
  });
  return { accessToken, refreshToken };
}

export async function createAccessToken(user: SessionUser, sessionId: string) {
  return signAccessToken(user, sessionId);
}

type VerifiedRefresh = {
  userId: string;
  sessionId: string;
  tokenId: string;
  tokenVersion: number;
};

async function verifyRefreshToken(
  token: string,
): Promise<VerifiedRefresh | null> {
  try {
    const { payload } = await jwtVerify(
      token,
      jwtSecret("JWT_REFRESH_SECRET"),
      {
        algorithms: ["HS256"],
      },
    );
    if (
      typeof payload.sub !== "string" ||
      typeof payload.sid !== "string" ||
      typeof payload.jti !== "string" ||
      typeof payload.ver !== "number"
    ) {
      return null;
    }
    return {
      userId: payload.sub,
      sessionId: payload.sid,
      tokenId: payload.jti,
      tokenVersion: payload.ver,
    };
  } catch {
    return null;
  }
}

export async function rotateRefreshToken(
  token: string,
): Promise<{ token: string; user: SessionUser; sessionId: string } | null> {
  await cleanExpiredRefreshSessions();
  const verified = await verifyRefreshToken(token);
  if (!verified) return null;

  const user = await prisma.user.findUnique({
    where: { id: verified.userId },
    select: { id: true, tokenVersion: true },
  });
  if (!user || user.tokenVersion !== verified.tokenVersion) return null;

  const now = new Date(Math.floor(Date.now() / 1000) * 1000);
  const nextId = randomUUID();
  const nextExpiresAt = new Date(now.getTime() + REFRESH_TOKEN_SECONDS * 1000);
  const updated = await prisma.refreshSession.updateMany({
    where: {
      id: verified.sessionId,
      userId: user.id,
      currentRefreshTokenId: verified.tokenId,
      revokedAt: null,
      expiresAt: { gt: now },
    },
    data: {
      previousRefreshTokenId: verified.tokenId,
      currentRefreshTokenId: nextId,
      currentIssuedAt: now,
      expiresAt: nextExpiresAt,
      rotatedAt: now,
    },
  });

  if (updated.count === 1) {
    return {
      token: await signRefreshToken(
        user,
        verified.sessionId,
        nextId,
        now,
        nextExpiresAt,
      ),
      user,
      sessionId: verified.sessionId,
    };
  }

  const session = await prisma.refreshSession.findUnique({
    where: { id: verified.sessionId },
  });
  if (
    session &&
    session.userId === user.id &&
    !session.revokedAt &&
    session.expiresAt > now &&
    session.previousRefreshTokenId === verified.tokenId &&
    session.rotatedAt &&
    now.getTime() - session.rotatedAt.getTime() <= CONCURRENT_REFRESH_GRACE_MS
  ) {
    return {
      token: await signRefreshToken(
        user,
        session.id,
        session.currentRefreshTokenId,
        session.currentIssuedAt,
        session.expiresAt,
      ),
      user,
      sessionId: session.id,
    };
  }

  if (session && session.userId === user.id && !session.revokedAt) {
    await prisma.refreshSession.updateMany({
      where: { id: session.id, revokedAt: null },
      data: { revokedAt: now },
    });
  }
  return null;
}

async function sessionIdFromAccessToken(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, jwtSecret("JWT_ACCESS_SECRET"), {
      algorithms: ["HS256"],
    });
    return typeof payload.sid === "string" ? payload.sid : null;
  } catch {
    return null;
  }
}

export async function revokeSession(
  refreshToken: string | undefined,
  accessToken?: string,
) {
  const refresh = refreshToken ? await verifyRefreshToken(refreshToken) : null;
  const sessionId =
    refresh?.sessionId ?? (await sessionIdFromAccessToken(accessToken));
  if (!sessionId) return;
  await prisma.refreshSession.updateMany({
    where: { id: sessionId, revokedAt: null },
    data: { revokedAt: new Date() },
  });
}
