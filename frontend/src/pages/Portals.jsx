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
    route: "/portal/director",
    tagline: "Full school visibility. From anywhere.",
    desc: "The school owner or trustee gets a complete operational overview — student counts, fee collection, attendance summary, and staff status — all on one screen.",
    icon: <LayoutDashboard className="w-6 h-6" />,
    color: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
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
    route: "/dashboard",
    tagline: "The school office, fully digitized.",
    desc: "The school administrator or office manager handles admissions, student directory, staff creation, fee management, and exam setup from one unified dashboard.",
    icon: <Users className="w-6 h-6" />,
    color: "text-indigo-600",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
    badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
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
    route: "/portal/principal",
    tagline: "Operational data. No digging required.",
    desc: "The academic head sees what matters most: who's defaulting on attendance, who's behind on fees, and how the school is performing — all in one view.",
    icon: <BarChart3 className="w-6 h-6" />,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
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
    route: "/portal/teacher",
    tagline: "Attendance and marks. Fast.",
    desc: "Teachers mark attendance and enter exam marks for their assigned classes — no more registers, no more Excel files shared over email.",
    icon: <GraduationCap className="w-6 h-6" />,
    color: "text-green-600",
    bg: "bg-green-50 dark:bg-green-900/20",
    badge: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
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
    route: "/portal/student",
    tagline: "Your school life. In your hands.",
    desc: "Students can check their own attendance history, exam marks, fee balance, and class timetable — without calling the office.",
    icon: <BookOpen className="w-6 h-6" />,
    color: "text-cyan-600",
    bg: "bg-cyan-50 dark:bg-cyan-900/20",
    badge: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
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
    route: "/portal/parent",
    tagline: "Your child's school life. Visible.",
    desc: "Parents get real-time access to their child's attendance, exam results, and fee balance — securely linked to one specific student account.",
    icon: <UserCheck className="w-6 h-6" />,
    color: "text-teal-600",
    bg: "bg-teal-50 dark:bg-teal-900/20",
    badge: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
    capabilities: [
      "Child's attendance history with absent day highlight",
      "Child's exam results and scorecard (all exams)",
      "Child's fee balance and complete payment history",
      "School announcements relevant to child's class",
      "Secure parent-student linking: sees only their child's data",
      "Mobile-responsive: works on any smartphone",
      "Parent notification on absence (SMS/push — roadmap)",
      "No overlap with other students' data — enforced at API level",
    ],
  },
  {
    id: "receptionist",
    role: "Receptionist",
    route: "/portal/receptionist",
    tagline: "Front desk operations. All in one place.",
    desc: "The reception team captures inquiries, records fee payments, and handles student lookups — without needing access to the full admin dashboard.",
    icon: <Phone className="w-6 h-6" />,
    color: "text-pink-600",
    bg: "bg-pink-50 dark:bg-pink-900/20",
    badge: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
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
    route: "/portal/accountant",
    tagline: "Fee collections. Defaulters. Daily reports.",
    desc: "The school accountant has everything needed to manage fee collection — daily reports, outstanding balances, and defaulter tracking — in one focused portal.",
    icon: <CreditCard className="w-6 h-6" />,
    color: "text-orange-600",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    badge: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
    capabilities: [
      "Daily collection report: total collected today across all students",
      "Student fee balance view: outstanding per student",
      "Fee defaulter list: year-wise and class-wise with outstanding amounts",
      "Payment recording with receipt generation",
      "Fee head and fee structure management",
      "Complete payment history per student",
      "Access scoped to finance operations only — no academic data",
      "Fee receipt PDF generation (roadmap)",
    ],
  },
];

export default function Portals() {
  const [selected, setSelected] = useState("director");
  const active = portals.find((p) => p.id === selected);

  return (
    <>
      <Helmet>
        <title>Role Portals — Infovion School Management Software India</title>
        <meta
          name="description"
          content="Infovion gives every school role their own purpose-built portal. Director, Principal, Teacher, Student, Parent, Accountant, Operator, and Receptionist — each with exactly what they need."
        />
        <link rel="canonical" href="https://buildwithinfovion.com/portals" />
        <meta
          property="og:title"
          content="Role Portals — Infovion School Management"
        />
        <meta
          property="og:url"
          content="https://buildwithinfovion.com/portals"
        />
      </Helmet>

      <Motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="pt-24"
      >
        {/* Hero */}
        <section className="py-20 px-6 bg-white dark:bg-gray-950 text-center">
          <div className="max-w-3xl mx-auto">
            <Motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-blue-600 dark:text-blue-400 font-semibold text-xs uppercase tracking-widest mb-4"
            >
              Role-Based UX
            </Motion.p>
            <Motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-5xl font-extrabold text-gray-900 dark:text-white mb-5 leading-tight"
            >
              Every Role Gets
              <br />
              <span className="text-blue-600">Their Own Portal.</span>
            </Motion.h1>
            <Motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed"
            >
              Not one admin panel with hidden buttons. Eight completely
              separate, purpose-designed interfaces — one for every person in
              the school.
            </Motion.p>
          </div>
        </section>

        {/* Portal grid overview */}
        <section className="py-8 px-6 bg-white dark:bg-gray-950">
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
                      ? "border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 shadow-lg shadow-blue-500/10"
                      : "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-200 dark:hover:border-gray-700"
                  }`}
                >
                  <div
                    className={`${p.color} ${selected === p.id ? p.bg : ""} p-2 rounded-xl transition-colors`}
                  >
                    {React.cloneElement(p.icon, { className: "w-5 h-5" })}
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      selected === p.id
                        ? "text-blue-700 dark:text-blue-300"
                        : "text-gray-600 dark:text-gray-400"
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
        <section className="py-12 px-6 bg-gray-50 dark:bg-gray-900/40">
          <div className="max-w-7xl mx-auto">
            {active && (
              <Motion.div
                key={active.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 lg:p-12 shadow-sm"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                  <div>
                    <span
                      className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-5 ${active.badge}`}
                    >
                      {active.role} Portal
                    </span>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                      {active.tagline}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                      {active.desc}
                    </p>
                    <div className="flex gap-3">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
                      >
                        See Demo <ArrowUpRight className="w-4 h-4" />
                      </Link>
                      <Link
                        to="/features"
                        className="inline-flex items-center gap-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-5 py-2.5 rounded-full text-sm font-semibold hover:border-blue-300 transition-colors"
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
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3" />
                        </span>
                        <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          {c}
                        </span>
                      </Motion.li>
                    ))}
                  </ul>
                </div>
              </Motion.div>
            )}
          </div>
        </section>

        {/* Why separate portals */}
        <section className="py-20 px-6 bg-white dark:bg-gray-950">
          <div className="max-w-4xl mx-auto">
            <Motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Why separate portals, not one admin panel?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
                In a typical school ERP, there's one admin panel. The accountant
                logs in and sees exam marks they don't need. The teacher sees fee
                structures irrelevant to them. Every user navigates clutter to
                find their one task.
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
                  desc: "The accountant cannot see exam marks. The teacher cannot see fee structures. Access is enforced at the API level — not just the UI.",
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
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6"
                >
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900/40">
          <Motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              See all 8 portals in a 30-minute demo.
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              We'll walk through the director, teacher, and parent portals with
              your school's structure in mind.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-blue-600/25 hover:bg-blue-700 transition-colors"
            >
              Request a Free Demo <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Motion.div>
        </section>
      </Motion.main>
    </>
  );
}
