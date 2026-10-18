"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { copy, type Copy } from "./copy";
import type { Locale } from "./types";

const LocaleContext = createContext<{
  locale: Locale;
  t: Copy;
  setLocale: (locale: Locale) => void;
} | null>(null);

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const t = copy[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
    document.title = t.meta.title;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", t.meta.description);
    document.cookie = `parto-locale=${locale};path=/;max-age=31536000;SameSite=Lax`;
  }, [locale, t.meta.description, t.meta.title]);

  const value = useMemo(() => ({ locale, t, setLocale }), [locale, t]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used within LocaleProvider");
  return value;
}
