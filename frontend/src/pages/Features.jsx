import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  UserCheck, ClipboardList, BookOpen, CreditCard,
  Users, School, Calendar, Bell,
  Check, ArrowUpRight, ShieldCheck, Lock,
  Eye, FileCheck, Sparkles,
} from "lucide-react";

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  }),
};

const modules = [
  {
    id: "admissions",
    icon: <UserCheck className="w-6 h-6" />,
    label: "Admissions",
    color: "bg-red-50 text-red-600",
    title: "Admissions & Enrollment",
    subtitle: "From first enquiry to enrolled student — every step, tracked.",
    features: [
      "Every new student gets an automatic, standardised admission number",
      "Roll numbers are assigned automatically based on class and section",
      "Transfer Certificate check built-in — required for all students joining above Class 1",
      "Track walk-in, phone, and online enquiries all in one place",
      "Follow every applicant from Enquiry → Applied → Confirmed → Enrolled",
      "Store all required details: Aadhar number, Nationality, Religion, Caste Category",
      "Capture parent and guardian contact information at admission",
      "Manage academic years, classes, and sections from one screen",
    ],
  },
  {
    id: "attendance",
    icon: <ClipboardList className="w-6 h-6" />,
    label: "Attendance",
    color: "bg-orange-50 text-orange-600",
    title: "Attendance Tracking",
    subtitle: "Daily marking in seconds. Reports in one click.",
    features: [
      "Teachers mark attendance class-by-class every morning",
      "Four clear options: Present, Absent, Late, or On Leave",
      "Mark the whole class as Present or Absent in a single click",
      "If attendance was already marked today, it pre-fills automatically",
      "Monthly attendance summary per student, always available",
      "Automatic defaulter list — see every student below your set threshold (e.g., below 75%)",
      "The Principal sees attendance defaulters across all classes at once",
    ],
  },
  {
    id: "exams",
    icon: <BookOpen className="w-6 h-6" />,
    label: "Exams",
    color: "bg-yellow-50 text-yellow-700",
    title: "Examinations & Results",
    subtitle: "Marks in. Scorecards and rank lists out.",
    features: [
      "Create exams and link them to the correct academic year",
      "Assign subjects to each exam, per class",
      "Teachers enter marks subject-by-subject for each student",
      "Mark a student as absent directly in the marks entry screen",
      "Exams move through clear stages: Draft → Active → Completed",
      "A ranked result list for the whole class, generated automatically",
      "Each student gets their own personal scorecard to view results",
      "Report cards available on the platform",
    ],
  },
  {
    id: "fees",
    icon: <CreditCard className="w-6 h-6" />,
    label: "Fees",
    color: "bg-green-50 text-green-600",
    title: "Fee Management",
    subtitle: "Indian fee heads. Every collection. Zero confusion.",
    features: [
      "10 standard Indian fee categories are ready from day one — Tuition, Transport, Lab, Library, and more",
      "Set the exact fee amount per class, per year, per category",
      "Record every payment and issue a receipt",
      "See each student's outstanding balance at any time",
      "The accountant gets a daily fee collection report automatically",
      "A full defaulter list — sorted by class and year — always up to date",
      "Accept online fee payments from parents directly through the platform",
    ],
  },
  {
    id: "staff",
    icon: <Users className="w-6 h-6" />,
    label: "Staff",
    color: "bg-blue-50 text-blue-600",
    title: "Staff Management",
    subtitle: "Every staff role, attendance, and leave — managed.",
    features: [
      "Create staff accounts and assign them the right role",
      "Nine roles available: Director, Operator, Principal, Teacher, Receptionist, Accountant, and more",
      "A full staff directory with profiles and contact details",
      "Reset any staff member's password; deactivate or reactivate accounts instantly",
      "Staff clock in and out — attendance is tracked automatically",
      "Staff can submit leave requests; managers approve or reject them",
      "Deactivated accounts are blocked immediately — no access at any stage",
      "Every action on the platform is logged with name, date, and time",
    ],
  },
  {
    id: "portals",
    icon: <School className="w-6 h-6" />,
    label: "Student & Parent",
    color: "bg-purple-50 text-purple-600",
    title: "Student & Parent Portals",
    subtitle: "Students see their own data. Parents see their child's.",
    features: [
      "Students log in and see their own monthly attendance record",
      "Students view their exam marks and personal scorecard per exam",
      "Students check their current fee balance and payment history",
      "Students see their class timetable and school announcements",
      "Parents see their child's attendance — including absent days",
      "Parents view their child's exam results and scorecard",
      "Parents see their child's fee balance and what has been paid",
      "Each parent account is securely linked to their specific child",
    ],
  },
  {
    id: "timetable",
    icon: <Calendar className="w-6 h-6" />,
    label: "Timetable",
    color: "bg-teal-50 text-teal-600",
    title: "Timetable",
    subtitle: "Weekly period grid. Teacher and student views.",
    features: [
      "A clear weekly schedule for every class in the school",
      "Each period slot shows the subject and the assigned teacher",
      "Teachers see their own timetable with their assigned class periods",
      "Students see their class schedule for the week",
      "The Principal can view timetables across all classes at once",
      "Subject codes supported for quick reference",
      "Teacher-to-subject assignments managed from one screen",
      "22 standard Indian subjects are available from the first day",
    ],
  },
  {
    id: "announcements",
    icon: <Bell className="w-6 h-6" />,
    label: "Announcements",
    color: "bg-pink-50 text-pink-600",
    title: "Announcements & Communication",
    subtitle: "School-wide or class-specific. All roles notified.",
    features: [
      "Post announcements visible to every person in the school",
      "Send class-specific announcements to selected classes only",
      "Directors, Operators, and Principals can all post notices",
      "Every role sees announcements relevant to them in their own portal",
      "Announcements are never permanently deleted — full history kept",
      "Each notice shows who posted it and when",
      "Parents receive school and class announcements directly in their portal",
    ],
  },
];

const trustPoints = [
  {
    icon: <Lock className="w-5 h-5" />,
    color: "bg-red-50 text-red-600",
    title: "Every Login is Secure",
    desc: "Your staff, teachers, and parents log in safely. Unauthorised access is blocked at every step. Accounts can be deactivated instantly.",
  },
  {
    icon: <Eye className="w-5 h-5" />,
    color: "bg-blue-50 text-blue-600",
    title: "Each Person Sees Only What They Need",
    desc: "A teacher sees only their own classes. A parent sees only their child. The Director sees everything. No accidental overlap, ever.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    color: "bg-green-50 text-green-600",
    title: "Your School's Data is 100% Private",
    desc: "Your school is completely isolated on the platform. No other school can ever see your students, staff, or fee records.",
  },
  {
    icon: <FileCheck className="w-5 h-5" />,
    color: "bg-purple-50 text-purple-600",
    title: "Every Change Leaves a Record",
    desc: "Every action taken on the platform — adding a student, recording a fee, editing a result — is automatically logged with a name and timestamp.",
  },
];

export default function Features() {
  const [activeTab, setActiveTab] = useState("admissions");
  const activeModule = modules.find((m) => m.id === activeTab);

  return (
    <>
      <Helmet>
        <title>School Management Features | Admissions, Attendance, Fees & More — Infovion</title>
        <meta
          name="description"
          content="Explore Infovion's complete school management features: student admissions, daily attendance, exam results, fee collection, staff management, timetable and parent communication. Built for K-12 schools in India."
        />
        <meta name="keywords" content="school management software features, attendance management schools India, fee collection software schools, student admission software, exam results management, school staff management India" />
        <link rel="canonical" href="https://buildwithinfovion.com/features" />
        <meta property="og:title" content="School Management Features — Infovion" />
        <meta property="og:description" content="Complete school management: admissions, attendance, exams, fees, staff, timetable. Built for India." />
        <meta property="og:url" content="https://buildwithinfovion.com/features" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Motion.main initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="pt-[72px]">

        {/* ── PAGE HERO ──────────────────────────────────────────────────────── */}
        <section
          className="py-20 px-6 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(180deg, #F7F4F3 0%, #ffffff 100%)" }}
        >
          <div className="absolute inset-0 dot-grid-fine opacity-60" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <Motion.div
              variants={fadeUp} initial="hidden" animate="visible"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-terra mb-5"
            >
              <span className="w-5 h-px bg-brand-terra" /> Everything Your School Needs <span className="w-5 h-px bg-brand-terra" />
            </Motion.div>
            <Motion.h1
              variants={fadeUp} custom={1} initial="hidden" animate="visible"
              className="text-5xl font-extrabold text-brand-dark mb-5 leading-tight"
            >
              Every school operation,<br />
              <span className="text-gradient-terra">fully handled.</span>
            </Motion.h1>
            <Motion.p
              variants={fadeUp} custom={2} initial="hidden" animate="visible"
              className="text-lg text-brand-neutral leading-relaxed mb-8 max-w-xl mx-auto"
            >
              From the first student enquiry to the final exam result —
              every process your school runs, in one platform, for every role.
            </Motion.p>
            <Motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 btn-premium text-white px-7 py-3.5 rounded-full font-bold"
              >
                Book a Free Demo <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Motion.div>
          </div>
        </section>

        {/* ── MODULE EXPLORER ────────────────────────────────────────────────── */}
        <section className="py-16 px-6 bg-brand-muted/60">
          <div className="max-w-7xl mx-auto">

            {/* Tab nav */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {modules.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveTab(m.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeTab === m.id
                      ? "bg-brand-terra text-white shadow-terra-sm"
                      : "bg-white text-brand-neutral border border-brand-cream hover:border-brand-accent/50 hover:text-brand-dark"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${activeTab === m.id ? "bg-white" : "bg-brand-terra/40"}`} />
                  {m.label}
                </button>
              ))}
            </div>

            {/* Active module card */}
            {activeModule && (
              <Motion.div
                key={activeModule.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, ease: [0.33, 1, 0.68, 1] }}
                className="bg-white border border-brand-cream rounded-3xl p-8 lg:p-12 shadow-card"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                  <div>
                    <div className={`inline-flex items-center gap-3 ${activeModule.color} px-4 py-2 rounded-xl mb-5`}>
                      {activeModule.icon}
                      <span className="font-bold text-sm">{activeModule.label}</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-brand-dark mb-3 leading-tight">
                      {activeModule.title}
                    </h2>
                    <p className="text-brand-neutral text-lg mb-6 leading-relaxed">{activeModule.subtitle}</p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-brand-terra font-bold text-sm hover:underline group"
                    >
                      See this in a live demo
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                  <ul className="space-y-3">
                    {activeModule.features.map((f, i) => (
                      <Motion.li
                        key={i}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.35 }}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-brand-terra/12 text-brand-terra flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3" />
                        </span>
                        <span className="text-brand-brown text-sm leading-relaxed">{f}</span>
                      </Motion.li>
                    ))}
                  </ul>
                </div>
              </Motion.div>
            )}
          </div>
        </section>

        {/* ── ALL MODULES GRID ───────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <Motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
              <h2 className="text-4xl font-extrabold text-brand-dark mb-4">
                All features at a glance
              </h2>
              <p className="text-brand-neutral max-w-xl mx-auto text-lg">
                Everything is live and ready to use from your very first day on the platform.
              </p>
            </Motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {modules.map((m, i) => (
                <Motion.button
                  key={m.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  onClick={() => {
                    setActiveTab(m.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="group text-left bg-white border border-brand-cream rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:border-brand-accent/40 transition-all duration-300"
                >
                  <div className={`w-10 h-10 rounded-xl ${m.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {React.cloneElement(m.icon, { className: "w-5 h-5" })}
                  </div>
                  <h3 className="font-bold text-brand-dark mb-1 text-sm">{m.title}</h3>
                  <p className="text-xs text-brand-neutral leading-relaxed">{m.subtitle}</p>
                </Motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRUST SECTION ──────────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-brand-muted/60">
          <div className="max-w-5xl mx-auto">
            <Motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-terra mb-4">
                <span className="w-5 h-px bg-brand-terra" /> Built With Trust <span className="w-5 h-px bg-brand-terra" />
              </div>
              <h2 className="text-3xl font-extrabold text-brand-dark mb-3">
                Your school's data is safe with us.
              </h2>
              <p className="text-brand-neutral max-w-lg mx-auto">
                Every part of the platform is designed to keep your school's information private, accurate, and in the right hands.
              </p>
            </Motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {trustPoints.map((t, i) => (
                <Motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-brand-cream rounded-2xl p-6 shadow-card flex gap-4 transition-all duration-300 hover:shadow-card-hover"
                >
                  <div className={`w-10 h-10 rounded-xl ${t.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    {t.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark mb-1.5">{t.title}</h3>
                    <p className="text-sm text-brand-neutral leading-relaxed">{t.desc}</p>
                  </div>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-white">
          <Motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-terra mb-5">
              <Sparkles className="w-3.5 h-3.5" /> Free Demo Available
            </div>
            <h2 className="text-4xl font-extrabold text-brand-dark mb-4 leading-tight">
              See every feature in a live demo.
            </h2>
            <p className="text-brand-neutral mb-8 text-lg leading-relaxed max-w-xl mx-auto">
              We'll walk through every module with your school's workflow in mind.
              Free, no commitment, and under 30 minutes.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 btn-premium text-white px-8 py-4 rounded-full font-bold text-base"
            >
              Request a Free Demo <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Motion.div>
        </section>

      </Motion.main>
    </>
  );
}
