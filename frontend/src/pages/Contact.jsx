import React, { useState, useMemo } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Send,
  ChevronDown,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import ContactForm from "../components/ContactForm"; // Using your local form component

// --- Animation Variants ---
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

// Static map for Tailwind's dynamic class issue
const colorStyles = {
  blue: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-600 dark:text-blue-400",
  },
  green: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-600 dark:text-green-400",
  },
  red: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-600 dark:text-red-400",
  },
};

const contactMethods = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email Us",
    description: "Response within 2 hours",
    value: "infovion2025@gmail.com",
    action: "mailto:infovion2025@gmail.com",
    color: "blue",
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Call Us",
    description: "Mon-Sun, 9am - 10pm",
    value: "+91 91563 02024",
    action: "tel:+919156302024",
    color: "green",
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "WhatsApp",
    description: "Chat instantly",
    value: "Message Now",
    action: "https://wa.me/9767102002",
    color: "green",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Location",
    description: "Mumbai-Bengaluru Highway",
    value: "Pune, Maharashtra 411041",
    action:
      "https://www.google.com/maps/search/?api=1&query=Pune,Maharashtra+411041",
    color: "red",
  },
];

const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex applications can take 8-16 weeks. We'll provide a detailed timeline after understanding your requirements.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes! We offer comprehensive post-launch support including bug fixes, updates, security patches, and feature enhancements. Our support packages are tailored to your needs.",
  },
  {
    question: "What's your development process?",
    answer:
      "We follow an agile methodology with regular updates and client feedback. The process includes discovery, planning, design, development, testing, and deployment with continuous communication.",
  },
  {
    question: "Can you work with our existing team?",
    answer:
      "Absolutely! We're experienced in collaborating with in-house teams, other agencies, and stakeholders. We adapt our workflow to complement your existing processes.",
  },
];

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Motion.div
      layout
      onClick={() => setIsOpen(!isOpen)}
      className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-600/50 cursor-pointer hover:border-blue-400/50 transition-colors duration-300"
    >
      <Motion.div layout className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {faq.question}
        </h3>
        <Motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </Motion.div>
      </Motion.div>
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: "16px" }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {faq.answer}
            </p>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.div>
  );
};

export default function Contact() {
  // ✅ DEFINITIVE FIX: useMemo is imported and defines the final variable here.
  const faqSchema = useMemo(() => {
    const mainEntity = faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    }));

    // The 'mainEntity' variable is safely used only within this block.
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: mainEntity,
    };
  }, []);

  return (
    <>
      <Helmet>
        {/* ✅ OPTIMIZED TITLE & DESCRIPTION */}
        <title>
          Contact BuildWithInfovion: Web & App Solutions in Pune, India
        </title>
        <meta
          name="description"
          content="Contact BuildWithInfovion in Pune, Maharashtra for professional web development, mobile apps, and digital solutions. Available 7 days a week with fast response time."
        />

        {/* ✅ FIXED CANONICAL URL */}
        <link rel="canonical" href="https://buildwithinfovion.in/contact" />

        {/* 🚀 TECHNICAL SEO: Uses the correctly scoped 'faqSchema' variable. */}
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-7xl mx-auto px-6 py-12 sm:py-20"
      >
        <Motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            Let's Build Something <span className="text-blue-600">Amazing</span>{" "}
            Together
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Ready to transform your ideas into reality? We're here to help you
            create exceptional digital experiences that drive results.
          </p>
        </Motion.section>

        <Motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20"
        >
          <Motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-200/50 dark:border-gray-600/50"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Start Your Project
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Tell us about your vision and we'll get back to you within 2
                hours.
              </p>
            </div>
            <ContactForm />
          </Motion.div>

          <Motion.div variants={itemVariants} className="space-y-6">
            {contactMethods.map((method) => (
              <Motion.a
                key={method.title}
                href={method.action}
                target={method.action.startsWith("http") ? "_blank" : "_self"}
                rel={
                  method.action.startsWith("http") ? "noopener noreferrer" : ""
                }
                className="group relative flex items-center gap-4 p-5 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-600/50 overflow-hidden"
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div
                  className={`relative p-3 rounded-xl ${
                    colorStyles[method.color].bg
                  } ${colorStyles[method.color].text}`}
                >
                  {method.icon}
                </div>
                <div className="relative flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {method.title}
                  </h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    {method.value}
                  </p>
                </div>
                <Send className="relative w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
              </Motion.a>
            ))}
          </Motion.div>
        </Motion.section>

        <Motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Quick answers to common questions about our services and process.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} />
            ))}
          </div>
        </Motion.section>
      </Motion.main>
    </>
  );
}
