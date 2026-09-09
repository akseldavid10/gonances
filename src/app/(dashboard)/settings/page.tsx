import type { Metadata } from "next";
import { SettingsTabs } from "@/components/dashboard/settings-tabs";
import { PageHeader } from "@/components/ui/panel";
import { UserProvider } from "@/components/provider/user-provider";

export const metadata: Metadata = { title: "Ajustes" };

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Ajustes"
        lead="Tus datos de cuenta y qué hacer si quieres irte."
      />
      <UserProvider>
        <SettingsTabs />
      </UserProvider>
    </>
  );
}
