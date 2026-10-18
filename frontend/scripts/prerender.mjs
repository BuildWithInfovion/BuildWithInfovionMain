// Writes real HTML for every public route into dist/ so search engines and link
// previews see full content (the app still renders normally in the browser).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const dist = path.join(root, "dist");
const { render } = await import(pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href);
const { blogPosts } = await import(pathToFileURL(path.join(root, "src", "Data", "blogData.js")).href).catch(() => ({ blogPosts: [] }));
const { PRERENDER_ROUTES } = await import(pathToFileURL(path.join(root, "src", "routes.js")).href);
const { VIDEOS, videoFile, videoPoster } = await import(pathToFileURL(path.join(root, "src", "Data", "videos.js")).href);
const { SERVICES } = await import(pathToFileURL(path.join(root, "src", "Data", "services.js")).href);
const { CASE_STUDIES } = await import(pathToFileURL(path.join(root, "src", "Data", "caseStudies.js")).href);

// The page is already in the HTML, so the app bundle (needed only to hydrate it)
// must not hold up the first paint: it is requested only once the browser has
// painted. Downloading it earlier takes bandwidth from the first paint on a slow
// phone, and a module script in <head> may even run before the first frame.
let bundleSrc = "";
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8")
  .replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/, (_, src) => {
    bundleSrc = src;
    return "";
  });
if (!bundleSrc) throw new Error("prerender: app bundle <script> not found in dist/index.html");
const loader = `<script>requestAnimationFrame(function(){setTimeout(function(){var s=document.createElement("script");s.type="module";s.crossOrigin="";s.src=${JSON.stringify(bundleSrc)};document.body.appendChild(s)},0)})</script>`;

// Head tags the pages manage themselves: drop the template's copies to avoid duplicates
const stripHead = (h) => h
  .replace(/<title>[\s\S]*?<\/title>/i, "")
  .replace(/<meta\s+name="description"[\s\S]*?\/>/i, "")
  .replace(/<meta\s+name="keywords"[\s\S]*?\/>/i, "")
  .replace(/<meta\s+name="robots"[^>]*\/>/i, "")
  .replace(/<link\s+rel="canonical"[^>]*\/>/i, "")
  .replace(/<meta\s+property="og:(title|description|url)"[^>]*\/>/gi, "")
  .replace(/<meta\s+name="twitter:(title|description)"[^>]*\/>/gi, "");

const slugs = (blogPosts || []).map((p) => `/blog/${p.slug}`);
const videoRoutes = VIDEOS.map((v) => `/videos/${v.slug}`);
const serviceRoutes = SERVICES.map((s) => `/services/${s.slug}`);
const caseRoutes = CASE_STUDIES.map((c) => `/case-studies/${c.slug}`);
const routes = [...new Set([...PRERENDER_ROUTES, ...serviceRoutes, ...caseRoutes, ...slugs, ...videoRoutes])];
let ok = 0;
for (const url of routes) {
  try {
    const { html, helmet } = await render(url);
    const head = helmet
      ? [helmet.title, helmet.meta, helmet.link, helmet.script].map((x) => x?.toString() ?? "").join("\n    ")
      : "";
    let base = stripHead(template);
    if (/property="og:image"/.test(head)) base = base.replace(/<meta\s+property="og:image(:width|:height)?"[^>]*\/>/gi, "");
    if (/property="og:type"/.test(head)) base = base.replace(/<meta\s+property="og:type"[^>]*\/>/i, "");
    let page = base.replace("</head>", `    ${head}\n  </head>`);
    // In the built index.html the scripts live in <head>, so #root runs to </body>
    page = page.replace(/<div id="root">[\s\S]*<\/body>/, () => `<div id="root" data-ssr="${url}">${html}</div>\n    ${loader}\n  </body>`);
    // Cloudflare's email obfuscation would rewrite the addresses (breaking hydration)
    // and inject a render-blocking decoder script; these markers switch it off.
    page = page.replace("<head>", "<head>\n    <!--email_off-->").replace("</body>", "<!--/email_off-->\n  </body>");
    const out = url === "/" ? path.join(dist, "index.html") : path.join(dist, url.replace(/^\//, ""), "index.html");
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, page);
    ok++;
  } catch (e) {
    console.error(`prerender failed for ${url}: ${e.message}`);
    process.exitCode = 1;
  }
}
console.log(`prerendered ${ok}/${routes.length} pages`);

// A real 404 page. Vercel serves dist/404.html with status 404 for any path that
// is not a file — before, every unknown URL returned the homepage with status 200
// (a "soft 404" that Google files as a duplicate of the homepage).
{
  const { html } = await render("/__page-not-found__");
  let page = stripHead(template)
    .replace(/<meta\s+name="robots"[^>]*\/>/i, "")
    .replace("</head>", `    <title>Page not found | Infovion Technologies</title>
    <meta name="description" content="This page does not exist. Visit Infovion Technologies for software development services, Infovion School ERP and Infovion JMS." />
    <meta name="robots" content="noindex" />
  </head>`);
  page = page.replace(/<div id="root">[\s\S]*<\/body>/, () => `<div id="root">${html}</div>
    ${loader}
  </body>`);
  fs.writeFileSync(path.join(dist, "404.html"), page);
  console.log("404.html written");
}

// Sitemap from the same route list, so every new page is submitted automatically
const today = new Date().toISOString().slice(0, 10);
const LEGAL = ["/privacy-policy", "/terms-of-service"];
// Google video sitemap entry for each watch page
const xmlText = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const videoTag = (u) => {
  const v = VIDEOS.find((x) => `/videos/${x.slug}` === u);
  if (!v) return "";
  return `<video:video><video:thumbnail_loc>https://www.infovion.in${videoPoster(v)}</video:thumbnail_loc><video:title>${xmlText(v.title)}</video:title><video:description>${xmlText(v.description)}</video:description><video:content_loc>https://www.infovion.in${videoFile(v)}</video:content_loc><video:duration>${v.seconds}</video:duration><video:publication_date>${v.uploadDate}T00:00:00+05:30</video:publication_date><video:family_friendly>yes</video:family_friendly></video:video>`;
};
// Highest for the company home, the service hub/pages and the two product homes
const TOP = ["/services", "/school-management-software", "/jewellery-management-software", "/contact", "/government"];
const prio = (u) =>
  u === "/" ? "1.0"
  : TOP.includes(u) || u.startsWith("/services/") || u === "/free-trial" ? "0.9"
  : LEGAL.includes(u) ? "0.3"
  : u.startsWith("/blog/") || u.startsWith("/videos/") ? "0.6"
  : "0.8";
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${routes
  // Legal pages are listed too (low priority): they are trust pages Google should know
  .map((u) => `  <url><loc>https://www.infovion.in${u === "/" ? "/" : u}</loc><lastmod>${today}</lastmod><priority>${prio(u)}</priority>${videoTag(u)}</url>`)
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
console.log(`sitemap: ${sitemap.match(/<url>/g).length} urls`);

// llms.txt / llms-full.txt for AI assistants, from the same blog data
const { llmsTxt, llmsFullTxt, aiFiles } = await import("./llms.mjs");
const posts = [...(blogPosts || [])].sort((a, b) => new Date(b.date) - new Date(a.date));
fs.writeFileSync(path.join(dist, "llms.txt"), llmsTxt(posts));
fs.writeFileSync(path.join(dist, "llms-full.txt"), llmsFullTxt(posts));
console.log(`llms.txt: ${posts.length} guides`);
for (const [file, body] of Object.entries(aiFiles())) {
  fs.mkdirSync(path.dirname(path.join(dist, file)), { recursive: true });
  fs.writeFileSync(path.join(dist, file), body);
}

// RSS feed of the guides, for feed readers and AI discovery
const xml = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rfc822 = (d) => new Date(`${d}T09:00:00+05:30`).toUTCString();
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Infovion Technologies — insights and guides</title>
    <link>https://www.infovion.in/blog</link>
    <atom:link href="https://www.infovion.in/rss.xml" rel="self" type="application/rss+xml" />
    <description>Practical guides on software development, school management, jewellery billing and e-governance from Infovion Technologies, Pune.</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${posts.map((p) => `    <item>
      <title>${xml(p.title)}</title>
      <link>https://www.infovion.in/blog/${p.slug}</link>
      <guid isPermaLink="true">https://www.infovion.in/blog/${p.slug}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <description>${xml(p.excerpt)}</description>
${(p.tags || []).map((t) => `      <category>${xml(t)}</category>`).join("\n")}
    </item>`).join("\n")}
  </channel>
</rss>
`;
fs.writeFileSync(path.join(dist, "rss.xml"), rss);
console.log(`rss.xml: ${posts.length} items`);
