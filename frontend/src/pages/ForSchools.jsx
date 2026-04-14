import React from "react";
import { motion as Motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  X,
  Check,
  AlertCircle,
  ArrowUpRight,
  IndianRupee,
  Smartphone,
  ShieldCheck,
  Globe,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  }),
};

const problems = [
  {
    title: "Admission Chaos",
    without:
      "Inquiries logged in WhatsApp groups or notebooks. No TC validation process. Aadhar and caste fields missing from records. Admission numbers assigned manually and inconsistently.",
    with: "Auto-generated admission numbers. TC enforced for Class 2+. Aadhar, Nationality, Religion, Caste Category — all captured in the standard Indian format. Inquiry pipeline with follow-up tracking.",
  },
  {
    title: "Attendance Headaches",
    without:
      "Teachers spend 5–10 minutes per class on paper registers every morning. Monthly reports take days to compile. Parents find out about absences only if the school calls — which rarely happens.",
    with: "One-tap marking with bulk Present/All Absent. Monthly reports available in real time. Defaulter list auto-generated with a configurable threshold. Parent notification on absence in roadmap.",
  },
  {
    title: "Examination Disorder",
    without:
      "Marks entered in Excel, emailed to the office, manually compiled into a result sheet. Errors common. Students and parents wait weeks to see results.",
    with: "Teachers enter marks directly in the portal. Results are instantly available: rank-wise class summary and individual student scorecard — accessible to students and parents from their own portals.",
  },
  {
    title: "Fee Confusion",
    without:
      "Collections tracked in a physical ledger. No live view of who's paid. Daily reconciliation is manual. The principal has to ask the accountant for a defaulter list.",
    with: "Payment recorded instantly. Every stakeholder sees their view: accountant sees daily collection, principal sees defaulters, parent sees their child's balance — all from the same data.",
  },
  {
    title: "Zero Parent Visibility",
    without:
      "Parents call the school for attendance, marks, and fee balance. Receptionist time consumed on routine queries. No digital communication channel.",
    with: "Parent portal gives real-time access to attendance, exam results, and fee balance — linked to their specific child's record. Routine queries handled without calling the school.",
  },
  {
    title: "Staff Management Gaps",
    without:
      "No staff attendance system. Leave requests handled informally. No digital staff directory. Role confusion when someone is absent.",
    with: "Staff clock-in / clock-out. Leave request and approval workflow. Role-based accounts mean every staff member has exactly the access they need — no more, no less.",
  },
];

const indiaFeatures = [
  {
    icon: <IndianRupee className="w-5 h-5" />,
    title: "Indian Fee Head Standards",
    desc: "Tuition, Transport, Lab, Library, Activity, Exam, Development Fund — 10 Indian-standard fee heads seeded on setup. No customization needed.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Aadhar & Demographic Fields",
    desc: "Aadhar Number, Nationality, Religion, Caste Category — regulatory fields required by Indian school boards, built into the admission form from day one.",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "CBSE · ICSE · State Board Ready",
    desc: "Subject naming conventions, TC workflows, and roll number systems aligned with Indian board requirements. No Western ERP adaptation required.",
  },
  {
    icon: <Check className="w-5 h-5" />,
    title: "TC Validation Built-In",
    desc: "Transfer Certificate validation is enforced in the admission flow for Class 2 and above — a regulatory requirement that generic ERPs miss entirely.",
  },
  {
    icon: <Smartphone className="w-5 h-5" />,
    title: "Works on 4G Mobile",
    desc: "All 8 portals are fully mobile-responsive. Designed for Tier 2 and Tier 3 India where 4G is the primary internet connection for most staff and parents.",
  },
  {
    icon: <IndianRupee className="w-5 h-5" />,
    title: "Affordable for Tier 2/3 Schools",
    desc: "Built for schools that can't afford enterprise ERP pricing. Cloud-native infrastructure keeps costs low without compromising on features or security.",
  },
];

const schoolTypes = [
  {
    type: "Private K-12 Schools",
    boards: "CBSE · ICSE · State Board",
    size: "200 to 3,000 students",
    fit: "Primary target — all 8 portals and all 8 modules are built for this segment.",
    badge: "Best Fit",
    badgeColor: "bg-blue-600 text-white",
  },
  {
    type: "Junior Colleges",
    boards: "Class 11–12 Standalone",
    size: "200 to 1,000 students",
    fit: "Core modules work well. Junior College-specific features planned for V2.",
    badge: "Good Fit",
    badgeColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  },
  {
    type: "Multi-Branch School Groups",
    boards: "Any board",
    size: "Multiple campuses",
    fit: "Multi-branch architecture already planned in the schema — available in V3 roadmap.",
    badge: "Roadmap",
    badgeColor: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  },
];

export default function ForSchools() {
  return (
    <>
      <Helmet>
        <title>
          For Schools — Infovion School Management Software India
        </title>
        <meta
          name="description"
          content="Infovion is built specifically for K-12 schools in India. See how it solves admissions, attendance, exams, fees, and staff management — with India-first features like Aadhar fields, TC validation, and Indian fee heads."
        />
        <link rel="canonical" href="https://buildwithinfovion.com/for-schools" />
        <meta
          property="og:title"
          content="For Schools — Infovion School Management India"
        />
        <meta
          property="og:url"
          content="https://buildwithinfovion.com/for-schools"
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
              className="text-blue-600 dark:text-blue-400 font-semibold text-xs uppercase tracking-widest mb-4"
            >
              Built for Indian Schools
            </Motion.p>
            <Motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-5xl font-extrabold text-gray-900 dark:text-white mb-5 leading-tight"
            >
              School Management,
              <br />
              <span className="text-blue-600">Reimagined for India.</span>
            </Motion.h1>
            <Motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-8"
            >
              Not a Western ERP adapted for India. Not a generic SaaS template.
              Infovion is built ground-up for K-12 schools in India — with
              Aadhar fields, TC workflows, Indian fee heads, and role-specific
              portals for every stakeholder.
            </Motion.p>
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-7 py-3.5 rounded-full font-semibold shadow-lg shadow-blue-600/25 hover:bg-blue-700 transition-colors"
              >
                Request a Demo <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Motion.div>
          </div>
        </section>

        {/* Problem vs Solution */}
        <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900/40">
          <div className="max-w-6xl mx-auto">
            <Motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <p className="text-blue-600 dark:text-blue-400 font-semibold text-xs uppercase tracking-widest mb-3">
                Before & After
              </p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Every Problem. Solved.
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                Here's exactly what Infovion replaces — operation by operation.
              </p>
            </Motion.div>

            <div className="space-y-5">
              {problems.map((p, i) => (
                <Motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.005 }}
                  className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm"
                >
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                    {p.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl p-4">
                      <p className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <X className="w-3.5 h-3.5" /> Without Infovion
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {p.without}
                      </p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-xl p-4">
                      <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" /> With Infovion
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {p.with}
                      </p>
                    </div>
                  </div>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* India-First Features */}
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
                India-First
              </p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Designed for Indian Schools. Not Adapted.
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                These features come standard — not as paid add-ons or
                customization requests.
              </p>
            </Motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {indiaFeatures.map((f, i) => (
                <Motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl w-fit mb-4">
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">
                    {f.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {f.desc}
                  </p>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* School Types */}
        <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900/40">
          <div className="max-w-5xl mx-auto">
            <Motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-blue-600 dark:text-blue-400 font-semibold text-xs uppercase tracking-widest mb-3">
                Who It's For
              </p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Is Infovion right for your school?
              </h2>
            </Motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {schoolTypes.map((s, i) => (
                <Motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                        {s.type}
                      </h3>
                      <p className="text-xs text-gray-400">{s.boards}</p>
                    </div>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ml-2 ${s.badgeColor}`}
                    >
                      {s.badge}
                    </span>
                  </div>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-2">
                    {s.size}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {s.fit}
                  </p>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-white dark:bg-gray-950">
          <Motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Your school. Every operation. One platform.
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Schedule a free demo and we'll show you exactly how Infovion
              handles your school's specific workflows.
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
