import React, { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { CalendarCheck, Bus, IndianRupee, LayoutDashboard, LineChart, Check } from "lucide-react";
import { BrowserFrame } from "./Frames";

const TABS = [
  {
    key: "fees",
    icon: IndianRupee,
    title: "Fee collection",
    lead: "Every instalment, concession and receipt — without the ledger.",
    points: [
      "Fee plans by class with term-wise or monthly instalments",
      "Tick what the parent is paying, choose cash, UPI or cheque — receipt prints instantly",
      "Overdue dues highlighted; defaulter list and daily collection report ready",
      "Bring in balances from the old ledger when you switch",
    ],
    img: "/product/fees.webp",
    alt: "Fee ledger for a student showing paid, overdue and upcoming instalments",
  },
  {
    key: "attendance",
    icon: CalendarCheck,
    title: "Attendance",
    lead: "Teachers mark it on their phone. The office sees it live.",
    points: [
      "One tap per student: present, absent, late, leave",
      "Today's progress by class — know who hasn't marked yet",
      "Monthly registers and below-75% lists in one click",
      "Parents see their child's attendance in the parent app",
    ],
    img: "/product/attendance.webp",
    alt: "Daily attendance report for a class",
  },
  {
    key: "transport",
    icon: Bus,
    title: "School transport",
    lead: "Routes, stops and fares — billed with the rest of the fees.",
    points: [
      "Routes with stops, pickup and drop times, and fare per stop",
      "Monthly transport fees appear in each student's ledger automatically",
      "Bus attendance and live bus location for parents",
      "Vehicle and driver documents with expiry reminders",
    ],
    img: "/product/transport.webp",
    alt: "Transport routes with stops, timings and fares",
  },
  {
    key: "director",
    icon: LineChart,
    title: "Director's view",
    lead: "The numbers an owner needs — before anyone sends a report.",
    points: [
      "Collections this month, outstanding dues, today's attendance",
      "Which class teachers haven't marked attendance",
      "Fee defaulters, TC requests and leave requests in one place",
      "Read-only: see everything, change nothing by mistake",
    ],
    img: "/product/director.webp",
    alt: "Director dashboard with collections, dues and alerts",
  },
  {
    key: "office",
    icon: LayoutDashboard,
    title: "The office dashboard",
    lead: "Where the school's day starts.",
    points: [
      "Today's collection, total dues and student strength",
      "Admissions, inquiries, certificates and promotions",
      "Fee and attendance trends for the term",
      "Every change kept in an activity log",
    ],
    img: "/product/dashboard.webp",
    alt: "School office dashboard",
  },
];

export default function ProductTabs() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return undefined;
    const t = setTimeout(() => setI((x) => (x + 1) % TABS.length), 7000);
    return () => clearTimeout(t);
  }, [i, auto]);

  useEffect(() => {
    TABS.forEach((t) => { const im = new Image(); im.src = t.img; });
  }, []);

  const tab = TABS[i];
  return (
    <div className="grid lg:grid-cols-[380px_minmax(0,1fr)] gap-8 lg:gap-12 items-start">
      <div className="space-y-2" role="tablist" aria-label="Product areas">
        {TABS.map((t, idx) => {
          const Icon = t.icon;
          const on = idx === i;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={on}
              type="button"
              onClick={() => { setI(idx); setAuto(false); }}
              className={`relative w-full text-left rounded-2xl px-5 py-4 transition-all ${on ? "bg-white shadow-card ring-1 ring-brand-cream" : "hover:bg-white/60"}`}
            >
              <span className="flex items-center gap-3">
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${on ? "bg-brand-terra text-white" : "bg-brand-cream2 text-brand-brown"}`}>
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <span className="font-display font-bold text-brand-darker">{t.title}</span>
              </span>
              {on && (
                <Motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="overflow-hidden">
                  <p className="mt-3 text-sm text-brand-brown">{t.lead}</p>
                  <ul className="mt-3 space-y-1.5">
                    {t.points.map((pt) => (
                      <li key={pt} className="flex gap-2 text-sm text-brand-brown/90">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-terra" /> {pt}
                      </li>
                    ))}
                  </ul>
                  {auto && (
                    <span className="absolute left-5 right-5 bottom-0 h-[2px] overflow-hidden rounded-full bg-brand-cream">
                      <Motion.span key={i} className="block h-full bg-brand-terra" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 7, ease: "linear" }} />
                    </span>
                  )}
                </Motion.div>
              )}
            </button>
          );
        })}
      </div>

      <div className="lg:sticky lg:top-28">
        <BrowserFrame>
          <div className="relative aspect-[1800/1125] bg-[#f1f4f8]">
            <AnimatePresence mode="wait">
              <Motion.img
                key={tab.key}
                src={tab.img}
                alt={tab.alt}
                className="absolute inset-0 h-full w-full object-cover object-top"
                initial={{ opacity: 0, scale: 1.015 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
              />
            </AnimatePresence>
          </div>
        </BrowserFrame>
      </div>
    </div>
  );
}
