"use client";

import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import { useLocale } from "./locale";

const SoonContext = createContext<(() => void) | null>(null);

export function SoonProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openSoon = useCallback(() => setOpen(true), []);

  return (
    <SoonContext.Provider value={openSoon}>
      {children}
      {open ? <SoonDialog onClose={() => setOpen(false)} /> : null}
    </SoonContext.Provider>
  );
}

export function useSoon() {
  const open = useContext(SoonContext);
  if (!open) throw new Error("useSoon must be used within SoonProvider");
  return open;
}

function SoonDialog({ onClose }: { onClose: () => void }) {
  const { t } = useLocale();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [onClose]);

  return (
    <div className="soon" role="presentation" onMouseDown={onClose}>
      <div
        className="soon-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <span className="soon-light" aria-hidden="true" />
        <h2 id={titleId}>{t.soon.title}</h2>
        <p>{t.soon.body}</p>
        <button ref={closeRef} className="pill" type="button" onClick={onClose}>
          {t.soon.close}
        </button>
      </div>
    </div>
  );
}
