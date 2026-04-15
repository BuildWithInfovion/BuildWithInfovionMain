import React from "react";
import { motion as Motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  School,
  ShieldCheck,
  Smartphone,
  IndianRupee,
  Users,
  Mail,
  MapPin,
  Linkedin,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  }),
};

const values = [
  {
    icon: <School className="w-6 h-6" />,
    title: "Schools First",
    desc: "Every product decision starts with one question: does this make the school's day easier? Not our metrics. Not investor dashboards. Schools.",
  },
  {
    icon: <IndianRupee className="w-6 h-6" />,
    title: "Built for India",
    desc: "Aadhar fields, TC workflows, Indian fee heads, CBSE/ICSE/State Board conventions — not a Western ERP ported to India. Ground-up Indian school operations.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Security by Default",
    desc: "JWT with httpOnly cookies, role-based access control enforced at the API level, multi-tenant isolation, and an append-only audit trail on every write.",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile-First Reality",
    desc: "All 8 portals work on any smartphone over 4G. Designed for Tier 2 and Tier 3 India where mobile is the primary — and often only — internet device.",
  },
];

const techStack = [
  { label: "Backend", value: "NestJS · TypeScript · PostgreSQL (Neon)" },
  { label: "Frontend", value: "Next.js · React · Tailwind CSS" },
  { label: "Infrastructure", value: "Railway (API) · Vercel (Frontend)" },
  { label: "Auth", value: "JWT · httpOnly Cookies · RBAC" },
  { label: "Architecture", value: "Multi-tenant SaaS · institution_id isolation" },
  { label: "Audit", value: "Append-only audit log · soft deletes throughout" },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About — Infovion Technologies | Academic ERP for Indian Schools</title>
        <meta
          name="description"
          content="Infovion Technologies is building a cloud-based Academic ERP for K-12 schools in India. Learn who we are, why we built Infovion, and the technology behind it."
        />
        <link rel="canonical" href="https://buildwithinfovion.com/about" />
        <meta property="og:title" content="About — Infovion Technologies" />
        <meta property="og:url" content="https://buildwithinfovion.com/about" />
      </Helmet>

      <Motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="pt-24"
      >
        {/* Hero */}
        <section className="py-24 px-6 bg-brand-dark relative overflow-hidden">
          {/* Background orbs */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-20"
            style={{
              background:
                "radial-gradient(circle, #BE6D56 0%, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none opacity-15"
            style={{
              background:
                "radial-gradient(circle, #D1AB83 0%, transparent 70%)",
              transform: "translate(-30%, 30%)",
            }}
          />

          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <Motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-brand-accent font-semibold text-xs uppercase tracking-widest mb-5"
            >
              Our Story
            </Motion.p>
            <Motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
            >
              We built the school ERP
              <br />
              <span className="text-brand-accent">India was waiting for.</span>
            </Motion.h1>
            <Motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-brand-neutral leading-relaxed max-w-2xl mx-auto"
            >
              Infovion Technologies is a Pune-based startup building cloud-native school management
              software for K-12 schools across India. We started because we couldn't find a school
              ERP that actually fit how Indian schools work.
            </Motion.p>
          </div>
        </section>

        {/* The Problem We Saw */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <Motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <p className="text-brand-terra font-semibold text-xs uppercase tracking-widest mb-4">
                  The Problem
                </p>
                <h2 className="text-4xl font-bold text-brand-dark mb-5 leading-tight">
                  Indian schools deserved better software.
                </h2>
                <div className="space-y-4 text-brand-neutral leading-relaxed">
                  <p>
                    Most school ERPs in India are either expensive enterprise systems built for
                    large institutions, or outdated desktop software with clunky interfaces.
                  </p>
                  <p>
                    The affordable ones miss critical Indian requirements — no Aadhar fields, no TC
                    validation workflow, no Indian fee head standards. Western ERPs need expensive
                    customization. Generic SaaS doesn't fit how Indian boards work.
                  </p>
                  <p>
                    Small and mid-sized private schools in Tier 2 and Tier 3 India were left
                    running on WhatsApp groups, paper registers, and Excel sheets.
                  </p>
                </div>
              </div>
              <div className="bg-brand-cream/40 border border-brand-cream rounded-3xl p-8 space-y-5">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center flex-shrink-0 text-sm font-bold">×</div>
                  <div>
                    <p className="font-semibold text-brand-dark text-sm mb-1">Attendance on paper registers</p>
                    <p className="text-xs text-brand-neutral">Monthly reports take days to compile manually</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center flex-shrink-0 text-sm font-bold">×</div>
                  <div>
                    <p className="font-semibold text-brand-dark text-sm mb-1">Fee collections in physical ledgers</p>
                    <p className="text-xs text-brand-neutral">No live defaulter view. Reconciliation is manual.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center flex-shrink-0 text-sm font-bold">×</div>
                  <div>
                    <p className="font-semibold text-brand-dark text-sm mb-1">Marks entered in shared Excel files</p>
                    <p className="text-xs text-brand-neutral">Errors common. Results take weeks to publish.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center flex-shrink-0 text-sm font-bold">×</div>
                  <div>
                    <p className="font-semibold text-brand-dark text-sm mb-1">Parents call for every routine query</p>
                    <p className="text-xs text-brand-neutral">Attendance, marks, fee balance — all via phone call</p>
                  </div>
                </div>
              </div>
            </Motion.div>
          </div>
        </section>

        {/* What We Built */}
        <section className="py-24 px-6 bg-brand-cream/30">
          <div className="max-w-4xl mx-auto text-center">
            <Motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-14"
            >
              <p className="text-brand-terra font-semibold text-xs uppercase tracking-widest mb-4">
                The Solution
              </p>
              <h2 className="text-4xl font-bold text-brand-dark mb-5">
                Eight modules. Eight portals. One platform.
              </h2>
              <p className="text-brand-neutral leading-relaxed max-w-2xl mx-auto">
                Infovion Academic ERP covers every operation a K-12 school runs — from the first
                student inquiry to final exam results. Every role gets their own purpose-built
                portal. Every Indian-specific requirement is built in from day one.
              </p>
            </Motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {["Admissions", "Attendance", "Examinations", "Fee Management", "Staff", "Timetable", "Announcements", "Portals"].map((m, i) => (
                <Motion.div
                  key={m}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-white border border-brand-cream rounded-2xl p-4 text-sm font-semibold text-brand-brown"
                >
                  {m}
                </Motion.div>
              ))}
            </div>

            <Motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Link
                to="/features"
                className="inline-flex items-center gap-2 text-brand-terra font-semibold text-sm hover:underline"
              >
                See all features <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Motion.div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <Motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <p className="text-brand-terra font-semibold text-xs uppercase tracking-widest mb-4">
                How We Build
              </p>
              <h2 className="text-3xl font-bold text-brand-dark">Our Principles</h2>
            </Motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((v, i) => (
                <Motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white border border-brand-cream rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-brand-accent/40 transition-all duration-300"
                >
                  <div className="p-2.5 bg-brand-cream text-brand-terra rounded-xl w-fit mb-4">
                    {v.icon}
                  </div>
                  <h3 className="font-bold text-brand-dark mb-2">{v.title}</h3>
                  <p className="text-sm text-brand-neutral leading-relaxed">{v.desc}</p>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-20 px-6 bg-brand-dark">
          <div className="max-w-4xl mx-auto">
            <Motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-brand-accent font-semibold text-xs uppercase tracking-widest mb-4">
                Technology
              </p>
              <h2 className="text-3xl font-bold text-white">Built on Modern Infrastructure</h2>
            </Motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {techStack.map((t, i) => (
                <Motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-brand-brown/30 border border-brand-brown/40 rounded-2xl p-5"
                >
                  <p className="text-xs text-brand-accent font-semibold uppercase tracking-wider mb-2">
                    {t.label}
                  </p>
                  <p className="text-sm text-brand-neutral leading-relaxed">{t.value}</p>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team / Contact */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <Motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-brand-terra font-semibold text-xs uppercase tracking-widest mb-4">
                The Team
              </p>
              <h2 className="text-3xl font-bold text-brand-dark mb-4">
                Built in Pune, for India.
              </h2>
              <p className="text-brand-neutral leading-relaxed">
                Infovion Technologies is a lean, product-focused team based in Pune, Maharashtra.
                We're a small team with a clear focus: build the best school ERP for India's 1.5
                million K-12 schools.
              </p>
            </Motion.div>

            <Motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-brand-cream/40 border border-brand-cream rounded-3xl p-8 space-y-4"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-terra flex-shrink-0" />
                <a
                  href="mailto:infovion2025@gmail.com"
                  className="text-brand-brown hover:text-brand-terra transition-colors text-sm"
                >
                  infovion2025@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-brand-terra flex-shrink-0" />
                <span className="text-brand-brown text-sm">Pune, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="w-5 h-5 text-brand-terra flex-shrink-0" />
                <a
                  href="https://www.linkedin.com/company/112026919/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-brown hover:text-brand-terra transition-colors text-sm"
                >
                  linkedin.com/company/Infovion
                </a>
              </div>
            </Motion.div>
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
              See Infovion in action.
            </h2>
            <p className="text-brand-neutral mb-8">
              We'll walk through every module and portal with your school's context in mind.
              Free demo. No commitment.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-brand-terra text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-brand-terra/25 hover:bg-[#a85d48] transition-colors"
            >
              Schedule a Free Demo <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Motion.div>
        </section>
      </Motion.main>
    </>
  );
}
