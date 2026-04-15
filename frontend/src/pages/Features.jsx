import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  UserCheck,
  ClipboardList,
  BookOpen,
  CreditCard,
  Users,
  School,
  Calendar,
  Bell,
  Check,
  ArrowUpRight,
  ShieldCheck,
  Database,
  Lock,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  }),
};

const modules = [
  {
    id: "admissions",
    icon: <UserCheck className="w-6 h-6" />,
    label: "Admissions",
    title: "Admissions & Enrollment",
    subtitle: "From inquiry to enrolled — every step, tracked.",
    features: [
      "Auto-generated admission numbers (ADM-YYYY-XXXX format)",
      "Auto roll number assignment per class and section",
      "Transfer Certificate (TC) validation — enforced for Class 2+, skipped for Class 1",
      "Inquiry management: capture walk-in, phone, and online inquiries",
      "Admission status pipeline: Inquiry → Applied → Confirmed → Enrolled",
      "Full demographic fields: Aadhar Number, Nationality, Religion, Caste Category",
      "Parent details capture with contact information",
      "Academic year and class hierarchy management",
    ],
  },
  {
    id: "attendance",
    icon: <ClipboardList className="w-6 h-6" />,
    label: "Attendance",
    title: "Attendance Tracking",
    subtitle: "Daily marking in seconds. Reports in one click.",
    features: [
      "Daily attendance marking per class by the assigned teacher",
      "Status cycle: Present → Absent → Late → Leave",
      "Bulk marking: All Present / All Absent in one click",
      "Pre-fills previous attendance if already marked for the day",
      "Monthly attendance report per student",
      "Attendance defaulter list with configurable threshold (e.g., below 75%)",
      "Principal view: defaulters across all classes at a glance",
      "Parent notification on absence (SMS/push — roadmap)",
    ],
  },
  {
    id: "exams",
    icon: <BookOpen className="w-6 h-6" />,
    label: "Exams",
    title: "Examinations & Results",
    subtitle: "Marks in. Scorecards and rank lists out.",
    features: [
      "Exam creation linked to academic year",
      "Subject assignment per exam per class",
      "Bulk marks entry by teacher (per subject, per student)",
      "Absent toggle per student in marks entry",
      "Exam status lifecycle: Draft → Active → Completed",
      "Rank-wise class result summary",
      "Individual student scorecard view",
      "Admit card generation (roadmap)",
      "Report card PDF (roadmap)",
    ],
  },
  {
    id: "fees",
    icon: <CreditCard className="w-6 h-6" />,
    label: "Fees",
    title: "Fee Management",
    subtitle: "Indian fee heads. Every collection. Zero confusion.",
    features: [
      "10 Indian-standard fee heads seeded on institution setup (Tuition, Transport, Lab, Library, etc.)",
      "Fee structure: configurable amount per class per academic year per fee head",
      "Payment recording with receipt generation",
      "Per-student outstanding balance view",
      "Daily collection report for the accountant",
      "Fee defaulter list with outstanding amounts (year-wise, class-wise)",
      "Razorpay online fee payment integration (roadmap)",
      "Fee receipt PDF generation (roadmap)",
    ],
  },
  {
    id: "staff",
    icon: <Users className="w-6 h-6" />,
    label: "Staff",
    title: "Staff Management",
    subtitle: "Every staff role, attendance, and leave — managed.",
    features: [
      "Staff account creation with role assignment",
      "Role hierarchy: Director, Operator, Principal, Teacher, Receptionist, Accountant",
      "Staff directory with profiles and contact information",
      "Password reset and account deactivation / reactivation",
      "Staff attendance: clock-in / clock-out system",
      "Leave request and approval workflow",
      "Account block enforcement: deactivated accounts rejected at every API call",
      "Audit trail: every action logged with user ID and timestamp",
    ],
  },
  {
    id: "portals",
    icon: <School className="w-6 h-6" />,
    label: "Portals",
    title: "Student & Parent Portals",
    subtitle: "Students see their own data. Parents see their child's.",
    features: [
      "Student portal: own attendance history (monthly view)",
      "Student portal: exam marks and scorecard per exam",
      "Student portal: fee balance and payment history",
      "Student portal: timetable and announcements",
      "Parent portal: child's attendance with absent alerts",
      "Parent portal: child's exam results and scorecard",
      "Parent portal: child's fee balance and payment history",
      "Parent account securely linked to a specific student record",
    ],
  },
  {
    id: "timetable",
    icon: <Calendar className="w-6 h-6" />,
    label: "Timetable",
    title: "Timetable",
    subtitle: "Weekly period grid. Teacher and student views.",
    features: [
      "Weekly period grid per class",
      "Subject + teacher mapping per period slot",
      "Teacher-facing timetable: view assigned class periods",
      "Student-facing timetable: view class schedule",
      "Principal-facing timetable overview across all classes",
      "Subject assignment to classes with code support",
      "Teacher assignment to subjects per class",
      "22 Indian-standard subjects seeded on institution setup",
    ],
  },
  {
    id: "announcements",
    icon: <Bell className="w-6 h-6" />,
    label: "Announcements",
    title: "Announcements",
    subtitle: "School-wide or class-specific. All roles notified.",
    features: [
      "School-wide announcements visible to all roles",
      "Class-specific targeted announcements for selected classes",
      "Director, Operator, and Principal can create announcements",
      "All portals display relevant announcements in-feed",
      "Soft delete: removed announcements not permanently deleted",
      "Timestamp and author tracked on every announcement",
    ],
  },
];

const technicalHighlights = [
  {
    icon: <Lock className="w-5 h-5" />,
    title: "JWT + httpOnly Cookie Auth",
    desc: "15-minute access tokens with 7-day refresh rotation. Stored in httpOnly cookies — XSS-resistant.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Role-Based Access Control",
    desc: "Every API endpoint guarded by AuthGuard + RolesGuard. Roles and permissions stored in the database.",
  },
  {
    icon: <Database className="w-5 h-5" />,
    title: "Multi-Tenant Isolation",
    desc: "Every record carries an institution_id. TenantMiddleware scopes every query automatically.",
  },
  {
    icon: <ClipboardList className="w-5 h-5" />,
    title: "Audit Trail",
    desc: "Every write action logged with user ID, institution ID, resource type, and timestamp. Append-only.",
  },
];

export default function Features() {
  const [activeTab, setActiveTab] = useState("admissions");
  const activeModule = modules.find((m) => m.id === activeTab);

  return (
    <>
      <Helmet>
        <title>Features — Infovion School Management Software India</title>
        <meta
          name="description"
          content="Explore Infovion's 8 modules: admissions, attendance, examinations, fee management, staff management, student & parent portals, timetable, and announcements. Built for K-12 schools in India."
        />
        <link rel="canonical" href="https://buildwithinfovion.com/features" />
        <meta property="og:title" content="Features — Infovion School Management Software" />
        <meta property="og:url" content="https://buildwithinfovion.com/features" />
      </Helmet>

      <Motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="pt-24"
      >
        {/* Hero */}
        <section className="py-20 px-6 text-center bg-white">
          <div className="max-w-3xl mx-auto">
            <Motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-brand-terra font-semibold text-xs uppercase tracking-widest mb-4"
            >
              Complete Feature Set
            </Motion.p>
            <Motion.h1
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="visible"
              className="text-5xl font-extrabold text-brand-dark mb-5 leading-tight"
            >
              Eight Modules.
              <br />
              <span className="text-brand-terra">Every School Operation.</span>
            </Motion.h1>
            <Motion.p
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="visible"
              className="text-lg text-brand-neutral leading-relaxed mb-8"
            >
              From the first student inquiry to final exam results — every
              process your school runs, digitized and connected.
            </Motion.p>
            <Motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-brand-terra text-white px-7 py-3.5 rounded-full font-semibold shadow-lg shadow-brand-terra/25 hover:bg-[#a85d48] transition-colors"
              >
                Request a Demo <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Motion.div>
          </div>
        </section>

        {/* Module Explorer */}
        <section className="py-16 px-6 bg-brand-cream/30">
          <div className="max-w-7xl mx-auto">
            {/* Tab nav */}
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {modules.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveTab(m.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeTab === m.id
                      ? "bg-brand-terra text-white shadow-lg shadow-brand-terra/20"
                      : "bg-white text-brand-neutral border border-brand-cream hover:border-brand-accent"
                  }`}
                >
                  {React.cloneElement(m.icon, { className: "w-4 h-4" })}
                  {m.label}
                </button>
              ))}
            </div>

            {/* Active module card */}
            {activeModule && (
              <Motion.div
                key={activeModule.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                className="bg-white border border-brand-cream rounded-3xl p-8 lg:p-12 shadow-sm"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                  <div>
                    <div className="inline-flex items-center gap-3 bg-brand-cream text-brand-terra px-4 py-2 rounded-xl mb-5">
                      {activeModule.icon}
                      <span className="font-semibold text-sm">{activeModule.label}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-brand-dark mb-3">
                      {activeModule.title}
                    </h2>
                    <p className="text-brand-neutral text-lg mb-6">{activeModule.subtitle}</p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-brand-terra font-semibold text-sm hover:underline"
                    >
                      See this in a demo <ArrowUpRight className="w-4 h-4" />
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
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-brand-terra/10 text-brand-terra flex items-center justify-center flex-shrink-0">
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

        {/* All modules grid */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <Motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl font-bold text-brand-dark mb-3">
                Every Module at a Glance
              </h2>
              <p className="text-brand-neutral max-w-xl mx-auto">
                All eight modules are live and production-ready as of April 2026.
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
                  className="group text-left bg-white border border-brand-cream rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-brand-terra/8 hover:border-brand-accent/40 transition-all duration-300"
                >
                  <div className="bg-brand-cream text-brand-terra p-2.5 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                    {m.icon}
                  </div>
                  <h3 className="font-bold text-brand-dark mb-1 text-sm">{m.title}</h3>
                  <p className="text-xs text-brand-neutral leading-relaxed">{m.subtitle}</p>
                </Motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Technical highlights */}
        <section className="py-20 px-6 bg-brand-cream/30">
          <div className="max-w-5xl mx-auto">
            <Motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-brand-terra font-semibold text-xs uppercase tracking-widest mb-3">
                Under the Hood
              </p>
              <h2 className="text-3xl font-bold text-brand-dark">Built Secure by Default</h2>
            </Motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {technicalHighlights.map((t, i) => (
                <Motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-brand-cream rounded-2xl p-6 shadow-sm flex gap-4"
                >
                  <div className="text-brand-terra flex-shrink-0 mt-0.5">{t.icon}</div>
                  <div>
                    <h3 className="font-bold text-brand-dark mb-1 text-sm">{t.title}</h3>
                    <p className="text-xs text-brand-neutral leading-relaxed">{t.desc}</p>
                  </div>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-white">
          <Motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-brand-dark mb-4">
              See every feature in a live demo.
            </h2>
            <p className="text-brand-neutral mb-8">
              We'll walk through every module with your school's context in mind. Free. No commitment.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-brand-terra text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-brand-terra/25 hover:bg-[#a85d48] transition-colors"
            >
              Request a Free Demo <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Motion.div>
        </section>
      </Motion.main>
    </>
  );
}
