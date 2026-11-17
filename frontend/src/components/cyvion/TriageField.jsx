// The Cyvion hero field. Not decoration: it acts out what the product does.
//
//  triage   events stream in from the left in lanes (identity, endpoint, cloud, email, network).
//           A detection line filters them; most dissolve, a few trip a rule, light up in their
//           severity colour and dock as cases that are then given a verdict. The counters are the
//           field's own tallies. Pointing at any dot names the event it stands for.
//  exposure a network of hosts is swept by a scan line; each host resolves as the beam passes,
//           clean or with findings, and actively exploited ones keep pulsing.
//
// Canvas 2D, no dependencies. Runs only in the browser, pauses off-screen and in background tabs,
// and draws one still frame when the visitor prefers reduced motion.
import React, { useEffect, useRef, useState } from "react";

const C = {
  ink: "#0A0F17", line: "rgba(154,168,255,0.16)", faint: "#5D6C86", muted: "#8B9AB3", fg: "#E4EAF3",
  accent: "#9AA8FF", flow: "#57C7D6", crit: "#F0605D", high: "#F0904B", med: "#E2C24A", low: "#6FB2FF", ok: "#4CC38A",
};
const LANES = [
  { key: "identity", color: "#9AA8FF", label: "identity" },
  { key: "endpoint", color: "#57C7D6", label: "endpoint" },
  { key: "cloud", color: "#B7A2F5", label: "cloud" },
  { key: "email", color: "#7FB7E0", label: "email" },
  { key: "network", color: "#6E88B5", label: "network" },
];
const EVENTS = {
  identity: ["m365  logon success  priya.shah@", "m365  logon failure  admin@", "entra  mfa challenge passed", "google  oauth grant  Mail Merge Pro", "m365  inbox rule created", "entra  role assigned  Global admin"],
  endpoint: ["win 4688  powershell.exe -enc", "win 4624  logon type 10  FIN-LT-22", "sysmon 3  rundll32 to 203.0.113.9", "linux  sudo  cat /etc/shadow", "win 7045  service installed", "sysmon 10  lsass.exe accessed"],
  cloud: ["aws  ConsoleLogin  root", "aws  CreateAccessKey  ci-deploy", "aws  StopLogging  org-trail", "github  secret detected  payments", "aws  PutBucketAcl  public-read"],
  email: ["phish report  invoice-update.eml", "dmarc fail  lookalike  rnicrosoft", "attachment  .iso from new sender"],
  network: ["cloudflare  waf block  /wp-login.php", "cloudflare  challenge  198.51.100.23", "crowdstrike  alert  CredentialDumping", "sentinel  incident  Multistage attack"],
};
const CASES = [
  ["account takeover", "high"], ["credential dumping", "crit"], ["ransomware precursor", "crit"], ["password spraying", "med"],
  ["risky OAuth consent", "high"], ["AWS root sign-in", "crit"], ["mass file download", "high"], ["secret committed", "high"],
  ["brute force", "med"], ["new admin created", "high"], ["business travel", "low"], ["impossible travel", "med"],
];

const rand = (a, b) => a + Math.random() * (b - a);
const pick = (xs) => xs[(Math.random() * xs.length) | 0];

function useCounters() {
  const [n, setN] = useState({ events: 0, alerts: 0, cases: 0, benign: 0 });
  return [n, setN];
}

export default function TriageField({ mode = "triage", className = "" }) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const [counts, setCounts] = useCounters();

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return undefined;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, dpr = 1, raf = 0, running = false, last = 0, visible = true;
    const pointer = { x: -1e4, y: -1e4 };
    const tally = { events: 0, alerts: 0, cases: 0, benign: 0 };
    let lastPush = 0;

    // ---- shared geometry ---------------------------------------------------------------
    const narrow = () => W < 720;
    const gateX = () => (narrow() ? W * 0.68 : W * 0.6);
    const dockX = () => (narrow() ? W - 18 : Math.min(W - 330, gateX() + W * 0.1));

    function resize() {
      const r = wrap.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = Math.max(320, r.width);
      H = Math.max(420, r.height);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (mode === "exposure") layoutHosts();
    }

    // ---- triage mode -------------------------------------------------------------------
    const dots = [];
    const cases = [];
    let caseSeq = 410 + ((Math.random() * 60) | 0);
    let spawnAcc = 0;
    const TOP = 150;                                  // below the site's navigation and Cyvion bar
    const laneY = (i) => TOP + 40 + (i / (LANES.length - 1)) * (H - TOP - 230);

    function spawn() {
      const lane = (Math.random() * LANES.length) | 0;
      const ly = laneY(lane);
      dots.push({
        x: rand(-40, -4), y: ly + rand(-H * 0.055, H * 0.055), vx: rand(150, 280), phase: rand(0, 6.28), amp: rand(2, 9),
        lane, r: rand(0.8, 1.7), state: "flow", t: 0, text: pick(EVENTS[LANES[lane].key]),
        sev: null, tx: 0, ty: 0, sx: 0, sy: 0, caseRef: null,
      });
      tally.events += 1;
    }

    function openOrJoinCase(now) {
      const recent = cases[0];
      if (recent && now - recent.born < 2200 && Math.random() < 0.55) {
        recent.alerts += 1;
        return recent;
      }
      const [title, sev] = pick(CASES);
      caseSeq += 1;
      const c = { ref: `CY-${caseSeq}`, title, sev, born: now, alerts: 1, verdict: null, conf: 0, y: 0, ty: 0, alpha: 0 };
      cases.unshift(c);
      if (cases.length > 6) cases.length = 6;
      tally.cases += 1;
      return c;
    }

    function stepTriage(dt, now) {
      const rate = (narrow() ? 55 : 120) * (W / 1400 + 0.3);
      spawnAcc += dt * rate;
      while (spawnAcc > 1) { spawn(); spawnAcc -= 1; }
      const gx = gateX();
      for (let i = dots.length - 1; i >= 0; i--) {
        const d = dots[i];
        d.t += dt;
        if (d.state === "flow") {
          d.x += d.vx * dt;
          d.y += Math.sin(d.t * 1.4 + d.phase) * d.amp * dt;
          if (d.x >= gx) {
            if (Math.random() < 0.012) {
              const c = openOrJoinCase(now);
              d.state = "alert"; d.t = 0; d.sx = d.x; d.sy = d.y; d.caseRef = c;
              d.sev = c.sev === "low" ? "low" : c.sev;
              tally.alerts += 1;
            } else {
              d.state = "fade"; d.t = 0;
            }
          }
        } else if (d.state === "fade") {
          d.x += d.vx * dt * 0.55;
          d.y += (d.y < H / 2 ? -1 : 1) * 18 * dt;
          if (d.t > 0.55) dots.splice(i, 1);
        } else if (d.state === "alert") {
          const k = Math.min(1, d.t / 1.15);
          const e = 1 - Math.pow(1 - k, 3);
          const tx = dockX() + 6, ty = d.caseRef.y + 13;
          const cx = (d.sx + tx) / 2, cy = d.sy - 40;
          d.x = (1 - e) * (1 - e) * d.sx + 2 * (1 - e) * e * cx + e * e * tx;
          d.y = (1 - e) * (1 - e) * d.sy + 2 * (1 - e) * e * cy + e * e * ty;
          if (k >= 1) dots.splice(i, 1);
        }
        if (d.x > W + 20) dots.splice(i, 1);
      }
      // case stack positions and verdicts
      const top = TOP + 20;
      cases.forEach((c, i) => {
        c.ty = top + i * 44;
        c.y = c.y ? c.y + (c.ty - c.y) * Math.min(1, dt * 7) : c.ty;
        c.alpha = Math.min(1, c.alpha + dt * 2.2) * (i === 5 ? 0.35 : 1);
        if (!c.verdict && now - c.born > 1300) {
          const benign = c.sev === "low" || Math.random() < 0.18;
          c.verdict = benign ? "benign" : c.sev === "med" ? "suspicious" : "malicious";
          c.conf = benign ? rand(0.86, 0.95) : rand(0.81, 0.97);
          if (benign) tally.benign += 1;
        }
      });
    }

    function drawTriage(now) {
      const gx = gateX();
      // lanes
      ctx.font = "500 10px 'IBM Plex Mono', ui-monospace, monospace";
      LANES.forEach((l, i) => {
        const y = laneY(i);
        const g = ctx.createLinearGradient(0, 0, gx, 0);
        g.addColorStop(0, "rgba(154,168,255,0)");
        g.addColorStop(1, "rgba(154,168,255,0.07)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(gx, y); ctx.stroke();
        if (!narrow()) {
          ctx.fillStyle = "rgba(139,154,179,0.45)";
          ctx.fillText(l.label, gx - 64, y - 6);
        }
      });
      // detection line with travelling rule ticks
      ctx.strokeStyle = "rgba(154,168,255,0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(gx, TOP); ctx.lineTo(gx, H - 150); ctx.stroke();
      const off = (now / 40) % 18;
      ctx.fillStyle = "rgba(154,168,255,0.55)";
      for (let y = TOP + off; y < H - 150; y += 18) ctx.fillRect(gx - 3, y, 6, 1);
      if (!narrow()) {
        ctx.fillStyle = "rgba(154,168,255,0.8)";
        ctx.fillText("detection rules", gx + 8, TOP + 10);
      }
      // dots
      for (const d of dots) {
        if (d.state === "alert") {
          const col = C[d.sev] || C.high;
          ctx.fillStyle = col;
          ctx.shadowColor = col; ctx.shadowBlur = 12;
          ctx.beginPath(); ctx.arc(d.x, d.y, 2.6, 0, 6.283); ctx.fill();
          ctx.shadowBlur = 0;
          continue;
        }
        // each event is a short streak: the field reads as a stream, not as specks
        const a = d.state === "fade" ? Math.max(0, 0.55 * (1 - d.t / 0.55)) : 0.22 + 0.58 * Math.min(1, d.x / gx);
        const len = d.state === "fade" ? 6 : Math.min(26, d.vx * 0.09);
        ctx.globalAlpha = a;
        ctx.strokeStyle = d.state === "fade" ? C.faint : LANES[d.lane].color;
        ctx.lineWidth = d.r * 1.3;
        ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(d.x - len, d.y); ctx.lineTo(d.x, d.y); ctx.stroke();
        ctx.globalAlpha = 1;
      }
      // case stack
      const dx = dockX();
      ctx.font = "500 11px 'IBM Plex Mono', ui-monospace, monospace";
      cases.forEach((c) => {
        ctx.globalAlpha = c.alpha;
        const col = C[c.sev] || C.high;
        if (narrow()) {
          ctx.fillStyle = col;
          ctx.beginPath(); ctx.arc(dx, c.y + 13, 3, 0, 6.283); ctx.fill();
          ctx.globalAlpha = 1;
          return;
        }
        ctx.fillStyle = "rgba(16,23,34,0.92)";
        ctx.strokeStyle = "rgba(154,168,255,0.18)";
        roundRect(ctx, dx, c.y, 310, 34, 6); ctx.fill(); ctx.stroke();
        ctx.fillStyle = col; ctx.fillRect(dx, c.y + 6, 2, 22);
        ctx.fillStyle = C.muted; ctx.fillText(c.ref, dx + 12, c.y + 21);
        ctx.fillStyle = C.fg; ctx.fillText(c.title.length > 18 ? `${c.title.slice(0, 17)}…` : c.title, dx + 74, c.y + 21);
        if (c.verdict) {
          ctx.fillStyle = c.verdict === "benign" ? C.ok : c.verdict === "suspicious" ? C.med : C.crit;
          ctx.textAlign = "right";
          ctx.fillText(`${c.verdict === "suspicious" ? "susp." : c.verdict} ${c.conf.toFixed(2)}`, dx + 302, c.y + 21);
          ctx.textAlign = "left";
        } else {
          ctx.fillStyle = C.faint;
          ctx.textAlign = "right";
          ctx.fillText("triaging", dx + 302, c.y + 21);
          ctx.textAlign = "left";
        }
        ctx.globalAlpha = 1;
      });
    }

    function nearestTriage() {
      let best = null, bd = 34 * 34;
      for (const d of dots) {
        if (d.state !== "flow") continue;
        const dd = (d.x - pointer.x) ** 2 + (d.y - pointer.y) ** 2;
        if (dd < bd) { bd = dd; best = d; }
      }
      return best;
    }

    // ---- exposure mode -----------------------------------------------------------------
    let hosts = [];
    let sweep = 0;
    const SERVICES = [
      ["ssh 9.6p1", null], ["https nginx 1.25", null], ["rdp", "med"], ["mysql 5.7.42", "high"], ["smb v1", "crit"],
      ["https 1.18 nginx", "med"], ["redis open, no auth", "crit"], ["ftp anonymous", "high"], ["http admin  default creds", "crit"],
      ["ssh 7.4", "high"], ["https", null], ["dns", null], ["snmp public", "med"], ["https tls 1.0", "med"], ["ldap", null],
    ];
    function layoutHosts() {
      const cols = narrow() ? 6 : 8, rows = 6;
      const x0 = narrow() ? W * 0.08 : W * 0.52, x1 = W * 0.97, y0 = 175, y1 = H - 170;
      const seedHosts = hosts.length ? hosts : null;
      hosts = [];
      let k = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (Math.random() < 0.28 && !seedHosts) { k++; continue; }
          const prev = seedHosts && seedHosts[hosts.length];
          const [svc, sev] = prev ? [prev.svc, prev.sev] : pick(SERVICES);
          hosts.push({
            x: x0 + (c + 0.5) * ((x1 - x0) / cols) + rand(-14, 14), y: y0 + (r + 0.5) * ((y1 - y0) / rows) + rand(-12, 12),
            ip: prev ? prev.ip : `10.0.${r + 2}.${10 + c * 7 + (k % 5)}`, svc, sev, seen: false, lit: 0,
            kev: prev ? prev.kev : sev === "crit" && Math.random() < 0.6, ports: prev ? prev.ports : 1 + ((Math.random() * 4) | 0),
          });
          k++;
        }
      }
    }

    function stepExposure(dt) {
      const span = W * 1.15;
      sweep += dt * W * 0.16;
      if (sweep > span) {
        sweep = 0;
        hosts.forEach((h) => { h.seen = false; h.lit = 0; });
        tally.events = 0; tally.alerts = 0; tally.cases = 0; tally.benign = 0;
      }
      for (const h of hosts) {
        if (!h.seen && h.x <= sweep) {
          h.seen = true; h.lit = 1;
          tally.events += 1;                    // hosts discovered
          tally.alerts += h.ports;              // services
          if (h.sev) tally.cases += 1;          // findings
          if (h.kev) tally.benign += 1;         // actively exploited
        }
        h.lit = Math.max(0, h.lit - dt * 0.45);
      }
    }

    function drawExposure(now) {
      // links between near neighbours
      ctx.lineWidth = 1;
      for (let i = 0; i < hosts.length; i++) {
        for (let j = i + 1; j < hosts.length; j++) {
          const a = hosts[i], b = hosts[j];
          const d2 = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
          if (d2 < (W * 0.075) ** 2) {
            ctx.strokeStyle = a.seen && b.seen ? "rgba(87,199,214,0.16)" : "rgba(154,168,255,0.05)";
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      // sweep beam
      const g = ctx.createLinearGradient(sweep - 140, 0, sweep, 0);
      g.addColorStop(0, "rgba(87,199,214,0)");
      g.addColorStop(1, "rgba(87,199,214,0.14)");
      ctx.fillStyle = g;
      ctx.fillRect(sweep - 140, 150, 140, H - 150);
      ctx.strokeStyle = "rgba(87,199,214,0.7)";
      ctx.beginPath(); ctx.moveTo(sweep, 150); ctx.lineTo(sweep, H - 120); ctx.stroke();
      // hosts
      ctx.font = "500 10px 'IBM Plex Mono', ui-monospace, monospace";
      const placed = [];
      for (const h of hosts) {
        const col = !h.seen ? "rgba(139,154,179,0.25)" : h.sev ? C[h.sev] : C.ok;
        if (h.seen && h.kev) {
          const p = (Math.sin(now / 300 + h.x) + 1) / 2;
          ctx.strokeStyle = `rgba(240,96,93,${0.25 + 0.35 * p})`;
          ctx.beginPath(); ctx.arc(h.x, h.y, 9 + p * 5, 0, 6.283); ctx.stroke();
        }
        ctx.fillStyle = col;
        if (h.seen && h.sev) { ctx.shadowColor = col; ctx.shadowBlur = 10 * (0.4 + h.lit); }
        ctx.beginPath(); ctx.arc(h.x, h.y, h.seen ? 3.2 : 2.2, 0, 6.283); ctx.fill();
        ctx.shadowBlur = 0;
        for (let p = 0; p < h.ports; p++) {
          const ang = (p / h.ports) * 6.283 + h.x;
          ctx.globalAlpha = h.seen ? 0.6 : 0.15;
          ctx.fillRect(h.x + Math.cos(ang) * 7 - 0.7, h.y + Math.sin(ang) * 7 - 0.7, 1.4, 1.4);
          ctx.globalAlpha = 1;
        }
        const box = [h.x + 7, h.y - 14, 130, 28];
        const clash = placed.some((b) => box[0] < b[0] + b[2] && box[0] + box[2] > b[0] && box[1] < b[1] + b[3] && box[1] + box[3] > b[1]);
        if (h.sev && h.lit > 0.05 && !narrow() && !clash) {
          placed.push(box);
          ctx.globalAlpha = Math.min(1, h.lit * 1.4);
          ctx.fillStyle = C.fg; ctx.fillText(h.ip, h.x + 9, h.y - 4);
          ctx.fillStyle = h.sev ? col : C.muted; ctx.fillText(h.svc, h.x + 9, h.y + 9);
          ctx.globalAlpha = 1;
        }
      }
    }

    function nearestHost() {
      let best = null, bd = 30 * 30;
      for (const h of hosts) {
        const dd = (h.x - pointer.x) ** 2 + (h.y - pointer.y) ** 2;
        if (dd < bd) { bd = dd; best = h; }
      }
      return best;
    }

    // ---- frame ---------------------------------------------------------------------------
    function lens() {
      if (pointer.x < 0) return;
      ctx.font = "500 11px 'IBM Plex Mono', ui-monospace, monospace";
      if (mode === "exposure") {
        const h = nearestHost();
        if (!h) return;
        drawLabel(h.x, h.y, [h.ip, h.seen ? h.svc : "not scanned yet", h.seen ? (h.kev ? "actively exploited (CISA KEV)" : h.sev ? `${h.sev === "crit" ? "critical" : h.sev === "med" ? "medium" : h.sev} finding` : "no findings") : ""].filter(Boolean),
          h.seen && h.sev ? C[h.sev] : C.accent);
        return;
      }
      const d = nearestTriage();
      if (!d) return;
      drawLabel(d.x, d.y, [d.text, `${LANES[d.lane].label} event, not yet past the rules`], LANES[d.lane].color);
    }

    function drawLabel(x, y, lines, col) {
      ctx.strokeStyle = col; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(x, y, 8, 0, 6.283); ctx.stroke();
      const w = Math.max(...lines.map((l) => ctx.measureText(l).width)) + 20;
      const bx = Math.min(x + 14, W - w - 8), by = Math.max(8, y - 14 - lines.length * 16);
      ctx.fillStyle = "rgba(10,15,23,0.94)"; ctx.strokeStyle = "rgba(154,168,255,0.3)";
      roundRect(ctx, bx, by, w, lines.length * 16 + 12, 6); ctx.fill(); ctx.stroke();
      lines.forEach((l, i) => { ctx.fillStyle = i === 0 ? C.fg : C.muted; ctx.fillText(l, bx + 10, by + 20 + i * 16); });
    }

    function frame(t) {
      if (!running) return;
      const dt = Math.min(0.05, (t - (last || t)) / 1000);
      last = t;
      if (mode === "exposure") stepExposure(dt); else stepTriage(dt, t);
      ctx.clearRect(0, 0, W, H);
      if (mode === "exposure") drawExposure(t); else drawTriage(t);
      lens();
      if (t - lastPush > 300) { lastPush = t; setCounts({ ...tally }); }
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduce || !visible || document.hidden) return;
      running = true; last = 0;
      raf = requestAnimationFrame(frame);
    }
    function stop() { running = false; cancelAnimationFrame(raf); }

    resize();
    if (reduce) {
      // one still frame of a field that has been running for a while
      for (let i = 0; i < 600; i++) { if (mode === "exposure") stepExposure(1 / 30); else stepTriage(1 / 30, i * 33); }
      ctx.clearRect(0, 0, W, H);
      if (mode === "exposure") drawExposure(0); else drawTriage(0);
      setCounts({ ...tally });
    } else {
      // pre-warm so the first frame is already full of traffic
      for (let i = 0; i < 540; i++) { if (mode === "exposure") stepExposure(1 / 30); else stepTriage(1 / 30, performance.now() - (540 - i) * 33); }
      start();
    }

    const ro = new ResizeObserver(() => { resize(); if (reduce) { ctx.clearRect(0, 0, W, H); if (mode === "exposure") drawExposure(0); else drawTriage(0); } });
    ro.observe(wrap);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else stop(); }, { threshold: 0.01 });
    io.observe(wrap);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    const onMove = (e) => { const r = canvas.getBoundingClientRect(); pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; };
    const onLeave = () => { pointer.x = -1e4; pointer.y = -1e4; };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      stop(); ro.disconnect(); io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [mode, setCounts]);

  const labels = mode === "exposure"
    ? [["hosts discovered", counts.events], ["services", counts.alerts], ["findings", counts.cases], ["actively exploited", counts.benign]]
    : [["events seen", counts.events], ["alerts raised", counts.alerts], ["cases opened", counts.cases], ["closed as benign", counts.benign]];

  return (
    <div ref={wrapRef} className={`cy-field ${className}`}>
      <canvas ref={canvasRef} aria-hidden="true" className="cy-field-canvas" />
      <dl className="cy-tally" aria-label={mode === "exposure" ? "Live tally of the scan animation" : "Live tally of the triage animation"}>
        {labels.map(([k, v]) => (
          <div key={k}><dt>{k}</dt><dd>{v.toLocaleString("en-US")}</dd></div>
        ))}
      </dl>
    </div>
  );
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
