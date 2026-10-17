import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/*
  The Infovion brand animation behind every page, covering the whole browser window.

  Two cuts of the same animation (videos/infovion-web-bg in the app repo): landscape for wide
  screens (logo right of centre, headlines on the left) and portrait for phones (logo in the
  upper third). The video is requested only after the page has loaded, so it never delays the
  first paint; it pauses while the tab is hidden. Visitors who prefer reduced motion, or who
  have Data Saver on, get a still frame instead.

  As the visitor scrolls, a dark veil fades in over the animation so long pages stay readable.
*/
const CUTS = {
  landscape: { webm: "/brand/bg-landscape.webm", mp4: "/brand/bg-landscape.mp4", still: "/brand/bg-landscape.webp" },
  portrait: { webm: "/brand/bg-portrait.webm", mp4: "/brand/bg-portrait.mp4", still: "/brand/bg-portrait.webp" },
};

const pickCut = () => (window.innerHeight > window.innerWidth * 1.1 ? "portrait" : "landscape");
const isSafari = () => /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);

export default function BrandBackground() {
  const video = useRef(null);
  const still = useRef(null);
  const veil = useRef(null);
  const { pathname } = useLocation();
  const home = pathname === "/";
  // Home shows the animation at full strength at the top; inner pages start slightly dimmed
  const base = home ? 0 : 0.32;

  useEffect(() => {
    const v = video.current;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const saveData = navigator.connection?.saveData;
    let cut = pickCut();

    const showStill = () => {
      if (still.current) {
        still.current.style.backgroundImage = `url(${CUTS[cut].still})`;
        still.current.style.opacity = "1";
      }
    };
    if (reduce || saveData || !v) { showStill(); return undefined; }

    const load = () => {
      const c = CUTS[cut];
      const webm = !isSafari() && v.canPlayType('video/webm; codecs="vp9"');
      v.src = webm ? c.webm : c.mp4;
      v.muted = true;
      v.defaultMuted = true;
      const p = v.play();
      if (p && p.catch) p.catch(showStill);
    };
    const onPlaying = () => { v.style.opacity = "1"; };
    v.addEventListener("playing", onPlaying);
    v.addEventListener("error", showStill);

    let started = false;
    const start = () => { if (!started) { started = true; load(); } };
    let timer;
    if (document.readyState === "complete") timer = setTimeout(start, 250);
    else window.addEventListener("load", () => { timer = setTimeout(start, 250); }, { once: true });

    // Pause while the tab is in the background
    const onVis = () => { if (!started) return; if (document.hidden) v.pause(); else v.play().catch(() => {}); };
    document.addEventListener("visibilitychange", onVis);

    // Switch cut when a tablet turns or a window is resized across the threshold
    let rt;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        const next = pickCut();
        if (next !== cut) { cut = next; if (started) load(); }
      }, 300);
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(timer);
      clearTimeout(rt);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("error", showStill);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Veil: base strength per page, deepening over the first screen of scrolling. On phones the logo
  // sits behind inner-page titles rather than beside them, so it is dimmed more there.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const narrow = window.innerWidth < 768;
      const from = home ? 0 : narrow ? 0.58 : base;
      const to = narrow ? 0.8 : 0.74;
      const k = Math.min(1, window.scrollY / (window.innerHeight * 0.9));
      if (veil.current) veil.current.style.opacity = String(from + (to - from) * k);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [base, home]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#000105] print:hidden">
      <div ref={still} className="absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-700" />
      <video
        ref={video}
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-1000"
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        tabIndex={-1}
      />
      {/* Reading side: headlines sit on the left on wide screens, at the bottom on phones */}
      <div className="absolute inset-0 hidden md:block" style={{ background: "linear-gradient(90deg, rgba(0,1,5,0.82) 0%, rgba(0,1,5,0.58) 38%, rgba(0,1,5,0.12) 62%, rgba(0,1,5,0) 75%)" }} />
      <div className="absolute inset-0 md:hidden" style={{ background: "linear-gradient(180deg, rgba(0,1,5,0) 30%, rgba(0,1,5,0.55) 52%, rgba(0,1,5,0.85) 75%)" }} />
      <div ref={veil} className="absolute inset-0 bg-[#000105]" style={{ opacity: base }} />
    </div>
  );
}
