"use client";

import { useRef, useState } from "react";
import { useLocale } from "@/lib/locale";
import { useSoon } from "@/lib/soon";

export function Finale() {
  const { t } = useLocale();
  const openSoon = useSoon();
  const nextBurst = useRef(0);
  const [bursts, setBursts] = useState<{ id: number; soft: boolean }[]>([]);

  function pulse() {
    const count = Math.random() < 0.5 ? 1 : 2;
    const added = Array.from({ length: count }, (_, index) => ({
      id: nextBurst.current++,
      soft: count === 2 ? index === 1 : Math.random() < 0.5,
    }));
    setBursts((list) => [...list, ...added]);
  }

  return (
    <section className="finale" id="finale">
      <button className="lamp" type="button" aria-label={t.finale.title} onClick={pulse}>
        <span className="lamp-wash" aria-hidden="true" />
        <span className="lamp-rays" aria-hidden="true">
          <span className="beam a"><i /><i /></span>
          <span className="beam b"><i /><i /></span>
          <span className="beam c"><i /><i /></span>
        </span>
        <span className="lamp-halo" aria-hidden="true" />
        <span className="lamp-spike" aria-hidden="true" />
        <span className="lamp-core" aria-hidden="true" />
        <span className="arm a" aria-hidden="true"><span className="gyro"><span className="hoop" /></span><span className="moon"><i className="gem" /></span></span>
        <span className="arm b" aria-hidden="true"><span className="gyro"><span className="hoop" /></span><span className="moon"><i className="planet" /></span></span>
        <span className="arm c" aria-hidden="true"><span className="gyro"><span className="hoop" /></span><span className="moon"><i className="gem pearl" /></span></span>
        {bursts.map((burst) => (
          <span
            key={burst.id}
            className={burst.soft ? "lamp-burst soft" : "lamp-burst"}
            aria-hidden="true"
            onAnimationEnd={() => setBursts((list) => list.filter((item) => item.id !== burst.id))}
          />
        ))}
      </button>
      <h2>{t.finale.title}</h2>
      <p>{t.finale.line}</p>
      <button className="pill" type="button" onClick={openSoon}>
        {t.finale.start}
      </button>
    </section>
  );
}
