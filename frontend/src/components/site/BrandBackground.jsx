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

  Scrolling into the content dissolves the logo into its pixels and quiets the glitter to a faint
  starfield, so long pages stay easy to read; back at the top the logo re-forms (brandScene.js).
*/
const INTRO_KEY = "infovion-intro-seen";

export default function BrandBackground() {
  const canvas = useRef(null);
  const scene = useRef(null);
  const veil = useRef(0);
  const { pathname } = useLocation();
  const home = pathname === "/";
  const compact = useRef(!home);
  compact.current = !home;

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
        scene.current = createBrandScene(canvas.current, { intro, compact: compact.current });
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

  // Home page: the full logo beside the headline. Inner pages: a smaller logo, clear of the content.
  useEffect(() => {
    scene.current?.setCompact(!home);
  }, [home]);

  // Veil: how strongly the logo shows at the top of each page.
  // Scrolling is handled by the scene itself (the logo dissolves while the visitor reads).
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const narrow = window.innerWidth < 768;
      // Hide it where it would sit on the page header's content: a screenshot beside the title, or
      // a centred title that runs across the middle of the screen
      const h1 = document.querySelector("main h1");
      const centred = Boolean(h1) && getComputedStyle(h1).textAlign === "center";
      const aside = !home && (centred || Boolean(document.querySelector("main [data-hero-aside]")));
      // On phones the logo would sit on the breadcrumb and title of an inner page, so it stays hidden there
      veil.current = home ? 0 : aside || narrow ? 1 : 0.18;
      scene.current?.setVeil(veil.current);
    };
    // Pages load lazily: look again once the new page has mounted
    const later = [setTimeout(update, 120), setTimeout(update, 600)];
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("resize", onScroll);
    return () => {
      later.forEach(clearTimeout);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [home, pathname]);

  return (
    <div aria-hidden="true" className="brand-bg pointer-events-none fixed left-0 top-0 z-0 w-full overflow-hidden bg-[#000105] print:hidden">
      <canvas ref={canvas} className="block h-full w-full" />
    </div>
  );
}
