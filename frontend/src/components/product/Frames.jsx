import React, { useEffect, useRef } from "react";

/** A light browser window around a product screenshot or video. */
export function BrowserFrame({ children, url = "app.buildwithinfovion.com", className = "", dark = false }) {
  return (
    <div
      className={`rounded-2xl overflow-hidden ring-1 ${dark ? "ring-white/10 bg-[#1c1a18]" : "ring-black/5 bg-white"} ${className}`}
      style={{ boxShadow: "0 40px 120px -30px rgba(20,14,10,0.55), 0 18px 40px -20px rgba(20,14,10,0.35)" }}
    >
      <div className={`flex items-center gap-3 px-4 h-9 border-b ${dark ? "border-white/10 bg-[#24211e]" : "border-black/5 bg-[#f6f3f1]"}`}>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className={`flex-1 max-w-sm mx-auto h-5 rounded-md text-[11px] flex items-center justify-center gap-1.5 ${dark ? "bg-white/5 text-white/40" : "bg-white text-black/40 ring-1 ring-black/5"}`}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
          {url}
        </div>
        <div className="w-12" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

/** A phone around a mobile screenshot or video. */
export function PhoneFrame({ children, className = "" }) {
  return (
    <div
      className={`relative rounded-[2.4rem] bg-[#111] p-[9px] ${className}`}
      style={{ boxShadow: "0 40px 90px -25px rgba(20,14,10,0.6), inset 0 0 0 1.5px rgba(255,255,255,0.08)" }}
    >
      <div className="relative rounded-[1.9rem] overflow-hidden bg-white aspect-[390/844]">
        {children}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[34%] h-[22px] rounded-full bg-[#111]" />
      </div>
    </div>
  );
}

/** Autoplaying, muted, looping clip — the "live product" feel without a play button. */
export function LoopVideo({ src, poster, label, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    // React doesn't write the `muted` attribute, which browsers need before they allow autoplay
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, [src]);
  return (
    <video
      ref={ref}
      className={`block w-full h-full object-cover object-top ${className}`}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    />
  );
}
