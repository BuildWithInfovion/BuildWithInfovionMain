import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

/** Drifting teal / indigo / cyan light behind a dark section.
 *  Offsets are in px, not %: a %-top moves with the section's height, so the web font
 *  swapping in (and re-wrapping the text) would count as a layout shift. */
export function Aurora({ className = "", strong = false }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className={`aurora-blob aurora-a left-[5%] top-[-90px] h-[520px] w-[620px] ${strong ? "opacity-70" : ""}`} />
      <div className={`aurora-blob aurora-b right-[0%] top-[0%] h-[480px] w-[560px] ${strong ? "opacity-60" : ""}`} />
      <div className="aurora-blob aurora-c left-[35%] top-[160px] h-[380px] w-[480px] opacity-40" />
      <div className="absolute inset-0 grid-floor opacity-60" />
    </div>
  );
}

/** Text that fades and slides in when scrolled into view (no blur filter: too costly on phones). */
export function Reveal({ children, delay = 0, y = 22, className = "", as = "div" }) {
  const M = Motion[as] ?? Motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}

/** Card whose surface lights up under the cursor. */
export function SpotlightCard({ children, className = "" }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={onMove} className={`spotlight ${className}`}>
      {children}
    </div>
  );
}

/** Primary call to action with a rotating light around its edge. */
export function GlowButton({ to, href, children, className = "", onClick }) {
  const inner = (
    <span className="relative flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 px-7 py-[14px] text-sm font-bold text-[#04121a] shadow-[0_0_40px_-6px_rgba(45,212,191,0.7)] transition-transform group-hover:scale-[1.02]">
      {children}
    </span>
  );
  const cls = `group glow-border inline-flex ${className}`;
  if (to) return <Link to={to} className={cls} onClick={onClick}>{inner}</Link>;
  if (href) return <a href={href} className={cls} onClick={onClick}>{inner}</a>;
  return <button type="button" className={cls} onClick={onClick}>{inner}</button>;
}

/** Secondary glass button. */
export function GhostButton({ to, href, children, onClick, className = "" }) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-[14px] text-sm font-semibold text-white transition-colors hover:bg-white/10 ${className}`;
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  if (href) return <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{children}</a>;
  return <button type="button" onClick={onClick} className={cls}>{children}</button>;
}

/** Endless strip of words / chips. */
export function Marquee({ items }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className="marquee gap-3 py-1">
        {row.map((t, i) => (
          <span key={i} className="whitespace-nowrap rounded-full glass px-4 py-2 text-sm text-slate-300">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/** A product frame that tilts toward the cursor. */
export function Tilt({ children, className = "", max = 7 }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), { stiffness: 120, damping: 18 });
  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  return (
    <div style={{ perspective: 1400 }} className={className} onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }}>
      <Motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>{children}</Motion.div>
    </div>
  );
}

/** Number that counts up the first time it is seen. */
export function CountUp({ to, prefix = "", suffix = "", duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return undefined;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / (duration * 1000));
      setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref}>{prefix}{v.toLocaleString("en-IN")}{suffix}</span>;
}

/** Small uppercase label above section titles. */
export function Kicker({ children }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-teal-400/25 bg-teal-400/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-300">
      <span className="h-1.5 w-1.5 rounded-full bg-teal-300 shadow-[0_0_10px_2px_rgba(94,234,212,0.8)]" />
      {children}
    </p>
  );
}

export function SectionHead({ kicker, title, accent, sub, center = false }) {
  return (
    <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <Kicker>{kicker}</Kicker>
      <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-5xl">
        {title} {accent && <span className="text-gradient-aurora">{accent}</span>}
      </h2>
      {sub && <p className={`mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg ${center ? "mx-auto" : ""}`}>{sub}</p>}
    </Reveal>
  );
}
