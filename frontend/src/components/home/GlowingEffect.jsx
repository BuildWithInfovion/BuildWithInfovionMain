// A light on the border of a card that turns to face the cursor as it comes near.
// Ported from the "Glowing Effect" component by Aceternity (21st.dev/manuarora700/glowing-effect),
// in plain JSX with the Infovion blue in place of its multi-colour gradient. Desktop pointers only.
import React, { memo, useCallback, useEffect, useRef } from "react";
import { animate } from "framer-motion";

const GRADIENT = `radial-gradient(circle, #38b6ff 10%, #38b6ff00 20%),
  radial-gradient(circle at 40% 40%, #e6f4ff 5%, #e6f4ff00 15%),
  radial-gradient(circle at 60% 60%, #7cc8ff 10%, #7cc8ff00 20%),
  repeating-conic-gradient(from 236.84deg at 50% 50%, #38b6ff 0%, #e6f4ff calc(25% / 5), #7cc8ff calc(50% / 5), #1d6fb8 calc(75% / 5), #38b6ff calc(100% / 5))`;

const GlowingEffect = memo(function GlowingEffect({ inactiveZone = 0.01, proximity = 64, spread = 40, movementDuration = 2, borderWidth = 2 }) {
  const box = useRef(null);
  const last = useRef({ x: 0, y: 0 });
  const frame = useRef(0);

  const move = useCallback((e) => {
    if (!box.current) return;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const el = box.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = e?.x ?? last.current.x;
      const y = e?.y ?? last.current.y;
      if (e) last.current = { x, y };
      const cx = left + width / 2;
      const cy = top + height / 2;
      if (Math.hypot(x - cx, y - cy) < 0.5 * Math.min(width, height) * inactiveZone) { el.style.setProperty("--active", "0"); return; }
      const near = x > left - proximity && x < left + width + proximity && y > top - proximity && y < top + height + proximity;
      el.style.setProperty("--active", near ? "1" : "0");
      if (!near) return;
      const current = parseFloat(el.style.getPropertyValue("--start")) || 0;
      const target = (180 * Math.atan2(y - cy, x - cx)) / Math.PI + 90;
      const diff = ((target - current + 180) % 360) - 180;
      animate(current, current + diff, { duration: movementDuration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => el.style.setProperty("--start", String(v)) });
    });
  }, [inactiveZone, proximity, movementDuration]);

  useEffect(() => {
    if (!window.matchMedia?.("(hover: hover) and (pointer: fine)").matches) return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;
    const onScroll = () => move();
    const onPointer = (e) => move(e);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.body.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      document.body.removeEventListener("pointermove", onPointer);
    };
  }, [move]);

  return (
    <div ref={box} aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit]"
      style={{ "--spread": spread, "--start": "0", "--active": "0", "--glow-border": `${borderWidth}px`, "--gradient": GRADIENT }}>
      <div className={[
        "rounded-[inherit]",
        'after:absolute after:inset-[calc(-1*var(--glow-border))] after:rounded-[inherit] after:content-[""]',
        "after:[border:var(--glow-border)_solid_transparent]",
        "after:[background:var(--gradient)] after:[background-attachment:fixed]",
        "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
        "after:[mask-clip:padding-box,border-box] after:[mask-composite:intersect]",
        "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]",
      ].join(" ")} />
    </div>
  );
});

export default GlowingEffect;
