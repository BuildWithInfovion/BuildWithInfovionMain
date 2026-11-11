// Product-style interface mockups for the solution blueprints, drawn in HTML from the sample data in
// Data/showcase.js. They are illustrations: the whole mock is one image to assistive technology.
import React from "react";
import { BrowserFrame } from "../product/Frames";

const TONE = { ok: "bg-emerald-400", info: "bg-sky-400", warn: "bg-amber-400", bad: "bg-rose-400" };
const STATUS = /ready|confirmed|posted|ok$/i;
const ALERT = /pending|awaiting|mismatch|exceeds|duplicate|low confidence|hold|needs/i;

function Bars({ labels, values }) {
  const max = Math.max(...values);
  return (
    <div className="flex h-28 items-end gap-1.5 sm:h-32 sm:gap-2.5">
      {values.map((v, i) => (
        <div key={labels[i]} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1">
          <span className="text-[9px] text-slate-400">{v}</span>
          <div className="w-full rounded-t bg-gradient-to-t from-sky-500/50 to-sky-300" style={{ height: `${Math.max(6, (v / max) * 78)}%` }} />
          <span className="w-full truncate text-center text-[9px] text-slate-500">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

function HBars({ labels, values }) {
  const max = Math.max(...values);
  return (
    <div className="space-y-2">
      {values.map((v, i) => (
        <div key={labels[i]} className="grid grid-cols-[7.5rem_1fr_1.75rem] items-center gap-2 text-[10px] sm:grid-cols-[9rem_1fr_2rem]">
          <span className="truncate text-slate-400">{labels[i]}</span>
          <span className="h-2 overflow-hidden rounded-full bg-white/[0.06]"><span className="block h-full rounded-full bg-gradient-to-r from-sky-500/60 to-sky-300" style={{ width: `${(v / max) * 100}%` }} /></span>
          <span className="text-right font-semibold text-slate-200">{v}</span>
        </div>
      ))}
    </div>
  );
}

function Line({ labels, values }) {
  const max = Math.max(...values) * 1.1;
  const min = Math.min(...values) * 0.7;
  const pts = values.map((v, i) => [(i / (values.length - 1)) * 100, 40 - ((v - min) / (max - min)) * 38]);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  return (
    <div>
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-24 w-full sm:h-28">
        <defs><linearGradient id="mock-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#7dd3fc" stopOpacity=".35" /><stop offset="1" stopColor="#7dd3fc" stopOpacity="0" /></linearGradient></defs>
        {[10, 20, 30].map((y) => <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="rgba(255,255,255,.06)" strokeWidth="1" vectorEffect="non-scaling-stroke" />)}
        <path d={`${d} L100 40 L0 40 Z`} fill="url(#mock-fill)" />
        <path d={d} fill="none" stroke="#7dd3fc" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="mt-1 flex justify-between text-[9px] text-slate-500">{labels.map((l) => <span key={l}>{l}</span>)}</div>
    </div>
  );
}

function Chat({ messages }) {
  return (
    <div className="space-y-2">
      {messages.map(([who, text], i) => who === "tag" ? (
        <p key={i} className="mx-auto w-fit max-w-full rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-center text-[9.5px] font-medium text-emerald-200">{text}</p>
      ) : (
        <p key={i} className={`max-w-[88%] rounded-xl px-3 py-2 text-[11px] leading-snug ${who === "in" ? "rounded-tl-sm bg-white/[0.07] text-slate-200" : "ml-auto rounded-tr-sm bg-sky-400/15 text-sky-50"}`}>{text}</p>
      ))}
    </div>
  );
}

function Fields({ items, note }) {
  return (
    <div>
      <dl className="divide-y divide-white/[0.06]">
        {items.map(([k, v, c]) => (
          <div key={k} className="grid grid-cols-[1fr_auto] gap-x-2 py-1.5 text-[11px]">
            <dt className="text-slate-500">{k}</dt>
            <dd className={`text-right text-[9.5px] font-semibold ${c >= 98 ? "text-emerald-300" : "text-amber-300"}`}>{c}%</dd>
            <dd className="col-span-2 truncate font-medium text-slate-100">{v}</dd>
          </div>
        ))}
      </dl>
      {note && <p className="mt-2 rounded-lg border border-amber-400/25 bg-amber-400/10 p-2 text-[10px] leading-snug text-amber-100">{note}</p>}
    </div>
  );
}

function AlertList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map(([t, meta, tone]) => (
        <li key={t} className="flex gap-2.5 rounded-lg bg-white/[0.04] p-2.5">
          <span className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${TONE[tone] ?? TONE.info}`} />
          <span className="min-w-0"><span className="block truncate text-[11px] font-semibold text-slate-100">{t}</span><span className="block truncate text-[10px] text-slate-400">{meta}</span></span>
        </li>
      ))}
    </ul>
  );
}

function Beds({ wards }) {
  return (
    <div className="space-y-2.5">
      {wards.map(([name, total, used]) => (
        <div key={name}>
          <p className="flex justify-between text-[10px]"><span className="text-slate-300">{name}</span><span className="text-slate-500">{used} / {total}</span></p>
          <div className="mt-1 flex flex-wrap gap-[3px]">
            {Array.from({ length: total }, (_, i) => <span key={i} className={`h-2.5 w-2.5 rounded-[3px] ${i < used ? "bg-sky-400/80" : "bg-emerald-400/30 ring-1 ring-inset ring-emerald-300/40"}`} />)}
          </div>
        </div>
      ))}
      <p className="flex gap-4 pt-1 text-[9.5px] text-slate-500"><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-[2px] bg-sky-400/80" />Occupied</span><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-[2px] bg-emerald-400/30 ring-1 ring-inset ring-emerald-300/40" />Free</span></p>
    </div>
  );
}

const cell = (v) => STATUS.test(v) ? "text-emerald-300" : ALERT.test(v) ? "text-amber-300" : "text-slate-300";
const card = "rounded-xl border border-white/[0.07] bg-white/[0.025] p-3.5";
const cardTitle = "mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400";

/** The dashboard of a blueprint, inside a browser window. `compact` is the smaller card version. */
export default function Mock({ project, compact = false }) {
  const m = project.mock;
  const Chart = { bars: Bars, hbars: HBars, line: Line }[m.chart.type];
  const Side = { chat: Chat, fields: Fields, list: AlertList, beds: Beds }[m.side.type];
  if (compact) {
    return (
      <div role="img" aria-label={`Design mockup: ${m.app} dashboard for ${project.short.toLowerCase()}, with sample data`} className="h-full bg-[#070c17] p-4">
        <div aria-hidden="true">
          <p className="flex items-center gap-2 text-[11px] font-semibold text-white"><span className="h-4 w-4 rounded bg-gradient-to-br from-sky-300 to-indigo-400" />{m.app}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {m.kpis.slice(0, 4).map(([l, v]) => (
              <div key={l} className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-2.5">
                <p className="truncate text-[9px] text-slate-500">{l}</p>
                <p className="mt-0.5 font-display text-base font-bold text-white">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-2 rounded-lg border border-white/[0.07] bg-white/[0.03] p-2.5"><Chart labels={m.chart.labels} values={m.chart.values} /></div>
        </div>
      </div>
    );
  }
  return (
    <BrowserFrame url={project.appUrl}>
      <div role="img" aria-label={`Design mockup: ${m.app} dashboard for ${project.short.toLowerCase()}, with sample data`}>
        <div aria-hidden="true" className="grid bg-[#070c17] text-left md:grid-cols-[10.5rem_1fr]">
          <aside className="hidden border-r border-white/[0.06] p-4 md:block">
            <p className="flex items-center gap-2 text-xs font-bold text-white"><span className="h-5 w-5 rounded-md bg-gradient-to-br from-sky-300 to-indigo-400" />{m.app}</p>
            <ul className="mt-5 space-y-0.5">
              {m.nav.map((n, i) => <li key={n} className={`rounded-md px-2.5 py-1.5 text-[11px] ${i === 0 ? "bg-sky-400/10 font-semibold text-sky-200" : "text-slate-400"}`}>{n}</li>)}
            </ul>
          </aside>
          <div className="min-w-0 p-3.5 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="font-display text-sm font-bold text-white">{m.nav[0]}</p>
              <p className="flex items-center gap-2 text-[10px] text-slate-500"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Live · sample data</p>
            </div>
            <div className="mt-3.5 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
              {m.kpis.map(([l, v, d]) => (
                <div key={l} className={card}>
                  <p className="truncate text-[10px] text-slate-500">{l}</p>
                  <p className="mt-1 font-display text-lg font-bold leading-none text-white sm:text-xl">{v}</p>
                  <p className="mt-1.5 truncate text-[10px] text-sky-300">{d}</p>
                </div>
              ))}
            </div>
            <div className="mt-2.5 grid gap-2.5 lg:grid-cols-[1.55fr_1fr]">
              <div className="min-w-0 space-y-2.5">
                <div className={card}>
                  <p className={cardTitle}>{m.chart.title}</p>
                  <Chart labels={m.chart.labels} values={m.chart.values} />
                  {m.chart.note && <p className="mt-3 border-t border-white/[0.06] pt-2.5 text-[10px] text-slate-400">{m.chart.note}</p>}
                </div>
                <div className={`${card} overflow-hidden`}>
                  <p className={cardTitle}>{m.table.title}</p>
                  <table className="w-full table-fixed text-[10.5px]">
                    <thead><tr className="text-left text-slate-500">{m.table.cols.map((c, i) => <th key={c} className={`pb-2 font-medium ${i === 2 ? "hidden sm:table-cell" : ""}`}>{c}</th>)}</tr></thead>
                    <tbody className="divide-y divide-white/[0.05]">
                      {m.table.rows.map((r) => (
                        <tr key={r[0]}>{r.map((v, i) => <td key={i} className={`truncate py-2 pr-2 ${i === 0 ? "font-semibold text-slate-100" : i === r.length - 1 ? cell(v) : "text-slate-400"} ${i === 2 ? "hidden sm:table-cell" : ""}`}>{v}</td>)}</tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={`${card} min-w-0`}>
                <p className={cardTitle}>{m.side.title}</p>
                <Side {...m.side} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}
