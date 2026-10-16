# Historial de versiones

Se utiliza SemVer (`MAJOR.MINOR.PATCH`): cambios incompatibles, funcionalidades compatibles y correcciones, respectivamente. La entrega inicial se considera 1.0.0; las etiquetas explícitas de Git comienzan en 1.1.0.

## 1.1.0

### Funcionalidades

- Persistencia de importe y moneda originales, tasas históricas, fuente y fechas de referencia por movimiento.
- Consulta histórica gratuita con Frankfurter y entrada manual cuando no hay tasas disponibles.
- Conversión individual de movimientos antes de calcular saldos, gráficos y resúmenes.
- Recuperación de tasas por fecha para los movimientos antiguos conservando su importe USD almacenado.

### Correcciones

- CI usa la versión de pnpm declarada en `packageManager`.
- Tabla y modales comparten categorías y evitan peticiones redundantes.
- Abrir o cerrar el modal desde Transacciones modifica la URL sin solicitar otra página al servidor.
- Búsqueda y reinicio de paginación se aplican juntos para evitar consultas intermedias.
- Las escrituras invalidan lecturas pendientes antiguas sin romper la deduplicación ni el refresh compartido de sesión.
- PostgreSQL mantiene explícitamente la verificación TLS completa.
- Declaración de desplazamiento suave compatible con Next.js 16.

### Despliegue

- Aplicar `pnpm exec prisma migrate deploy` y generar el cliente con `pnpm exec prisma generate` antes de iniciar esta versión.
- La migración histórica añade columnas y una tabla sin borrar movimientos. Las entradas antiguas no permiten reconstruir con certeza su moneda o importe originales si solo se conservaba el equivalente USD.
