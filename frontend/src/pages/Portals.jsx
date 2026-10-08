import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { ArrowRight, BadgeCheck, BookOpen, Briefcase, Calculator, Check, Crown, Headset, Home, Lock, Wrench } from "lucide-react";
import { Aurora, GhostButton, GlowButton, Kicker, Reveal, SectionHead, SpotlightCard } from "../components/fx/Fx";
import { BrowserFrame, PhoneFrame, LoopVideo } from "../components/product/Frames";
import PortalHub from "../components/product/PortalHub";

const PORTALS = [
  {
    id: "director", role: "Director", icon: Crown, device: "desk", media: { clip: "leaders" },
    tagline: "The whole school at a glance — from anywhere.",
    desc: "For the owner or trustee: today's attendance, collections and dues, and what needs attention — without asking anyone for a report.",
    caps: [
      "Students, today's attendance, collections this month and outstanding dues",
      "Which class teachers haven't marked attendance — and how often",
      "Alerts: TC requests, leave requests, fee defaulters",
      "Reports on attendance, fees and staff",
      "School information, agreements and online-payment settings",
      "Read-mostly by design: see everything, change nothing by accident",
    ],
  },
  {
    id: "principal", role: "Principal", icon: BadgeCheck, device: "desk", media: { clip: "leaders" },
    tagline: "Run the academics, not the paperwork.",
    desc: "The academic head sees attendance progress, approves requests and keeps classes, exams and staff on track.",
    caps: [
      "Live attendance progress by class",
      "Approve transfer certificate (TC) requests from parents",
      "Staff attendance and leave approvals",
      "Exams, results and report cards",
      "Timetable and substitute covers",
      "School-wide and class announcements",
    ],
  },
  {
    id: "operator", role: "Operator", icon: Briefcase, device: "desk", media: { img: "/product/dashboard.webp" },
    tagline: "The school office, in one place.",
    desc: "The administrator who runs the day: admissions, fees, certificates, transport and staff — everything the office does.",
    caps: [
      "Inquiries, admissions and the student directory",
      "Import students, parents and staff from Excel",
      "Fee plans, collection, receipts, concessions and opening balances",
      "Certificates: TC / LC, bonafide, character, ID cards",
      "Transport routes, stops, fares, vehicles and drivers",
      "Classes, subjects, exams, staff, salaries and the audit log",
    ],
  },
  {
    id: "accountant", role: "Accountant", icon: Calculator, device: "desk", media: { clip: "fees" },
    tagline: "Collections, receipts and dues — focused.",
    desc: "Everything needed to collect fees and keep the books straight, without the rest of the admin panel.",
    caps: [
      "Collect fees by cash, UPI, cheque, DD or NEFT — receipt in seconds",
      "Daily collection report and payment history",
      "Fee defaulters by class and instalment",
      "Concessions and opening balances",
      "Online payments received from parents",
      "Staff salaries",
    ],
  },
  {
    id: "reception", role: "Reception", icon: Headset, device: "desk", media: { clip: "admission" },
    tagline: "The front desk, organised.",
    desc: "Walk-ins, calls and inquiries captured and followed up — with just the access the front desk needs.",
    caps: [
      "Log walk-in, phone and online inquiries",
      "Follow-ups through to admission",
      "Student lookup",
      "Announcements",
      "No access to marks, salaries or school settings",
    ],
  },
  {
    id: "teacher", role: "Teacher", icon: BookOpen, device: "phone", media: { img: "/product/teacher-home.webp" },
    tagline: "Attendance and marks, from the phone.",
    desc: "Teachers see only their own classes: mark attendance in a few taps, enter marks, and stay in touch with parents.",
    caps: [
      "Mark attendance: present, absent, late or leave — or all present in one tap",
      "Enter exam marks subject by subject",
      "Class-teacher view: students, attendance and scorecards",
      "Timetable and covers",
      "Messages with parents without sharing personal numbers",
      "Only their own classes — data stays clean and private",
    ],
  },
  {
    id: "staff", role: "Non-teaching staff", icon: Wrench, device: "desk", media: { clip: "staff" },
    tagline: "Drivers, attendants and support staff.",
    desc: "A simple portal for the school's support team — including running the school bus trip.",
    caps: [
      "Own attendance and leave",
      "Bus trips: mark boarding and drop for each student",
      "Share the bus's location with parents during the trip",
      "Announcements",
    ],
  },
  {
    id: "parent", role: "Parent", icon: Home, device: "phone", media: { video: "/product/parent-app.mp4", poster: "/product/parent-app-poster.webp" },
    tagline: "Your child's school day, on your phone.",
    desc: "Parents see only their own children: attendance, fees, receipts, results and the school bus — no app to install.",
    caps: [
      "Today's attendance and the day-by-day record",
      "Fees due, receipts and payment history",
      "Pay online by UPI, card or net banking (when the school turns it on)",
      "Results and report cards",
      "School bus: boarding alerts and live location during the trip",
      "Apply for a TC, read announcements, message the class teacher",
    ],
  },
];

function Media({ p }) {
  if (p.device === "phone") {
    return (
      <div className="mx-auto w-[58%] max-w-[280px]">
        <PhoneFrame>
          {p.media.video
            ? <LoopVideo src={p.media.video} poster={p.media.poster} label={`${p.role} portal`} />
            : <img src={p.media.img} alt={`${p.role} portal on a phone`} className="h-full w-full object-cover object-top" />}
        </PhoneFrame>
      </div>
    );
  }
  if (p.media.clip) {
    return (
      <div className="overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-[0_50px_140px_-50px_rgba(45,212,191,0.55)]">
        <LoopVideo src={`/film/${p.media.clip}.mp4`} poster={`/film/${p.media.clip}.webp`} label={`${p.role} portal`} className="aspect-video" />
      </div>
    );
  }
  return (
    <BrowserFrame>
      <img src={p.media.img} alt={`${p.role} portal`} className="block w-full" />
    </BrowserFrame>
  );
}

export default function Portals() {
  const [i, setI] = useState(0);
  const p = PORTALS[i];
  const Icon = p.icon;
  return (
    <div className="bg-ink">
      <Helmet>
        <title>8 Role-Based Portals — Director, Principal, Teacher, Parent & More | Infovion</title>
        <meta name="description" content="Infovion gives every role in an Indian school its own portal: Director, Principal, Operator, Accountant, Reception, Teacher, Non-teaching staff and Parent. Each sees only what they need." />
        <link rel="canonical" href="https://www.infovion.in/portals" />
      </Helmet>

      <section className="noise relative overflow-hidden pb-20 pt-32 sm:pt-40">
        <Aurora strong />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Kicker>8 portals · one school</Kicker>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.03] tracking-tight text-white sm:text-6xl">
              Every role gets <span className="text-gradient-aurora">its own portal.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
              Not one admin panel with hidden buttons. Each person signs in to a portal built for their job — and sees only what their role needs.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <GlowButton to="/free-trial" className="w-full sm:w-auto">Start your free trial <ArrowRight className="h-4 w-4" /></GlowButton>
              <GhostButton href="#explore" className="w-full sm:w-auto">Explore the portals</GhostButton>
            </div>
          </div>
          <Reveal><PortalHub /></Reveal>
        </div>
      </section>

      <section id="explore" className="relative scroll-mt-20 py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Portals">
            {PORTALS.map((x, idx) => {
              const XI = x.icon;
              const on = idx === i;
              return (
                <button key={x.id} type="button" role="tab" aria-selected={on} onClick={() => setI(idx)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${on ? "bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 text-[#04121a] shadow-[0_0_30px_-8px_rgba(45,212,191,0.8)]" : "glass text-slate-300 hover:text-white"}`}>
                  <XI className="h-4 w-4" /> {x.role}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <Motion.div key={p.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}
              className="mt-8 grid items-center gap-10 rounded-[2rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 sm:p-10 lg:grid-cols-2">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-teal-400/10 px-3 py-1 text-xs font-semibold text-teal-300 ring-1 ring-teal-400/20">
                  <Icon className="h-3.5 w-3.5" /> {p.role} portal
                </span>
                <h2 className="mt-4 font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl">{p.tagline}</h2>
                <p className="mt-3 text-slate-400">{p.desc}</p>
                <ul className="mt-6 space-y-2.5">
                  {p.caps.map((c) => (
                    <li key={c} className="flex gap-3 text-[15px] text-slate-300"><Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-300" />{c}</li>
                  ))}
                </ul>
              </div>
              <Media p={p} />
            </Motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <SectionHead center kicker="Why separate portals" title="One school system," accent="eight focused apps." />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              ["Faster for everyone", "A teacher opens the portal and sees their classes. One click to mark attendance — no menus to dig through."],
              ["Private by design", "Every person sees only what their role allows. Parents see only their own child; teachers only their classes."],
              ["Easy to adopt", "Staff learn the screens they need, not the whole system. Most are comfortable on day one."],
            ].map(([t, b], idx) => (
              <Reveal key={t} delay={idx * 0.06}>
                <SpotlightCard className="h-full rounded-3xl border border-white/[0.07] bg-white/[0.02] p-7">
                  <Lock className="h-5 w-5 text-teal-300" />
                  <h3 className="mt-4 font-display text-lg font-bold text-white">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{b}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-28 sm:px-6">
        <div className="noise relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/10 px-6 py-16 text-center">
          <Aurora strong />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">See every portal with <span className="text-gradient-aurora">your own school.</span></h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">The free trial opens with sample data, so you can sign in as the office and try each screen.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <GlowButton to="/free-trial">Start your free trial <ArrowRight className="h-4 w-4" /></GlowButton>
              <GhostButton to="/contact">Book a live demo</GhostButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
