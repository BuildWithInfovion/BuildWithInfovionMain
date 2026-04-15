import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Mail, Phone, MessageCircle, MapPin, ArrowUpRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import ContactForm from "../components/ContactForm";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  }),
};

const contactMethods = [
  {
    icon: <Mail className="w-5 h-5" />,
    title: "Email",
    value: "infovion2025@gmail.com",
    sub: "Response within 2 hours",
    href: "mailto:infovion2025@gmail.com",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    title: "Phone",
    value: "+91 9309193613",
    sub: "Mon – Sun, 9 am – 10 pm",
    href: "tel:+919309193613",
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    title: "WhatsApp",
    value: "Chat instantly",
    sub: "Fastest response",
    href: "https://wa.me/919309193613?text=Hi!%20I%27d%20like%20to%20know%20more%20about%20Infovion%20Academic%20ERP%20for%20my%20school.",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "Location",
    value: "Pune, Maharashtra",
    sub: "India — serving schools nationwide",
    href: "https://www.google.com/maps/search/?api=1&query=Pune,Maharashtra",
  },
];

const faqs = [
  {
    q: "How long does the demo take?",
    a: "The demo typically takes 30–45 minutes. We walk through every module and portal with your school's specific context — class structure, fee heads, board — so you see exactly how Infovion would work for you.",
  },
  {
    q: "Is there any cost for the demo?",
    a: "No. The demo is completely free. No commitment, no credit card, no contract required to see the platform.",
  },
  {
    q: "How soon can our school go live?",
    a: "Most schools are fully onboarded within a single session. The guided setup wizard creates your institution, academic year, classes, and default subjects automatically — no IT team needed.",
  },
  {
    q: "Does Infovion work for ICSE and State Board schools?",
    a: "Yes. Subject naming, fee heads, TC workflows, and roll number systems are aligned with Indian board conventions — CBSE, ICSE, and all State Boards. No customization needed.",
  },
];

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <Helmet>
        <title>Contact Infovion — School ERP Demo & Support | Pune, India</title>
        <meta
          name="description"
          content="Contact Infovion Technologies in Pune for a free school ERP demo. Schedule a walkthrough of our school management software for K-12 schools in India. Available 7 days a week."
        />
        <meta name="keywords" content="contact Infovion, school ERP demo India, school management software demo, Infovion Pune contact, school software inquiry India" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://buildwithinfovion.com/contact" />
        <meta property="og:title" content="Contact Infovion — Free School ERP Demo" />
        <meta property="og:description" content="Schedule a free demo of Infovion school management software. We walk through every module with your school's context in mind." />
        <meta property="og:url" content="https://buildwithinfovion.com/contact" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="pt-24"
      >
        {/* Hero */}
        <section className="py-20 px-6 bg-brand-dark relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-20"
            style={{ background: "radial-gradient(circle, #BE6D56 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
          />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <Motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-brand-accent font-semibold text-xs uppercase tracking-widest mb-4"
            >
              Get in Touch
            </Motion.p>
            <Motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-5xl font-extrabold text-white mb-5 leading-tight"
            >
              Schedule a Free Demo.
              <br />
              <span className="text-brand-accent">See Infovion in Action.</span>
            </Motion.h1>
            <Motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-brand-neutral leading-relaxed"
            >
              We'll walk through every module and portal with your school's context in mind.
              Free. No commitment. Set up within 48 hours.
            </Motion.p>
          </div>
        </section>

        {/* Contact methods strip */}
        <section className="py-10 px-6 bg-brand-cream/30 border-b border-brand-cream">
          <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
            {contactMethods.map((m, i) => (
              <Motion.a
                key={m.title}
                href={m.href}
                target={m.href.startsWith("http") ? "_blank" : "_self"}
                rel={m.href.startsWith("http") ? "noopener noreferrer" : ""}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -4 }}
                className="flex flex-col items-center text-center gap-2 p-5 bg-white border border-brand-cream rounded-2xl shadow-sm hover:border-brand-accent/40 hover:shadow-md transition-all duration-300"
              >
                <div className="p-2.5 bg-brand-cream text-brand-terra rounded-xl">
                  {m.icon}
                </div>
                <p className="font-semibold text-brand-dark text-sm">{m.title}</p>
                <p className="text-brand-terra text-xs font-medium">{m.value}</p>
                <p className="text-brand-neutral text-xs">{m.sub}</p>
              </Motion.a>
            ))}
          </div>
        </section>

        {/* Form + info */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            {/* Form */}
            <Motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white border border-brand-cream rounded-3xl p-8 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-brand-dark mb-2">
                Request a Demo
              </h2>
              <p className="text-brand-neutral text-sm mb-8">
                Fill in your details and we'll get back to you within 2 hours.
              </p>
              <ContactForm />
            </Motion.div>

            {/* Info panel */}
            <Motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl font-bold text-brand-dark mb-3">What happens after you submit?</h3>
                <ol className="space-y-4">
                  {[
                    { step: "01", text: "We contact you within 2 hours to confirm a demo time." },
                    { step: "02", text: "We set up a 30–45 min live walkthrough tailored to your school's board and size." },
                    { step: "03", text: "You see every module and portal working with real data." },
                    { step: "04", text: "No pressure. No contract. You decide if Infovion is right for your school." },
                  ].map((item) => (
                    <li key={item.step} className="flex gap-4 items-start">
                      <span className="text-2xl font-extrabold text-brand-cream" style={{ WebkitTextStroke: "1px #BE6D56", flexShrink: 0 }}>
                        {item.step}
                      </span>
                      <p className="text-brand-neutral text-sm leading-relaxed pt-1">{item.text}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-brand-cream/40 border border-brand-cream rounded-2xl p-6 space-y-3">
                <p className="text-xs font-semibold text-brand-terra uppercase tracking-widest mb-4">Quick Contact</p>
                <a href="https://wa.me/919309193613?text=Hi!%20I%27d%20like%20to%20know%20more%20about%20Infovion%20Academic%20ERP."
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 bg-[#25D366] text-white px-5 py-3 rounded-full font-semibold text-sm hover:bg-[#1fbb59] transition-colors">
                  <span>WhatsApp us now</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a href="tel:+919309193613"
                  className="flex items-center justify-between gap-3 bg-brand-terra text-white px-5 py-3 rounded-full font-semibold text-sm hover:bg-[#a85d48] transition-colors">
                  <span>Call +91 9309193613</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
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
              <p className="text-brand-terra font-semibold text-xs uppercase tracking-widest mb-3">FAQ</p>
              <h2 className="text-3xl font-bold text-brand-dark">Quick Answers</h2>
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
                    animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
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
      </Motion.main>
    </>
  );
}
