import { SessionRefresh } from "@/components/auth/session-refresh";

export default async function RefreshSessionPage({
  searchParams,
}: {
  searchParams: Promise<{ returnTo?: string }>;
}) {
  const requested = (await searchParams).returnTo;
  const returnTo =
    requested?.startsWith("/") && !requested.startsWith("//")
      ? requested
      : "/dashboard";
  return <SessionRefresh returnTo={returnTo} />;
}
