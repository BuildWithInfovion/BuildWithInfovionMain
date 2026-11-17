// One case, built in front of the reader. As each explanation scrolls into view, the case on the
// left gains that step: enrichment, history, correlation, ATT&CK, verdict, approval. Motion here is
// driven by the reader's scrolling, so it always shows what just changed.
import React, { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    k: "alert", label: "Alert", title: "A sign-in that does not look right",
    body: "Microsoft 365 reports a successful sign-in for the accounts mailbox at 02:14 from an address the user has never used. On its own, one of hundreds of sign-in alerts a day.",
    row: ["m365 signin", "accounts@northwind.example from 203.0.113.47", "02:14"],
  },
  {
    k: "enrich", label: "Enrich", title: "Who is behind that address",
    body: "Threat intelligence says the address is a Tor exit node with an abuse score of 100. Cyvion caches lookups, so this takes a fraction of a second.",
    row: ["intel", "203.0.113.47 is a Tor exit node, abuse score 100/100", "0.2 s"],
  },
  {
    k: "history", label: "History", title: "Is this normal for this user",
    body: "Ninety days of this mailbox's sign-ins: never from outside the home country, and MFA is not enforced on the account. The baseline makes the anomaly concrete.",
    row: ["baseline", "no sign-ins abroad in 90 days; MFA not enforced", "0.4 s"],
  },
  {
    k: "correlate", label: "Correlate", title: "What happened next",
    body: "Four minutes later the same session created an inbox rule forwarding anything mentioning invoices to an outside Gmail address. Two alerts, one story, one case.",
    row: ["event search", "New-InboxRule forwards \"invoice\" to an outside Gmail", "+4 min"],
  },
  {
    k: "mitre", label: "ATT&CK", title: "Named the way your team names things",
    body: "The evidence maps to Valid Accounts: Cloud Accounts and Email Forwarding Rule. Each technique lists the events that support it, so an analyst can check the mapping in seconds.",
    row: ["mitre", "T1078.004 Cloud Accounts, T1114.003 Email Forwarding Rule", "mapped"],
  },
  {
    k: "verdict", label: "Verdict", title: "A decision, with its reasons",
    body: "Account takeover in progress: malicious, confidence 0.94. The case notes are written in the handover format your L2 expects. Below 0.8, or at critical severity, it would go straight to a person.",
    row: ["verdict", "malicious, business email compromise", "0.94"],
  },
  {
    k: "approve", label: "Approve", title: "Nothing changes until someone says so",
    body: "Cyvion proposes revoking the sessions and removing the forwarding rule. A named analyst approves; the action runs against Microsoft 365 and the approval is written to the audit log.",
    row: ["approved", "revoke sessions, remove inbox rule", "by r.mehta"],
  },
];

export default function CaseReplay() {
  const [step, setStep] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") { setStep(STEPS.length - 1); return undefined; }
    // phones show the finished case; reduced motion skips the build-up
    if (window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 899px)").matches) { setStep(STEPS.length - 1); return undefined; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setStep(Number(e.target.dataset.i)); });
    }, { rootMargin: "-45% 0px -45% 0px" });
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const verdict = step >= 5;
  const approved = step >= 6;

  return (
    <div className="cy-replay">
      <div className="cy-replay-stick">
        <div className="cy-case" aria-live="polite">
          <div className="cy-case-head">
            <span>CY-2026-0412</span>
            <span className={`cy-sev ${verdict ? "high" : "pending"}`}>{verdict ? "high" : "investigating"}</span>
          </div>
          <p className="cy-case-title">Sign-in from an anonymising network, then an inbox forwarding rule</p>
          <ol className="cy-case-steps">
            {STEPS.map((s, i) => (
              <li key={s.k} className={i < step ? "done" : i === step ? "live" : "todo"}>
                <span className="k">{s.row[0]}</span>
                <span className="v">{i <= step ? s.row[1] : "waiting"}</span>
                <span className="t">{i <= step ? s.row[2] : ""}</span>
              </li>
            ))}
          </ol>
          <div className={`cy-case-verdict ${verdict ? "on" : ""}`}>
            <b>{verdict ? "Malicious" : "Verdict pending"}</b>
            <span>{verdict ? "confidence 0.94" : "investigation running"}</span>
          </div>
          <div className="cy-case-actions">
            <span className={approved ? "approved" : ""}>{approved ? "Sessions revoked" : "Revoke sessions"}</span>
            <span className={approved ? "approved" : ""}>{approved ? "Rule removed" : "Remove forwarding rule"}</span>
          </div>
          <p className="cy-case-foot">{approved ? "Approved by r.mehta at 02:21, recorded in the audit log" : "Awaiting a named person's approval"}</p>
        </div>
      </div>
      <ol className="cy-replay-steps">
        {STEPS.map((s, i) => (
          <li key={s.k} ref={(el) => { refs.current[i] = el; }} data-i={i} className={i === step ? "on" : ""}>
            <span className="n">{s.label}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
