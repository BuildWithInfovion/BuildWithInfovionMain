import React, { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Clock,
  User,
  ArrowRight,
  Search,
  Users,
  IndianRupee,
  UserCheck,
  ClipboardList,
  Filter,
} from "lucide-react";
import { blogPosts } from "../Data/blogData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 20 },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const categories = [
  { id: "all",        label: "All Articles",   icon: <Filter className="w-3.5 h-3.5" /> },
  { id: "attendance", label: "Attendance",      icon: <Users className="w-3.5 h-3.5" /> },
  { id: "fees",       label: "Fee Management",  icon: <IndianRupee className="w-3.5 h-3.5" /> },
  { id: "portals",    label: "Portals",         icon: <UserCheck className="w-3.5 h-3.5" /> },
  { id: "admissions", label: "Admissions",      icon: <ClipboardList className="w-3.5 h-3.5" /> },
];

const categoryStyle = {
  attendance: "bg-blue-50 text-blue-700 border-blue-100",
  fees:       "bg-green-50 text-green-700 border-green-100",
  portals:    "bg-purple-50 text-purple-700 border-purple-100",
  admissions: "bg-orange-50 text-orange-700 border-orange-100",
};

const categoryLabel = {
  attendance: "Attendance",
  fees:       "Fee Management",
  portals:    "Portals",
  admissions: "Admissions",
};

const BlogPostCard = ({ post, index }) => (
  <Motion.div
    layout
    variants={itemVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    custom={index}
    className="group bg-white border border-brand-cream rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-brand-accent/40 transition-all duration-300"
    whileHover={{ y: -6 }}
  >
    <div className="h-48 overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="p-6">
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryStyle[post.category] || "bg-brand-cream text-brand-brown border-brand-cream"}`}>
          {categoryLabel[post.category] || post.category}
        </span>
        <span className="flex items-center gap-1 text-xs text-brand-neutral">
          <Clock className="w-3.5 h-3.5" /> {post.readTime}
        </span>
      </div>
      <h3 className="text-base font-bold text-brand-dark mb-2 leading-snug group-hover:text-brand-terra transition-colors duration-200 line-clamp-2">
        {post.title}
      </h3>
      <p className="text-sm text-brand-neutral mb-5 leading-relaxed line-clamp-2">
        {post.excerpt}
      </p>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs text-brand-neutral/60">
          <User className="w-3.5 h-3.5" /> {post.author}
        </span>
        <Link
          to={`/blog/${post.slug}`}
          className="flex items-center gap-1 text-sm font-bold text-brand-terra group-hover:gap-2 transition-all duration-200"
        >
          Read <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  </Motion.div>
);

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  return (
    <>
      <Helmet>
        <title>School Management Blog — Tips for Indian School Administrators | Infovion</title>
        <meta
          name="description"
          content="School management insights for Indian K-12 school administrators — digital attendance, fee management, parent portals, admissions, and more. By Infovion Technologies."
        />
        <meta name="keywords" content="school management blog India, school ERP tips, school administration tips India, digital attendance schools, fee management schools India, parent portal school, school software guide India" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://buildwithinfovion.com/blog" />
        <meta property="og:title" content="School Management Blog — Infovion" />
        <meta property="og:description" content="Insights for Indian school administrators on attendance, fees, admissions, and digital school management." />
        <meta property="og:url" content="https://buildwithinfovion.com/blog" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="pt-24"
      >
        {/* Hero */}
        <section className="py-20 px-6 bg-brand-dark relative overflow-hidden">
          <div className="absolute inset-0 dot-grid-dark opacity-20 pointer-events-none" />
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-15"
            style={{ background: "radial-gradient(circle, #BE6D56 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
          />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <Motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-brand-accent font-semibold text-xs uppercase tracking-widest mb-4"
            >
              School Management Insights
            </Motion.p>
            <Motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-5xl font-extrabold text-white mb-5 leading-tight"
            >
              Tips for Running
              <br />
              <span className="text-brand-accent">A Better School.</span>
            </Motion.h1>
            <Motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-brand-neutral leading-relaxed mb-8"
            >
              Practical guides for Indian school directors and administrators — on attendance,
              fees, admissions, and going digital.
            </Motion.p>
            <Motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-md mx-auto relative"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-neutral/50 w-4 h-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 text-white placeholder-brand-neutral/50 rounded-full focus:outline-none focus:border-brand-accent/60 transition-colors text-sm"
              />
            </Motion.div>
          </div>
        </section>

        {/* Category filter — sticky bar */}
        <div className="py-5 px-6 bg-white border-b border-brand-cream sticky top-[72px] z-30">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2">
            {categories.map((cat, i) => (
              <Motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-brand-terra text-white shadow-md shadow-brand-terra/25"
                    : "bg-brand-cream/60 text-brand-brown hover:bg-brand-cream border border-brand-cream"
                }`}
              >
                {cat.icon} {cat.label}
              </Motion.button>
            ))}
          </div>
        </div>

        {/* Posts */}
        <section className="py-16 px-6 bg-brand-cream/20">
          <div className="max-w-7xl mx-auto">

            {/* Featured strip */}
            {activeCategory === "all" && searchTerm === "" && featuredPosts.length > 0 && (
              <Motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-14"
              >
                <p className="text-xs font-bold text-brand-terra uppercase tracking-widest mb-6">Featured</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {featuredPosts.slice(0, 2).map((post, i) => (
                    <BlogPostCard key={post.id} post={post} index={i} />
                  ))}
                </div>
              </Motion.div>
            )}

            {/* All posts grid */}
            {filteredPosts.length > 0 ? (
              <>
                {activeCategory === "all" && searchTerm === "" && (
                  <p className="text-xs font-bold text-brand-terra uppercase tracking-widest mb-6">All Articles</p>
                )}
                <Motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredPosts.map((post, i) => (
                      <BlogPostCard key={post.id} post={post} index={i} />
                    ))}
                  </AnimatePresence>
                </Motion.div>
              </>
            ) : (
              <div className="text-center py-24">
                <p className="text-brand-neutral text-lg mb-3">No articles found.</p>
                <button
                  onClick={() => { setActiveCategory("all"); setSearchTerm(""); }}
                  className="text-brand-terra font-semibold text-sm hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section
          className="py-20 px-6 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #BE6D56 0%, #5A4A48 100%)" }}
        >
          <div className="absolute inset-0 dot-grid-dark opacity-20 pointer-events-none" />
          <Motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center relative z-10"
          >
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Want to see this in your school?
            </h2>
            <p className="text-brand-cream/80 mb-8 text-lg leading-relaxed">
              Everything in these articles is already built into Infovion.
              Schedule a free demo and see it working with your school's structure.
            </p>
            <Motion.div whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-brand-terra px-8 py-4 rounded-full font-bold text-sm shadow-lg hover:bg-brand-cream transition-colors"
              >
                Schedule a Free Demo <ArrowRight className="w-4 h-4" />
              </Link>
            </Motion.div>
          </Motion.div>
        </section>
      </Motion.main>
    </>
  );
}
