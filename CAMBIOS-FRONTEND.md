# Revisión de frontend y cambio de paleta

Fecha: 2026-10-10 · Rama: `dev` · Sin commit todavía.

## Resumen

- La página deja de verse verde: el fondo y las superficies pasan a un neutro casi blanco (gris carbón en el tema oscuro). Primero se probó un amarillo crema, pero se descartó porque parecía un filtro.
- Se corrigieron 7 fallos de frontend: datos nulos, fechas, accesibilidad, estados vacíos, validación, un texto técnico a la vista y código muerto.
- Verificación: `pnpm build` y `pnpm test` (13/13) pasan, y Biome no da errores en los archivos modificados. La portada se revisó en el navegador en claro y en oscuro, sin errores en consola. El panel autenticado no se probó en el navegador porque requiere una cuenta en la base de datos.

## 1. Paleta: del verde al neutro

El tono verde venía de las superficies, los filetes, los grises verdosos del texto y el menú lateral verde-negro. Los colores de ingreso (verde) y gasto (rojo) **no cambian**, porque indican significado.

### Tema claro

| Token | Antes | Ahora |
| --- | --- | --- |
| `--color-paper` | `#e7eadf` | `#efefec` |
| `--color-sheet` | `#f7f8f2` | `#fafaf8` |
| `--color-band` | `#dce2ce` | `#e6e6e2` |
| `--color-rule` | `#c3cbb4` | `#cfcfc9` |
| `--color-rule-soft` | `#d6dcc8` | `#dfdfda` |
| `--color-ink` | `#1a2a22` | `#1f1f1d` |
| `--color-ink-soft` | `#46564c` | `#4d4d49` |
| `--color-ink-faint` | `#6d7c72` | `#65655f` |
| `--color-ink-deep` | `#16241d` | `#161615` |
| `--color-inverse` | `#16241d` | `#1f1f1d` |
| `--color-inverse-ink` | `#e7eadf` | `#efefec` |
| `--color-scrim` | `#16241d` | `#161615` |
| `--color-chart-other` | `#6d7c72` | `#65655f` |
| `--color-highlight` (nuevo) | — | `#d6d6cf` |

### Tema oscuro

| Token | Antes | Ahora |
| --- | --- | --- |
| `--color-paper` | `#131a15` | `#161615` |
| `--color-sheet` | `#1b241d` | `#1f1f1d` |
| `--color-band` | `#222d24` | `#282826` |
| `--color-rule` | `#3a4a3d` | `#44443f` |
| `--color-rule-soft` | `#2b372d` | `#30302d` |
| `--color-ink` | `#e4e8dc` | `#ebebe7` |
| `--color-ink-soft` | `#b0bbaa` | `#bdbdb6` |
| `--color-ink-faint` | `#8b978a` | `#96968e` |
| `--color-ink-deep` | `#f2f5ec` | `#f5f5f2` |
| `--color-inverse` | `#202a22` | `#262624` |
| `--color-inverse-ink` | `#e4e8dc` | `#ebebe7` |
| `--color-scrim` | `#050806` | `#070707` |
| `--color-chart-other` | `#8b978a` | `#96968e` |
| `--color-highlight` (nuevo) | — | `#45453f` |

### Otros ajustes de color

- **Selección de texto:** antes usaba `--color-income-tint` (verde); ahora usa `--color-highlight`, un gris neutro.
- **Chevron del `<select>`:** el trazo del SVG usa la nueva tinta tenue en los dos temas.
- **`src/lib/chart-colors.ts`:** se actualizaron `axis`, `grid`, `rule`, `surface`, `band` y `other` en los dos temas. Recharts no lee `var()`, así que estos valores deben coincidir a mano con `globals.css`.
- **`src/components/ui/category-icon.tsx`:** el icono se oscurecía mezclándolo con `#1a2a22`; ahora se mezcla con `#1f1f1d`.

### Contraste (WCAG)

Todos los textos cumplen 4,5:1 o más sobre papel, hoja y banda, en los dos temas. Ejemplos en el tema claro:

- tinta sobre hoja: 15,8:1;
- tinta tenue sobre banda: 4,7:1;
- series de gráfico sobre hoja: 3,8:1 o más.

## 2. Correcciones de frontend

### 2.1 Movimientos sin descripción

**Problema:** la API devuelve `description: null` cuando no se escribió nada, pero el tipo `Transaction` declaraba `string`. En la tabla de transacciones la celda quedaba vacía, y los botones se anunciaban como "Editar null" y "Eliminar null".

**Cambio:**
- `src/lib/data.ts`: `description: string | null`.
- `src/lib/fetchTransactions.ts`: ya no convierte `null` en `""`.
- `src/components/dashboard/transactions-browser.tsx`:
  - la celda muestra "Sin descripción" en tono tenue;
  - los `aria-label` usan la descripción o la categoría, más la fecha (por ejemplo, "Editar Alimentación, 14 mar").
- `src/app/(dashboard)/dashboard/page.tsx`: si no hay descripción, muestra el nombre de la categoría.

### 2.2 Filtros de fecha en UTC

**Problema:** "Este mes", "Mes pasado" y "Últimos 3 meses" se calculaban con `getUTCFullYear()` y `getUTCMonth()`. Por ejemplo, en Bogotá, a partir de las 19:00 del último día del mes, el filtro ya mostraba el mes siguiente.

**Cambio:** `rangeToDates()` en `transactions-browser.tsx` usa `getFullYear()` y `getMonth()`, es decir, la fecha local de quien mira.

### 2.3 Foco de teclado invisible

**Problema:** cinco selectores en forma de tarjeta esconden el `<input type="radio">` con `sr-only`. Al navegar con teclado no se veía qué opción tenía el foco. Son estos:
- tipo de movimiento;
- moneda;
- tipo de categoría;
- color de categoría;
- icono de categoría.

**Cambio:** una regla global en `src/app/globals.css`:

```css
label:has(> input.sr-only:focus-visible) {
  outline: 2px solid var(--color-ink);
  outline-offset: 2px;
}
```

### 2.4 Panel sin estado vacío

**Problema:** con una cuenta nueva, "Últimos movimientos" mostraba una tabla vacía con solo los encabezados.

**Cambio:** si no hay movimientos, el panel muestra "Tu libro todavía está en blanco." con una indicación para anotar el primero.

### 2.5 Descripción sin límite en el formulario

**Problema:** el servidor rechaza descripciones de más de 200 caracteres, pero el campo dejaba escribir sin límite y el error llegaba recién al guardar.

**Cambio:** `maxLength={200}` en el campo Descripción de `new-transaction-modal.tsx`.

### 2.6 Texto técnico visible para el usuario

**Problema:** el selector de moneda mostraba "La respuesta con base USD incluye todas las monedas mostradas.", un detalle interno de la API.

**Cambio:** se eliminó la frase en `currency-switcher.tsx`.

### 2.7 Código muerto

**Problema:** Biome marcaba como no usados `DESCRIPTIONS`, `mulberry32`, `EXPENSE_PLAN` e `iso` en `src/lib/data.ts`. Eran restos de los antiguos datos de demostración.

**Cambio:** se eliminaron (unas 75 líneas). Ninguno se exportaba, así que no hay usos fuera del archivo.

## 3. Archivos modificados

| Archivo | Cambio |
| --- | --- |
| `src/app/globals.css` | Paleta neutra, `--color-highlight`, foco de tarjetas, selección |
| `src/lib/chart-colors.ts` | Paleta de gráficos sincronizada |
| `src/components/ui/category-icon.tsx` | Tinta de mezcla del icono |
| `src/lib/data.ts` | `description` nullable y código muerto eliminado |
| `src/lib/fetchTransactions.ts` | Mantiene `null` en la descripción |
| `src/components/dashboard/transactions-browser.tsx` | Fechas locales, descripción vacía, `aria-label` |
| `src/components/dashboard/new-transaction-modal.tsx` | `maxLength={200}` |
| `src/components/dashboard/currency-switcher.tsx` | Texto técnico eliminado |
| `src/app/(dashboard)/dashboard/page.tsx` | Estado vacío y descripción de respaldo |

Los cambios previos en `package.json`, `pnpm-lock.yaml` y `src/generated/prisma/` no son parte de esta revisión.

## 4. Segunda ronda: pendientes resueltos

Todo lo que había quedado pendiente en la primera revisión ya está aplicado.

| Tema | Qué se hizo | Archivos |
| --- | --- | --- |
| `pnpm lint` fallaba con 139 errores | Biome excluye `src/generated`; `.gitattributes` fija `* text=auto eol=lf` y la copia de trabajo se reescribió en LF. Se formateó `scripts/benchmark-api.mjs`, el único error real. Ahora `pnpm lint` pasa | `biome.json`, `.gitattributes`, `scripts/benchmark-api.mjs` |
| `tsc` se quejaba de páginas borradas | Eran tipos viejos en `.next/types`; desaparecen al ejecutar `pnpm build` | — |
| Estados muertos en el panel | `currentUser` pasa a ser `User` (nunca `null`): el layout servidor redirige a `/login` antes de montar el proveedor. Se eliminaron `loading` y las ramas "Cargando..." y "No se pudo cargar…" sin estilo, en `chrome.tsx` y en las dos pestañas de Ajustes. La subida de avatar usa una actualización funcional del estado | `user-provider.tsx`, `chrome.tsx`, `settings-tabs.tsx`, `currency-switcher.tsx`, `new-transaction-modal.tsx`, `transactions-browser.tsx` |
| Mes calculado en UTC en el servidor | El navegador guarda su zona IANA en la cookie `tz` (script en el `<head>`). `userToday()` la lee y devuelve el día de calendario del usuario como medianoche UTC, que el resto del código ya sabe leer. Sin cookie, o con un valor inválido, se usa el día UTC, como antes. Se aplica al panel, a Estadísticas y a la portada | `src/lib/user-today.ts` (nuevo), `src/lib/date-only.ts` (`calendarDateIn`), `layout.tsx`, `dashboard/page.tsx`, `analytics/page.tsx`, `(public)/page.tsx` |
| Colores anunciados como hex | Cada color de categoría tiene un nombre legible ("Naranja", "Turquesa"…) para el lector de pantalla | `categories-manager.tsx` |
| Avatar como `background-image` | Se usa un `<img alt="">` con tamaño fijo en la cabecera y en Ajustes | `chrome.tsx`, `settings-tabs.tsx` |

### Verificación de la segunda ronda

- `pnpm lint`: sin errores (106 archivos).
- `pnpm test`: 15/15, incluidas 2 pruebas nuevas de `calendarDateIn`: Bogotá a las 21:00 del 30 de septiembre sigue en septiembre, Tokio ya está en octubre, y una zona desconocida cae a UTC.
- `pnpm build`: correcto.
- Navegador: la cookie `tz=America%2FBogota` se escribe al cargar `/login` y la consola queda limpia. La portada responde 200 sin cookie, con una zona válida, con una zona inventada y con una cookie mal codificada.
