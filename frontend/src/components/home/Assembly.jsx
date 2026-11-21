// "How an idea becomes running software": one pinned scene, scrubbed by the scroll, that shows a
// project from start to finish without belonging to any one industry.
//   1 Listen     the problems arrive as scattered notes
//   2 Blueprint  the notes snap onto a grid and become modules wired to the client's data
//   3 Build      the modules turn into a working dashboard, and a phone app slides in
//   4 Run        the system goes live: numbers move, orders flow in from the phone, and the
//                code, database and accounts are handed over
// Everything is one SVG whose shapes are driven from scroll progress, so it scales to any screen.
// All four chapters are in the page as text. Reduced motion shows the finished system, unpinned.
import React, { useEffect, useRef, useState } from "react";
import { motion as Motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";

const CHAPTERS = [
  ["Listen", "We start with the people who will use it.", "Time with your team to see how orders, stock, approvals and reports really move today, and where they get stuck."],
  ["Blueprint", "Then we draw the system before we build it.", "Modules, roles, data and integrations worked out on paper, with a price and timeline fixed in writing."],
  ["Build", "Working software every two weeks.", "The web app, the mobile app and the admin side, released fortnightly on a link your team can open and try."],
  ["Run", "Live, supported, and yours.", "Launch, training and support, with the source code, database and cloud accounts transferred to you."],
];
const EDGES = [0.27, 0.53, 0.77];

// Each module: sticky note → blueprint box → dashboard panel. Boxes are [x, y, w, h(, rotation)].
const MODS = [
  { note: ["Orders arrive on WhatsApp", "and phone calls"], title: "Orders", n: [80, 84, 268, 108, -6], b: [110, 130, 230, 100], a: [255, 112, 205, 116], kpi: ["Orders today", 248, (v) => Math.round(v).toLocaleString("en-IN")] },
  { note: ["Stock is counted in", "three spreadsheets"], title: "Inventory", n: [640, 64, 268, 108, 5], b: [660, 130, 230, 100], a: [475, 112, 205, 116], kpi: ["Stock value", 38.4, (v) => `₹${v.toFixed(1)} L`] },
  { note: ["Approvals wait on paper", "and signatures"], title: "Approvals", n: [150, 392, 268, 108, 4], b: [110, 410, 230, 100], a: [695, 112, 215, 116], kpi: ["Awaiting approval", 6, (v) => String(Math.round(v))] },
  { note: ["Month-end reports", "take two days"], title: "Reports", n: [612, 372, 268, 108, -4], b: [660, 410, 230, 100], a: [255, 246, 655, 306] },
];
const ST = [0, 0.27, 0.38, 0.5, 0.6, 1]; // note, note, blueprint, blueprint, app, app
const WIRES = ["M340 180 H450 V270", "M660 180 H550 V270", "M340 460 H450 V370", "M660 460 H550 V370"];
const BARS = [38, 52, 46, 64, 58, 77, 70, 92, 84, 108, 99, 128];

function Module({ m, p }) {
  const pick = (k) => [m.n[k], m.n[k], m.b[k], m.b[k], m.a[k], m.a[k]];
  const x = useTransform(p, ST, pick(0));
  const y = useTransform(p, ST, pick(1));
  const w = useTransform(p, ST, pick(2));
  const h = useTransform(p, ST, pick(3));
  const rotate = useTransform(p, [0, 0.27, 0.38], [m.n[4], m.n[4], 0]);
  const fill = useTransform(p, ST, ["#fde68a", "#fde68a", "rgba(56,182,255,0.07)", "rgba(56,182,255,0.07)", "#0f1420", "#0f1420"]);
  const stroke = useTransform(p, ST, ["rgba(253,230,138,0)", "rgba(253,230,138,0)", "#38b6ff", "#38b6ff", "rgba(255,255,255,0.09)", "rgba(255,255,255,0.09)"]);
  const tx = useTransform(x, (v) => v + 22);
  const noteO = useTransform(p, [0.26, 0.32], [1, 0]);
  const titleO = useTransform(p, [0.33, 0.39, 0.53, 0.57], [0, 1, 1, 0]);
  const kpiO = useTransform(p, [0.57, 0.63], [0, 1]);
  const ty = (d) => useTransform(y, (v) => v + d); // eslint-disable-line react-hooks/rules-of-hooks
  const n1 = ty(46), n2 = ty(74), t1 = ty(44), t2 = ty(66), k1 = ty(36), k2 = ty(86);
  const count = useTransform(p, [0.76, 0.92], [0, m.kpi ? m.kpi[1] : 0]);
  const shown = useTransform(count, (v) => (m.kpi ? m.kpi[2](v) : ""));

  return (
    <Motion.g style={{ rotate, transformBox: "fill-box", transformOrigin: "50% 50%" }}>
      <Motion.rect x={x} y={y} width={w} height={h} rx="10" style={{ fill, stroke }} strokeWidth="1.5" />
      <Motion.text x={tx} y={n1} style={{ opacity: noteO }} fill="#3b2f0b" fontSize="19" fontWeight="500">{m.note[0]}</Motion.text>
      <Motion.text x={tx} y={n2} style={{ opacity: noteO }} fill="#3b2f0b" fontSize="19" fontWeight="500">{m.note[1]}</Motion.text>
      <Motion.text x={tx} y={t1} style={{ opacity: titleO }} fill="#e6f4ff" fontSize="22" fontWeight="600">{m.title}</Motion.text>
      <Motion.text x={tx} y={t2} style={{ opacity: titleO }} fill="#7cc8ff" fontSize="13" className="font-mono">module</Motion.text>
      {m.kpi ? (
        <>
          <Motion.text x={tx} y={k1} style={{ opacity: kpiO }} fill="#94a3b8" fontSize="14">{m.kpi[0]}</Motion.text>
          <Motion.text x={tx} y={k2} style={{ opacity: kpiO }} fill="#ffffff" fontSize="36" fontWeight="600" letterSpacing="-1">{shown}</Motion.text>
        </>
      ) : (
        <Motion.text x={tx} y={k1} style={{ opacity: kpiO }} fill="#94a3b8" fontSize="14">Revenue, last 12 weeks</Motion.text>
      )}
    </Motion.g>
  );
}

function Bar({ i, h, p }) {
  const start = 0.6 + i * 0.011;
  const g = useTransform(p, [start, start + 0.08], [0, 1]);
  const height = useTransform(g, (v) => h * 1.6 * v);
  const y = useTransform(height, (v) => 528 - v);
  const fill = useTransform(p, [0.76, 0.86], ["#1e3a5f", i > 8 ? "#38b6ff" : "#2b6aa6"]);
  return <Motion.rect x={283 + i * 50} y={y} width="30" height={height} rx="4" style={{ fill }} />;
}

function Scene({ p, live }) {
  const grid = useTransform(p, [0.24, 0.34, 0.55, 0.62], [0, 1, 1, 0]);
  const hub = useTransform(p, [0.3, 0.38, 0.52, 0.58], [0, 1, 1, 0]);
  const wire = useTransform(p, [0.32, 0.47], [0, 1]);
  const frame = useTransform(p, [0.52, 0.6], [0, 1]);
  const phoneX = useTransform(p, [0.64, 0.74], [220, 0]);
  const phoneO = useTransform(p, [0.64, 0.7], [0, 1]);
  const liveO = useTransform(p, [0.77, 0.81], [0, 1]);
  const handO = useTransform(p, [0.86, 0.94], [0, 1]);
  const handY = useTransform(p, [0.86, 0.94], [14, 0]);

  return (
    <svg viewBox="0 0 1000 660" className="block h-auto w-full" role="img"
      aria-label="A project taking shape: problems written on notes become a blueprint of modules, then a working dashboard with a mobile app, then a live system handed over to the client. Sample data.">
      <defs>
        <pattern id="asm-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="rgba(56,182,255,0.14)" strokeWidth="1" /></pattern>
        <linearGradient id="asm-glow" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#38b6ff" stopOpacity=".18" /><stop offset="1" stopColor="#38b6ff" stopOpacity="0" /></linearGradient>
      </defs>
      <Motion.rect width="1000" height="600" fill="url(#asm-grid)" style={{ opacity: grid }} />

      {/* the app window that the modules settle into */}
      <Motion.g style={{ opacity: frame }}>
        <rect x="60" y="60" width="880" height="510" rx="16" fill="#0a0e17" stroke="rgba(255,255,255,0.1)" />
        <rect x="60" y="60" width="880" height="36" rx="16" fill="#0e131e" />
        <rect x="60" y="80" width="880" height="16" fill="#0e131e" />
        {[84, 102, 120].map((cx) => <circle key={cx} cx={cx} cy="78" r="5" fill="rgba(255,255,255,0.16)" />)}
        <rect x="390" y="68" width="220" height="20" rx="6" fill="rgba(255,255,255,0.05)" />
        <text x="500" y="82" textAnchor="middle" fill="#94a3b8" fontSize="11" className="font-mono">your-company.app</text>
        <rect x="60" y="96" width="170" height="474" fill="#0c111b" />
        <rect x="80" y="116" width="28" height="28" rx="8" fill="#38b6ff" opacity=".9" />
        {[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x="80" y={170 + k * 38} width={k === 0 ? 120 : 96 - (k % 3) * 14} height="12" rx="6" fill={k === 0 ? "rgba(56,182,255,0.55)" : "rgba(255,255,255,0.12)"} />)}
      </Motion.g>

      {/* the client's data at the centre of the blueprint, wired to every module */}
      <Motion.g style={{ opacity: hub }}>
        {WIRES.map((d) => <Motion.path key={d} d={d} fill="none" stroke="#38b6ff" strokeWidth="2" style={{ pathLength: wire }} />)}
        <rect x="400" y="270" width="200" height="100" rx="12" fill="rgba(56,182,255,0.1)" stroke="#38b6ff" strokeWidth="1.5" />
        <ellipse cx="452" cy="306" rx="20" ry="7" fill="none" stroke="#7cc8ff" strokeWidth="1.5" />
        <path d="M432 306v26c0 4 9 7 20 7s20-3 20-7v-26" fill="none" stroke="#7cc8ff" strokeWidth="1.5" />
        <path d="M432 319c0 4 9 7 20 7s20-3 20-7" fill="none" stroke="#7cc8ff" strokeWidth="1.5" />
        <text x="488" y="316" fill="#e6f4ff" fontSize="17" fontWeight="600">Your data</text>
        <text x="488" y="338" fill="#7cc8ff" fontSize="12" className="font-mono">one source</text>
      </Motion.g>

      <Motion.rect x="255" y="246" width="655" height="306" rx="10" fill="url(#asm-glow)" style={{ opacity: frame }} />
      {MODS.map((m) => <Module key={m.title} m={m} p={p} />)}
      <Motion.g style={{ opacity: frame }}>{BARS.map((h, i) => <Bar key={i} i={i} h={h} p={p} />)}</Motion.g>

      {/* the phone app */}
      <Motion.g style={{ x: phoneX, opacity: phoneO }}>
        <rect x="770" y="292" width="156" height="290" rx="24" fill="#0b0f18" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
        <rect x="822" y="302" width="52" height="8" rx="4" fill="rgba(255,255,255,0.12)" />
        <text x="788" y="338" fill="#fff" fontSize="14" fontWeight="600">New order</text>
        {[0, 1, 2].map((k) => (
          <g key={k}>
            <rect x="786" y={354 + k * 50} width="124" height="40" rx="9" fill="rgba(255,255,255,0.05)" />
            <rect x="796" y={366 + k * 50} width={60 + k * 12} height="7" rx="3.5" fill="rgba(255,255,255,0.3)" />
            <rect x="796" y={378 + k * 50} width="40" height="6" rx="3" fill="rgba(255,255,255,0.14)" />
          </g>
        ))}
        <rect x="786" y="520" width="124" height="38" rx="10" fill="#38b6ff" />
        <text x="848" y="544" textAnchor="middle" fill="#03121f" fontSize="13" fontWeight="600">Submit</text>
      </Motion.g>

      {/* live: status, and orders travelling from the phone into the dashboard */}
      <Motion.g style={{ opacity: liveO }}>
        <rect x="846" y="68" width="78" height="20" rx="10" fill="rgba(52,211,153,0.14)" />
        <circle cx="862" cy="78" r="4" fill="#34d399" className={live ? "asm-pulse" : ""} />
        <text x="874" y="82.5" fill="#6ee7b7" fontSize="11.5" fontWeight="600">Live</text>
        <path d="M780 360 C700 300 520 250 360 196" fill="none" stroke="rgba(56,182,255,0.25)" strokeWidth="1.5" strokeDasharray="4 6" />
        {live && [0, 1, 2].map((k) => (
          <circle key={k} r="5" fill="#7cc8ff">
            <animateMotion dur="2.4s" begin={`${k * 0.8}s`} repeatCount="indefinite" path="M780 360 C700 300 520 250 360 196" />
          </circle>
        ))}
      </Motion.g>

      <Motion.g style={{ opacity: handO, y: handY }}>
        <text x="500" y="625" textAnchor="middle" fill="#cbd5e1" fontSize="17">Source code, database and cloud accounts transferred to you</text>
      </Motion.g>
    </svg>
  );
}

export default function Assembly() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const fixed = useMotionValue(1);
  const p = reduce ? fixed : scrollYProgress;
  const [step, setStep] = useState(reduce ? 3 : 0);
  // The chapter list follows the section's own position. (Framer can run scroll values natively,
  // without JavaScript change events, so they are not used for React state here.)
  useEffect(() => {
    if (reduce) return undefined;
    let raf = 0;
    const read = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const v = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
      const s = EDGES.filter((e) => v >= e).length;
      setStep((cur) => (cur === s ? cur : s));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(read); };
    read();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, [reduce]);
  const bar = useTransform(p, [0, 1], [0, 1]);

  const copy = (
    <div className="lg:pr-6">
      <p className="kicker-pill">One project, start to finish</p>
      <h2 className="font-display mt-3 text-[1.9rem] leading-[1.08] text-white sm:text-[2.6rem]">How an idea becomes running software</h2>
      <ol className="mt-8 border-l border-white/10 lg:mt-10">
        {CHAPTERS.map(([label, head, body], i) => {
          const on = reduce || i === step;
          return (
            <li key={label} className={`relative pl-6 transition-all duration-500 ${on ? "pb-6 opacity-100 last:pb-0" : "opacity-35 max-lg:pointer-events-none max-lg:max-h-0 max-lg:overflow-hidden max-lg:pb-0 max-lg:opacity-0 lg:pb-6"}`}>
              <span aria-hidden="true" className={`absolute -left-px top-1 h-6 w-px transition-colors duration-500 ${on ? "bg-sky-300" : "bg-transparent"}`} />
              <p className="font-mono text-xs text-slate-400">{String(i + 1).padStart(2, "0")} {label}</p>
              <h3 className="font-display mt-1.5 text-xl text-white sm:text-2xl">{head}</h3>
              <p className={`max-w-md overflow-hidden text-[15px] leading-relaxed text-slate-400 transition-all duration-500 ${on ? "mt-2 max-h-40 opacity-100" : "mt-0 max-h-0 opacity-0"}`}>{body}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );

  if (reduce) {
    return (
      <section id="approach" data-rv="" className="scroll-mt-24 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          {copy}<Scene p={p} live={false} />
        </div>
      </section>
    );
  }
  return (
    <section id="approach" ref={ref} data-rv="" className="relative h-[460vh] scroll-mt-24">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden pt-16">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-6 px-5 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10">
          <div className="order-2 lg:order-1">{copy}</div>
          <div className="relative order-1 lg:order-2">
            <div aria-hidden="true" className="pointer-events-none absolute -inset-10 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(56,182,255,0.12),transparent_70%)]" />
            <div className="relative max-lg:mx-auto max-lg:max-w-[min(100%,calc(50svh*1.5))]"><Scene p={p} live={step === 3} /></div>
            <div className="relative mx-auto mt-2 h-px w-[min(100%,560px)] bg-white/10">
              <Motion.div style={{ scaleX: bar, transformOrigin: "0 50%" }} className="h-px bg-sky-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
