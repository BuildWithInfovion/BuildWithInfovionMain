import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { ArrowRight, Clock, Search } from "lucide-react";
import { blogPosts } from "../Data/blogData";
import { CATEGORY_LABEL } from "../Data/blogCategories";
import { Aurora, GlowButton, Kicker } from "../components/fx/Fx";



const fmt = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

function Card({ post, big = false }) {
  return (
    <Motion.article layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
      className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] transition-colors hover:border-teal-400/40 ${big ? "md:grid md:grid-cols-2" : ""}`}>
      <Link to={`/blog/${post.slug}`} className="absolute inset-0 z-10" aria-label={post.title} />
      <div className={`relative overflow-hidden ${big ? "h-56 md:h-full" : "h-48"}`}>
        <img src={post.image} alt="" loading="lazy" className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/20 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full glass px-3 py-1 text-[11px] font-semibold text-teal-200">{CATEGORY_LABEL[post.category] ?? post.category}</span>
      </div>
      <div className={`p-6 ${big ? "md:flex md:flex-col md:justify-center md:p-9" : ""}`}>
        <p className="flex items-center gap-3 text-xs text-slate-500"><span>{fmt(post.date)}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span></p>
        <h2 className={`mt-3 font-display font-bold leading-snug text-white transition-colors group-hover:text-teal-200 ${big ? "text-2xl sm:text-3xl" : "line-clamp-2 text-lg"}`}>{post.title}</h2>
        <p className={`mt-3 text-sm leading-relaxed text-slate-400 ${big ? "" : "line-clamp-3"}`}>{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300">Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
      </div>
    </Motion.article>
  );
}

export default function Blog() {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const sorted = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const usedCats = ["all", ...Object.keys(CATEGORY_LABEL).filter((c) => blogPosts.some((p) => p.category === c))];
  const filtered = sorted.filter((p) =>
    (cat === "all" || p.category === cat) &&
    (p.title.toLowerCase().includes(q.toLowerCase()) || p.excerpt.toLowerCase().includes(q.toLowerCase())));
  const showFeatured = cat === "all" && !q;
  const featured = sorted.find((p) => p.featured) ?? sorted[0];
  const rest = showFeatured ? filtered.filter((p) => p.slug !== featured.slug) : filtered;

  return (
    <div className="bg-ink">
      <Helmet>
        <title>Blog — Guides for Indian School Directors & Principals | Infovion</title>
        <meta name="description" content="Practical guides for Indian schools: attendance, fee management, admissions, certificates, parent portals and choosing school ERP software." />
        <link rel="canonical" href="https://infovion.in/blog" />
      </Helmet>

      <section className="noise relative overflow-hidden pb-14 pt-32 sm:pt-40">
        <Aurora strong />
        <div className="relative mx-auto max-w-6xl px-5 text-center sm:px-6">
          <Kicker>School management insights</Kicker>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.03] tracking-tight text-white sm:text-6xl">
            Tips for running <span className="text-gradient-aurora">a better school.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">Practical guides for school directors, principals and offices — attendance, fees, admissions and going digital.</p>
          <div className="relative mx-auto mt-8 max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles…" aria-label="Search articles"
              className="w-full rounded-full border border-white/10 bg-white/[0.05] py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none focus:border-teal-400/60" />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {usedCats.map((c) => (
              <button key={c} type="button" onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${cat === c ? "bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 text-[#04121a]" : "glass text-slate-300 hover:text-white"}`}>
                {c === "all" ? "All articles" : CATEGORY_LABEL[c]}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto max-w-6xl space-y-6 px-5 sm:px-6">
          {showFeatured && featured && <Card post={featured} big />}
          <Motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {rest.map((p) => <Card key={p.slug} post={p} />)}
            </AnimatePresence>
          </Motion.div>
          {!filtered.length && <p className="py-12 text-center text-slate-500">No articles match “{q}”.</p>}
        </div>
      </section>

      <section className="px-5 pb-28 sm:px-6">
        <div className="glass mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 rounded-[2rem] p-8 text-center md:flex-row md:text-left">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-white">Everything in these articles is already in Infovion.</h2>
            <p className="mt-2 text-slate-400">Try it with your own school — free for 30 days, no card.</p>
          </div>
          <GlowButton to="/free-trial">Start your free trial <ArrowRight className="h-4 w-4" /></GlowButton>
        </div>
      </section>
    </div>
  );
}
