"use client";

import { Frame } from "./frame";
import { Blog } from "./blog";
import { Faq } from "./faq";
import { Finale } from "./finale";
import { Hero } from "./hero";
import { Models } from "./models";
import { Pricing } from "./pricing";
import { Product } from "./product";

export function Site() {
  return (
    <Frame>
      <main id="top">
        <Hero />
        <Product />
        <Models />
        <Pricing />
        <Faq />
        <Blog />
        <Finale />
      </main>
    </Frame>
  );
}
