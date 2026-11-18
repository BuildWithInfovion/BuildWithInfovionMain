// Inertial smooth scrolling for the Cyvion pages only (Lenis). Started when a Cyvion page mounts,
// destroyed when the visitor leaves, never started for visitors who prefer reduced motion.
// Anchor links (#story, #status) glide to their section, clearing the fixed navigation.
import { useEffect } from "react";

export default function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let lenis, raf = 0, alive = true;
    import("lenis").then(({ default: Lenis }) => {
      if (!alive) return;
      lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, anchors: { offset: -120 } });
      window.__cyLenis = lenis;                         // lets tests and tooling scroll programmatically
      const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    });
    return () => { alive = false; cancelAnimationFrame(raf); if (lenis) lenis.destroy(); delete window.__cyLenis; };
  }, []);
}
