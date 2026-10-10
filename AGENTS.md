<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Gonances: guía del proyecto

## Propósito y stack

Gonances es una aplicación en español para registrar ingresos y gastos, organizarlos por categorías y consultar resúmenes y gráficos.

- Next.js 16 App Router, React 19 y TypeScript (modo estricto).
- Tailwind CSS 4; Biome para formato y lint.
- PostgreSQL mediante Prisma 7 y el adaptador Neon serverless.
- Autenticación propia con JWT (`jose`), cookies HttpOnly y contraseñas con `bcryptjs`; OAuth con Google.
- Gráficos con Recharts.
- El gestor declarado en `package.json` es pnpm (`pnpm@12.3.4`). Usa `pnpm` para instalar y ejecutar scripts.

## Mapa del código

- `src/app/(public)/`: portada pública y páginas legales. La portada contiene gráficos de demostración.
- `src/app/(auth)/`: páginas de acceso y registro.
- `src/app/(dashboard)/`: panel autenticado: resumen, transacciones, categorías, estadísticas y ajustes.
- `src/app/api/v1/`: handlers HTTP de autenticación, transacciones, categorías, analíticas, perfil y firma de avatar.
- `src/components/dashboard/`: interfaz del panel, tablas y gráficos.
- `src/components/provider/user-provider.tsx`: estado del usuario del panel, inicializado en el layout servidor autenticado.
- `src/components/theme/`: tema claro/oscuro; `src/app/globals.css` contiene estilos y tokens.
- `src/lib/data.ts`: tipos de dominio, categorías y cálculos/resúmenes para gráficos.
- `src/lib/falseData.ts`: datos ficticios distribuidos en una ventana móvil de seis meses.
- `src/lib/falseData.test.ts`: pruebas de esa distribución, importes y avance mensual.
- `src/lib/fetchWithAuth.ts`: fetch cliente que intenta refrescar una sesión al recibir 401.
- `src/lib/analytics.ts`: agregaciones de analíticas desde PostgreSQL.
- `src/lib/transaction-validation.ts`: validación pura de importes y descripciones.
- `src/lib/date-only.ts`: parseo y serialización de fechas de calendario sin zona horaria.
- `src/lib/auth-session.ts`: emisión, rotación y revocación de sesiones refresh.
- `src/lib/rate-limit.ts`: límites distribuidos para rutas de autenticación.
- `src/lib/prisma.ts`: instancia compartida del cliente Prisma.
- `prisma/schema.prisma`: esquema de datos; `prisma/migrations/`: migraciones SQL.
- `src/generated/prisma/`: cliente generado; no editarlo manualmente.

## Reglas de arquitectura que conviene conservar

- El `UserProvider` vive una sola vez en `src/app/(dashboard)/layout.tsx`; el layout servidor valida la cookie, consulta el usuario y lo pasa como dato inicial. No volver a envolverlo en el layout raíz ni en páginas como Ajustes.
- `fetchWithAuth` deduplica GET simultáneos y comparte el refresh mientras esté en curso. Mantén esa deduplicación en React Strict Mode y al recibir varios 401 concurrentes.
- Los endpoints autenticados obtienen identidad desde el cookie `accesstoken` validado con `getInfoToken()`. Nunca aceptes un `userId` enviado por el cliente como autoridad para leer o cambiar datos personales.
- En transacciones, validar propiedad del usuario, tipo de movimiento, monto positivo, fecha y que la categoría sea global o pertenezca al usuario y tenga el mismo tipo.
- Los datos demo son solo para vistas de muestra o fallback explícito; no tratarlos como datos reales ni usarlos para reemplazar una respuesta válida de la API.
- La función `getDynamicFalseTransactions(now?)` genera diez movimientos ficticios para cada uno de los seis meses mostrados (cinco anteriores y el actual), con ingresos y gastos variados. Usa el mismo `now` para construir datos, tendencias y etiquetas si se calculan juntos. Mantén los días en 1–28 para cubrir febrero y conserva las categorías concordantes.
- `monthlyTrends(months, transactions, now?)` acepta fecha de referencia para que gráficos y pruebas compartan ventana temporal.
- `categoryById()` devuelve `Category | null`; los llamadores deben contemplar una categoría desconocida y no sustituirla silenciosamente por otra categoría válida.
- Los montos persistidos usan `Decimal(10,2)` en PostgreSQL; convertirlos explícitamente a número al construir respuestas JSON.
- `Category.userId` es nullable: las categorías globales tienen `userId = null`; al eliminar una cuenta por la API, primero se borran sus movimientos y categorías propias en una transacción. Las transacciones sí pertenecen a un usuario y la categoría se protege con `Restrict`.
- Las categorías globales se crean/actualizan con `pnpm db:seed`; las categorías de usuario se leen y guardan mediante `/api/v1/categories` con un máximo validado en servidor de cinco.
- Las analíticas privadas consultan Prisma a través de `src/lib/analytics.ts`; solo la landing debe usar `getDynamicFalseTransactions()`.
- Los JWT incluyen `ver` (versión de sesión), que se contrasta con `User.tokenVersion`; el cambio de contraseña invalida sesiones anteriores.

## Persistencia y Prisma

- El esquema de Prisma está en `prisma/schema.prisma`; la configuración v7, URL de migración y ruta de migraciones están en `prisma.config.ts`.
- El cliente se genera en `src/generated/prisma`; al modificar el esquema, generar/migrar el cliente de acuerdo al flujo Prisma 7 del proyecto, no editar archivos generados.
- `DATABASE_URL` debe estar configurada para el adaptador Neon y las operaciones de base de datos. No mostrar ni copiar valores de `.env` en documentación, logs o respuestas.
- `prisma/migrations/20260926120000_account_features/` añade versión de sesión e índices; cambia la FK de categorías a `ON DELETE SET NULL` sin borrar filas.
- `prisma/migrations/20260928120000_session_limits_and_date_only/` crea almacenamiento de refresh/rate limits y convierte `transactions.date` en `DATE`, conservando el día de calendario almacenado.
- Antes de cualquier migración con impacto en datos, revisar el esquema y las migraciones actuales, y explicar cualquier operación destructiva.

## Autenticación y configuración

- Variables usadas por el código: `DATABASE_URL`, `DATABASE_ADAPTER` (opcional: `pg`; Neon es el predeterminado), `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_BASE_URL` y `CLOUDINARY_CLOUD_NAME`/`CLOUDINARY_API_KEY`/`CLOUDINARY_API_SECRET`. Consultar `.env` localmente solo si hace falta; nunca publicar sus valores ni agregar secretos al control de versiones.
- Access token: cookie `accesstoken`, vida de 30 minutos. Refresh token: cookie `refreshtoken`, vida de 7 días. Las dos deben ser `HttpOnly`, `SameSite=Lax`, con `Secure` en producción.
- Los refresh JWT llevan un `jti` aleatorio; al renovarlos se consume el token previo y se revoca la familia si se detecta reutilización. Los límites de autenticación se guardan con clave HMAC, no con email/IP en claro.
- Las fechas de transacciones son fechas civiles PostgreSQL `DATE`; APIs y componentes intercambian `YYYY-MM-DD`, no timestamps con zona horaria.
- Al tocar Google OAuth, comprobar que el URI configurado en Google, el que inicia el flujo y el callback servidor coincidan exactamente, incluyendo esquema, host y ruta. No asumir que cambiar una única URL cubre todo el flujo.
- Al tocar cookies o JWT, revisar los tres caminos de inicio de sesión (local, registro y Google), refresh, cierre de sesión y borrado de cuenta. Usa `NODE_ENV === "production"` para el atributo `Secure`.

## Comandos útiles

```bash
pnpm dev
pnpm build
pnpm lint
pnpm exec biome check <archivos-modificados>
pnpm test
pnpm db:seed
pnpm exec prisma migrate deploy
```

- `pnpm build` incluye compilación y TypeScript; ejecutarlo después de cambios funcionales.
- Para cambios de formato/lint, preferir `biome check` dirigido a los archivos tocados. `pnpm format` aplica escritura amplia al repositorio; no ejecutarlo como comprobación rutinaria.
- Si una comprobación falla, distinguir los diagnósticos de los archivos modificados de los problemas preexistentes antes de ampliar el alcance del cambio.
- `pnpm test` ejecuta las pruebas unitarias disponibles. La CI levanta PostgreSQL y valida migraciones, seed, tests y build.
- Docker Compose inicia PostgreSQL, aplica migraciones y seed idempotente, y levanta Next.js.

## Convenciones de trabajo

- Antes de modificar una API de Next, componente o característica de framework, leer la guía correspondiente en `node_modules/next/dist/docs/` para la versión instalada; este proyecto usa Next.js 16 y algunas APIs difieren de ejemplos antiguos.
- Respetar componentes Server/Client: usar `"use client"` solo donde se necesite estado, efectos o APIs del navegador. Para salida dependiente de la fecha actual en Next 16, consultar la guía instalada de `connection()` si se requiere render dinámico por petición.
- Mantener textos visibles en español, nombres y convenciones coherentes con los archivos vecinos.
- Revisar `git status` y el diff antes de terminar. El repositorio puede contener cambios de usuario previos: no revertirlos ni hacer formato global como parte de una tarea acotada.
