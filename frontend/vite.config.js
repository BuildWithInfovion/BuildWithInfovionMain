import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Stamped into structured data (dateModified) so search and AI engines see fresh pages
  define: { __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)) },
  // The build-time prerender (src/entry-server.jsx) bundles these CommonJS / ESM-mixed packages
  ssr: {
    noExternal: ["react-helmet-async", "react-router", "react-router-dom", "framer-motion", "lucide-react"],
  },
});
