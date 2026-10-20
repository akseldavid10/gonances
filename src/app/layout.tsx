import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "@fontsource-variable/bodoni-moda";
import "@fontsource-variable/bodoni-moda/wght-italic.css";
import "@fontsource-variable/ibm-plex-sans";
import { LanguageProvider } from "@/components/provider/language-provider";
import {
  ThemeProvider,
  themeBootstrapScript,
} from "@/components/theme/theme-provider";
import { timeZoneCookieScript } from "@/lib/user-today";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Gonances · Tu libro de cuentas personal",
    template: "%s · Gonances",
  },
  description:
    "Anota lo que entra y lo que sale, y mira a dónde se va tu dinero cada mes.",
  authors: [{ name: "Gonances", url: "/" }],
  keywords: [
    "finanzas personales",
    "ingresos y gastos",
    "libro de cuentas",
    "presupuesto personal",
    "control de gastos",
    "Gonances",
    "finanzas",
    "gastos",
    "dinero",
    "manejo de dinero",
  ],
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Gonances",
    title: "Gonances · Tu libro de cuentas personal",
    description:
      "Anota lo que entra y lo que sale, y mira a dónde se va tu dinero cada mes.",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gonances - libro de cuentas personal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@gonances",
    creator: "@gonances",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  other: {
    "theme-color": "#ffffff",
    "color-scheme": "light dark",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      // El script de arranque cambia este atributo antes de que React hidrate.
      data-theme="light"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: script propio, sin datos del usuario, que debe correr antes del primer pintado */}
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: script propio, sin datos del usuario, que guarda la zona horaria del navegador */}
        <script dangerouslySetInnerHTML={{ __html: timeZoneCookieScript }} />
        <meta
          name="google-site-verification"
          content="f8hfedjZGhqoVpKQO6fnzHHBcMqRDR82e0oziK9I84A"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        />
        <Analytics />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
