"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Frame } from "@/components/frame";
import { useLocale } from "@/lib/locale";
import { markNewsRead } from "@/lib/news-read";

export default function NewsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLocale();
  const item = t.blog.items.find((entry) => entry.slug === slug);

  useEffect(() => {
    if (item) markNewsRead(item.slug);
  }, [item]);

  return (
    <Frame>
      <main id="top">
        {item ? (
          <article className="reader">
            <Link className="back" href="/blog">
              {t.blog.back}
            </Link>
            <time>{item.date}</time>
            <h1>{item.title}</h1>
            {item.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        ) : (
          <article className="reader">
            <Link className="back" href="/blog">
              {t.blog.back}
            </Link>
          </article>
        )}
      </main>
    </Frame>
  );
}
