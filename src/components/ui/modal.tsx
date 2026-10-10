"use client";

import { X } from "lucide-react";
import { type ReactNode, useEffect, useId, useRef } from "react";

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  width = "md",
  closeDisabled = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  width?: "sm" | "md";
  closeDisabled?: boolean;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  // Guardamos la última versión de onClose sin que dispare el efecto de abajo.
  const onCloseRef = useRef(onClose);
  const closeDisabledRef = useRef(closeDisabled);
  useEffect(() => {
    onCloseRef.current = onClose;
    closeDisabledRef.current = closeDisabled;
  });

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !closeDisabledRef.current) {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = panel.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) {
        e.preventDefault();
        panel.current?.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const focusIsInside = panel.current?.contains(document.activeElement);
      if (!focusIsInside) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey, true);

    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Excluimos el botón de cerrar para no robarle el foco al primer campo real.
    panel.current
      ?.querySelector<HTMLElement>(
        "[data-modal-body] input, [data-modal-body] select, [data-modal-body] textarea, [data-modal-body] button",
      )
      ?.focus();

    return () => {
      document.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Cerrar"
        disabled={closeDisabled}
        onClick={() => {
          if (!closeDisabled) onClose();
        }}
        className="absolute inset-0 bg-scrim/45"
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={`relative w-full ${
          width === "sm" ? "sm:max-w-105" : "sm:max-w-140"
        } max-h-[92dvh] overflow-y-auto rounded-t-lg border border-rule bg-sheet sm:rounded-lg`}
        style={{ animation: "modal-in 160ms ease-out" }}
      >
        <div className="flex items-start justify-between gap-6 border-b border-rule px-5 py-4 sm:px-6">
          <div>
            <h2 id={titleId} className="font-display text-[22px] leading-tight">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="mt-1 text-[13px] text-ink-faint">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            disabled={closeDisabled}
            onClick={() => {
              if (!closeDisabled) onClose();
            }}
            aria-label="Cerrar"
            className="-mr-1 rounded p-1.5 text-ink-faint hover:bg-band hover:text-ink"
          >
            <X size={18} />
          </button>
        </div>
        <div data-modal-body className="px-5 py-5 sm:px-6">
          {children}
        </div>
      </div>
      <style>{`@keyframes modal-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
