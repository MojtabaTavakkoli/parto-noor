"use client";

import { useLocale } from "@/lib/locale";

export function Foot() {
  const { t } = useLocale();

  return (
    <footer className="site-foot">
      <nav aria-label={t.footer.note}>
        {t.footer.links.map((link) => (
          <a key={link.id} href={link.id === "blog" ? "/blog" : `/#${link.id}`}>
            {link.label}
          </a>
        ))}
      </nav>
      <ul className="marks">
        {t.footer.marks.map((mark) => (
          <li key={mark}>{mark}</li>
        ))}
      </ul>
      <span>{t.footer.note}</span>
    </footer>
  );
}
