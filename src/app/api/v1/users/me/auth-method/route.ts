// app/api/v1/users/me/auth-method/route.ts
import { NextResponse } from "next/server";
import getInfoToken from "@/lib/getInfoToken";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const payload = await getInfoToken(); // { email, sub }
    if (!payload?.sub) {
      return NextResponse.json({ message: "Token inválido" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    let is: boolean;

    if (user.metodoAutenticacion === "local") {
      is = true;
    } else {
      is = false;
    }

    return NextResponse.json({ isLocal: is });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
