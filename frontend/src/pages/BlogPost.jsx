import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { blogPosts } from "../Data/blogData";
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Tag } from "lucide-react";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const categoryLabel = {
  attendance: "Attendance",
  fees:       "Fee Management",
  portals:    "Portals",
  admissions: "Admissions",
};

const categoryStyle = {
  attendance: "bg-blue-50 text-blue-700",
  fees:       "bg-green-50 text-green-700",
  portals:    "bg-purple-50 text-purple-700",
  admissions: "bg-orange-50 text-orange-700",
};

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="pt-24 text-center py-20 px-6">
        <h1 className="text-4xl font-bold text-brand-dark mb-4">Article not found</h1>
        <p className="text-brand-neutral mb-8">This article may have been moved or removed.</p>
        <Link to="/blog" className="btn-premium inline-flex items-center gap-2 text-white px-6 py-3 rounded-full font-bold text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 2);

  const absoluteUrl = `https://buildwithinfovion.com/blog/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl },
    headline: post.title,
    image: [post.image],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Infovion Technologies",
      url: "https://buildwithinfovion.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Infovion Technologies",
      url: "https://buildwithinfovion.com",
      logo: { "@type": "ImageObject", url: "https://buildwithinfovion.com/src/assets/logo.png" },
    },
    description: post.excerpt,
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | Infovion School Management Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={absoluteUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:url" content={absoluteUrl} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <Motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-24"
      >
        {/* Article header */}
        <header className="py-16 px-6 bg-brand-dark relative overflow-hidden">
          <div className="absolute inset-0 dot-grid-dark opacity-20 pointer-events-none" />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <Motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
              className="flex items-center justify-center gap-3 mb-5"
            >
              <Link
                to="/blog"
                className="flex items-center gap-1.5 text-xs text-brand-neutral/60 hover:text-brand-accent transition-colors font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Blog
              </Link>
              <span className="text-brand-neutral/30">/</span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryStyle[post.category] || "bg-brand-cream text-brand-brown"}`}>
                {categoryLabel[post.category] || post.category}
              </span>
            </Motion.div>
            <Motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
              className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight"
            >
              {post.title}
            </Motion.h1>
            <Motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 text-sm text-brand-neutral/70"
            >
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" /> {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {post.readTime}
              </span>
            </Motion.div>
          </div>
        </header>

        {/* Featured image */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.5 } }}
          className="max-w-4xl mx-auto px-6 -mt-8 relative z-10 mb-12"
        >
          <div className="h-80 sm:h-96 w-full rounded-3xl shadow-xl overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </Motion.div>

        {/* Article content */}
        <article className="max-w-3xl mx-auto px-6 pb-16">
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5 } }}
            className="article-content text-brand-brown leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-brand-cream flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-brand-neutral/50" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-brand-cream text-brand-brown text-xs font-semibold rounded-full border border-brand-cream"
              >
                {tag}
              </span>
            ))}
          </div>
        </article>

        {/* Related articles */}
        {relatedPosts.length > 0 && (
          <aside className="py-16 px-6 bg-brand-cream/30 border-t border-brand-cream">
            <div className="max-w-4xl mx-auto">
              <p className="text-xs font-bold text-brand-terra uppercase tracking-widest mb-8 text-center">Related Articles</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    to={`/blog/${relatedPost.slug}`}
                    key={relatedPost.id}
                    className="group bg-white border border-brand-cream rounded-2xl overflow-hidden hover:border-brand-accent/40 hover:shadow-md transition-all duration-300"
                  >
                    <div className="overflow-hidden h-40">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-sm font-bold text-brand-dark group-hover:text-brand-terra transition-colors leading-snug mb-1">
                        {relatedPost.title}
                      </h3>
                      <p className="text-xs text-brand-neutral leading-relaxed line-clamp-2">{relatedPost.excerpt}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand-terra group-hover:gap-2 transition-all">
                        Read <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* CTA */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-brand-terra font-semibold text-xs uppercase tracking-widest mb-3">See It in Your School</p>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">
              Ready to modernise your school's operations?
            </h2>
            <p className="text-brand-neutral mb-8">
              Everything in this article is already built into Infovion. Free demo — no commitment.
            </p>
            <Link
              to="/contact"
              className="btn-premium inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-full font-bold"
            >
              Schedule a Free Demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </Motion.main>
    </>
  );
}
