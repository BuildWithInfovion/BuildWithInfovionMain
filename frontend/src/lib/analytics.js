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
    if (ref && ref.endsWith("infovion.in")) ref = "";
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

// ── Visitor statistics for the JMS console (Outreach → Website visitors) ──────────────────────
// Anonymous: a random id per browser, the page, where the visit came from and the device. No
// names, numbers or form contents are sent; the API adds the city from the connection and keeps
// no IP address. Skipped when the browser asks not to be tracked (Global Privacy Control).
const SITE_API = "https://jms-api.infovion.in/api/site/hit";
const VID = "infovion-vid";
const VISIT = "infovion-visit";
const rid = () => (crypto.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`).replace(/[^a-z0-9-]/gi, "");

const enabled = () =>
  typeof window !== "undefined" && /(^|\.)infovion\.in$/.test(window.location.hostname) && !navigator.globalPrivacyControl;

function device() {
  const ua = navigator.userAgent;
  if (/iPad|Tablet/i.test(ua) || (/Android/i.test(ua) && !/Mobi/i.test(ua))) return "tablet";
  return /Mobi|Android|iPhone/i.test(ua) ? "mobile" : "desktop";
}

/** This browser's id, and the current visit: a new visit after 30 minutes away, carrying how it began. */
function visit() {
  let v = localStorage.getItem(VID);
  if (!v) localStorage.setItem(VID, (v = rid()));
  let s = null;
  try {
    s = JSON.parse(localStorage.getItem(VISIT) || "null");
  } catch { s = null; }
  if (!s || Date.now() - s.last > 30 * 60000) {
    const q = new URLSearchParams(window.location.search);
    s = { id: rid(), r: document.referrer || "", us: q.get("utm_source") || "", um: q.get("utm_medium") || "", uc: q.get("utm_campaign") || "", g: q.has("gclid") };
  }
  s.last = Date.now();
  localStorage.setItem(VISIT, JSON.stringify(s));
  return { v, s };
}

/** Record a page view or an action (whatsapp, call, email, enquiry, trial, demo). */
export function beacon(kind = "view", detail = "") {
  if (!enabled()) return;
  try {
    const { v, s } = visit();
    const body = JSON.stringify({ k: kind, v, s: s.id, p: window.location.pathname, r: s.r, us: s.us, um: s.um, uc: s.uc, g: s.g, d: device(), l: navigator.language, x: detail || undefined });
    if (!navigator.sendBeacon?.(SITE_API, body)) fetch(SITE_API, { method: "POST", body, keepalive: true, mode: "no-cors" }).catch(() => {});
  } catch { /* never break the page for statistics */ }
}

/** Once: taps on WhatsApp, phone, email, trial and demo links anywhere on the site. */
export function watchActions() {
  if (!enabled() || window.__infovionActions) return;
  window.__infovionActions = true;
  document.addEventListener("click", (e) => {
    const a = e.target.closest?.("a[href]");
    if (!a) return;
    const href = a.getAttribute("href") || "";
    const place = (a.closest("header") && "header") || (a.closest("footer") && "footer") || a.getAttribute("aria-label")?.slice(0, 40) || "";
    if (/wa\.me|api\.whatsapp\.com|whatsapp:/i.test(href)) beacon("whatsapp", place);
    else if (href.startsWith("tel:")) beacon("call", place);
    else if (href.startsWith("mailto:")) beacon("email", place);
    else if (/jms\.infovion\.in\/demo/.test(href)) beacon("demo", place);
    else if (/jms\.infovion\.in\/signup|^\/free-trial/.test(href)) beacon("trial", place);
  }, { capture: true });
}
