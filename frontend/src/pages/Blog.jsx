import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { blogPosts } from "../Data/blogData";
import { CATEGORY_LABEL } from "../Data/blogCategories";
import { CtaBand } from "../components/site/Ui";

const fmt = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

function Meta({ post }) {
  return (
    <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400">
      <span className="text-sky-300">{CATEGORY_LABEL[post.category] ?? post.category}</span>
      <span>{fmt(post.date)}</span>
      <span>{post.readTime}</span>
    </p>
  );
}

// The cover artwork already carries the article's title, so it is shown whole and undimmed, once,
// on the lead article only. Everything else is a plain list that is quick to scan.
function Lead({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
      <div className="overflow-hidden rounded-xl border border-white/10">
        <img src={post.image} alt="" width="1600" height="840" fetchpriority="high" decoding="async" className="block aspect-[1600/840] w-full object-cover transition duration-700 group-hover:scale-[1.02]" />
      </div>
      <div>
        <Meta post={post} />
        <h2 className="font-display mt-4 text-3xl leading-[1.1] text-white sm:text-4xl">{post.title}</h2>
        <p className="mt-4 text-base leading-relaxed text-slate-300">{post.excerpt}</p>
        <span className="mt-6 inline-block text-sm font-medium text-white underline decoration-white/30 underline-offset-4 group-hover:decoration-white">Read the guide</span>
      </div>
    </Link>
  );
}

function Row({ post }) {
  return (
    <li className="border-b border-white/10">
      <Link to={`/blog/${post.slug}`} className="group block py-7">
        <Meta post={post} />
        <h2 className="font-display mt-3 text-xl leading-snug text-white transition-colors group-hover:text-sky-200 sm:text-[1.35rem]">{post.title}</h2>
        <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-slate-400">{post.excerpt}</p>
      </Link>
    </li>
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
  const showLead = cat === "all" && !q;
  const lead = sorted.find((p) => p.featured) ?? sorted[0];
  const rest = showLead ? filtered.filter((p) => p.slug !== lead.slug) : filtered;

  return (
    <div>
      <Helmet>
        <title>Guides on Software, School ERP and Jewellery Billing | Infovion</title>
        <meta name="description" content="Practical guides from Infovion Technologies on software costs, choosing a development partner, school management, jewellery billing and government websites." />
        <link rel="canonical" href="https://www.infovion.in/blog" />
      </Helmet>

      <section className="relative pb-10 pt-32 sm:pt-40">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-3xl">
              <p className="kicker-pill">Guides</p>
              <h1 className="font-display mt-4 text-[2.4rem] leading-[1.04] text-white sm:text-6xl">
                Practical guides for <span className="text-gradient-aurora">building and running better.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">Software projects and what they cost, school management, jewellery billing and girvi, and government IT, written plainly, with sources.</p>
            </div>
            {/* data-hero-aside: the brand animation stays clear of this page head */}
            <label data-hero-aside="" className="relative block w-full sm:w-72">
              <span className="sr-only">Search articles</span>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles"
                className="w-full rounded-lg border border-white/12 bg-white/[0.04] py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-sky-300/60" />
            </label>
          </div>

          <div role="tablist" aria-label="Topics" className="no-scrollbar -mx-5 mt-10 flex gap-1 overflow-x-auto border-b border-white/10 px-5 sm:mx-0 sm:px-0">
            {usedCats.map((c) => (
              <button key={c} type="button" role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
                className={`relative flex-shrink-0 px-3.5 py-3 text-sm font-medium transition-colors ${cat === c ? "text-white" : "text-slate-400 hover:text-slate-200"}`}>
                {c === "all" ? "All" : CATEGORY_LABEL[c]}
                {cat === c && <span aria-hidden="true" className="absolute inset-x-3.5 -bottom-px h-px bg-sky-300" />}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative pb-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          {showLead && lead && <Lead post={lead} />}
          <ul className={`grid gap-x-14 border-t border-white/10 lg:grid-cols-2 ${showLead ? "mt-14" : ""}`}>
            {rest.map((p) => <Row key={p.slug} post={p} />)}
          </ul>
          {!filtered.length && <p className="py-16 text-slate-400">No articles match “{q}”.</p>}
        </div>
      </section>

      <CtaBand title="Have a project or a question?" sub="Talk to the team that writes these guides. We reply within one business day, with a fixed price where the scope allows." />
    </div>
  );
}
