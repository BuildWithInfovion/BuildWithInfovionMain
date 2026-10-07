import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Clock, Sparkles } from "lucide-react";
import { blogPosts } from "../Data/blogData";
import { CATEGORY_LABEL } from "../Data/blogCategories";
import { Aurora, GlowButton, Kicker } from "../components/fx/Fx";
import PreferredSourceBadge from "../components/PreferredSourceBadge";

const DOMAIN = "https://infovion.in";
const abs = (u) => (u.startsWith("http") ? u : `${DOMAIN}${u}`);
const fmt = (d) => new Date(d).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="bg-ink px-6 pb-24 pt-40 text-center">
        <h1 className="font-display text-4xl font-extrabold text-white">Article not found</h1>
        <p className="mt-3 text-slate-400">This article may have been moved or removed.</p>
        <Link to="/blog" className="mt-8 inline-flex items-center gap-2 text-teal-300"><ArrowLeft className="h-4 w-4" /> Back to the blog</Link>
      </div>
    );
  }

  const url = `${DOMAIN}/blog/${slug}`;
  const sameCat = blogPosts.filter((p) => p.category === post.category && p.slug !== post.slug);
  const related = [...sameCat, ...blogPosts.filter((p) => p.category !== post.category && p.slug !== post.slug)].slice(0, 3);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    image: [abs(post.image)],
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "Infovion", url: DOMAIN },
    publisher: { "@type": "Organization", name: "Infovion", url: DOMAIN, logo: { "@type": "ImageObject", url: `${DOMAIN}/logo.png` } },
    description: post.excerpt,
  };

  return (
    <div className="bg-ink">
      <Helmet>
        <title>{`${post.title} | Infovion Blog`}</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={abs(post.image)} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <header className="noise relative overflow-hidden pb-14 pt-32 sm:pt-40">
        <img src={post.image} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-15 blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070d]/60 via-[#05070d]/85 to-[#05070d]" />
        <Aurora />
        <div className="relative mx-auto max-w-3xl px-5 sm:px-6">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white"><ArrowLeft className="h-4 w-4" /> Blog</Link>
          <div className="mt-5"><Kicker>{CATEGORY_LABEL[post.category] ?? post.category}</Kicker></div>
          <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-400">{post.excerpt}</p>
          <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {fmt(post.date)}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.readTime}</span>
            <span>By {post.author}</span>
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <div className="overflow-hidden rounded-3xl ring-1 ring-white/10">
          <img src={post.image} alt={post.title} className="aspect-[16/8] w-full object-cover" />
        </div>
        <article className="article-dark mt-12" dangerouslySetInnerHTML={{ __html: post.content }} />

        {post.tags?.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((t) => <span key={t} className="rounded-full glass px-3 py-1 text-xs text-slate-300">#{t}</span>)}
          </div>
        )}

        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed text-slate-300">Found this useful? See more guides like this in your Google results.</p>
          <PreferredSourceBadge from="blog_post" className="flex-shrink-0" />
        </div>

        <div className="noise relative mt-14 overflow-hidden rounded-[2rem] border border-white/10 p-8 text-center">
          <Aurora strong />
          <div className="relative">
            <Sparkles className="mx-auto h-6 w-6 text-teal-300" />
            <h2 className="mt-4 font-display text-2xl font-extrabold text-white sm:text-3xl">See it working in your own school</h2>
            <p className="mx-auto mt-2 max-w-md text-slate-400">Infovion's free trial opens with sample data in two minutes. No card, no contract.</p>
            <div className="mt-6 flex justify-center"><GlowButton to="/free-trial">Start your free trial <ArrowRight className="h-4 w-4" /></GlowButton></div>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-5 pb-28 pt-20 sm:px-6">
        <h2 className="font-display text-2xl font-extrabold text-white">Keep reading</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {related.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="group overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] transition-colors hover:border-teal-400/40">
              <div className="relative h-40 overflow-hidden">
                <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] to-transparent" />
              </div>
              <div className="p-5">
                <p className="text-xs text-teal-300">{CATEGORY_LABEL[p.category] ?? p.category}</p>
                <h3 className="mt-2 line-clamp-2 font-display font-bold text-white group-hover:text-teal-200">{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
