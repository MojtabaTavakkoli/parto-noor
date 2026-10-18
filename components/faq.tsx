"use client";

import { useState } from "react";
import { useLocale } from "@/lib/locale";

export function Faq() {
  const { t } = useLocale();
  const [open, setOpen] = useState(0);

  return (
    <section className="band faq" id="questions">
      <header className="section-head">
        <p className="kicker">{t.faq.kicker}</p>
        <h2>{t.faq.title}</h2>
      </header>
      <div className="questions">
        {t.faq.items.map((item, index) => {
          const expanded = open === index;
          const panelId = `faq-${index}`;
          return (
            <div className={`question${expanded ? " on" : ""}`} key={item.q}>
              <h3>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setOpen(expanded ? -1 : index)}
                >
                  <span>{item.q}</span>
                  <i aria-hidden="true" />
                </button>
              </h3>
              <div id={panelId} role="region" aria-hidden={!expanded}>
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
