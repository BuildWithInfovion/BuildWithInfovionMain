import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const PRICE_PER_STUDENT = 50; // ₹ per student per academic year, before GST
const GST = 0.18;
const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

/** Slider that shows what a school of a given size pays per year. */
export default function PriceCalculator({ dark = false }) {
  const [students, setStudents] = useState(600);
  const base = students * PRICE_PER_STUDENT;
  const total = base * (1 + GST);
  const muted = dark ? "text-slate-400" : "text-brand-neutral";
  const strong = dark ? "text-white" : "text-brand-darker";
  return (
    <div className={`rounded-3xl p-6 sm:p-8 ${dark ? "glass shadow-[0_40px_120px_-40px_rgba(45,212,191,0.45)]" : "bg-white ring-1 ring-brand-cream shadow-card"}`}>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor="students" className={`text-sm font-semibold ${strong}`}>Students in your school</label>
        <span className={`font-display text-2xl font-extrabold ${strong}`}>{students.toLocaleString("en-IN")}</span>
      </div>
      <input
        id="students"
        type="range"
        min={50}
        max={3000}
        step={50}
        value={students}
        onChange={(e) => setStudents(Number(e.target.value))}
        className={`mt-4 w-full ${dark ? "accent-[#2dd4bf]" : "accent-[#0D9488]"}`}
      />
      <div className={`mt-1 flex justify-between text-[11px] ${muted}`}><span>50</span><span>3,000+</span></div>

      <div className={`mt-6 grid grid-cols-2 gap-4 border-t pt-6 ${dark ? "border-white/10" : "border-brand-cream"}`}>
        <div>
          <p className={`text-xs ${muted}`}>Per year (+ 18% GST)</p>
          <p className={`font-display text-3xl font-extrabold ${strong}`}>{inr(base)}</p>
          <p className={`text-xs ${muted}`}>{inr(total)} with GST</p>
        </div>
        <div>
          <p className={`text-xs ${muted}`}>That works out to</p>
          <p className={`font-display text-3xl font-extrabold ${strong}`}>{inr(base / 12)}</p>
          <p className={`text-xs ${muted}`}>a month, for the whole school</p>
        </div>
      </div>
      <Link
        to="/free-trial"
        className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-all ${dark ? "bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 text-[#04121a] hover:brightness-110" : "bg-brand-terra text-white hover:bg-brand-terra2"}`}
      >
        Try it free for 30 days <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
