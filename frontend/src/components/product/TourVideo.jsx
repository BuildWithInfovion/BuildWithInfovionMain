import React, { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { BrowserFrame } from "./Frames";

/**
 * The product tour. Real screen recording of a demo school.
 * To use your own film (e.g. a YouTube walkthrough), set YOUTUBE_ID below.
 */
const YOUTUBE_ID = ""; // e.g. "dQw4w9WgXcQ"

const CHAPTERS = [
  { t: 0, label: "Dashboard", note: "The whole school at a glance" },
  { t: 5, label: "Collect a fee", note: "Search, tick dues, receipt in seconds" },
  { t: 20, label: "Attendance", note: "Marked by teachers on their phones" },
  { t: 27, label: "Transport", note: "Routes, stops and fares" },
  { t: 34, label: "Director view", note: "Collections, dues and alerts" },
];

export default function TourVideo() {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const [now, setNow] = useState(0);

  useEffect(() => {
    const v = ref.current;
    if (!v) return undefined;
    const onTime = () => setNow(v.currentTime);
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, []);

  const play = (t = 0) => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = t;
    v.muted = true;
    void v.play();
    setStarted(true);
  };

  const active = CHAPTERS.reduce((a, c, i) => (now >= c.t ? i : a), 0);

  if (YOUTUBE_ID) {
    return (
      <BrowserFrame dark url="youtube.com">
        <div className="aspect-video">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?rel=0&modestbranding=1`}
            title="Infovion product tour"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </BrowserFrame>
    );
  }

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_260px] gap-6 items-start">
      <BrowserFrame dark>
        <div className="relative aspect-[1280/800] bg-black">
          <video
            ref={ref}
            className="w-full h-full object-cover"
            src="/product/product-tour.mp4"
            poster="/product/product-tour-poster.webp"
            playsInline
            controls={started}
            preload="none"
            onEnded={() => setStarted(false)}
          />
          {!started && (
            <button
              type="button"
              onClick={() => play(0)}
              className="group absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/55 via-black/10 to-transparent"
              aria-label="Play the product tour"
            >
              <span className="flex items-center gap-3 rounded-full bg-white/95 pl-2 pr-6 py-2 shadow-2xl transition-transform group-hover:scale-105">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-terra text-white">
                  <Play className="h-5 w-5 translate-x-[1px]" fill="currentColor" />
                </span>
                <span className="text-left">
                  <span className="block font-display text-base font-bold text-brand-darker">Watch the 48-second tour</span>
                  <span className="block text-xs text-brand-neutral">Real screens · no sound needed</span>
                </span>
              </span>
            </button>
          )}
        </div>
      </BrowserFrame>

      <ol className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
        {CHAPTERS.map((c, i) => (
          <li key={c.label}>
            <button
              type="button"
              onClick={() => play(c.t)}
              className={`w-full text-left rounded-xl px-4 py-3 transition-colors ring-1 ${
                started && i === active
                  ? "bg-brand-terra/15 ring-brand-terra/50"
                  : "bg-white/[0.03] ring-white/10 hover:bg-white/[0.06]"
              }`}
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-white">
                <span className="font-mono text-[11px] text-brand-accent/80">0:{String(c.t).padStart(2, "0")}</span>
                {c.label}
              </span>
              <span className="mt-0.5 block text-xs text-white/50">{c.note}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
