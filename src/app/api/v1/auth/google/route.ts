import { timingSafeEqual } from "node:crypto";
import { OAuth2Client } from "google-auth-library";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createSessionTokens } from "@/lib/auth-session";
import { deleteManagedAvatar } from "@/lib/cloudinary";
import getInfoToken from "@/lib/getInfoToken";
import { prisma } from "@/lib/prisma";

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  new URL(
    "/api/v1/auth/google",
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",
  ).toString(),
);

const OAUTH_COOKIES = [
  "google_oauth_state",
  "google_oauth_nonce",
  "google_oauth_intent",
] as const;

function clearOAuthCookies(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  for (const name of OAUTH_COOKIES) {
    cookieStore.set(name, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api/v1/auth/google",
      maxAge: 0,
    });
  }
}

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const { searchParams } = new URL(request.url);

    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const expectedState = cookieStore.get("google_oauth_state")?.value;
    const expectedNonce = cookieStore.get("google_oauth_nonce")?.value;
    const intent = cookieStore.get("google_oauth_intent")?.value ?? "login";

    if (
      !state ||
      !expectedState ||
      !expectedNonce ||
      !safeEqual(state, expectedState)
    ) {
      clearOAuthCookies(cookieStore);
      return NextResponse.json(
        {
          error:
            "La solicitud de Google expiró o no es válida. Inténtalo de nuevo.",
        },
        { status: 401 },
      );
    }
    clearOAuthCookies(cookieStore);

    if (!code) {
      return NextResponse.json(
        { error: "No se recibió el código de Google" },
        { status: 400 },
      );
    }

    // 1. Intercambiar el code por tokens
    const { tokens } = await googleClient.getToken(code);

    if (!tokens.id_token) {
      return NextResponse.json(
        { error: "Google no devolvió un ID token" },
        { status: 401 },
      );
    }

    // 2. Verificar el ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email || payload.nonce !== expectedNonce) {
      return NextResponse.json(
        { error: "Token o nonce de Google inválido" },
        { status: 401 },
      );
    }

    const {
      sub: googleId,
      name,
      picture,
      email_verified: emailVerified,
    } = payload;
    const email = payload.email.trim().toLowerCase();

    if (!emailVerified) {
      return NextResponse.json(
        { error: "El correo de Google no está verificado" },
        { status: 401 },
      );
    }

    if (intent === "delete-account") {
      const session = await getInfoToken();
      if (typeof session?.sub !== "string") {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      const currentUser = await prisma.user.findUnique({
        where: { id: session.sub },
        select: { id: true, googleId: true },
      });
      if (!currentUser || currentUser.googleId !== googleId) {
        return NextResponse.redirect(
          new URL("/settings?error=google-account-mismatch", request.url),
        );
      }
      await deleteManagedAvatar(currentUser.id);
      await prisma.$transaction(async (tx) => {
        await tx.transaction.deleteMany({ where: { userId: currentUser.id } });
        await tx.category.deleteMany({ where: { userId: currentUser.id } });
        await tx.user.delete({ where: { id: currentUser.id } });
      });
      cookieStore.delete("accesstoken");
      cookieStore.delete("refreshtoken");
      return NextResponse.redirect(new URL("/?accountDeleted=1", request.url));
    }

    // Una coincidencia de correo no demuestra que el propietario de una cuenta
    // local haya autorizado vincularla con esta identidad de Google.
    let user = await prisma.user.findUnique({ where: { googleId } });
    if (!user) {
      const emailOwner = await prisma.user.findFirst({
        where: { email: { equals: email, mode: "insensitive" } },
        select: { id: true },
      });
      if (emailOwner) {
        return NextResponse.redirect(
          new URL("/login?error=google-link-required", request.url),
        );
      }
      user = await prisma.user.create({
        data: {
          email,
          username: name ?? email.split("@")[0],
          googleId,
          avatarUrl: picture,
          metodoAutenticacion: "google",
        },
      });
    }

    const { accessToken, refreshToken } = await createSessionTokens(user);

    cookieStore.set("accesstoken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 30,
    });

    cookieStore.set("refreshtoken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch (error) {
    console.error("Error en callback de Google:", error);

    return NextResponse.json(
      { error: "Error al iniciar sesión con Google" },
      { status: 500 },
    );
  }
}
