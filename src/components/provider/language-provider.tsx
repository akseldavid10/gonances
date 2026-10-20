"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type Language = "es" | "en";

const STORAGE_KEY = "gonances.language";

const messages: Record<string, string> = {
  Características: "Features",
  "Cómo funciona": "How it works",
  "Preguntas frecuentes": "Frequently asked questions",
  "Iniciar sesión": "Log in",
  "Empezar gratis": "Get started for free",
  "Un libro de cuentas personal: anota lo que entra y lo que sale, y mira a dónde se fue el mes.":
    "A personal money journal: track what comes in and goes out, and see where your money went this month.",
  "Tu libro, esta semana": "Your journal this week",
  "Tu libro, en la moneda que prefieras":
    "Your journal, in the currency you prefer",
  Saldo: "Balance",
  "Sueldo mensual": "Monthly salary",
  "Mercado del barrio": "Neighborhood groceries",
  "Internet fibra": "Fiber internet",
  "Rediseño de web": "Website redesign",
  "Cine con amigos": "Movie night with friends",
  Gastado: "Spent",
  "Estos son datos ficticios de seis meses completos, hasta":
    "These are sample figures from six full months, through",
  "Se actualizan cada mes. Pasa el cursor por encima para ver los montos.":
    "They update each month. Hover over the charts to see the amounts.",
  "Puedes cambiar la moneda de tu libro cuando quieras. Elige entre estas cinco opciones:":
    "Change your journal's currency whenever you like. Choose from these five options:",
  "Dólar estadounidense": "US dollar",
  Euro: "Euro",
  "Yen japonés": "Japanese yen",
  "Libra esterlina": "British pound",
  "Peso colombiano": "Colombian peso",
  "Anota lo que entra y lo que sale, y mira a dónde se va tu dinero cada mes.":
    "Track what comes in and goes out, and see where your money goes each month.",
  "Gonances · Tu libro de cuentas personal":
    "Gonances · Your personal money journal",
  "Proyecto personal de finanzas, hecho con Next.js.":
    "A personal finance project, built with Next.js.",
  Producto: "Product",
  Cuenta: "Account",
  Legal: "Legal",
  "Ir al panel": "Go to dashboard",
  "Crear cuenta": "Create account",
  "Términos y condiciones": "Terms and conditions",
  "Política de privacidad": "Privacy policy",
  "Acepto los": "I accept the",
  "términos y condiciones": "terms and conditions",
  "y la": "and the",
  "política de privacidad": "privacy policy",
  "Anota lo que ganas, lo que gastas, en qué y cuándo.":
    "Track what you earn, what you spend, where it goes, and when.",
  "Gonances es tu libro de cuentas personal. Cada gasto o ganancia queda registrado, puedes dividirlos en categorías si quieres, el saldo se actualiza solo y el mes termina explicado en un gráfico sobre cómo usaste tu dinero.":
    "Gonances is your personal money journal. Every expense and income is recorded, you can organize them into categories, your balance updates automatically, and a chart shows how you used your money each month.",
  "Crear mi cuenta gratis": "Create my free account",
  "Ver panel de ejemplo": "View the sample dashboard",
  "Gratis durante la beta. También puedes entrar con tu cuenta de Google.":
    "Free during the beta. You can also sign in with your Google account.",
  "Lo que hace por ti": "What it does for you",
  "Cada gasto en su categoría": "Every expense in its own category",
  "Usa las categorías de siempre o crea las tuyas con su color y su icono. El café del lunes y el alquiler no se mezclan.":
    "Use the built-in categories or create your own with a color and icon. Monday's coffee and your rent stay separate.",
  "El mes entero en un gráfico": "Your whole month in a chart",
  "El reparto por categoría y la comparación con los meses anteriores, sin escribir una sola fórmula.":
    "See spending by category and compare it with previous months, without writing a single formula.",
  "Tu libro es solo tuyo": "Your journal is yours alone",
  "Entra con tu correo o con Google. Cada movimiento queda atado a tu cuenta y nadie más lo ve.":
    "Sign in with email or Google. Every transaction belongs to your account, and no one else can see it.",
  "Crea la cuenta con tu correo o entra con Google. No pedimos datos bancarios.":
    "Create an account with your email or sign in with Google. We never ask for bank details.",
  "Anota el movimiento": "Record a transaction",
  "Cuanto fue, categoría, fecha y una descripción si quieres. Tres campos y listo, desde cualquier pantalla.":
    "Enter the amount, category, date, and an optional description. That's it, from any screen.",
  "Mira como fue tu mes": "See how your month went",
  "El cuentas se hacen solas y el gráfico te dice en qué se fue el dinero antes de que termine el mes.":
    "Your totals are calculated automatically, and a chart shows where your money went before the month is over.",
  "Así se lee tu mes": "Your month at a glance",
  "En qué se fue el gasto": "Where your spending went",
  "Ingresos contra gastos": "Income vs. expenses",
  "¿Se conecta con mi banco?": "Does it connect to my bank?",
  "¿Cuánto cuesta?": "How much does it cost?",
  "¿Puedo crear mis propias categorías?": "Can I create my own categories?",
  "¿Funciona en el celular?": "Does it work on mobile?",
  "¿Puedo trabajar con más de una moneda?": "Can I use more than one currency?",
  "Sí. Puedes ver y anotar tu libro en dólares estadounidenses, euros, yenes japoneses, libras esterlinas o pesos colombianos. La tasa se actualiza cada hora.":
    "Yes. View and record your journal in US dollars, euros, Japanese yen, British pounds, or Colombian pesos. Exchange rates update hourly.",
  "Sí, hasta cinco además de las que ya vienen. Eliges nombre, color e icono, y decides si es para ingresos o para gastos.":
    "Yes. Add up to five categories, with a name, color, and icon, and choose whether each is for income or expenses.",
  "Gratis durante la beta. Es un proyecto personal abierto, así que puedes usarlo y revisar el código.":
    "It's free during the beta. This is an open personal project, so you can use it and inspect the code.",
  Panel: "Dashboard",
  Transacciones: "Transactions",
  Categorías: "Categories",
  Estadísticas: "Analytics",
  Ajustes: "Settings",
  "Abrir menú": "Open menu",
  "Cerrar menú": "Close menu",
  "Navegación principal": "Main navigation",
  Secciones: "Sections",
  "Hola,": "Hello,",
  "Hola, ": "Hello, ",
  "Nueva transacción": "New transaction",
  "Tu perfil": "Your profile",
  "Cerrar sesión": "Log out",
  "Cerrando sesión…": "Logging out…",
  "No se pudo cerrar la sesión. Inténtalo de nuevo.":
    "Could not log out. Please try again.",
  "Volver al inicio": "Back to home",
  "Continuar con Google": "Continue with Google",
  "Registrarme con Google": "Sign up with Google",
  o: "or",
  "Vuelve a tu libro": "Welcome back",
  "Entra para seguir anotando y ver cómo va el mes.":
    "Sign in to keep tracking transactions and see how your month is going.",
  "¿Todavía no tienes cuenta? ": "Don't have an account yet? ",
  "Créala gratis": "Create one for free",
  "Abre tu libro": "Start your journal",
  "Tarda menos de un minuto y no pedimos datos bancarios.":
    "It takes less than a minute, and we never ask for bank details.",
  "¿Ya tienes cuenta? ": "Already have an account? ",
  "Inicia sesión": "Log in",
  "No se pudo cargar Swagger UI. Consulta directamente el contrato OpenAPI.":
    "Could not load Swagger UI. See the OpenAPI specification directly.",
  "No se pudo cargar ReDoc. Consulta directamente el contrato OpenAPI.":
    "Could not load ReDoc. See the OpenAPI specification directly.",
  Perfil: "Profile",
  Seguridad: "Security",
  Datos: "Data",
  Apariencia: "Appearance",
  "Ajustes de la cuenta": "Account settings",
  "Tu libro todavía está en blanco.": "Your journal is still empty.",
  "Usa «Nueva transacción» arriba y el primer movimiento aparecerá aquí.":
    "Use “New transaction” above and your first transaction will appear here.",
  "Últimos movimientos": "Recent transactions",
  "Ver todas las transacciones": "View all transactions",
  "Balance total": "Total balance",
  "Ingresos del mes": "Monthly income",
  Ingresos: "Income",
  Gastos: "Expenses",
  Fecha: "Date",
  Concepto: "Description",
  Monto: "Amount",
  Categoría: "Category",
  Descripción: "Description",
  "Sin descripción": "No description",
  "Cambiar a modo claro": "Switch to light mode",
  "Cambiar a modo oscuro": "Switch to dark mode",
  Términos: "Terms",
  Privacidad: "Privacy",
  "En esta página": "On this page",
  Contenido: "Contents",
  "Última actualización: ": "Last updated: ",
  "Entra con tu correo o continúa con Google.":
    "Sign in with your email or continue with Google.",
  "Gastos del mes": "Monthly expenses",
  Ingreso: "Income",
  Gasto: "Expense",
  Cancelar: "Cancel",
  Guardar: "Save",
  Eliminar: "Delete",
  Editar: "Edit",
  Crear: "Create",
  Buscar: "Search",
  Filtrar: "Filter",
  Todos: "All",
  "Cargando…": "Loading…",
  "Cargando categorías…": "Loading categories…",
  "Elige una categoría": "Choose a category",
  "Ocho caracteres o más": "Eight or more characters",
  "Al menos un número": "At least one number",
  "Al menos una mayúscula": "At least one uppercase letter",
  "Máximo 72 bytes": "Maximum 72 bytes",
  "Repite la contraseña": "Repeat your password",
  "Creando tu libro…": "Creating your journal…",
  "Crear mi cuenta": "Create my account",
  "Entrando…": "Signing in…",
  Entrar: "Sign in",
  "No se pudo crear la cuenta": "Could not create the account",
  "Correo o contraseña incorrectos": "Incorrect email or password",
  "Error de conexión, intenta de nuevo": "Connection error. Please try again.",
  "No se pudieron cargar las tasas": "Could not load exchange rates",
  "No se pudo cambiar la moneda": "Could not change the currency",
  "Moneda de tu libro": "Your journal currency",
  "Cargando tasa…": "Loading rate…",
  "Tasa no disponible": "Rate unavailable",
  "Rango personalizado": "Custom range",
  "Todo el historial": "All time",
  "La fecha inicial no puede ser posterior a la fecha final":
    "The start date cannot be later than the end date",
  "No se pudieron cargar los movimientos": "Could not load transactions",
  "No se pudieron cargar las categorías": "Could not load categories",
  "No se pudo eliminar": "Could not delete",
  "No se pudo eliminar el movimiento": "Could not delete the transaction",
  "Error al cargar los movimientos": "Error loading transactions",
  "Seleccionar foto de perfil": "Choose a profile photo",
  "Subiendo…": "Uploading…",
  "Cambiar foto": "Change photo",
  "Perfil actualizado": "Profile updated",
  "Elige una imagen JPG, PNG o WebP de hasta 2 MB":
    "Choose a JPG, PNG, or WebP image up to 2 MB",
  "No se pudo cargar la foto": "Could not upload the photo",
  "No se pudo actualizar el perfil": "Could not update the profile",
  "No se pudo verificar el método de acceso":
    "Could not verify the sign-in method",
  "Todo lo que anotaste queda en tu cuenta.":
    "Everything you record stays in your account.",
  "La categoría ya existe": "This category already exists",
  "La categoría tiene movimientos asociados y no se puede eliminar.":
    "This category has transactions and cannot be deleted.",
  "Guardar movimiento": "Save transaction",
  Todas: "All",
  "Los ocho movimientos más recientes de tu libro":
    "The eight most recent transactions in your journal",
  "En días sin publicación se usa la última referencia anterior disponible, conservando su fecha y fuente.":
    "On days without a published rate, the most recent available rate is used along with its date and source.",
  "Entra con tu correo o con Google.": "Sign in with your email or Google.",
  Alimentación: "Food",
  Transporte: "Transport",
  Hogar: "Home",
  Salud: "Health",
  Educación: "Education",
  Ocio: "Leisure",
  Servicios: "Utilities",
  Sueldo: "Salary",
  Freelance: "Freelance",
  Mercado: "Groceries",
  Alquiler: "Rent",
  Café: "Coffee",
  Mascota: "Pet",
  Regalos: "Gifts",
  Viajes: "Travel",
  Ahorro: "Savings",
  Impuestos: "Taxes",
  Otros: "Other",
  "Qué es Gonances": "What is Gonances",
  "Tu cuenta": "Your account",
  "Uso aceptable": "Acceptable use",
  "Tus datos son tuyos": "Your data belongs to you",
  "El servicio se presta tal como está": "The service is provided as is",
  "Cambios en estos términos": "Changes to these terms",
  "Qué guardamos": "What we store",
  "Qué no guardamos": "What we don't store",
  "Para qué lo usamos": "How we use it",
  "Entrar con Google": "Signing in with Google",
  "Dónde viven los datos": "Where your data is stored",
  "Tus derechos": "Your rights",
  Contacto: "Contact",
  Cookies: "Cookies",
  "Las reglas de uso de Gonances, en lenguaje claro.":
    "Gonances terms of use, in plain language.",
  "Qué datos guarda Gonances, para qué y cómo borrarlos.":
    "What data Gonances stores, why we store it, and how to delete it.",
  "Estas son las reglas de uso de Gonances. Están escritas en lenguaje corriente a propósito: si algo no se entiende, escríbenos y lo aclaramos.":
    "These are the rules for using Gonances. They are written in plain language on purpose. If anything is unclear, write to us and we'll explain.",
  "Gonances es una herramienta para anotar tus ingresos y gastos y verlos resumidos. No es un banco, no mueve dinero, no da consejos de inversión y no reemplaza a un contador.":
    "Gonances is a tool for recording your income and expenses and viewing summaries. It is not a bank, does not move money, does not provide investment advice, and is not a substitute for an accountant.",
  "Necesitas una cuenta para usar el panel. Puedes crearla con tu correo o con tu cuenta de Google. Eres responsable de mantener tu contraseña en privado y de lo que se haga desde tu sesión.":
    "You need an account to use the dashboard. You can sign up with your email or Google account. You are responsible for keeping your password private and for activity in your account.",
  "Puedes usar Gonances para llevar tus finanzas personales. No puedes usarlo para actividades ilegales, para intentar acceder a cuentas ajenas ni para sobrecargar el servicio de forma deliberada. Si eso ocurre, cerramos la cuenta.":
    "You may use Gonances to manage your personal finances. You may not use it for illegal activities, attempt to access other accounts, or deliberately overload the service. If that happens, we may close your account.",
  "Los movimientos que anotas te pertenecen. Puedes borrarlos cuando quieras y puedes eliminar la cuenta completa desde":
    "The transactions you record belong to you. You can delete them at any time and delete your entire account from",
  "lo que borra también todo tu historial. Cómo tratamos esos datos está en la":
    "which also deletes your entire history. Our privacy policy explains how we handle your data.",
  "Gonances está en beta y es un proyecto personal. Hacemos lo posible para que funcione y para no perder información, pero no podemos garantizar disponibilidad continua ni hacernos responsables de decisiones financieras tomadas a partir de lo que muestra la aplicación. Guarda una copia de lo que sea crítico para ti.":
    "Gonances is in beta and is a personal project. We do our best to keep it running and protect your information, but we cannot guarantee continuous availability or be responsible for financial decisions based on what the app displays. Keep a copy of anything important to you.",
  "La versión vigente y su fecha de actualización se publican en esta página. Revísala periódicamente; al continuar usando Gonances aceptas los términos vigentes.":
    "The current version and its update date are posted on this page. Check it periodically; by continuing to use Gonances, you agree to the current terms.",
  "Para cualquier consulta sobre estos términos, escribe a":
    "For any questions about these terms, email",
  "Gonances guarda lo mínimo para que tu libro funcione: quién eres y qué anotaste. Nada más, y nada se vende.":
    "Gonances stores only what is needed to run your journal: who you are and what you recorded. Nothing more, and we never sell your data.",
  "De tu cuenta:": "About your account:",
  "De tu libro:": "About your journal:",
  "nombre, correo electrónico y foto de perfil si la agregas o entras con Google y la fecha en que te registraste. Si usas correo y contraseña, guardamos un hash seguro de la contraseña, nunca la contraseña en texto plano.":
    "your name, email address, profile photo if you add one or sign in with Google, and your registration date. If you use an email and password, we store a secure password hash, never the plain-text password.",
  "los movimientos que anotas (monto, tipo, fecha, categoría y la descripción que escribas) y las categorías que crees.":
    "the transactions you record (amount, type, date, category, and any description) and the categories you create.",
  "No pedimos ni almacenamos claves de banco, números de tarjeta ni accesos a tus cuentas bancarias. Gonances no se conecta con tu banco: todo lo que hay dentro lo escribiste tú.":
    "We do not ask for or store bank passwords, card numbers, or access to your bank accounts. Gonances does not connect to your bank: you enter everything in your journal yourself.",
  "Solo para mostrarte tu propio panel: calcular balances, agrupar gastos por categoría y dibujar los gráficos. No usamos tus movimientos para publicidad ni los compartimos con terceros con fines comerciales.":
    "We use your data only to show your dashboard, calculate balances, group expenses by category, and draw charts. We do not use your transactions for advertising or share them with third parties for commercial purposes.",
  "Si eliges iniciar sesión con Google, recibimos tu nombre, tu correo y tu foto de perfil para crear la cuenta. No recibimos tu contraseña de Google ni acceso a tu correo, tu agenda o tus archivos. Puedes revocar el permiso desde la configuración de tu cuenta de Google en cualquier momento.":
    "If you sign in with Google, we receive your name, email, and profile photo to create your account. We do not receive your Google password or access to your email, contacts, or files. You can revoke this permission in your Google account settings at any time.",
  "La información se guarda en una base de datos PostgreSQL alojada en Neon y la aplicación corre en Vercel. Ambos proveedores actúan solo como infraestructura y están sujetos a sus propias medidas de seguridad. Las conexiones viajan cifradas por HTTPS.":
    "Your information is stored in a PostgreSQL database hosted by Neon, and the app runs on Vercel. Both providers supply infrastructure and apply their own security measures. Connections are encrypted over HTTPS.",
  "Puedes ver, corregir o borrar cualquier movimiento desde":
    "You can view, correct, or delete any transaction from",
  "y eliminar tu cuenta entera desde": "and delete your entire account from",
  "Al eliminar la cuenta se borran todos tus movimientos y categorías personalizadas, sin copia de respaldo.":
    "Deleting your account removes all your transactions and custom categories, with no backup.",
  "Usamos dos cookies técnicas HttpOnly para mantener tu sesión abierta: una de acceso y otra de renovación. No hay cookies de publicidad ni rastreadores de terceros.":
    "We use two technical HttpOnly cookies to keep you signed in: one access cookie and one refresh cookie. We do not use advertising cookies or third-party trackers.",
  "Para ejercer cualquiera de estos derechos o preguntar algo, escribe a":
    "To exercise any of these rights or ask a question, email",
  "No, y es a propósito. Gonances no pide claves de tu banco ni lee tus tarjetas: anotas tú, en unos segundos, y por eso sabes exactamente qué hay dentro.":
    "No, by design. Gonances never asks for your bank password or reads your cards. You enter transactions yourself in seconds, so you always know exactly what is recorded.",
  "Nada mientras dure la beta. Es un proyecto personal abierto, así que puedes usarlo y revisar el código.":
    "Nothing while the beta lasts. It's an open personal project, so you can use it and inspect the code.",
  "Sí. No hay app en las tiendas todavía, pero el sitio está pensado para anotar de pie, con una mano.":
    "Yes. There isn't an app in the stores yet, but the site is designed for quick, one-handed entries on the go.",
  "Sí. Al entrar puedes ver y anotar tu libro en dólares, euros, yenes, libras esterlinas o pesos colombianos. La tasa se actualiza cada hora.":
    "Yes. You can view and record your journal in US dollars, euros, yen, pounds, or Colombian pesos. Exchange rates update hourly.",
  "¿Falta alguna? Escribe a": "Missing a question? Write to",
  "Empieza el libro de este mes hoy, con un solo movimiento anotado.":
    "Start this month's journal today with just one transaction.",
  "Tus datos de cuenta y qué hacer si quieres irte.":
    "Your account details and what to do if you want to leave.",
  "Tu libro está abierto desde el": "Your journal has been open since",
  "Al eliminar la cuenta se borran tu perfil, todos tus movimientos y las categorías que creaste. No se guarda copia, así que no hay vuelta atrás.":
    "Deleting your account removes your profile, all your transactions, and the categories you created. Nothing is backed up, so this can't be undone.",
  "Guardar cambios": "Save changes",
  "Saldo de apertura": "Opening balance",
  "Saldo al cierre": "Closing balance",
  Día: "Day",
  Tipo: "Type",
  "Categorías del sistema": "Built-in categories",
  "Vienen con Gonances y no se pueden borrar":
    "Included with Gonances and cannot be deleted",
  "Mis categorías": "My categories",
  usadas: "used",
  "Llegaste al máximo de cinco": "You've reached the limit of five",
  "Crear categoría": "Create category",
  "Las que vienen con Gonances y las que creas tú. Cada una tiene su tinta y su icono para reconocerla de un vistazo en la tabla y en los gráficos.":
    "The categories included with Gonances and the ones you create. Each has its own color and icon so you can recognize it at a glance in tables and charts.",
  "Otros ingresos": "Other income",
  Suscripciones: "Subscriptions",
  Mascotas: "Pets",
  "Todavía no creaste ninguna.": "You haven't created any yet.",
  "Crea hasta cinco categorías propias para lo que no encaja en las de siempre: la mascota, el gimnasio, ese proyecto aparte.":
    "Create up to five custom categories for things that don't fit the built-in ones: your pet, gym, or a side project.",
  "Editar categoría": "Edit category",
  "Nueva categoría": "New category",
  "Ponle nombre, elige si es para ingresos o gastos y dale una tinta.":
    "Give it a name, choose whether it's for income or expenses, and pick a color.",
  Nombre: "Name",
  Gimnasio: "Gym",
  Color: "Color",
  Tinta: "Color",
  "Elige cualquier color": "Choose any color",
  Icono: "Icon",
  "Guardando…": "Saving…",
  "Eliminando…": "Deleting…",
  "No se pudo eliminar la categoría": "Could not delete category",
  "No se pudo guardar la categoría": "Could not save category",
  "No se pudo conectar con el servidor": "Could not connect to the server",
  "¿Eliminar esta categoría?": "Delete this category?",
  "Buscar por concepto o categoría": "Search by description or category",
  "Buscar movimientos": "Search transactions",
  "Filtrar por tipo": "Filter by type",
  "Filtrar por fecha": "Filter by date",
  "Filtrar por categoría": "Filter by category",
  "Todas las categorías": "All categories",
  Desde: "From",
  Hasta: "To",
  "Agregar movimiento": "Add transaction",
  "Movimientos filtrados, del más reciente al más antiguo":
    "Filtered transactions, newest to oldest",
  "Todo lo que has anotado. Busca, filtra por tipo o por fecha, y corrige lo que haga falta.":
    "Everything you've recorded. Search, filter by type or date, and make any changes you need.",
  " movimientos, saldo de esta página": " transactions, page balance",
  Anterior: "Previous",
  Siguiente: "Next",
  Acciones: "Actions",
  "Cargando movimientos...": "Loading transactions...",
  "No se encontraron movimientos.": "No transactions found.",
  "No hay movimientos para este filtro.": "No transactions match this filter.",
  "Todavía no tienes movimientos.": "You don't have any transactions yet.",
  "Agrega tu primer movimiento": "Add your first transaction",
  "Tasa manual": "Manual rate",
  "Tasa histórica": "Historical rate",
  "¿Eliminar este movimiento?": "Delete this transaction?",
  "Vas a borrar una transacción de tipo": "You're about to delete this",
  "hecha el": "transaction made on",
  "por un valor de": "for",
  ". No se podrá deshacer.": ". This can't be undone.",
  "¿Seguro que quieres eliminar este movimiento?":
    "Are you sure you want to delete this transaction?",
  "Eliminar definitivamente": "Delete permanently",
  "Movimiento eliminado": "Transaction deleted",
  "Nuevo movimiento": "New transaction",
  "Editar movimiento": "Edit transaction",
  "Corrige lo que haga falta y guarda.":
    "Make any changes you need, then save.",
  "Cuatro campos y vuelve a tu libro.":
    "Four fields and you're back to your journal.",
  "Escribe un monto mayor a 0 con un máximo de dos decimales":
    "Enter an amount greater than 0 with up to two decimal places",
  "Se guardarán las tasas históricas de la fecha del movimiento. En días sin publicación se usa la última referencia anterior disponible, conservando su fecha y fuente.":
    "Historical exchange rates for the transaction date will be saved. On days without a published rate, the most recent available rate will be used along with its date and source.",
  "Tasas históricas manuales": "Manual historical rates",
  "No se encontraron todas las tasas. Introduce cuántas unidades de cada moneda equivalían a 1 USD en esa fecha. Se guardarán como fuente manual.":
    "Not all rates could be found. Enter how many units of each currency equaled 1 USD on that date. These will be saved as manual rates.",
  "Reintentar consulta automática": "Retry automatic lookup",
  "Opcional.": "Optional.",
  "Movimiento actualizado": "Transaction updated",
  "Movimiento guardado": "Transaction saved",
  "No se pudo guardar el movimiento": "Could not save transaction",
  "Los últimos seis meses de tu libro, leídos de corrido.":
    "A clear view of the last six months in your journal.",
  "Es tu gasto promedio por día en ": "Your average daily spending in ",
  "Es tu gasto promedio por día en": "Your average daily spending in",
  "Fue el mes cerrado más caro, en ":
    " was your most expensive completed month, in ",
  "Es lo que te quedó después de restar todos los gastos a todos los ingresos.":
    "This is what remained after subtracting all expenses from all income.",
  "Cómo evolucionó tu gasto": "How your spending changed",
  "En qué gastas más": "What you spend the most on",
  "Acumulado de los últimos seis meses": "Total over the last six months",
  " se lleva la mayor parte: ": " accounts for the largest share: ",
  " meses.": " over six months.",
  "Moneda · ": "Currency · ",
  "Moneda ·": "Currency ·",
  "Moneda guardada: ": "Saved currency: ",
  "Moneda guardada:": "Saved currency:",
  "Usar esta moneda": "Use this currency",
  "Actualizando…": "Updating…",
  "Ahora ves tu libro en ": "Your journal is now shown in ",
  "Tasas proporcionadas por": "Rates provided by",
  "Referencia actual de ": "Current reference for ",
  "Los movimientos se convierten con las tasas históricas guardadas para su fecha, no con estas tasas actuales.":
    "Transactions are converted using the historical rates saved for their date, not these current rates.",
  "Elige la moneda de tu cuenta": "Choose your account currency",
  "Elige un periodo": "Choose a period",
  "Este mes": "This month",
  "Mes pasado": "Last month",
  "Últimos 3 meses": "Last 3 months",
  "Últimos 6 meses": "Last 6 months",
  "Todo el tiempo": "All time",
  Personalizado: "Custom range",
  "No se pudieron cargar los movimientos.": "Could not load transactions.",
  "No se pudo actualizar la moneda": "Could not update currency",
  "Nombre completo": "Full name",
  Correo: "Email",
  "Es el correo con el que entras, no se puede cambiar.":
    "This is the email you use to sign in and cannot be changed.",
  Contraseña: "Password",
  "Contraseña actual": "Current password",
  "Contraseña nueva": "New password",
  "Mínimo 8 caracteres, una mayúscula y un número; máximo 72 bytes.":
    "At least 8 characters, one uppercase letter, and one number; maximum 72 bytes.",
  "Cambia la contraseña": "Change password",
  "Cambiar contraseña": "Change password",
  "Actualizando contraseña…": "Updating password…",
  "No se pudo cambiar la contraseña": "Could not change password",
  "Apariencia guardada": "Appearance saved",
  Tema: "Theme",
  Claro: "Light",
  Oscuro: "Dark",
  "Seguir el sistema": "Follow system",
  "La hoja contable de siempre.": "The familiar light ledger.",
  "El mismo libro a la luz de una lámpara.": "The same journal by lamplight.",
  "Cambia solo cuando cambia la configuración de tu equipo.":
    "Changes when your device's appearance setting changes.",
  "Tema de la interfaz": "Interface theme",
  "Lo estás viendo en vista previa. Guarda para conservarlo.":
    "This is a preview. Save to keep it.",
  "Se guarda en este navegador, no en tu cuenta.":
    "Saved in this browser, not to your account.",
  "Eliminar la cuenta": "Delete account",
  "Esto borra tu libro entero": "This deletes your entire journal",
  "Se eliminan tu perfil, tus movimientos y tus categorías.":
    "Your profile, transactions, and categories will be deleted.",
  "Escribe ELIMINAR para confirmar": "Type ELIMINAR to confirm",
  "Escribe la contraseña actual para confirmar":
    "Enter your current password to confirm",
  "Cuenta eliminada": "Account deleted",
  "No se pudo eliminar la cuenta": "Could not delete account",
};

const englishMonthNames: Record<string, string> = {
  enero: "January",
  febrero: "February",
  marzo: "March",
  abril: "April",
  mayo: "May",
  junio: "June",
  julio: "July",
  agosto: "August",
  septiembre: "September",
  octubre: "October",
  noviembre: "November",
  diciembre: "December",
  ene: "Jan",
  feb: "Feb",
  mar: "Mar",
  abr: "Apr",
  may: "May",
  jun: "Jun",
  jul: "Jul",
  ago: "Aug",
  sep: "Sep",
  oct: "Oct",
  nov: "Nov",
  dic: "Dec",
};

function translateText(value: string, language: Language) {
  if (language === "es") return value;
  const trimmed = value.trim();
  if (!trimmed) return value;
  let english = messages[trimmed] ?? trimmed;
  if (english === trimmed) {
    for (const [spanish, translation] of Object.entries(messages).sort(
      ([left], [right]) => right.trim().length - left.trim().length,
    )) {
      const source = spanish.trim();
      if (source.length >= 8 && english.includes(source))
        english = english.replaceAll(source, translation.trim());
    }
  }
  english = english.replace(
    /^(\d+) movimientos anotados en lo que va del mes\.$/i,
    (_match, count: string) =>
      `${count} transaction${count === "1" ? "" : "s"} recorded so far this month.`,
  );
  english = english.replace(
    /\b(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)\b/gi,
    (month) => englishMonthNames[month.toLowerCase()] ?? month,
  );
  english = english.replace(
    /^Tu (?=(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}$)/i,
    "Your ",
  );
  english = english.replace(
    /\b(\d{1,2}) de (January|February|March|April|May|June|July|August|September|October|November|December) de (\d{4})\b/gi,
    "$2 $1, $3",
  );
  return value.replace(trimmed, english);
}

function detectLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "es" || saved === "en") return saved;
    const browserLanguage = (
      navigator.languages?.[0] ?? navigator.language
    ).toLowerCase();
    return browserLanguage.startsWith("es") ? "es" : "en";
  } catch {
    return "en";
  }
}

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (spanish: string) => string;
};
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value)
    throw new Error("useLanguage needs to be inside <LanguageProvider>");
  return value;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");
  const originals = useRef(new WeakMap<Text, string>());
  const originalAttributes = useRef(
    new WeakMap<Element, Map<string, string>>(),
  );
  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* session-only preference */
    }
  }, []);
  const t = useCallback(
    (spanish: string) =>
      language === "es" ? spanish : (messages[spanish] ?? spanish),
    [language],
  );

  useEffect(() => setLanguageState(detectLanguage()), []);
  useEffect(() => {
    document.documentElement.lang = language;
    document
      .querySelector('meta[property="og:locale"]')
      ?.setAttribute("content", language === "es" ? "es_CO" : "en_US");
    const translateTree = (root: Node) => {
      const elements =
        root instanceof Element ? [root, ...root.querySelectorAll("*")] : [];
      for (const element of elements) {
        let saved = originalAttributes.current.get(element);
        if (!saved) {
          saved = new Map();
          originalAttributes.current.set(element, saved);
        }
        for (const attribute of [
          "placeholder",
          "title",
          "aria-label",
          "content",
          "alt",
        ]) {
          const value = element.getAttribute(attribute);
          if (value && !saved.has(attribute)) saved.set(attribute, value);
          const original = saved.get(attribute);
          if (original) {
            const translated = translateText(original, language);
            if (element.getAttribute(attribute) !== translated)
              element.setAttribute(attribute, translated);
          }
        }
      }
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node: Node | null = walker.currentNode;
      while (node) {
        const textNode = node as Text;
        if (!originals.current.has(textNode))
          originals.current.set(textNode, textNode.nodeValue ?? "");
        const original = originals.current.get(textNode) ?? "";
        const translated = translateText(original, language);
        if (textNode.nodeValue !== translated) textNode.nodeValue = translated;
        node = walker.nextNode();
      }
    };
    translateTree(document.body);
    translateTree(document.head);
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) translateTree(node);
        if (record.type === "attributes" && record.target instanceof Element) {
          const target = record.target;
          const saved = originalAttributes.current.get(target);
          const name = record.attributeName;
          const changedValue = name ? target.getAttribute(name) : null;
          if (name && changedValue && !saved?.has(name)) {
            saved?.set(name, changedValue);
            target.setAttribute(
              name,
              language === "en"
                ? (messages[changedValue] ?? changedValue)
                : changedValue,
            );
          }
        }
        if (record.type === "characterData" && record.target instanceof Text) {
          const target = record.target;
          const currentText = target.nodeValue ?? "";
          const previous = originals.current.get(target);
          if (
            !previous ||
            (currentText !== previous &&
              translateText(previous, language) !== currentText)
          )
            originals.current.set(target, currentText);
          const original = originals.current.get(target) ?? "";
          const translated = translateText(original, language);
          if (currentText !== translated) target.nodeValue = translated;
        }
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["placeholder", "title", "aria-label", "content", "alt"],
    });
    observer.observe(document.head, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    return () => observer.disconnect();
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t],
  );
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  return (
    <fieldset className="inline-flex items-center rounded border border-rule bg-band p-0.5">
      <legend className="sr-only">Language / Idioma</legend>
      {(["es", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          aria-pressed={language === code}
          className={`rounded px-2 py-1 text-[11px] font-semibold text-ink-soft transition-colors ${language === code ? "bg-white shadow-sm" : "hover:text-ink"}`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </fieldset>
  );
}
