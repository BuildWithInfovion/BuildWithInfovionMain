import React, { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom"; // ✅ ADDED: Import Link for better internal navigation
import {
  ExternalLink,
  Code,
  Smartphone,
  Monitor,
  Palette,
  ShoppingCart,
  GraduationCap,
  Building2,
  Heart,
  ChefHat,
  Home,
  Filter,
  Eye,
  Github,
  ArrowRight,
} from "lucide-react";

// --- Animation Variants (Consistent with other pages) ---
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -20,
    transition: { duration: 0.3 },
  },
};

// --- Data ---
const categories = [
  { id: "all", label: "All", icon: <Filter className="w-4 h-4 mr-2" /> },
  {
    id: "ecommerce",
    label: "E-commerce",
    icon: <ShoppingCart className="w-4 h-4 mr-2" />,
  },
  {
    id: "education",
    label: "Education",
    icon: <GraduationCap className="w-4 h-4 mr-2" />,
  },
  {
    id: "restaurant",
    label: "Restaurant",
    icon: <ChefHat className="w-4 h-4 mr-2" />,
  },
  {
    id: "realestate",
    label: "Real Estate",
    icon: <Home className="w-4 h-4 mr-2" />,
  },
  {
    id: "corporate",
    label: "Corporate",
    icon: <Building2 className="w-4 h-4 mr-2" />,
  },
];

const projectTemplates = [
  {
    id: 1,
    title: "E-Learning Platform", // Changed 'Template' to 'Platform' for better context
    description:
      "A feature-rich platform for online courses and educational institutions, designed for engagement and intuitive learning.",
    category: "education",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
    technologies: ["React", "Next.js", "Tailwind CSS", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
    idealFor: "Online Academies, Tutors, Corporate Training",
  },
  {
    id: 3,
    title: "Food Delivery App", // Changed 'Template' to 'App'
    description:
      "A complete solution for restaurants and food businesses to launch their own delivery service with real-time tracking.",
    category: "restaurant",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop",
    technologies: ["React Native", "Firebase", "Stripe API"],
    liveUrl: "#",
    githubUrl: "#",
    idealFor: "Restaurants, Cafes, Cloud Kitchens",
  },
  {
    id: 5,
    title: "High-Performance E-commerce Store",
    description:
      "A sleek, high-performance e-commerce template built to maximize conversions and provide a smooth shopping experience.",
    category: "ecommerce",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
    technologies: ["Vue.js", "Node.js", "Stripe API", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
    idealFor: "D2C Brands, Boutiques, Online Retailers",
  },
  {
    id: 4,
    title: "Advanced Real Estate Portal",
    description:
      "A professional template for real estate agencies featuring advanced search, property showcases, and agent profiles.",
    category: "realestate",
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1992&auto=format&fit=crop",
    technologies: ["Next.js", "Prisma", "Mapbox API", "Cloudinary"],
    liveUrl: "#",
    githubUrl: "#",
    idealFor: "Real Estate Agencies, Property Developers",
  },
  {
    id: 6,
    title: "Corporate Agency Website",
    description:
      "A clean, professional template for corporate websites, designed to build trust and clearly communicate your brand's value.",
    category: "corporate",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    technologies: ["React", "TypeScript", "Framer Motion"],
    liveUrl: "#",
    githubUrl: "#",
    idealFor: "Startups, Agencies, B2B Service Providers",
  },
  {
    id: 2,
    title: "Fashion E-commerce Store",
    description:
      "A stylish and modern e-commerce template perfect for fashion and apparel brands, with a focus on visual storytelling.",
    category: "ecommerce",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
    technologies: ["React", "Redux", "Node.js", "Stripe"],
    liveUrl: "#",
    githubUrl: "#",
    idealFor: "Fashion Brands, Accessory Stores",
  },
];

const stats = [
  { number: "15+", label: "Ready Templates", icon: <Palette /> },
  { number: "100%", label: "Customizable", icon: <Monitor /> },
  { number: "5+", label: "Industries Covered", icon: <Building2 /> },
  { number: "24/7", label: "Support Available", icon: <ExternalLink /> },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projectTemplates
      : projectTemplates.filter((p) => p.category === activeCategory);

  // Function to create an SEO-friendly alt tag
  const getAltTag = (project) => {
    return `${project.title} | ${project.description} built by BuildWithInfovion, Pune`;
  };

  return (
    <>
      <Helmet>
        {/* ✅ OPTIMIZED TITLE (Keywords: Portfolio, Web Projects, Pune) */}
        <title>
          Portfolio: Web Projects, App & ERP Solutions in Pune |
          BuildWithInfovion
        </title>
        <meta
          name="description"
          content="Explore our portfolio of cutting-edge web development, mobile app, and ERP solutions built in Pune, India. See high-quality, customizable projects for E-commerce, Ed-Tech, and Real Estate."
        />
        {/* ✅ FIXED CANONICAL URL */}
        <link rel="canonical" href="https://buildwithinfovion.com/portfolio" />
      </Helmet>

      <Motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-7xl mx-auto px-6 py-12 sm:py-20"
      >
        {/* --- Hero Section (Uses h1 correctly) --- */}
        <Motion.section
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
              Explore Our <span className="text-blue-600">Work</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Explore our ready-to-deploy templates and conceptual projects that
              showcase our commitment to quality and innovation.
            </p>
          </div>
        </Motion.section>

        {/* --- Stats Section (Uses h2 implicitly in Stat content which is fine) --- */}
        <Motion.section
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <Motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl text-center p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-600/50"
              whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.3 } }}
            >
              <div className="text-blue-600 dark:text-blue-400 mb-3 flex justify-center">
                {React.cloneElement(stat.icon, { className: "w-8 h-8" })}
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.number}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {stat.label}
              </p>
            </Motion.div>
          ))}
        </Motion.section>

        {/* --- Category Filter --- */}
        <Motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((cat) => (
            <Motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 border-2 ${
                activeCategory === cat.id
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                  : "bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-transparent hover:bg-white dark:hover:bg-gray-800"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.icon}
              {cat.label}
            </Motion.button>
          ))}
        </Motion.div>

        {/* --- Projects Grid --- */}
        <Motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <Motion.div
                layout
                key={project.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-600/50 overflow-hidden"
                whileHover={{
                  y: -8,
                  scale: 1.03,
                  transition: { duration: 0.3 },
                }}
              >
                {/* --- Animated border glow on hover --- */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 via-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative h-52 overflow-hidden">
                  <img
                    src={project.image}
                    // ✅ IMPROVED IMAGE SEO: Dynamic, descriptive alt attribute
                    alt={getAltTag(project)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  {/* Overlay for links */}
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white text-gray-900 rounded-full"
                      aria-label={`View live demo of ${project.title}`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Eye className="w-5 h-5" />
                    </Motion.a>
                    <Motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white text-gray-900 rounded-full"
                      aria-label={`View source code for ${project.title}`}
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github className="w-5 h-5" />
                    </Motion.a>
                  </div>
                </div>

                <div className="p-6 relative">
                  <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold">
                    {project.idealFor}
                  </span>
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mt-1 mb-3">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-blue-100/70 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Motion.div>
            ))}
          </AnimatePresence>
        </Motion.div>

        {/* --- Call to Action --- */}
        <Motion.section
          className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-2xl p-8 lg:p-12 text-center text-white overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <div className="absolute inset-0 bg-[url('/src/assets/hero-bg.avif')] bg-cover opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Our templates are just the beginning. We specialize in building
              custom solutions tailored perfectly to your unique needs.
            </p>
            <Motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link // ✅ CHANGED: Used React Router <Link> for internal navigation
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-base shadow-lg hover:bg-gray-100 transition-colors"
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Motion.div>
          </div>
        </Motion.section>
      </Motion.main>
    </>
  );
}
