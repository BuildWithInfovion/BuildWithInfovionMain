// What we build, shown rather than listed: six cells of different sizes, each with a small scene
// of the thing itself running. The scenes are decoration for sighted visitors (aria-hidden); the
// heading and sentence in each cell carry the meaning, and the whole cell is one link.
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cell({ to, title, body, className = "", children }) {
  return (
    <Link to={to} className={`panel group relative flex flex-col overflow-hidden rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300 ${className}`}>
      <div aria-hidden="true" className="relative min-h-0 flex-1">{children}</div>
      <div className="relative border-t border-white/[0.06] p-6">
        <h3 className="font-display text-lg text-white">{title}</h3>
        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-slate-400">{body}</p>
      </div>
    </Link>
  );
}

// 1. An assistant taking a booking on WhatsApp
const CHAT = [
  ["in", "Hi, is Dr Mehta free tomorrow morning?"],
  ["out", "Dr. Mehta has 10:30 am and 11:45 am tomorrow. Shall I book one?"],
  ["in", "10:30 please"],
  ["out", "Booked for 10:30 am. I will remind you in the morning."],
  ["tag", "Written to the clinic's calendar"],
];
function ChatScene() {
  return (
    <div className="loop-steps flex h-full min-h-[18rem] flex-col justify-end gap-2.5 p-6 sm:p-8" style={{ "--loop": "13s" }}>
      {CHAT.map(([who, t], i) => who === "tag"
        ? <p key={t} style={{ "--i": i }} className="mt-1 w-fit rounded-md border border-sky-300/25 bg-sky-300/10 px-2.5 py-1 font-mono text-[11px] text-sky-200">{t}</p>
        : <p key={t} style={{ "--i": i }} className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-snug ${who === "in" ? "rounded-bl-md bg-white/[0.07] text-slate-200" : "ml-auto rounded-br-md bg-sky-400/20 text-sky-50"}`}>{t}</p>)}
    </div>
  );
}

// 2. An invoice being read and checked
const FIELDS = [["Supplier", "Shree Polymers Pvt Ltd"], ["GSTIN", "27ABCDS1234F1Z5"], ["Taxable value", "₹72,000.00"], ["GST 18%", "₹12,960.00"], ["Total", "₹84,960.00"]];
function InvoiceScene() {
  return (
    <div className="grid h-full grid-cols-[0.8fr_1fr] gap-4 p-6">
      <div className="relative overflow-hidden rounded-lg bg-slate-100 p-3">
        <div className="h-2 w-1/2 rounded bg-slate-400" />
        <div className="mt-3 space-y-1.5">{[90, 70, 80, 60, 85, 50, 75].map((w, i) => <div key={i} className="h-1.5 rounded bg-slate-300" style={{ width: `${w}%` }} />)}</div>
        <div className="mt-3 ml-auto h-2 w-1/3 rounded bg-slate-400" />
        <div className="scan-line absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-transparent via-sky-400/40 to-transparent" style={{ "--travel": "130px" }} />
      </div>
      <dl className="loop-steps space-y-2 self-center font-mono text-[11px]" style={{ "--loop": "11s" }}>
        {FIELDS.map(([k, v], i) => (
          <div key={k} style={{ "--i": i * 0.6 }}><dt className="text-slate-500">{k}</dt><dd className="truncate text-slate-100">{v}</dd></div>
        ))}
      </dl>
    </div>
  );
}

// 3. The working day in four cities, from the visitor's own clock
const CITIES = [["Pune", "Asia/Kolkata"], ["Dubai", "Asia/Dubai"], ["London", "Europe/London"], ["New York", "America/New_York"]];
function ClockScene() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  const hourIn = (tz) => (now ? Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hour12: false, timeZone: tz }).format(now)) % 24 : 0);
  return (
    <ul className="flex h-full flex-col justify-center gap-3 p-6">
      {CITIES.map(([city, tz]) => {
        const h = hourIn(tz);
        const working = now && h >= 9 && h < 18;
        return (
          <li key={city} className="grid grid-cols-[5rem_1fr_3.5rem] items-center gap-3 text-sm">
            <span className="text-slate-300">{city}</span>
            <span className="relative h-1.5 rounded-full bg-white/[0.07]">
              <span className="absolute inset-y-0 rounded-full bg-white/20" style={{ left: `${(9 / 24) * 100}%`, width: `${(9 / 24) * 100}%` }} />
              {now && <span className={`absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-[#0b0d12] ${working ? "bg-sky-300" : "bg-slate-500"}`} style={{ left: `${((h + now.getMinutes() / 60) / 24) * 100}%` }} />}
            </span>
            <span className="text-right font-mono text-xs text-slate-400">{now ? new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(now) : "--:--"}</span>
          </li>
        );
      })}
    </ul>
  );
}

// 4. A real screen from the parent app, on a phone
function PhoneScene() {
  return (
    <div className="flex h-full min-h-[15rem] items-end justify-center overflow-hidden px-6 pt-8">
      <div className="w-44 overflow-hidden rounded-t-[1.6rem] border border-b-0 border-white/15 bg-white p-1.5 pb-0">
        <div className="h-52 overflow-hidden rounded-t-[1.2rem]">
          <img src="/product/parent-home-360.webp" alt="" width="360" height="780" loading="lazy" decoding="async" className="slow-rise w-full" />
        </div>
      </div>
    </div>
  );
}

// 5. A weighbridge ticket being written
const TRUCKS = [["MH12 QW 4471", "20 mm", "24.36 t"], ["MH14 GT 9082", "Crushed sand", "18.92 t"], ["MH12 KL 2210", "GSB", "26.10 t"], ["MH42 AB 7713", "10 mm", "19.48 t"]];
function LedgerScene() {
  return (
    <div className="flex h-full flex-col justify-center p-6 font-mono text-[11px]">
      <p className="mb-3 flex items-center gap-2 text-slate-500"><span className="blink h-1.5 w-1.5 rounded-full bg-sky-300" />Weighbridge, live</p>
      <ul className="loop-steps divide-y divide-white/[0.06]" style={{ "--loop": "10s" }}>
        {TRUCKS.map(([v, m, w], i) => (
          <li key={v} style={{ "--i": i * 0.8 }} className="grid grid-cols-[1fr_auto_auto] gap-3 py-2"><span className="text-slate-200">{v}</span><span className="text-slate-500">{m}</span><span className="text-sky-200">{w}</span></li>
        ))}
      </ul>
    </div>
  );
}

// 6. A month of uptime
function UptimeScene() {
  return (
    <div className="flex h-full flex-col justify-center p-6">
      <div className="flex h-12 items-end gap-[3px]">
        {Array.from({ length: 30 }, (_, i) => <span key={i} className={`flex-1 rounded-sm ${i === 17 ? "h-1/2 bg-amber-300/70" : "h-full bg-sky-300/60"}`} />)}
      </div>
      <p className="mt-3 flex justify-between font-mono text-[11px] text-slate-500"><span>30 days</span><span>backup 02:00, restored and checked</span></p>
    </div>
  );
}

export default function Bento() {
  return (
    <div className="mt-12 grid gap-4 lg:grid-cols-12">
      <Cell to="/services/ai-agent-development" className="lg:col-span-7 lg:row-span-2" title="AI agents on WhatsApp, chat and voice"
        body="Assistants that answer from your own information, book and update in your systems, and pass to a person when they should."><ChatScene /></Cell>
      <Cell to="/services/ai-automation" className="lg:col-span-5" title="Documents read and posted for you"
        body="Invoices, forms and orders extracted, checked against your rules and entered into Tally or your ERP."><InvoiceScene /></Cell>
      <Cell to="/services/offshore-software-development-india" className="lg:col-span-5" title="A team inside your working day"
        body="For clients abroad: developers in Pune whose hours overlap yours, quoted in your currency."><ClockScene /></Cell>
      <Cell to="/services/mobile-app-development" className="lg:col-span-4" title="Mobile apps people actually open"
        body="Android, iOS and installable web apps, with payments, notifications and offline use."><PhoneScene /></Cell>
      <Cell to="/services/erp-crm-development" className="lg:col-span-4" title="ERP shaped around your operation"
        body="Stock, sales, production and accounts in one system, connected to the equipment on your floor."><LedgerScene /></Cell>
      <Cell to="/services/software-maintenance-support" className="lg:col-span-4" title="Software that stays up"
        body="Maintenance contracts with monitoring, tested backups and response times in writing."><UptimeScene /></Cell>
    </div>
  );
}
