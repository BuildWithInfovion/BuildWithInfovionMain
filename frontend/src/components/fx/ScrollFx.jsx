import { useEffect, useRef } from "react";

/*
  Site-wide scroll effects, mounted once in MainLayout:

  - a hairline at the top of the window that fills as the page is read;
  - cards, panels, tables and grid items rise into place as they scroll into view, a row at a
    time with a short stagger;
  - on desktop, a soft light follows the cursor across the panel under it.

  The prerendered HTML is never hidden: search engines and AI crawlers (which don't run
  JavaScript) see every word. Only elements still below the fold after the page has loaded are
  hidden and then revealed. Everything is off for visitors who prefer reduced motion. Only
  transform and opacity animate, so scrolling stays on the compositor.
*/

const reduceMotion = () => Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);

// What rises into view: content blocks, not running text
const TARGETS = [".panel", "main table", "main .grid > *", "main [data-reveal]"].join(",");

export function ScrollProgress() {
  const bar = useRef(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const k = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (bar.current) {
        bar.current.style.transform = `scaleX(${k})`;
        bar.current.style.opacity = k > 0.002 ? "1" : "0";
      }
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={bar} aria-hidden="true" className="scroll-progress" />;
}

/** Reveal on scroll and the panel light. Renders nothing. */
export function ScrollEffects() {
  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main || typeof IntersectionObserver === "undefined") return undefined;
    const cleanups = [];

    // ── Reveal on scroll ──────────────────────────────────────────────────
    if (!reduceMotion()) {
      const seen = new WeakSet();
      const io = new IntersectionObserver(
        (entries) => {
          const entering = entries.filter((e) => e.isIntersecting).map((e) => e.target);
          // Stagger the ones arriving together, in reading order
          entering.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top || a.getBoundingClientRect().left - b.getBoundingClientRect().left);
          entering.forEach((el, i) => {
            io.unobserve(el);
            el.style.setProperty("--rv-d", `${Math.min(i, 6) * 70}ms`);
            el.classList.add("rv-in");
            let timer = 0;
            const done = (e) => {
              if (e && (e.target !== el || e.propertyName !== "transform")) return;
              clearTimeout(timer);
              el.removeEventListener("transitionend", done);
              el.classList.remove("rv", "rv-in");
              el.style.removeProperty("--rv-d");
            };
            el.addEventListener("transitionend", done);
            timer = setTimeout(done, 1800); // in case the transition never fires
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
      );
      const scan = () => {
        const fold = window.innerHeight * 0.92;
        main.querySelectorAll(TARGETS).forEach((el) => {
          if (seen.has(el)) return;
          seen.add(el);
          // Leave alone: what is already on screen, content inside a <Reveal>, nested targets
          if (el.closest("[data-rv]") || el.parentElement?.closest(".rv")) return;
          const r = el.getBoundingClientRect();
          if (r.top < fold || r.height === 0) return;
          el.classList.add("rv");
          io.observe(el);
        });
      };
      // Pages load lazily: scan once now and again whenever new content mounts
      let timer = 0;
      const mo = new MutationObserver(() => {
        clearTimeout(timer);
        timer = setTimeout(scan, 40);
      });
      requestAnimationFrame(scan);
      mo.observe(main, { childList: true, subtree: true });
      cleanups.push(() => {
        clearTimeout(timer);
        mo.disconnect();
        io.disconnect();
      });
    }

    // ── Cursor light on panels (desktop pointers only) ────────────────────
    if (window.matchMedia?.("(hover: hover) and (pointer: fine)").matches && !reduceMotion()) {
      let lit = null;
      let raf = 0;
      let ev = null;
      const paint = () => {
        raf = 0;
        const panel = ev?.target?.closest?.(".panel");
        if (lit && lit !== panel) {
          lit.style.removeProperty("--mx");
          lit.style.removeProperty("--my");
        }
        lit = panel || null;
        if (!lit) return;
        const r = lit.getBoundingClientRect();
        lit.style.setProperty("--mx", `${ev.clientX - r.left}px`);
        lit.style.setProperty("--my", `${ev.clientY - r.top}px`);
      };
      const move = (e) => {
        ev = e;
        if (!raf) raf = requestAnimationFrame(paint);
      };
      main.addEventListener("pointermove", move, { passive: true });
      cleanups.push(() => {
        main.removeEventListener("pointermove", move);
        cancelAnimationFrame(raf);
      });
    }

    return () => cleanups.forEach((f) => f());
  }, []);
  return null;
}
