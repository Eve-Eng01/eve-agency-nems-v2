/* Authored sample deliverables. Each piece draws into a 1200x750 box at time t (seconds),
   so one source feeds the ring textures, case-study frames and service previews. */

export const ART_W = 1200;
export const ART_H = 750;

export type ArtId =
  | "ai-app" | "eve-home" | "website" | "brand" | "logo" | "campaign" | "motion" | "ugc" | "roadmap"
  | "dash" | "eve-events" | "palm-detail";

type C = CanvasRenderingContext2D;

let family = "sans-serif";

/* Real screens of the live product. Loaded once, drawn like any other piece. */
const SCREENS: Partial<Record<ArtId, { src: string; img?: HTMLImageElement }>> = {
  "eve-home": { src: "/work/eve-home.jpg" },
  "eve-events": { src: "/work/eve-events.jpg" },
};
export const artImagesReady = () => Promise.all(Object.values(SCREENS).map((s) => new Promise<void>((res) => {
  if (!s || s.img) return res();
  const i = new Image();
  i.onload = () => { s.img = i; res(); };
  i.onerror = () => res();
  i.src = s.src;
})));
export function setArtFamily(f: string) { if (f) family = f; }

export async function loadArtFonts() {
  if (typeof document === "undefined") return;
  const css = getComputedStyle(document.documentElement).getPropertyValue("--font-sans").trim();
  if (css) setArtFamily(css);
  try {
    await Promise.all(["400", "500", "600", "700"].map((w) => document.fonts.load(`${w} 20px ${family}`)));
  } catch { /* the fallback face still draws */ }
  await artImagesReady();
}

const rr = (c: C, x: number, y: number, w: number, h: number, r: number) => {
  c.beginPath();
  c.roundRect(x, y, w, h, r);
};
const box = (c: C, x: number, y: number, w: number, h: number, r: number, fill: string) => {
  rr(c, x, y, w, h, r);
  c.fillStyle = fill;
  c.fill();
};
const line = (c: C, x: number, y: number, w: number, h: number, fill: string) => box(c, x, y, w, h, h / 2, fill);
const txt = (c: C, s: string, x: number, y: number, size: number, weight: number, fill: string, align: CanvasTextAlign = "left", track = 0) => {
  c.font = `${weight} ${size}px ${family}`;
  c.fillStyle = fill;
  c.textAlign = align;
  c.textBaseline = "alphabetic";
  (c as C & { letterSpacing: string }).letterSpacing = `${track}px`;
  c.fillText(s, x, y);
  (c as C & { letterSpacing: string }).letterSpacing = "0px";
};
const dot = (c: C, x: number, y: number, r: number, fill: string) => {
  c.beginPath();
  c.arc(x, y, r, 0, Math.PI * 2);
  c.fillStyle = fill;
  c.fill();
};
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (v: number) => 1 - Math.pow(1 - clamp(v), 3);
const loop = (t: number, d: number) => (t % d) / d;
/* Progress of a window inside a loop. */
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

/* ---- Zuriko: invoice review screen ---- */
function aiApp(c: C, t: number) {
  const ink = "#12261f", green = "#0f7a5a", mint = "#e6f4ee";
  box(c, 0, 0, ART_W, ART_H, 0, "#f6f5f0");
  box(c, 0, 0, ART_W, 68, 0, ink);
  dot(c, 44, 34, 12, "#59e0ae");
  txt(c, "Zuriko", 66, 43, 25, 600, "#fff");
  txt(c, "Review", 930, 42, 20, 500, "#ffffffb0");
  txt(c, "Invoices 214", 1022, 42, 20, 500, "#fff");
  // The invoice
  c.save();
  c.translate(48, 104);
  c.rotate(-0.012);
  box(c, 0, 0, 500, 610, 8, "#fff");
  txt(c, "INVOICE", 32, 56, 26, 700, "#222");
  txt(c, "Harlow Packaging Ltd", 32, 94, 20, 500, "#444");
  txt(c, "No. 00482", 468, 56, 19, 500, "#666", "right");
  txt(c, "14 Oct", 468, 88, 19, 400, "#666", "right");
  for (let i = 0; i < 6; i++) {
    const y = 150 + i * 62;
    line(c, 32, y, [210, 170, 240, 150, 190, 220][i], 12, "#d8d8d2");
    line(c, 380, y, 88, 12, "#d8d8d2");
    box(c, 32, y + 28, 436, 1, 0, "#eee");
  }
  txt(c, "Total", 32, 560, 24, 600, "#222");
  txt(c, "$8,420", 468, 560, 28, 700, "#222", "right");
  // Scanner sweep
  const p = loop(t, 3.4);
  const sy = 20 + seg(p, 0, 0.55) * 560;
  if (p < 0.55) { box(c, 8, sy, 484, 3, 1, green); c.globalAlpha = 0.1; box(c, 8, sy - 54, 484, 54, 0, green); c.globalAlpha = 1; }
  c.restore();
  // Fields
  const p2 = loop(t, 3.4);
  const fields: [string, string, boolean][] = [
    ["Supplier", "Harlow Packaging Ltd", false],
    ["Invoice number", "00482", false],
    ["Date", "14 Oct 2026", false],
    ["Account", "Packaging, 5120", true],
    ["Total", "$8,420", false],
  ];
  txt(c, "Read by Zuriko", 600, 138, 30, 600, ink);
  fields.forEach(([l, v, low], i) => {
    const y = 166 + i * 88;
    const on = ease(seg(p2, 0.08 + i * 0.1, 0.2 + i * 0.1));
    box(c, 600, y, 552, 76, 10, low ? "#fff6dd" : "#fff");
    txt(c, l, 620, y + 28, 17, 500, "#667");
    c.globalAlpha = on;
    txt(c, v, 620, y + 58, 23, 600, ink);
    c.globalAlpha = 1;
    if (on > 0.9) {
      box(c, 1020, y + 22, 112, 32, 16, low ? "#f4c542" : mint);
      txt(c, low ? "Check this" : "Confident", 1076, y + 44, 15, 600, low ? "#4a3900" : green, "center");
    }
  });
  box(c, 600, 620, 552, 72, 12, green);
  txt(c, "Approve and post to books", 876, 666, 24, 600, "#fff", "center");
}

/* ---- Zuriko: accuracy dashboard ---- */
function dash(c: C, t: number) {
  const ink = "#12261f", green = "#0f7a5a";
  box(c, 0, 0, ART_W, ART_H, 0, ink);
  txt(c, "This month", 60, 84, 24, 500, "#ffffffa0");
  txt(c, "91%", 60, 214, 140, 700, "#59e0ae", "left", -6);
  txt(c, "posted with no edits", 60, 260, 26, 500, "#fff");
  const bars = [52, 58, 64, 61, 70, 74, 72, 79, 83, 85, 88, 91];
  const p = ease(loop(t, 3.6) * 2.4);
  const bw = 58, gap = 26, base = 680;
  bars.forEach((b, i) => {
    const x = 60 + i * (bw + gap);
    const h = (b / 100) * 360 * clamp(p * 1.5 - i * 0.04);
    box(c, x, base - h, bw, h, 6, i === bars.length - 1 ? "#59e0ae" : green);
  });
  box(c, 800, 60, 340, 160, 16, "#ffffff14");
  txt(c, "Hours saved", 828, 108, 22, 500, "#ffffffb0");
  txt(c, "4.5 a week", 828, 170, 44, 700, "#fff");
}

/* ---- Palmgate: lettings website ---- */
const scene = (c: C, x: number, y: number, w: number, h: number, sky: string, wall: string) => {
  c.save();
  rr(c, x, y, w, h, 12);
  c.clip();
  box(c, x, y, w, h, 0, sky);
  dot(c, x + w * 0.8, y + h * 0.26, h * 0.12, "#ffd98c");
  box(c, x, y + h * 0.82, w, h * 0.18, 0, "#2f5d43");
  box(c, x + w * 0.2, y + h * 0.34, w * 0.5, h * 0.5, 0, wall);
  box(c, x + w * 0.16, y + h * 0.28, w * 0.58, h * 0.07, 0, "#1d3a2b");
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 2; j++) box(c, x + w * (0.25 + i * 0.15), y + h * (0.42 + j * 0.19), w * 0.1, h * 0.12, 2, "#1d3a2bd0");
  }
  // Palm
  const px = x + w * 0.88, py = y + h * 0.84;
  c.strokeStyle = "#1d3a2b";
  c.lineWidth = w * 0.012;
  c.beginPath(); c.moveTo(px, py); c.quadraticCurveTo(px + w * 0.02, py - h * 0.25, px - w * 0.02, py - h * 0.48); c.stroke();
  for (let i = 0; i < 7; i++) {
    const a = -Math.PI + (i / 6) * Math.PI;
    c.beginPath();
    c.moveTo(px - w * 0.02, py - h * 0.48);
    c.quadraticCurveTo(px - w * 0.02 + Math.cos(a) * w * 0.08, py - h * 0.56 + Math.sin(a) * h * 0.1, px - w * 0.02 + Math.cos(a) * w * 0.14, py - h * 0.42 + Math.sin(a) * h * 0.12);
    c.stroke();
  }
  c.restore();
};
function website(c: C, t: number) {
  const ink = "#143226", paper = "#f7f3e8", clay = "#c8552b";
  box(c, 0, 0, ART_W, ART_H, 0, paper);
  txt(c, "Palmgate", 56, 62, 30, 700, ink, "left", -0.8);
  ["Rent", "Sell", "Viewings"].forEach((s, i) => txt(c, s, 740 + i * 90, 60, 20, 500, ink));
  box(c, 1050, 28, 106, 46, 23, ink);
  txt(c, "Book", 1103, 59, 19, 600, "#fff", "center");
  txt(c, "Homes to rent,", 56, 170, 72, 700, ink, "left", -3);
  txt(c, "full price shown", 56, 244, 72, 700, ink, "left", -3);
  // Search
  box(c, 56, 280, 640, 66, 33, "#fff");
  const q = "3 bed, near the park";
  const n = Math.floor(seg(loop(t, 3.6), 0, 0.5) * q.length);
  txt(c, q.slice(0, n), 86, 322, 22, 500, ink);
  box(c, 590, 290, 96, 46, 23, clay);
  txt(c, "Find", 638, 321, 19, 600, "#fff", "center");
  scene(c, 730, 100, 414, 246, "#f2b98a", "#f7ecd9");
  const homes = [
    ["3 bed flat", "$2,400 a month", "#bcd9e8", "#ffffff"],
    ["2 bed terrace", "$1,850 a month", "#f2c9a5", "#e8dcc5"],
    ["4 bed duplex", "$3,900 a month", "#c7e3c9", "#f1e7d6"],
  ];
  homes.forEach(([n1, p, s, w], i) => {
    const x = 56 + i * 370;
    const up = 10 * ease(seg(loop(t, 3.6), 0.5 + i * 0.1, 0.7 + i * 0.1));
    box(c, x, 376 - up, 348, 344, 16, "#fff");
    scene(c, x + 14, 390 - up, 320, 196, s, w);
    txt(c, n1, x + 20, 628 - up, 25, 600, ink);
    txt(c, p, x + 20, 668 - up, 23, 700, clay);
    txt(c, "Fees shown", x + 20, 698 - up, 16, 400, "#566");
  });
}

/* ---- Palmgate: a listing and viewing slots ---- */
function palmDetail(c: C, t: number) {
  const ink = "#143226", clay = "#c8552b";
  box(c, 0, 0, ART_W, ART_H, 0, ink);
  scene(c, 48, 48, 640, 654, "#e9a877", "#f7ecd9");
  box(c, 716, 48, 436, 654, 18, "#f7f3e8");
  txt(c, "3 bed flat", 748, 112, 40, 700, ink, "left", -1);
  txt(c, "Cedar Park", 748, 150, 21, 500, "#566");
  [["Monthly rent", "$2,400"], ["Agency fee", "$240"], ["Deposit", "$2,400"]].forEach(([a, b], i) => {
    const y = 200 + i * 44;
    txt(c, a, 748, y, 20, 500, "#445");
    txt(c, b, 1120, y, 21, 600, ink, "right");
  });
  box(c, 748, 312, 372, 1, 0, "#1432262a");
  txt(c, "Pick a viewing", 748, 362, 24, 600, ink);
  const picked = Math.floor(t / 1.1) % 6;
  ["Tue 10:00", "Tue 14:00", "Wed 09:30", "Wed 16:00", "Sat 11:00", "Sat 13:30"].forEach((s, i) => {
    const x = 748 + (i % 2) * 192, y = 384 + Math.floor(i / 2) * 68;
    box(c, x, y, 180, 56, 12, i === picked ? clay : "#fff");
    txt(c, s, x + 90, y + 36, 20, 600, i === picked ? "#fff" : ink, "center");
  });
  box(c, 748, 610, 372, 64, 32, ink);
  txt(c, "Book this viewing", 934, 651, 22, 600, "#fff", "center");
}

/* ---- Ashgrove: brand board ---- */
const leaf = (c: C, x: number, y: number, s: number, fill: string) => {
  c.save();
  c.translate(x, y);
  c.scale(s, s);
  c.fillStyle = fill;
  // Stem and five leaflets
  [-0.9, -0.45, 0, 0.45, 0.9].forEach((a) => {
    c.save();
    c.rotate(a);
    c.beginPath();
    c.moveTo(0, 0);
    c.quadraticCurveTo(22, -46, 0, -92);
    c.quadraticCurveTo(-22, -46, 0, 0);
    c.fill();
    c.restore();
  });
  c.fillRect(-3.5, 0, 7, 40);
  c.restore();
};
const bag = (c: C, x: number, y: number, w: number, h: number, col: string, ink: string, name: string) => {
  box(c, x, y, w, h, 10, col);
  box(c, x, y, w, h * 0.09, 6, "#00000022");
  leaf(c, x + w / 2, y + h * 0.42, w / 240, ink);
  txt(c, "Ashgrove", x + w / 2, y + h * 0.7, w * 0.135, 700, ink, "center", -0.5);
  txt(c, name, x + w / 2, y + h * 0.8, w * 0.07, 500, ink, "center");
};
function brand(c: C, t: number) {
  const kraft = "#cfb28b", coal = "#23201c", cream = "#f2eadc", ember = "#d9502e", moss = "#59693d";
  box(c, 0, 0, ART_W, ART_H, 0, cream);
  box(c, 0, 0, 480, ART_H, 0, coal);
  leaf(c, 240, 330, 2.3, cream);
  txt(c, "Ashgrove", 240, 560, 62, 700, cream, "center", -2);
  txt(c, "Coffee roasters", 240, 604, 24, 400, "#f2eadcb0", "center");
  const lift = (i: number) => 12 * Math.max(0, Math.sin(t * 2 - i * 0.9));
  bag(c, 520, 60 - lift(0), 200, 330, kraft, coal, "Light roast");
  bag(c, 740, 60 - lift(1), 200, 330, ember, cream, "Medium roast");
  bag(c, 960, 60 - lift(2), 200, 330, coal, cream, "Dark roast");
  [kraft, ember, moss, coal].forEach((col, i) => box(c, 520 + i * 162, 420, 150, 130, 10, col));
  txt(c, "Aa", 520, 690, 120, 700, coal, "left", -6);
  txt(c, "Colour by roast,", 760, 640, 30, 600, coal);
  txt(c, "so a barista can spot it", 760, 682, 30, 400, coal);
}

/* ---- Ashgrove: logo construction ---- */
function logo(c: C, t: number) {
  const coal = "#23201c", cream = "#f2eadc", ember = "#d9502e";
  box(c, 0, 0, ART_W, ART_H, 0, cream);
  // Grid
  c.strokeStyle = "#23201c22";
  c.lineWidth = 2;
  for (let i = 0; i <= 12; i++) { c.beginPath(); c.moveTo(i * 100, 0); c.lineTo(i * 100, ART_H); c.stroke(); }
  for (let j = 0; j <= 8; j++) { c.beginPath(); c.moveTo(0, j * 100 - 25); c.lineTo(ART_W, j * 100 - 25); c.stroke(); }
  const p = loop(t, 3.6);
  c.strokeStyle = ember;
  c.lineWidth = 3;
  const ch = ease(seg(p, 0, 0.5));
  [260, 180, 95].forEach((r) => { c.beginPath(); c.arc(600, 400, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ch); c.stroke(); });
  c.beginPath(); c.moveTo(600, 400 + 300 * ch); c.lineTo(600, 400 - 300 * ch); c.stroke();
  c.globalAlpha = ease(seg(p, 0.42, 0.72));
  leaf(c, 600, 440, 3.2, coal);
  c.globalAlpha = 1;
  [[1044, 150, 1.1], [1044, 380, 0.6], [1044, 540, 0.28]].forEach(([x, y, s], i) => {
    c.globalAlpha = ease(seg(p, 0.6 + i * 0.08, 0.76 + i * 0.08));
    leaf(c, x, y, s, coal);
    c.globalAlpha = 1;
  });
  txt(c, "Holds at 12 mm", 1044, 650, 24, 600, coal, "center");
  txt(c, "Ashgrove mark", 60, 90, 34, 700, coal, "left", -1);
}

/* ---- Tolumi: paid social campaign ---- */
function campaign(c: C, t: number) {
  const deep = "#3d1f14", coral = "#ff6a4d", sand = "#ffe3c7", teal = "#0c6e6e", sun = "#ffb627";
  box(c, 0, 0, ART_W, ART_H, 0, deep);
  const bottle = (x: number, y: number, s: number, body: string, cap: string, lab: string) => {
    c.save(); c.translate(x, y); c.scale(s, s);
    box(c, -24, -150, 48, 56, 6, cap);
    box(c, -58, -96, 116, 240, 18, body);
    box(c, -44, -20, 88, 96, 4, lab);
    txt(c, "tolumi", 0, 28, 20, 700, body, "center");
    c.restore();
  };
  const bob = Math.sin(t * 2.2) * 8;
  // Poster 1
  box(c, 36, 36, 552, 678, 16, coral);
  txt(c, "Glow", 64, 164, 128, 700, sand, "left", -6);
  txt(c, "that lasts", 64, 256, 84, 700, sand, "left", -3);
  bottle(420, 480 + bob, 1.32, sand, deep, coral);
  txt(c, "From $19", 64, 672, 30, 600, sand);
  // Poster 2
  box(c, 612, 36, 266, 327, 16, teal);
  bottle(745, 212 - bob, 0.72, sun, deep, teal);
  txt(c, "Shea, not", 634, 325, 24, 600, "#fff");
  // Poster 3
  box(c, 898, 36, 266, 327, 16, sun);
  txt(c, "14", 920, 174, 130, 700, deep, "left", -6);
  txt(c, "day reset", 920, 228, 34, 600, deep);
  txt(c, "Shop the set", 920, 330, 22, 600, deep);
  // Poster 4
  box(c, 612, 387, 552, 327, 16, sand);
  txt(c, "Made for", 640, 472, 58, 700, deep, "left", -2);
  txt(c, "dry skin", 640, 534, 58, 700, deep, "left", -2);
  txt(c, "and long", 640, 596, 58, 700, deep, "left", -2);
  txt(c, "winters.", 640, 658, 58, 700, deep, "left", -2);
  bottle(1060, 570 + bob, 0.74, teal, deep, sand);
}

/* ---- Quillbay: explainer in a motion timeline ---- */
function motion(c: C, t: number) {
  const ink = "#0e1a33", blue = "#2f6bff", sky = "#d9e6ff", amber = "#ffb627";
  const p = loop(t, 3.8);
  box(c, 0, 0, ART_W, ART_H, 0, "#10121a");
  // Stage
  c.save();
  rr(c, 40, 36, 1120, 470, 14); c.clip();
  box(c, 40, 36, 1120, 470, 0, sky);
  c.strokeStyle = ink; c.lineWidth = 9;
  const a: [number, number] = [150, 400], b: [number, number] = [1050, 150];
  c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(420, 400); c.lineTo(420, 180); c.lineTo(b[0], 180); c.stroke();
  c.strokeStyle = blue; c.setLineDash([24, 18]); c.lineDashOffset = -t * 90;
  c.beginPath(); c.moveTo(420, 400); c.lineTo(800, 400); c.lineTo(800, 180); c.stroke();
  c.setLineDash([]);
  box(c, 560, 150, 160, 60, 10, "#ff4d3d");
  txt(c, "Road closed", 640, 188, 20, 700, "#fff", "center");
  // Van
  const q = ease(seg(p, 0, 0.9));
  let x: number, y: number;
  if (q < 0.25) { x = 150 + (q / 0.25) * 270; y = 400; }
  else if (q < 0.62) { x = 420 + ((q - 0.25) / 0.37) * 380; y = 400; }
  else if (q < 0.76) { x = 800; y = 400 - ((q - 0.62) / 0.14) * 220; }
  else { x = 800 + ((q - 0.76) / 0.24) * 250; y = 180; }
  box(c, x - 54, y - 40, 108, 66, 10, ink);
  box(c, x + 14, y - 30, 30, 26, 4, sky);
  dot(c, x - 28, y + 28, 13, amber); dot(c, x + 28, y + 28, 13, amber);
  dot(c, 150, 400, 20, ink); dot(c, 1050, 180, 26, blue);
  txt(c, "Rerouted in 4 seconds", 76, 104, 50, 700, ink, "left", -2);
  c.restore();
  // Timeline
  box(c, 40, 526, 1120, 190, 14, "#1b1f2c");
  ["Van", "Route", "Title", "Sound"].forEach((l, i) => {
    const y = 548 + i * 40;
    txt(c, l, 62, y + 23, 18, 500, "#ffffffa0");
    box(c, 170, y + 6, 960, 26, 6, "#262b3b");
    const clip: [number, number, string][] = [[0, 0.95, blue], [0.22, 0.55, "#59e0ae"], [0.04, 0.36, amber], [0, 1, "#8a93ad"]];
    const [s, w, col] = clip[i];
    box(c, 170 + s * 960, y + 6, w * 960, 26, 6, col);
    [0.2, 0.5].forEach((k) => { c.save(); c.translate(170 + (s + w * k) * 960, y + 19); c.rotate(Math.PI / 4); c.fillStyle = "#10121a"; c.fillRect(-5, -5, 10, 10); c.restore(); });
  });
  const px = 170 + p * 960;
  box(c, px - 1.5, 534, 3, 176, 1, "#fff");
  dot(c, px, 536, 8, "#fff");
}

/* ---- Tolumi: UGC and AI video frames ---- */
function ugc(c: C, t: number) {
  const bg = "#17110e", sand = "#ffe3c7", coral = "#ff6a4d", teal = "#0c6e6e", sun = "#ffb627";
  box(c, 0, 0, ART_W, ART_H, 0, bg);
  const frame = (x: number, ground: string, cap: string, sub: string, i: number, kind: "hand" | "ai" | "shelf") => {
    const w = 350, h = 660, y = 45;
    c.save();
    rr(c, x, y, w, h, 22); c.clip();
    box(c, x, y, w, h, 0, ground);
    const cx = x + w / 2, by = y + 300 + Math.sin(t * 2 + i) * 10;
    if (kind === "hand") {
      // Palm holding the bottle
      box(c, cx - 110, by + 92, 220, 300, 80, "#8a5433");
      box(c, cx - 50, by - 150, 100, 280, 14, sand);
      box(c, cx - 22, by - 200, 44, 50, 6, bg);
      box(c, cx - 38, by - 60, 76, 80, 4, coral);
      for (let f = 0; f < 4; f++) box(c, cx - 78 + f * 40, by + 40, 36, 90, 18, "#6f4228");
    } else if (kind === "ai") {
      const s = 1 + 0.05 * Math.sin(t * 1.4);
      c.save(); c.translate(cx, by); c.scale(s, s);
      for (let r = 0; r < 7; r++) { const a = t * 0.5 + (r * Math.PI * 2) / 7; dot(c, Math.cos(a) * 130, Math.sin(a) * 130, 22 + r * 2, "#ffffff3a"); }
      box(c, -56, -130, 112, 250, 16, sun);
      box(c, -24, -180, 48, 52, 6, bg);
      box(c, -42, -40, 84, 92, 4, teal);
      c.restore();
    } else {
      box(c, x, by + 110, w, 26, 0, "#ffffff55");
      [-92, 0, 92].forEach((d, k) => {
        box(c, cx + d - 36, by - 60 + 0, 72, 170, 10, [sun, sand, coral][k]);
        box(c, cx + d - 16, by - 94, 32, 36, 4, bg);
      });
    }
    // Captions
    box(c, x + 22, y + 500, w - 44, 60, 10, "#fff");
    txt(c, cap, x + w / 2, y + 540, 25, 700, "#16110e", "center");
    txt(c, sub, x + 22, y + 618, 19, 500, "#fff");
    // Progress
    const prog = ((t * 0.28 + i * 0.3) % 1);
    box(c, x + 22, y + 22, w - 44, 6, 3, "#ffffff66");
    box(c, x + 22, y + 22, (w - 44) * prog, 6, 3, "#fff");
    c.restore();
  };
  frame(30, coral, "I tried it for 14 days", "UGC, real customer", 0, "hand");
  frame(425, teal, "Shea, not perfume", "AI product shot", 1, "ai");
  frame(820, "#7a3b22", "The full routine", "UGC, real customer", 2, "shelf");
}

/* ---- Quillbay: roadmap ---- */
function roadmap(c: C, t: number) {
  const ink = "#101419", paper = "#f5f6f8", blue = "#2f6bff";
  box(c, 0, 0, ART_W, ART_H, 0, paper);
  txt(c, "Quillbay launch", 48, 74, 44, 700, ink, "left", -1.6);
  txt(c, "One roadmap, 11 weeks", 48, 112, 23, 500, "#5a5f6a");
  box(c, 952, 40, 200, 56, 28, ink);
  txt(c, "Weekly review", 1052, 76, 19, 600, "#fff", "center");
  const left = 248, wk = 82, top = 150;
  for (let w = 0; w < 11; w++) {
    txt(c, `${w + 1}`, left + w * wk + wk / 2, top + 22, 19, 500, "#7b808a", "center");
    box(c, left + w * wk, top + 36, 1, 520, 0, "#dfe2e7");
  }
  const rows: [string, [number, number, string, string][]][] = [
    ["Discover", [[0, 2, "#101419", "Scope"]]],
    ["Brand", [[1, 3, "#ff6a4d", "Identity"]]],
    ["Product", [[2, 6, blue, "Build"]]],
    ["Film", [[4, 4, "#0f9d7a", "Explainer"]]],
    ["Marketing", [[6, 4, "#ffb627", "Campaign"]]],
    ["Launch", [[10, 1, "#101419", "Go"]]],
  ];
  const p = ease(loop(t, 4) * 1.7);
  rows.forEach(([name, bars], i) => {
    const y = top + 52 + i * 84;
    txt(c, name, 48, y + 40, 24, 600, ink);
    bars.forEach(([s, l, col, label]) => {
      const x = left + s * wk;
      const w = l * wk * clamp(p * 11 / (s + l));
      box(c, x + 3, y, w - 6, 60, 12, col);
      if (w > l * wk * 0.98) txt(c, label, x + 19, y + 39, 20, 600, col === "#ffb627" ? ink : "#fff");
    });
  });
  const today = left + ((t * 0.55) % 11) * wk;
  box(c, today - 1.5, top + 36, 3, 524, 1, "#ff2357");
  box(c, today - 34, top - 12, 68, 28, 14, "#ff2357");
  txt(c, "Today", today, top + 8, 15, 600, "#fff", "center");
}

function screen(c: C, id: ArtId) {
  const s = SCREENS[id];
  box(c, 0, 0, ART_W, ART_H, 0, "#ffffff");
  if (s?.img) c.drawImage(s.img, 0, 0, ART_W, ART_H);
}

const table: Record<ArtId, (c: C, t: number) => void> = {
  "ai-app": aiApp, dash, "eve-home": (c) => screen(c, "eve-home"), "eve-events": (c) => screen(c, "eve-events"), website, "palm-detail": palmDetail,
  brand, logo, campaign, motion, ugc, roadmap,
};

/* A resting time per piece, so a still frame shows the piece finished. */
export const REST: Record<ArtId, number> = {
  "ai-app": 2.6, dash: 3.2, "eve-home": 0, "eve-events": 0, website: 2.6, "palm-detail": 2.3,
  brand: 0.8, logo: 3.3, campaign: 0.6, motion: 2.2, ugc: 1, roadmap: 3,
};

export function drawArt(ctx: CanvasRenderingContext2D, id: ArtId, t: number, scale = 1) {
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.clearRect(0, 0, ART_W, ART_H);
  table[id](ctx, t);
}

/* The nine ring cards, one per service, in ring order. */
export const RING: { id: ArtId; word: string; label: string; client: string; href: string }[] = [
  { id: "eve-home", word: "apps", label: "Product", client: "Eve", href: "/work/eve/" },
  { id: "brand", word: "brands", label: "Brand", client: "Ashgrove Roasters", href: "/work/ashgrove/" },
  { id: "campaign", word: "campaigns", label: "Campaign", client: "Tolumi", href: "/work/tolumi/" },
  { id: "website", word: "products", label: "Website", client: "Palmgate Lettings", href: "/work/palmgate/" },
  { id: "ai-app", word: "apps", label: "AI app", client: "Zuriko", href: "/work/zuriko/" },
  { id: "logo", word: "brands", label: "Logo", client: "Ashgrove Roasters", href: "/work/ashgrove/" },
  { id: "motion", word: "campaigns", label: "Motion piece", client: "Quillbay", href: "/work/quillbay/" },
  { id: "roadmap", word: "products", label: "Roadmap", client: "Quillbay", href: "/work/quillbay/" },
  { id: "ugc", word: "campaigns", label: "UGC video", client: "Tolumi", href: "/work/tolumi/" },
];
