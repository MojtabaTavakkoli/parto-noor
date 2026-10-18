"use client";

import { useMemo, useState } from "react";
import { models, providerOrder, tierOrder } from "@/lib/catalog";
import { fill } from "@/lib/copy";
import { formatContext, formatCount } from "@/lib/format";
import { useLocale } from "@/lib/locale";
import type { ProviderId, Tier } from "@/lib/types";

export function Models() {
  const { locale, t } = useLocale();
  const [provider, setProvider] = useState<ProviderId | "all">("all");
  const [tier, setTier] = useState<Tier | "all">("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(models[0].id);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return models.filter((model) => {
      if (provider !== "all" && model.provider !== provider) return false;
      if (tier !== "all" && model.tier !== tier) return false;
      if (!needle) return true;
      const haystack = `${model.name} ${t.models.providers[model.provider]} ${model.provider}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [provider, query, t.models.providers, tier]);

  const current = visible.find((model) => model.id === selected) ?? visible[0];

  return (
    <section className="band models" id="models">
      <header className="section-head">
        <p className="kicker">{t.models.kicker}</p>
        <h2>{t.models.title}</h2>
        <p className="lede">{t.models.lede}</p>
      </header>

      <div className="filters">
        <div className="filter-line">
          <span>{t.models.provider}</span>
          <div className="chips" role="group" aria-label={t.models.provider}>
            <button type="button" aria-pressed={provider === "all"} onClick={() => setProvider("all")}>
              {t.models.all}
            </button>
            {providerOrder.map((id) => (
              <button key={id} type="button" aria-pressed={provider === id} onClick={() => setProvider(id)}>
                {t.models.providers[id]}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-line">
          <span>{t.models.tier}</span>
          <div className="chips" role="group" aria-label={t.models.tier}>
            <button type="button" aria-pressed={tier === "all"} onClick={() => setTier("all")}>
              {t.models.all}
            </button>
            {tierOrder.map((id) => (
              <button key={id} type="button" aria-pressed={tier === id} onClick={() => setTier(id)}>
                {t.models.tiers[id]}
              </button>
            ))}
          </div>
        </div>
        <label className="search">
          <span className="sr">{t.models.search}</span>
          <input
            value={query}
            placeholder={t.models.search}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query ? (
            <button type="button" onClick={() => setQuery("")} aria-label={t.models.clear}>
              ×
            </button>
          ) : null}
        </label>
      </div>

      <p className="count">
        {formatCount(visible.length, locale)} / {formatCount(models.length, locale)} {t.models.showing}
      </p>

      {visible.length === 0 ? (
        <p className="empty">{t.models.empty}</p>
      ) : (
        <ul className="model-grid">
          {visible.map((model) => {
            const on = model.id === current?.id;
            return (
              <li key={model.id}>
                <button
                  type="button"
                  className={`model ${model.tier}`}
                  aria-pressed={on}
                  onClick={() => setSelected(model.id)}
                >
                  <span className="label">{t.models.providers[model.provider]}</span>
                  <strong>{model.name}</strong>
                  <span className="meta">
                    <em>{t.models.tiers[model.tier]}</em>
                    <em>
                      {t.models.context} {formatContext(model.context, locale)}
                    </em>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {current ? (
        <p className="blurb">
          {fill(t.models.blurb, {
            name: current.name,
            tier: t.models.tiers[current.tier],
            provider: t.models.providers[current.provider],
            context: formatContext(current.context, locale),
          })}
        </p>
      ) : null}
    </section>
  );
}
