import React, { useEffect, useRef, useState } from "react";
import { Play, Volume2 } from "lucide-react";
import { track } from "../../lib/analytics";

/** Chapter times of the Infovion product film (brag.mp4 timeline). */
const CHAPTERS = [
  { t: 0, label: "The problem" },
  { t: 16.2, label: "Meet Infovion" },
  { t: 28.2, label: "Admissions" },
  { t: 42.8, label: "Attendance" },
  { t: 53.9, label: "Timetable" },
  { t: 62.1, label: "Exams & report cards" },
  { t: 72.0, label: "Fees" },
  { t: 96.1, label: "Parent portal" },
  { t: 109.5, label: "Announcements & calendar" },
  { t: 118.4, label: "Certificates" },
  { t: 130.3, label: "Staff & salary" },
  { t: 141.5, label: "Principal & director" },
  { t: 153.9, label: "Year-end promotion" },
  { t: 159.6, label: "Roles & security" },
  { t: 171.3, label: "Why Infovion" },
  { t: 243.3, label: "Pricing" },
];
const mmss = (t) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

/** The full 4-minute product film — voice-over, music and captions. */
export default function FilmPlayer() {
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
    v.muted = false; // the visitor clicked, so sound is allowed
    track("film_play", { from_seconds: Math.round(t) });
    v.currentTime = t;
    void v.play();
    setStarted(true);
  };
  const active = CHAPTERS.reduce((a, c, i) => (now >= c.t ? i : a), 0);

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_270px]">
      <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10" style={{ boxShadow: "0 60px 160px -50px rgba(34,211,238,0.5)" }}>
        <div className="relative aspect-video bg-black">
          <video
            ref={ref}
            className="h-full w-full"
            src="/film/infovion-film-v2.mp4"
            playsInline
            controls={started}
            preload="none"
            onEnded={() => setStarted(false)}
          >
            {/* captions are burned in; this text track is for screen readers, search and AI engines */}
            <track kind="captions" srcLang="en" label="English" src="/film/infovion-film-v2.vtt" />
          </video>
          {/* the cover is a lazy image rather than a video poster, so it doesn't load with the page */}
          {!started && <img src="/film/infovion-film-poster.webp" alt="" loading="lazy" width="1280" height="720" className="absolute inset-0 h-full w-full object-cover" />}
          {!started && (
            <button type="button" onClick={() => play(0)} aria-label="Play the Infovion film with sound"
              className="group absolute inset-0 flex flex-col items-center justify-center gap-5 bg-gradient-to-t from-[#05070d]/80 via-[#05070d]/20 to-transparent">
              <span className="relative flex h-24 w-24 items-center justify-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-teal-400/30" />
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-300 to-cyan-500 shadow-[0_0_60px_10px_rgba(45,212,191,0.45)] transition-transform group-hover:scale-110" />
                <Play className="relative h-9 w-9 translate-x-[2px] text-[#04121a]" fill="currentColor" />
              </span>
              <span className="glass rounded-full px-4 py-2 text-sm font-semibold text-white">
                <Volume2 className="mr-1.5 inline h-4 w-4 text-teal-300" /> Watch the 4-minute film · with sound
              </span>
            </button>
          )}
        </div>
      </div>

      <ol className="glass max-h-[460px] overflow-y-auto rounded-3xl p-2 [scrollbar-width:thin]">
        {CHAPTERS.map((c, i) => {
          const on = started && i === active;
          return (
            <li key={c.label}>
              <button type="button" onClick={() => play(c.t)}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm transition-colors ${on ? "bg-teal-400/15 text-white" : "text-slate-300 hover:bg-white/5"}`}>
                <span className={`w-10 font-mono text-[11px] ${on ? "text-teal-300" : "text-slate-500"}`}>{mmss(c.t)}</span>
                <span className="flex-1">{c.label}</span>
                {on && <span className="h-1.5 w-1.5 rounded-full bg-teal-300 shadow-[0_0_8px_2px_rgba(94,234,212,0.8)]" />}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
