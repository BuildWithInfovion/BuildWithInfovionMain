// Integrations: the section pins while you scroll and the connectors travel sideways past you.
// On phones and with reduced motion it becomes an ordinary list.
import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export const SOURCES = [
  ["Microsoft Sentinel", "SIEM", "Incidents with their accounts, hosts and IP entities, triaged as they arrive", "validation"],
  ["Microsoft Defender XDR", "EDR / XDR", "Alerts from Defender for Endpoint, Identity, Office 365 and Cloud Apps, with process evidence", "validation"],
  ["Splunk", "SIEM", "Enterprise Security notable events, or the results of any search you choose", "validation"],
  ["CrowdStrike Falcon", "EDR", "Endpoint and identity alerts with host, user, command line and file hash", "validation"],
  ["Microsoft 365 / Entra ID", "Identity", "Sign-ins, directory changes, mailbox rules, file activity, and two response actions", "validation"],
  ["Google Workspace", "Identity", "Login, admin, OAuth token and Drive events", "validation"],
  ["AWS", "Cloud", "CloudTrail management events and GuardDuty findings, per region", "validation"],
  ["GitHub", "Code", "Organisation audit log, secret-scanning and code-scanning alerts", "validation"],
  ["Cloudflare", "Edge", "Account audit log and WAF firewall events per zone", "validation"],
  ["Cyvion agent", "Endpoints", "Windows and Linux: logons, processes, sudo, SSH, accounts, software inventory", "available"],
  ["Any other tool", "Webhook", "Post alerts as simple JSON from any SIEM, EDR or SOAR step", "available"],
];

export default function IntegrationRail({ title, lede }) {
  const ref = useRef(null);
  const trackRef = useRef(null);
  const reduce = useReducedMotion();
  const [dist, setDist] = useState(0);
  const [flat, setFlat] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);

  useEffect(() => {
    // The track starts after the window's left padding (the page gutter), so the distance to
    // travel is the track's full width plus that padding, minus the viewport, plus the same
    // gutter on the right. Measuring against the padded box alone left the last card off screen
    // on wide monitors.
    const measure = () => {
      const narrow = window.innerWidth < 900;
      setFlat(narrow || reduce);
      const t = trackRef.current;
      if (!t) return;
      const pad = parseFloat(getComputedStyle(t.parentElement).paddingLeft) || 0;
      const viewport = document.documentElement.clientWidth;
      setDist(Math.max(0, Math.ceil(t.scrollWidth + pad * 2 - viewport)));
    };
    measure();
    window.addEventListener("resize", measure);
    // Fonts arriving late change the card widths, so measure again when the track resizes
    const ro = typeof ResizeObserver !== "undefined" && trackRef.current ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(trackRef.current);
    return () => { window.removeEventListener("resize", measure); ro?.disconnect(); };
  }, [reduce, flat]);

  const cards = SOURCES.map(([name, kind, reads, state], i) => (
    <article key={name} className={`cy-src ${state}`}>
      <div className="top"><span className="kind">{kind}</span><span className="state">{state === "available" ? "available" : "in validation"}</span></div>
      <h3>{name}</h3>
      <p>{reads}</p>
      <span className="idx" aria-hidden="true" data-idx={String(i + 1).padStart(2, "0")} />
    </article>
  ));

  const head = (title || lede) && (
    <div className="cy-wrap cy-rail-head">{title && <h2>{title}</h2>}{lede && <p className="cy-lede">{lede}</p>}</div>
  );
  if (flat) return <div ref={ref}>{head}<div className="cy-wrap"><div className="cy-rail-flat">{cards}</div></div></div>;
  return (
    <div ref={ref} className="cy-rail" style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="cy-rail-pin">
        {head}
        <div className="cy-rail-window">
          <motion.div ref={trackRef} className="cy-rail-track" style={{ x }}>{cards}</motion.div>
        </div>
        <div className="cy-rail-progress"><motion.i style={{ width: bar }} /></div>
      </div>
    </div>
  );
}
