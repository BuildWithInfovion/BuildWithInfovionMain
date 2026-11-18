// The centrepiece: how Cyvion works, told by scrolling. The section is pinned for several screens
// and scroll progress drives one canvas scene through five chapters. Every particle's position is
// a pure function of progress (plus a little ambient drift), so the story scrubs forwards and
// backwards exactly with the reader's scroll.
//
//   1 flood       thousands of events from every tool
//   2 filter      a detection wall sweeps across; almost everything dissolves, alerts remain
//   3 group       related alerts merge into a handful of cases
//   4 investigate one case opens into its investigation graph, node by node
//   5 decide      the graph collapses into a verdict a person approves
import React, { useEffect, useRef } from "react";

const PAL = { fg: "#E4EAF3", muted: "#8B9AB3", faint: "#5D6C86", accent: "#9AA8FF", flow: "#57C7D6", crit: "#F0605D", high: "#F0904B", med: "#E2C24A", ok: "#4CC38A" };
const SRC = ["#9AA8FF", "#57C7D6", "#B7A2F5", "#7FB7E0", "#6E88B5"];
const CASES = [
  { title: "Account takeover", sev: "high", n: 9 },
  { title: "Password spraying", sev: "med", n: 7 },
  { title: "Ransomware precursor", sev: "crit", n: 8 },
  { title: "Risky OAuth consent", sev: "high", n: 5 },
  { title: "Business travel", sev: "low", n: 4 },
];
const NODES = [
  { t: "203.0.113.47", s: "Tor exit node, abuse 100/100", c: "crit", a: -2.3 },
  { t: "90-day history", s: "never signed in from abroad", c: "accent", a: -1.15 },
  { t: "MFA", s: "not enforced on this account", c: "high", a: 0 },
  { t: "Inbox rule", s: "forwards \"invoice\" to Gmail", c: "crit", a: 1.15 },
  { t: "T1078.004", s: "Valid Accounts: Cloud", c: "accent", a: 2.3 },
  { t: "T1114.003", s: "Email Forwarding Rule", c: "accent", a: 3.45 },
];
export const CHAPTERS = [
  { k: "Flood", h: "Your tools see everything.", p: "Sign-ins, process starts, firewall blocks, cloud changes, reported emails. Thousands of events an hour, from every system you run. No team can read them all." },
  { k: "Filter", h: "Rules remove the noise first.", p: "Cyvion's detection rules, your SIEM's and your EDR's alerts, and suppressions for known-safe accounts cut the flood to the few events that need a look. No AI is spent on noise." },
  { k: "Group", h: "Related alerts become one case.", p: "Alerts about the same user, host or address are grouped, so your team sees five stories instead of forty fragments." },
  { k: "Investigate", h: "Every case is investigated.", p: "Threat intelligence, the user's 90-day history, related events, MFA state, ATT&CK techniques. The steps an L1 analyst takes, done in seconds and written down with the evidence." },
  { k: "Decide", h: "A person makes the call.", p: "The case arrives with a verdict, a confidence score and a proposed response. Nothing changes in your environment until a named person approves it, and every decision lands in the audit log." },
];

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;
function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

export default function ScrollStory() {
  const secRef = useRef(null);
  const canvasRef = useRef(null);
  // the text, progress marks, readout and verdict are updated straight from the animation loop,
  // so they always match the canvas frame (no waiting on React's update scheduling)
  const textRefs = useRef([]);
  const dotRefs = useRef([]);
  const readoutRef = useRef(null);
  const verdictRef = useRef(null);
  const approveRef = useRef(null);

  useEffect(() => {
    const sec = secRef.current, canvas = canvasRef.current;
    if (!sec || !canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, dpr = 1, raf = 0, running = false, visible = false;
    let parts = [];

    function build() {
      const r = rng(7);
      const N = W < 720 ? 900 : 2400;
      const alertIdx = [];
      parts = Array.from({ length: N }, (_, i) => ({ s1: r(), s2: r(), s3: r(), s4: r(), lane: (r() * 5) | 0, alert: false, cs: -1, ph: r() * 6.28 }));
      // the alerts: spread across the field so the wall reveals them as it passes
      let k = 0;
      CASES.forEach((c, ci) => { for (let j = 0; j < c.n; j++) { const idx = (k * 37 + 11) % N; parts[idx].alert = true; parts[idx].cs = ci; alertIdx.push(idx); k++; } });
    }

    function resize() {
      const r = canvas.parentElement.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    const narrow = () => W < 900;
    const fieldX0 = () => (narrow() ? W * 0.04 : W * 0.4);
    const fieldW = () => (narrow() ? W * 0.92 : W * 0.57);
    const fieldY0 = () => (narrow() ? H * 0.56 : Math.max(150, H * 0.2));
    const fieldH = () => (narrow() ? H * 0.4 : H - Math.max(150, H * 0.2) - H * 0.1);
    const laneY = (l) => fieldY0() + fieldH() * (0.1 + l * 0.2);
    function clusterPos(ci) {
      const cx = fieldX0() + fieldW() * 0.5, cy = fieldY0() + fieldH() * 0.5;
      const rad = Math.min(fieldW(), fieldH()) * 0.36;
      const a = -Math.PI / 2 + (ci / CASES.length) * Math.PI * 2;
      return [cx + Math.cos(a) * rad, cy + Math.sin(a) * rad * 0.9];
    }
    const centre = () => [fieldX0() + fieldW() * 0.5, fieldY0() + fieldH() * 0.5];

    // progress through the pinned section, 0..1
    function progress() {
      const r = sec.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      return clamp(-r.top / Math.max(1, span));
    }
    // chapter k occupies [k/5, (k+1)/5): hold for 62%, then move to the next layout
    function stageOf(p) {
      const k = Math.min(4, Math.floor(p * 5));
      const local = p * 5 - k;
      return { k, u: clamp(local / 0.62), s: k + (k < 4 ? smooth(0.62, 1, local) : 0) };
    }

    function layout(pt, st, u, t) {
      const x0 = fieldX0(), fw = fieldW(), y0 = fieldY0(), fh = fieldH();
      const drift = reduce ? 0 : 1;
      if (st === 0) {     // flood: a dense swarm
        return [x0 + fw * pt.s1 + Math.sin(t * 0.0007 + pt.ph) * 14 * drift, y0 + fh * pt.s2 + Math.cos(t * 0.0009 + pt.ph) * 10 * drift];
      }
      if (st === 1) {     // filter: lanes streaming right
        const speed = reduce ? 0 : 0.045;
        const x = x0 + ((pt.s1 * fw + t * speed * (0.6 + pt.s3)) % fw);
        return [x, laneY(pt.lane) + (pt.s2 - 0.5) * fh * 0.12];
      }
      if (st === 2) {     // group: alerts gather around case centres
        if (!pt.alert) return [x0 + fw * pt.s1, y0 + fh * pt.s2];
        const [cx, cy] = clusterPos(pt.cs);
        const a = pt.s1 * 6.28 + (reduce ? 0 : t * 0.0004);
        const rr = 14 + pt.s2 * 22;
        return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr];
      }
      if (st === 3) {     // investigate: case 0 in the centre, its alerts orbit
        if (!pt.alert) return [x0 + fw * pt.s1, y0 + fh * pt.s2];
        const [cx, cy] = centre();
        if (pt.cs === 0) { const a = pt.s1 * 6.28 + (reduce ? 0 : t * 0.0006); const rr = 26 + pt.s2 * 18; return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]; }
        const [ox, oy] = clusterPos(pt.cs);
        return [lerp(ox, cx, 0.1) + (ox - cx) * 0.6, lerp(oy, cy, 0.1) + (oy - cy) * 0.6];
      }
      // decide: everything in the case forms a ring around the verdict
      const [cx, cy] = centre();
      const a = pt.s1 * 6.28 + (reduce ? 0 : t * 0.0002);
      const rr = Math.min(fw, fh) * (pt.alert && pt.cs === 0 ? 0.24 : 0.42 + pt.s2 * 0.08);
      return [cx + Math.cos(a) * rr * 1.25, cy + Math.sin(a) * rr * 0.8];
    }

    function alphaOf(pt, st, u, x) {
      const wallX = fieldX0() + fieldW() * u;
      if (st === 0) return 0.35 + pt.s3 * 0.6;
      if (st === 1) {
        if (pt.alert) return x < wallX ? 1 : 0.6;
        return x < wallX ? Math.max(0, 0.5 - (wallX - x) / 60) * 0.6 : 0.25 + pt.s3 * 0.4;
      }
      if (st === 2) return pt.alert ? 1 : 0;
      if (st === 3) return pt.alert ? (pt.cs === 0 ? 1 : 0.18) : 0;
      return pt.alert && pt.cs === 0 ? 0.95 : (pt.alert ? 0.12 : 0.06);
    }

    function colourOf(pt, st) {
      if (pt.alert && st >= 1) return PAL[CASES[pt.cs].sev === "low" ? "ok" : CASES[pt.cs].sev];
      return SRC[pt.lane];
    }

    function draw(t) {
      const p = progress();
      const { k, u, s } = stageOf(p);
      const a = Math.floor(s), b = Math.min(4, a + 1), m = s - a;
      ctx.clearRect(0, 0, W, H);

      // chapter furniture underneath the particles
      if (a === 1 || (a === 0 && m > 0)) {
        const wu = a === 1 ? (k === 1 ? u : 1) : 0;
        const wx = fieldX0() + fieldW() * wu;
        const g = ctx.createLinearGradient(wx - 90, 0, wx, 0);
        g.addColorStop(0, "rgba(154,168,255,0)"); g.addColorStop(1, "rgba(154,168,255,0.22)");
        ctx.globalAlpha = a === 1 ? 1 - m : m;
        ctx.fillStyle = g; ctx.fillRect(wx - 90, fieldY0(), 90, fieldH());
        ctx.strokeStyle = PAL.accent; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(wx, fieldY0() - 10); ctx.lineTo(wx, fieldY0() + fieldH() + 10); ctx.stroke();
        ctx.font = "500 11px 'IBM Plex Mono', ui-monospace, monospace"; ctx.fillStyle = PAL.accent;
        ctx.fillText("detection rules", wx + 8, fieldY0() - 2);
        ctx.globalAlpha = 1;
      }
      if (s > 1.4 && s < 3.2) {          // case labels
        const vis = s < 2 ? smooth(1.4, 2, s) : s < 2.6 ? 1 : 1 - smooth(2.6, 3.2, s);
        ctx.font = "600 12px 'IBM Plex Sans', system-ui, sans-serif";
        CASES.forEach((c, ci) => {
          const [cx, cy] = clusterPos(ci);
          const isMain = ci === 0;
          ctx.globalAlpha = vis * (s > 2.6 && !isMain ? 0.4 : 1);
          ctx.fillStyle = PAL.fg; ctx.textAlign = "center";
          ctx.fillText(c.title, cx, cy + 58);
          ctx.fillStyle = PAL.muted; ctx.font = "500 11px 'IBM Plex Mono', ui-monospace, monospace";
          ctx.fillText(`${c.n} alerts, 1 case`, cx, cy + 74);
          ctx.font = "600 12px 'IBM Plex Sans', system-ui, sans-serif";
        });
        ctx.textAlign = "left"; ctx.globalAlpha = 1;
      }
      if (s > 2.4 && s < 4.3) {          // investigation graph
        const [cx, cy] = narrow() ? [W / 2, fieldY0() + 26] : centre();
        const grow = s < 3 ? smooth(2.4, 3, s) : s < 3.7 ? 1 : 1 - smooth(3.7, 4.3, s);
        const reveal = k === 3 ? u : s >= 3.5 ? 1 : 0;
        const R = Math.min(fieldW(), fieldH()) * 0.4;
        NODES.forEach((n, i) => {
          const on = clamp(reveal * NODES.length - i);
          if (on <= 0) return;
          // phones: the account at the top, its six findings in two columns below; wide screens: a radial graph
          const nx = narrow() ? (i % 2 ? W * 0.53 : W * 0.06) : Math.min(W - 220, Math.max(fieldX0() + 150, cx + Math.cos(n.a) * R * 1.05 * grow));
          const ny = narrow() ? cy + 62 + Math.floor(i / 2) * 56 * grow : cy + Math.sin(n.a) * R * 0.85 * grow;
          const ex = lerp(cx, nx, on), ey = lerp(cy, ny, on);
          ctx.globalAlpha = grow;
          ctx.strokeStyle = n.c === "accent" ? "rgba(154,168,255,0.5)" : n.c === "crit" ? "rgba(240,96,93,0.6)" : "rgba(240,144,75,0.6)";
          ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey); ctx.stroke();
          if (on >= 1) {
            ctx.fillStyle = PAL[n.c] || PAL.accent;
            ctx.beginPath(); ctx.arc(nx, ny, 4.5, 0, 6.283); ctx.fill();
            const left = !narrow() && nx < cx - 4;
            ctx.textAlign = left ? "right" : "left";
            const dx = left ? -12 : 10;
            ctx.font = `600 ${narrow() ? 11 : 12.5}px 'IBM Plex Mono', ui-monospace, monospace`; ctx.fillStyle = PAL.fg; ctx.fillText(n.t, nx + dx, ny - 3);
            ctx.font = `400 ${narrow() ? 10.5 : 12}px 'IBM Plex Sans', system-ui, sans-serif`; ctx.fillStyle = PAL.muted;
            ctx.fillText(narrow() && n.s.length > 24 ? `${n.s.slice(0, 23)}…` : n.s, nx + dx, ny + 12);
            ctx.textAlign = "left";
          }
        });
        ctx.globalAlpha = grow;
        ctx.fillStyle = "rgba(16,23,34,0.95)"; ctx.strokeStyle = PAL.accent;
        ctx.beginPath(); ctx.arc(cx, cy, 18, 0, 6.283); ctx.fill(); ctx.stroke();
        ctx.font = "600 12px 'IBM Plex Mono', ui-monospace, monospace"; ctx.fillStyle = PAL.fg; ctx.textAlign = "center";
        ctx.fillText("accounts@northwind", narrow() ? cx + 0 : cx, narrow() ? cy - 26 : cy + 40);
        ctx.textAlign = "left"; ctx.globalAlpha = 1;
      }

      // particles: blend between the two layouts either side of the current stage
      ctx.globalCompositeOperation = s < 1 ? "lighter" : "source-over";
      for (const pt of parts) {
        const [xa, ya] = layout(pt, a, k === a ? u : 1, t);
        let x = xa, y = ya, al = alphaOf(pt, a, k === a ? u : 1, xa);
        if (m > 0) {
          const [xb, yb] = layout(pt, b, 0, t);
          const e = m * m * (3 - 2 * m);
          x = lerp(xa, xb, e); y = lerp(ya, yb, e);
          al = lerp(al, alphaOf(pt, b, 0, xb), e);
        }
        if (al <= 0.01) continue;
        ctx.globalAlpha = al;
        const col = colourOf(pt, s >= 0.8 ? Math.max(1, a) : a);
        ctx.fillStyle = col;
        if (pt.alert && s >= 0.8) {
          ctx.shadowColor = col; ctx.shadowBlur = 10;
          ctx.beginPath(); ctx.arc(x, y, 3, 0, 6.283); ctx.fill();
          ctx.shadowBlur = 0;
        } else if (a === 0 && m < 0.5) {
          // the flood: short luminous streaks, each drifting its own way
          const ang = pt.ph + t * 0.0004;
          ctx.fillRect(x, y, 2, 2);
          ctx.globalAlpha = al * 0.35;
          ctx.fillRect(x - Math.cos(ang) * 5, y - Math.sin(ang) * 5, 1.4, 1.4);
        } else {
          ctx.fillRect(x, y, a === 1 ? 7 : 1.6, 1.6);
        }
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      ui(p, k, u, s);
    }

    function ui(p, k, u, s) {
      const kr = Math.min(4, Math.round(s));
      textRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = Math.abs(s - i);
        el.style.opacity = String(clamp(1 - d * 1.6));
        el.style.transform = `translateY(${(s - i) * -28}px)`;
        el.setAttribute("aria-hidden", i === kr ? "false" : "true");
      });
      dotRefs.current.forEach((el, i) => { if (el) el.className = i === kr ? "on" : i < kr ? "past" : ""; });
      const events = Math.round(12480 * clamp((p * 5) / 0.62)).toLocaleString("en-US");
      const alerts = k >= 1 ? Math.round(33 * (k === 1 ? u : 1)) : 0;
      if (readoutRef.current) {
        readoutRef.current.textContent = [`${events} events`, `${events} events → ${alerts} alerts`, `${alerts} alerts → 5 cases`,
          "1 case, 6 checks, 0.4 seconds", "malicious, confidence 0.94"][kr];
      }
      if (verdictRef.current) verdictRef.current.classList.toggle("on", s > 3.98);
      if (approveRef.current) {
        const done = k === 4 && u > 0.5;
        approveRef.current.classList.toggle("done", done);
        approveRef.current.firstChild.textContent = done ? "Approved by r.mehta" : "Approve: revoke sessions";
      }
    }

    function frame(t) { if (!running) return; draw(t); raf = requestAnimationFrame(frame); }
    function start() { if (!running && visible) { running = true; raf = requestAnimationFrame(frame); } }
    function stop() { running = false; cancelAnimationFrame(raf); }

    resize();
    draw(0);
    const ro = new ResizeObserver(() => { resize(); draw(performance.now()); });
    ro.observe(canvas.parentElement);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else stop(); });
    io.observe(sec);
    const onScroll = () => { if (!running) draw(performance.now()); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { stop(); ro.disconnect(); io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);


  return (
    <section ref={secRef} className="cy-story" aria-label="How Cyvion works, in five steps">
      <div className="cy-story-pin">
        <canvas ref={canvasRef} aria-hidden="true" className="cy-story-canvas" />
        <div className="cy-wrap cy-story-in">
          <div className="cy-story-copy">
            <ol className="cy-story-dots" aria-hidden="true">
              {CHAPTERS.map((c, i) => <li key={c.k} ref={(el) => { dotRefs.current[i] = el; }} className={i === 0 ? "on" : ""}><span>{c.k}</span></li>)}
            </ol>
            <div className="cy-story-texts">
              {CHAPTERS.map((c, i) => (
                <div key={c.k} ref={(el) => { textRefs.current[i] = el; }} className="cy-story-text" style={{ opacity: i === 0 ? 1 : 0 }} aria-hidden={i !== 0}>
                  <h3>{c.h}</h3>
                  <p>{c.p}</p>
                </div>
              ))}
            </div>
            <p ref={readoutRef} className="cy-story-readout">0 events</p>
          </div>
          <div ref={verdictRef} className="cy-story-verdict" aria-hidden="true">
            <div className="h"><span>CY-2026-0412</span><span className="sev">high</span></div>
            <b>Account takeover in progress</b>
            <p>Tor sign-in without MFA, then a rule forwarding invoices to an outside Gmail address.</p>
            <div className="bar"><span>Malicious</span><span>0.94</span></div>
            <div ref={approveRef} className="approve"><span>Approve: revoke sessions</span></div>
          </div>
        </div>
      </div>
      {/* the same five steps as plain text, for search engines and screen readers */}
      <ol className="sr-only">{CHAPTERS.map((c) => <li key={c.k}><b>{c.h}</b> {c.p}</li>)}</ol>
    </section>
  );
}
