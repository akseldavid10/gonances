// src/lib/getInfoToken.ts

import { cookies } from "next/headers";
import { jwtVerify, JWTPayload } from "jose";

export default async function getInfoToken(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();

  const accesstoken = cookieStore.get("accesstoken")?.value;

  if (!accesstoken) {
    return null;
  }

  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) {
    console.error("JWT_ACCESS_SECRET not configured");
    return null;
  }

  const secretEncoded = new TextEncoder().encode(secret);

  try {
    const { payload } = await jwtVerify(accesstoken, secretEncoded);

    return payload;
  } catch {
    return null;
  }
}
