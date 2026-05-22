import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lumeq.eu"),
  title: {
    default: "Lumeq — Web design voor Nederlandse ondernemers",
    template: "%s · Lumeq",
  },
  description:
    "Boutique web studio uit Nederland. Wij ontwerpen, bouwen en onderhouden moderne websites voor lokale ondernemers. Gratis mockup binnen 48 uur. Vanaf €49 per maand.",
  openGraph: {
    title: "Lumeq — Web design voor Nederlandse ondernemers",
    description:
      "Moderne, geautomatiseerde websites voor lokale ondernemers. Gratis mockup, geen contract.",
    url: "https://lumeq.eu",
    siteName: "Lumeq",
    locale: "nl_NL",
    alternateLocale: ["en_GB"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumeq — Web design voor Nederlandse ondernemers",
    description:
      "Moderne websites voor lokale ondernemers. Gratis mockup binnen 48 uur.",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-canvas text-ink antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
