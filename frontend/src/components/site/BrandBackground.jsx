import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/*
  The Infovion brand animation behind every page, covering the whole browser window.

  It is drawn live on a canvas (./brandScene.js) from the official logo's own image layers, at
  the screen's real resolution, so it stays sharp on every phone and monitor. The scene code is
  loaded only after the page has finished loading, so it never delays the first paint; it stops
  while the tab is hidden. The full opening (ring drawing on, the name opening, the burst) plays
  once per visit; later pages fade straight into the settled scene. Visitors who prefer reduced
  motion get a still frame.

  As the visitor scrolls, the logo and its glow dim so long pages stay readable; the glitter stays.
*/
const INTRO_KEY = "infovion-intro-seen";

export default function BrandBackground() {
  const canvas = useRef(null);
  const scene = useRef(null);
  const veil = useRef(0);
  const { pathname } = useLocation();
  const home = pathname === "/";

  useEffect(() => {
    let cancelled = false;
    let timer;
    const start = () => {
      import("./brandScene.js").then(({ createBrandScene }) => {
        if (cancelled || !canvas.current) return;
        let intro = true;
        try {
          intro = !sessionStorage.getItem(INTRO_KEY);
          sessionStorage.setItem(INTRO_KEY, "1");
        } catch {
          /* private mode: always play the intro */
        }
        scene.current = createBrandScene(canvas.current, { intro });
        scene.current?.setVeil(veil.current);
      });
    };
    if (document.readyState === "complete") timer = setTimeout(start, 60);
    else window.addEventListener("load", () => (timer = setTimeout(start, 60)), { once: true });
    return () => {
      cancelled = true;
      clearTimeout(timer);
      scene.current?.destroy();
      scene.current = null;
    };
  }, []);

  // Veil: base strength per page, deepening over the first screen of scrolling. On phones the logo
  // sits behind inner-page titles rather than beside them, so it is dimmed more there.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const narrow = window.innerWidth < 768;
      const from = home ? 0 : narrow ? 0.58 : 0.32;
      const to = narrow ? 0.8 : 0.74;
      const k = Math.min(1, window.scrollY / (window.innerHeight * 0.9));
      veil.current = from + (to - from) * k;
      scene.current?.setVeil(veil.current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [home]);

  return (
    <div aria-hidden="true" className="brand-bg pointer-events-none fixed left-0 top-0 z-0 w-full overflow-hidden bg-[#000105] print:hidden">
      <canvas ref={canvas} className="block h-full w-full" />
    </div>
  );
}
