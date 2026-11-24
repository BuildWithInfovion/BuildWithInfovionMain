// The changing audience line under the home headline: each phrase decodes out of random
// characters, holds, then hands over to the next. The server render and visitors who prefer
// reduced motion get the first phrase, still. Screen readers get the whole list once.
import React, { useEffect, useRef } from "react";

const AUDIENCES = [
  "manufacturers",
  "tender bidders",
  "schools and colleges",
  "government departments",
  "banks and security teams",
  "founders abroad",
  "hospitals and clinics",
];
const GLYPHS = "abcdefghijklmnopqrstuvwxyz0123456789{}[]<>/=+*#";
const HOLD = 2300;

export default function HeroLine() {
  const el = useRef(null);
  useEffect(() => {
    const node = el.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let i = 0, raf = 0, timer = 0, alive = true;
    const decode = (from, to) => {
      const len = Math.max(from.length, to.length);
      // each position settles at its own moment, left to right with some jitter
      const settle = Array.from({ length: len }, (_, k) => 220 + k * 34 + Math.random() * 180);
      const t0 = performance.now();
      const step = (now) => {
        if (!alive) return;
        const t = now - t0;
        let out = "", done = true;
        for (let k = 0; k < len; k++) {
          if (t >= settle[k]) out += to[k] ?? "";
          else {
            done = false;
            const c = to[k] ?? from[k];
            out += c === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
          }
        }
        node.textContent = out;
        if (done) timer = setTimeout(next, HOLD);
        else raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const next = () => {
      const from = AUDIENCES[i];
      i = (i + 1) % AUDIENCES.length;
      decode(from, AUDIENCES[i]);
    };
    timer = setTimeout(next, HOLD + 900);
    return () => { alive = false; cancelAnimationFrame(raf); clearTimeout(timer); };
  }, []);

  return (
    <p className="fade-up mt-5 font-display text-[1.65rem] leading-tight text-slate-400 max-md:mt-14 max-md:text-center sm:text-4xl lg:text-[2.7rem]" style={{ "--d": "280ms" }}>
      <span className="sr-only">For {AUDIENCES.slice(0, -1).join(", ")} and {AUDIENCES[AUDIENCES.length - 1]}.</span>
      <span aria-hidden="true">
        for <span ref={el} className="hero-decode text-white">{AUDIENCES[0]}</span><span className="hero-caret" />
      </span>
    </p>
  );
}
