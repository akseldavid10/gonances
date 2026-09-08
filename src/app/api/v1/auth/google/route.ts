import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { prisma } from "@/lib/prisma";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/api/v1/auth/google",
);

const ACCESS_TOKEN_SECRET = new TextEncoder().encode(
  process.env.JWT_ACCESS_SECRET!,
);

const REFRESH_TOKEN_SECRET = new TextEncoder().encode(
  process.env.JWT_REFRESH_SECRET!,
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const code = searchParams.get("code");

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

    if (!payload || !payload.email) {
      return NextResponse.json(
        { error: "Token de Google inválido" },
        { status: 401 },
      );
    }

    const { sub: googleId, email, name, picture, email_verified } = payload;

    if (!email_verified) {
      return NextResponse.json(
        { error: "El correo de Google no está verificado" },
        { status: 401 },
      );
    }

    // 3. Buscar usuario
    let user = await prisma.user.findFirst({
      where: {
        OR: [{ googleId }, { email }],
      },
    });

    // 4. Si existe, vincular Google si todavía no lo tiene
    if (user) {
      if (!user.googleId) {
        user = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            googleId,
            avatarUrl: user.avatarUrl ?? picture,
          },
        });
      }
    } else {
      // 5. Crear usuario
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

    // 6. Crear access token
    const accesstoken = await new SignJWT({
      sub: user.id,
      email: user.email,
    })
      .setProtectedHeader({
        alg: "HS256",
      })
      .setIssuedAt()
      .setExpirationTime("30m")
      .sign(ACCESS_TOKEN_SECRET);

    // 7. Crear refresh token
    const refreshtoken = await new SignJWT({
      sub: user.id,
      email: user.email,
    })
      .setProtectedHeader({
        alg: "HS256",
      })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(REFRESH_TOKEN_SECRET);

    // 8. Guardar cookies
    const cookieStore = await cookies();

    cookieStore.set("accesstoken", accesstoken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 30,
    });

    cookieStore.set("refreshtoken", refreshtoken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    // 9. Volver a tu aplicación
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch (error) {
    console.error("Error en callback de Google:", error);

    return NextResponse.json(
      { error: "Error al iniciar sesión con Google" },
      { status: 500 },
    );
  }
}
