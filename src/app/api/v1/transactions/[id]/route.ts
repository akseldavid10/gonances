import { NextRequest } from "next/server";
import {
  DELETE as deleteTransaction,
  PUT as updateTransaction,
} from "../route";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const url = new URL(request.url);
  url.searchParams.set("id", id);
  const body = await request.text();
  return updateTransaction(
    new NextRequest(url, {
      method: "PUT",
      headers: request.headers,
      body,
    }),
  );
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const url = new URL(request.url);
  url.searchParams.set("id", id);
  return deleteTransaction(
    new NextRequest(url, { method: "DELETE", headers: request.headers }),
  );
}
