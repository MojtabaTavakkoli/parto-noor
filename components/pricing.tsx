"use client";

import { useState } from "react";
import { models, plans } from "@/lib/catalog";
import type { PlanEntry } from "@/lib/catalog";
import { moneyParts, yearlyMonthly } from "@/lib/format";
import { useLocale } from "@/lib/locale";
import { useSoon } from "@/lib/soon";
import type { BillingPeriod, PlanId } from "@/lib/types";

export function Pricing() {
  const { t } = useLocale();
  const openSoon = useSoon();
  const [period, setPeriod] = useState<BillingPeriod>("monthly");
  const [selected, setSelected] = useState<PlanId>("plus");

  const plan = plans.find((item) => item.id === selected) ?? plans[2];

  return (
    <section className="band pricing" id="pricing">
      <header className="section-head">
        <p className="kicker">{t.pricing.kicker}</p>
        <h2>{t.pricing.title}</h2>
        <p className="lede">{t.pricing.lede}</p>
      </header>

      <div className="price-controls">
        <div className="chips" role="group" aria-label={t.pricing.kicker}>
          <button type="button" aria-pressed={period === "monthly"} onClick={() => setPeriod("monthly")}>
            {t.pricing.monthly}
          </button>
          <button type="button" aria-pressed={period === "yearly"} onClick={() => setPeriod("yearly")}>
            {t.pricing.yearly}
          </button>
        </div>
      </div>

      <ul className="plan-grid">
        {plans.map((item) => (
          <li key={item.id}>
            <PlanCard
              plan={item}
              period={period}
              selected={item.id === selected}
              onSelect={() => setSelected(item.id)}
              onStart={openSoon}
            />
          </li>
        ))}
      </ul>

      <aside className="plan-open" aria-live="polite">
        <div>
          <p className="kicker">{t.pricing.opens}</p>
          <h3>{t.pricing.names[plan.id]}</h3>
          <p>{t.pricing.media}</p>
          {plan.id === "student" ? <p className="verify">{t.pricing.verify}</p> : null}
        </div>
        <ul>
          {models
            .filter((model) => plan.tiers.includes(model.tier))
            .map((model) => (
              <li key={model.id}>
                <strong>{model.name}</strong>
                <span>{t.models.providers[model.provider]}</span>
              </li>
            ))}
        </ul>
      </aside>
    </section>
  );
}

function PlanCard({
  plan,
  period,
  selected,
  onSelect,
  onStart,
}: {
  plan: PlanEntry;
  period: BillingPeriod;
  selected: boolean;
  onSelect: () => void;
  onStart: () => void;
}) {
  const { locale, t } = useLocale();
  const shown = period === "yearly" ? yearlyMonthly(plan.priceTomanMonthly, plan.annualDiscountPercent) : plan.priceTomanMonthly;
  const price = moneyParts(shown, "toman", locale);
  const was = period === "yearly" && plan.annualDiscountPercent > 0 ? moneyParts(plan.priceTomanMonthly, "toman", locale).amount : "";

  return (
    <article
      className={`plan ${plan.id}${selected ? " on" : ""}${plan.featured ? " featured" : ""}`}
      onClick={onSelect}
    >
      <button className="plan-hit" type="button" onClick={onSelect} aria-pressed={selected}>
        <span className="label">
          {t.pricing.names[plan.id]}
          {plan.featured ? <em>{t.pricing.featured}</em> : null}
        </span>
        <strong className="price">
          <span className="figures">
            <span>{price.amount}</span>
            {was ? <s>{was}</s> : null}
          </span>
          <small>{t.pricing.currencyToman}</small>
        </strong>
      </button>
      <ul>
        {t.pricing.features[plan.id].map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <button className="pill ghost" type="button" onClick={onStart}>
        {t.pricing.start}
      </button>
    </article>
  );
}
