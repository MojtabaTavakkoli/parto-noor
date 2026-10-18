"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { fill } from "@/lib/copy";
import { formatCount } from "@/lib/format";
import { useLocale } from "@/lib/locale";
import { useReadNews } from "@/lib/news-read";

export function Blog() {
  const { locale, t } = useLocale();
  const onIndex = usePathname() === "/blog";
  const read = useReadNews();
  const unread = t.blog.items.filter((item) => !read.includes(item.slug));
  const title = t.blog.titles[unread.length] ?? fill(t.blog.countMore, { n: formatCount(unread.length, locale) });

  return (
    <section className="band blog" id="blog">
      <header className="section-head">
        <div>
          <p className="kicker">{t.blog.kicker}</p>
          <div className="blog-line">
            <h2>{title}</h2>
            <p className="lede">{unread.length === 0 ? t.blog.readLede : t.blog.lede}</p>
          </div>
        </div>
        {onIndex ? null : (
          <p className="news-all">
            <Link href="/blog">
              {t.blog.all}
              <i aria-hidden="true" />
            </Link>
          </p>
        )}
      </header>
      <ul className="news">
        {t.blog.items.map((item) => (
          <li key={item.slug}>
            <Link href={`/blog/${item.slug}`}>
              <time>
                {item.date}
                {read.includes(item.slug) ? null : <span className="news-badge">{t.blog.unread}</span>}
              </time>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
