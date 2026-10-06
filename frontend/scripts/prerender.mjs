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
  .replace(/<link\s+rel="canonical"[^>]*\/>/i, "")
  .replace(/<meta\s+property="og:(title|description|url)"[^>]*\/>/gi, "")
  .replace(/<meta\s+name="twitter:(title|description)"[^>]*\/>/gi, "");

const slugs = (blogPosts || []).map((p) => `/blog/${p.slug}`);
const routes = [...new Set([...PRERENDER_ROUTES, ...slugs])];
let ok = 0;
for (const url of routes) {
  try {
    const { html, helmet } = await render(url);
    const head = helmet
      ? [helmet.title, helmet.meta, helmet.link, helmet.script].map((x) => x?.toString() ?? "").join("\n    ")
      : "";
    let page = stripHead(template).replace("</head>", `    ${head}\n  </head>`);
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

// Sitemap from the same route list, so every new page is submitted automatically
const today = new Date().toISOString().slice(0, 10);
const prio = (u) => (u === "/" ? "1.0" : u === "/free-trial" || u === "/pricing" ? "0.9" : u.startsWith("/free-tools") || !u.startsWith("/blog") ? "0.8" : "0.6");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .filter((u) => !["/privacy-policy", "/terms-of-service"].includes(u))
  .map((u) => `  <url><loc>https://buildwithinfovion.com${u === "/" ? "/" : u}</loc><lastmod>${today}</lastmod><priority>${prio(u)}</priority></url>`)
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
console.log(`sitemap: ${sitemap.match(/<url>/g).length} urls`);

// llms.txt / llms-full.txt for AI assistants, from the same blog data
const { llmsTxt, llmsFullTxt } = await import("./llms.mjs");
const posts = [...(blogPosts || [])].sort((a, b) => new Date(b.date) - new Date(a.date));
fs.writeFileSync(path.join(dist, "llms.txt"), llmsTxt(posts));
fs.writeFileSync(path.join(dist, "llms-full.txt"), llmsFullTxt(posts));
console.log(`llms.txt: ${posts.length} guides`);
