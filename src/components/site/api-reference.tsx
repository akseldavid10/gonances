"use client";

import Script from "next/script";
import { useCallback, useRef, useState } from "react";

type SwaggerOptions = {
  url: string;
  domNode: HTMLElement;
  deepLinking: boolean;
};

declare global {
  interface Window {
    SwaggerUIBundle?: (options: SwaggerOptions) => unknown;
    Redoc?: {
      init: (
        url: string,
        options: Record<string, unknown>,
        element: HTMLElement,
      ) => void;
    };
  }
}

export function SwaggerReference({ specUrl }: { specUrl: string }) {
  const mount = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const initialize = useCallback(() => {
    if (!window.SwaggerUIBundle || !mount.current) return;
    window.SwaggerUIBundle({
      url: specUrl,
      domNode: mount.current,
      deepLinking: true,
    });
  }, [specUrl]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css"
      />
      <Script
        src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"
        strategy="afterInteractive"
        onReady={initialize}
        onError={() => setError(true)}
      />
      {error ? (
        <p role="alert" className="text-expense">
          No se pudo cargar Swagger UI. Consulta directamente el contrato
          OpenAPI.
        </p>
      ) : null}
      <div ref={mount} />
    </>
  );
}

export function RedocReference({ specUrl }: { specUrl: string }) {
  const mount = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const initialize = useCallback(() => {
    if (!window.Redoc || !mount.current) return;
    window.Redoc.init(specUrl, { hideDownloadButton: false }, mount.current);
  }, [specUrl]);

  return (
    <>
      <Script
        src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"
        strategy="afterInteractive"
        onReady={initialize}
        onError={() => setError(true)}
      />
      {error ? (
        <p role="alert" className="text-expense">
          No se pudo cargar ReDoc. Consulta directamente el contrato OpenAPI.
        </p>
      ) : null}
      <div ref={mount} />
    </>
  );
}
