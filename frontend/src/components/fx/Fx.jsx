import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

/** Former per-section colour blobs. The site now sits on one brand animation
 *  (components/site/BrandBackground.jsx), so sections no longer paint their own light. */
export function Aurora() {
  return null;
}

/** Text that fades and slides in when scrolled into view (no blur filter: too costly on phones).
 *  The prerendered HTML always shows the content — crawlers and AI engines that don't run
 *  JavaScript would otherwise read it as opacity:0 "hidden text". After hydration only the
 *  elements still below the fold are hidden, then faded in as they scroll into view, so the
 *  visitor never sees anything disappear. */
export function Reveal({ children, delay = 0, y = 22, className = "", as = "div" }) {
  const ref = useRef(null);
  const [phase, setPhase] = useState("static"); // static (SSR / above the fold) → pending → shown
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return undefined;
    setPhase("pending");
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setPhase("shown"); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const style = phase === "static" ? undefined : {
    opacity: phase === "pending" ? 0 : 1,
    transform: phase === "pending" ? `translateY(${y}px)` : "none",
    transition: phase === "shown" ? `opacity .8s cubic-bezier(.22,1,.36,1) ${delay}s, transform .8s cubic-bezier(.22,1,.36,1) ${delay}s` : "none",
  };
  return React.createElement(as, { ref, className, style }, children);
}

/** Card container (kept for existing pages; the cursor glow was removed). */
export function SpotlightCard({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

/** Primary call to action: solid, high contrast. */
export function GlowButton({ to, href, children, className = "", onClick }) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-[#020409] transition-colors hover:bg-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 ${className}`;
  if (to) return <Link to={to} className={cls} onClick={onClick}>{children}</Link>;
  if (href) return <a href={href} className={cls} onClick={onClick}>{children}</a>;
  return <button type="button" className={cls} onClick={onClick}>{children}</button>;
}

/** Secondary button: outline. */
export function GhostButton({ to, href, children, onClick, className = "" }) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-md border border-white/25 bg-black/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5 ${className}`;
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
    <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
      <span className="h-px w-8 bg-sky-300/70" aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHead({ kicker, title, accent, sub, center = false }) {
  return (
    <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <Kicker>{kicker}</Kicker>
      <h2 className="mt-5 font-display text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-[2.6rem]">
        {title} {accent && <span className="text-gradient-aurora">{accent}</span>}
      </h2>
      {sub && <p className={`mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg ${center ? "mx-auto" : ""}`}>{sub}</p>}
    </Reveal>
  );
}
