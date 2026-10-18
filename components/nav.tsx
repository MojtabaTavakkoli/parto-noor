"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "@/lib/locale";
import { scrollToId } from "@/lib/scroll";
import { useSoon } from "@/lib/soon";
import type { Locale } from "@/lib/types";

const sections = ["product", "models", "pricing", "blog"] as const;

export function Nav() {
  const { locale, setLocale, t } = useLocale();
  const openSoon = useSoon();
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive] = useState<string>("");
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const nodes = sections
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.6] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  const go = (id: string) => {
    setMenu(false);
    if (id === "blog") {
      router.push("/blog");
      return;
    }
    if (pathname === "/" && document.getElementById(id)) {
      scrollToId(id);
      return;
    }
    router.push(`/#${id}`);
  };

  const links = [
    { id: "product", label: t.nav.product },
    { id: "models", label: t.nav.models },
    { id: "pricing", label: t.nav.pricing },
    { id: "blog", label: t.nav.blog },
  ];

  return (
    <>
    <header className="nav">
      <div className="brand">
      <LanguageSwitch locale={locale} setLocale={setLocale} />
      <a
        className="mark"
        href="/"
        aria-label={t.nav.home}
        onClick={(event) => {
          event.preventDefault();
          setMenu(false);
          if (pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            history.replaceState(null, "", "/");
            return;
          }
          router.push("/");
        }}
      >
        <span className="sigil" aria-hidden="true">
          <i className="sigil-halo" />
          <span className="sigil-dance emerald">
            <i className="sigil-orb emerald" />
          </span>
          <span className="sigil-dance saffron">
            <i className="sigil-orb saffron" />
          </span>
          <span className="sigil-dance pearl">
            <i className="sigil-orb pearl" />
          </span>
        </span>
        {t.footer.note}
      </a>
      </div>
      <nav className="links" aria-label={t.nav.sections}>
        {links.map((link) => (
          <a
            key={link.id}
            href={link.id === "blog" ? "/blog" : `/#${link.id}`}
            aria-current={
              link.id === "blog"
                ? pathname.startsWith("/blog") || active === "blog"
                  ? "true"
                  : undefined
                : pathname === "/" && active === link.id
                  ? "true"
                  : undefined
            }
            onClick={(event) => {
              event.preventDefault();
              go(link.id);
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="nav-end">
        <button className="pill" type="button" onClick={openSoon}>
          {t.nav.start}
        </button>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menu}
          aria-controls="site-menu"
          aria-label={menu ? t.nav.closeMenu : t.nav.menu}
          onClick={() => setMenu((open) => !open)}
        >
          {t.nav.menu}
        </button>
      </div>
    </header>
    {menu ? (
      <div className="sheet" id="site-menu">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.id === "blog" ? "/blog" : `/#${link.id}`}
            onClick={(event) => {
              event.preventDefault();
              go(link.id);
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    ) : null}
    </>
  );
}

function LanguageSwitch({
  locale,
  setLocale,
}: {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const other: Locale = locale === "fa" ? "en" : "fa";

  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  return (
    <div className={`lang${open ? " open" : ""}`} ref={rootRef} role="group" aria-label="Language">
      <button
        className="lang-current"
        type="button"
        aria-expanded={open}
        onClick={() => {
          const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
          if (!fine) setOpen((value) => !value);
        }}
      >
        {locale === "fa" ? "FA" : "EN"}
      </button>
      <span className="lang-more">
        <button
          type="button"
          onClick={() => {
            setLocale(other);
            setOpen(false);
            if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
          }}
        >
          {other === "fa" ? "FA" : "EN"}
        </button>
      </span>
    </div>
  );
}
