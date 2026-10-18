import { cookies } from "next/headers";
import type { Locale } from "./types";

export async function getLocale(): Promise<Locale> {
  const jar = await cookies();
  return jar.get("parto-locale")?.value === "en" ? "en" : "fa";
}
