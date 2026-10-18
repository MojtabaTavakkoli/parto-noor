"use client";

import { useRef } from "react";
import { models, plans } from "@/lib/catalog";
import { formatCount } from "@/lib/format";
import { useLocale } from "@/lib/locale";
import { scrollToId } from "@/lib/scroll";

export function Hero() {
  const { locale, t } = useLocale();
  const glass = useRef<HTMLDivElement>(null);

  const onPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    glass.current?.style.setProperty("--px", `${x}%`);
    glass.current?.style.setProperty("--py", `${y}%`);
  };

  return (
    <section className="stage" aria-label={t.hero.title}>
      <div className="glass" ref={glass} onPointerMove={onPointer}>
          <div className="pools" aria-hidden="true">
            <span className="orb a"><span className="bubble emerald" /></span>
            <span className="orb b"><span className="bubble saffron" /></span>
            <span className="orb c"><span className="bubble pearl" /></span>
            <span className="orb d"><span className="bubble emerald small" /></span>
            <span className="orb e"><span className="bubble saffron small" /></span>
          </div>
          <div className="pointer" aria-hidden="true" />
          <div className="sheen" aria-hidden="true" />
          <div className="copy">
            <p className="eyebrow">{t.hero.kicker}</p>
            <h1 className="word">
              <span>{t.hero.title}</span>
            </h1>
            <div className="horizon" aria-hidden="true" />
            <div className="swap">
              <div className="whisper">
                <p>{t.hero.whisper}</p>
                <p className="support">{t.hero.support}</p>
              </div>
              <p className="sentence">{t.hero.sentence}</p>
            </div>
          </div>
          <ul className="ledger">
            <li>
              <strong>{formatCount(models.length, locale)}</strong>
              <span>{t.hero.models}</span>
            </li>
            <li>
              <strong>{formatCount(plans.length, locale)}</strong>
              <span>{t.hero.plans}</span>
            </li>
            <li>
              <strong>{formatCount(2, locale)}</strong>
              <span>{t.hero.languages}</span>
            </li>
          </ul>
          <button className="scroll-cue" type="button" aria-label={t.hero.scroll} onClick={() => scrollToId("product")}>
            <i aria-hidden="true" />
          </button>
      </div>
    </section>
  );
}
