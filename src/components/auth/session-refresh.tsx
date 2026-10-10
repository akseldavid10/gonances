"use client";

import { useEffect } from "react";
import { refreshSession } from "@/lib/fetchWithAuth";

export function SessionRefresh({ returnTo }: { returnTo: string }) {
  useEffect(() => {
    let active = true;
    refreshSession().then((refreshed) => {
      if (!active) return;
      window.location.replace(refreshed ? returnTo : "/login");
    });
    return () => {
      active = false;
    };
  }, [returnTo]);

  return (
    <main className="grid min-h-screen place-items-center bg-paper px-6 text-ink">
      <output className="text-sm text-ink-soft">Restaurando tu sesión…</output>
    </main>
  );
}
