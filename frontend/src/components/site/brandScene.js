/*
  The Infovion brand scene, drawn live on a canvas at the screen's own resolution.

  It is the approved brand animation (videos/infovion-web-bg in the app repo) rebuilt for the
  browser, so it stays sharp on every screen instead of being a stretched, compressed video:

  - the official logo, split into its own pixels (ring, braces, the letters of INFOVION), is
    drawn from those image layers and never redrawn: at rest they rebuild the official logo;
  - the ring draws on, the braces open, the name opens letter by letter, then a burst of light
    and sparks leaves the ring as it closes;
  - a light travels the ring, the name catches a shine, soft pulses breathe out;
  - glitter twinkles and sparks drift over the whole screen, moving with the page as it scrolls.

  createBrandScene(canvas, { intro }) → { setVeil(0..1), destroy() }
*/

const A = "/brand/scene/";
const LW = 462;
const LH = 352;
const SX = 462 / 342;
const SY = 352 / 261;
const TAU = Math.PI * 2;
// The orbit measured on the official file, scaled to the layer size
const ORB = { cx: 172.358 * SX, cy: 107.239 * SY, rx: 167.77 * SX, ry: 49.375 * SY, rot: (-3.7186 * Math.PI) / 180 };
const COS = Math.cos(ORB.rot);
const SIN = Math.sin(ORB.rot);
const START_TIP = [150 * SX, 60 * SY];
const LETTER_CX = [[66, 77], [80, 111], [114, 133], [136, 167], [168, 197], [198, 208], [212, 241], [244, 275]].map(([a, b]) => ((a + b) / 2) * SX);
const WORD_CX = 170.5 * SX;
const BRACE_L = [113 * SX, 107 * SY];
const BRACE_R = [222 * SX, 107 * SY];
const PAD = 54; // the ring halo image extends 54 px around the logo box

// Timeline (seconds): ring draws on t1→t2, then the light keeps circling once per LAP
const T1 = 0.9;
const T2 = 2.9;
const LAP = 4;
const SETTLED = 4.4; // everything assembled

const clamp01 = (u) => (u < 0 ? 0 : u > 1 ? 1 : u);
const expoOut = (u) => ((u = clamp01(u)), u >= 1 ? 1 : 1 - Math.pow(2, -10 * u));
const smooth = (u) => ((u = clamp01(u)), u * u * (3 - 2 * u));
const frac = (x) => x - Math.floor(x);
const rand = (a, b) => a + Math.random() * (b - a);

function point(theta) {
  const ex = ORB.rx * Math.cos(theta);
  const ey = ORB.ry * Math.sin(theta);
  return { x: ORB.cx + COS * ex - SIN * ey, y: ORB.cy + SIN * ex + COS * ey, front: 0.5 + 0.5 * Math.sin(theta) };
}
// Degrees clockwise from "up" of a logo-local point around the orbit centre (CSS conic convention)
const angleOf = (p) => ((Math.atan2(p.x - ORB.cx, -(p.y - ORB.cy)) * 180) / Math.PI + 360) % 360;
const THETA0 = (() => {
  const dx = START_TIP[0] - ORB.cx;
  const dy = START_TIP[1] - ORB.cy;
  return Math.atan2((-SIN * dx + COS * dy) / ORB.ry, (COS * dx + SIN * dy) / ORB.rx);
})();
const PHI0 = angleOf(point(THETA0));
const thetaAt = (dist) => THETA0 - TAU * dist;
const sweptDeg = (lap) => (lap <= 0 ? 0 : lap >= 0.9995 ? 360 : (PHI0 - angleOf(point(thetaAt(lap))) + 360) % 360);
function cometDist(t) {
  if (t < T1) return 0;
  if (t < T2) {
    const u = (t - T1) / (T2 - T1);
    return -1.5 * u * u * u + 2.5 * u * u; // ignite, whoosh, settle into lap speed
  }
  return 1 + (t - T2) / LAP;
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

const canvas2d = (w, h) => {
  const c = document.createElement("canvas");
  c.width = Math.max(1, Math.ceil(w));
  c.height = Math.max(1, Math.ceil(h));
  return c;
};

/** A soft round sprite: [stop, r, g, b, a] list → canvas. */
function sprite(size, stops) {
  const c = canvas2d(size, size);
  const g = c.getContext("2d");
  const grd = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  stops.forEach(([s, r, gg, b, a]) => grd.addColorStop(s, `rgba(${r},${gg},${b},${a})`));
  g.fillStyle = grd;
  g.fillRect(0, 0, size, size);
  return c;
}

/** A smooth glow texture, dithered so it never shows bands on dark screens. */
function glowTexture(size, stops) {
  const c = canvas2d(size, size);
  const g = c.getContext("2d");
  const img = g.createImageData(size, size);
  const d = img.data;
  const r0 = size / 2;
  const at = (u) => {
    for (let i = 1; i < stops.length; i++) {
      if (u <= stops[i][0]) {
        const [u0, ...c0] = stops[i - 1];
        const [u1, ...c1] = stops[i];
        const k = (u - u0) / (u1 - u0 || 1);
        return c0.map((v, j) => v + (c1[j] - v) * k);
      }
    }
    return stops[stops.length - 1].slice(1);
  };
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = Math.hypot(x + 0.5 - r0, y + 0.5 - r0) / r0;
      const [r, gg, b] = at(Math.min(1, u));
      const n = Math.random() - 0.5;
      const o = (y * size + x) * 4;
      d[o] = r + n;
      d[o + 1] = gg + n;
      d[o + 2] = b + n;
      d[o + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  return c;
}

/** Four-point light flare for the brightest glints. */
function flareSprite(size) {
  const c = sprite(size, [
    [0, 255, 255, 255, 1],
    [0.08, 220, 240, 255, 0.9],
    [0.22, 140, 200, 255, 0.25],
    [0.5, 80, 160, 255, 0],
    [1, 0, 0, 0, 0],
  ]);
  const g = c.getContext("2d");
  g.globalCompositeOperation = "lighter";
  const m = size / 2;
  for (const [w, h] of [[size, size * 0.035], [size * 0.035, size]]) {
    const grd = w > h ? g.createLinearGradient(0, m, size, m) : g.createLinearGradient(m, 0, m, size);
    grd.addColorStop(0, "rgba(160,220,255,0)");
    grd.addColorStop(0.5, "rgba(235,248,255,0.9)");
    grd.addColorStop(1, "rgba(160,220,255,0)");
    g.fillStyle = grd;
    g.fillRect(m - w / 2, m - h / 2, w, h);
  }
  return c;
}

export function createBrandScene(canvas, { intro = true } = {}) {
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return null;
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const hasConic = typeof ctx.createConicGradient === "function";
  const hasFilter = "filter" in ctx && (() => {
    const t = canvas2d(1, 1).getContext("2d");
    t.filter = "blur(1px)";
    return t.filter === "blur(1px)";
  })();

  let img = null; // loaded layers
  let W = 0;
  let H = 0;
  let dpr = 1;
  let layout = null; // logo position and offscreen buffers
  let stars = [];
  let sparks = [];
  let particles = [];
  let veil = 0;
  let t = intro && !reduce ? 0 : SETTLED + 0.5;
  let raf = 0;
  let last = 0;
  let fade = intro && !reduce ? 1 : 0; // canvas fade-in when there is no intro
  let lowPower = false;
  let frameTimes = [];
  let burstDone = !(intro && !reduce);
  let nextPulse = Math.max(T2 + 6, t + 3);
  let destroyed = false;
  let scrollY = window.scrollY;

  const DOT = sprite(256, [
    [0, 255, 255, 255, 0.95],
    [0.14, 150, 228, 255, 0.55],
    [0.38, 60, 170, 255, 0.18],
    [0.68, 30, 120, 255, 0],
    [1, 0, 0, 0, 0],
  ]);
  const STAR_SPRITES = [[255, 255, 255], [190, 230, 255], [150, 210, 255], [255, 236, 200]].map(([r, g, b]) =>
    sprite(32, [[0, r, g, b, 1], [0.18, r, g, b, 0.85], [0.42, r, g, b, 0.18], [1, r, g, b, 0]]),
  );
  const SPARK_SPRITES = [[150, 228, 255], [94, 234, 212], [255, 255, 255], [125, 190, 255]].map(([r, g, b]) =>
    sprite(48, [[0, 255, 255, 255, 1], [0.2, r, g, b, 0.95], [0.5, r, g, b, 0.3], [1, r, g, b, 0]]),
  );
  const FLARE = flareSprite(96);
  // Procedural versions of the approved glow textures (same colours, dithered)
  const GLOW_NEAR = glowTexture(384, [[0, 14, 44, 61], [0.3, 5, 21, 23], [0.5, 2, 6, 7], [0.75, 0, 1, 1], [1, 0, 0, 0]]);
  const GLOW_FAR = glowTexture(320, [[0, 4, 14, 16], [0.35, 3, 6, 10], [0.6, 1, 2, 3], [1, 0, 0, 0]]);
  const PULSE = glowTexture(320, [[0, 0, 0, 0], [0.38, 0, 0, 0], [0.5, 14, 52, 72], [0.62, 3, 14, 20], [0.76, 0, 0, 0], [1, 0, 0, 0]]);

  // ── layout ────────────────────────────────────────────────────────────────
  function measure() {
    const rect = canvas.getBoundingClientRect();
    W = Math.max(1, Math.round(rect.width));
    H = Math.max(1, Math.round(rect.height));
    const raw = Math.min(window.devicePixelRatio || 1, 2);
    // Keep the pixel count reasonable on very large screens
    dpr = lowPower ? 1 : Math.min(raw, Math.sqrt(4_200_000 / (W * H)) || raw);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);

    const portrait = H > W * 1.1;
    let logoW;
    let cx;
    let cy;
    if (portrait) {
      logoW = Math.min(W * 0.66, 380);
      cx = W / 2;
      cy = Math.max(64 + (logoW * LH) / LW / 2 + 10, H * 0.24);
    } else if (W < 1024) {
      logoW = Math.min(Math.max(W * 0.34, 260), 420);
      cx = W * 0.72;
      cy = H * 0.46;
    } else {
      logoW = Math.min(Math.max(W * 0.3, 360), 620);
      cx = W * 0.745;
      cy = H * 0.47;
    }
    const k = logoW / LW;
    layout = { k, cx, cy, left: cx - (LW * k) / 2, top: cy - (LH * k) / 2, portrait };
    if (img) buildBuffers();

    // Glitter over the whole screen (more on bigger screens)
    const density = (W * H) / (1440 * 900);
    const nStars = Math.round(Math.min(560, Math.max(130, 330 * density)) * (lowPower ? 0.6 : 1));
    stars = Array.from({ length: nStars }, () => {
      const glint = Math.random() < 0.07;
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        z: rand(0.15, 1), // depth: nearer stars are bigger and move more with the scroll
        r: glint ? rand(1.4, 2.4) : rand(0.5, 1.6),
        a: glint ? rand(0.55, 0.9) : rand(0.18, 0.75),
        w: rand(0.35, 1.6),
        ph: rand(0, TAU),
        c: Math.random() < 0.55 ? 0 : Math.random() < 0.7 ? 1 : Math.random() < 0.7 ? 2 : 3,
        glint,
      };
    });
    const nSparks = Math.round(Math.min(90, Math.max(26, 54 * density)) * (lowPower ? 0.6 : 1));
    sparks = Array.from({ length: nSparks }, (_, i) => ({
      x: rand(0.02, 0.98),
      y: Math.random(),
      size: rand(2.2, 5),
      travel: rand(0.35, 0.9),
      speed: rand(1 / 14, 1 / 7),
      ph: Math.random(),
      sway: rand(8, 26),
      swayPh: Math.random(),
      o: rand(0.35, 0.9),
      c: i % SPARK_SPRITES.length,
    }));
  }

  /** Offscreen buffers at the logo's on-screen size (rebuilt on resize). */
  function buildBuffers() {
    const s = layout.k * dpr;
    const w = LW * s;
    const h = LH * s;
    // The official ring with its soft glow of its own colour
    const ringGlow = canvas2d(w + 2 * PAD * s, h + 2 * PAD * s);
    const g = ringGlow.getContext("2d");
    g.imageSmoothingQuality = "high";
    g.setTransform(s, 0, 0, s, PAD * s, PAD * s);
    g.shadowColor = "rgba(30,140,255,0.45)";
    g.shadowBlur = 14 * s;
    g.drawImage(img.ring, 0, 0, LW, LH);
    g.shadowColor = "rgba(56,182,255,0.6)";
    g.shadowBlur = 4 * s;
    g.drawImage(img.ring, 0, 0, LW, LH);
    g.shadowColor = "transparent";
    g.drawImage(img.ring, 0, 0, LW, LH);
    // Braces and name at rest, scaled once: drawn as one image after the opening
    const rest = canvas2d(w, h);
    const r = rest.getContext("2d");
    r.imageSmoothingQuality = "high";
    for (const layer of [img.braceL, img.braceR, ...img.letters]) r.drawImage(layer, 0, 0, w, h);
    layout.s = s;
    layout.ringGlow = ringGlow;
    layout.rest = rest;
    layout.tmpRing = canvas2d(w + 2 * PAD * s, h + 2 * PAD * s);
    layout.tmpHalo = canvas2d((LW + 2 * PAD) * s, (LH + 2 * PAD) * s);
    layout.tmpWord = canvas2d(w, h);
    for (const c of [layout.tmpRing, layout.tmpHalo, layout.tmpWord]) c.getContext("2d").imageSmoothingQuality = "high";
  }

  // ── drawing helpers ───────────────────────────────────────────────────────
  // CSS "conic-gradient(from F deg at x y, …)" → canvas
  const conic = (g, fromDeg, x, y) => g.createConicGradient(((fromDeg - 90) * Math.PI) / 180, x, y);

  function drawLogoLayer(image, alpha, { dx = 0, dy = 0, scale = 1, ox = 0, oy = 0, blur = 0, bright = 1 } = {}) {
    if (alpha <= 0.002) return;
    const { s, left, top } = layout;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.setTransform(s, 0, 0, s, left * dpr, top * dpr);
    if (dx || dy || scale !== 1) {
      ctx.translate(ox + dx, oy + dy);
      ctx.scale(scale, scale);
      ctx.translate(-ox, -oy);
    }
    // The soft focus while a piece settles is a GPU filter; phones and slow devices skip it
    if (hasFilter && !lowPower && W >= 768 && (blur > 0.05 || bright !== 1)) ctx.filter = `${blur > 0.05 ? `blur(${(blur * s).toFixed(2)}px) ` : ""}brightness(${bright.toFixed(3)})`;
    ctx.drawImage(image, 0, 0, LW, LH);
    ctx.restore();
  }

  function emitBurst(count, strength) {
    const { k, left, top } = layout;
    for (let i = 0; i < count; i++) {
      const th = Math.random() * TAU;
      const p = point(th);
      const x = left + p.x * k;
      const y = top + p.y * k;
      // outward from the orbit centre, flattened like the ring itself
      const dx = p.x - ORB.cx;
      const dy = (p.y - ORB.cy) * 2.6;
      const len = Math.hypot(dx, dy) || 1;
      const sp = rand(110, 460) * strength * Math.max(0.6, k);
      particles.push({
        x,
        y,
        vx: (dx / len) * sp + rand(-30, 30),
        vy: (dy / len) * sp * 0.75 + rand(-40, 20),
        life: rand(1.0, 2.3),
        age: 0,
        size: rand(1.1, 3.1),
        c: Math.random() < 0.7 ? 0 : 2,
        front: p.front,
      });
    }
  }

  // ── frame ─────────────────────────────────────────────────────────────────
  function render(dt) {
    const { k, left, top, s, portrait } = layout;
    const G = clamp01(1 - veil) * fade; // logo and glow strength (dims as the page scrolls)
    const starA = clamp01(1 - veil * 0.32) * fade;
    const ox = left * dpr;
    const oy = top * dpr;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.imageSmoothingQuality = "high";
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#000105";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const dist = cometDist(t);
    const p = point(thetaAt(dist));
    const phiHead = angleOf(p);
    const cometEnv = smooth((t - T1 + 0.15) / 0.35);
    const sparkEnv = smooth((t - 2.4) / 1.2);
    const ignite = smooth((t - 0.55) / 0.6) * (1 - 0.22 * smooth((t - 1.3) / 1.0));
    const flash = t >= T2 ? Math.exp(-(t - T2) * 3.2) * 0.45 : 0;
    const logoGlow = ignite * 1.22 + flash;
    const breathe = Math.sin((TAU * t) / LAP);

    // Glows behind the mark (additive)
    const lcx = (left + (LW * k) / 2) * dpr;
    const lcy = (top + (LH * k) / 2) * dpr;
    ctx.globalCompositeOperation = "lighter";
    const far = 2400 * k * dpr;
    const near = 1300 * k * dpr;
    ctx.globalAlpha = clamp01(logoGlow * (0.82 + 0.16 * Math.sin((TAU * t) / 8 - Math.PI / 2))) * G;
    ctx.drawImage(GLOW_FAR, lcx - far / 2, lcy - far / 2, far, far);
    let nearO = logoGlow * (0.84 + 0.12 * breathe + 0.14 * p.front * cometEnv) * G;
    while (nearO > 0.002) {
      ctx.globalAlpha = Math.min(1, nearO);
      ctx.drawImage(GLOW_NEAR, lcx - near / 2, lcy - near / 2, near, near);
      nearO -= 1;
    }

    // Pulses breathing out from the orbit
    const ocx = (left + ORB.cx * k) * dpr;
    const ocy = (top + ORB.cy * k) * dpr;
    const pulse = (at, dur, s0, s1, peak, squash = 1) => {
      const u = (t - at) / dur;
      if (u <= 0 || u >= 1) return;
      const sc = (s0 + (s1 - s0) * expoOut(u)) * 1400 * k * dpr;
      ctx.globalAlpha = peak * Math.pow(1 - u, 1.6) * smooth(u * 6) * G;
      ctx.drawImage(PULSE, ocx - sc / 2, ocy - (sc * squash) / 2, sc, sc * squash);
    };
    pulse(T2 - 0.05, 1.5, 0.3, 1.5, 0.6);
    pulse(T1 - 0.1, 0.9, 0.08, 0.5, 0.35);
    pulse(T2 - 0.02, 1.9, 0.35, 2.3, 0.75, 0.32); // shockwave in the plane of the ring
    if (t > T2 + 4) {
      const period = 8;
      const last0 = T2 + 6 + Math.floor((t - T2 - 6) / period) * period;
      pulse(last0, 1.6, 0.3, 1.45, 0.42);
    }

    // Reading side: darker where the headline sits
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    const sc = portrait
      ? ctx.createLinearGradient(0, 0, 0, canvas.height)
      : ctx.createLinearGradient(0, 0, canvas.width, 0);
    if (portrait) {
      sc.addColorStop(0.3, "rgba(0,1,5,0)");
      sc.addColorStop(0.52, "rgba(0,1,5,0.5)");
      sc.addColorStop(0.75, "rgba(0,1,5,0.8)");
      sc.addColorStop(1, "rgba(0,1,5,0.85)");
    } else {
      sc.addColorStop(0, "rgba(0,1,5,0.8)");
      sc.addColorStop(0.38, "rgba(0,1,5,0.55)");
      sc.addColorStop(0.6, "rgba(0,1,5,0.1)");
      sc.addColorStop(0.72, "rgba(0,1,5,0)");
    }
    ctx.fillStyle = sc;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // The orbit: drawn on with the light, then whole
    const ringBox = layout.ringGlow;
    const pad = PAD * s;
    if (t >= T1 && G > 0.002) {
      let ring = ringBox;
      if (t < T2 && hasConic) {
        const S = sweptDeg(dist);
        if (S < 360) {
          const tg = layout.tmpRing.getContext("2d");
          tg.globalCompositeOperation = "source-over";
          tg.setTransform(1, 0, 0, 1, 0, 0);
          tg.clearRect(0, 0, layout.tmpRing.width, layout.tmpRing.height);
          tg.drawImage(ringBox, 0, 0);
          tg.globalCompositeOperation = "destination-in";
          const m = conic(tg, phiHead, pad + ORB.cx * s, pad + ORB.cy * s);
          m.addColorStop(0, "rgba(0,0,0,0)");
          m.addColorStop(2 / 360, "rgba(0,0,0,1)");
          m.addColorStop(Math.max(2.1, S) / 360, "rgba(0,0,0,1)");
          m.addColorStop(Math.min(1, (S + 0.5) / 360), "rgba(0,0,0,0)");
          tg.fillStyle = m;
          tg.fillRect(0, 0, layout.tmpRing.width, layout.tmpRing.height);
          ring = layout.tmpRing;
        }
      }
      ctx.globalAlpha = G;
      ctx.drawImage(ring, ox - pad, oy - pad);
    }

    // Light travelling the orbit
    const pen = t >= T1 && t < T2 ? 1.25 : 1;
    const I = cometEnv * (0.5 + 0.5 * p.front) * pen;
    if (hasConic && I > 0.01 && G > 0.002) {
      const F = phiHead - 3;
      // bloom around the ring
      const hg = layout.tmpHalo.getContext("2d");
      hg.globalCompositeOperation = "source-over";
      hg.setTransform(1, 0, 0, 1, 0, 0);
      hg.clearRect(0, 0, layout.tmpHalo.width, layout.tmpHalo.height);
      const b = conic(hg, F - 2, (ORB.cx + PAD) * s, (ORB.cy + PAD) * s);
      b.addColorStop(0, "rgba(120,210,255,0)");
      b.addColorStop(5 / 360, `rgba(120,215,255,${0.55 * I})`);
      b.addColorStop(30 / 360, `rgba(60,160,255,${0.22 * I})`);
      b.addColorStop(70 / 360, "rgba(40,120,255,0)");
      b.addColorStop(1, "rgba(0,0,0,0)");
      hg.fillStyle = b;
      hg.fillRect(0, 0, layout.tmpHalo.width, layout.tmpHalo.height);
      hg.globalCompositeOperation = "destination-in";
      hg.drawImage(img.halo, 0, 0, layout.tmpHalo.width, layout.tmpHalo.height);
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = G;
      ctx.drawImage(layout.tmpHalo, ox - pad, oy - pad);

      // light on the ring's own pixels
      const rg = layout.tmpRing.getContext("2d");
      rg.globalCompositeOperation = "source-over";
      rg.setTransform(1, 0, 0, 1, 0, 0);
      rg.clearRect(0, 0, layout.tmpRing.width, layout.tmpRing.height);
      const c = conic(rg, F, pad + ORB.cx * s, pad + ORB.cy * s);
      c.addColorStop(0, "rgba(255,255,255,0)");
      c.addColorStop(3 / 360, `rgba(255,255,255,${Math.min(1, I)})`);
      c.addColorStop(10 / 360, `rgba(160,232,255,${0.85 * I})`);
      c.addColorStop(34 / 360, `rgba(70,180,255,${0.35 * I})`);
      c.addColorStop(80 / 360, "rgba(40,140,255,0)");
      c.addColorStop(1, "rgba(0,0,0,0)");
      rg.fillStyle = c;
      rg.fillRect(0, 0, layout.tmpRing.width, layout.tmpRing.height);
      rg.globalCompositeOperation = "destination-in";
      rg.setTransform(s, 0, 0, s, pad, pad);
      rg.drawImage(img.ring, 0, 0, LW, LH);
      ctx.drawImage(layout.tmpRing, ox - pad, oy - pad);
    }
    if (I > 0.01 && G > 0.002) {
      const d = 200 * k * dpr * (0.55 + 0.6 * p.front);
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = Math.min(1, cometEnv * (0.3 + 0.55 * p.front) * pen) * G;
      ctx.drawImage(DOT, ox + p.x * s - d / 2, oy + p.y * s - d / 2, d, d);
    }

    ctx.globalCompositeOperation = "source-over";
    if (t >= SETTLED) {
      // Opening finished: braces and name are the cached image at rest
      ctx.globalAlpha = G;
      if (G > 0.002) ctx.drawImage(layout.rest, ox, oy);
    } else {
      // Braces open outward from the centre
      const bo = expoOut((t - 0.2) / 1.0);
      const bShift = 46 * (1 - bo);
      const bAlpha = smooth(((t - 0.2) / 1.0) * 1.6) * G;
      const bBlur = 12 * (1 - bo);
      const bScale = 1 - 0.08 * (1 - bo);
      const bBright = 1 + bBlur / 10;
      drawLogoLayer(img.braceL, bAlpha, { dx: bShift, scale: bScale, ox: BRACE_L[0], oy: BRACE_L[1], blur: bBlur, bright: bBright });
      drawLogoLayer(img.braceR, bAlpha, { dx: -bShift, scale: bScale, ox: BRACE_R[0], oy: BRACE_R[1], blur: bBlur, bright: bBright });

      // INFOVION opens from the centre outward, letter by letter
      img.letters.forEach((lt, n) => {
        const off = LETTER_CX[n] - WORD_CX;
        const dn = Math.abs(off) / (105 * SX);
        const u = (t - 2.25 - 0.38 * dn) / 1.1;
        const kk = 1 - expoOut(u);
        drawLogoLayer(lt, smooth(u * 1.8) * G, { dx: -off * 0.55 * kk, dy: 14 * kk, blur: 9 * kk, bright: 1 + 1.4 * kk });
      });
    }

    // A shine across the name now and then
    const sheenAt = (at) => {
      const u = clamp01((t - at) / 1.1);
      return u <= 0 || u >= 1 ? null : 1 - smooth(u);
    };
    let sp = sheenAt(3.75);
    if (sp === null && t > 6) sp = sheenAt(3.75 + Math.floor((t - 3.75) / 9) * 9);
    if (sp !== null && G > 0.002) {
      const wg = layout.tmpWord.getContext("2d");
      const ww = layout.tmpWord.width;
      const wh = layout.tmpWord.height;
      wg.globalCompositeOperation = "source-over";
      wg.setTransform(1, 0, 0, 1, 0, 0);
      wg.clearRect(0, 0, ww, wh);
      const cxs = (-0.6 + 2.2 * (1 - sp)) * ww; // band position travels left → right
      const lg = wg.createLinearGradient(cxs - ww * 0.18, 0, cxs + ww * 0.18, wh * 0.2);
      lg.addColorStop(0, "rgba(255,255,255,0)");
      lg.addColorStop(0.5, "rgba(255,255,255,0.95)");
      lg.addColorStop(0.62, "rgba(160,235,255,0)");
      lg.addColorStop(1, "rgba(255,255,255,0)");
      wg.fillStyle = lg;
      wg.fillRect(0, 0, ww, wh);
      wg.globalCompositeOperation = "destination-in";
      wg.drawImage(img.wordmark, 0, 0, ww, wh);
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = 0.9 * G;
      ctx.drawImage(layout.tmpWord, ox, oy);
    }

    // Burst when the orbit closes, smaller ones with each later pulse
    if (!burstDone && t >= T2 - 0.02) {
      burstDone = true;
      const density = Math.sqrt((W * H) / (1440 * 900));
      emitBurst(Math.round(Math.min(190, Math.max(90, 160 * density)) * (lowPower ? 0.6 : 1)), 1);
    }
    if (t >= nextPulse) {
      emitBurst(lowPower ? 10 : 22, 0.55);
      nextPulse += 8;
    }
    if (particles.length) {
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      const drag = Math.exp(-2.4 * dt);
      particles = particles.filter((q) => {
        q.age += dt;
        if (q.age >= q.life) return false;
        q.vx *= drag;
        q.vy = q.vy * drag - 14 * dt * Math.max(0.6, k); // a gentle lift
        q.x += q.vx * dt;
        q.y += q.vy * dt;
        const life = 1 - q.age / q.life;
        const a = Math.pow(life, 1.4) * smooth(q.age / 0.08) * (0.55 + 0.45 * q.front) * G;
        const speed = Math.hypot(q.vx, q.vy);
        // streak along the direction of travel while it is fast
        if (speed > 40) {
          const len = Math.min(0.06, 18 / speed);
          ctx.globalAlpha = a * 0.7;
          ctx.strokeStyle = q.c === 2 ? "rgb(235,248,255)" : "rgb(150,228,255)";
          ctx.lineWidth = q.size * 0.7 * dpr;
          ctx.beginPath();
          ctx.moveTo(q.x * dpr, q.y * dpr);
          ctx.lineTo((q.x - q.vx * len) * dpr, (q.y - q.vy * len) * dpr);
          ctx.stroke();
        }
        const d = q.size * 4.5 * dpr;
        ctx.globalAlpha = a;
        ctx.drawImage(SPARK_SPRITES[q.c], q.x * dpr - d / 2, q.y * dpr - d / 2, d, d);
        return true;
      });
    }

    // Glitter over the whole screen; it moves a little with the page as you scroll
    ctx.globalCompositeOperation = "lighter";
    const tw = t;
    for (let i = 0; i < stars.length; i++) {
      const st = stars[i];
      const y = ((((st.y - scrollY * st.z * 0.22) % H) + H) % H);
      const pulseV = 0.5 + 0.5 * Math.sin(st.ph + tw * st.w * TAU * 0.35);
      const tws = 0.3 + 0.7 * pulseV * pulseV * pulseV;
      const a = st.a * tws * starA;
      if (a < 0.015) continue;
      const d = st.r * 5 * (0.6 + 0.4 * st.z) * dpr;
      ctx.globalAlpha = Math.min(1, a);
      ctx.drawImage(STAR_SPRITES[st.c], st.x * dpr - d / 2, y * dpr - d / 2, d, d);
      if (st.glint && tws > 0.78) {
        const f = (tws - 0.78) / 0.22;
        const fd = (16 + 22 * st.z) * dpr * (0.6 + 0.4 * f);
        ctx.globalAlpha = Math.min(1, f * st.a * starA);
        ctx.drawImage(FLARE, st.x * dpr - fd / 2, y * dpr - fd / 2, fd, fd);
      }
    }

    // Sparks drifting up across the screen
    for (let i = 0; i < sparks.length; i++) {
      const q = sparks[i];
      const u = frac(t * q.speed + q.ph);
      const yy = (q.y + q.travel * (0.5 - u)) * H - scrollY * 0.12;
      const y = ((yy % H) + H) % H;
      const x = q.x * W + q.sway * Math.sin(TAU * (u * 1.5 + q.swayPh));
      const a = sparkEnv * q.o * Math.pow(Math.sin(Math.PI * u), 1.4) * starA;
      if (a < 0.015) continue;
      const d = q.size * 3 * dpr;
      ctx.globalAlpha = a;
      ctx.drawImage(SPARK_SPRITES[q.c], x * dpr - d / 2, y * dpr - d / 2, d, d);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }

  function frame(now) {
    if (destroyed) return;
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
    last = now;
    t += dt;
    if (fade < 1) fade = Math.min(1, fade + dt / 0.6);
    render(dt);
    // Lighter scene if this device struggles
    if (!lowPower && t > SETTLED) {
      frameTimes.push(dt);
      if (frameTimes.length >= 90) {
        const avg = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
        frameTimes = [];
        if (avg > 0.028) {
          lowPower = true;
          measure();
        }
      }
    }
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (destroyed || raf || document.hidden) return;
    last = 0;
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    cancelAnimationFrame(raf);
    raf = 0;
  }

  let resizeTimer = 0;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const rect = canvas.getBoundingClientRect();
      if (Math.round(rect.width) === W && Math.round(rect.height) === H) return;
      measure();
      if (reduce && img) render(0);
    }, 120);
  };
  const onVisibility = () => (document.hidden ? stop() : start());
  const onScroll = () => {
    scrollY = window.scrollY;
    if (reduce && img) render(0);
  };

  measure();
  Promise.all([
    loadImage(`${A}ring.png`),
    loadImage(`${A}brace-l.png`),
    loadImage(`${A}brace-r.png`),
    loadImage(`${A}wordmark.png`),
    loadImage(`${A}ring-halo.png`),
    ...Array.from({ length: 8 }, (_, i) => loadImage(`${A}letter-${i}.png`)),
  ])
    .then(([ring, braceL, braceR, wordmark, halo, ...letters]) => {
      if (destroyed) return;
      img = { ring, braceL, braceR, wordmark, halo, letters };
      buildBuffers();
      if (reduce) {
        fade = 1;
        render(0);
      } else start();
    })
    .catch(() => {});

  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);

  return {
    setVeil(v) {
      veil = clamp01(v);
      if (reduce && img) render(0);
    },
    destroy() {
      destroyed = true;
      stop();
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    },
  };
}
