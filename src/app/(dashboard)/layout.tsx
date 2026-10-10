import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { DashboardChrome } from "@/components/dashboard/chrome";
import { UserProvider } from "@/components/provider/user-provider";
import getInfoToken from "@/lib/getInfoToken";
import { prisma } from "@/lib/prisma";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const payload = await getInfoToken();
  if (!payload?.sub) redirect("/login");

  const record = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: {
      username: true,
      email: true,
      avatarUrl: true,
      createdAt: true,
      metodoAutenticacion: true,
      currency: true,
    },
  });
  if (!record) redirect("/login");

  const initials = record.username
    .trim()
    .split(/\s+/)
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const user = {
    username: record.username,
    email: record.email,
    initials,
    memberSince: record.createdAt.toISOString().slice(0, 10),
    authMethod: record.metodoAutenticacion,
    currency: record.currency,
    avatarUrl: record.avatarUrl,
  };

  return (
    <UserProvider initialUser={user}>
      <DashboardChrome>{children}</DashboardChrome>
    </UserProvider>
  );
}
