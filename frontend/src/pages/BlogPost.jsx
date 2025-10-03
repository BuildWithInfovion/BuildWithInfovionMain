import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { blogPosts } from "../Data/blogData";
import { Calendar, Clock, User, ArrowRight, Tag } from "lucide-react";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold">Post not found!</h1>
        <Link to="/blog" className="text-blue-600 mt-4 inline-block">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 2);

  // -------------------------
  // ✅ NEW SEO LOGIC START
  // -------------------------
  const absoluteUrl = `https://buildwithinfovion.in/blog/${slug}`;

  // 🚀 Article Schema Markup for rich results
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl,
    },
    headline: post.title,
    image: [post.image],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "BuildWithInfovion",
      logo: {
        "@type": "ImageObject",
        url: "https://buildwithinfovion.in/logo.png", // Update this path if needed
      },
    },
    description: post.excerpt,
  };
  // -------------------------
  // ✅ NEW SEO LOGIC END
  // -------------------------

  return (
    <>
      <Helmet>
        {/* ✅ OPTIMIZED TITLE */}
        <title>{post.title} | BuildWithInfovion - Digital Solutions Blog</title>
        <meta name="description" content={post.excerpt} />

        {/* ✅ CRITICAL FIX: Canonical URL */}
        <link rel="canonical" href={absoluteUrl} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:url" content={absoluteUrl} />
        <meta property="og:type" content="article" />

        {/* 🚀 TECHNICAL SEO: Article Schema Markup for rich snippets */}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <Motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto px-6 py-12 sm:py-20"
      >
        <article>
          <header className="mb-12 text-center">
            <Motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
              className="text-blue-600 dark:text-blue-400 font-semibold uppercase"
            >
              {post.category}
            </Motion.p>
            <Motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white my-4"
            >
              {post.title}
            </Motion.h1>
            <Motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
              className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400"
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
          </header>

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.5, duration: 0.5 },
            }}
            className="mb-12 h-96 w-full rounded-2xl shadow-2xl overflow-hidden"
          >
            <img
              src={post.image}
              // ✅ IMPROVED IMAGE SEO: Alt includes title and context
              alt={`Featured image for the article: ${post.title} by BuildWithInfovion`}
              className="w-full h-full object-cover"
            />
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.7 } }}
            className="prose dark:prose-invert prose-lg max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="max-w-3xl mx-auto my-12 flex flex-wrap items-center gap-3">
            <Tag className="w-5 h-5 text-gray-400" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <aside className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  to={`/blog/${relatedPost.slug}`}
                  key={relatedPost.id}
                  className="group block"
                >
                  <div className="overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src={relatedPost.image}
                      // ✅ IMPROVED IMAGE SEO
                      alt={`Thumbnail for related article: ${relatedPost.title}`}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </Motion.main>
    </>
  );
}
