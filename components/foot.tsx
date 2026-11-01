"use client";

import { useLocale } from "@/lib/locale";

export function Foot() {
  const { locale, t } = useLocale();

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
        <li className="seal">
          <a
            referrerPolicy="origin"
            target="_blank"
            href="https://trustseal.enamad.ir/?id=8288076&Code=9XuSaWpcMeBIZxtGwaq8jqkZJPr1r2Sj"
            aria-label={locale === "fa" ? "نماد اعتماد الکترونیکی" : "E-namad"}
          >
            <img
              referrerPolicy="origin"
              src="https://trustseal.enamad.ir/logo.aspx?id=8288076&Code=9XuSaWpcMeBIZxtGwaq8jqkZJPr1r2Sj"
              alt=""
              style={{ cursor: "pointer" }}
              {...{ code: "9XuSaWpcMeBIZxtGwaq8jqkZJPr1r2Sj" }}
            />
          </a>
        </li>
      </ul>
      <span>{t.footer.note}</span>
    </footer>
  );
}
