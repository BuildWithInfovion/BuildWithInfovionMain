import React, { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Brain,
  Code,
  Smartphone,
  TrendingUp,
  Shield,
  Search,
  Filter,
  BarChart3,
} from "lucide-react";
import { blogPosts } from "../Data/blogData"; // <-- Import data from the new file

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
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100 },
  },
  exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.2 } },
};

// --- Data ---
const categories = [
  { id: "all", label: "All", icon: <Filter className="w-4 h-4 mr-2" /> },
  { id: "ai", label: "AI", icon: <Brain className="w-4 h-4 mr-2" /> },
  { id: "web", label: "Web Dev", icon: <Code className="w-4 h-4 mr-2" /> },
  {
    id: "mobile",
    label: "Mobile",
    icon: <Smartphone className="w-4 h-4 mr-2" />,
  },
  {
    id: "business",
    label: "Business",
    icon: <TrendingUp className="w-4 h-4 mr-2" />,
  },
  { id: "data", label: "Data", icon: <BarChart3 className="w-4 h-4 mr-2" /> },
  {
    id: "security",
    label: "Security",
    icon: <Shield className="w-4 h-4 mr-2" />,
  },
];

// Reusable BlogPostCard Component
const BlogPostCard = ({ post }) => (
  <Motion.div
    layout
    variants={itemVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
    whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.3 } }}
  >
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative">
      <div className="h-48 overflow-hidden">
        <img
          src={post.image}
          // ✅ IMPROVED IMAGE SEO: More descriptive alt tag
          alt={`Featured image for blog post: ${post.title} on ${post.category} category`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" /> {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> {post.readTime}
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-blue-600 transition-colors duration-300">
          {post.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {post.excerpt}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-blue-100/70 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link
            to={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all duration-300"
          >
            Read More <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  </Motion.div>
);

// Main Blog Page Component
export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "all" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  return (
    <>
      <Helmet>
        {/* ✅ OPTIMIZED TITLE (Keywords + Location) */}
        <title>
          Tech Blog: AI, Web Development & Business Insights | BuildWithInfovion
          Pune
        </title>
        <meta
          name="description"
          // ✅ OPTIMIZED META DESCRIPTION (Keywords + Location)
          content="Expert insights on AI, web development, data solutions, and business growth strategies from the BuildWithInfovion team in Pune, India. Stay innovative."
        />
        {/* ✅ CRITICAL FIX: Canonical URL */}
        <link rel="canonical" href="https://buildwithinfovion.com/blog" />
      </Helmet>

      <Motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-7xl mx-auto px-6 py-12 sm:py-20"
      >
        {/* --- Hero Section --- */}
        <Motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            Tech <span className="text-blue-600">Insights</span> & Innovation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Stay ahead of the curve with expert insights on AI, web development,
            and business growth strategies from our team.
          </p>
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles (e.g., 'React', 'AI', 'ROI')"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-2 border-transparent focus:border-blue-500 rounded-full focus:outline-none focus:ring-0 transition-colors"
            />
          </div>
        </Motion.section>

        {/* --- Category Filter (Uses h2 implicitly in Stat content which is fine) --- */}
        <Motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
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
              {cat.icon} {cat.label}
            </Motion.button>
          ))}
        </Motion.div>

        {/* --- Featured Posts (Uses h2 correctly) --- */}
        {activeCategory === "all" && searchTerm === "" && (
          <Motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </Motion.section>
        )}

        {/* --- Blog Posts Grid --- */}
        <Motion.section
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </AnimatePresence>
        </Motion.section>

        {/* --- Contact CTA (Uses h2 correctly) --- */}
        <Motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative text-center mt-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 lg:p-12 text-white overflow-hidden"
        >
          <h2 className="text-3xl font-bold mb-4">
            Need Expert Implementation?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Our team can help you implement the strategies discussed in these
            articles for your specific business needs.
          </p>
          <Motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-base shadow-lg hover:bg-gray-100 transition-colors"
            >
              Get a Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
          </Motion.div>
        </Motion.section>
      </Motion.main>
    </>
  );
}
