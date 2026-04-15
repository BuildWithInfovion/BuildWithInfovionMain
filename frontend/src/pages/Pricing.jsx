import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Check,
  ArrowUpRight,
  School,
  Users,
  Building2,
  MessageCircle,
} from "lucide-react";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is there a setup fee for Infovion school ERP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No setup fee. Your school is onboarded through a guided wizard that creates your institution, academic year, classes, and default subjects automatically.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a long-term contract for Infovion?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No long-term contract. Infovion is designed for schools that want flexibility — no lock-in, no annual commitment required.",
      },
    },
    {
      "@type": "Question",
      name: "What does cloud-native school ERP mean for my school?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No servers to buy, no software to install, no IT team needed. Infovion runs on Railway (backend) and Vercel (frontend) — accessible from any device with a browser, on 4G.",
      },
    },
    {
      "@type": "Question",
      name: "Can we try Infovion school management software before committing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We offer a free demo where we walk through every module and portal with your school's context in mind. Request one and we'll set up a session within 48 hours.",
      },
    },
    {
      "@type": "Question",
      name: "What happens to our school data if we leave Infovion?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your data belongs to your school. We provide a full export of all student, attendance, exam, and fee records on request before account closure.",
      },
    },
    {
      "@type": "Question",
      name: "Does Infovion work for ICSE and State Board schools, not just CBSE?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Subject naming, fee heads, TC workflows, and roll number systems are aligned with Indian board conventions generally — not tied to any single board.",
      },
    },
  ],
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  }),
};

const tiers = [
  {
    id: "starter",
    name: "Starter",
    icon: <School className="w-6 h-6" />,
    tagline: "For small schools getting started.",
    size: "Up to 500 students",
    features: [
      "All 8 modules included",
      "All 8 role-specific portals",
      "Up to 500 students",
      "Up to 30 staff accounts",
      "Cloud hosting (Railway + Vercel)",
      "Audit log and soft delete",
      "Mobile-responsive on all portals",
      "Email support",
    ],
    cta: "Contact for Pricing",
    highlight: false,
  },
  {
    id: "growth",
    name: "Growth",
    icon: <Users className="w-6 h-6" />,
    tagline: "For mid-sized schools scaling operations.",
    size: "Up to 1,500 students",
    features: [
      "Everything in Starter",
      "Up to 1,500 students",
      "Up to 100 staff accounts",
      "Priority onboarding support",
      "PDF generation: fee receipts, admit cards",
      "Parent SMS / WhatsApp on absence",
      "Daily collection reports",
      "Dedicated support channel",
    ],
    cta: "Contact for Pricing",
    highlight: true,
  },
  {
    id: "school-group",
    name: "School Group",
    icon: <Building2 className="w-6 h-6" />,
    tagline: "For multi-branch school groups.",
    size: "Unlimited students",
    features: [
      "Everything in Growth",
      "Unlimited students",
      "Multi-branch architecture",
      "Centralized group dashboard",
      "Custom onboarding",
      "SLA-backed uptime",
      "Dedicated account manager",
      "Custom integrations on request",
    ],
    cta: "Contact for Pricing",
    highlight: false,
  },
];

const faqs = [
  {
    q: "Is there a setup fee?",
    a: "No setup fee. Your school is onboarded through a guided wizard that creates your institution, academic year, classes, and default subjects automatically.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No long-term contract. Infovion is designed for schools that want flexibility — no lock-in, no annual commitment required.",
  },
  {
    q: "What does 'cloud-native' mean for my school?",
    a: "No servers to buy, no software to install, no IT team needed. Infovion runs on Railway (backend) and Vercel (frontend) — accessible from any device with a browser, on 4G.",
  },
  {
    q: "Can we try it before committing?",
    a: "Yes. We offer a free demo where we walk through every module and portal with your school's context in mind. Request one and we'll set up a session within 48 hours.",
  },
  {
    q: "What happens to our data if we leave?",
    a: "Your data belongs to your school. We provide a full export of all student, attendance, exam, and fee records on request before account closure.",
  },
  {
    q: "Does Infovion work for ICSE and State Board schools, not just CBSE?",
    a: "Yes. Subject naming, fee heads, TC workflows, and roll number systems are aligned with Indian board conventions generally — not tied to any single board.",
  },
];

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <Helmet>
        <title>School ERP Pricing India — No Setup Fee, All Modules Included | Infovion</title>
        <meta
          name="description"
          content="Infovion school ERP pricing for K-12 schools in India. No setup fee, no long-term contract. All 8 modules & 8 portals included. Affordable cloud school management software for Tier 2 & 3 schools."
        />
        <meta name="keywords" content="school ERP pricing India, affordable school management software India, school software cost India, cloud school ERP price, school management software subscription India, school ERP no setup fee" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://buildwithinfovion.com/pricing" />
        <meta property="og:title" content="School ERP Pricing — No Setup Fee | Infovion India" />
        <meta property="og:description" content="All 8 school management modules & portals included. No setup fee, no long-term contract. Built for Indian school budgets." />
        <meta property="og:url" content="https://buildwithinfovion.com/pricing" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="pt-24"
      >
        {/* Hero */}
        <section className="py-20 px-6 bg-white text-center">
          <div className="max-w-2xl mx-auto">
            <Motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-brand-terra font-semibold text-xs uppercase tracking-widest mb-4"
            >
              Simple Pricing
            </Motion.p>
            <Motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-5xl font-extrabold text-brand-dark mb-5 leading-tight"
            >
              Built for School Budgets.
              <br />
              <span className="text-brand-terra">Not Enterprise Pricing.</span>
            </Motion.h1>
            <Motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-brand-neutral leading-relaxed"
            >
              No setup fee. No long-term contract. Per-school monthly subscription with every
              module and every portal included.
            </Motion.p>
          </div>
        </section>

        {/* Pricing tiers */}
        <section className="py-8 px-6 pb-24 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {tiers.map((tier, i) => (
                <Motion.div
                  key={tier.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: tier.highlight ? -6 : -4 }}
                  className={`relative rounded-3xl border p-8 flex flex-col shadow-sm transition-all duration-300 ${
                    tier.highlight
                      ? "bg-brand-terra border-brand-terra shadow-2xl shadow-brand-terra/25"
                      : "bg-white border-brand-cream"
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-white text-brand-terra text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <div
                      className={`inline-flex p-2.5 rounded-xl mb-4 ${
                        tier.highlight ? "bg-white/20 text-white" : "bg-brand-cream text-brand-terra"
                      }`}
                    >
                      {tier.icon}
                    </div>
                    <h2
                      className={`text-xl font-bold mb-1 ${
                        tier.highlight ? "text-white" : "text-brand-dark"
                      }`}
                    >
                      {tier.name}
                    </h2>
                    <p
                      className={`text-sm mb-2 ${
                        tier.highlight ? "text-white/80" : "text-brand-neutral"
                      }`}
                    >
                      {tier.tagline}
                    </p>
                    <p
                      className={`text-xs font-semibold uppercase tracking-wide ${
                        tier.highlight ? "text-white/70" : "text-brand-terra"
                      }`}
                    >
                      {tier.size}
                    </p>
                  </div>

                  <div
                    className={`text-center py-5 mb-6 rounded-2xl ${
                      tier.highlight ? "bg-white/10" : "bg-brand-cream/40"
                    }`}
                  >
                    <p
                      className={`text-sm font-medium ${
                        tier.highlight ? "text-white/80" : "text-brand-neutral"
                      }`}
                    >
                      Pricing available on request
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        tier.highlight ? "text-white/60" : "text-brand-neutral/70"
                      }`}
                    >
                      Tailored for your school's size
                    </p>
                  </div>

                  <ul className="space-y-3 flex-1 mb-8">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                            tier.highlight
                              ? "bg-white/20 text-white"
                              : "bg-brand-terra/10 text-brand-terra"
                          }`}
                        >
                          <Check className="w-2.5 h-2.5" />
                        </span>
                        <span
                          className={`text-sm ${
                            tier.highlight ? "text-white/90" : "text-brand-brown"
                          }`}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      to="/contact"
                      className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-semibold text-sm transition-colors ${
                        tier.highlight
                          ? "bg-white text-brand-terra hover:bg-brand-cream"
                          : "bg-brand-terra text-white hover:bg-[#a85d48] shadow-lg shadow-brand-terra/20"
                      }`}
                    >
                      {tier.cta} <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </Motion.div>
                </Motion.div>
              ))}
            </div>

            {/* Guarantee strip */}
            <Motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-brand-neutral"
            >
              {[
                "No setup fee",
                "No long-term contract",
                "Free demo before you commit",
                "All modules included in every plan",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-terra" />
                  {item}
                </span>
              ))}
            </Motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6 bg-brand-cream/30">
          <div className="max-w-3xl mx-auto">
            <Motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-brand-terra font-semibold text-xs uppercase tracking-widest mb-3">
                FAQ
              </p>
              <h2 className="text-3xl font-bold text-brand-dark">Common Questions</h2>
            </Motion.div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <Motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-white border border-brand-cream rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="font-semibold text-brand-dark text-sm">{faq.q}</span>
                    <Motion.span
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-brand-neutral flex-shrink-0 ml-4 text-lg leading-none"
                    >
                      +
                    </Motion.span>
                  </button>
                  <Motion.div
                    initial={false}
                    animate={{
                      height: openFaq === i ? "auto" : 0,
                      opacity: openFaq === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm text-brand-neutral leading-relaxed">{faq.a}</p>
                  </Motion.div>
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
            <MessageCircle className="w-10 h-10 text-brand-terra mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-brand-dark mb-4">
              Not sure which plan fits your school?
            </h2>
            <p className="text-brand-neutral mb-8">
              Tell us your school's size, board, and current pain points. We'll recommend the right
              plan and walk you through a free demo.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-brand-terra text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-brand-terra/25 hover:bg-[#a85d48] transition-colors"
            >
              Talk to Us <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Motion.div>
        </section>
      </Motion.main>
    </>
  );
}
