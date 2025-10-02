import React from "react";
import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Award,
  Clock,
  Wrench,
  LayoutGrid,
  Layers,
  Share2,
  BrainCircuit,
  BarChart3, // <-- 1. Added new icon import
} from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// 2. Updated services array with Data Analysis
const services = [
  {
    title: "Web Development",
    description:
      "Modern, responsive websites with cutting-edge technologies and optimal performance.",
    icon: <Wrench aria-hidden="true" />,
  },
  {
    title: "App Development",
    description:
      "Cross-platform mobile and desktop applications that deliver exceptional user experiences.",
    icon: <LayoutGrid aria-hidden="true" />,
  },
  {
    title: "ERP Solutions",
    description:
      "Comprehensive enterprise resource planning systems to streamline your operations.",
    icon: <Layers aria-hidden="true" />,
  },
  {
    title: "Digital Marketing",
    description:
      "Data-driven marketing strategies to boost your online presence and drive growth.",
    icon: <Share2 aria-hidden="true" />,
  },
  {
    title: "AI Solutions",
    description:
      "Intelligent automation and AI-powered tools to transform your business processes.",
    icon: <BrainCircuit aria-hidden="true" />,
  },
  {
    title: "Data Analysis",
    description:
      "Unlock actionable insights from your business data to drive growth, optimize operations, and make informed decisions.",
    icon: <BarChart3 aria-hidden="true" />,
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery & Consultation",
    description:
      "We deeply understand your business needs, goals, and challenges through comprehensive analysis.",
  },
  {
    number: "02",
    title: "Strategic Planning",
    description:
      "Create a detailed roadmap with timeline, milestones, and technical specifications.",
  },
  {
    number: "03",
    title: "Design & Development",
    description:
      "Our expert team crafts your solution using industry best practices and cutting-edge technologies.",
  },
  {
    number: "04",
    title: "Quality Assurance",
    description:
      "Rigorous testing across all devices and scenarios to ensure flawless performance.",
  },
  {
    number: "05",
    title: "Launch & Support",
    description:
      "Smooth deployment with ongoing maintenance, updates, and 24/7 technical support.",
  },
];

const stats = [
  {
    icon: <Users className="w-8 h-8" />,
    number: "150+",
    label: "Happy Clients",
  },
  {
    icon: <Award className="w-8 h-8" />,
    number: "200+",
    label: "Projects Completed",
  },
  {
    icon: <Star className="w-8 h-8" />,
    number: "98%",
    label: "Client Satisfaction",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    number: "24/7",
    label: "Support Available",
  },
];

export default function Services() {
  return (
    <>
      <Helmet>
        {/* ✅ OPTIMIZED TITLE (Local + Intent-Focused) - Max 60 chars */}
        <title>
          Digital Services: Web Development, Mobile Apps & AI in Pune |
          BuildWithInfovion
        </title>

        {/* ✅ OPTIMIZED META DESCRIPTION (Localized for Pune & India) - Max 160 chars */}
        <meta
          name="description"
          content="Transform your business with expert digital solutions from our Pune-based agency. We specialize in high-performance Web Development, Mobile App Development, ERP, AI, and Data Analysis."
        />

        {/* ❌ REMOVED: Obsolete <meta name="keywords" /> tag */}
        {/* <meta name="keywords" content="web development, app development, ERP solutions, digital marketing, AI solutions, data analysis, BuildWithInfovion services" /> */}

        {/* ✅ FIXED CANONICAL URL: Set to the absolute, primary domain URL */}
        <link rel="canonical" href="https://buildwithinfovion.in/services" />

        {/* Open Graph Meta Tags (Optimized) */}
        <meta
          property="og:title"
          content="Expert Digital Solutions in Pune, India | BuildWithInfovion Services"
        />
        <meta
          property="og:description"
          content="Professional digital solutions to transform your business - web development, mobile apps, ERP, AI automation, and Data Analysis."
        />
        {/* ✅ FIXED OG URL */}
        <meta
          property="og:url"
          content="https://buildwithinfovion.in/services"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <Motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-7xl mx-auto px-6 py-12 sm:py-20"
      >
        {/* Hero Section */}
        <Motion.section
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
              Our <span className="text-blue-600">Services</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Delivering best-in-class digital solutions that empower your
              business to thrive in today's competitive landscape.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Affordable Pricing
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Fast Delivery
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                24/7 Support
              </span>
            </div>
          </div>
        </Motion.section>

        {/* Stats Section */}
        <Motion.section
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerVariants}
        >
          {stats.map((stat, index) => (
            <Motion.div
              key={index}
              className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl text-center p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-600/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 cursor-pointer overflow-hidden"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="text-blue-600 dark:text-blue-400 mb-4 flex justify-center group-hover:text-blue-500 transition-colors duration-300">
                  {React.cloneElement(stat.icon, {
                    className:
                      "w-8 h-8 group-hover:scale-110 transition-transform duration-300",
                  })}
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">
                  {stat.label}
                </div>
              </div>
            </Motion.div>
          ))}
        </Motion.section>

        {/* Services Grid */}
        <Motion.section
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          aria-label="List of services offered by BuildWithInfovion"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              What We Offer
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to meet your specific
              business requirements and drive growth.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 max-w-7xl mx-auto text-center">
            {services.map((item, i) => (
              <Motion.article
                key={i}
                whileHover={{
                  scale: 1.08,
                  y: -12,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.95 }}
                role="listitem"
                className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-600/50 hover:shadow-2xl hover:shadow-blue-500/15 transition-all duration-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 overflow-hidden"
                tabIndex={0}
              >
                {/* 3. Updated dynamic styling to handle 6 items */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl ${
                    i % 6 === 0
                      ? "bg-gradient-to-br from-blue-50/50 to-cyan-50/30 dark:from-blue-900/20 dark:to-cyan-900/10"
                      : i % 6 === 1
                      ? "bg-gradient-to-br from-green-50/50 to-emerald-50/30 dark:from-green-900/20 dark:to-emerald-900/10"
                      : i % 6 === 2
                      ? "bg-gradient-to-br from-purple-50/50 to-pink-50/30 dark:from-purple-900/20 dark:to-pink-900/10"
                      : i % 6 === 3
                      ? "bg-gradient-to-br from-orange-50/50 to-red-50/30 dark:from-orange-900/20 dark:to-red-900/10"
                      : i % 6 === 4
                      ? "bg-gradient-to-br from-teal-50/50 to-blue-50/30 dark:from-teal-900/20 dark:to-blue-900/10"
                      : "bg-gradient-to-br from-yellow-50/50 to-amber-50/30 dark:from-yellow-900/20 dark:to-amber-900/10"
                  }`}
                ></div>

                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    i % 6 === 0
                      ? "bg-gradient-to-r from-blue-400/0 via-blue-500/20 to-cyan-500/20"
                      : i % 6 === 1
                      ? "bg-gradient-to-r from-green-400/0 via-green-500/20 to-emerald-500/20"
                      : i % 6 === 2
                      ? "bg-gradient-to-r from-purple-400/0 via-purple-500/20 to-pink-500/20"
                      : i % 6 === 3
                      ? "bg-gradient-to-r from-orange-400/0 via-orange-500/20 to-red-500/20"
                      : i % 6 === 4
                      ? "bg-gradient-to-r from-teal-400/0 via-teal-500/20 to-blue-500/20"
                      : "bg-gradient-to-r from-yellow-400/0 via-yellow-500/20 to-amber-500/20"
                  }`}
                ></div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <div className="w-16 h-16 mx-auto rounded-xl flex items-center justify-center group-hover:bg-white/20 dark:group-hover:bg-gray-700/20 transition-all duration-300">
                      {React.cloneElement(item.icon, {
                        className: `w-10 h-10 mx-auto ${
                          i % 6 === 0
                            ? "text-blue-600 group-hover:text-blue-500"
                            : i % 6 === 1
                            ? "text-green-600 group-hover:text-green-500"
                            : i % 6 === 2
                            ? "text-purple-600 group-hover:text-purple-500"
                            : i % 6 === 3
                            ? "text-orange-600 group-hover:text-orange-500"
                            : i % 6 === 4
                            ? "text-teal-600 group-hover:text-teal-500"
                            : "text-yellow-600 group-hover:text-yellow-500"
                        } transition-colors duration-300 group-hover:drop-shadow-lg`,
                      })}
                    </div>
                  </div>
                  <h3
                    className={`font-bold text-sm lg:text-base text-gray-900 dark:text-white transition-all duration-300 ${
                      i % 6 === 0
                        ? "group-hover:text-blue-700 dark:group-hover:text-blue-300"
                        : i % 6 === 1
                        ? "group-hover:text-green-700 dark:group-hover:text-green-300"
                        : i % 6 === 2
                        ? "group-hover:text-purple-700 dark:group-hover:text-purple-300"
                        : i % 6 === 3
                        ? "group-hover:text-orange-700 dark:group-hover:text-orange-300"
                        : i % 6 === 4
                        ? "group-hover:text-teal-700 dark:group-hover:text-teal-300"
                        : "group-hover:text-yellow-700 dark:group-hover:text-yellow-300"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className={`w-8 h-1 mx-auto rounded-full ${
                        i % 6 === 0
                          ? "bg-blue-500"
                          : i % 6 === 1
                          ? "bg-green-500"
                          : i % 6 === 2
                          ? "bg-purple-500"
                          : i % 6 === 3
                          ? "bg-orange-500"
                          : i % 6 === 4
                          ? "bg-teal-500"
                          : "bg-yellow-500"
                      }`}
                    ></div>
                  </div>
                </div>
              </Motion.article>
            ))}
          </div>
        </Motion.section>

        {/* Process Flow */}
        <Motion.section
          className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800/60 dark:to-gray-900/60 backdrop-blur-md rounded-2xl p-8 lg:p-12 mb-20 border dark:border-gray-700/50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          aria-labelledby="process-heading"
        >
          <div className="text-center mb-12">
            <h2
              id="process-heading"
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Our Proven Process
            </h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              A systematic approach that ensures successful project delivery
              every time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <Motion.div
                key={index}
                className="text-center relative"
                variants={itemVariants}
              >
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg shadow-blue-500/30">
                  {step.number}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {step.description}
                </p>
                {index < processSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-5 left-[110%] w-6 h-6 text-blue-600 dark:text-blue-400 opacity-30" />
                )}
              </Motion.div>
            ))}
          </div>
        </Motion.section>

        {/* Why Choose Us */}
        <Motion.section
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            Why Choose BuildWithInfovion?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                emoji: "⚡",
                title: "Lightning Fast",
                desc: "Quick turnaround times without compromising on quality or attention to detail.",
                color: "blue",
              },
              {
                emoji: "💰",
                title: "Cost Effective",
                desc: "Premium solutions at affordable prices, maximizing your return on investment.",
                color: "green",
              },
              {
                emoji: "🎯",
                title: "Results Driven",
                desc: "Focused on delivering measurable results that drive your business forward.",
                color: "purple",
              },
            ].map((item, i) => (
              <Motion.div
                key={i}
                className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-600/50 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl ${
                    item.color === "blue"
                      ? "bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-blue-900/20 dark:to-indigo-900/10"
                      : item.color === "green"
                      ? "bg-gradient-to-br from-green-50/50 to-emerald-50/30 dark:from-green-900/20 dark:to-emerald-900/10"
                      : "bg-gradient-to-br from-purple-50/50 to-pink-50/30 dark:from-purple-900/20 dark:to-pink-900/10"
                  }`}
                ></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.emoji}
                  </div>
                  <h3
                    className={`font-semibold text-lg text-gray-900 dark:text-white mb-2 transition-colors duration-300 ${
                      item.color === "blue"
                        ? "group-hover:text-blue-700 dark:group-hover:text-blue-300"
                        : item.color === "green"
                        ? "group-hover:text-green-700 dark:group-hover:text-green-300"
                        : "group-hover:text-purple-700 dark:group-hover:text-purple-300"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {item.desc}
                  </p>
                </div>
              </Motion.div>
            ))}
          </div>
        </Motion.section>

        {/* Call To Action */}
        <Motion.section
          className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 lg:p-12 text-center text-white overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-20 h-20 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-16 h-16 border border-white/20 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your project requirements and create a custom
              solution that drives results for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-base shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
                  aria-label="Contact BuildWithInfovion for services"
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Motion.div>
              <Motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
                >
                  View Our Work
                </Link>
              </Motion.div>
            </div>
          </div>
        </Motion.section>
      </Motion.main>
    </>
  );
}
