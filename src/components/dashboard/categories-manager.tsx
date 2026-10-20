"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
import { type SubmitEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CategoryStamp,
  ICON_NAMES,
  type IconName,
} from "@/components/ui/category-icon";
import { Field, Input } from "@/components/ui/field";
import { Modal } from "@/components/ui/modal";
import { Panel } from "@/components/ui/panel";
import { useToast } from "@/components/ui/toast";
import { type Category, MAX_CUSTOM_CATEGORIES, type TxType } from "@/lib/data";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

const DEFAULT_CATEGORY_COLOR = "#6d7c72";

export function CategoriesManager({ items }: { items: Category[] }) {
  const toast = useToast();
  const [categories, setCategories] = useState(items);
  const [editing, setEditing] = useState<Category | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<Category | null>(null);
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(
    null,
  );

  async function deleteCategory(category: Category) {
    if (deletingCategoryId) return;
    setDeletingCategoryId(category.id);
    try {
      const response = await fetchWithAuth(
        `/api/v1/categories/${category.id}`,
        { method: "DELETE" },
      );
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        toast(data?.error ?? "No se pudo eliminar la categoría", "warn");
        return;
      }
      toast(`Categoría ${category.name} eliminada`);
      setCategories((current) =>
        current.filter((item) => item.id !== category.id),
      );
      setDeleting(null);
    } catch {
      toast("No se pudo conectar con el servidor", "warn");
    } finally {
      setDeletingCategoryId(null);
    }
  }

  const system = categories.filter((c) => !c.isCustom);
  const custom = categories.filter((c) => c.isCustom);
  const left = MAX_CUSTOM_CATEGORIES - custom.length;

  return (
    <>
      <div className="grid gap-5">
        <Panel
          title="Categorías del sistema"
          aside={
            <span className="text-[13px] text-ink-faint">
              Vienen con Gonances y no se pueden borrar
            </span>
          }
        >
          <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {system.map((c) => (
              <li
                key={c.id}
                className="flex items-center gap-3 rounded border border-rule-soft px-3 py-2.5"
              >
                <CategoryStamp icon={c.icon} color={c.color} size={30} />
                <span className="flex-1 text-[14px] text-ink">{c.name}</span>
                <TypeTag type={c.type} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel
          title="Mis categorías"
          aside={
            <div className="flex items-center gap-3">
              <span className="text-[13px] text-ink-faint">
                {custom.length} de {MAX_CUSTOM_CATEGORIES} usadas
              </span>
              <Button
                size="sm"
                onClick={() => setCreating(true)}
                disabled={left <= 0}
                title={left <= 0 ? "Llegaste al máximo de cinco" : undefined}
              >
                <Plus size={15} />
                Crear categoría
              </Button>
            </div>
          }
        >
          {custom.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-[15px] text-ink">
                Todavía no creaste ninguna.
              </p>
              <p className="mx-auto mt-1.5 max-w-[48ch] text-[14px] text-ink-soft">
                Crea hasta cinco categorías propias para lo que no encaja en las
                de siempre: la mascota, el gimnasio, ese proyecto aparte.
              </p>
              <Button className="mt-5" onClick={() => setCreating(true)}>
                <Plus size={16} />
                Crear categoría
              </Button>
            </div>
          ) : (
            <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {custom.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center gap-3 rounded border border-rule px-3 py-2.5"
                >
                  <CategoryStamp icon={c.icon} color={c.color} size={30} />
                  <span className="flex-1 text-[14px] text-ink">{c.name}</span>
                  <TypeTag type={c.type} />
                  <span className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setEditing(c)}
                      aria-label={`Editar ${c.name}`}
                      className="rounded p-1.5 text-ink-faint hover:bg-band hover:text-ink"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleting(c)}
                      aria-label={`Eliminar ${c.name}`}
                      className="rounded p-1.5 text-ink-faint hover:bg-expense-tint hover:text-expense"
                    >
                      <Trash2 size={15} />
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <CategoryModal
        open={creating || editing !== null}
        editing={editing}
        onClose={() => {
          setCreating(false);
          setEditing(null);
        }}
        onSaved={(category) => {
          toast(
            editing
              ? `Categoría ${category.name} actualizada`
              : `Categoría ${category.name} creada`,
          );
          setCategories((current) =>
            editing
              ? current.map((item) =>
                  item.id === category.id ? category : item,
                )
              : [...current, category],
          );
          setCreating(false);
          setEditing(null);
        }}
      />

      <Modal
        open={deleting !== null}
        onClose={() => setDeleting(null)}
        closeDisabled={deletingCategoryId !== null}
        title="¿Eliminar esta categoría?"
        width="sm"
      >
        {deleting ? (
          <>
            <p className="text-[15px] leading-relaxed text-ink-soft">
              <strong className="font-semibold text-ink">
                {deleting.name}
              </strong>{" "}
              desaparecerá de la lista. Si ya tiene movimientos anotados,
              primero tendrás que moverlos a otra categoría.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                disabled={deletingCategoryId !== null}
                onClick={() => setDeleting(null)}
              >
                Conservar
              </Button>
              <Button
                variant="danger"
                disabled={deletingCategoryId !== null}
                onClick={() => deleteCategory(deleting)}
              >
                <Trash2 size={16} />
                {deletingCategoryId ? "Eliminando…" : "Eliminar"}
              </Button>
            </div>
          </>
        ) : null}
      </Modal>
    </>
  );
}

function TypeTag({ type }: { type: TxType }) {
  return (
    <span
      className={`shrink-0 rounded-sm px-1.5 py-0.5 text-[11px] ${
        type === "INCOME"
          ? "bg-income-tint/70 text-income"
          : "bg-expense-tint/60 text-expense"
      }`}
    >
      {type === "INCOME" ? "Ingreso" : "Gasto"}
    </span>
  );
}

function CategoryModal({
  open,
  editing,
  onClose,
  onSaved,
}: {
  open: boolean;
  editing: Category | null;
  onClose: () => void;
  onSaved: (category: Category) => void;
}) {
  const [name, setName] = useState("");
  const [type, setType] = useState<TxType>("EXPENSE");
  const [color, setColor] = useState(DEFAULT_CATEGORY_COLOR);
  const [icon, setIcon] = useState<IconName>("ShoppingBasket");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Al abrir, el formulario toma los valores de la categoría en edición.
  const [lastOpened, setLastOpened] = useState(false);
  if (open !== lastOpened) {
    setLastOpened(open);
    if (open) {
      setName(editing?.name ?? "");
      setType(editing?.type ?? "EXPENSE");
      setColor(editing?.color ?? DEFAULT_CATEGORY_COLOR);
      setIcon((editing?.icon as IconName) ?? "ShoppingBasket");
    }
  }

  async function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetchWithAuth(
        editing ? `/api/v1/categories/${editing.id}` : "/api/v1/categories",
        {
          method: editing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            ...(editing ? {} : { type }),
            icon,
            color,
          }),
        },
      );
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.item) {
        setError(data?.error ?? "No se pudo guardar la categoría");
        return;
      }
      onSaved(data.item as Category);
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeDisabled={submitting}
      title={editing ? "Editar categoría" : "Nueva categoría"}
      description="Ponle nombre, elige si es para ingresos o gastos y dale una tinta."
    >
      <form onSubmit={onSubmit} className="grid gap-4">
        <Field label="Nombre" htmlFor="cat-name">
          <Input
            id="cat-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={24}
            placeholder="Gimnasio"
          />
        </Field>

        <fieldset disabled={Boolean(editing)}>
          <legend className="mb-1.5 text-[13px] font-medium text-ink-soft">
            Sirve para
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                { value: "EXPENSE", label: "Gastos" },
                { value: "INCOME", label: "Ingresos" },
              ] as const
            ).map((opt) => (
              <label
                key={opt.value}
                className={`flex h-11 items-center justify-center rounded border text-[15px] font-medium transition-colors ${
                  editing ? "cursor-not-allowed opacity-70" : "cursor-pointer"
                } ${
                  type === opt.value
                    ? "border-ink bg-band/60 text-ink"
                    : "border-rule bg-sheet text-ink-soft hover:border-ink/40"
                }`}
              >
                <input
                  type="radio"
                  name="cat-type"
                  value={opt.value}
                  checked={type === opt.value}
                  onChange={() => setType(opt.value)}
                  className="sr-only"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>
        {editing && (
          <p className="-mt-2 text-[12px] text-ink-faint">
            El tipo no se puede cambiar porque debe coincidir con sus
            movimientos.
          </p>
        )}

        <fieldset>
          <legend className="mb-1.5 text-[13px] font-medium text-ink-soft">
            Color
          </legend>
          <div className="flex items-center gap-3">
            <input
              id="cat-color"
              type="color"
              value={color}
              onChange={(event) => setColor(event.target.value)}
              aria-label="Elige cualquier color"
              title="Elige cualquier color"
              className="size-11 cursor-pointer rounded border border-rule bg-sheet p-1"
            />
            <div>
              <label
                htmlFor="cat-color"
                className="cursor-pointer text-[14px] font-medium text-ink"
              >
                Elige cualquier color
              </label>
              <p className="mt-0.5 font-mono text-[12px] uppercase text-ink-faint">
                {color}
              </p>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-1.5 text-[13px] font-medium text-ink-soft">
            Icono
          </legend>
          <div className="flex flex-wrap gap-2">
            {ICON_NAMES.map((n) => (
              <label
                key={n}
                className={`cursor-pointer rounded border-2 p-0.5 transition-colors ${
                  icon === n ? "border-ink" : "border-transparent"
                }`}
              >
                <input
                  type="radio"
                  name="cat-icon"
                  value={n}
                  checked={icon === n}
                  onChange={() => setIcon(n)}
                  className="sr-only"
                />
                <CategoryStamp icon={n} color={color} size={32} />
                <span className="sr-only">{n}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={onClose} disabled={submitting}>
            Cancelar
          </Button>
          {error ? (
            <p role="alert" className="text-sm text-expense">
              {error}
            </p>
          ) : null}
          <Button type="submit" disabled={submitting}>
            {submitting
              ? "Guardando…"
              : editing
                ? "Guardar cambios"
                : "Crear categoría"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
