import React from "react";

/*
  Phones: the home headline sits inside the logo's own braces, with the orbit passing behind it the
  way the ring passes through the braces in the logo: its far half runs behind the braces (dimmer)
  and its near half in front. The orbit draws on, then a light travels round it once every four
  seconds, the same motion as the header logo and the brand scene.

  The braces are the official logo layers (public/brand/emblem, cropped from public/brand/scene).
  The orbit is drawn as a vector on the geometry measured on the official file (ORB in
  components/site/brandScene.js), in the coordinates of the cropped ring (1368 × 438): the ring
  bitmap has gaps where the braces cross it in the logo, which would show here.

  Wider screens keep the full logo in the brand scene beside the headline; there this is hidden.
*/
const ORBIT = "M1359.1 170.7A671.1 197.2 -3.7186 1 0 19.7 257.7A671.1 197.2 -3.7186 1 0 1359.1 170.7";
const LAP = "4s";

// A dash of `len` (out of 100) whose head goes once round the orbit per lap
const Dash = ({ len, width, stroke, opacity = 1 }) => (
  <path d={ORBIT} pathLength="100" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeDasharray={`${len} ${100 - len}`} opacity={opacity}>
    <animate attributeName="stroke-dashoffset" from={len} to={len - 100} dur={LAP} repeatCount="indefinite" />
  </path>
);

function Orbit({ half }) {
  const g = `emb-grad-${half}`;
  return (
    <div className={`emb-ring emb-${half}`}>
      {/* the orbit itself: static, so its glow is painted once */}
      <svg viewBox="0 0 1368 438" className="emb-orbit">
        <defs>
          <linearGradient id={g} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1368" y2="0">
            <stop offset="0" stopColor="#1e8cff" />
            <stop offset="0.55" stopColor="#38b6ff" />
            <stop offset="1" stopColor="#8fdcff" />
          </linearGradient>
          <filter id={`${g}-blur`} x="-5%" y="-40%" width="110%" height="180%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>
        <path d={ORBIT} pathLength="100" className="emb-draw emb-orbit-glow" fill="none" stroke={`url(#${g})`} strokeWidth="26" filter={`url(#${g}-blur)`} />
        <path d={ORBIT} pathLength="100" className="emb-draw" fill="none" stroke={`url(#${g})`} strokeWidth="6.5" />
      </svg>
      {/* the travelling light */}
      <svg viewBox="0 0 1368 438" className="emb-light">
        <Dash len={24} width={20} stroke="#38b6ff" opacity={0.3} />
        <Dash len={12} width={7.5} stroke="#a5e4ff" opacity={0.9} />
        <Dash len={3} width={8.5} stroke="#ffffff" />
      </svg>
    </div>
  );
}

export default function HeroEmblem() {
  return (
    <div aria-hidden="true" className="emb md:hidden">
      <div className="emb-field" />
      <Orbit half="back" />
      <img className="emb-brace emb-brace-l" src="/brand/emblem/brace-l.webp" alt="" width="180" height="486" decoding="async" />
      <img className="emb-brace emb-brace-r" src="/brand/emblem/brace-r.webp" alt="" width="181" height="486" decoding="async" />
      <Orbit half="front" />
    </div>
  );
}
