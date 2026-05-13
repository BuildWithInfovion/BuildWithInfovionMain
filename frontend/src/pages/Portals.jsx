import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  UserCheck,
  CreditCard,
  Phone,
  BarChart3,
  Briefcase,
  Check,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  }),
};

const portals = [
  {
    id: "director",
    role: "Director",
    tagline: "Full school visibility. From anywhere.",
    desc: "The school owner or trustee gets a complete operational overview — student counts, fee collection, attendance summary, and staff status — all on one screen.",
    icon: <LayoutDashboard className="w-6 h-6" />,
    capabilities: [
      "School overview: student count, staff count, attendance summary, fee collection",
      "Institution settings and academic year management",
      "Class structure setup (Standard → Section hierarchy)",
      "All module access: attendance, exams, fees, announcements, timetable",
      "Staff management: view all roles, reset passwords, deactivate accounts",
      "Reports: attendance trends, fee collection, academic performance",
      "School-wide and class-specific announcements",
      "Student promotion engine: bulk promote, hold-back, or transfer",
    ],
  },
  {
    id: "operator",
    role: "Operator",
    tagline: "The school office, fully digitized.",
    desc: "The school administrator or office manager handles admissions, student directory, staff creation, fee management, and exam setup from one unified dashboard.",
    icon: <Users className="w-6 h-6" />,
    capabilities: [
      "Student admission: full multi-step form with all demographic fields",
      "Student directory: class-first view, search by name/roll/class, Excel export",
      "Inquiry tracking: capture, follow-up, convert to admission",
      "Staff CRUD: create accounts, assign roles, manage profiles",
      "Fee management: record payments, view balances, run daily collection",
      "Exam management: create exams, assign subjects, manage lifecycle",
      "Announcement creation for school-wide and class-specific notices",
      "Attendance reports across all classes",
    ],
  },
  {
    id: "principal",
    role: "Principal",
    tagline: "Operational data. No digging required.",
    desc: "The academic head sees what matters most: who's defaulting on attendance, who's behind on fees, and how the school is performing — all in one view.",
    icon: <BarChart3 className="w-6 h-6" />,
    capabilities: [
      "Overview: total students, academic year, class count, staff count",
      "Attendance defaulters across all classes (configurable threshold)",
      "Fee defaulters list with outstanding amounts",
      "Attendance reports per class and per student",
      "Fee collection reports",
      "School timetable overview",
      "Staff attendance tracking",
      "Announcement creation and management",
    ],
  },
  {
    id: "teacher",
    role: "Teacher",
    tagline: "Attendance and marks. Fast.",
    desc: "Teachers mark attendance and enter exam marks for their assigned classes — no more registers, no more Excel files shared over email.",
    icon: <GraduationCap className="w-6 h-6" />,
    capabilities: [
      "Dashboard showing assigned classes for the day",
      "Attendance marking: select class → select date → mark each student",
      "Status options: Present / Absent / Late / Leave per student",
      "Bulk marking: All Present or All Absent in one click",
      "Pre-fills attendance if already marked for that date",
      "Marks entry: select exam → select class → select subject → enter marks per student",
      "Absent toggle in marks entry (marks excused absences)",
      "Class timetable view and announcements",
    ],
  },
  {
    id: "student",
    role: "Student",
    tagline: "Your school life. In your hands.",
    desc: "Students can check their own attendance history, exam marks, fee balance, and class timetable — without calling the office.",
    icon: <BookOpen className="w-6 h-6" />,
    capabilities: [
      "Own attendance history (monthly calendar view)",
      "Exam marks and scorecard per exam",
      "Overall performance summary across exams",
      "Fee balance and payment history",
      "Class timetable view",
      "School and class-specific announcements",
      "Profile with personal and academic details",
      "Password reset from within the portal",
    ],
  },
  {
    id: "parent",
    role: "Parent",
    tagline: "Your child's school life. Visible.",
    desc: "Parents get real-time access to their child's attendance, exam results, and fee balance — securely linked to one specific student account.",
    icon: <UserCheck className="w-6 h-6" />,
    capabilities: [
      "Child's attendance history with absent day highlight",
      "Child's exam results and scorecard (all exams)",
      "Child's fee balance and complete payment history",
      "School announcements relevant to child's class",
      "Secure parent-student linking: sees only their child's data",
      "Mobile-responsive: works on any smartphone",
      "Parent absence notification coming soon",
      "No overlap with other students' data — your child's records are completely private",
    ],
  },
  {
    id: "receptionist",
    role: "Receptionist",
    tagline: "Front desk operations. All in one place.",
    desc: "The reception team captures inquiries, records fee payments, and handles student lookups — without needing access to the full admin dashboard.",
    icon: <Phone className="w-6 h-6" />,
    capabilities: [
      "Student inquiry capture: walk-in, phone, online inquiry logging",
      "Inquiry follow-up status tracking",
      "Fee payment recording for students",
      "Student lookup and directory",
      "Announcements view",
      "Access scoped only to reception-relevant operations",
      "No access to exam marks, staff data, or institution settings",
    ],
  },
  {
    id: "accountant",
    role: "Accountant",
    tagline: "Fee collections. Defaulters. Daily reports.",
    desc: "The school accountant has everything needed to manage fee collection — daily reports, outstanding balances, and defaulter tracking — in one focused portal.",
    icon: <CreditCard className="w-6 h-6" />,
    capabilities: [
      "Daily collection report: total collected today across all students",
      "Student fee balance view: outstanding per student",
      "Fee defaulter list: year-wise and class-wise with outstanding amounts",
      "Payment recording with receipt generation",
      "Fee head and fee structure management",
      "Complete payment history per student",
      "Access scoped to finance operations only — no academic data",
      "Fee receipt PDF generation coming soon",
    ],
  },
  {
    id: "nonteaching",
    role: "Non-Teaching Staff",
    tagline: "Your role. Your access. Nothing extra.",
    desc: "Support staff — librarians, lab assistants, and other non-teaching roles — get a simple, focused portal for their own attendance, leave, and school announcements.",
    icon: <Briefcase className="w-6 h-6" />,
    capabilities: [
      "Own attendance record and leave status",
      "School-wide announcements relevant to all staff",
      "Personal profile with contact and role details",
      "Leave request and approval status",
      "No access to student data, exam marks, or fee information",
      "Simple, clutter-free interface with only what's relevant",
      "Works on any smartphone — no app download required",
    ],
  },
];

export default function Portals() {
  const [selected, setSelected] = useState("director");
  const active = portals.find((p) => p.id === selected);

  return (
    <>
      <Helmet>
        <title>School ERP Portals: Director, Teacher, Parent & More | Infovion India</title>
        <meta
          name="description"
          content="Infovion provides 9 separate role portals for every school stakeholder — Director, Principal, Teacher, Student, Parent, Accountant, Operator, Receptionist, Non-Teaching Staff. Purpose-built school management access."
        />
        <meta name="keywords" content="school ERP role portals India, teacher portal school, parent portal school India, student portal school, principal dashboard school ERP, school director portal, school management roles India" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://buildwithinfovion.com/portals" />
        <meta property="og:title" content="School ERP Role Portals — Infovion" />
        <meta property="og:description" content="9 purpose-built portals for every school role. Director, Principal, Teacher, Student, Parent — each sees exactly what they need." />
        <meta property="og:url" content="https://buildwithinfovion.com/portals" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="pt-24"
      >
        {/* Hero */}
        <section className="py-20 px-6 bg-white text-center">
          <div className="max-w-3xl mx-auto">
            <Motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-brand-terra font-semibold text-xs uppercase tracking-widest mb-4"
            >
              9 Dedicated Portals
            </Motion.p>
            <Motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-5xl font-extrabold text-brand-dark mb-5 leading-tight"
            >
              Every Role Gets
              <br />
              <span className="text-brand-terra">Their Own Portal.</span>
            </Motion.h1>
            <Motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-brand-neutral leading-relaxed"
            >
              Not one admin panel with hidden buttons. Nine completely separate,
              purpose-designed interfaces — one for every person in the school.
            </Motion.p>
          </div>
        </section>

        {/* Portal grid overview */}
        <section className="py-8 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {portals.map((p, i) => (
                <Motion.button
                  key={p.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  onClick={() => setSelected(p.id)}
                  whileHover={{ y: -4, scale: 1.04 }}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-200 text-center ${
                    selected === p.id
                      ? "border-brand-terra/40 bg-brand-terra/8 shadow-lg shadow-brand-terra/10"
                      : "border-brand-cream bg-white hover:border-brand-accent/40"
                  }`}
                  style={selected === p.id ? { backgroundColor: "rgba(190,109,86,0.06)" } : {}}
                >
                  <div
                    className={`p-2 rounded-xl transition-colors ${
                      selected === p.id
                        ? "bg-brand-terra/15 text-brand-terra"
                        : "text-brand-neutral"
                    }`}
                  >
                    {React.cloneElement(p.icon, { className: "w-5 h-5" })}
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      selected === p.id ? "text-brand-terra" : "text-brand-neutral"
                    }`}
                  >
                    {p.role}
                  </span>
                </Motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Active portal detail */}
        <section className="py-12 px-6 bg-brand-cream/30">
          <div className="max-w-7xl mx-auto">
            {active && (
              <Motion.div
                key={active.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                className="bg-white border border-brand-cream rounded-3xl p-8 lg:p-12 shadow-sm"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                  <div>
                    <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-5 bg-brand-terra/10 text-brand-terra">
                      {active.role} Portal
                    </span>
                    <h2 className="text-3xl font-bold text-brand-dark mb-3">{active.tagline}</h2>
                    <p className="text-brand-neutral leading-relaxed mb-6">{active.desc}</p>
                    <div className="flex gap-3">
                      <Link
                        to="/contact"
                        className="btn-premium inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-full text-sm font-bold"
                      >
                        See Demo <ArrowUpRight className="w-4 h-4" />
                      </Link>
                      <Link
                        to="/features"
                        className="inline-flex items-center gap-2 border border-brand-cream text-brand-brown px-5 py-2.5 rounded-full text-sm font-semibold hover:border-brand-accent transition-colors"
                      >
                        View Features <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {active.capabilities.map((c, i) => (
                      <Motion.li
                        key={i}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.35 }}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-brand-terra/10 text-brand-terra flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3" />
                        </span>
                        <span className="text-brand-brown text-sm leading-relaxed">{c}</span>
                      </Motion.li>
                    ))}
                  </ul>
                </div>
              </Motion.div>
            )}
          </div>
        </section>

        {/* Why separate portals */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <Motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-brand-dark mb-4">
                Why separate portals, not one admin panel?
              </h2>
              <p className="text-brand-neutral leading-relaxed max-w-2xl mx-auto">
                In a typical school ERP, there's one admin panel. The accountant logs in and sees
                exam marks they don't need. The teacher sees fee structures irrelevant to them.
                Every user navigates clutter to find their one task.
              </p>
            </Motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Faster for every user",
                  desc: "A teacher opens the portal and sees their classes. One click to mark attendance. No navigation menus, no sidebars to ignore.",
                },
                {
                  title: "Secure by design",
                  desc: "Every person can only see and do what their role allows — and it stays that way no matter what. The accountant never sees exam marks. The teacher never sees fee structures.",
                },
                {
                  title: "Better adoption",
                  desc: "Staff adopt software they understand. A parent portal with just their child's data has zero learning curve. That's why adoption sticks.",
                },
              ].map((item, i) => (
                <Motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-brand-cream/30 border border-brand-cream rounded-2xl p-6"
                >
                  <h3 className="font-bold text-brand-dark mb-2 text-sm">{item.title}</h3>
                  <p className="text-xs text-brand-neutral leading-relaxed">{item.desc}</p>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-brand-cream/30">
          <Motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-brand-dark mb-4">
              See all 9 portals in a 30-minute demo.
            </h2>
            <p className="text-brand-neutral mb-8">
              We'll walk through the director, teacher, and parent portals with your school's
              structure in mind.
            </p>
            <Link
              to="/contact"
              className="btn-premium inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-bold"
            >
              Request a Free Demo <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Motion.div>
        </section>
      </Motion.main>
    </>
  );
}
