import type { Metadata } from "next";
import { Bodoni_Moda, IBM_Plex_Sans } from "next/font/google";
import {
  ThemeProvider,
  themeBootstrapScript,
} from "@/components/theme/theme-provider";
import { timeZoneCookieScript } from "@/lib/user-today";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gonances.vercel.app"),
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
    locale: "es_ES",
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
      className={`${bodoni.variable} ${plex.variable} h-full antialiased`}
    >
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: script propio, sin datos del usuario, que debe correr antes del primer pintado */}
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: script propio, sin datos del usuario, que guarda la zona horaria del navegador */}
        <script dangerouslySetInnerHTML={{ __html: timeZoneCookieScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
