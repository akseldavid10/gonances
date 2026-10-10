// src/lib/getInfoToken.ts

import { type JWTPayload, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { jwtSecret } from "@/lib/env-secret";
import { prisma } from "@/lib/prisma";

export default async function getInfoToken(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();

  const accesstoken = cookieStore.get("accesstoken")?.value;

  if (!accesstoken) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(
      accesstoken,
      jwtSecret("JWT_ACCESS_SECRET"),
      { algorithms: ["HS256"] },
    );

    if (
      typeof payload.sub !== "string" ||
      typeof payload.sid !== "string" ||
      typeof payload.ver !== "number"
    ) {
      return null;
    }
    const session = await prisma.refreshSession.findUnique({
      where: { id: payload.sid },
      select: {
        userId: true,
        expiresAt: true,
        revokedAt: true,
        user: { select: { tokenVersion: true } },
      },
    });
    if (
      !session ||
      session.userId !== payload.sub ||
      session.revokedAt ||
      session.expiresAt <= new Date() ||
      payload.ver !== session.user.tokenVersion
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
