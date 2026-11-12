// Systems we have designed, as a gallery that moves sideways while the visitor scrolls down
// (desktop). On phones, tablets and with reduced motion it is an ordinary swipeable row.
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion, useScroll, useTransform } from "framer-motion";
import Mock from "../site/Mock";
import { SHOWCASE, showcasePath } from "../../Data/showcase";

function Slide({ p, index }) {
  return (
    <article className="flex w-[86vw] flex-shrink-0 snap-center flex-col gap-6 sm:w-[70vw] lg:w-[76rem] lg:flex-row lg:items-start lg:gap-12">
      <div className="lg:w-[20rem] lg:flex-shrink-0 lg:pt-2">
        <p className="font-mono text-xs text-slate-400">{String(index + 1).padStart(2, "0")} / {String(SHOWCASE.length).padStart(2, "0")}</p>
        <h3 className="mt-3 font-display text-2xl leading-tight text-white sm:text-[1.7rem]">{p.title}</h3>
        <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-slate-400">{p.summary}</p>
        <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-4 text-sm">
          <div><dt className="text-slate-400">Budget</dt><dd className="mt-1 text-white">{p.budget.india}</dd></div>
          <div><dt className="text-slate-400">Timeline</dt><dd className="mt-1 text-white">{p.budget.timeline.split(/[,:]/)[0]}</dd></div>
        </dl>
        <Link to={showcasePath(p)} className="mt-6 inline-block text-sm font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">Read the blueprint</Link>
      </div>
      <div className="relative max-h-[22rem] min-w-0 flex-1 overflow-hidden rounded-xl border border-white/10 bg-[#070c17] lg:max-h-[min(31rem,52vh)]">
        <Mock project={p} bare />
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#070c17] to-transparent" />
      </div>
    </article>
  );
}

export default function WorkRail() {
  const outer = useRef(null);
  const track = useRef(null);
  const [travel, setTravel] = useState(0); // px the track must move; 0 = not pinned
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const measure = () => setTravel(mq.matches && track.current ? Math.max(0, track.current.scrollWidth - window.innerWidth + 96) : 0);
    measure();
    window.addEventListener("resize", measure);
    mq.addEventListener("change", measure);
    return () => { window.removeEventListener("resize", measure); mq.removeEventListener("change", measure); };
  }, []);
  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const bar = useTransform(scrollYProgress, [0, 1], [0.04, 1]);
  const pinned = travel > 0;

  return (
    <section ref={outer} id="work" className="relative scroll-mt-24" style={pinned ? { height: `calc(100vh + ${travel}px)` } : undefined}>
      <div className={pinned ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : "py-20"}>
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
          <p className="kicker-pill">Solutions</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display max-w-2xl text-[2rem] leading-[1.08] text-white sm:text-[2.6rem]">Systems we have designed, <span className="text-gradient-aurora">ready to build.</span></h2>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">Six blueprints worked through to modules, data flow, budget and timeline. Screens are design mockups with sample data.</p>
          </div>
        </div>
        <Motion.div ref={track} style={pinned ? { x } : undefined} className={`mt-10 flex gap-10 px-5 sm:px-6 lg:gap-20 lg:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] ${pinned ? "will-change-transform" : "snap-x snap-mandatory overflow-x-auto no-scrollbar"}`}>
          {SHOWCASE.map((p, i) => <Slide key={p.slug} p={p} index={i} />)}
        </Motion.div>
        {pinned && (
          <div className="mx-auto mt-10 w-full max-w-6xl px-6">
            <div className="h-px bg-white/10"><Motion.div style={{ scaleX: bar, transformOrigin: "0 50%" }} className="h-px bg-sky-300" /></div>
          </div>
        )}
      </div>
    </section>
  );
}
