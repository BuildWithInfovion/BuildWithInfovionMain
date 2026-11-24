// "Who we build for": five cards that pin one over another as the visitor scrolls, the earlier
// ones easing back like a deck. Each audience has its own colour and its own small moving picture,
// so the cards do not read as one template repeated. Phones and reduced motion get a plain stack.
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const AUD = [
  {
    key: "business", hue: "#38b6ff", who: "Businesses and manufacturers",
    promise: "Replace the spreadsheets, calls and paper that run your operations.",
    rows: ["ERP, production and shop-floor systems", "CRM, dealer and customer portals", "Billing and inventory, with Tally integration", "AI agents and WhatsApp automation"],
    links: [["/manufacturing-software-development", "Manufacturing"], ["/services/erp-crm-development", "ERP and CRM"]],
  },
  {
    key: "tender", hue: "#f5b942", who: "Tender bidders and system integrators",
    promise: "Won a tender with a software scope, or about to bid on one? We are the technology team behind your bid.",
    rows: ["Technical proposal, architecture and compliance matrix before you bid", "Portals, apps and MIS built to the SRS, for government or private buyers", "Accessibility, security audit and acceptance testing, through to sign-off", "Delivered under your name and maintained under the AMC"],
    note: "You hold the contract and the eligibility; we work under an NDA as your development partner.",
    links: [["/software-partner-for-government-tenders", "Tender partners"], ["/company-profile", "Company profile"]],
  },
  {
    key: "public", hue: "#34d399", who: "Institutions and government",
    promise: "Portals, dashboards and services that pass accessibility and security review.",
    rows: ["GIGW 3.0 websites and citizen service portals", "MIS dashboards for departments and PSUs", "School ERP for K-12 schools, in daily use", "Data hosted in India"],
    links: [["/government", "Government"], ["/school-management-software", "School ERP"]],
  },
  {
    key: "abroad", hue: "#a78bfa", who: "Companies outside India",
    promise: "A senior team in Pune, a fixed price, and working hours that overlap with yours.",
    rows: ["MVPs and product builds for startups", "Dedicated developers on a monthly contract", "Prices in your currency and contracts signed remotely", "Overlap with the Gulf, the UK and Europe; calls for the Americas"],
    links: [["/offshore-software-development-usa", "United States"], ["/offshore-software-development-uk", "United Kingdom"], ["/offshore-software-development-dubai-uae", "UAE"]],
  },
  {
    key: "security", hue: "#2dd4bf", who: "Security teams and banks",
    promise: "Cyvion investigates every alert your SIEM and EDR raise, with the evidence behind each verdict.",
    rows: ["Every alert triaged, nothing left in the queue", "Exposure ranked by known exploitation", "Incident reports drafted for CERT-In's six-hour clock", "Hosted, or inside your own network"],
    note: "Cyvion is our own platform, in early access.",
    links: [["/cyvion", "Cyvion"], ["/cyvion/banks-financial-services", "Banks and finance"]],
  },
];

// ── one small moving picture per audience (decorative) ────────────────────
function Art({ k, hue }) {
  const common = { viewBox: "0 0 320 240", className: "h-full w-full", "aria-hidden": true };
  if (k === "business") return (
    <svg {...common}>
      <path d="M20 170H300" stroke="rgba(255,255,255,.15)" strokeWidth="2" />
      <g className="aud-belt">{[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={-40 + i * 70} y="138" width="44" height="32" rx="5" fill="none" stroke={hue} strokeWidth="2" opacity={0.35 + (i % 3) * 0.2} />)}</g>
      <circle cx="160" cy="78" r="44" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="8" />
      <circle cx="160" cy="78" r="44" fill="none" stroke={hue} strokeWidth="8" strokeLinecap="round" strokeDasharray="276" className="aud-gauge" transform="rotate(-90 160 78)" />
      <text x="160" y="85" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="600">87%</text>
      <text x="160" y="212" textAnchor="middle" fill="#94a3b8" fontSize="12" className="font-mono">line efficiency, sample</text>
    </svg>
  );
  if (k === "tender") return (
    <svg {...common}>
      <rect x="70" y="20" width="180" height="200" rx="10" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.16)" />
      <text x="88" y="48" fill="#fff" fontSize="13" fontWeight="600">Technical bid</text>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i} className="aud-row" style={{ "--i": i }}>
          <rect x="88" y={66 + i * 22} width={110 - (i % 3) * 18} height="7" rx="3.5" fill="rgba(255,255,255,.22)" />
          <rect x="214" y={64 + i * 22} width="18" height="11" rx="3" fill={hue} opacity=".85" />
        </g>
      ))}
      <g className="aud-stamp"><rect x="150" y="186" width="92" height="26" rx="5" fill="none" stroke={hue} strokeWidth="2" transform="rotate(-8 196 199)" />
        <text x="196" y="204" textAnchor="middle" fill={hue} fontSize="11" fontWeight="700" transform="rotate(-8 196 199)" letterSpacing="1">COMPLIANT</text></g>
    </svg>
  );
  if (k === "public") return (
    <svg {...common}>
      <path d="M60 80L160 30L260 80Z" fill="none" stroke={hue} strokeWidth="2" />
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={80 + i * 40} y="92" width="14" height="90" rx="3" fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="2" className="aud-col" style={{ "--i": i }} />)}
      <path d="M50 194H270" stroke="rgba(255,255,255,.25)" strokeWidth="2" />
      <rect x="196" y="140" width="76" height="50" rx="10" fill="#0b0f18" stroke={hue} strokeWidth="2" />
      <text x="234" y="172" textAnchor="middle" fill={hue} fontSize="18" fontWeight="700">AA</text>
    </svg>
  );
  if (k === "abroad") return (
    <svg {...common}>
      <circle cx="160" cy="120" r="88" fill="none" stroke="rgba(255,255,255,.12)" />
      <ellipse cx="160" cy="120" rx="40" ry="88" fill="none" stroke="rgba(255,255,255,.08)" />
      <path d="M72 120H248M84 76H236M84 164H236" stroke="rgba(255,255,255,.08)" />
      {[["M200 132 Q150 60 96 92", 0], ["M200 132 Q230 70 258 96", 1], ["M200 132 Q130 150 74 118", 2]].map(([d, i]) => (
        <g key={i}><path d={d} fill="none" stroke={hue} strokeWidth="1.6" strokeDasharray="3 5" opacity=".7" />
          <circle r="3.5" fill="#fff"><animateMotion dur={`${2.6 + i * 0.5}s`} repeatCount="indefinite" path={d} /></circle></g>
      ))}
      <circle cx="200" cy="132" r="5" fill="#fff" />
      <text x="208" y="150" fill="#cbd5e1" fontSize="11" className="font-mono">Pune</text>
    </svg>
  );
  return (
    <svg {...common}>
      {[30, 60, 90].map((r) => <circle key={r} cx="160" cy="120" r={r} fill="none" stroke="rgba(255,255,255,.1)" />)}
      <g className="aud-sweep" style={{ transformOrigin: "160px 120px" }}><path d="M160 120L160 30A90 90 0 0 1 238 75Z" fill={hue} opacity=".18" /><path d="M160 120L160 30" stroke={hue} strokeWidth="2" /></g>
      {[[200, 70], [110, 150], [215, 160], [130, 82]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" fill={i === 0 ? "#f87171" : hue} className="aud-blip" style={{ "--i": i }} />)}
    </svg>
  );
}

function Card({ a, i, total, progress, pinned }) {
  const target = 1 - (total - i - 1) * 0.045;
  const scale = useTransform(progress, [i / total, 1], [1, pinned ? target : 1]);
  const dim = useTransform(progress, [i / total, 1], [0, pinned ? Math.min(0.55, (total - i - 1) * 0.14) : 0]);
  return (
    <div className={pinned ? "sticky flex items-start" : ""} style={pinned ? { top: `calc(96px + ${i * 22}px)`, height: "calc(100svh - 120px)" } : undefined}>
      <Motion.article style={{ scale, transformOrigin: "50% 0%", "--hue": a.hue }}
        className="aud-card relative grid w-full overflow-hidden rounded-[22px] border border-white/10 bg-[#0a0d14] lg:grid-cols-[1.25fr_0.75fr]">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${a.hue}, transparent)` }} />
        <div className="relative p-7 sm:p-10">
          <p className="flex items-baseline gap-3"><span className="font-mono text-sm" style={{ color: a.hue }}>{String(i + 1).padStart(2, "0")}</span><span className="text-sm text-slate-300">{a.who}</span></p>
          <h3 className="font-display mt-4 max-w-xl text-2xl leading-[1.15] text-white sm:text-[2.1rem]">{a.promise}</h3>
          <ul className="mt-7 grid gap-x-8 border-t border-white/10 sm:grid-cols-2">
            {a.rows.map((r) => <li key={r} className="border-b border-white/10 py-3 text-[15px] leading-snug text-slate-300">{r}</li>)}
          </ul>
          {a.note && <p className="mt-4 text-sm text-slate-400">{a.note}</p>}
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {a.links.map(([to, t]) => <Link key={to} to={to} className="text-sm font-medium text-white underline decoration-white/25 underline-offset-4 hover:decoration-white">{t}</Link>)}
          </p>
        </div>
        <div className="relative hidden min-h-[16rem] border-l border-white/[0.06] lg:block" style={{ background: `radial-gradient(70% 60% at 50% 45%, ${a.hue}1f, transparent 70%)` }}>
          <div className="absolute inset-8"><Art k={a.key} hue={a.hue} /></div>
        </div>
        <Motion.span aria-hidden="true" style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-[#05060a]" />
      </Motion.article>
    </div>
  );
}

export default function Audiences() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Pinning needs room: wide screens only. Phones get the cards one after another.
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (min-height: 640px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const pinned = wide && !reduce;
  return (
    <section id="who" data-rv="" className="relative scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <p className="kicker-pill">Who we build for</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display max-w-2xl text-[2rem] leading-[1.08] text-white sm:text-5xl">Five kinds of client, one engineering team</h2>
          <p className="max-w-sm text-sm leading-relaxed text-slate-400">The same people plan, build and support every project, whoever it is for.</p>
        </div>
        <div ref={ref} className={`mt-12 ${pinned ? "pb-[8vh]" : "space-y-6"}`}>
          {AUD.map((a, i) => <Card key={a.key} a={a} i={i} total={AUD.length} progress={scrollYProgress} pinned={pinned} />)}
        </div>
      </div>
    </section>
  );
}
