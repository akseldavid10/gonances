"use client";

import {
  ChartColumn,
  ChartPie,
  CreditCard,
  LogOut,
  Menu,
  Plus,
  Settings,
  Tags,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { logoutSession, subscribeToSessionEnd } from "@/lib/fetchWithAuth";
import { useCurrentUser } from "../provider/user-provider";

const nav = [
  { href: "/dashboard", label: "Panel", icon: ChartPie },
  { href: "/transactions", label: "Transacciones", icon: CreditCard },
  { href: "/categories", label: "Categorías", icon: Tags },
  { href: "/analytics", label: "Estadísticas", icon: ChartColumn },
  { href: "/settings", label: "Ajustes", icon: Settings },
];

export function DashboardChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const route = useRouter();
  const menuButton = useRef<HTMLButtonElement>(null);

  // El menú móvil se cierra al cambiar de pantalla.
  // biome-ignore lint/correctness/useExhaustiveDependencies: la ruta es el único disparador
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(
    () => subscribeToSessionEnd(() => route.replace("/login")),
    [route],
  );

  useEffect(() => {
    if (!drawerOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [drawerOpen]);

  const { currentUser } = useCurrentUser();

  function closeDrawer() {
    setDrawerOpen(false);
    window.requestAnimationFrame(() => menuButton.current?.focus());
  }

  return (
    <ToastProvider>
      <div className="flex min-h-full flex-1">
        <Sidebar pathname={pathname} />
        {drawerOpen ? (
          <Sidebar pathname={pathname} mobile onClose={closeDrawer} />
        ) : null}

        <div
          className="flex min-w-0 flex-1 flex-col"
          inert={drawerOpen || undefined}
        >
          <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-rule bg-paper/95 px-4 backdrop-blur-[2px] sm:px-6 lg:px-8">
            <button
              type="button"
              ref={menuButton}
              onClick={() => setDrawerOpen(true)}
              className="-ml-1 rounded p-2 text-ink hover:bg-band lg:hidden"
              aria-label="Abrir menú"
            >
              <Menu size={20} />
            </button>

            <p className="hidden text-[15px] text-ink sm:block">
              Hola, {currentUser.username}
            </p>

            <div className="ml-auto flex items-center gap-3">
              <Button onClick={() => route.push("/transactions?new=1")}>
                <Plus size={16} />
                Nueva transacción
              </Button>
              <Link
                href="/settings"
                className="flex size-9 items-center justify-center rounded-full border border-rule bg-sheet text-[13px] font-semibold text-ink"
                aria-label="Tu perfil"
                title={currentUser.username}
              >
                {currentUser.avatarUrl ? (
                  // biome-ignore lint/performance/noImgElement: avatar de 36 px desde Cloudinary o Google; no necesita el optimizador
                  <img
                    src={currentUser.avatarUrl}
                    alt=""
                    width={36}
                    height={36}
                    className="size-full rounded-full object-cover"
                  />
                ) : (
                  currentUser.initials
                )}
              </Link>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}

function Sidebar({
  pathname,
  mobile = false,
  onClose,
}: {
  pathname: string;
  mobile?: boolean;
  onClose?: () => void;
}) {
  const router = useRouter();
  const toast = useToast();
  const [loggingOut, setLoggingOut] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (mobile) closeButton.current?.focus();
  }, [mobile]);

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      const response = await logoutSession();
      if (!response.ok) throw new Error("Logout failed");
      router.replace("/");
    } catch {
      toast("No se pudo cerrar la sesión. Inténtalo de nuevo.", "warn");
      setLoggingOut(false);
    }
  }
  function trapFocus(event: KeyboardEvent<HTMLDivElement>) {
    if (!mobile) return;
    if (event.key === "Escape") {
      onClose?.();
      return;
    }
    if (event.key !== "Tab") return;
    const elements = [
      ...event.currentTarget.querySelectorAll<HTMLElement>(
        "a, button:not([disabled])",
      ),
    ];
    const first = elements[0];
    const last = elements.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
  return (
    <>
      {mobile ? (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-scrim/45 lg:hidden"
        />
      ) : null}

      <aside
        {...(mobile
          ? {
              role: "dialog",
              "aria-modal": true,
              "aria-label": "Navegación principal",
            }
          : {})}
        onKeyDown={trapFocus}
        className={
          mobile
            ? "fixed inset-y-0 left-0 z-50 flex w-[248px] flex-col bg-inverse lg:hidden"
            : "sticky top-0 hidden h-dvh w-[248px] shrink-0 flex-col bg-inverse lg:flex"
        }
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Logo href="/dashboard" tone="inverse" size="sm" />
          {mobile ? (
            <button
              type="button"
              onClick={onClose}
              ref={closeButton}
              aria-label="Cerrar menú"
              className="rounded p-1.5 text-inverse-ink/70 hover:bg-inverse-ink/10 hover:text-inverse-ink lg:hidden"
            >
              <X size={18} />
            </button>
          ) : null}
        </div>

        <nav className="mt-4 flex-1 px-3" aria-label="Secciones">
          <ul className="space-y-0.5">
            {nav.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-3 rounded border-l-2 px-3 py-2.5 text-[14px] transition-colors ${
                      active
                        ? "border-inverse-ink bg-inverse-ink/10 text-inverse-ink"
                        : "border-transparent text-inverse-ink/65 hover:bg-inverse-ink/5 hover:text-inverse-ink"
                    }`}
                  >
                    <Icon size={17} strokeWidth={1.75} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-inverse-ink/15 p-3">
          <button
            type="button"
            disabled={loggingOut}
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded px-3 py-2.5 text-left text-[14px] text-inverse-ink/65 transition-colors hover:bg-inverse-ink/5 hover:text-inverse-ink disabled:opacity-50"
          >
            <LogOut size={17} strokeWidth={1.75} />
            {loggingOut ? "Cerrando sesión…" : "Cerrar sesión"}
          </button>
        </div>
      </aside>
    </>
  );
}
