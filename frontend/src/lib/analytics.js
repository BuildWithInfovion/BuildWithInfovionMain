// Growth tracking: GA4 events + first-touch source (utm / referrer), sent with trial sign-ups.
const KEY = "infovion-first-touch";

/** Send an event to Google Analytics (no-op when GA isn't loaded). */
export function track(event, params = {}) {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") window.gtag("event", event, params);
  } catch { /* never break the page for analytics */ }
}

/** Remember where this visitor first came from (once per browser). */
export function captureFirstTouch() {
  if (typeof window === "undefined") return;
  try {
    if (localStorage.getItem(KEY)) return;
    const q = new URLSearchParams(window.location.search);
    const utm = ["utm_source", "utm_medium", "utm_campaign"].map((k) => q.get(k)).filter(Boolean).join(" / ");
    let ref = "";
    try { ref = document.referrer ? new URL(document.referrer).hostname : ""; } catch { ref = ""; }
    if (ref && ref.endsWith("buildwithinfovion.com")) ref = "";
    const src = utm || (q.get("gclid") ? "google ads" : "") || (q.get("ref") ? `ref: ${q.get("ref")}` : "") || ref || "direct";
    localStorage.setItem(KEY, JSON.stringify({ src, landing: window.location.pathname, at: new Date().toISOString().slice(0, 10) }));
  } catch { /* storage unavailable */ }
}

/** "google.com → /free-tools/transfer-certificate (2026-10-03)" */
export function firstTouch() {
  try {
    const t = JSON.parse(localStorage.getItem(KEY) || "null");
    return t ? `${t.src} → ${t.landing} (${t.at})` : "";
  } catch {
    return "";
  }
}
