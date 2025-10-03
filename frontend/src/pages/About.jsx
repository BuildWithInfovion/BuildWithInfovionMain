import React from "react";
import { motion as Motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Code,
  Figma,
  Server,
  CheckSquare,
  Smartphone,
  Box,
  Target,
  Briefcase,
} from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const expertiseData = [
  {
    icon: (
      <Code
        className="w-12 h-12 mx-auto text-blue-600 mb-4"
        aria-hidden="true"
      />
    ),
    title: "Web Development",
  },
  {
    icon: (
      <Figma
        className="w-12 h-12 mx-auto text-blue-600 mb-4"
        aria-hidden="true"
      />
    ),
    title: "UI/UX Design",
  },
  {
    icon: (
      <Server
        className="w-12 h-12 mx-auto text-blue-600 mb-4"
        aria-hidden="true"
      />
    ),
    title: "DevOps Services",
  },
  {
    icon: (
      <CheckSquare
        className="w-12 h-12 mx-auto text-blue-600 mb-4"
        aria-hidden="true"
      />
    ),
    title: "Testing Services",
  },
  {
    icon: (
      <Smartphone
        className="w-12 h-12 mx-auto text-blue-600 mb-4"
        aria-hidden="true"
      />
    ),
    title: "Native App Development",
  },
  {
    icon: (
      <Box
        className="w-12 h-12 mx-auto text-blue-600 mb-4"
        aria-hidden="true"
      />
    ),
    title: "Hybrid App Development",
  },
  {
    icon: (
      <Target
        className="w-12 h-12 mx-auto text-blue-600 mb-4"
        aria-hidden="true"
      />
    ),
    title: "Fixed Scope Projects",
  },
  {
    icon: (
      <Briefcase
        className="w-12 h-12 mx-auto text-blue-600 mb-4"
        aria-hidden="true"
      />
    ),
    title: "Tech Consulting",
  },
];

export default function About() {
  return (
    <>
      <Helmet>
        {/* ✅ OPTIMIZED TITLE (E-E-A-T focused + Location) - Max 60 chars */}
        <title>
          About BuildWithInfovion - Pune Digital Solutions Agency & Expert Team
        </title>

        {/* ✅ OPTIMIZED META DESCRIPTION (E-E-A-T + Location for Authority) - Max 160 chars */}
        <meta
          name="description"
          content="We are a trusted digital solutions agency based in Pune, India. Learn about our mission, core values, and our expert team specializing in affordable web development, mobile apps, and UI/UX design."
        />

        {/* ❌ REMOVED: Obsolete <meta name="keywords" /> tag */}
        {/* <meta name="keywords" content="BuildWithInfovion, about us, web development, UI/UX design, tech consulting, digital solutions" /> */}

        {/* ✅ FIXED CANONICAL URL: Set to the absolute, primary domain URL (.in) */}
        <link rel="canonical" href="https://buildwithinfovion.com/about" />

        {/* Open Graph Meta Tags (Kept consistent with main SEO) */}
        <meta
          property="og:title"
          content="About BuildWithInfovion - Pune Digital Solutions Agency"
        />
        <meta
          property="og:description"
          content="Learn about BuildWithInfovion's mission, vision, and expertise in affordable digital solutions."
        />
        <meta property="og:url" content="https://buildwithinfovion.com/about" />
      </Helmet>

      <Motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-7xl mx-auto px-6 py-12 sm:py-20"
      >
        {/* Hero Section */}
        <Motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            About <span className="text-white">BuildWith</span>
            <span className="text-blue-600">Infovion</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            We build innovative and affordable digital solutions that save your
            time and resources while delivering exceptional results.
          </p>
        </Motion.section>

        {/* Mission & Vision */}
        <Motion.section
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          aria-label="Our Mission and Vision"
        >
          <Motion.article
            whileHover={{
              scale: 1.03,
              y: -8,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-600/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 cursor-pointer overflow-hidden"
          >
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 via-blue-500/20 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/70 transition-colors duration-300">
                  <span className="text-2xl">🎯</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                  Our Mission
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                To deliver cost-effective, cutting-edge technology solutions
                that empower businesses worldwide to achieve digital
                transformation and sustainable growth.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                We believe every business deserves access to premium digital
                solutions without breaking the bank. From startups taking their
                first digital steps to established enterprises scaling new
                heights, we craft tailored solutions that drive real results.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                  Innovation First
                </span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                  Cost-Effective
                </span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                  Global Impact
                </span>
              </div>
            </div>
          </Motion.article>

          <Motion.article
            whileHover={{
              scale: 1.03,
              y: -8,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-600/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 cursor-pointer overflow-hidden"
          >
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent dark:from-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/0 via-purple-500/20 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/70 transition-colors duration-300">
                  <span className="text-2xl">🚀</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">
                  Our Vision
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                To be recognized globally as a trusted partner for digital
                innovation, setting industry standards for affordable excellence
                and transformative technology solutions.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                We envision a future where cutting-edge technology is accessible
                to all businesses, regardless of size or budget. By 2030,
                BuildWithInfovion will be the go-to partner for companies
                seeking innovative, reliable, and scalable digital solutions
                across the globe.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                  Global Recognition
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                  Industry Leader
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                  2030 Goal
                </span>
              </div>
            </div>
          </Motion.article>
        </Motion.section>

        {/* Values */}
        <Motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          aria-labelledby="values-heading"
          className="mb-20"
        >
          <h2
            id="values-heading"
            className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center"
          >
            Our Core Values
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
            <Motion.li
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-600/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-blue-900/20 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 via-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Content */}
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800/70 group-hover:scale-110 transition-all duration-300">
                  <span className="text-4xl group-hover:animate-pulse">💡</span>
                </div>
                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                  Innovation
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  Embracing creativity and cutting-edge technologies to drive
                  progress and deliver breakthrough solutions.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                    AI Integration
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                    Latest Tech
                  </span>
                </div>
              </div>
            </Motion.li>

            <Motion.li
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-600/50 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/30 dark:from-green-900/20 dark:to-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/0 via-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Content */}
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 bg-green-100 dark:bg-green-900/50 rounded-2xl flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-800/70 group-hover:scale-110 transition-all duration-300">
                  <span className="text-4xl group-hover:animate-pulse">🤝</span>
                </div>
                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-300">
                  Integrity
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  Transparency, honesty, and ethical practices in every client
                  interaction and project delivery.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                    Honest Pricing
                  </span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                    Clear Communication
                  </span>
                </div>
              </div>
            </Motion.li>

            <Motion.li
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-600/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/30 dark:from-purple-900/20 dark:to-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/0 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Content */}
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 dark:bg-purple-900/50 rounded-2xl flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-800/70 group-hover:scale-110 transition-all duration-300">
                  <span className="text-4xl group-hover:animate-pulse">🚀</span>
                </div>
                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">
                  Collaboration
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  Working together as partners for shared success, mutual
                  growth, and long-term relationships.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                    Team Approach
                  </span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                    Long-term Partners
                  </span>
                </div>
              </div>
            </Motion.li>
          </ul>
        </Motion.section>

        {/* Expertise Grid */}
        <Motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          aria-label="Areas of Expertise"
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
            Our Areas of Expertise
          </h2>
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto text-center"
            role="list"
          >
            {expertiseData.map((item, i) => (
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
                {/* Dynamic glassmorphism overlay with rotating colors */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl ${
                    i % 8 === 0
                      ? "bg-gradient-to-br from-blue-50/50 to-cyan-50/30 dark:from-blue-900/20 dark:to-cyan-900/10"
                      : i % 8 === 1
                      ? "bg-gradient-to-br from-green-50/50 to-emerald-50/30 dark:from-green-900/20 dark:to-emerald-900/10"
                      : i % 8 === 2
                      ? "bg-gradient-to-br from-purple-50/50 to-pink-50/30 dark:from-purple-900/20 dark:to-pink-900/10"
                      : i % 8 === 3
                      ? "bg-gradient-to-br from-orange-50/50 to-red-50/30 dark:from-orange-900/20 dark:to-red-900/10"
                      : i % 8 === 4
                      ? "bg-gradient-to-br from-teal-50/50 to-blue-50/30 dark:from-teal-900/20 dark:to-blue-900/10"
                      : i % 8 === 5
                      ? "bg-gradient-to-br from-indigo-50/50 to-purple-50/30 dark:from-indigo-900/20 dark:to-purple-900/10"
                      : i % 8 === 6
                      ? "bg-gradient-to-br from-yellow-50/50 to-orange-50/30 dark:from-yellow-900/20 dark:to-orange-900/10"
                      : "bg-gradient-to-br from-pink-50/50 to-rose-50/30 dark:from-pink-900/20 dark:to-rose-900/10"
                  }`}
                ></div>

                {/* Animated border glow with matching colors */}
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    i % 8 === 0
                      ? "bg-gradient-to-r from-blue-400/0 via-blue-500/20 to-cyan-500/20"
                      : i % 8 === 1
                      ? "bg-gradient-to-r from-green-400/0 via-green-500/20 to-emerald-500/20"
                      : i % 8 === 2
                      ? "bg-gradient-to-r from-purple-400/0 via-purple-500/20 to-pink-500/20"
                      : i % 8 === 3
                      ? "bg-gradient-to-r from-orange-400/0 via-orange-500/20 to-red-500/20"
                      : i % 8 === 4
                      ? "bg-gradient-to-r from-teal-400/0 via-teal-500/20 to-blue-500/20"
                      : i % 8 === 5
                      ? "bg-gradient-to-r from-indigo-400/0 via-indigo-500/20 to-purple-500/20"
                      : i % 8 === 6
                      ? "bg-gradient-to-r from-yellow-400/0 via-yellow-500/20 to-orange-500/20"
                      : "bg-gradient-to-r from-pink-400/0 via-pink-500/20 to-rose-500/20"
                  }`}
                ></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Enhanced icon container with hover effects */}
                  <div className="mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <div className="w-16 h-16 mx-auto rounded-xl flex items-center justify-center group-hover:bg-white/20 dark:group-hover:bg-gray-700/20 transition-all duration-300">
                      {React.cloneElement(item.icon, {
                        className: `w-10 h-10 mx-auto ${
                          i % 8 === 0
                            ? "text-blue-600 group-hover:text-blue-500"
                            : i % 8 === 1
                            ? "text-green-600 group-hover:text-green-500"
                            : i % 8 === 2
                            ? "text-purple-600 group-hover:text-purple-500"
                            : i % 8 === 3
                            ? "text-orange-600 group-hover:text-orange-500"
                            : i % 8 === 4
                            ? "text-teal-600 group-hover:text-teal-500"
                            : i % 8 === 5
                            ? "text-indigo-600 group-hover:text-indigo-500"
                            : i % 8 === 6
                            ? "text-yellow-600 group-hover:text-yellow-500"
                            : "text-pink-600 group-hover:text-pink-500"
                        } transition-colors duration-300 group-hover:drop-shadow-lg`,
                        "aria-hidden": "true",
                      })}
                    </div>
                  </div>

                  {/* Enhanced title with color transitions */}
                  <h3
                    className={`font-bold text-sm lg:text-base text-gray-900 dark:text-white transition-all duration-300 ${
                      i % 8 === 0
                        ? "group-hover:text-blue-700 dark:group-hover:text-blue-300"
                        : i % 8 === 1
                        ? "group-hover:text-green-700 dark:group-hover:text-green-300"
                        : i % 8 === 2
                        ? "group-hover:text-purple-700 dark:group-hover:text-purple-300"
                        : i % 8 === 3
                        ? "group-hover:text-orange-700 dark:group-hover:text-orange-300"
                        : i % 8 === 4
                        ? "group-hover:text-teal-700 dark:group-hover:text-teal-300"
                        : i % 8 === 5
                        ? "group-hover:text-indigo-700 dark:group-hover:text-indigo-300"
                        : i % 8 === 6
                        ? "group-hover:text-yellow-700 dark:group-hover:text-yellow-300"
                        : "group-hover:text-pink-700 dark:group-hover:text-pink-300"
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* Subtle expertise indicator */}
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className={`w-8 h-1 mx-auto rounded-full ${
                        i % 8 === 0
                          ? "bg-blue-500"
                          : i % 8 === 1
                          ? "bg-green-500"
                          : i % 8 === 2
                          ? "bg-purple-500"
                          : i % 8 === 3
                          ? "bg-orange-500"
                          : i % 8 === 4
                          ? "bg-teal-500"
                          : i % 8 === 5
                          ? "bg-indigo-500"
                          : i % 8 === 6
                          ? "bg-yellow-500"
                          : "bg-pink-500"
                      }`}
                    ></div>
                  </div>
                </div>

                {/* Floating particles effect (optional) */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-current opacity-0 group-hover:opacity-30 group-hover:animate-ping transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 rounded-full bg-current opacity-0 group-hover:opacity-40 group-hover:animate-pulse transition-opacity duration-500"></div>
              </Motion.article>
            ))}
          </div>
        </Motion.section>

        {/* Team Highlights */}
        <Motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          aria-labelledby="team-heading"
          className="mb-20"
        >
          <h2
            id="team-heading"
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center"
          >
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Our passionate developers and designers work together to create
            exceptional digital experiences
          </p>

          {/* Lead Developers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {/* Developer 1 - Sankalp Deshpande */}
            <Motion.div
              whileHover={{
                scale: 1.05,
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-600/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 cursor-pointer overflow-hidden text-center"
            >
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-blue-900/20 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 via-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Profile Image Placeholder */}
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  SD
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                  Sankalp Deshpande
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-3 font-semibold">
                  Founder & Lead Developer
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                  Young visionary entrepreneur and full-stack architect with 2+
                  years building scalable web applications. Specializes in
                  end-to-end project delivery from concept to deployment.
                </p>

                {/* Achievement Badge */}
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-800">
                    🏆 20+ Projects Delivered
                  </span>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                    React & Next.js
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                    Node.js & Express
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                    MongoDB & MySQL
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                    AWS & DevOps
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                    TypeScript
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                    Team Leadership
                  </span>
                </div>
              </div>
            </Motion.div>

            {/* Developer 2 - Samarth Giram */}
            <Motion.div
              whileHover={{
                scale: 1.05,
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-600/50 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 cursor-pointer overflow-hidden text-center"
            >
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/30 dark:from-green-900/20 dark:to-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/0 via-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Profile Image Placeholder */}
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  SG
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-300">
                  Samarth Giram
                </h3>
                <p className="text-sm text-green-600 dark:text-green-400 mb-3 font-semibold">
                  Co-Founder & UX Designer
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                  Creative frontend specialist with a passion for pixel-perfect
                  designs and seamless user experiences. Expert in modern
                  frameworks and responsive design systems.
                </p>

                {/* Achievement Badge */}
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-xs font-medium border border-green-200 dark:border-green-800">
                    🎨 50+ UI/UX Designs
                  </span>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                    React & Vue.js
                  </span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                    TypeScript
                  </span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                    Tailwind CSS
                  </span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                    Figma & Design
                  </span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                    Animation & Motion
                  </span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                    Mobile Responsive
                  </span>
                </div>
              </div>
            </Motion.div>

            {/* Developer 3 - CRM & Business Continuity Specialist */}
            <Motion.div
              whileHover={{
                scale: 1.05,
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-600/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 cursor-pointer overflow-hidden text-center"
            >
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/30 dark:from-purple-900/20 dark:to-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/0 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Profile Image Placeholder - Replace with actual image */}
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  VD
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">
                  Vrushali Didshere
                </h3>
                <p className="text-sm text-purple-600 dark:text-purple-400 mb-3 font-semibold">
                  CRM & Business Continuity Manager
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                  Business systems specialist ensuring seamless operations,
                  client relationship management, and strategic continuity
                  planning.
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                    CRM Systems
                  </span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                    Process Management
                  </span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                    Client Relations
                  </span>
                </div>
              </div>
            </Motion.div>
          </div>

          {/* Company Stats Section */}
          <Motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-2xl p-8 lg:p-12 text-white text-center max-w-4xl mx-auto overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-20 h-20 border border-white/20 rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-16 h-16 border border-white/20 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                Building Excellence Together
              </h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Our dedicated team combines years of experience with fresh
                innovation to deliver solutions that exceed expectations and
                drive real business growth.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                <Motion.div whileHover={{ scale: 1.1 }} className="group">
                  <div className="text-4xl font-bold mb-2 group-hover:text-blue-200 transition-colors duration-300">
                    100+
                  </div>
                  <div className="text-blue-200 font-medium">
                    Projects Completed
                  </div>
                </Motion.div>
                <Motion.div whileHover={{ scale: 1.1 }} className="group">
                  <div className="text-4xl font-bold mb-2 group-hover:text-blue-200 transition-colors duration-300">
                    2+
                  </div>
                  <div className="text-blue-200 font-medium">
                    Years Experience
                  </div>
                </Motion.div>
                <Motion.div whileHover={{ scale: 1.1 }} className="group">
                  <div className="text-4xl font-bold mb-2 group-hover:text-blue-200 transition-colors duration-300">
                    24/7
                  </div>
                  <div className="text-blue-200 font-medium">
                    Support Available
                  </div>
                </Motion.div>
              </div>
            </div>
          </Motion.div>
        </Motion.section>
      </Motion.main>
    </>
  );
}
