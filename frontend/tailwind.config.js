/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "grid-pattern-light": "url('/src/assets/grid-light.svg')",
        "grid-pattern-dark": "url('/src/assets/grid-dark.svg')",
      },
    },
  },
  plugins: [],
};
