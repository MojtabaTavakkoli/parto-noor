"use client";

import { useEffect, useRef } from "react";

const passages = [
  {
    label: "گفتگو",
    title: "حرف بزن",
    body: "مدل عوض می‌شود. رشتهٔ حرف نمی‌شکند.",
    tone: "emerald",
  },
  {
    label: "اسناد",
    title: "سند خودت",
    body: "متن را بگذار. جواب از همان نور بیاید.",
    tone: "saffron",
  },
  {
    label: "رسانه",
    title: "تصویر و ویدیو",
    body: "جدا از اعتبار گفتگو. آرام، و قابل دیدن.",
    tone: "paper",
  },
];

export function Noor() {
  const stage = useRef<HTMLElement>(null);
  const glass = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = stage.current;
    if (!node) return;

    const onScroll = () => {
      const total = node.offsetHeight - window.innerHeight;
      const passed = Math.min(Math.max(-node.getBoundingClientRect().top, 0), total);
      node.style.setProperty("--p", total > 0 ? String(passed / total) : "0");
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const onPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    glass.current?.style.setProperty("--px", `${x}%`);
    glass.current?.style.setProperty("--py", `${y}%`);
  };

  return (
    <>
      <div className="grain" />
      <div className="vignette" />
      <header className="nav">
        <a className="mark" href="#start">پرتو</a>
        <nav className="links" aria-label="بخش‌ها">
          <a href="#passages">محصول</a>
          <a href="#passages">مدل‌ها</a>
          <a href="#start">قیمت</a>
        </nav>
        <a className="pill" href="#start">شروع</a>
      </header>

      <main>
        <section className="stage" ref={stage}>
          <div className="sticky">
            <div
              className="glass"
              ref={glass}
              onPointerMove={onPointer}
            >
              <div className="pools" aria-hidden="true">
                <span className="bubble emerald" />
                <span className="bubble saffron" />
                <span className="bubble pearl" />
                <span className="bubble emerald small" />
                <span className="bubble saffron small" />
              </div>
              <div className="pointer" aria-hidden="true" />
              <div className="sheen" aria-hidden="true" />
              <div className="copy">
                <h1 className="word"><span>پرتو</span></h1>
                <div className="horizon" aria-hidden="true" />
                <div className="swap">
                  <div className="whisper">
                    <p>نور، روی کلمات تو</p>
                    <p className="support">یک گفتگو. چند مدل. فارسی، از اول.</p>
                  </div>
                  <p className="sentence">پرتو چند مدل را در یک جواب جمع می‌کند.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="passages" id="passages">
          <p className="kicker">نور از سه جا رد می‌شود</p>
          <div className="grid">
            {passages.map((item) => (
              <article className="card" key={item.title}>
                <span className={`bubble card-bubble ${item.tone}`} aria-hidden="true" />
                <div className={`bar ${item.tone}`} />
                <div className="label">{item.label}</div>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="close" id="start">
          <div className="rest" aria-hidden="true" />
          <h2>نور همین‌جا می‌ماند.</h2>
          <a className="pill" href="#start">شروع گفتگو</a>
        </section>
      </main>
    </>
  );
}
