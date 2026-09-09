// src/lib/getInfoToken.ts

import { cookies } from "next/headers";
import { jwtVerify, JWTPayload } from "jose";

export default async function getInfoToken(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();

  const accesstoken = cookieStore.get("accesstoken")?.value;

  if (!accesstoken) {
    return null;
  }

  const secret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET!);

  try {
    const { payload } = await jwtVerify(accesstoken, secret);

    return payload;
  } catch {
    return null;
  }
}
