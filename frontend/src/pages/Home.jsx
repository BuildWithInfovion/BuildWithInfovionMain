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
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  UserCheck,
  ClipboardList,
  BookOpen,
  CreditCard,
  Users,
  Bell,
  Calendar,
  LayoutGrid,
  ShieldCheck,
  Cloud,
  IndianRupee,
  School,
  AlertCircle,
  Eye,
  FileWarning,
  Star,
} from "lucide-react";

// ─── 1. WORD SLIDE-UP ───────────────────────────────────────────────────────
const WordSlideUp = ({ text, className = "", delay = 0 }) => {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <Motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              delay: delay + i * 0.07,
              duration: 0.65,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </Motion.span>
        </span>
      ))}
    </span>
  );
};

// ─── 2. FLOATING ORBS (Background Depth) ────────────────────────────────────
const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <Motion.div
      className="absolute w-[700px] h-[700px] rounded-full bg-blue-500/8 blur-3xl"
      animate={{ x: [0, 70, 0], y: [0, -50, 0] }}
      transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      style={{ top: "-15%", right: "-8%" }}
    />
    <Motion.div
      className="absolute w-[500px] h-[500px] rounded-full bg-indigo-500/8 blur-3xl"
      animate={{ x: [0, -60, 0], y: [0, 70, 0] }}
      transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      style={{ bottom: "5%", left: "-5%" }}
    />
    <Motion.div
      className="absolute w-[350px] h-[350px] rounded-full bg-purple-500/6 blur-3xl"
      animate={{ x: [0, 50, -30, 0], y: [0, -40, 50, 0] }}
      transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
      style={{ top: "45%", left: "38%" }}
    />
  </div>
);

// ─── 3. ANIMATED STAT COUNTER ───────────────────────────────────────────────
const Counter = ({ value, suffix = "", prefix = "" }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (inView) {
      animate(count, value, { duration: 2.2, ease: "easeOut" });
    }
  }, [inView, count, value]);

  return (
    <span ref={ref}>
      {prefix}
      <Motion.span>{rounded}</Motion.span>
      {suffix}
    </span>
  );
};

// ─── 4. SCROLL FADE-UP VARIANT ──────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.09,
      duration: 0.65,
      ease: [0.33, 1, 0.68, 1],
    },
  }),
};

// ─── 5. SPOTLIGHT CURSOR SECTION ────────────────────────────────────────────
const SpotlightSection = ({ children, className = "" }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  return (
    <div
      className={`relative ${className}`}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          opacity: visible ? 1 : 0,
          background: `radial-gradient(750px circle at ${pos.x}px ${pos.y}px, rgba(37,99,235,0.06), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef(null);
  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 });
  const [spotVisible, setSpotVisible] = useState(false);

  const problems = [
    {
      icon: <AlertCircle className="w-5 h-5" />,
      title: "Admission Chaos",
      desc: "Inquiries tracked on paper or WhatsApp. No TC validation, no Aadhar records.",
      color: "text-red-500",
      border: "border-red-100 dark:border-red-900/30",
      bg: "bg-red-50/60 dark:bg-red-900/10",
    },
    {
      icon: <ClipboardList className="w-5 h-5" />,
      title: "Attendance Headaches",
      desc: "Paper registers every morning. Parents find out about absences days later.",
      color: "text-orange-500",
      border: "border-orange-100 dark:border-orange-900/30",
      bg: "bg-orange-50/60 dark:bg-orange-900/10",
    },
    {
      icon: <FileWarning className="w-5 h-5" />,
      title: "Examination Disorder",
      desc: "Marks in Excel, shared over email. No unified results or rank lists.",
      color: "text-yellow-500",
      border: "border-yellow-100 dark:border-yellow-900/30",
      bg: "bg-yellow-50/60 dark:bg-yellow-900/10",
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: "Fee Confusion",
      desc: "Ledger-based collections. No view of outstanding balances or defaulters.",
      color: "text-blue-500",
      border: "border-blue-100 dark:border-blue-900/30",
      bg: "bg-blue-50/60 dark:bg-blue-900/10",
    },
    {
      icon: <Eye className="w-5 h-5" />,
      title: "Zero Parent Visibility",
      desc: "Parents call the school for everything — because there's no parent portal.",
      color: "text-purple-500",
      border: "border-purple-100 dark:border-purple-900/30",
      bg: "bg-purple-50/60 dark:bg-purple-900/10",
    },
  ];

  const modules = [
    {
      icon: <UserCheck />,
      title: "Admissions",
      desc: "Auto admission numbers, TC validation, Aadhar fields, inquiry tracking.",
    },
    {
      icon: <ClipboardList />,
      title: "Attendance",
      desc: "Daily marking, bulk options, monthly reports, defaulter lists.",
    },
    {
      icon: <BookOpen />,
      title: "Examinations",
      desc: "Marks entry, rank-wise results, per-student scorecards.",
    },
    {
      icon: <CreditCard />,
      title: "Fee Management",
      desc: "Indian fee heads, payment recording, defaulters, daily collection.",
    },
    {
      icon: <Users />,
      title: "Staff Management",
      desc: "Roles, attendance, leave requests, profile management.",
    },
    {
      icon: <School />,
      title: "Student & Parent",
      desc: "Students view marks, fees, timetable. Parents track their child live.",
    },
    {
      icon: <Calendar />,
      title: "Timetable",
      desc: "Weekly period grid per class with subject and teacher mapping.",
    },
    {
      icon: <Bell />,
      title: "Announcements",
      desc: "School-wide and class-specific notices visible to all roles.",
    },
  ];

  const stats = [
    {
      value: 8,
      suffix: "",
      label: "Role-Specific Portals",
      icon: <LayoutGrid className="w-5 h-5" />,
    },
    {
      value: 8,
      suffix: "",
      label: "Complete Modules",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      value: 13,
      suffix: "",
      label: "Backend Services",
      icon: <Cloud className="w-5 h-5" />,
    },
    {
      value: 100,
      suffix: "%",
      label: "Cloud Native",
      icon: <ShieldCheck className="w-5 h-5" />,
    },
  ];

  const portals = [
    {
      role: "Director",
      desc: "Full oversight — students, staff, fees, reports, institution settings.",
      badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    },
    {
      role: "Principal",
      desc: "Attendance defaulters, fee defaulters, timetable, staff tracking.",
      badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    },
    {
      role: "Teacher",
      desc: "Mark attendance, enter exam marks, view timetable — assigned classes only.",
      badge: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    },
    {
      role: "Student",
      desc: "Own attendance history, exam marks, fee balance, announcements.",
      badge: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
    },
    {
      role: "Parent",
      desc: "Child's attendance, exam results, fee balance — securely linked to one student.",
      badge: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
    },
    {
      role: "Accountant",
      desc: "Daily collection report, fee defaulters, payment recording.",
      badge: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
    },
    {
      role: "Operator",
      desc: "Admissions, student directory, staff management, exam creation.",
      badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
    },
    {
      role: "Receptionist",
      desc: "Inquiry capture, fee payments, student lookup, announcements.",
      badge: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
    },
  ];

  const differentiators = [
    {
      title: "India-First Design",
      desc: "Aadhar fields, TC workflows, Indian fee head standards, CBSE/ICSE/State Board — baked in, not bolted on.",
      icon: <IndianRupee className="w-6 h-6" />,
      gradient: "from-orange-400 to-red-500",
    },
    {
      title: "Every Role. One Platform.",
      desc: "Not one admin panel with buttons hidden by role. Eight completely separate, purpose-built interfaces.",
      icon: <LayoutGrid className="w-6 h-6" />,
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      title: "Cloud-Native. Affordable.",
      desc: "No server installation needed. Works on 4G. Built for Tier 2/3 school budgets — not enterprise pricing.",
      icon: <Cloud className="w-6 h-6" />,
      gradient: "from-green-400 to-teal-600",
    },
  ];

  const testimonials = [
    {
      name: "School Director",
      org: "K-12 Private School, Pune",
      quote:
        "We went from tracking admissions in WhatsApp groups to having every inquiry, TC, and student record in one place. The director dashboard gives me everything at a glance.",
    },
    {
      name: "Principal",
      org: "CBSE School, Nashik",
      quote:
        "The attendance defaulter list used to take us half a day to compile every month. Now it's always there, live, on the principal portal.",
    },
    {
      name: "School Accountant",
      org: "State Board School, Aurangabad",
      quote:
        "The daily collection report is the first thing I open every morning. No more reconciling ledgers at the end of the day.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          Infovion — School Management Software for K-12 Schools in India
        </title>
        <meta
          name="description"
          content="Infovion is a cloud-based school ERP for K-12 schools in India. Manage admissions, attendance, exams, fees & staff — one platform, 8 role portals. CBSE, ICSE & State Board."
        />
        <link rel="canonical" href="https://buildwithinfovion.com/" />
        <meta
          property="og:title"
          content="Infovion — School Management Software India"
        />
        <meta
          property="og:description"
          content="Complete school ERP for K-12 India. Admissions, attendance, exams, fees, 8 role portals."
        />
        <meta property="og:url" content="https://buildwithinfovion.com/" />
      </Helmet>

      <Motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-950"
          onMouseMove={(e) => {
            const rect = heroRef.current?.getBoundingClientRect();
            if (rect)
              setSpotPos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              });
          }}
          onMouseEnter={() => setSpotVisible(true)}
          onMouseLeave={() => setSpotVisible(false)}
        >
          {/* Drifting orbs */}
          <FloatingOrbs />

          {/* 6. Spotlight cursor */}
          <div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700"
            style={{
              opacity: spotVisible ? 1 : 0,
              background: `radial-gradient(900px circle at ${spotPos.x}px ${spotPos.y}px, rgba(37,99,235,0.07), transparent 40%)`,
            }}
          />

          {/* Subtle grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.025)_1px,transparent_1px)] bg-[size:72px_72px] dark:bg-[linear-gradient(rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.04)_1px,transparent_1px)] dark:bg-[size:72px_72px]" />

          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-28 pb-16">
            {/* Badge */}
            <Motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/25 border border-blue-100 dark:border-blue-800/50 text-blue-700 dark:text-blue-300 text-sm font-medium px-4 py-1.5 rounded-full mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Built for K-12 Schools in India · CBSE · ICSE · State Board
            </Motion.div>

            {/* 2. Word Slide-Up Headline */}
            <h1 className="text-5xl sm:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-[1.08] tracking-tight">
              <WordSlideUp text="Complete School" className="block" delay={0.12} />
              <WordSlideUp
                text="Management."
                className="block text-blue-600"
                delay={0.28}
              />
              <WordSlideUp text="Built for India." className="block" delay={0.44} />
            </h1>

            {/* Subheadline fade in */}
            <Motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.82, duration: 0.6, ease: "easeOut" }}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Manage admissions, attendance, exams, fees, and staff — all in one
              platform, with a dedicated portal for{" "}
              <span className="text-gray-900 dark:text-white font-medium">
                every role
              </span>
              .
            </Motion.p>

            {/* CTAs */}
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-base shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-colors"
                >
                  Request a Demo <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Motion.div>
              <Motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  to="/features"
                  className="inline-flex items-center gap-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-8 py-4 rounded-full font-semibold text-base border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 shadow-lg transition-all"
                >
                  Explore Features <ArrowRight className="w-4 h-4" />
                </Link>
              </Motion.div>
            </Motion.div>

            {/* Trust line */}
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400"
            >
              {[
                "8 Role Portals",
                "8 Modules",
                "Cloud-Native",
                "India-First Design",
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {item}
                </span>
              ))}
            </Motion.div>
          </div>
        </section>

        {/* ── PROBLEM SECTION ──────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-gray-50 dark:bg-gray-900/40">
          <div className="max-w-7xl mx-auto">
            <Motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <p className="text-blue-600 dark:text-blue-400 font-semibold text-xs uppercase tracking-widest mb-3">
                The Problem
              </p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Every Indian School Faces the Same Struggles
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                Scattered spreadsheets. WhatsApp chains. Disconnected tools. The
                same chaos, in every school.
              </p>
            </Motion.div>

            {/* 4. Magnetic hover cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {problems.map((p, i) => (
                <Motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`${p.bg} ${p.border} border rounded-2xl p-6 cursor-default`}
                >
                  <div className={`${p.color} mb-3`}>{p.icon}</div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {p.desc}
                  </p>
                </Motion.div>
              ))}
            </div>

            {/* Solution statement */}
            <Motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Infovion replaces all of this.{" "}
                <span className="text-blue-600">
                  One login. Every operation. Every role.
                </span>
              </p>
            </Motion.div>
          </div>
        </section>

        {/* ── STATS (Animated Counters) ─────────────────────────────────────── */}
        <section className="py-20 px-6 bg-white dark:bg-gray-950">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {stats.map((s, i) => (
                <Motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.03 }}
                  className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
                >
                  <div className="text-blue-600 dark:text-blue-400 flex justify-center mb-3">
                    {s.icon}
                  </div>
                  {/* 3. Animated counter */}
                  <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                    {s.label}
                  </div>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MODULES (Spotlight + Magnetic Cards) ─────────────────────────── */}
        <SpotlightSection className="py-24 px-6 bg-gray-50 dark:bg-gray-900/40">
          <div className="relative z-10 max-w-7xl mx-auto">
            <Motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <p className="text-blue-600 dark:text-blue-400 font-semibold text-xs uppercase tracking-widest mb-3">
                Features
              </p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Eight Modules. Every School Operation Covered.
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                From the first student inquiry to final exam results — every
                process, in one place.
              </p>
            </Motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {modules.map((m, i) => (
                <Motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/8 transition-all duration-300 cursor-default"
                >
                  <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl w-fit mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                    {React.cloneElement(m.icon, { className: "w-5 h-5" })}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    {m.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {m.desc}
                  </p>
                </Motion.div>
              ))}
            </div>

            <Motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mt-10"
            >
              <Link
                to="/features"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline text-sm"
              >
                Deep dive into every feature <ArrowRight className="w-4 h-4" />
              </Link>
            </Motion.div>
          </div>
        </SpotlightSection>

        {/* ── PORTALS ──────────────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto">
            <Motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <p className="text-blue-600 dark:text-blue-400 font-semibold text-xs uppercase tracking-widest mb-3">
                Role Portals
              </p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Every Role Gets Their Own Portal.
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                Not one admin panel with buttons hidden by role. Eight
                completely separate, purpose-built interfaces.
              </p>
            </Motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {portals.map((p, i) => (
                <Motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <span
                    className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${p.badge}`}
                  >
                    {p.role}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {p.desc}
                  </p>
                </Motion.div>
              ))}
            </div>

            <Motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mt-10"
            >
              <Link
                to="/portals"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline text-sm"
              >
                Explore all 8 portals <ArrowRight className="w-4 h-4" />
              </Link>
            </Motion.div>
          </div>
        </section>

        {/* ── DIFFERENTIATORS ───────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-gray-50 dark:bg-gray-900/40">
          <div className="max-w-6xl mx-auto">
            <Motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <p className="text-blue-600 dark:text-blue-400 font-semibold text-xs uppercase tracking-widest mb-3">
                Why Infovion
              </p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Not Another Generic ERP.
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                Built from scratch for Indian K-12 schools — not a Western
                system adapted for India.
              </p>
            </Motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {differentiators.map((d, i) => (
                <Motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-2xl hover:shadow-blue-500/8 transition-all duration-300 overflow-hidden"
                >
                  <div
                    className={`absolute top-0 right-0 w-40 h-40 rounded-full bg-gradient-to-br ${d.gradient} opacity-[0.06] -translate-y-10 translate-x-10`}
                  />
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${d.gradient} text-white mb-5 shadow-lg`}
                  >
                    {d.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {d.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                    {d.desc}
                  </p>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-white dark:bg-gray-950">
          <div className="max-w-6xl mx-auto">
            <Motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <p className="text-blue-600 dark:text-blue-400 font-semibold text-xs uppercase tracking-widest mb-3">
                Early Feedback
              </p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Trusted by School Administrators
              </h2>
            </Motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <Motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-7 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-5">
                    "{t.quote}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-400">{t.org}</p>
                  </div>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-gray-50 dark:bg-gray-900/40">
          <Motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-3xl p-12 text-center text-white overflow-hidden">
              {/* Background orbs inside CTA */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-72 h-72 rounded-full bg-white/5 blur-3xl -top-16 -right-16" />
                <div className="absolute w-56 h-56 rounded-full bg-white/5 blur-3xl -bottom-12 -left-12" />
              </div>
              <div className="relative z-10">
                <p className="text-blue-200 text-sm font-medium uppercase tracking-widest mb-4">
                  Get Started
                </p>
                <h2 className="text-4xl font-extrabold mb-4 leading-tight">
                  Ready to modernize your school?
                </h2>
                <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                  Schedule a free demo. We'll walk you through every module and
                  every portal — in under 30 minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-base shadow-lg hover:bg-gray-50 transition-colors"
                    >
                      Schedule a Free Demo{" "}
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </Motion.div>
                  <Motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Link
                      to="/for-schools"
                      className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-white/10 transition-colors"
                    >
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
