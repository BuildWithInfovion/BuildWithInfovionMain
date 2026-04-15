import React, { useRef, useState, useEffect } from "react";
import {
  motion as Motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight, ArrowUpRight, CheckCircle,
  UserCheck, ClipboardList, BookOpen, CreditCard,
  Users, Bell, Calendar, LayoutGrid, ShieldCheck,
  Cloud, IndianRupee, School, AlertCircle, Eye,
  FileWarning, Star, ChevronRight,
} from "lucide-react";

// ─── WORD SLIDE-UP ───────────────────────────────────────────────────────────
const WordSlideUp = ({ text, className = "", delay = 0 }) => (
  <span className={className}>
    {text.split(" ").map((word, i) => (
      <span key={i} className="inline-block overflow-hidden">
        <Motion.span
          className="inline-block"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ delay: delay + i * 0.07, duration: 0.65, ease: [0.33, 1, 0.68, 1] }}
        >
          {word}{i < text.split(" ").length - 1 ? "\u00A0" : ""}
        </Motion.span>
      </span>
    ))}
  </span>
);

// ─── EDUCATION-THEMED BACKGROUND ORBS ────────────────────────────────────────
const HeroOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Large warm terracotta orb — top right */}
    <Motion.div
      className="absolute w-[700px] h-[700px] rounded-full blur-3xl"
      style={{ background: "radial-gradient(circle, rgba(190,109,86,0.18) 0%, transparent 70%)", top: "-20%", right: "-10%" }}
      animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Medium gold orb — bottom left */}
    <Motion.div
      className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
      style={{ background: "radial-gradient(circle, rgba(209,171,131,0.14) 0%, transparent 70%)", bottom: "0%", left: "-8%" }}
      animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
      transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Small brown orb — center */}
    <Motion.div
      className="absolute w-[300px] h-[300px] rounded-full blur-2xl"
      style={{ background: "radial-gradient(circle, rgba(90,74,72,0.35) 0%, transparent 70%)", top: "35%", left: "42%" }}
      animate={{ x: [0, 40, -20, 0], y: [0, -30, 40, 0] }}
      transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

// ─── FLOATING SCHOOL SHAPES ───────────────────────────────────────────────────
// Subtle abstract shapes that suggest notebooks/papers
const FloatingShapes = () => {
  const shapes = [
    { w: 40, h: 52, top: "12%",  left: "8%",   rot: -12, delay: 0 },
    { w: 32, h: 40, top: "70%",  left: "5%",   rot:  8,  delay: 3 },
    { w: 48, h: 60, top: "20%",  right: "12%", rot:  15, delay: 1.5 },
    { w: 28, h: 36, top: "60%",  right: "8%",  rot: -8,  delay: 4 },
    { w: 36, h: 46, top: "45%",  left: "14%",  rot:  5,  delay: 2 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((s, i) => (
        <Motion.div
          key={i}
          className="absolute rounded-sm border border-brand-accent/20"
          style={{
            width: s.w, height: s.h,
            top: s.top, left: s.left, right: s.right,
            rotate: s.rot,
            background: "rgba(209,171,131,0.06)",
          }}
          animate={{ y: [0, -18, 0], rotate: [s.rot, s.rot + 4, s.rot] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
        />
      ))}
      {/* Small dots */}
      {[
        { top: "25%", left: "20%", delay: 0 },
        { top: "55%", left: "75%", delay: 1.5 },
        { top: "80%", left: "30%", delay: 3 },
        { top: "15%", left: "60%", delay: 2 },
      ].map((d, i) => (
        <Motion.div
          key={`dot-${i}`}
          className="absolute w-2 h-2 rounded-full bg-brand-accent/30"
          style={{ top: d.top, left: d.left }}
          animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: d.delay }}
        />
      ))}
    </div>
  );
};

// ─── SPOTLIGHT CURSOR ─────────────────────────────────────────────────────────
const useSpotlight = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  return { pos, visible, setPos, setVisible };
};

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
const Counter = ({ value, suffix = "" }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  useEffect(() => {
    if (inView) animate(count, value, { duration: 2.2, ease: "easeOut" });
  }, [inView, count, value]);
  return <span ref={ref}><Motion.span>{rounded}</Motion.span>{suffix}</span>;
};

// ─── SCROLL FADE-UP ───────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.09, duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  }),
};

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
const SectionLabel = ({ text }) => (
  <p className="text-brand-terra font-semibold text-xs uppercase tracking-widest mb-3">{text}</p>
);

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef(null);
  const { pos: spotPos, visible: spotVisible, setPos, setVisible } = useSpotlight();

  const problems = [
    { icon: <AlertCircle className="w-5 h-5" />, title: "Admission Chaos", color: "text-red-500", desc: "Inquiries on paper, no TC validation, missing Aadhar and caste records required by Indian regulations." },
    { icon: <ClipboardList className="w-5 h-5" />, title: "Attendance Headaches", color: "text-orange-500", desc: "Paper registers every morning. Parents find out about absences days later, if at all." },
    { icon: <FileWarning className="w-5 h-5" />, title: "Examination Disorder", color: "text-yellow-600", desc: "Marks in Excel, emailed around. No unified scorecards, rank lists, or student access to results." },
    { icon: <CreditCard className="w-5 h-5" />, title: "Fee Confusion", color: "text-brand-terra", desc: "Ledger-based collections, no live view of defaulters, no student-level outstanding balance." },
    { icon: <Eye className="w-5 h-5" />, title: "Zero Parent Visibility", color: "text-purple-600", desc: "Parents call the school for everything — attendance, marks, fees. No parent portal exists." },
  ];

  const modules = [
    { icon: <UserCheck />, title: "Admissions", desc: "Auto admission numbers, TC validation, Aadhar fields, inquiry pipeline." },
    { icon: <ClipboardList />, title: "Attendance", desc: "Bulk marking, monthly reports, configurable defaulter threshold." },
    { icon: <BookOpen />, title: "Examinations", desc: "Marks entry, rank-wise results, per-student scorecards." },
    { icon: <CreditCard />, title: "Fee Management", desc: "Indian fee heads, payment recording, daily collection, defaulter lists." },
    { icon: <Users />, title: "Staff Management", desc: "Roles, attendance, leave requests, profile management." },
    { icon: <School />, title: "Student & Parent", desc: "Students see own data. Parents track their child — linked at account level." },
    { icon: <Calendar />, title: "Timetable", desc: "Weekly period grid per class with subject and teacher mapping." },
    { icon: <Bell />, title: "Announcements", desc: "School-wide and class-specific notices for every role." },
  ];

  const stats = [
    { value: 8, suffix: "", label: "Role Portals", icon: <LayoutGrid className="w-5 h-5" /> },
    { value: 8, suffix: "", label: "Modules", icon: <BookOpen className="w-5 h-5" /> },
    { value: 13, suffix: "", label: "Backend Services", icon: <Cloud className="w-5 h-5" /> },
    { value: 100, suffix: "%", label: "Cloud Native", icon: <ShieldCheck className="w-5 h-5" /> },
  ];

  const portals = [
    { role: "Director",     desc: "Full oversight: students, staff, fees, reports, settings.",              badge: "bg-purple-100 text-purple-700" },
    { role: "Principal",    desc: "Defaulters, timetable, fee collection, staff tracking.",                  badge: "bg-blue-100 text-blue-700" },
    { role: "Teacher",      desc: "Mark attendance and enter marks for assigned classes only.",               badge: "bg-green-100 text-green-700" },
    { role: "Student",      desc: "Own attendance, marks, fee balance, timetable.",                          badge: "bg-cyan-100 text-cyan-700" },
    { role: "Parent",       desc: "Child's attendance, results, fees — real-time, secure link.",             badge: "bg-teal-100 text-teal-700" },
    { role: "Accountant",   desc: "Daily collection, defaulters, fee structures, payment recording.",         badge: "bg-orange-100 text-orange-700" },
    { role: "Operator",     desc: "Admissions, student directory, staff, exams, announcements.",             badge: "bg-indigo-100 text-indigo-700" },
    { role: "Receptionist", desc: "Inquiry capture, fee payments, student lookup.",                          badge: "bg-pink-100 text-pink-700" },
  ];

  const differentiators = [
    { icon: <IndianRupee className="w-6 h-6" />, title: "India-First Design", desc: "Aadhar, TC workflows, Indian fee heads, CBSE/ICSE/State Board — baked in, not bolted on." },
    { icon: <LayoutGrid className="w-6 h-6" />,  title: "8 Separate Portals", desc: "Not one admin panel with hidden buttons. Eight purpose-built interfaces, one per role." },
    { icon: <Cloud className="w-6 h-6" />,       title: "Cloud-Native & Affordable", desc: "No server. Works on 4G. Built for Tier 2/3 school budgets, not enterprise pricing." },
  ];

  const testimonials = [
    { name: "School Director", org: "K-12 Private School, Pune",      quote: "We went from tracking admissions in WhatsApp groups to having every inquiry, TC, and student record in one place." },
    { name: "Principal",       org: "CBSE School, Nashik",            quote: "The attendance defaulter list used to take half a day to compile every month. Now it's live on the principal portal." },
    { name: "School Accountant", org: "State Board School, Aurangabad", quote: "The daily collection report is the first thing I open every morning. No more reconciling ledgers." },
  ];

  return (
    <>
      <Helmet>
        <title>Infovion — School Management Software for K-12 Schools in India</title>
        <meta name="description" content="Infovion is a cloud-based school ERP for K-12 schools in India. Manage admissions, attendance, exams, fees & staff — one platform, 8 role portals. CBSE, ICSE & State Board." />
        <link rel="canonical" href="https://buildwithinfovion.com/" />
      </Helmet>

      <Motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>

        {/* ── HERO (dark) ──────────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, #33312E 0%, #5A4A48 60%, #33312E 100%)" }}
          onMouseMove={(e) => {
            const r = heroRef.current?.getBoundingClientRect();
            if (r) setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
          }}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
          {/* Dot grid */}
          <div className="absolute inset-0 dot-grid-dark opacity-60" />

          {/* Warm orbs */}
          <HeroOrbs />

          {/* Floating school shapes */}
          <FloatingShapes />

          {/* Spotlight cursor */}
          <div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700"
            style={{
              opacity: spotVisible ? 1 : 0,
              background: `radial-gradient(800px circle at ${spotPos.x}px ${spotPos.y}px, rgba(209,171,131,0.07), transparent 40%)`,
            }}
          />

          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-28 pb-20">
            {/* Badge */}
            <Motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 border border-brand-accent/30 bg-brand-accent/10 text-brand-accent text-sm font-medium px-5 py-2 rounded-full mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              Built for K-12 Schools · CBSE · ICSE · State Board
            </Motion.div>

            {/* Word slide-up headline */}
            <h1 className="text-5xl sm:text-7xl font-extrabold text-white mb-6 leading-[1.07] tracking-tight">
              <WordSlideUp text="Complete School" className="block" delay={0.12} />
              <WordSlideUp text="Management." className="block text-brand-accent" delay={0.28} />
              <WordSlideUp text="Built for India." className="block" delay={0.44} />
            </h1>

            <Motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="text-lg sm:text-xl text-brand-cream/80 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Manage admissions, attendance, exams, fees, and staff — all in one platform, with a dedicated portal for{" "}
              <span className="text-white font-semibold">every role</span> in your school.
            </Motion.p>

            {/* CTAs */}
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.02, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-brand-terra text-white px-8 py-4 rounded-full font-bold text-base shadow-2xl shadow-brand-terra/40 hover:bg-[#a85d48] transition-colors"
                >
                  Request a Demo <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Motion.div>
              <Motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/features"
                  className="inline-flex items-center gap-2 border-2 border-brand-cream/25 text-brand-cream px-8 py-4 rounded-full font-semibold text-base hover:border-brand-cream/50 hover:bg-white/5 transition-all"
                >
                  Explore Features <ArrowRight className="w-4 h-4" />
                </Link>
              </Motion.div>
            </Motion.div>

            {/* Trust chips */}
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-brand-neutral"
            >
              {["8 Role Portals", "8 Modules", "Cloud-Native", "India-First"].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-accent" /> {item}
                </span>
              ))}
            </Motion.div>
          </div>

          {/* Scroll indicator */}
          <Motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-brand-accent/40 flex items-start justify-center pt-2">
              <div className="w-1 h-2 rounded-full bg-brand-accent/60" />
            </div>
          </Motion.div>
        </section>

        {/* ── PROBLEM (cream) ───────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-brand-cream">
          <div className="max-w-7xl mx-auto">
            <Motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
              <SectionLabel text="The Problem" />
              <h2 className="text-4xl font-bold text-brand-dark mb-4">
                Every Indian School Faces the Same Struggles
              </h2>
              <p className="text-brand-neutral max-w-2xl mx-auto text-lg leading-relaxed">
                Scattered spreadsheets. WhatsApp chains. Disconnected tools. The same chaos, in every school.
              </p>
            </Motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {problems.map((p, i) => (
                <Motion.div
                  key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-brand-neutral/15 cursor-default"
                >
                  <div className={`${p.color} mb-3`}>{p.icon}</div>
                  <h3 className="font-bold text-brand-dark mb-2 text-sm">{p.title}</h3>
                  <p className="text-xs text-brand-neutral leading-relaxed">{p.desc}</p>
                </Motion.div>
              ))}
            </div>

            <Motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-14 text-center">
              <p className="text-2xl sm:text-3xl font-bold text-brand-dark">
                Infovion replaces all of this.{" "}
                <span className="text-brand-terra">One login. Every operation. Every role.</span>
              </p>
            </Motion.div>
          </div>
        </section>

        {/* ── STATS (white) — animated counters ─────────────────────────────── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {stats.map((s, i) => (
                <Motion.div
                  key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="bg-brand-cream rounded-2xl p-6 text-center border border-brand-neutral/20 hover:shadow-xl hover:shadow-brand-terra/8 transition-all duration-300"
                >
                  <div className="text-brand-terra flex justify-center mb-3">{s.icon}</div>
                  <div className="text-4xl font-extrabold text-brand-dark mb-1">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-brand-neutral font-medium uppercase tracking-wide">{s.label}</div>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MODULES (cream, spotlight) ────────────────────────────────────── */}
        <section
          className="py-24 px-6 bg-brand-cream relative"
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            e.currentTarget.querySelector(".spotlight-layer").style.background =
              `radial-gradient(700px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(190,109,86,0.05), transparent 40%)`;
          }}
        >
          <div className="spotlight-layer absolute inset-0 pointer-events-none transition-all duration-300 rounded-none" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <Motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
              <SectionLabel text="Features" />
              <h2 className="text-4xl font-bold text-brand-dark mb-4">Eight Modules. Every School Operation.</h2>
              <p className="text-brand-neutral max-w-2xl mx-auto text-lg">From first inquiry to final results — fully digitized.</p>
            </Motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {modules.map((m, i) => (
                <Motion.div
                  key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group bg-white rounded-2xl p-6 shadow-sm border border-brand-neutral/15 hover:shadow-xl hover:shadow-brand-terra/10 transition-all duration-300 cursor-default"
                >
                  <div className="p-2.5 bg-brand-terra/10 text-brand-terra rounded-xl w-fit mb-4 group-hover:bg-brand-terra/20 transition-colors">
                    {React.cloneElement(m.icon, { className: "w-5 h-5" })}
                  </div>
                  <h3 className="font-bold text-brand-dark mb-2">{m.title}</h3>
                  <p className="text-sm text-brand-neutral leading-relaxed">{m.desc}</p>
                </Motion.div>
              ))}
            </div>

            <Motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mt-10">
              <Link to="/features" className="inline-flex items-center gap-2 text-brand-terra font-semibold hover:underline text-sm">
                Deep dive into every feature <ArrowRight className="w-4 h-4" />
              </Link>
            </Motion.div>
          </div>
        </section>

        {/* ── PORTALS (white) ───────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <Motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
              <SectionLabel text="Role Portals" />
              <h2 className="text-4xl font-bold text-brand-dark mb-4">Every Role Gets Their Own Portal.</h2>
              <p className="text-brand-neutral max-w-2xl mx-auto text-lg">
                Not one admin panel with hidden buttons. Eight purpose-built interfaces.
              </p>
            </Motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {portals.map((p, i) => (
                <Motion.div
                  key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="bg-brand-cream rounded-2xl p-5 border border-brand-neutral/20 hover:shadow-lg hover:shadow-brand-terra/8 transition-all duration-300"
                >
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${p.badge}`}>{p.role}</span>
                  <p className="text-xs text-brand-neutral leading-relaxed">{p.desc}</p>
                </Motion.div>
              ))}
            </div>
            <Motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mt-10">
              <Link to="/portals" className="inline-flex items-center gap-2 text-brand-terra font-semibold hover:underline text-sm">
                Explore all 8 portals <ArrowRight className="w-4 h-4" />
              </Link>
            </Motion.div>
          </div>
        </section>

        {/* ── WHY INFOVION (dark band) ──────────────────────────────────────── */}
        <section className="py-24 px-6 relative overflow-hidden" style={{ background: "#5A4A48" }}>
          {/* Subtle orbs */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(190,109,86,0.15)" }} />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(209,171,131,0.10)" }} />

          <div className="relative z-10 max-w-6xl mx-auto">
            <Motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
              <SectionLabel text="Why Infovion" />
              <h2 className="text-4xl font-bold text-white mb-4">Not Another Generic ERP.</h2>
              <p className="text-brand-cream/70 max-w-xl mx-auto text-lg">
                Built from scratch for Indian K-12 schools — not a Western system adapted for India.
              </p>
            </Motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {differentiators.map((d, i) => (
                <Motion.div
                  key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="rounded-2xl p-8 border border-brand-accent/20 hover:border-brand-accent/40 transition-all duration-300"
                  style={{ background: "rgba(51,49,46,0.5)" }}
                >
                  <div className="inline-flex p-3 rounded-xl bg-brand-terra/20 text-brand-accent mb-5">{d.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{d.title}</h3>
                  <p className="text-brand-cream/70 leading-relaxed text-sm">{d.desc}</p>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS (cream) ─────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-brand-cream">
          <div className="max-w-6xl mx-auto">
            <Motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
              <SectionLabel text="Early Feedback" />
              <h2 className="text-4xl font-bold text-brand-dark">Trusted by School Administrators</h2>
            </Motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <Motion.div
                  key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-7 shadow-sm border border-brand-neutral/20 hover:shadow-lg hover:shadow-brand-terra/8 transition-all duration-300"
                >
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-brand-accent text-brand-accent" />)}
                  </div>
                  <p className="text-brand-dark/80 text-sm leading-relaxed mb-5">"{t.quote}"</p>
                  <div>
                    <p className="font-semibold text-brand-dark text-sm">{t.name}</p>
                    <p className="text-xs text-brand-neutral">{t.org}</p>
                  </div>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA (terracotta) ─────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-white">
          <Motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-4xl mx-auto">
            <div
              className="relative rounded-3xl p-12 text-center overflow-hidden"
              style={{ background: "linear-gradient(135deg, #BE6D56 0%, #5A4A48 100%)" }}
            >
              {/* BG shapes */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-64 h-64 rounded-full blur-3xl -top-16 -right-16" style={{ background: "rgba(255,255,255,0.06)" }} />
                <div className="absolute w-48 h-48 rounded-full blur-3xl -bottom-12 -left-12" style={{ background: "rgba(255,255,255,0.06)" }} />
              </div>
              <div className="relative z-10">
                <p className="text-brand-cream/80 text-xs font-semibold uppercase tracking-widest mb-4">Get Started Today</p>
                <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">Ready to modernize your school?</h2>
                <p className="text-brand-cream/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                  Schedule a free demo. We'll walk through every module and portal — in under 30 minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-brand-terra px-8 py-4 rounded-full font-bold text-base shadow-lg hover:bg-brand-cream transition-colors">
                      Schedule a Free Demo <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </Motion.div>
                  <Motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    <Link to="/for-schools" className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-white/10 transition-colors">
                      See How It Works <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Motion.div>
                </div>
              </div>
            </div>
          </Motion.div>
        </section>

      </Motion.main>
    </>
  );
}
