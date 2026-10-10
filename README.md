# Gonances

Aplicación web en español para registrar ingresos y gastos, organizarlos por categoría y analizarlos con gráficos. El repositorio implementa el backend con **Next.js Route Handlers**, no con FastAPI: frontend y API viven en la misma aplicación Next.js.

## Stack

- Next.js 16 App Router, React 19 y TypeScript estricto.
- Tailwind CSS 4, componentes propios y Lucide React.
- PostgreSQL, Prisma 7 y Neon serverless en producción; adaptador `pg` disponible para PostgreSQL local en Docker.
- JWT propio con `jose`, cookies HttpOnly, `bcryptjs` y OAuth de Google.
- Recharts para los gráficos.

## Requisitos

- Node.js 20 o superior.
- pnpm 12 (Corepack puede activarlo con `corepack enable`).
- PostgreSQL local o una URL de PostgreSQL/Neon.

## Desarrollo local

1. Instala dependencias y copia la plantilla de variables:

   ```bash
   pnpm install
   Copy-Item .env.example .env
   ```

2. En `.env`, configura `DATABASE_URL`, secretos JWT aleatorios distintos y `DATABASE_ADAPTER`:
   - PostgreSQL local: `DATABASE_ADAPTER=pg`.
   - Neon: elimina `DATABASE_ADAPTER` o usa `DATABASE_ADAPTER=neon`.

3. Aplica migraciones, genera el cliente y siembra las categorías globales:

   ```bash
   pnpm exec prisma migrate deploy
   pnpm exec prisma generate
   pnpm db:seed
   ```

4. Arranca Next:

   ```bash
   pnpm dev
   ```

La aplicación local abre en `http://localhost:3000`. OAuth de Google requiere registrar como callback exacto `http://localhost:3000/api/v1/auth/google`. La subida de avatares requiere Cloudinary; sin esas variables la subida se deshabilita con un error explícito.

## Docker Compose

1. Copia `.env.example` a `.env` y reemplaza `JWT_ACCESS_SECRET` y `JWT_REFRESH_SECRET` por valores seguros diferentes.
2. Inicia PostgreSQL, aplica migraciones, siembra categorías y levanta la aplicación:

   ```bash
   docker compose up --build
   ```

Compose ofrece PostgreSQL en el puerto `5432` y Gonances en `http://localhost:3000`. Los datos de PostgreSQL se conservan en el volumen `gonances-postgres`. Para detener los contenedores sin borrar datos: `docker compose down`; para borrar también el volumen: `docker compose down -v`.

## Variables de entorno

| Variable | Requerida | Uso |
| --- | --- | --- |
| `DATABASE_URL` | Sí | Conexión a PostgreSQL |
| `DATABASE_ADAPTER` | No | `pg` para PostgreSQL directo; por omisión se usa el adaptador Neon |
| `JWT_ACCESS_SECRET` | Sí | Firma de access tokens |
| `JWT_REFRESH_SECRET` | Sí | Firma de refresh tokens; distinta de la anterior |
| `NEXT_PUBLIC_BASE_URL` | Sí en despliegue | Origen público y URI OAuth de callback |
| `GOOGLE_CLIENT_ID` | Para Google OAuth | Identificador OAuth de Google |
| `GOOGLE_CLIENT_SECRET` | Para Google OAuth | Secreto OAuth de Google |
| `EXCHANGE_RATE_API_URL` | No | URL base de ExchangeRate-API; por defecto `https://v6.exchangerate-api.com/v6` |
| `EXCHANGE_RATE_API_KEY` | Sí | Llave privada de ExchangeRate-API |
| `CRON_SECRET` | Para cron en Vercel | Protege la actualización diaria de tasas |
| `CLOUDINARY_CLOUD_NAME` | Para subir avatar | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Para subir avatar | Clave pública Cloudinary |
| `CLOUDINARY_API_SECRET` | Para subir avatar | Secreto usado para firmar subidas |

No publiques `.env` ni sus valores. `.env.example` contiene solo valores de ejemplo.

## API

La especificación OpenAPI 3.1 está en [`public/openapi.yaml`](public/openapi.yaml) y se sirve en `/openapi.yaml`. Swagger UI está en `/docs` y ReDoc en `/redoc`. La base local es `/api/v1`; las rutas autenticadas usan la cookie `accesstoken` HttpOnly.

Incluye auth, perfil, moneda preferida, cambio autenticado de contraseña, categorías, transacciones paginadas/filtradas, analíticas y subida de avatar. La identidad del usuario siempre se obtiene del token validado, nunca de un `userId` enviado por el cliente.

## Base de datos y categorías

- `prisma/schema.prisma` es el origen del esquema. Las migraciones existentes y nuevas están en `prisma/migrations/`.
- Después de cambiar el esquema, usa `pnpm exec prisma migrate dev` en desarrollo; en despliegue usa `pnpm exec prisma migrate deploy` y `pnpm exec prisma generate`. Las migraciones nuevas convierten los movimientos a fechas de calendario y añaden sesiones de refresh y límites de autenticación.
- `pnpm db:seed` es idempotente y crea/actualiza las categorías globales.
- El cliente generado en `src/generated/prisma` no se edita manualmente.

## Pruebas y comprobaciones

```bash
pnpm build
pnpm lint
pnpm exec biome check <archivos-modificados>
pnpm test
```

`pnpm test` ejecuta las pruebas unitarias de datos de demostración, validación de transacciones, fechas de calendario y contraseñas. `pnpm benchmark:web` mide la landing con Lighthouse en CI y registra FCP < 2 s como objetivo. Para medir latencia API (requiere una sesión): configura `API_BASE_URL` y `ACCESS_TOKEN`, y ejecuta `pnpm benchmark:api`; el script muestra p50/p95/promedio frente al objetivo de p95 < 300 ms.

## Decisiones de alcance

El MVP no incluye conexión bancaria, presupuestos/alertas, exportación CSV/PDF ni aplicaciones nativas. La web es responsive. Los gráficos de la landing usan datos ficticios en USD; cada usuario puede ver y registrar su libro en USD, EUR, JPY, GBP o COP.

Las tasas se solicitan a ExchangeRate-API con base USD. Guarda únicamente la llave en `EXCHANGE_RATE_API_KEY`; la aplicación construye la ruta `/API_KEY/latest/USD`. `CRON_SECRET` protege únicamente el endpoint interno del cron y es independiente de la llave del proveedor.

La caché limita las consultas externas a un intento cada 24 horas, compartido entre todos los usuarios. El cron se ejecuta diariamente a la 01:00 UTC; las peticiones de la aplicación también pueden renovar la caché cuando vence. Si el proveedor falla, se conservan las últimas tasas válidas y se espera al siguiente intervalo. Son tasas de actualización diaria, no cotizaciones en tiempo real.

El despliegue en Vercel/Neon requiere configurar variables en el proveedor y registrar el URI OAuth correspondiente. Este repositorio no contiene credenciales ni confirma que un servicio cloud ya esté desplegado.

Next.js genera `sitemap.xml` y `robots.txt` desde el dominio de `NEXT_PUBLIC_BASE_URL`; al desplegar, registra el dominio en Google Search Console y envía el sitemap para solicitar indexación.
