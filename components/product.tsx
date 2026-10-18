"use client";

import { useState } from "react";
import { useLocale } from "@/lib/locale";
import type { PassageId } from "@/lib/types";

const chatModels = [
  { id: "gpt-4o", name: "GPT-4o" },
  { id: "claude-3.5-sonnet", name: "Claude 3.5" },
  { id: "gemini-2.0-flash", name: "Gemini Flash" },
] as const;

export function Product() {
  const { t } = useLocale();
  const [passage, setPassage] = useState<PassageId>("chat");
  const current = t.product.items.find((item) => item.id === passage) ?? t.product.items[0];

  const onKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const order = t.product.items.map((item) => item.id);
    const index = order.indexOf(passage);
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const next = event.key === "ArrowDown" ? (index + 1) % order.length : (index - 1 + order.length) % order.length;
    setPassage(order[next]);
    document.getElementById(`tab-${order[next]}`)?.focus();
  };

  return (
    <section className="band product" id="product">
      <header className="section-head">
        <p className="kicker">{t.product.kicker}</p>
        <h2>{t.product.title}</h2>
        <p className="lede">{t.product.lede}</p>
      </header>
      <div className="product-layout">
        <div className="passage-list" role="tablist" aria-orientation="vertical" aria-label={t.product.kicker} onKeyDown={onKey}>
          {t.product.items.map((item) => {
            const selected = item.id === passage;
            return (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                className={`passage ${item.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${item.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setPassage(item.id)}
              >
                <span className="label">{item.label}</span>
                <strong>{item.title}</strong>
                <span>{item.body}</span>
              </button>
            );
          })}
        </div>
        <div className="stage-card" role="tabpanel" id={`panel-${passage}`} aria-labelledby={`tab-${passage}`}>
          <p className="stage-note">{current.note}</p>
          {passage === "chat" ? <ChatDemo /> : null}
          {passage === "docs" ? <DocsDemo /> : null}
          {passage === "media" ? <MediaDemo /> : null}
        </div>
      </div>
    </section>
  );
}

function ChatDemo() {
  const { t } = useLocale();
  const [model, setModel] = useState<(typeof chatModels)[number]["id"]>("gpt-4o");
  const reply = t.product.chat.replies[model];

  return (
    <div className="demo chat-demo">
      <div className="demo-bar">
        <span>{t.product.chat.modelsLabel}</span>
        <div className="chips" role="group" aria-label={t.product.chat.modelsLabel}>
          {chatModels.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={model === item.id}
              onClick={() => setModel(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <div className="thread-demo">
        <p className="user-line">{t.product.chat.user}</p>
        <p className="assistant-line" key={model}>
          <span className="who">{chatModels.find((item) => item.id === model)?.name}</span>
          {reply}
        </p>
      </div>
    </div>
  );
}

function DocsDemo() {
  const { t } = useLocale();
  const [fileId, setFileId] = useState(t.product.docs.files[0].id);
  const file = t.product.docs.files.find((item) => item.id === fileId) ?? t.product.docs.files[0];

  return (
    <div className="demo docs-demo">
      <ul>
        {t.product.docs.files.map((item) => (
          <li key={item.id}>
            <button type="button" aria-pressed={item.id === file.id} onClick={() => setFileId(item.id)}>
              {item.name}
            </button>
          </li>
        ))}
      </ul>
      <div className="doc-read">
        <p className="ask">{t.product.docs.question}</p>
        <p>{file.answer}</p>
        <blockquote key={file.id}>
          <p>{file.excerpt}</p>
          <footer>
            {t.product.docs.from} {file.name}
          </footer>
        </blockquote>
      </div>
    </div>
  );
}

function MediaDemo() {
  const { t } = useLocale();
  const [kind, setKind] = useState<"image" | "video">("image");
  const [prompt, setPrompt] = useState(t.product.media.prompts[0].id);
  const current = t.product.media.prompts.find((item) => item.id === prompt) ?? t.product.media.prompts[0];

  return (
    <div className="demo media-demo">
      <div className="demo-bar">
        <div className="chips" role="group" aria-label={t.product.items[2].label}>
          <button type="button" aria-pressed={kind === "image"} onClick={() => setKind("image")}>
            {t.product.media.image}
          </button>
          <button type="button" aria-pressed={kind === "video"} onClick={() => setKind("video")}>
            {t.product.media.video}
          </button>
        </div>
        <span className="apart">{t.product.media.apart}</span>
      </div>
      <div className="prompt-row">
        {t.product.media.prompts.map((item) => (
          <button key={item.id} type="button" aria-pressed={item.id === prompt} onClick={() => setPrompt(item.id)}>
            {item.label}
          </button>
        ))}
      </div>
      <figure className={`frame ${kind} ${prompt}`} key={`${kind}-${prompt}`}>
        <span className="frame-light" aria-hidden="true" />
        {kind === "video" ? <span className="play" aria-hidden="true" /> : null}
        <figcaption>{current.label}</figcaption>
      </figure>
    </div>
  );
}
