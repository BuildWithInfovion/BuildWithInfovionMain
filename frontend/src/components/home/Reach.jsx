// Where we work with clients: a dotted world map with lines drawn from Pune to each region we
// serve. Adapted from the "World Map" component by Aceternity (21st.dev/manuarora700/world-map).
// The dots are a static SVG generated once with the dotted-map package (public/brand/world-dots.svg),
// and the city positions below come from the same projection, so nothing is computed in the browser.
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion, useReducedMotion } from "framer-motion";

const PUNE = [143, 49.36];
const PLACES = [
  ["Dubai", "United Arab Emirates", "Asia/Dubai", "/offshore-software-development-dubai-uae", [131.5, 45.03]],
  ["Riyadh", "Saudi Arabia", "Asia/Riyadh", "/offshore-software-development-saudi-arabia", [126.5, 45.03]],
  ["London", "United Kingdom", "Europe/London", "/offshore-software-development-uk", [99, 25.11]],
  ["Berlin", "Europe", "Europe/Berlin", "/offshore-software-development-europe", [106.5, 24.25]],
  ["New York", "United States", "America/New_York", "/offshore-software-development-usa", [55, 33.77]],
  ["Toronto", "Canada", "America/Toronto", "/offshore-software-development-canada", [52, 32.04]],
  ["Sydney", "Australia", "Australia/Sydney", "/offshore-software-development-australia", [188.5, 81.41]],
];
const arc = ([x1, y1], [x2, y2]) => `M${x1} ${y1} Q${(x1 + x2) / 2} ${Math.min(y1, y2) - Math.abs(x2 - x1) * 0.22 - 4} ${x2} ${y2}`;

export default function Reach() {
  const reduce = useReducedMotion();
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  const time = (tz) => (now ? new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(now) : "--:--");

  return (
    <section className="cv-auto relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <p className="kicker-pill">Clients abroad</p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display max-w-2xl text-[2rem] leading-[1.08] text-white sm:text-5xl">Built in Pune, <span className="text-gradient-aurora">delivered wherever you work.</span></h2>
          <p className="max-w-sm text-sm leading-relaxed text-slate-400">We work remotely with businesses in these regions. Each has its own page with prices in local currency, working-hour overlap and contract terms.</p>
        </div>

        <div className="relative mt-10 aspect-[198/100] w-full">
          <img src="/brand/world-dots.svg" alt="" width="1980" height="1000" loading="lazy" decoding="async" className="pointer-events-none absolute inset-0 h-full w-full select-none" />
          <svg viewBox="0 0 198 100" className="absolute inset-0 h-full w-full" role="img" aria-label="World map with lines from Pune to Dubai, Riyadh, London, Berlin, New York, Toronto and Sydney">
            <defs>
              <linearGradient id="reach-line" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#38b6ff" stopOpacity="0" /><stop offset=".12" stopColor="#38b6ff" /><stop offset=".88" stopColor="#38b6ff" /><stop offset="1" stopColor="#38b6ff" stopOpacity="0" />
              </linearGradient>
            </defs>
            {PLACES.map(([city, , , , p], i) => (
              <g key={city}>
                <Motion.path d={arc(PUNE, p)} fill="none" stroke="url(#reach-line)" strokeWidth=".35" strokeLinecap="round"
                  initial={{ pathLength: reduce ? 1 : 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1.4, delay: 0.25 * i, ease: [0.16, 1, 0.3, 1] }} />
                {!reduce && (
                  <circle r=".7" fill="#e6f4ff">
                    <animateMotion dur={`${4 + i * 0.4}s`} begin={`${1.5 + i * 0.5}s`} repeatCount="indefinite" path={arc(PUNE, p)} />
                  </circle>
                )}
                <circle cx={p[0]} cy={p[1]} r=".9" fill="#38b6ff" />
              </g>
            ))}
            <circle cx={PUNE[0]} cy={PUNE[1]} r="1.3" fill="#fff" />
            {!reduce && <circle cx={PUNE[0]} cy={PUNE[1]} r="1.3" fill="none" stroke="#fff" strokeWidth=".3"><animate attributeName="r" from="1.3" to="5" dur="2.4s" repeatCount="indefinite" /><animate attributeName="opacity" from=".8" to="0" dur="2.4s" repeatCount="indefinite" /></circle>}
            <text x={PUNE[0] + 2.4} y={PUNE[1] + 4.6} fill="#fff" fontSize="3.1" fontWeight="600">Pune</text>
          </svg>
        </div>

        <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          <li className="flex items-baseline justify-between gap-4 bg-[#080a0f] px-5 py-4">
            <span><span className="block text-[15px] font-medium text-white">Pune</span><span className="text-sm text-slate-400">India, where we work</span></span>
            <span className="font-mono text-sm text-sky-200">{time("Asia/Kolkata")}</span>
          </li>
          {PLACES.map(([city, region, tz, to]) => (
            <li key={city}>
              <Link to={to} className="flex h-full items-baseline justify-between gap-4 bg-[#080a0f] px-5 py-4 transition-colors hover:bg-[#0d1017]">
                <span><span className="block text-[15px] font-medium text-white">{city}</span><span className="text-sm text-slate-400">{region}</span></span>
                <span className="font-mono text-sm text-slate-300">{time(tz)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
