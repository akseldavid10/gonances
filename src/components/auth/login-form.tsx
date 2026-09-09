"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";

export function LoginForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Correo o contraseña incorrectos");
        setPending(false);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("No se pudo conectar con el servidor");
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <Field label="Correo" htmlFor="email">
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="tu@correo.com"
        />
      </Field>
      <Field label="Contraseña" htmlFor="password">
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
        />
      </Field>
      <div className="flex items-center justify-between gap-4">
        <label className="flex items-center gap-2 text-[14px] text-ink-soft">
          <input
            type="checkbox"
            name="remember"
            className="size-4 accent-ink"
            defaultChecked
          />
          No cerrar sesión
        </label>
        <Link
          href="/forgot-password"
          className="text-[14px] text-ink-soft underline-offset-4 hover:text-ink hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
      {error && (
        <p className="text-[14px] text-red-600" role="alert">
          {error}
        </p>
      )}
      <Button
        type="submit"
        size="lg"
        className="mt-1 w-full"
        disabled={pending}
      >
        {pending ? "Entrando…" : "Entrar"}
      </Button>
    </form>
  );
}
