import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { jwtSecret } from "@/lib/env-secret";

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accesstoken")?.value;
  if (accessToken) {
    try {
      await jwtVerify(accessToken, jwtSecret("JWT_ACCESS_SECRET"), {
        algorithms: ["HS256"],
      });
      return NextResponse.next();
    } catch {
      // El layout hará la comprobación autoritativa contra la base de datos.
    }
  }

  if (request.cookies.has("refreshtoken")) {
    const refreshUrl = new URL("/session/refresh", request.url);
    refreshUrl.searchParams.set(
      "returnTo",
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
    );
    return NextResponse.redirect(refreshUrl);
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/transactions/:path*",
    "/categories/:path*",
    "/analytics/:path*",
    "/settings/:path*",
  ],
};
