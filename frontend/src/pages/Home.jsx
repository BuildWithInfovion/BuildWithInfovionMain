import React, { useRef } from "react";
import {
  motion as Motion,
  useScroll,
  useTransform,
  animate,
  useMotionValue,
} from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code,
  Smartphone,
  PenTool,
  BrainCircuit,
  BarChart3,
  Briefcase,
  Zap,
  ShieldCheck,
  Handshake,
  Star,
  ArrowUpRight,
} from "lucide-react";
import { blogPosts } from "../Data/blogData";

// --- 1. IMPORT YOUR NEW BACKGROUND IMAGE ---
import heroBg from "/src/assets/hero-bg.avif"; // Path to your background image

// --- Animation Variants ---
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.2 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// --- Aurora Hero Background Component ---
const AuroraHero = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useTransform(x, (val) => `${val}px`);
  const mouseY = useTransform(y, (val) => `${val}px`);
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    animate(x, e.clientX - rect.left - rect.width / 2, {
      type: "spring",
      stiffness: 150,
      damping: 20,
    });
    animate(y, e.clientY - rect.top - rect.height / 2, {
      type: "spring",
      stiffness: 150,
      damping: 20,
    });
  };
  return (
    <div
      onMouseMove={handleMouseMove}
      className="absolute inset-0 z-0 overflow-hidden"
    >
      <Motion.div
        className="absolute w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(96,165,250,0.15),_transparent_40%)]"
        style={{
          left: mouseX,
          top: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
};

// --- Particle Background Component for CTA ---
const ParticleBackground = () => {
  const particles = Array.from({ length: 30 }).map((_, i) => (
    <Motion.div
      key={i}
      className="absolute rounded-full bg-white/10"
      initial={{
        x: Math.random() * 100 + "%",
        y: Math.random() * 100 + "%",
        scale: Math.random() * 0.5 + 0.5,
        opacity: Math.random() * 0.2 + 0.1,
      }}
      animate={{
        x: `+=${(Math.random() - 0.5) * 100}px`,
        y: `+=${(Math.random() - 0.5) * 100}px`,
      }}
      transition={{
        duration: Math.random() * 15 + 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      style={{
        width: `${Math.random() * 6 + 2}px`,
        height: `${Math.random() * 6 + 2}px`,
      }}
    />
  ));
  return (
    <div className="absolute inset-0 overflow-hidden blur-sm">{particles}</div>
  );
};

export default function Home() {
  const latestPosts = blogPosts.slice(0, 3);
  const processRef = useRef(null);
  // This is the new, optimized code
  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ["start center", "end center"],
  });
  // This is the new, corrected code
  // This is the new, optimized code
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const progressDot = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const processSteps = [
    {
      title: "Discover",
      description:
        "We start by diving deep into your goals, target audience, and project requirements to build a solid foundation.",
    },
    {
      title: "Design",
      description:
        "Our team crafts an intuitive, visually stunning UI/UX design that focuses on user engagement and conversion.",
    },
    {
      title: "Develop",
      description:
        "Using cutting-edge technology, we bring the design to life with clean, scalable, and high-performance code.",
    },
    {
      title: "Deploy",
      description:
        "We rigorously test and deploy your project, providing ongoing support to ensure a seamless launch and continued success.",
    },
  ];

  // --- END OF CODE BLOCK TO ADD ---

  return (
    <>
      <Helmet>
        {/* ✅ OPTIMIZED TITLE (Keywords: Web Dev, UI/UX, AI, Pune) - Max 60 chars */}
        <title>
          Web Development, UI/UX & AI Solutions Agency in Pune |
          BuildWithInfovion
        </title>
        {/* ✅ OPTIMIZED META DESCRIPTION (Keywords + Location for CTR) - Max 160 chars */}
        <meta
          name="description"
          content="Leading Digital Solutions Agency in Pune, India. We deliver high-performance Web Development, Mobile Apps, UI/UX Design, and custom AI/ERP solutions for businesses across the country. Get a free quote."
        />
        {/* ✅ FIXED CANONICAL URL: Set to the absolute, primary domain */}
        <link rel="canonical" href="https://buildwithinfovion.com/" />
      </Helmet>

      <Motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* --- HERO SECTION --- */}
        {/* --- 2. UPDATED HERO SECTION with BACKGROUND IMAGE --- */}
        <section
          className="relative min-h-screen flex items-center justify-center overflow-hidden text-center bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          {/* Added a dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60 z-0"></div>

          <AuroraHero />

          <Motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 px-6"
          >
            <Motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-7xl font-extrabold text-white mb-6 tracking-tight"
            >
              Turn Your Vision into <br />
              <span className="text-blue-500">Digital Reality</span>
            </Motion.h1>
            <Motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto mb-10"
            >
              We build affordable, high-quality digital solutions that save you
              time and deliver exceptional results.
            </Motion.p>
            <Motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-blue-700 transition-colors"
                >
                  Get a Free Quote
                </Link>
              </Motion.div>
            </Motion.div>
          </Motion.div>
        </section>

        {/* --- OUR SERVICES SECTION --- */}
        <Motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-24 px-6 max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Our Core Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-3">
              Solutions designed to elevate your business.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Code />, title: "Web Development", link: "/services" },
              { icon: <Smartphone />, title: "Mobile Apps", link: "/services" },
              { icon: <PenTool />, title: "UI/UX Design", link: "/services" },
              {
                icon: <BrainCircuit />,
                title: "AI Solutions",
                link: "/services",
              },
              {
                icon: <BarChart3 />,
                title: "Data Analysis",
                link: "/services",
              },
              {
                icon: <Briefcase />,
                title: "ERP Solutions",
                link: "/services",
              },
            ].map((service, i) => (
              <Motion.div key={i} variants={itemVariants}>
                <Link
                  to={service.link}
                  className="group block relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-600/50 text-left h-full transition-transform duration-300 hover:-translate-y-2"
                >
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg w-fit mb-4">
                    {React.cloneElement(service.icon, { className: "w-8 h-8" })}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <span className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </Motion.div>
            ))}
          </div>
        </Motion.section>

        {/* --- ANIMATED PROCESS SECTION --- */}
        <Motion.section
          ref={processRef}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="py-24 px-6 bg-gray-50 dark:bg-gray-900/50 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                Your Vision, Our Blueprint
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-3">
                A streamlined 4-step process for guaranteed success.
              </p>
            </div>
            <div className="relative">
              <div className="hidden md:block absolute top-12 left-0 w-full">
                <svg
                  width="100%"
                  height="4"
                  viewBox="0 0 1000 4"
                  preserveAspectRatio="none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 0 2 L 1000 2"
                    stroke="url(#process-gradient-desktop)"
                    strokeOpacity="0.3"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <Motion.path
                    d="M 0 2 L 1000 2"
                    stroke="url(#process-gradient-desktop)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    style={{ pathLength }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient
                      id="process-gradient-desktop"
                      gradientTransform="rotate(0)"
                    >
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <Motion.div
                  style={{
                    offsetDistance: progressDot,
                    offsetPath: `path("M 0 2 L 1000 2")`,
                    offsetRotate: "auto",
                  }}
                  className="absolute"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transform -translate-y-1/2"
                  >
                    <path
                      d="M7 5L12 10L7 15"
                      stroke="#a855f7"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ filter: "drop-shadow(0 0 5px #c084fc)" }}
                    />
                  </svg>
                </Motion.div>
              </div>
              <div className="md:hidden absolute top-0 left-1/2 -translate-x-1/2 h-full">
                <svg
                  height="100%"
                  width="4"
                  viewBox="0 0 4 800"
                  preserveAspectRatio="none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 2 0 L 2 800"
                    stroke="url(#process-gradient-mobile)"
                    strokeOpacity="0.3"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <Motion.path
                    d="M 2 0 L 2 800"
                    stroke="url(#process-gradient-mobile)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    style={{ pathLength }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient
                      id="process-gradient-mobile"
                      gradientTransform="rotate(0)"
                    >
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <Motion.div
                  style={{
                    offsetDistance: progressDot,
                    offsetPath: `path("M 2 0 L 2 800")`,
                    offsetRotate: "auto",
                  }}
                  className="absolute"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transform -translate-x-1/2"
                  >
                    <path
                      d="M7 5L12 10L7 15"
                      stroke="#a855f7"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ filter: "drop-shadow(0 0 5px #c084fc)" }}
                    />
                  </svg>
                </Motion.div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-y-24 md:gap-y-0 md:gap-x-8 text-center">
                {processSteps.map((step, i) => (
                  <Motion.div
                    key={i}
                    variants={itemVariants}
                    className="relative z-10 flex flex-col items-center"
                  >
                    <Motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{
                        delay: i * 0.2,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="w-24 h-24 flex items-center justify-center bg-white dark:bg-gray-800 border-4 border-blue-600 rounded-full font-bold text-3xl shadow-lg mb-6 text-blue-600"
                    >
                      {`0${i + 1}`}
                    </Motion.div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-xs mx-auto">
                      {step.description}
                    </p>
                  </Motion.div>
                ))}
              </div>
            </div>
          </div>
        </Motion.section>

        {/* --- INTERACTIVE TESTIMONIALS SECTION --- */}
        <Motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-24 px-6 max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Trusted by Growing Businesses
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-3">
              Here's what our partners are saying.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Aarav Sharma",
                company: "EduSpark",
                quote:
                  "The e-learning platform they built for us is incredible. Engagement is up 50%!",
              },
              {
                name: "Priya Singh",
                company: "FreshCart",
                quote:
                  "BuildWithInfovion delivered our e-commerce site on time and on budget. Sales have doubled since launch.",
              },
              {
                name: "Rohan Mehta",
                company: "RealtyConnect",
                quote:
                  "Their team understood our vision perfectly. The real estate portal is fast, beautiful, and exactly what we needed.",
              },
            ].map((t, i) => (
              <Motion.div
                key={i}
                variants={itemVariants}
                className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-600/50 h-full overflow-hidden"
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty(
                    "--mouse-x",
                    `${e.clientX - rect.left}px`
                  );
                  e.currentTarget.style.setProperty(
                    "--mouse-y",
                    `${e.clientY - rect.top}px`
                  );
                }}
              >
                <div
                  className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(96, 165, 250, 0.2), transparent 40%)`,
                  }}
                />
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {t.name}
                      </p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        {t.company}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    "{t.quote}"
                  </p>
                  <div className="flex mt-6 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
              </Motion.div>
            ))}
          </div>
        </Motion.section>

        {/* --- EXPANDED BLOG SECTION --- */}
        <Motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="py-24 px-6 bg-gray-50 dark:bg-gray-900/50"
        >
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              From Our Blog
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-16">
              Stay ahead with the latest insights from our team of experts.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
              {latestPosts.map((post) => (
                <Motion.div key={post.id} variants={itemVariants}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden h-full transition-transform duration-300 hover:-translate-y-2"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-2">
                        {post.category.toUpperCase()}
                      </p>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <span className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 group-hover:text-blue-600 transition-colors">
                        Read More <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </Motion.div>
              ))}
            </div>
          </div>
        </Motion.section>

        {/* --- SOOTHING CTA SECTION --- */}
        <Motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-24 px-6"
        >
          <div className="relative max-w-5xl mx-auto text-center bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-12 text-white overflow-hidden">
            <ParticleBackground />
            <h2 className="text-4xl font-bold mb-4 relative z-10">
              Ready to Start Your Project?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg relative z-10">
              Your free consultation is just a click away. Let's discuss your
              vision and create a custom digital solution that drives real
              results.
            </p>
            <Motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-100 transition-colors"
              >
                Schedule a Free Consultation{" "}
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </Motion.div>
          </div>
        </Motion.section>
      </Motion.main>
    </>
  );
}
