import type { Currency, Locale } from "./types";

const faDigits = "۰۱۲۳۴۵۶۷۸۹";

export function localizeDigits(value: string, locale: Locale): string {
  if (locale !== "fa") return value;
  return value.replace(/\d/g, (digit) => faDigits[Number(digit)] ?? digit);
}

export function formatContext(tokens: number, locale: Locale): string {
  const label = tokens >= 1_000_000 ? "1M" : `${Math.round(tokens / 1000)}K`;
  return localizeDigits(label, locale);
}

export function formatCount(value: number, locale: Locale): string {
  const formatted = new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(value);
  return formatted;
}

export function yearlyMonthly(monthly: number, discountPercent: number): number {
  const value = monthly * (1 - discountPercent / 100);
  return Math.round(value * 100) / 100;
}

export function moneyParts(amount: number, currency: Currency, locale: Locale): { amount: string; unit: string } {
  const digits = Number.isInteger(amount) ? 0 : 2;
  const formatted = new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(amount);

  if (currency === "usd" && locale === "en") return { amount: `$${formatted}`, unit: "" };
  if (currency === "usd") return { amount: formatted, unit: "دلار" };
  return { amount: formatted, unit: locale === "fa" ? "تومان" : "toman" };
}

export function formatMoney(amount: number, currency: Currency, locale: Locale): string {
  const parts = moneyParts(amount, currency, locale);
  return parts.unit ? `${parts.amount} ${parts.unit}` : parts.amount;
}
