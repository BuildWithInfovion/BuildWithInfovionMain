import React, { useEffect, useRef } from "react";

/** A dark browser window around a product screenshot or video. */
export function BrowserFrame({ children, url = "app.infovion.in", className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-[#0b1220] ring-1 ring-white/10 ${className}`}
      style={{ boxShadow: "0 50px 140px -40px rgba(20,184,166,0.45), 0 30px 60px -30px rgba(0,0,0,0.8)" }}
    >
      <div className="flex h-9 items-center gap-3 border-b border-white/[0.07] bg-[#0f1729] px-4">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex h-5 max-w-sm flex-1 items-center justify-center gap-1.5 rounded-md bg-white/[0.05] text-[11px] text-slate-400">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
          {url}
        </div>
        <div className="w-12" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

/**
 * A phone. The screen has its own status bar (time, signal, battery) so the
 * camera island never sits on top of the app's header.
 */
export function PhoneFrame({ children, className = "", time = "9:41" }) {
  return (
    <div
      className={`relative rounded-[2.6rem] bg-gradient-to-b from-[#2a3346] via-[#121826] to-[#0b0f18] p-[7px] ${className}`}
      style={{ boxShadow: "0 40px 90px -25px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.08), 0 0 60px -20px rgba(45,212,191,0.35)" }}
    >
      <div className="relative overflow-hidden rounded-[2.15rem] bg-white">
        <div className="relative flex h-7 items-center justify-between bg-white px-5 text-[10px] font-semibold text-slate-900">
          <span>{time}</span>
          <span className="absolute left-1/2 top-1.5 h-[18px] w-[30%] -translate-x-1/2 rounded-full bg-black" />
          <span className="flex items-center gap-1">
            <svg width="14" height="9" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
            <svg width="20" height="10" viewBox="0 0 26 12" fill="none"><rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="currentColor" opacity=".45" /><rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor" /><rect x="23.5" y="4" width="2" height="4" rx="1" fill="currentColor" opacity=".45" /></svg>
          </span>
        </div>
        <div className="relative aspect-[390/844] bg-white">{children}</div>
        <div className="pointer-events-none absolute bottom-1.5 left-1/2 h-1 w-1/3 -translate-x-1/2 rounded-full bg-black/25" />
      </div>
    </div>
  );
}

/** Muted, looping clip that only downloads and plays while it is on screen. */
export function LoopVideo({ src, poster, label, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // React doesn't write the `muted` attribute, which browsers need before they allow autoplay
    v.muted = true;
    v.defaultMuted = true;
    const play = () => {
      if (!v.getAttribute("src")) v.setAttribute("src", src);
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    if (typeof IntersectionObserver === "undefined") { play(); return; }
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : v.pause()), { rootMargin: "200px" });
    io.observe(v);
    return () => io.disconnect();
  }, [src]);
  return (
    <video
      ref={ref}
      className={`block h-full w-full object-cover object-top ${className}`}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    />
  );
}
