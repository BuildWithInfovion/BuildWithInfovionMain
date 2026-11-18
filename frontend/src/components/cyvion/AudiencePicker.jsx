// "Which of these are you?" Each visitor picks their situation and gets what Cyvion does for them,
// in their words, with the next place to go.
import React, { useState } from "react";
import { Link } from "react-router-dom";

const WHO = [
  {
    k: "soc", tab: "I lead a SOC team",
    h: "Your analysts stop drowning in L1.",
    points: ["Every alert from your SIEM and EDR is investigated and written up in the handover format your L2 expects", "Low-confidence and critical cases reach a person with the evidence attached; the rest arrive closed with reasons", "Playbooks you edit, verdict reviews that produce an accuracy score, shift handover generated from open cases"],
    go: ["See how a case is built", "#story"], more: ["AI SOC analyst in depth", "/cyvion/ai-soc-analyst"],
  },
  {
    k: "solo", tab: "I am the security team",
    h: "A first line you could not hire.",
    points: ["Connect Microsoft 365, Google, AWS or your EDR and Cyvion watches them around the clock", "You get a few cases a day with a verdict and a one-click response, not a wall of alerts", "Exposure scanning shows which of your servers and sites an attacker can reach, and proves which are real"],
    go: ["Watch it work", "#story"], more: ["Exposure management", "/cyvion/exposure-management"],
  },
  {
    k: "mssp", tab: "I run a managed security service",
    h: "One console for every client.",
    points: ["Each client is a separate, isolated organisation; your analysts work all of them from one sign-in", "Every visit into a client is written to both audit logs; a roll-up shows open cases and pending decisions across clients", "Your product name, logo and colour in the console your clients see"],
    go: ["See the integrations", "#integrations"], more: ["Request a partner demo", "/contact?interest=cyvion"],
  },
  {
    k: "bank", tab: "I work at a bank or NBFC",
    h: "Evidence for the regulator, as a by-product.",
    points: ["Installed inside your network, so events and cases never leave your environment", "CERT-In six-hour incident report drafted from the case, and an audit trail of every verdict and approval", "Tenant isolation enforced by the database, SAML single sign-on, and no action without a named approver"],
    go: ["What exists today", "#status"], more: ["Cyvion for banks and finance", "/cyvion/banks-financial-services"],
  },
];

export default function AudiencePicker() {
  const [k, setK] = useState(WHO[0].k);
  const w = WHO.find((x) => x.k === k);
  return (
    <div className="cy-who">
      <div className="cy-who-tabs" role="tablist" aria-label="Choose what describes you">
        {WHO.map((x) => (
          <button key={x.k} role="tab" type="button" aria-selected={x.k === k} aria-controls={`who-${x.k}`} id={`tab-${x.k}`} onClick={() => setK(x.k)}>{x.tab}</button>
        ))}
      </div>
      <div className="cy-who-panel" role="tabpanel" id={`who-${w.k}`} aria-labelledby={`tab-${w.k}`} key={w.k}>
        <h3>{w.h}</h3>
        <ul>{w.points.map((p) => <li key={p}>{p}</li>)}</ul>
        <div className="cy-who-go">
          <a className="cy-btn" href={w.go[1]}>{w.go[0]}</a>
          <Link className="cy-btn ghost" to={w.more[1]}>{w.more[0]}</Link>
        </div>
      </div>
    </div>
  );
}
