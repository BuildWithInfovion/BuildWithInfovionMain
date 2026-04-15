/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // manual only — we control dark sections explicitly
  theme: {
    extend: {
      colors: {
        brand: {
          dark:    "#33312E", // near-black — hero, navbar, footer bg
          brown:   "#5A4A48", // deep brown — dark sections, accents
          terra:   "#BE6D56", // terracotta — primary CTA, highlights
          neutral: "#9C928C", // warm gray — muted text, borders
          cream:   "#E3DDDB", // light cream — section backgrounds
          accent:  "#D1AB83", // warm gold — badges, secondary accents
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "dot-warm":
          "radial-gradient(circle, #9C928C 1px, transparent 1px)",
      },
      backgroundSize: {
        "dot-sm": "24px 24px",
        "dot-md": "32px 32px",
        "dot-lg": "48px 48px",
      },
      animation: {
        "float-slow": "floatSlow 24s ease-in-out infinite",
        "float-med":  "floatMed 18s ease-in-out infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%":      { transform: "translate(60px, -50px)" },
        },
        floatMed: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%":      { transform: "translate(-50px, 60px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.4" },
          "50%":      { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};
