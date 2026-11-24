// What we build, shown rather than listed. Pattern adapted from "Bento Mini UI" (21st.dev/@sajad):
// each card's small interface plays once when it scrolls into view and then stays complete, so the
// grid never shows a half-empty card. The scenes are decoration for sighted visitors (aria-hidden);
// the heading and sentence in each card carry the meaning, and the whole card is one link.
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { motion as Motion, useInView, useReducedMotion } from "framer-motion";
import GlowingEffect from "./GlowingEffect";

const ease = [0.16, 1, 0.3, 1];

function Card({ to, title, body, className = "", children }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.45 });
  const reduce = useReducedMotion();
  const on = seen || reduce;
  return (
    <Link ref={ref} to={to} className={`panel group relative block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300 ${className}`}>
      <GlowingEffect />
      <div className="relative flex h-full flex-col overflow-hidden rounded-[inherit]">
        <div aria-hidden="true" className="relative flex h-[300px] items-center justify-center overflow-hidden px-5 py-6 sm:px-6 [mask-image:linear-gradient(to_bottom,#000_90%,transparent)]">
          {children(on)}
        </div>
        <div className="relative mt-auto border-t border-white/[0.06] p-6 sm:p-7">
          <h3 className="font-display text-lg text-white sm:text-xl">{title}</h3>
          <p className="mt-2 max-w-md text-[15px] leading-relaxed text-slate-400">{body}</p>
        </div>
      </div>
    </Link>
  );
}

const surface = "rounded-xl border border-white/10 bg-[#0e1524] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]";
const tick = <Check className="h-3.5 w-3.5 flex-shrink-0 text-sky-300" strokeWidth={2.4} />;

// 1. An assistant taking a booking: the conversation types in, then stays
const CHAT = [
  ["in", "Hi, is Dr Mehta free tomorrow morning?"],
  ["out", "Dr. Mehta has 10:30 am and 11:45 am tomorrow. Shall I book one?"],
  ["in", "10:30 please"],
  ["out", "Booked for 10:30 am. I will remind you in the morning."],
];
function ChatScene({ on }) {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      {CHAT.map(([who, t], i) => (
        <Motion.p key={t} initial={{ opacity: 0, y: 14 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.45 }}
          className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug sm:text-sm ${who === "in" ? "rounded-bl-md bg-white/[0.07] text-slate-200" : "ml-auto rounded-br-md bg-sky-400/20 text-sky-50"}`}>{t}</Motion.p>
      ))}
      <Motion.p initial={{ opacity: 0, scale: 0.85 }} animate={on ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 2.1 }}
        className="mt-1 flex w-fit items-center gap-2 rounded-md border border-sky-300/25 bg-sky-300/10 px-2.5 py-1 font-mono text-[11px] text-sky-200">{tick}Written to the clinic's calendar</Motion.p>
    </div>
  );
}

// 2. An invoice read once, fields filled, posted
const FIELDS = [["Supplier", "Shree Polymers Pvt Ltd"], ["GSTIN", "27ABCDS1234F1Z5"], ["Taxable value", "₹72,000.00"], ["GST 18%", "₹12,960.00"], ["Total", "₹84,960.00"]];
function InvoiceScene({ on }) {
  return (
    <div className="grid w-full max-w-md grid-cols-[0.85fr_1fr] items-center gap-5">
      <div className="relative overflow-hidden rounded-lg bg-slate-100 p-3">
        <div className="h-2 w-1/2 rounded bg-slate-400" />
        <div className="mt-3 space-y-1.5">{[90, 70, 80, 60, 85, 50, 75].map((w, i) => <div key={i} className="h-1.5 rounded bg-slate-300" style={{ width: `${w}%` }} />)}</div>
        <div className="ml-auto mt-3 h-2 w-1/3 rounded bg-slate-400" />
        <Motion.div initial={{ y: "-40%", opacity: 0 }} animate={on ? { y: ["-40%", "520%"], opacity: [0, 1, 1, 0] } : {}} transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }}
          className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-transparent via-sky-400/45 to-transparent" />
      </div>
      <div>
        <dl className="space-y-1.5 font-mono text-[11px]">
          {FIELDS.map(([k, v], i) => (
            <Motion.div key={k} initial={{ opacity: 0, x: 10 }} animate={on ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.45, ease, delay: 0.5 + i * 0.22 }}>
              <dt className="text-slate-500">{k}</dt><dd className="truncate text-slate-100">{v}</dd>
            </Motion.div>
          ))}
        </dl>
        <Motion.p initial={{ opacity: 0, scale: 0.8 }} animate={on ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.45, delay: 1.9 }}
          className="mt-3 flex w-fit items-center gap-1.5 rounded-md bg-emerald-400/15 px-2 py-1 font-mono text-[11px] text-emerald-200">{tick}Posted to Tally</Motion.p>
      </div>
    </div>
  );
}

// 3. The working day in four cities, from the visitor's own clock
const CITIES = [["Pune", "Asia/Kolkata"], ["Dubai", "Asia/Dubai"], ["London", "Europe/London"], ["New York", "America/New_York"]];
function ClockScene({ on }) {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  const hourIn = (tz) => (now ? Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hour12: false, timeZone: tz }).format(now)) % 24 : 0);
  return (
    <ul className={`${surface} w-full max-w-sm space-y-3.5 p-5`}>
      {CITIES.map(([city, tz], i) => {
        const h = hourIn(tz);
        const working = now && h >= 9 && h < 18;
        return (
          <Motion.li key={city} initial={{ opacity: 0, y: 10 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.12 }}
            className="grid grid-cols-[4.5rem_1fr_3rem] items-center gap-3 text-sm">
            <span className="text-slate-300">{city}</span>
            <span className="relative h-1.5 rounded-full bg-white/[0.07]">
              <span className="absolute inset-y-0 rounded-full bg-white/20" style={{ left: `${(9 / 24) * 100}%`, width: `${(9 / 24) * 100}%` }} />
              {now && <span className={`absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-[#0e1524] ${working ? "bg-sky-300" : "bg-slate-500"}`} style={{ left: `${((h + now.getMinutes() / 60) / 24) * 100}%` }} />}
            </span>
            <span className="text-right font-mono text-xs text-slate-400">{now ? new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(now) : "--:--"}</span>
          </Motion.li>
        );
      })}
    </ul>
  );
}

// 4. A real screen from the parent app, rising into view
function PhoneScene({ on }) {
  return (
    <Motion.div initial={{ y: 90, opacity: 0 }} animate={on ? { y: 34, opacity: 1 } : {}} transition={{ duration: 1, ease }}
      className="w-48 self-end overflow-hidden rounded-t-[1.7rem] border border-b-0 border-white/15 bg-white p-1.5 pb-0 shadow-[0_-20px_60px_-20px_rgba(56,182,255,0.45)]">
      <img src="/product/parent-home-360.webp" alt="" width="360" height="780" loading="lazy" decoding="async" className="block w-full rounded-t-[1.25rem]" />
    </Motion.div>
  );
}

// 5. A weighbridge feed: trucks arrive one by one and the day's total counts up
const TRUCKS = [["MH12 QW 4471", "20 mm", 24.36], ["MH14 GT 9082", "Crushed sand", 18.92], ["MH12 KL 2210", "GSB", 26.1], ["MH42 AB 7713", "10 mm", 19.48]];
function LedgerScene({ on }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!on) return undefined;
    const timers = TRUCKS.map((_, i) => setTimeout(() => setShown(i + 1), 250 + i * 380));
    return () => timers.forEach(clearTimeout);
  }, [on]);
  const total = TRUCKS.slice(0, shown).reduce((s, t) => s + t[2], 0);
  return (
    <div className={`${surface} w-full max-w-md p-5 font-mono text-[11px]`}>
      <p className="flex items-center justify-between text-slate-500"><span>Weighbridge, today</span><span className="text-sky-200">{total.toFixed(2)} t</span></p>
      <ul className="mt-3 divide-y divide-white/[0.06]">
        {TRUCKS.map(([v, m, w], i) => (
          <Motion.li key={v} initial={{ opacity: 0, x: -12 }} animate={i < shown ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, ease }}
            className="grid grid-cols-[1fr_auto_auto] gap-3 py-2"><span className="text-slate-200">{v}</span><span className="text-slate-500">{m}</span><span className="text-sky-200">{w.toFixed(2)} t</span></Motion.li>
        ))}
      </ul>
    </div>
  );
}

// 6. Maintenance: a check list where one item is flagged, then resolved
const CHECKS = ["Uptime monitor", "Nightly backup restored and checked", "Security updates applied"];
function UptimeScene({ on }) {
  const [resolved, setResolved] = useState(false);
  useEffect(() => {
    if (!on) return undefined;
    const t = setTimeout(() => setResolved(true), 2000);
    return () => clearTimeout(t);
  }, [on]);
  return (
    <Motion.div initial={{ opacity: 0, y: 30 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease }} className={`${surface} w-full max-w-md p-5`}>
      <div className="flex h-10 items-end gap-[3px]">
        {Array.from({ length: 30 }, (_, i) => (
          <Motion.span key={i} initial={{ scaleY: 0 }} animate={on ? { scaleY: 1 } : {}} transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.02 }}
            className={`flex-1 origin-bottom rounded-sm ${i === 17 && !resolved ? "h-1/2 bg-amber-300/80" : "h-full bg-sky-300/60"}`} />
        ))}
      </div>
      <ul className="mt-4 text-[13px] text-slate-300">
        {CHECKS.map((c, i) => (
          <li key={c} className="flex items-center justify-between gap-3 border-t border-white/[0.07] py-2">
            <span className="flex items-center gap-2">{i === 1 && !resolved ? <span className="h-3.5 w-3.5 rounded-full border border-amber-300" /> : tick}{c}</span>
            {i === 1 && <span className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${resolved ? "bg-white/10 text-slate-300" : "bg-amber-300 text-[#0b1424]"}`}>{resolved ? "Resolved" : "Checking"}</span>}
          </li>
        ))}
      </ul>
    </Motion.div>
  );
}

export default function Bento() {
  return (
    <div className="mt-12 grid gap-4 lg:grid-cols-12">
      <Card to="/services/ai-agent-development" className="lg:col-span-7" title="AI agents on WhatsApp, chat and voice"
        body="Assistants that answer from your own information, book and update in your systems, and pass to a person when they should.">{(on) => <ChatScene on={on} />}</Card>
      <Card to="/services/ai-automation" className="lg:col-span-5" title="Documents read and posted for you"
        body="Invoices, forms and orders extracted, checked against your rules and entered into Tally or your ERP.">{(on) => <InvoiceScene on={on} />}</Card>
      <Card to="/services/offshore-software-development-india" className="lg:col-span-5" title="A team inside your working day"
        body="For clients abroad: developers in Pune whose hours overlap yours, quoted in your currency.">{(on) => <ClockScene on={on} />}</Card>
      <Card to="/manufacturing-software-development" className="lg:col-span-7" title="ERP shaped around your operation"
        body="Stock, sales, production and accounts in one system, connected to the weighbridge, machines and tablets on your floor.">{(on) => <LedgerScene on={on} />}</Card>
      <Card to="/services/mobile-app-development" className="lg:col-span-6" title="Mobile apps people actually open"
        body="Android, iOS and installable web apps, with payments, notifications and offline use.">{(on) => <PhoneScene on={on} />}</Card>
      <Card to="/services/software-maintenance-support" className="lg:col-span-6" title="Software that stays up"
        body="Maintenance contracts with monitoring, tested backups and response times in writing.">{(on) => <UptimeScene on={on} />}</Card>
    </div>
  );
}
