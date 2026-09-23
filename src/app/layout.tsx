import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "AXT Casino | Startseite", template: "%s | AXT Casino" },
  description: "Entdecke Spiele, Aktionen, Turniere und mehr im AXT Casino — 3750 EUR + 200 FS Willkommenspaket.",
  applicationName: "AXT Casino",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export const viewport: Viewport = { themeColor: "#1a1937" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "";
  return (
    <html lang="de">
      <head>
        {/* GA4 placeholder: set NEXT_PUBLIC_GA_ID (z. B. G-XXXXXXX) in .env — Skript wird nur mit ID geladen */}
        {gaId ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');` }} />
          </>
        ) : (
          <script dangerouslySetInnerHTML={{ __html: `/* GA4 Platzhalter — NEXT_PUBLIC_GA_ID setzen, z. B. G-XXXXXXX */` }} />
        )}
        <meta name="referrer" content="no-referrer" />
      </head>
      <body className="min-h-dvh antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-accent focus:px-5 focus:py-3 focus:text-background">
          Zum Inhalt springen
        </a>
        {children}
      </body>
    </html>
  );
}
