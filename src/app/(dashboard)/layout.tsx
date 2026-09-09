import type { ReactNode } from "react";
import { DashboardChrome } from "@/components/dashboard/chrome";
import { UserProvider } from "@/components/provider/user-provider";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <DashboardChrome>{children}</DashboardChrome>
    </UserProvider>
  );
}
