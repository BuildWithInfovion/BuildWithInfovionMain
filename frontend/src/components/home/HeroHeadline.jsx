import React, { useEffect, useRef, useState } from "react";

/*
  The home headline. On phones it is set as a poster, six short lines filling the width, and the
  logo's orbit is drawn round the word "around": its far half passes behind the letters (dimmer)
  and its near half in front, it draws on after the lines rise, then a light laps it every four
  seconds, the same motion as the header logo. Wider screens keep three lines beside the brand
  animation, without the orbit.

  The orbit is the logo's own ring geometry (ORB in components/site/brandScene.js), in a
  1368 × 438 box. Its position follows the word: measured from layout (offsets are unaffected by
  the lines' rise animation), again when fonts load and whenever the headline changes size.
*/
const ORBIT = "M1359.1 170.7A671.1 197.2 -3.7186 1 0 19.7 257.7A671.1 197.2 -3.7186 1 0 1359.1 170.7";

const Dash = ({ len, width, stroke, opacity = 1 }) => (
  <path d={ORBIT} pathLength="100" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeDasharray={`${len} ${100 - len}`} opacity={opacity}>
    <animate attributeName="stroke-dashoffset" from={len} to={len - 100} dur="4s" repeatCount="indefinite" />
  </path>
);

function Orbit({ half, style }) {
  const g = `hero-orbit-g-${half}`;
  return (
    <div aria-hidden="true" className={`hero-orbit hero-orbit-${half}`} style={style}>
      <svg viewBox="0 0 1368 438">
        <defs>
          <linearGradient id={g} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1368" y2="0">
            <stop offset="0" stopColor="#1f6fd6" />
            <stop offset="0.5" stopColor="#38b6ff" />
            <stop offset="1" stopColor="#a5e4ff" />
          </linearGradient>
        </defs>
        <path d={ORBIT} pathLength="100" className="hero-orbit-draw" fill="none" stroke={`url(#${g})`} strokeWidth="9" />
      </svg>
      <svg viewBox="0 0 1368 438" className="hero-orbit-light">
        <Dash len={22} width={28} stroke="#38b6ff" opacity={0.22} />
        <Dash len={10} width={10} stroke="#bfe9ff" opacity={0.9} />
        <Dash len={2.5} width={12} stroke="#ffffff" />
      </svg>
    </div>
  );
}

// Layout position of `el` inside `root`, summed up the offset-parent chain. Offsets ignore
// transforms, so this is right even while the lines are still rising (a transformed line can
// itself become the offset parent, which is why a single offsetTop is not enough).
function offsetIn(el, root) {
  let x = 0;
  let y = 0;
  while (el && el !== root) {
    x += el.offsetLeft;
    y += el.offsetTop;
    el = el.offsetParent;
  }
  return { x, y };
}

export default function HeroHeadline() {
  const frame = useRef(null);
  const h1 = useRef(null);
  const word = useRef(null);
  const [box, setBox] = useState(null); // centre and width of "around", in the frame

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const measure = () => {
      const w = word.current;
      if (!mq.matches || !w || !frame.current) return setBox(null);
      const { x, y } = offsetIn(w, frame.current);
      setBox({ x: x + w.offsetWidth / 2, y: y + w.offsetHeight * 0.5, w: w.offsetWidth });
    };
    measure();
    document.fonts?.ready.then(measure).catch(() => {});
    const ro = typeof ResizeObserver === "function" ? new ResizeObserver(measure) : null;
    ro?.observe(h1.current);
    mq.addEventListener("change", measure);
    return () => {
      ro?.disconnect();
      mq.removeEventListener("change", measure);
    };
  }, []);

  const style = box ? { "--x": `${box.x}px`, "--y": `${box.y}px`, "--w": `${box.w}px` } : undefined;
  return (
    <div ref={frame} className="relative">
      {box && <Orbit half="back" style={style} />}
      <h1 ref={h1} className="hero-h1 font-display relative z-[1] max-w-3xl text-[2.6rem] leading-[1.0] tracking-[-0.045em] text-white sm:text-6xl lg:text-[5.2rem]">
        <span className="line"><span style={{ "--i": 0 }}>Custom <br className="sm:hidden" />software, </span></span>
        <span className="line"><span style={{ "--i": 1 }}>built <br className="sm:hidden" /><span ref={word} className="hero-around">around</span> </span></span>
        <span className="line"><span style={{ "--i": 2 }}>the way <br className="sm:hidden" />you work</span></span>
      </h1>
      {box && <Orbit half="front" style={style} />}
    </div>
  );
}
