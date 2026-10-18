"use client";

import { useEffect } from "react";
import { Foot } from "./foot";
import { Nav } from "./nav";
import { Stars } from "./stars";

export function Frame({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    const onScroll = () => {
      const total = root.scrollHeight - window.innerHeight;
      const progress = total > 0 ? window.scrollY / total : 0;
      root.style.setProperty("--scroll", `${(progress * 100).toFixed(2)}%`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const hash = window.location.hash.slice(1);
    if (hash) document.getElementById(hash)?.scrollIntoView();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <Stars />
      <div className="grain" />
      <div className="vignette" />
      <div className="thread" aria-hidden="true">
        <span />
      </div>
      <Nav />
      {children}
      <Foot />
    </>
  );
}
