"use server";

import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getInfoToken from "@/lib/getInfoToken";
import { prisma } from "@/lib/prisma";
import { allowRateLimitedRequest } from "@/lib/rate-limit";

async function startGoogleOAuth(intent: "login" | "delete-account") {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const redirectUri = new URL("/api/v1/auth/google", baseUrl).toString();
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) throw new Error("GOOGLE_CLIENT_ID no está configurado");
  const state = randomBytes(32).toString("base64url");
  const nonce = randomBytes(32).toString("base64url");
  const cookieStore = await cookies();
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/api/v1/auth/google",
    maxAge: 5 * 60,
  };
  cookieStore.set("google_oauth_state", state, cookieOptions);
  cookieStore.set("google_oauth_nonce", nonce, cookieOptions);
  cookieStore.set("google_oauth_intent", intent, cookieOptions);

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    nonce,
    prompt: "select_account",
  });
  if (intent === "delete-account") params.set("max_age", "0");

  redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
}

export async function googleLogin() {
  return startGoogleOAuth("login");
}

export async function googleDeleteAccount() {
  const payload = await getInfoToken();
  if (typeof payload?.sub !== "string") redirect("/login");
  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: { googleId: true },
  });
  if (!user?.googleId) redirect("/settings?error=google-reauth-unavailable");
  if (
    !(await allowRateLimitedRequest(
      "account-delete-google:user",
      payload.sub,
      5,
      15 * 60,
    ))
  ) {
    redirect("/settings?error=too-many-delete-attempts");
  }
  return startGoogleOAuth("delete-account");
}
