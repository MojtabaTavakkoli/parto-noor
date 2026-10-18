"use client";

import { useSyncExternalStore } from "react";

const storageKey = "parto-read-news";
const changeEvent = "parto-read-news";
const empty: string[] = [];
let snapshot = empty;

function readSlugs(): string[] {
  try {
    const raw = localStorage.getItem(storageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    const next = Array.isArray(parsed) ? parsed.filter((slug) => typeof slug === "string") : empty;
    if (next.length === snapshot.length && next.every((slug, index) => slug === snapshot[index])) return snapshot;
    snapshot = next;
    return snapshot;
  } catch {
    return snapshot;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(changeEvent, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(changeEvent, onChange);
  };
}

export function useReadNews(): string[] {
  return useSyncExternalStore(subscribe, readSlugs, () => empty);
}

export function markNewsRead(slug: string) {
  const next = Array.from(new Set([...readSlugs(), slug]));
  localStorage.setItem(storageKey, JSON.stringify(next));
  window.dispatchEvent(new Event(changeEvent));
}
