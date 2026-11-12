// The product stage at the top of the home page: real and designed interfaces, shown running in
// one browser window. It tilts back on arrival and levels out as the visitor scrolls to it; the
// tabs advance on their own while it is on screen and can be chosen by hand.
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion as Motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Mock from "../site/Mock";
import { showcaseBySlug } from "../../Data/showcase";

const SCREENS = [
  { key: "school", label: "School ERP", url: "app.infovion.in", status: "Our product, in daily use", to: "/school-management-software",
    img: ["/product/dashboard.webp", "/product/dashboard-900.webp", "Infovion School ERP dashboard with the day's fee collection, dues and attendance"] },
  { key: "jms", label: "Jewellery billing", url: "jms.infovion.in", status: "Our product, in daily use", to: "/jewellery-management-software",
    img: ["/product/jms/billing.webp", "/product/jms/billing-900.webp", "A new bill in Infovion JMS with scanned pieces, weights, rates and making charges"] },
  { key: "clinic", label: "AI front desk", status: "Design concept, sample data", to: "/solutions/ai-whatsapp-assistant-for-clinics", project: showcaseBySlug("ai-whatsapp-assistant-for-clinics") },
  { key: "crusher", label: "Crusher ERP", status: "Design concept, sample data", to: "/solutions/stone-crusher-erp-software", project: showcaseBySlug("stone-crusher-erp-software") },
];
const DWELL = 6500;

export default function Stage() {
  const wrap = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(wrap, { amount: 0.35 });
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const running = inView && !held && !reduce;

  useEffect(() => {
    if (!running) return undefined;
    const t = setTimeout(() => setActive((i) => (i + 1) % SCREENS.length), DWELL);
    return () => clearTimeout(t);
  }, [running, active]);

  // Tilted back while it is low on the screen, level by the time it reaches the upper third
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start end", "start 0.28"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 16, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.93, 1]);
  const glow = useTransform(scrollYProgress, [0, 1], [0.35, 1]);

  const s = SCREENS[active];
  return (
    <div ref={wrap} className="relative mx-auto mt-16 max-w-6xl px-5 sm:mt-20 sm:px-6" onMouseEnter={() => setHeld(true)} onMouseLeave={() => setHeld(false)}>
      <Motion.div aria-hidden="true" style={{ opacity: glow }} className="pointer-events-none absolute inset-x-0 -top-24 h-[70%] bg-[radial-gradient(60%_60%_at_50%_40%,rgba(56,182,255,0.22),transparent_70%)]" />

      <div role="tablist" aria-label="Interfaces we have built or designed" className="relative mb-4 flex gap-1 overflow-x-auto no-scrollbar">
        {SCREENS.map((x, i) => (
          <button key={x.key} type="button" role="tab" aria-selected={i === active} onClick={() => setActive(i)}
            className={`relative flex-shrink-0 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${i === active ? "text-white" : "text-slate-400 hover:text-slate-200"}`}>
            {x.label}
            <span className="absolute inset-x-3 bottom-0 h-px overflow-hidden bg-white/10">
              {i === active && <span key={`${active}-${running}`} className={`block h-full bg-sky-300 ${running ? "stage-progress" : ""}`} style={{ "--dur": `${DWELL}ms` }} />}
            </span>
          </button>
        ))}
      </div>

      <div style={{ perspective: 1800 }}>
        <Motion.div style={{ rotateX, scale, transformOrigin: "50% 0%" }} className="overflow-hidden rounded-xl border border-white/10 bg-[#070c17] shadow-[0_60px_140px_-50px_rgba(0,0,0,0.9)] will-change-transform">
          <div className="flex h-10 items-center gap-3 border-b border-white/[0.07] bg-[#0b0f1a] px-4">
            <span className="flex gap-1.5" aria-hidden="true"><i className="h-2.5 w-2.5 rounded-full bg-white/15" /><i className="h-2.5 w-2.5 rounded-full bg-white/15" /><i className="h-2.5 w-2.5 rounded-full bg-white/15" /></span>
            <span className="mx-auto hidden h-6 w-72 items-center justify-center rounded-md bg-white/[0.05] font-mono text-[11px] text-slate-400 sm:flex">{s.url ?? s.project.appUrl}</span>
            <span className="ml-auto text-[11px] text-slate-400 sm:ml-0">{s.status}</span>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <Motion.div key={s.key} role="tabpanel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="absolute inset-0">
                {s.img
                  ? <img src={s.img[0]} srcSet={`${s.img[1]} 900w, ${s.img[0]} 1800w`} sizes="(min-width: 1152px) 1104px, 92vw" alt={s.img[2]} width="1800" height="1125" decoding="async" className="stage-pan h-full w-full object-cover object-left-top" />
                  : <Mock project={s.project} bare live />}
              </Motion.div>
            </AnimatePresence>
          </div>
        </Motion.div>
      </div>
      <p className="relative mt-4 text-sm text-slate-400">
        {s.project ? "A system we have designed in detail and can build for you. " : "Software we built and operate. "}
        <Link to={s.to} className="font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">{s.project ? "Read the blueprint" : "See the product"}</Link>
      </p>
    </div>
  );
}
