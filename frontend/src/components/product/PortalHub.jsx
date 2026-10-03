import React from "react";
import { BadgeCheck, BookOpen, Briefcase, Calculator, Crown, Headset, Home, Wrench } from "lucide-react";

const NODES = [
  { label: "Director", icon: Crown },
  { label: "Principal", icon: BadgeCheck },
  { label: "Operator", icon: Briefcase },
  { label: "Accountant", icon: Calculator },
  { label: "Reception", icon: Headset },
  { label: "Teacher", icon: BookOpen },
  { label: "Staff", icon: Wrench },
  { label: "Parent", icon: Home },
];

/** Eight role portals wired to one school core, with light travelling along the wires. */
export default function PortalHub() {
  const W = 640, H = 420, cx = W / 2, cy = H / 2, rx = 255, ry = 165;
  const pts = NODES.map((n, i) => {
    const a = (-90 + (360 / NODES.length) * i) * (Math.PI / 180);
    return { ...n, x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) };
  });
  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden>
        <defs>
          <linearGradient id="beam" x1="0" x2="1">
            <stop offset="0" stopColor="#5eead4" />
            <stop offset="1" stopColor="#818cf8" />
          </linearGradient>
          <radialGradient id="core">
            <stop offset="0" stopColor="#2dd4bf" stopOpacity=".55" />
            <stop offset="1" stopColor="#2dd4bf" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r="120" fill="url(#core)" />
        {pts.map((p, i) => (
          <g key={p.label}>
            <line x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(148,163,184,.16)" strokeWidth="1" />
            <line x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="url(#beam)" strokeWidth="2" strokeLinecap="round" className="beam-dash" style={{ animationDelay: `${i * 0.4}s` }} />
          </g>
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-3xl glass ring-1 ring-teal-400/40 shadow-[0_0_60px_-5px_rgba(45,212,191,0.6)]">
        <img src="/logo.png" alt="" className="h-14 w-auto drop-shadow-[0_0_12px_rgba(94,234,212,0.6)]" />
        <span className="mt-1 text-[11px] font-bold tracking-wide text-white">Infovion</span>
      </div>
      {pts.map((p) => {
        const Icon = p.icon;
        return (
          <div key={p.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` }}>
            <div className="glass flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-semibold text-white sm:px-3 sm:text-xs">
              <Icon className="h-3.5 w-3.5 text-teal-300" /> {p.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
