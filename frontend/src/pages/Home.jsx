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
  Users, Bell, Calendar, LayoutGrid,
  IndianRupee, School, AlertCircle, Eye,
  FileWarning, Star, ChevronRight, Phone,
  Sparkles, Shield, Zap, TrendingUp, Heart,
  MessageSquare, FileCheck, Clock,
} from "lucide-react";

// ─── WORD SLIDE-UP ────────────────────────────────────────────────────────────
const WordSlideUp = ({ text, className = "", delay = 0 }) => (
  <span className={className}>
    {text.split(" ").map((word, i) => (
      <span key={i} className="inline-block overflow-hidden">
        <Motion.span
          className="inline-block"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ delay: delay + i * 0.08, duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
        >
          {word}{i < text.split(" ").length - 1 ? " " : ""}
        </Motion.span>
      </span>
    ))}
  </span>
);

// ─── HERO ORBS ────────────────────────────────────────────────────────────────
const HeroOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <Motion.div
      className="absolute w-[800px] h-[800px] rounded-full blur-3xl"
      style={{ background: "radial-gradient(circle, rgba(190,109,86,0.20) 0%, transparent 65%)", top: "-25%", right: "-15%" }}
      animate={{ x: [0, 50, 0], y: [0, -40, 0] }}
      transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
    />
    <Motion.div
      className="absolute w-[550px] h-[550px] rounded-full blur-3xl"
      style={{ background: "radial-gradient(circle, rgba(209,171,131,0.16) 0%, transparent 70%)", bottom: "-5%", left: "-10%" }}
      animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
      transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
    />
    <Motion.div
      className="absolute w-[350px] h-[350px] rounded-full blur-2xl"
      style={{ background: "radial-gradient(circle, rgba(201,148,58,0.18) 0%, transparent 70%)", top: "40%", left: "38%" }}
      animate={{ x: [0, 35, -20, 0], y: [0, -25, 35, 0] }}
      transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Extra subtle orb for depth */}
    <Motion.div
      className="absolute w-[250px] h-[250px] rounded-full blur-2xl"
      style={{ background: "radial-gradient(circle, rgba(190,109,86,0.12) 0%, transparent 70%)", top: "15%", left: "25%" }}
      animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
    />
  </div>
);

// ─── FLOATING SHAPES ──────────────────────────────────────────────────────────
const FloatingShapes = () => {
  const shapes = [
    { w: 42, h: 54, top: "12%",  left: "7%",   rot: -14, delay: 0 },
    { w: 30, h: 38, top: "72%",  left: "4%",   rot:  9,  delay: 3 },
    { w: 50, h: 62, top: "18%",  right: "10%", rot:  16, delay: 1.5 },
    { w: 26, h: 34, top: "62%",  right: "7%",  rot: -9,  delay: 4 },
    { w: 38, h: 48, top: "46%",  left: "13%",  rot:  6,  delay: 2 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((s, i) => (
        <Motion.div
          key={i}
          className="absolute rounded"
          style={{
            width: s.w, height: s.h,
            top: s.top, left: s.left, right: s.right,
            rotate: s.rot,
            background: "rgba(209,171,131,0.05)",
            border: "1px solid rgba(209,171,131,0.15)",
          }}
          animate={{ y: [0, -16, 0], rotate: [s.rot, s.rot + 3, s.rot] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
        />
      ))}
      {[
        { top: "22%", left: "22%", delay: 0 },
        { top: "58%", left: "77%", delay: 1.5 },
        { top: "82%", left: "32%", delay: 3 },
        { top: "14%", left: "62%", delay: 2 },
        { top: "38%", left: "88%", delay: 0.8 },
      ].map((d, i) => (
        <Motion.div
          key={`dot-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full bg-brand-accent/40"
          style={{ top: d.top, left: d.left }}
          animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: d.delay }}
        />
      ))}
    </div>
  );
};

// ─── AURORA RAYS ──────────────────────────────────────────────────────────────
const BEAMS = [
  { w: 700, h: 100, top: "4%",  left: "-10%", angle: 30,  col: "rgba(190,109,86,0.10)",  dur: 22, delay: 0   },
  { w: 900, h: 80,  top: "62%", left: "22%",  angle: -18, col: "rgba(209,171,131,0.07)", dur: 28, delay: 8   },
  { w: 520, h: 120, top: "-6%", right: "6%",  angle: 44,  col: "rgba(201,148,58,0.08)",  dur: 19, delay: 4   },
  { w: 420, h: 70,  top: "78%", left: "58%",  angle: -12, col: "rgba(190,109,86,0.06)",  dur: 32, delay: 13  },
  { w: 620, h: 65,  top: "40%", left: "-18%", angle: 26,  col: "rgba(209,171,131,0.05)", dur: 26, delay: 17  },
];

const AuroraRays = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {BEAMS.map((b, i) => (
      <Motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: b.w, height: b.h,
          top: b.top, left: b.left, right: b.right,
          rotate: b.angle,
          background: `radial-gradient(ellipse at 40% 50%, ${b.col} 0%, transparent 65%)`,
          filter: "blur(38px)",
        }}
        animate={{ x: [0, 72, -28, 0], y: [0, -36, 18, 0], opacity: [0.5, 1, 0.65, 0.5] }}
        transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
      />
    ))}
  </div>
);

// ─── STAR FIELD ───────────────────────────────────────────────────────────────
const STARS = [
  { top:"7%",  left:"12%", s:1.5, d:3.5, dl:0,   c:0 },
  { top:"18%", left:"82%", s:1,   d:5,   dl:1.3, c:1 },
  { top:"33%", left:"6%",  s:2,   d:4.5, dl:0.7, c:2 },
  { top:"48%", left:"93%", s:1.5, d:6,   dl:2.1, c:0 },
  { top:"65%", left:"28%", s:1,   d:3,   dl:0.4, c:1 },
  { top:"78%", left:"74%", s:2,   d:5.5, dl:1.8, c:2 },
  { top:"91%", left:"45%", s:1.5, d:4,   dl:3.2, c:0 },
  { top:"11%", left:"57%", s:1,   d:7,   dl:0.9, c:1 },
  { top:"25%", left:"39%", s:2.5, d:4,   dl:2.6, c:2 },
  { top:"53%", left:"16%", s:1,   d:5,   dl:1.1, c:0 },
  { top:"70%", left:"88%", s:1.5, d:3.5, dl:3.8, c:1 },
  { top:"85%", left:"62%", s:1,   d:6,   dl:0.6, c:2 },
  { top:"42%", left:"50%", s:2,   d:4.5, dl:2.4, c:0 },
  { top:"15%", left:"25%", s:1,   d:5.5, dl:1.6, c:1 },
  { top:"58%", left:"71%", s:1.5, d:3,   dl:4.2, c:2 },
  { top:"95%", left:"10%", s:1,   d:4,   dl:0.2, c:0 },
];
const STAR_COLS = [
  "rgba(209,171,131,0.9)",
  "rgba(190,109,86,0.8)",
  "rgba(255,255,255,0.55)",
];

const StarField = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {STARS.map((p, i) => (
      <Motion.div
        key={i}
        className="absolute rounded-full"
        style={{ width: p.s, height: p.s, top: p.top, left: p.left, background: STAR_COLS[p.c] }}
        animate={{ opacity: [0.1, 0.85, 0.1], scale: [1, 1.9, 1] }}
        transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut", delay: p.dl }}
      />
    ))}
  </div>
);

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
const Counter = ({ value, suffix = "" }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  useEffect(() => {
    if (inView) animate(count, value, { duration: 2.4, ease: "easeOut" });
  }, [inView, count, value]);
  return <span ref={ref}><Motion.span>{rounded}</Motion.span>{suffix}</span>;
};

// ─── FADE UP ──────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.09, duration: 0.65, ease: [0.33, 1, 0.68, 1] },
  }),
};

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
const SectionLabel = ({ text, light = false }) => (
  <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 ${light ? "text-brand-accent" : "text-brand-terra"}`}>
    <span className={`w-6 h-px ${light ? "bg-brand-accent" : "bg-brand-terra"}`} />
    {text}
    <span className={`w-6 h-px ${light ? "bg-brand-accent" : "bg-brand-terra"}`} />
  </div>
);

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef(null);
  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 });
  const [spotVisible, setSpotVisible] = useState(false);

  const problems = [
    {
      icon: <AlertCircle className="w-5 h-5" />,
      title: "Admission Records on Paper",
      color: "text-red-500",
      bg: "bg-red-50",
      desc: "Inquiries tracked in notebooks, student files missing critical details, no way to quickly look up a student's history.",
    },
    {
      icon: <ClipboardList className="w-5 h-5" />,
      title: "Attendance Still Paper-Based",
      color: "text-orange-500",
      bg: "bg-orange-50",
      desc: "Teachers mark registers every morning. Parents find out about absences days later, sometimes never.",
    },
    {
      icon: <FileWarning className="w-5 h-5" />,
      title: "Exam Results in Spreadsheets",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      desc: "Marks shared over email. No unified results view. Students and parents wait weeks for printed report cards.",
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: "Fee Collection in Ledgers",
      color: "text-brand-terra",
      bg: "bg-orange-50/60",
      desc: "Manual receipts, no live view of who has paid and who hasn't. Defaulter lists compiled by hand every month.",
    },
    {
      icon: <Eye className="w-5 h-5" />,
      title: "Parents Kept in the Dark",
      color: "text-purple-600",
      bg: "bg-purple-50",
      desc: "Parents call the school for everything — attendance, marks, fee balance. There is no portal for them to check on their own.",
    },
  ];

  const modules = [
    { icon: <UserCheck />, title: "Admissions", desc: "New student applications, Transfer Certificates, and fee collection — handled from day one, without paperwork.", color: "bg-red-50 text-red-600" },
    { icon: <ClipboardList />, title: "Attendance", desc: "Teachers mark attendance in seconds. Parents see it the same day. Defaulter lists generate themselves.", color: "bg-orange-50 text-orange-600" },
    { icon: <BookOpen />, title: "Exams & Results", desc: "Teachers enter marks. Students and parents see ranked results and scorecards immediately.", color: "bg-yellow-50 text-yellow-700" },
    { icon: <CreditCard />, title: "Fee Management", desc: "Customised fee plans, installment schedules, online payment, and a daily collection report for your accountant.", color: "bg-green-50 text-green-600" },
    { icon: <Users />, title: "Staff Management", desc: "Track every staff member's attendance, leave, salary, and role assignment — all in one place.", color: "bg-blue-50 text-blue-600" },
    { icon: <MessageSquare />, title: "Parent Communication", desc: "Parents message teachers directly. School announcements reach every role automatically.", color: "bg-purple-50 text-purple-600" },
    { icon: <Calendar />, title: "Timetable", desc: "A clear weekly schedule for every class, linked to the right teacher and subject.", color: "bg-teal-50 text-teal-600" },
    { icon: <Bell />, title: "Announcements", desc: "Important notices reach every parent, teacher, and staff member — instantly and clearly.", color: "bg-pink-50 text-pink-600" },
  ];

  const stats = [
    { value: 9,   suffix: "",  label: "Dedicated Role Portals",  icon: <LayoutGrid className="w-5 h-5" /> },
    { value: 20,  suffix: "+", label: "Ready-to-Use Features",   icon: <Sparkles className="w-5 h-5" /> },
    { value: 0,   suffix: "",  label: "Setup Cost",              icon: <IndianRupee className="w-5 h-5" />, prefix: "₹" },
    { value: 100, suffix: "%", label: "Built for Indian Schools", icon: <Heart className="w-5 h-5" /> },
  ];

  const portals = [
    { role: "Director",           desc: "Full school overview — students, staff, fees, reports.", badge: "bg-purple-100 text-purple-700", icon: "🏛️" },
    { role: "Principal",          desc: "Attendance defaulters, fee status, and staff at a glance.", badge: "bg-blue-100 text-blue-700", icon: "👨‍💼" },
    { role: "Teacher",            desc: "Mark attendance and enter marks — only for their classes.", badge: "bg-green-100 text-green-700", icon: "👩‍🏫" },
    { role: "Student",            desc: "Own attendance, marks, fee balance, and timetable.", badge: "bg-cyan-100 text-cyan-700", icon: "🎓" },
    { role: "Parent",             desc: "Child's attendance, results, and fee status — live.", badge: "bg-teal-100 text-teal-700", icon: "👪" },
    { role: "Accountant",         desc: "Daily fee collection, defaulters, payment recording.", badge: "bg-orange-100 text-orange-700", icon: "💼" },
    { role: "Operator",           desc: "Admissions, student directory, staff, and exams.", badge: "bg-indigo-100 text-indigo-700", icon: "⚙️" },
    { role: "Receptionist",       desc: "Capture walk-in inquiries and student lookups.", badge: "bg-pink-100 text-pink-700", icon: "📞" },
    { role: "Non-Teaching Staff", desc: "View announcements and track own attendance.", badge: "bg-gray-100 text-gray-600", icon: "🧑‍🔧" },
  ];

  const steps = [
    {
      num: "01",
      icon: <Phone className="w-6 h-6" />,
      title: "Book a Free Demo",
      desc: "Talk to us for 30 minutes. We'll show you how the whole system works using examples from real Indian schools — no pressure.",
      color: "bg-brand-terra/10 text-brand-terra",
    },
    {
      num: "02",
      icon: <Zap className="w-6 h-6" />,
      title: "We Set Up Everything",
      desc: "No IT department needed. We configure your classes, subjects, fee heads, and staff accounts. You're ready in 24 hours.",
      color: "bg-blue-50 text-blue-600",
    },
    {
      num: "03",
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Your School Goes Digital",
      desc: "Every teacher, parent, and staff member logs into their own portal. Attendance, fees, exams — all running from day one.",
      color: "bg-green-50 text-green-600",
    },
  ];

  const differentiators = [
    {
      icon: <IndianRupee className="w-6 h-6" />,
      title: "Designed for Indian Schools",
      desc: "Aadhar records, Transfer Certificates, Indian board support, and fees structured the Indian way — built in from the start, not added as an afterthought.",
      accent: "border-brand-terra/30",
    },
    {
      icon: <LayoutGrid className="w-6 h-6" />,
      title: "9 Separate Portals",
      desc: "Every role in your school gets their own private login. The director sees the whole school. The teacher sees only their class. No confusion, no overlap.",
      accent: "border-blue-400/30",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & 100% Private",
      desc: "Your school's data belongs to your school — no one else. Every login is protected. Every action is logged. Full accountability, always.",
      accent: "border-green-400/30",
    },
  ];

  const testimonials = [
    {
      name: "School Director",
      org: "K-12 Private School, Pune",
      quote: "We went from tracking admissions in WhatsApp groups to having every inquiry, Transfer Certificate, and student record in one place. The director portal gives me the whole school at a glance.",
      initial: "D",
      color: "bg-purple-100 text-purple-700",
    },
    {
      name: "School Principal",
      org: "CBSE School, Nashik",
      quote: "The attendance defaulter list used to take half a day to put together every month. Now it's live on my screen the moment I log in. I know which students are falling behind before their parents do.",
      initial: "P",
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: "School Accountant",
      org: "State Board School, Aurangabad",
      quote: "The daily fee collection report is the first thing I check every morning. No more reconciling the ledger at the end of the day. Every payment is recorded and visible immediately.",
      initial: "A",
      color: "bg-green-100 text-green-700",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Infovion — School Management Software for Indian K-12 Schools</title>
        <meta name="description" content="Infovion is a complete school management platform for K-12 schools in India. Manage admissions, attendance, exams, fees and staff with 9 dedicated portals. CBSE, ICSE and State Board ready." />
        <link rel="canonical" href="https://buildwithinfovion.com/" />
      </Helmet>

      <Motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>

        {/* ── HERO ───────────────────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(145deg, #2C2A27 0%, #4A3835 55%, #2C2A27 100%)" }}
          onMouseMove={(e) => {
            const r = heroRef.current?.getBoundingClientRect();
            if (r) setSpotPos({ x: e.clientX - r.left, y: e.clientY - r.top });
          }}
          onMouseEnter={() => setSpotVisible(true)}
          onMouseLeave={() => setSpotVisible(false)}
        >
          <div className="absolute inset-0 bg-grid-animate opacity-60" />
          <AuroraRays />
          <HeroOrbs />
          <FloatingShapes />
          <StarField />
          <div className="meteor-1" />
          <div className="meteor-2" />

          {/* Spotlight */}
          <div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700"
            style={{
              opacity: spotVisible ? 1 : 0,
              background: `radial-gradient(900px circle at ${spotPos.x}px ${spotPos.y}px, rgba(209,171,131,0.06), transparent 40%)`,
            }}
          />

          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-28 pb-24">

            {/* Badge */}
            <Motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2.5 border border-brand-accent/35 bg-brand-accent/10 text-brand-accent text-sm font-semibold px-5 py-2.5 rounded-full mb-10"
            >
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              India's Most Complete School Management Platform
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </Motion.div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.05] tracking-tight">
              <WordSlideUp text="Run Your School." className="block" delay={0.12} />
              <WordSlideUp text="Not Spreadsheets." className="block text-brand-accent" delay={0.3} />
            </h1>

            <Motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.88, duration: 0.6 }}
              className="text-lg sm:text-xl text-brand-cream/75 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Infovion gives every person in your school their own private portal —
              from the Director to the Receptionist. Admissions, attendance,
              exams, fees, and parent communication. All in one place.
            </Motion.p>

            {/* CTAs */}
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.04, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
            >
              <Motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 btn-premium text-white px-8 py-4 rounded-full font-bold text-base"
                >
                  Book a Free Demo <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Motion.div>
              <Motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/features"
                  className="inline-flex items-center gap-2 border border-brand-cream/25 text-brand-cream px-8 py-4 rounded-full font-semibold text-base hover:border-brand-cream/50 hover:bg-white/5 transition-all duration-200"
                >
                  See All Features <ArrowRight className="w-4 h-4" />
                </Link>
              </Motion.div>
            </Motion.div>

            {/* Trust chips */}
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-5 text-sm text-brand-neutral mb-14"
            >
              {["Free Demo", "No Setup Fee", "No Contract", "India-First Design"].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-accent" /> {item}
                </span>
              ))}
            </Motion.div>

            {/* Stats */}
            <Motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {stats.map((s, i) => (
                <Motion.div
                  key={i}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="glass-card-dark rounded-2xl p-5 text-center border border-brand-accent/15 hover:border-brand-accent/35 transition-all duration-300"
                >
                  <div className="text-brand-terra flex justify-center mb-2">{s.icon}</div>
                  <div className="text-3xl font-extrabold text-white mb-1">
                    {s.prefix && <span>{s.prefix}</span>}
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-brand-neutral font-medium leading-tight">{s.label}</div>
                </Motion.div>
              ))}
            </Motion.div>
          </div>

          {/* Scroll indicator */}
          <Motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-brand-neutral/50 text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-5 h-9 rounded-full border border-brand-accent/30 flex items-start justify-center pt-1.5">
              <div className="w-1 h-2 rounded-full bg-brand-accent/50" />
            </div>
          </Motion.div>
        </section>

        {/* ── PROBLEM SECTION ───────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-brand-muted relative overflow-hidden">
          <div className="absolute inset-0 dot-grid-fine opacity-70" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <Motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
              <SectionLabel text="The Problem" />
              <h2 className="text-4xl sm:text-5xl font-bold text-brand-dark mb-5">
                Most Indian schools are still<br className="hidden sm:block" /> running on outdated systems.
              </h2>
              <p className="text-brand-neutral max-w-2xl mx-auto text-lg leading-relaxed">
                The same chaos appears in every school — big or small, CBSE or State Board.
              </p>
            </Motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {problems.map((p, i) => (
                <Motion.div
                  key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-brand-cream"
                >
                  <div className={`w-9 h-9 rounded-xl ${p.bg} ${p.color} flex items-center justify-center mb-4`}>
                    {p.icon}
                  </div>
                  <h3 className="font-bold text-brand-dark mb-2 text-sm leading-snug">{p.title}</h3>
                  <p className="text-xs text-brand-neutral leading-relaxed">{p.desc}</p>
                </Motion.div>
              ))}
            </div>

            <Motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-14 text-center">
              <div className="inline-block bg-white rounded-2xl px-8 py-5 shadow-card border border-brand-cream">
                <p className="text-xl sm:text-2xl font-bold text-brand-dark">
                  Infovion fixes all of this.{" "}
                  <span className="text-gradient-terra">One platform. Every operation. Every role.</span>
                </p>
              </div>
            </Motion.div>
          </div>
        </section>

        {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <Motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
              <SectionLabel text="How It Works" />
              <h2 className="text-4xl sm:text-5xl font-bold text-brand-dark mb-5">
                Up and running in{" "}
                <span className="text-gradient-terra">3 simple steps.</span>
              </h2>
              <p className="text-brand-neutral max-w-xl mx-auto text-lg">
                No IT team needed. No weeks of training. Your school is fully set up within 24 hours of your demo.
              </p>
            </Motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connector lines (desktop only) */}
              <div className="hidden md:block absolute top-[52px] left-[calc(33.33%+8px)] right-[calc(33.33%+8px)] h-px bg-gradient-to-r from-brand-terra/40 via-brand-accent/30 to-brand-terra/40" />

              {steps.map((s, i) => (
                <Motion.div
                  key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="relative text-center"
                >
                  {/* Step number */}
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <div className={`w-16 h-16 rounded-2xl ${s.color} flex items-center justify-center shadow-card relative z-10`}>
                      {s.icon}
                    </div>
                    <span className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-brand-dark text-white text-xs font-bold flex items-center justify-center z-20">
                      {s.num}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-3">{s.title}</h3>
                  <p className="text-sm text-brand-neutral leading-relaxed max-w-xs mx-auto">{s.desc}</p>
                </Motion.div>
              ))}
            </div>

            <Motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mt-12">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 btn-premium text-white px-8 py-4 rounded-full font-bold text-base"
              >
                Start with a Free Demo <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Motion.div>
          </div>
        </section>

        {/* ── STATS BAND ────────────────────────────────────────────────────── */}
        <section
          className="py-16 px-6 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #2C2A27 0%, #5A4A48 100%)" }}
        >
          <div className="absolute inset-0 bg-grid-animate opacity-70" />
          <AuroraRays />
          <StarField />
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(190,109,86,0.14)" }} />
          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { value: 9, suffix: "", label: "Role Portals", sub: "Every person has their own space" },
                { value: 20, suffix: "+", label: "Features", sub: "All live and ready to use" },
                { value: 30, suffix: " min", label: "Demo Session", sub: "See everything in one sitting" },
                { value: 24, suffix: "hrs", label: "Setup Time", sub: "From demo to fully live" },
              ].map((s, i) => (
                <Motion.div
                  key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="text-center py-4"
                >
                  <div className="text-4xl lg:text-5xl font-extrabold text-white mb-1">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-brand-accent font-semibold text-sm mb-1">{s.label}</div>
                  <div className="text-brand-neutral/70 text-xs">{s.sub}</div>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES GRID ─────────────────────────────────────────────────── */}
        <section
          className="py-24 px-6 bg-brand-cream/40 relative"
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            const el = e.currentTarget.querySelector(".spotlight-layer");
            if (el) el.style.background = `radial-gradient(600px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(190,109,86,0.04), transparent 40%)`;
          }}
        >
          <div className="spotlight-layer absolute inset-0 pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <Motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
              <SectionLabel text="What It Does" />
              <h2 className="text-4xl sm:text-5xl font-bold text-brand-dark mb-5">
                Everything your school needs,<br className="hidden sm:block" /> in one platform.
              </h2>
              <p className="text-brand-neutral max-w-xl mx-auto text-lg">
                From the first student enquiry to the final exam result — completely handled.
              </p>
            </Motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {modules.map((m, i) => (
                <Motion.div
                  key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-brand-cream"
                >
                  <div className={`w-10 h-10 rounded-xl ${m.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {React.cloneElement(m.icon, { className: "w-5 h-5" })}
                  </div>
                  <h3 className="font-bold text-brand-dark mb-2">{m.title}</h3>
                  <p className="text-sm text-brand-neutral leading-relaxed">{m.desc}</p>
                </Motion.div>
              ))}
            </div>

            <Motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mt-10">
              <Link to="/features" className="inline-flex items-center gap-2 text-brand-terra font-semibold hover:underline text-sm group">
                See every feature in detail
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Motion.div>
          </div>
        </section>

        {/* ── PORTALS ───────────────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <Motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
              <SectionLabel text="Role Portals" />
              <h2 className="text-4xl sm:text-5xl font-bold text-brand-dark mb-5">
                Every person in your school<br className="hidden sm:block" /> gets their own private portal.
              </h2>
              <p className="text-brand-neutral max-w-2xl mx-auto text-lg leading-relaxed">
                Not one admin panel with hidden buttons. Nine separate logins, each designed
                for exactly what that person needs to do — nothing more, nothing less.
              </p>
            </Motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {portals.slice(0, 5).map((p, i) => (
                <Motion.div
                  key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="bg-brand-muted rounded-2xl p-5 border border-brand-cream hover:border-brand-accent/40 hover:shadow-terra-sm transition-all duration-300"
                >
                  <div className="text-2xl mb-3">{p.icon}</div>
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-2 ${p.badge}`}>{p.role}</span>
                  <p className="text-xs text-brand-neutral leading-relaxed">{p.desc}</p>
                </Motion.div>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
              {portals.slice(5).map((p, i) => (
                <Motion.div
                  key={i} custom={i + 5} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="bg-brand-muted rounded-2xl p-5 border border-brand-cream hover:border-brand-accent/40 hover:shadow-terra-sm transition-all duration-300"
                >
                  <div className="text-2xl mb-3">{p.icon}</div>
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-2 ${p.badge}`}>{p.role}</span>
                  <p className="text-xs text-brand-neutral leading-relaxed">{p.desc}</p>
                </Motion.div>
              ))}
            </div>
            <Motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mt-10">
              <Link to="/portals" className="inline-flex items-center gap-2 text-brand-terra font-semibold hover:underline text-sm group">
                See what each portal can do
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Motion.div>
          </div>
        </section>

        {/* ── WHY INFOVION ──────────────────────────────────────────────────── */}
        <section
          className="py-24 px-6 relative overflow-hidden"
          style={{ background: "linear-gradient(145deg, #2C2A27 0%, #4A3835 60%, #2C2A27 100%)" }}
        >
          <div className="absolute inset-0 bg-grid-animate opacity-60" />
          <AuroraRays />
          <StarField />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(190,109,86,0.14)" }} />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(209,171,131,0.10)" }} />

          <div className="relative z-10 max-w-6xl mx-auto">
            <Motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
              <SectionLabel text="Why Infovion" light />
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5">
                Not just another school app.
              </h2>
              <p className="text-brand-cream/65 max-w-xl mx-auto text-lg">
                Most school software is built for Western schools and poorly adapted for India. Infovion is built ground-up for the way Indian schools actually work.
              </p>
            </Motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {differentiators.map((d, i) => (
                <Motion.div
                  key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className={`rounded-2xl p-8 border ${d.accent} hover:border-brand-accent/50 transition-all duration-300`}
                  style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(8px)" }}
                >
                  <div className="inline-flex p-3 rounded-xl bg-brand-terra/20 text-brand-accent mb-5">{d.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{d.title}</h3>
                  <p className="text-brand-cream/65 leading-relaxed text-sm">{d.desc}</p>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-brand-muted relative overflow-hidden">
          <div className="absolute inset-0 dot-grid-fine opacity-60" />
          <div className="relative z-10 max-w-6xl mx-auto">
            <Motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
              <SectionLabel text="What Schools Say" />
              <h2 className="text-4xl sm:text-5xl font-bold text-brand-dark mb-3">
                Trusted by school administrators.
              </h2>
              <p className="text-brand-neutral text-lg">Real feedback from real schools.</p>
            </Motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <Motion.div
                  key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-7 shadow-card hover:shadow-card-hover transition-all duration-300 border border-brand-cream flex flex-col"
                >
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-brand-accent text-brand-accent" />
                    ))}
                  </div>
                  {/* Quote */}
                  <div className="flex-1 mb-5">
                    <p className="text-xl text-brand-neutral/30 font-serif leading-none mb-2">"</p>
                    <p className="text-brand-dark/80 text-sm leading-relaxed">{t.quote}</p>
                  </div>
                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-brand-cream">
                    <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                      {t.initial}
                    </div>
                    <div>
                      <p className="font-semibold text-brand-dark text-sm">{t.name}</p>
                      <p className="text-xs text-brand-neutral">{t.org}</p>
                    </div>
                  </div>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-white">
          <Motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-4xl mx-auto">
            <div
              className="relative rounded-3xl p-12 lg:p-16 text-center overflow-hidden"
              style={{ background: "linear-gradient(145deg, #BE6D56 0%, #5A4A48 100%)" }}
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-grid-animate opacity-40" />
                <AuroraRays />
                <StarField />
                <div className="absolute w-80 h-80 rounded-full blur-3xl -top-20 -right-20" style={{ background: "rgba(255,255,255,0.07)" }} />
                <div className="absolute w-56 h-56 rounded-full blur-3xl -bottom-14 -left-14" style={{ background: "rgba(255,255,255,0.07)" }} />
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 text-brand-cream/90 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                  Free Demo — No Commitment
                </div>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
                  Ready to modernise<br className="hidden sm:block" /> your school?
                </h2>
                <p className="text-brand-cream/75 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
                  See every module and portal in a 30-minute live demo.
                  We'll walk through your school's exact workflow — admissions, attendance, fees, and more.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-white text-brand-terra px-8 py-4 rounded-full font-bold text-base shadow-lg hover:bg-brand-cream transition-colors"
                    >
                      Schedule a Free Demo <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </Motion.div>
                  <Motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    <Link
                      to="/for-schools"
                      className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-white/10 transition-colors"
                    >
                      See How It Works <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Motion.div>
                </div>
                {/* Email line */}
                <p className="mt-8 text-brand-cream/50 text-sm">
                  Or email us at{" "}
                  <a href="mailto:infovion2025@gmail.com" className="text-brand-cream/80 underline underline-offset-2 hover:text-white transition-colors">
                    infovion2025@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </Motion.div>
        </section>

      </Motion.main>
    </>
  );
}
