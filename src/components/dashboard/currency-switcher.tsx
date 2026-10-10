"use client";

import { BadgeDollarSign } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCurrentUser } from "@/components/provider/user-provider";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import {
  CURRENCIES,
  CURRENCY_CODES,
  type CurrencyCode,
} from "@/lib/currencies";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { money } from "@/lib/format";

type RatesResponse = {
  rates: Partial<Record<CurrencyCode, string>>;
  fetchedAt: string;
};

export function CurrencySwitcher({ onChanged }: { onChanged?: () => void }) {
  const router = useRouter();
  const toast = useToast();
  const { currentUser: user, setCurrentUser } = useCurrentUser();
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState<CurrencyCode>(user.currency);
  const [saving, setSaving] = useState(false);
  const [loadingRates, setLoadingRates] = useState(false);
  const [rates, setRates] = useState<RatesResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function openSelector() {
    setCurrency(user.currency);
    setError(null);
    setOpen(true);
    setLoadingRates(true);
    try {
      const response = await fetchWithAuth("/api/v1/exchange-rates", {
        cache: "no-store",
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.rates) {
        setError(data?.error ?? "No se pudieron cargar las tasas");
        return;
      }
      setRates(data as RatesResponse);
    } catch {
      setError("No se pudieron cargar las tasas");
    } finally {
      setLoadingRates(false);
    }
  }

  function equivalent(target: CurrencyCode) {
    const baseRate = Number(rates?.rates[currency]);
    const targetRate = Number(rates?.rates[target]);
    if (!(baseRate > 0) || !(targetRate > 0)) return null;
    return money(targetRate / baseRate, target);
  }

  async function saveCurrency() {
    if (saving || currency === user.currency) return;
    setSaving(true);
    setError(null);
    try {
      const response = await fetchWithAuth("/api/v1/users/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currency }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.user) {
        setError(data?.error ?? "No se pudo cambiar la moneda");
        return;
      }
      setCurrentUser(data.user);
      setOpen(false);
      toast(`Ahora ves tu libro en ${CURRENCIES[currency].name}`);
      onChanged?.();
      router.refresh();
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Button variant="outline" onClick={openSelector}>
        <BadgeDollarSign size={16} />
        Moneda · {user.currency}
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeDisabled={saving}
        title="Moneda de tu libro"
        description={`Compara el valor de 1 ${currency} y elige la moneda que se guardará en tu cuenta.`}
      >
        <fieldset className="grid gap-2 sm:grid-cols-2">
          <legend className="sr-only">Elige la moneda de tu cuenta</legend>
          {CURRENCY_CODES.map((code) => {
            const option = CURRENCIES[code];
            const selected = currency === code;
            const converted = equivalent(code);
            return (
              <label
                key={code}
                className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                  selected
                    ? "border-ink bg-band/70"
                    : "border-rule bg-sheet hover:border-ink/40"
                }`}
              >
                <input
                  type="radio"
                  name="currency"
                  value={code}
                  checked={selected}
                  onChange={() => setCurrency(code)}
                  className="sr-only"
                />
                <span className="flex items-baseline justify-between gap-3">
                  <span className="font-medium text-ink">{option.name}</span>
                  <span className="num text-[12px] font-semibold text-ink-faint">
                    {code}
                  </span>
                </span>
                <span className="num mt-2 block text-[14px] text-ink-soft">
                  {loadingRates
                    ? "Cargando tasa…"
                    : converted
                      ? `1 ${currency} = ${converted}`
                      : "Tasa no disponible"}
                </span>
              </label>
            );
          })}
        </fieldset>
        <p className="mt-3 text-[12px] text-ink-faint">
          Moneda guardada: {user.currency}. Tasas proporcionadas por
          ExchangeRate-API
          {rates
            ? `, actualizadas ${new Date(rates.fetchedAt).toLocaleString("es-ES")}`
            : ""}
          .
        </p>
        {error ? (
          <p className="mt-3 text-[14px] text-expense" role="alert">
            {error}
          </p>
        ) : null}
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={saving}
          >
            Cancelar
          </Button>
          <Button
            onClick={saveCurrency}
            disabled={
              saving ||
              loadingRates ||
              !rates?.rates[currency] ||
              currency === user.currency
            }
          >
            {saving ? "Actualizando…" : "Usar esta moneda"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
