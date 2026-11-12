import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "../Data/blogData";
import { CATEGORY_LABEL, CTA, audienceOf } from "../Data/blogCategories";
import { GlowButton } from "../components/fx/Fx";
import PreferredSourceBadge from "../components/PreferredSourceBadge";
import { faqSchema } from "../lib/seo";
import { Breadcrumbs } from "../components/site/Ui";

const DOMAIN = "https://www.infovion.in";
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
  const cta = CTA[audienceOf(post.category)];
  const sameCat = blogPosts.filter((p) => p.category === post.category && p.slug !== post.slug);
  const related = [...sameCat, ...blogPosts.filter((p) => p.category !== post.category && p.slug !== post.slug)].slice(0, 3);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    image: [abs(post.image)],
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: post.authorName ? { "@type": "Person", name: post.authorName, worksFor: { "@id": `${DOMAIN}/#organization` } } : { "@id": `${DOMAIN}/#organization` },
    publisher: { "@id": `${DOMAIN}/#organization` },
    articleSection: CATEGORY_LABEL[post.category] ?? post.category,
    keywords: (post.tags || []).join(", "),
    description: post.excerpt,
    inLanguage: post.lang || "en-IN",
  };

  return (
    <div className="bg-ink">
      <Helmet>
        {post.lang && <html lang={post.lang} />}
        <title>{post.seoTitle || `${post.title} | Infovion`}</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={abs(post.image)} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <header data-hero-aside="" className="relative pb-12 pt-32 sm:pt-40">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <Breadcrumbs trail={[["Blog", "/blog"], [CATEGORY_LABEL[post.category] ?? "Guide", `/blog/${post.slug}`]]} />
          <h1 className="font-display mt-8 text-[2.1rem] leading-[1.08] text-white sm:text-5xl">{post.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-300">{post.excerpt}</p>
          <p className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-5 text-sm text-slate-400">
            <span className="text-sky-300">{CATEGORY_LABEL[post.category] ?? post.category}</span>
            <span>{fmt(post.date)}</span>
            {post.updated && post.updated !== post.date && <span>Updated {fmt(post.updated)}</span>}
            <span>{post.readTime}</span>
            <span>By {post.author}</span>
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <article className="article-dark" dangerouslySetInnerHTML={{ __html: post.content }} />
        {/* Questions readers ask, also given to search engines as FAQ structured data */}
        {post.faqs?.length > 0 && (
          <section className="mt-12" aria-labelledby="post-faq">
            <Helmet><script type="application/ld+json">{JSON.stringify(faqSchema(post.faqs))}</script></Helmet>
            <h2 id="post-faq" className="font-display text-2xl text-white">Questions readers ask</h2>
            <div className="mt-5 border-t border-white/10">
              {post.faqs.map(([q, a]) => (
                <details key={q} className="group border-b border-white/10 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 font-semibold text-white">
                    <h3 className="text-base">{q}</h3>
                    <span className="mt-0.5 text-lg leading-none text-sky-300 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="pb-5 text-[15px] leading-relaxed text-slate-300">{a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {post.tags?.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((t) => <span key={t} className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-slate-400">{t}</span>)}
          </div>
        )}

        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed text-slate-300">Found this useful? See more guides like this in your Google results.</p>
          <PreferredSourceBadge from="blog_post" className="flex-shrink-0" />
        </div>

        <div className="mt-14 rounded-2xl border border-white/10 bg-[#080a0f] p-8 sm:p-10">
          <h2 className="font-display text-2xl text-white sm:text-3xl">{cta.title}</h2>
          <p className="mt-3 max-w-xl text-slate-300">{cta.body}</p>
          <div className="mt-7"><GlowButton to={cta.to}>{cta.label}</GlowButton></div>
        </div>
      </div>

      <section className="mx-auto max-w-3xl px-5 pb-24 pt-20 sm:px-6">
        <h2 className="text-sm font-medium text-slate-400">Keep reading</h2>
        <ul className="mt-4 border-t border-white/10">
          {related.map((p) => (
            <li key={p.slug} className="border-b border-white/10">
              <Link to={`/blog/${p.slug}`} className="group block py-5">
                <span className="text-sm text-sky-300">{CATEGORY_LABEL[p.category] ?? p.category}</span>
                <span className="font-display mt-1.5 block text-lg leading-snug text-white transition-colors group-hover:text-sky-200">{p.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
