"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  type ChangeEvent,
  type SubmitEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useCurrentUser } from "@/components/provider/user-provider";
import {
  type ThemePreference,
  useTheme,
} from "@/components/theme/theme-provider";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { Modal } from "@/components/ui/modal";
import { Panel } from "@/components/ui/panel";
import { useToast } from "@/components/ui/toast";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { longDate } from "@/lib/format";
import { googleDeleteAccount } from "@/lib/login";
import { isStrongPassword } from "@/lib/password-policy";

const tabs = [
  { id: "perfil", label: "Perfil" },
  { id: "seguridad", label: "Seguridad" },
  { id: "datos", label: "Datos" },
  { id: "apariencia", label: "Apariencia" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function SettingsTabs() {
  const [tab, setTab] = useState<TabId>("perfil");

  return (
    <>
      <div
        role="tablist"
        aria-label="Ajustes de la cuenta"
        aria-orientation="horizontal"
        className="mb-5 flex gap-1 overflow-x-auto border-b border-rule"
      >
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={active}
              tabIndex={active ? 0 : -1}
              aria-controls={`panel-${t.id}`}
              onClick={() => setTab(t.id)}
              onKeyDown={(event) => {
                const current = tabs.findIndex((item) => item.id === t.id);
                let next = current;
                if (event.key === "ArrowRight")
                  next = (current + 1) % tabs.length;
                else if (event.key === "ArrowLeft") {
                  next = (current - 1 + tabs.length) % tabs.length;
                } else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = tabs.length - 1;
                else return;
                event.preventDefault();
                const nextTab = tabs[next];
                setTab(nextTab.id);
                document.getElementById(`tab-${nextTab.id}`)?.focus();
              }}
              className={`-mb-px border-b-2 px-3 py-2.5 text-[14px] transition-colors ${
                active
                  ? "border-ink font-medium text-ink"
                  : "border-transparent text-ink-soft hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {tab === "perfil" ? <ProfilePanel /> : null}
      {tab === "seguridad" ? <SecurityPanel /> : null}
      {tab === "datos" ? <DataPanel /> : null}
      {tab === "apariencia" ? <AppearancePanel /> : null}
    </>
  );
}

function ProfilePanel() {
  const toast = useToast();
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (saving) return;
    const formData = new FormData(e.currentTarget);
    setSaving(true);
    setError(null);
    try {
      const response = await fetchWithAuth("/api/v1/users/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: String(formData.get("username") ?? ""),
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.user) {
        setError(data?.error ?? "No se pudo actualizar el perfil");
        return;
      }
      setCurrentUser(data.user);
      toast("Perfil actualizado");
      router.refresh();
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setSaving(false);
    }
  }

  async function uploadAvatar(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (
      !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
      file.size > 2 * 1024 * 1024
    ) {
      setError("Elige una imagen JPG, PNG o WebP de hasta 2 MB");
      event.target.value = "";
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.set("file", file);
      const uploaded = await fetchWithAuth("/api/v1/uploads/avatar", {
        method: "POST",
        body: formData,
      });
      const result = await uploaded.json().catch(() => null);
      if (!uploaded.ok || typeof result?.secure_url !== "string") {
        throw new Error(result?.error ?? "No se pudo cargar la foto");
      }
      setAvatarUrl(result.secure_url);
      setCurrentUser((user) => ({ ...user, avatarUrl: result.secure_url }));
      router.refresh();
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "No se pudo cargar la foto",
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div role="tabpanel" id="panel-perfil" aria-labelledby="tab-perfil">
      <Panel title="Tu perfil">
        <form onSubmit={onSubmit} className="grid max-w-110 gap-4">
          <div className="flex items-center gap-4">
            {avatarUrl ? (
              // biome-ignore lint/performance/noImgElement: avatar de 56 px desde Cloudinary o Google; no necesita el optimizador
              <img
                src={avatarUrl}
                alt=""
                width={56}
                height={56}
                className="size-14 rounded-full object-cover"
              />
            ) : (
              <span className="flex size-14 items-center justify-center rounded-full border border-rule bg-band text-[17px] font-semibold text-ink">
                {currentUser.initials}
              </span>
            )}
            <div>
              <input
                ref={fileInput}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={uploadAvatar}
                aria-label="Seleccionar foto de perfil"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={uploading}
                onClick={() => fileInput.current?.click()}
              >
                {uploading ? "Subiendo…" : "Cambiar foto"}
              </Button>
              <p className="mt-1.5 text-[12px] text-ink-faint">
                JPG, PNG o WebP, hasta 2 MB.
              </p>
            </div>
          </div>

          <Field label="Nombre completo" htmlFor="full-name">
            <Input
              id="full-name"
              name="username"
              defaultValue={currentUser.username}
              required
            />
          </Field>

          <Field
            label="Correo"
            htmlFor="account-email"
            hint="Es el correo con el que entras, no se puede cambiar."
          >
            <Input
              id="account-email"
              type="email"
              defaultValue={currentUser.email}
              readOnly
              className="bg-band/60 text-ink-soft"
            />
          </Field>

          <p className="text-[13px] text-ink-faint">
            Tu libro está abierto desde el {longDate(currentUser.memberSince)}.
          </p>

          {error ? (
            <p role="alert" className="text-sm text-expense">
              {error}
            </p>
          ) : null}
          <div className="mt-1">
            <Button type="submit" disabled={saving || uploading}>
              {saving ? "Guardando…" : "Guardar cambios"}
            </Button>
          </div>
        </form>
      </Panel>
    </div>
  );
}

function SecurityPanel() {
  const { currentUser } = useCurrentUser();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [changed, setChanged] = useState(false);

  const isGoogle = currentUser.authMethod === "google";

  if (changed) {
    return (
      <output className="block py-8 text-ink">
        Contraseña actualizada. Cerramos las otras sesiones; inicia sesión de
        nuevo.
      </output>
    );
  }

  async function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPassword = String(formData.get("new-password") ?? "");
    if (!isStrongPassword(newPassword)) {
      setError(
        "Usa al menos 8 caracteres, una mayúscula y un número; máximo 72 bytes.",
      );
      return;
    }
    setPending(true);
    setError(null);
    try {
      const response = await fetchWithAuth("/api/v1/users/me/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: formData.get("current-password"),
          newPassword,
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        setError(data?.error ?? "No se pudo cambiar la contraseña");
        return;
      }
      setChanged(true);
      window.setTimeout(() => router.replace("/login"), 1200);
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setPending(false);
    }
  }

  return (
    <div role="tabpanel" id="panel-seguridad" aria-labelledby="tab-seguridad">
      <Panel title="Contraseña">
        {isGoogle ? (
          <div className="max-w-[62ch]">
            <p className="text-[15px] leading-relaxed text-ink-soft">
              Entras con tu cuenta de Google, así que Gonances no guarda ninguna
              contraseña tuya. Para cambiarla, hazlo desde tu cuenta de Google.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
              Si prefieres entrar con correo y contraseña, escríbenos y lo
              cambiamos.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid max-w-110 gap-4">
            <Field label="Contraseña actual" htmlFor="current-password">
              <Input
                id="current-password"
                name="current-password"
                type="password"
                autoComplete="current-password"
                required
              />
            </Field>
            <Field
              label="Contraseña nueva"
              htmlFor="new-password"
              hint="Mínimo 8 caracteres, una mayúscula y un número; máximo 72 bytes."
            >
              <Input
                id="new-password"
                name="new-password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </Field>
            {error ? (
              <p role="alert" className="text-sm text-expense">
                {error}
              </p>
            ) : null}
            <div className="mt-1">
              <Button type="submit" disabled={pending}>
                {pending ? "Actualizando…" : "Cambiar contraseña"}
              </Button>
            </div>
          </form>
        )}
      </Panel>
    </div>
  );
}

const themeOptions: {
  id: ThemePreference;
  label: string;
  hint: string;
}[] = [
  { id: "light", label: "Claro", hint: "La hoja contable de siempre." },
  {
    id: "dark",
    label: "Oscuro",
    hint: "El mismo libro a la luz de una lámpara.",
  },
  {
    id: "system",
    label: "Seguir el sistema",
    hint: "Cambia solo cuando cambia la configuración de tu equipo.",
  },
];

/**
 * El tema se ve al momento de marcarlo, pero solo se guarda al pulsar Guardar.
 * Si sales de la pestaña sin guardar, vuelve a lo que tenías: un botón de
 * guardar que no guarda nada sería mentira, y elegir un tema a ciegas, peor.
 */
function AppearancePanel() {
  const toast = useToast();
  const { storedPreference, previewPreference, setPreference, cancelPreview } =
    useTheme();
  const [draft, setDraft] = useState<ThemePreference>(storedPreference);
  const unsaved = draft !== storedPreference;

  // biome-ignore lint/correctness/useExhaustiveDependencies: solo descarta la vista previa al desmontar
  useEffect(() => cancelPreview, []);

  function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setPreference(draft);
    toast("Apariencia guardada");
  }

  return (
    <div role="tabpanel" id="panel-apariencia" aria-labelledby="tab-apariencia">
      <Panel title="Tema">
        <form onSubmit={onSubmit} className="grid max-w-110 gap-4">
          <fieldset className="grid gap-2">
            <legend className="sr-only">Tema de la interfaz</legend>
            {themeOptions.map((o) => {
              const checked = draft === o.id;
              return (
                <label
                  key={o.id}
                  className={`flex cursor-pointer items-start gap-3 rounded border px-3.5 py-3 transition-colors ${
                    checked
                      ? "border-ink bg-band/60"
                      : "border-rule hover:border-ink/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="theme"
                    value={o.id}
                    checked={checked}
                    onChange={() => {
                      setDraft(o.id);
                      previewPreference(o.id);
                    }}
                    className="mt-0.5 size-4 accent-ink"
                  />
                  <span>
                    <span className="block text-[15px] text-ink">
                      {o.label}
                    </span>
                    <span className="mt-0.5 block text-[13px] text-ink-faint">
                      {o.hint}
                    </span>
                  </span>
                </label>
              );
            })}
          </fieldset>

          <p aria-live="polite" className="text-[13px] text-ink-faint">
            {unsaved
              ? "Lo estás viendo en vista previa. Guarda para conservarlo."
              : "Se guarda en este navegador, no en tu cuenta."}
          </p>

          <div className="mt-1">
            <Button type="submit" disabled={!unsaved}>
              Guardar cambios
            </Button>
          </div>
        </form>
      </Panel>
    </div>
  );
}

function DataPanel() {
  const toast = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isLocal, setIsLocal] = useState<boolean | null>(null);
  const [checkingAuthMethod, setCheckingAuthMethod] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadAuthMethod() {
      setCheckingAuthMethod(true);
      try {
        const res = await fetchWithAuth("/api/v1/users/me/auth-method");
        if (!res.ok)
          throw new Error("No se pudo verificar el método de acceso");
        const data = await res.json();
        if (!cancelled) setIsLocal(Boolean(data.isLocal));
      } catch {
        // Si falla, asumimos local por seguridad: mejor pedir contraseña
        // de más que dejar borrar la cuenta sin verificarla.
        if (!cancelled) setIsLocal(true);
      } finally {
        if (!cancelled) setCheckingAuthMethod(false);
      }
    }

    loadAuthMethod();
    return () => {
      cancelled = true;
    };
  }, []);

  const ready =
    confirm.trim().toUpperCase() === "ELIMINAR" && (!isLocal || password);

  function closeModal() {
    setOpen(false);
    setConfirm("");
    setPassword("");
    setError(null);
  }

  async function onDelete() {
    setError(null);
    setDeleting(true);

    try {
      const res = await fetchWithAuth("/api/v1/users/me", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isLocal ? { password } : {}),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "No se pudo eliminar la cuenta");
        setDeleting(false);
        return;
      }

      toast("Cuenta eliminada");
      closeModal();
      router.push("/");
    } catch {
      setError("No se pudo conectar con el servidor");
      setDeleting(false);
    }
  }

  return (
    <div role="tabpanel" id="panel-datos" aria-labelledby="tab-datos">
      <Panel title="Eliminar la cuenta">
        <p className="max-w-[62ch] text-[15px] leading-relaxed text-ink-soft">
          Al eliminar la cuenta se borran tu perfil, todos tus movimientos y las
          categorías que creaste. No se guarda copia, así que no hay vuelta
          atrás.
        </p>
        <Button variant="danger" className="mt-5" onClick={() => setOpen(true)}>
          <Trash2 size={16} />
          Eliminar mi cuenta
        </Button>
      </Panel>

      <Modal
        open={open}
        onClose={closeModal}
        closeDisabled={deleting}
        title="Esto borra tu libro entero"
        description="Se eliminan tu perfil, tus movimientos y tus categorías."
        width="sm"
      >
        <div className="grid gap-4">
          <Field
            label="Escribe ELIMINAR para confirmar"
            htmlFor="confirm-delete"
          >
            <Input
              id="confirm-delete"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="off"
              placeholder="ELIMINAR"
            />
          </Field>

          {checkingAuthMethod ? (
            <p className="text-[13px] text-ink-faint">
              Verificando tu cuenta...
            </p>
          ) : isLocal ? (
            <Field
              label="Escribe la contraseña actual para confirmar"
              htmlFor="confirm-password"
            >
              <Input
                id="confirm-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Contraseña"
              />
            </Field>
          ) : null}
        </div>

        {error && (
          <p className="mt-3 text-[14px] text-expense" role="alert">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={closeModal} disabled={deleting}>
            Conservar mi cuenta
          </Button>
          {isLocal ? (
            <Button
              variant="danger"
              disabled={!ready || deleting || checkingAuthMethod}
              onClick={onDelete}
            >
              <Trash2 size={16} />
              {deleting ? "Eliminando…" : "Eliminar definitivamente"}
            </Button>
          ) : (
            <form action={googleDeleteAccount}>
              <Button
                type="submit"
                variant="danger"
                disabled={!ready || checkingAuthMethod}
              >
                <Trash2 size={16} />
                Confirmar con Google y eliminar
              </Button>
            </form>
          )}
        </div>
      </Modal>
    </div>
  );
}
