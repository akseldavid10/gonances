import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    message: "Sesión cerrada correctamente",
  });

  response.cookies.delete("accesstoken");
  response.cookies.delete("refreshtoken");

  return response;
}
