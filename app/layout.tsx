import type { Metadata, Viewport } from "next";
import { Lalezar, Rubik, Syne } from "next/font/google";
import { LocaleProvider } from "@/lib/locale";
import { SoonProvider } from "@/lib/soon";
import { copy } from "@/lib/copy";
import { getLocale } from "@/lib/get-locale";
import "./globals.css";

const text = Rubik({
  subsets: ["arabic", "latin"],
  variable: "--font-text",
  display: "swap",
});

const displayFa = Lalezar({
  subsets: ["arabic", "latin"],
  weight: "400",
  variable: "--font-display-fa",
  display: "swap",
});

const displayEn = Syne({
  subsets: ["latin"],
  variable: "--font-display-en",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1a2744",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: copy[locale].meta.title,
    description: copy[locale].meta.description,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={locale === "fa" ? "rtl" : "ltr"} className={`${text.variable} ${displayFa.variable} ${displayEn.variable}`}>
      <body>
        <LocaleProvider initialLocale={locale}>
          <SoonProvider>{children}</SoonProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
