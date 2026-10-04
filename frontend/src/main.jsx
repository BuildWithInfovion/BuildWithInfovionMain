import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const el = document.getElementById("root");
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Pages prerendered at build time are hydrated in place, so the HTML already on
// screen stays put instead of being thrown away and painted a second time. Any
// other URL (served the home page's HTML by the SPA fallback) renders fresh.
const trim = (p) => (p.length > 1 ? p.replace(/\/+$/, "") : p);
if (el.dataset.ssr && trim(el.dataset.ssr) === trim(window.location.pathname)) {
  // Let the browser paint the prerendered page first: on a slow phone hydration
  // is a long task, and running it before the first frame delays every paint.
  requestAnimationFrame(() => setTimeout(() => hydrateRoot(el, app), 0));
} else {
  el.textContent = "";
  createRoot(el).render(app);
}
