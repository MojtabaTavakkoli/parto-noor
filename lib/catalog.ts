import type { PlanId, ProviderId, Tier } from "./types";

/** Public catalog. Numbers follow parto-shared `model_ids.py` and `plan_ids.py`. */

export type ModelEntry = {
  id: string;
  provider: ProviderId;
  name: string;
  context: number;
  tier: Tier;
};

export const models: readonly ModelEntry[] = [
  { id: "gpt-4o", provider: "openai", name: "GPT-4o", context: 128000, tier: "premium" },
  { id: "gpt-4o-mini", provider: "openai", name: "GPT-4o Mini", context: 128000, tier: "free" },
  { id: "claude-3.5-sonnet", provider: "anthropic", name: "Claude 3.5 Sonnet", context: 200000, tier: "premium" },
  { id: "claude-3-haiku", provider: "anthropic", name: "Claude 3 Haiku", context: 200000, tier: "standard" },
  { id: "gemini-2.0-flash", provider: "google", name: "Gemini 2.0 Flash", context: 1000000, tier: "free" },
  { id: "deepseek-chat", provider: "deepseek", name: "DeepSeek V3", context: 128000, tier: "standard" },
  { id: "glm-4-flash", provider: "glm", name: "GLM-4 Flash", context: 128000, tier: "free" },
];

export type PlanEntry = {
  id: PlanId;
  priceUsdMonthly: number;
  priceTomanMonthly: number;
  creditsMonthly: number;
  annualDiscountPercent: number;
  tiers: readonly Tier[];
  featured?: boolean;
};

export const plans: readonly PlanEntry[] = [
  {
    id: "free",
    priceUsdMonthly: 0,
    priceTomanMonthly: 0,
    creditsMonthly: 50,
    annualDiscountPercent: 0,
    tiers: ["free"],
  },
  {
    id: "student",
    priceUsdMonthly: 3,
    priceTomanMonthly: 540_000,
    creditsMonthly: 2000,
    annualDiscountPercent: 20,
    tiers: ["free", "standard"],
  },
  {
    id: "plus",
    priceUsdMonthly: 10,
    priceTomanMonthly: 1_800_000,
    creditsMonthly: 5000,
    annualDiscountPercent: 20,
    tiers: ["free", "standard", "premium"],
    featured: true,
  },
  {
    id: "pro",
    priceUsdMonthly: 25,
    priceTomanMonthly: 4_500_000,
    creditsMonthly: 15000,
    annualDiscountPercent: 25,
    tiers: ["free", "standard", "premium", "ultra"],
  },
  {
    id: "expert",
    priceUsdMonthly: 50,
    priceTomanMonthly: 9_000_000,
    creditsMonthly: 50000,
    annualDiscountPercent: 30,
    tiers: ["free", "standard", "premium", "ultra"],
  },
];

export const tierOrder: readonly Tier[] = ["free", "standard", "premium", "ultra"];

export const providerOrder: readonly ProviderId[] = [
  "openai",
  "anthropic",
  "google",
  "deepseek",
  "glm",
];
