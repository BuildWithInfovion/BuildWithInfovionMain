import React from "react";

/*
  The official logo lockup with a light travelling its ring, the same motion as the brand scene
  behind the page (one lap every four seconds, the same direction). The logo image itself is
  untouched: the light is a thin layer on top, clipped to the logo's own pixels, plus a soft glow.

  Ring geometry measured on public/brand/infovion-lockup-h.png (427 × 120).
*/
const RING = "M184.57 53.01A91.5 27 -3 1 0 1.83 62.59A91.5 27 -3 1 0 184.57 53.01";
const LAP = "4s";

// A dash of `len` (out of 100) whose head moves once round the ring per lap
const Light = ({ len, width, stroke, opacity = 1 }) => (
  <path d={RING} pathLength="100" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeDasharray={`${len} ${100 - len}`} opacity={opacity}>
    <animate attributeName="stroke-dashoffset" from={len} to={len - 100} dur={LAP} repeatCount="indefinite" />
  </path>
);

export default function HeaderLogo({ className = "h-9 w-auto sm:h-10" }) {
  return (
    <span className="relative inline-block">
      <img src="/brand/infovion-lockup-h.webp" alt="Infovion" width="427" height="120" className={`block ${className}`} />
      <span aria-hidden="true" className="logo-light pointer-events-none absolute inset-0">
        {/* soft glow round the light */}
        <svg viewBox="0 0 427 120" className="absolute inset-0 h-full w-full overflow-visible" style={{ mixBlendMode: "screen" }}>
          <defs>
            <filter id="hl-glow" x="-20%" y="-60%" width="140%" height="220%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
            <linearGradient id="hl-depth" gradientUnits="userSpaceOnUse" x1="0" y1="28" x2="0" y2="88">
              <stop offset="0" stopColor="#38b6ff" stopOpacity="0.35" />
              <stop offset="1" stopColor="#7dd3fc" stopOpacity="1" />
            </linearGradient>
          </defs>
          <g filter="url(#hl-glow)">
            <Light len={16} width={9} stroke="url(#hl-depth)" opacity={0.55} />
          </g>
        </svg>
        {/* the light itself, only on the logo's own pixels */}
        <svg
          viewBox="0 0 427 120"
          className="absolute inset-0 h-full w-full"
          style={{
            mixBlendMode: "screen",
            WebkitMaskImage: "url(/brand/infovion-lockup-h.webp)",
            maskImage: "url(/brand/infovion-lockup-h.webp)",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
        >
          <Light len={30} width={8} stroke="#38b6ff" opacity={0.45} />
          <Light len={14} width={8} stroke="#a5e4ff" opacity={0.8} />
          <Light len={4} width={8} stroke="#ffffff" />
        </svg>
      </span>
    </span>
  );
}
