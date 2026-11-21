// A short statement in very large type whose words light up one after another as the visitor
// scrolls through it. The words are ordinary text in the page (crawlers and screen readers read
// the sentence whole); only their brightness follows the scroll.
import React, { useRef } from "react";
import { motion as Motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const TEXT = "Most software asks a business to change the way it works. We do it the other way round. We spend time with the people who will use it, then build exactly that: web and mobile apps, ERP, AI agents and automation, at a price fixed before we start, with the code in your name.";

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return <Motion.span style={{ opacity, y }} className="inline-block">{children}&nbsp;</Motion.span>;
}

export default function Manifesto() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.82", "end 0.45"] });
  const words = TEXT.split(" ");
  return (
    <section aria-label="Our approach" className="relative py-28 sm:py-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <p ref={ref} className="font-display text-[1.75rem] font-medium leading-[1.22] tracking-[-0.03em] text-white sm:text-[2.6rem] lg:text-[3.35rem]">
          {reduce
            ? TEXT
            : words.map((w, i) => <Word key={i} progress={scrollYProgress} range={[i / words.length, Math.min(1, (i + 2.5) / words.length)]}>{w}</Word>)}
        </p>
      </div>
    </section>
  );
}
