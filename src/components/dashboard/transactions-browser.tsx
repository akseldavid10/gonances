"use client";

import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { CurrencySwitcher } from "@/components/dashboard/currency-switcher";
import { NewTransactionModal } from "@/components/dashboard/new-transaction-modal";
import { useCurrentUser } from "@/components/provider/user-provider";
import { Button } from "@/components/ui/button";
import { CategoryStamp } from "@/components/ui/category-icon";
import { inputClass, Select } from "@/components/ui/field";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import {
  type Category,
  categoryById,
  type Transaction,
  type TxType,
} from "@/lib/data";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import {
  longDate,
  money,
  negativePositive,
  shortDate,
  signedMoney,
} from "@/lib/format";

const PER_PAGE = 10;

type TypeFilter = "ALL" | TxType;
type RangeFilter = "month" | "last-month" | "quarter" | "custom" | "all";

const ranges: { value: RangeFilter; label: string }[] = [
  { value: "all", label: "Todo el historial" },
  { value: "month", label: "Este mes" },
  { value: "last-month", label: "Mes pasado" },
  { value: "quarter", label: "Últimos 3 meses" },
  { value: "custom", label: "Rango personalizado" },
];

// Calcula start_date/end_date en base al filtro de rango, para mandarlos al server.
function rangeToDates(
  range: RangeFilter,
  startDate: string,
  endDate: string,
): { start?: string; end?: string } {
  // "Este mes" es el del calendario de quien mira, no el de UTC: a las 21 h
  // del último día del mes en Bogotá, UTC ya va por el mes siguiente.
  const now = new Date();
  const dateOnly = (year: number, month: number, day: number) =>
    new Date(Date.UTC(year, month, day)).toISOString().slice(0, 10);
  const year = now.getFullYear();
  const month = now.getMonth();

  if (range === "month") {
    return {
      start: dateOnly(year, month, 1),
      end: dateOnly(year, month + 1, 0),
    };
  }

  if (range === "last-month") {
    return {
      start: dateOnly(year, month - 1, 1),
      end: dateOnly(year, month, 0),
    };
  }

  if (range === "quarter") {
    return {
      start: dateOnly(year, month - 2, 1),
      end: dateOnly(year, month + 1, 0),
    };
  }

  if (range === "custom") {
    return {
      ...(startDate ? { start: startDate } : {}),
      ...(endDate ? { end: endDate } : {}),
    };
  }

  // "all": sin límites de fecha
  return {};
}

export function TransactionsBrowser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();
  const { currentUser } = useCurrentUser();
  const currency = currentUser?.currency ?? "USD";
  const [items, setItems] = useState<Transaction[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [type, setType] = useState<TypeFilter>("ALL");
  const [range, setRange] = useState<RangeFilter>("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState("ALL");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<Transaction | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const requestSequence = useRef(0);

  useEffect(() => {
    if (searchParams.get("new") === "1") setCreating(true);
  }, [searchParams]);

  function closeCreation() {
    setCreating(false);
    if (searchParams.has("new"))
      router.replace("/transactions", { scroll: false });
  }

  useEffect(() => {
    const timeout = window.setTimeout(
      () => setDebouncedQuery(query.trim()),
      250,
    );
    return () => window.clearTimeout(timeout);
  }, [query]);

  // Pide las transacciones al API, ya paginadas/filtradas/ordenadas por el
  // server. El endpoint saca el usuario (email/sub) del token, así que aquí
  // solo mandamos page, limit y los filtros activos.
  const fetchTransactions = useCallback(async () => {
    const requestId = ++requestSequence.current;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (range === "custom" && startDate && endDate && startDate > endDate) {
        setError("La fecha inicial no puede ser posterior a la fecha final");
        return;
      }
      params.set("page", String(page));
      params.set("limit", String(PER_PAGE));
      if (type !== "ALL") params.set("type", type);
      if (debouncedQuery) params.set("search", debouncedQuery);

      const { start, end } = rangeToDates(range, startDate, endDate);
      if (start) params.set("start_date", start);
      if (end) params.set("end_date", end);
      if (categoryId !== "ALL") params.set("category_id", categoryId);

      const res = await fetchWithAuth(
        `/api/v1/transactions?${params.toString()}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store", // evita que el navegador sirva una respuesta vieja cacheada
        },
      );

      if (!res.ok) {
        throw new Error(`Error ${res.status} al pedir movimientos`);
      }

      // El endpoint regresa { items, total, page, pages }, no un array plano.
      const data: {
        items: Transaction[];
        total: number;
        page: number;
        pages: number;
      } = await res.json();

      if (requestId === requestSequence.current) {
        setItems(Array.isArray(data.items) ? data.items : []);
        setTotal(data.total ?? 0);
        setPages(data.pages && data.pages > 0 ? data.pages : 1);
      }
    } catch (err) {
      if (requestId === requestSequence.current) {
        setError(
          err instanceof Error
            ? err.message
            : "No se pudieron cargar los movimientos",
        );
      }
    } finally {
      if (requestId === requestSequence.current) setLoading(false);
    }
  }, [page, type, debouncedQuery, range, startDate, endDate, categoryId]);

  useEffect(() => {
    let active = true;
    fetchWithAuth("/api/v1/categories", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok)
          throw new Error("No se pudieron cargar las categorías");
        const data = await response.json();
        if (active) setCategories(Array.isArray(data.items) ? data.items : []);
      })
      .catch(() => {
        if (active) toast("No se pudieron cargar las categorías", "warn");
      });
    return () => {
      active = false;
    };
  }, [toast]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Si el filtro cambia la cantidad de páginas y quedamos "fuera de rango"
  // (ej. estabas en la página 5 y el nuevo filtro solo tiene 2), vuelve a la 1.
  useEffect(() => {
    if (page > pages) setPage(1);
  }, [pages, page]);

  // items ya vienen filtrados, ordenados y paginados por el server.
  const visible = items;
  const current = Math.min(page, pages);

  function reset<T>(setter: (v: T) => void) {
    return (value: T) => {
      setter(value);
      setPage(1);
    };
  }

  // Después de crear/editar/borrar hay que volver a pedir la lista
  // para que la tabla quede sincronizada con lo que quedó en la DB.
  async function handleDelete(t: Transaction) {
    if (deletingId) return;
    setDeletingId(t.id);
    try {
      const res = await fetchWithAuth(
        `/api/v1/transactions/${encodeURIComponent(t.id)}`,
        {
          method: "DELETE",
        },
      );
      if (!res.ok) throw new Error("No se pudo eliminar");
      toast("Movimiento eliminado");
      setDeleting(null);
      await fetchTransactions();
    } catch {
      toast("No se pudo eliminar el movimiento", "warn");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative min-w-55 flex-1">
          <Search
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-faint"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => reset(setQuery)(e.target.value)}
            placeholder="Buscar por concepto o categoría"
            aria-label="Buscar movimientos"
            className={`${inputClass} w-full pl-9`}
          />
        </div>

        <fieldset className="flex h-11 items-center rounded border border-rule bg-sheet p-1">
          <legend className="sr-only">Filtrar por tipo</legend>
          {(
            [
              { value: "ALL", label: "Todos" },
              { value: "INCOME", label: "Ingresos" },
              { value: "EXPENSE", label: "Gastos" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.value}
              type="button"
              aria-pressed={type === opt.value}
              onClick={() => reset(setType)(opt.value)}
              className={`h-full rounded-sm px-3 text-[14px] transition-colors ${
                type === opt.value
                  ? "bg-ink text-sheet"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </fieldset>

        <Select
          aria-label="Filtrar por fecha"
          value={range}
          onChange={(e) => reset(setRange)(e.target.value as RangeFilter)}
          className="w-47.5 shrink-0"
        >
          {ranges.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </Select>

        <Select
          aria-label="Filtrar por categoría"
          value={categoryId}
          onChange={(e) => reset(setCategoryId)(e.target.value)}
          className="w-48 shrink-0"
        >
          <option value="ALL">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>

        {range === "custom" ? (
          <div className="flex flex-wrap items-center gap-2">
            <label className="sr-only" htmlFor="tx-start-date">
              Desde
            </label>
            <input
              id="tx-start-date"
              type="date"
              value={startDate}
              onChange={(event) => reset(setStartDate)(event.target.value)}
              className={inputClass}
            />
            <label className="sr-only" htmlFor="tx-end-date">
              Hasta
            </label>
            <input
              id="tx-end-date"
              type="date"
              value={endDate}
              min={startDate || undefined}
              onChange={(event) => reset(setEndDate)(event.target.value)}
              className={inputClass}
            />
          </div>
        ) : null}

        <CurrencySwitcher onChanged={fetchTransactions} />

        <Button onClick={() => setCreating(true)}>
          <Plus size={16} />
          Agregar movimiento
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border border-rule bg-sheet">
        <div className="overflow-x-auto">
          <table className="w-full min-w-160 border-collapse text-left">
            <caption className="sr-only">
              Movimientos filtrados, del más reciente al más antiguo
            </caption>
            <thead>
              <tr className="border-b border-rule text-[12px] text-ink-faint">
                <th scope="col" className="px-4 py-3 font-medium sm:px-5">
                  Fecha
                </th>
                <th scope="col" className="py-3 font-medium">
                  Descripción
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Categoría
                </th>
                <th scope="col" className="px-4 py-3 text-right font-medium">
                  Monto
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-right font-medium sm:px-5"
                >
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-14 text-center text-[14px] text-ink-soft"
                  >
                    Cargando movimientos...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-14 text-center text-[14px] text-expense"
                  >
                    {error}
                  </td>
                </tr>
              ) : (
                visible.map((t) => {
                  const cat = categoryById(t.categoryId) ??
                    t.category ?? {
                      name: "Categoría",
                      color: "#6d7c72",
                      icon: "HelpCircle",
                    };
                  const label = `${t.description || cat.name}, ${shortDate(t.date)}`;
                  return (
                    <tr
                      key={t.id}
                      className="border-t border-rule-soft transition-colors even:bg-band/45 hover:bg-band/80"
                    >
                      <td className="px-4 py-3 align-middle text-[13px] whitespace-nowrap text-ink-faint sm:px-5">
                        {shortDate(t.date)}
                      </td>
                      <td className="py-3 align-middle text-[14px] text-ink">
                        {t.description || (
                          <span className="text-ink-faint">
                            Sin descripción
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 align-middle">
                        <span className="flex items-center gap-2.5 whitespace-nowrap">
                          <CategoryStamp
                            icon={cat?.icon ?? "HelpCircle"}
                            color={cat?.color ?? "#6d7c72"}
                            size={24}
                          />
                          <span className="text-[14px] text-ink-soft">
                            {cat?.name ?? "Categoría"}
                          </span>
                        </span>
                      </td>
                      <td
                        className={`num px-4 py-3 text-right align-middle text-[14px] whitespace-nowrap ${
                          t.type === "INCOME" ? "text-income" : "text-expense"
                        }`}
                      >
                        {signedMoney(t.amount, t.type, currency)}
                      </td>
                      <td className="px-4 py-3 text-right align-middle whitespace-nowrap sm:px-5">
                        <button
                          type="button"
                          onClick={() => setEditing(t)}
                          aria-label={`Editar ${label}`}
                          className="rounded p-1.5 text-ink-faint hover:bg-band hover:text-ink"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleting(t)}
                          aria-label={`Eliminar ${label}`}
                          className="ml-1 rounded p-1.5 text-ink-faint hover:bg-expense-tint hover:text-expense"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {!loading && !error && visible.length === 0 ? (
          <div className="px-5 py-14 text-center">
            <p className="text-[15px] text-ink">
              No hay movimientos con ese filtro.
            </p>
            <p className="mx-auto mt-1.5 max-w-[46ch] text-[14px] text-ink-soft">
              Prueba con otro rango de fechas o anota el primero de este mes.
            </p>
            <Button className="mt-5" onClick={() => setCreating(true)}>
              <Plus size={16} />
              Agregar movimiento
            </Button>
          </div>
        ) : !loading && !error ? (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rule px-4 py-3 sm:px-5">
            <p className="text-[13px] text-ink-faint">
              {total} movimientos, saldo de esta página{" "}
              <span className="num text-ink">
                {negativePositive(items, currency)}
              </span>
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={current === 1}
                onClick={() => setPage(current - 1)}
              >
                <ChevronLeft size={15} />
                Anterior
              </Button>
              <span className="num text-[13px] text-ink-soft">
                {current} de {pages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={current === pages}
                onClick={() => setPage(current + 1)}
              >
                Siguiente
                <ChevronRight size={15} />
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      <NewTransactionModal
        open={creating}
        onClose={closeCreation}
        onSaved={() => {
          closeCreation();
          fetchTransactions();
        }}
      />
      <NewTransactionModal
        open={editing !== null}
        editing={editing}
        onClose={() => setEditing(null)}
        onSaved={() => {
          setEditing(null);
          fetchTransactions();
        }}
      />

      <Modal
        open={deleting !== null}
        onClose={() => setDeleting(null)}
        closeDisabled={deletingId !== null}
        title="¿Eliminar este movimiento?"
        width="sm"
      >
        {deleting ? (
          <>
            <p className="text-[15px] leading-relaxed text-ink-soft">
              Vas a borrar una transacción de tipo{" "}
              <strong className="font-semibold text-ink">
                {deleting.type === "INCOME" ? "Ingreso" : "Gasto"}
              </strong>{" "}
              hecha el {longDate(deleting.date)} por un valor de{" "}
              <span className="num text-ink">
                {money(deleting.amount, currency)}
              </span>
              . No se podrá deshacer.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                disabled={deletingId !== null}
                onClick={() => setDeleting(null)}
              >
                Conservar
              </Button>
              <Button
                variant="danger"
                disabled={deletingId !== null}
                onClick={() => handleDelete(deleting)}
              >
                <Trash2 size={16} />
                {deletingId ? "Eliminando…" : "Eliminar"}
              </Button>
            </div>
          </>
        ) : null}
      </Modal>
    </>
  );
}
