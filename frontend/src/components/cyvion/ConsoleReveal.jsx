// "What your team sees": the console, built in code with sample data, rising out of a steep 3D tilt
// into place as it scrolls into view. Replaces the screenshot (which still carries the old name).
import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const NAV = ["Overview", "Cases", "Exposure", "Phishing", "Hunt", "Alerts", "Events", "Detections", "Playbooks", "Connectors", "Endpoints", "Reports", "Audit log"];
const NEEDS = [
  ["crit", "CY-2026-0418", "LSASS memory read on FIN-SRV-02", "malicious 0.97", "with analyst"],
  ["crit", "CY-2026-0416", "AWS root console sign-in without MFA", "malicious 0.95", "with analyst"],
  ["high", "CY-2026-0412", "Tor sign-in, then invoice forwarding rule", "malicious 0.94", "awaiting approval"],
  ["high", "CY-2026-0409", "OAuth app granted full mail access", "suspicious 0.81", "awaiting approval"],
  ["med", "CY-2026-0407", "Password spraying against 10 accounts", "malicious 0.88", "contained"],
];
const FUNNEL = [["Events collected", 12480, 100, "faint"], ["Alerts after rules", 41, 46, "flow"], ["Closed as benign", 28, 40, "mix"], ["Investigated further", 13, 30, "accent"], ["Sent to people", 6, 18, "crit"]];
const DAYS = [3, 5, 2, 4, 6, 3, 7, 5, 4, 9, 6, 8, 12, 15];

export default function ConsoleReveal() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const sp = scrollYProgress;              // Lenis already smooths the scroll itself
  const rotateX = useTransform(sp, [0, 1], [42, 0]);
  const scale = useTransform(sp, [0, 1], [0.84, 1]);
  const y = useTransform(sp, [0, 1], [90, 0]);
  const glow = useTransform(sp, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="cy-console-stage">
      <motion.div className="cy-console" style={reduce ? undefined : { rotateX, scale, y }}>
        <motion.div className="cy-console-glow" style={reduce ? undefined : { opacity: glow }} aria-hidden="true" />
        <aside className="cy-console-nav" aria-hidden="true">
          <b>Cyvion</b>
          <ul>{NAV.map((n, i) => <li key={n} className={i === 0 ? "on" : ""}>{n}{n === "Cases" && <em>6</em>}</li>)}</ul>
          <div className="who"><span className="pulse" />monitoring<br /><small>Northwind Group · Full platform</small></div>
        </aside>
        <div className="cy-console-main">
          <div className="top">
            <div><small>Northwind Group, last 30 days</small><h4>6 cases need a decision</h4></div>
            <span className="btn">Run an attack simulation</span>
          </div>
          <div className="kpis">
            <div><b className="crit">6</b><span>waiting for approval or an analyst</span></div>
            <div><b>0.4 s</b><span>median time from alert to verdict</span></div>
            <div><b>41</b><span>alerts raised from 12,480 events</span></div>
            <div><b className="ok">28</b><span>closed as benign, each with its reasons</span></div>
          </div>
          <div className="cols">
            <div className="panel">
              <div className="ph"><span>needs your decision</span><span>all</span></div>
              {NEEDS.map(([sev, ref2, title, verdict, state]) => (
                <div key={ref2} className="row">
                  <span className={`sv ${sev}`}>{sev === "crit" ? "critical" : sev === "med" ? "medium" : sev}</span>
                  <span className="rf">{ref2}</span>
                  <span className="tt">{title}</span>
                  <span className={`vd ${verdict.startsWith("susp") ? "med" : "crit"}`}>{verdict}</span>
                  <span className="st">{state}</span>
                </div>
              ))}
            </div>
            <div className="side">
              <div className="panel">
                <div className="ph"><span>volume funnel</span><span>log scale</span></div>
                {FUNNEL.map(([label, n, w, c]) => (
                  <div key={label} className="fn"><span>{label}</span><i className={c} style={{ width: `${w}%` }}>{n.toLocaleString("en-US")}</i></div>
                ))}
              </div>
              <div className="panel">
                <div className="ph"><span>alerts per day</span><span>14 days</span></div>
                <div className="bars">{DAYS.map((d, i) => <i key={i} style={{ height: `${(d / 15) * 100}%` }} className={i > 11 ? "hot" : ""} />)}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <p className="cy-console-cap">The Cyvion console with its demonstration tenant. Names, addresses and figures are sample data.</p>
    </div>
  );
}
