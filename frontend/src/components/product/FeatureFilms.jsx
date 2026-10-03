import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import {
  UserPlus, CalendarCheck, Clock3, FileBarChart, IndianRupee, Users, Megaphone, FileText, BriefcaseBusiness, LineChart, ShieldCheck, Volume2, VolumeX,
} from "lucide-react";

const FEATURES = [
  { id: "fees", icon: IndianRupee, title: "Fees", line: "Plans, concessions, every payment mode, receipts and defaulters." },
  { id: "attendance", icon: CalendarCheck, title: "Attendance", line: "Teachers mark their classes in a few taps." },
  { id: "parent", icon: Users, title: "Parent portal", line: "Attendance, marks, fees and notices — the same day." },
  { id: "admission", icon: UserPlus, title: "Admissions", line: "From first inquiry to enrolled student, or a whole school by import." },
  { id: "exams", icon: FileBarChart, title: "Exams & report cards", line: "Marks by subject; report cards on your letterhead." },
  { id: "documents", icon: FileText, title: "Certificates", line: "TC, bonafide, character certificates and ID cards." },
  { id: "leaders", icon: LineChart, title: "Principal & director", line: "The whole school at a glance." },
  { id: "timetable", icon: Clock3, title: "Timetable", line: "Weekly timetable and substitute covers in seconds." },
  { id: "staff", icon: BriefcaseBusiness, title: "Staff & salary", line: "Staff attendance, salary structures and slips." },
  { id: "calendar", icon: Megaphone, title: "Announcements", line: "One notice to every portal, one shared calendar." },
  { id: "security", icon: ShieldCheck, title: "Roles & security", line: "A portal per role, an audit log, two-step sign-in." },
];

/**
 * One short film per feature (cut from the product film, with voice-over and
 * captions). Plays muted and moves to the next feature on its own until the
 * visitor picks one; sound turns on with one tap.
 */
export default function FeatureFilms() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  const f = FEATURES[i];

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = muted;
    v.defaultMuted = muted;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, [i, muted]);

  const pick = (idx) => { setI(idx); setAuto(false); setProgress(0); };
  const onEnded = () => { setProgress(0); setI((x) => (auto ? (x + 1) % FEATURES.length : x)); };

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[330px_minmax(0,1fr)]">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1" role="tablist" aria-label="Features">
        {FEATURES.map((x, idx) => {
          const Icon = x.icon;
          const on = idx === i;
          return (
            <button key={x.id} type="button" role="tab" aria-selected={on} onClick={() => pick(idx)}
              className={`relative overflow-hidden rounded-2xl px-4 py-3 text-left transition-all ${on ? "glass ring-1 ring-teal-400/40" : "hover:bg-white/[0.04]"}`}>
              <span className="flex items-center gap-3">
                <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl ${on ? "bg-gradient-to-br from-teal-300 to-cyan-500 text-[#04121a]" : "bg-white/[0.06] text-slate-300"}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <span className={`text-sm font-semibold ${on ? "text-white" : "text-slate-300"}`}>{x.title}</span>
              </span>
              {on && <span className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-teal-300 to-indigo-400" style={{ width: `${progress * 100}%` }} />}
            </button>
          );
        })}
      </div>

      <div className="lg:sticky lg:top-28">
        <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10" style={{ boxShadow: "0 50px 140px -50px rgba(45,212,191,0.55)" }}>
          <div className="relative aspect-video bg-black">
            <AnimatePresence mode="wait">
              <Motion.video
                key={f.id}
                ref={ref}
                className="h-full w-full object-cover"
                src={`/film/${f.id}.mp4`}
                poster={`/film/${f.id}.webp`}
                autoPlay
                muted
                playsInline
                preload="metadata"
                onEnded={onEnded}
                onTimeUpdate={(e) => setProgress(e.currentTarget.duration ? e.currentTarget.currentTime / e.currentTarget.duration : 0)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              />
            </AnimatePresence>
            <button type="button" onClick={() => setMuted((m) => !m)}
              className="glass absolute bottom-4 right-4 flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/10">
              {muted ? <><VolumeX className="h-4 w-4" /> Turn sound on</> : <><Volume2 className="h-4 w-4 text-teal-300" /> Sound on</>}
            </button>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-400"><span className="font-semibold text-white">{f.title}.</span> {f.line}</p>
      </div>
    </div>
  );
}
