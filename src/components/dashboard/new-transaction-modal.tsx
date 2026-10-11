"use client";

import { type SubmitEvent, useEffect, useState } from "react";
import { useCurrentUser } from "@/components/provider/user-provider";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/field";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { CURRENCY_CODES } from "@/lib/currencies";
import type { Category, Transaction, TxType } from "@/lib/data";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export function NewTransactionModal({
  open,
  onClose,
  editing,
  onSaved,
}: {
  open: boolean;
  onClose: () => void;
  editing?: Transaction | null;
  onSaved?: () => void; // para refrescar la lista de transacciones tras guardar
}) {
  const toast = useToast();
  const { currentUser } = useCurrentUser();
  const [type, setType] = useState<TxType>("EXPENSE");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [manualRates, setManualRates] = useState(false);
  const currency = currentUser.currency;
  const initialAmount = editing
    ? currency === "JPY"
      ? String(Math.round(editing.amount))
      : String(editing.amount)
    : "";

  useEffect(() => {
    if (!open) return;
    setType(editing?.type ?? "EXPENSE");
    setCategoryId(editing?.categoryId ?? "");
    setManualRates(false);
    let active = true;
    setLoadingCategories(true);
    fetchWithAuth("/api/v1/categories", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok)
          throw new Error("No se pudieron cargar las categorías");
        const data = await response.json();
        if (active) setCategories(Array.isArray(data.items) ? data.items : []);
      })
      .catch(() => {
        if (active) toast("No se pudieron cargar las categorías", "warn");
      })
      .finally(() => {
        if (active) setLoadingCategories(false);
      });
    return () => {
      active = false;
    };
  }, [open, editing, toast]);

  const options = categories.filter((c) => c.type === type);

  async function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const rawAmount = String(formData.get("amount") ?? "").replace(",", ".");
    if (
      !(currency === "JPY"
        ? /^(?:0|[1-9]\d{0,14})$/.test(rawAmount)
        : /^(?:0|[1-9]\d{0,14})(?:\.\d{1,2})?$/.test(rawAmount)) ||
      Number(rawAmount) <= 0
    ) {
      toast(
        "Escribe un monto mayor a 0 con un máximo de dos decimales",
        "warn",
      );
      return;
    }

    const payload = {
      ...(!editing || rawAmount !== initialAmount ? { amount: rawAmount } : {}),
      type,
      description: (formData.get("description") as string) || null,
      date: formData.get("date") as string,
      category_id: categoryId,
      ...(manualRates
        ? {
            exchange_rates: Object.fromEntries(
              CURRENCY_CODES.map((code) => [
                code,
                code === "USD"
                  ? "1"
                  : String(formData.get(`rate-${code}`) ?? "").replace(
                      ",",
                      ".",
                    ),
              ]),
            ),
          }
        : {}),
    };

    setIsSubmitting(true);

    try {
      const url = editing
        ? `/api/v1/transactions/${encodeURIComponent(editing.id)}`
        : "/api/v1/transactions";
      const method = editing ? "PUT" : "POST";

      const res = await fetchWithAuth(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        if (errorBody?.code === "HISTORICAL_RATES_UNAVAILABLE")
          setManualRates(true);
        toast(errorBody?.message ?? "No se pudo guardar el movimiento", "warn");
        return;
      }

      toast(editing ? "Movimiento actualizado" : "Movimiento guardado");
      onSaved?.();
      onClose();
    } catch (err) {
      console.error(err);
      toast("Error de conexión, intenta de nuevo", "warn");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeDisabled={isSubmitting}
      title={editing ? "Editar movimiento" : "Nuevo movimiento"}
      description={
        editing
          ? "Corrige lo que haga falta y guarda."
          : "Cuatro campos y vuelve a tu libro."
      }
    >
      <form onSubmit={onSubmit} className="grid gap-4">
        <fieldset className="grid gap-1.5">
          <legend className="mb-1.5 text-[13px] font-medium text-ink-soft">
            Tipo
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                { value: "EXPENSE", label: "Gasto" },
                { value: "INCOME", label: "Ingreso" },
              ] as const
            ).map((opt) => {
              const active = type === opt.value;
              return (
                <label
                  key={opt.value}
                  className={`flex h-11 cursor-pointer items-center justify-center rounded border text-[15px] font-medium transition-colors ${
                    active
                      ? opt.value === "INCOME"
                        ? "border-income bg-income-tint/60 text-income"
                        : "border-expense bg-expense-tint/50 text-expense"
                      : "border-rule bg-sheet text-ink-soft hover:border-ink/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={opt.value}
                    checked={active}
                    onChange={() => {
                      setType(opt.value);
                      setCategoryId("");
                    }}
                    className="sr-only"
                  />
                  {opt.label}
                </label>
              );
            })}
          </div>
        </fieldset>

        <Field label="Monto" htmlFor="amount">
          <div className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[15px] text-ink-faint"
            >
              {currency}
            </span>
            <Input
              id="amount"
              name="amount"
              inputMode="decimal"
              maxLength={18}
              pattern={
                currency === "JPY"
                  ? "(?:0|[1-9][0-9]{0,14})"
                  : "(?:0|[1-9][0-9]{0,14})(?:[.,][0-9]{1,2})?"
              }
              required
              defaultValue={initialAmount}
              placeholder="0,00"
              className="num pl-14 text-right"
            />
          </div>
        </Field>

        <Field label="Categoría" htmlFor="category">
          <Select
            className="w-full"
            id="category"
            name="category"
            required
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="" disabled>
              {loadingCategories
                ? "Cargando categorías…"
                : "Elige una categoría"}
            </option>
            {options.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
                {c.isCustom ? " (tuya)" : ""}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Fecha" htmlFor="date">
          <Input
            id="date"
            name="date"
            type="date"
            max={today()}
            required
            defaultValue={editing?.date ?? today()}
          />
        </Field>

        <p className="text-[12px] text-ink-soft">
          Se guardarán las tasas históricas de la fecha del movimiento. En días
          sin publicación se usa la última referencia anterior disponible,
          conservando su fecha y fuente.
        </p>
        {manualRates ? (
          <fieldset className="grid gap-3 rounded border border-rule p-3">
            <legend>Tasas históricas manuales</legend>
            <p className="text-[12px] text-ink-soft">
              No se encontraron todas las tasas. Introduce cuántas unidades de
              cada moneda equivalían a 1 USD en esa fecha. Se guardarán como
              fuente manual.
            </p>
            {CURRENCY_CODES.filter((code) => code !== "USD").map((code) => (
              <Field
                key={code}
                label={`1 USD en ${code}`}
                htmlFor={`rate-${code}`}
              >
                <Input
                  id={`rate-${code}`}
                  name={`rate-${code}`}
                  required
                  inputMode="decimal"
                  pattern="[0-9]+([.,][0-9]+)?"
                />
              </Field>
            ))}
            <Button variant="outline" onClick={() => setManualRates(false)}>
              Reintentar consulta automática
            </Button>
          </fieldset>
        ) : null}

        <Field label="Descripción" htmlFor="description" hint="Opcional.">
          <Input
            id="description"
            name="description"
            defaultValue={editing?.description ?? ""}
            maxLength={200}
            placeholder="Mercado del barrio"
          />
        </Field>

        <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || loadingCategories || !options.length}
          >
            {isSubmitting
              ? "Guardando..."
              : editing
                ? "Guardar cambios"
                : "Guardar movimiento"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
