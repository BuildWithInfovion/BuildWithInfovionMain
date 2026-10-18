// Tell IndexNow search engines (Bing, Yandex, Naver, Seznam; Bing's index feeds ChatGPT search and
// Copilot) about every page in the live sitemap. Run after a deploy that adds or changes pages:
//   node scripts/indexnow.mjs            (all sitemap URLs)
//   node scripts/indexnow.mjs /path ...  (just these pages)
import fs from "node:fs";
import path from "node:path";

const HOST = "www.infovion.in";
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const keyFile = fs.readdirSync(path.join(root, "public")).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error("IndexNow key file (public/<32 hex>.txt) not found");
const key = keyFile.slice(0, -4);

let urls = process.argv.slice(2).map((p) => `https://${HOST}${p.startsWith("/") ? p : `/${p}`}`);
if (!urls.length) {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${key}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${urls.length} URLs → HTTP ${res.status} ${res.status === 200 || res.status === 202 ? "(accepted)" : await res.text()}`);
