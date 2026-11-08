/* A small original voxel renderer on 2D canvas: one camera, one light, for every figure.
   Parts carry a pivot so limbs can wave, and the whole figure can spin or dance. */

export type Figure = {
  skin: string;
  hair: string;
  hairStyle: "fade" | "puffs" | "short" | "wrap" | "long" | "cap" | "bun";
  glasses?: boolean;
  top: string;
  legs: string;
  shoe: string;
  tool: "laptop" | "pen" | "clipboard" | "camera" | "megaphone" | "none";
  accent: string;
};

type V = { x: number; y: number; z: number; c: string };
type Part = { pivot: [number, number, number]; voxels: V[] };
export type PartName = "head" | "torso" | "armL" | "armR" | "legL" | "legR" | "tool";
export type Pose = Partial<Record<PartName, { rx?: number; rz?: number; ry?: number; dy?: number }>> & {
  spin?: number;
  bob?: number;
};

const fill = (out: V[], x: number, y: number, z: number, w: number, h: number, d: number, c: string) => {
  for (let i = 0; i < w; i++) for (let j = 0; j < h; j++) for (let k = 0; k < d; k++) out.push({ x: x + i, y: y + j, z: z + k, c });
};
const carve = (v: V[], test: (p: V) => boolean) => v.filter((p) => !test(p));
const shade = (hex: string, k: number) => "#" + [1, 3, 5].map((i) => Math.round(parseInt(hex.slice(i, i + 2), 16) * k).toString(16).padStart(2, "0")).join("");

/* y is up. The figure is 8 wide with a large head; feet stand on y = 0. */
export function buildFigure(f: Figure): Record<PartName, Part> {
  const legL: V[] = [], legR: V[] = [], torso: V[] = [], armL: V[] = [], armR: V[] = [], tool: V[] = [];
  let head: V[] = [];
  // Legs
  fill(legL, -3, 0, -1, 3, 1, 4, f.shoe);
  fill(legL, -3, 1, -1, 3, 4, 3, f.legs);
  fill(legR, 0, 0, -1, 3, 1, 4, f.shoe);
  fill(legR, 0, 1, -1, 3, 4, 3, f.legs);
  // Torso
  fill(torso, -3, 5, -1, 6, 6, 3, f.top);
  fill(torso, -1, 9, 2, 2, 2, 1, f.accent);
  // Arms
  fill(armL, -5, 6, -1, 2, 5, 3, f.top);
  fill(armL, -5, 5, -1, 2, 1, 3, f.skin);
  fill(armR, 3, 6, -1, 2, 5, 3, f.top);
  fill(armR, 3, 5, -1, 2, 1, 3, f.skin);
  // Head
  fill(head, -4, 11, -3, 8, 8, 7, f.skin);
  // Eyes, always on the +z face
  const face = (x: number, y: number, c: string) => head.push({ x, y, z: 4, c });
  head = carve(head, (p) => p.z === 3 && p.y === 15 && (p.x === -3 || p.x === 2));
  fill(head, -3, 15, 3, 1, 1, 1, "#141414");
  fill(head, 2, 15, 3, 1, 1, 1, "#141414");
  head = carve(head, (p) => p.z === 3 && p.y === 13 && (p.x === -1 || p.x === 0));
  fill(head, -1, 13, 3, 2, 1, 1, shade(f.skin, 0.55));
  if (f.glasses) {
    for (const x of [-4, -3, -2, 1, 2, 3]) face(x, 16, "#101010");
    for (const x of [-4, -2, 1, 3]) face(x, 15, "#101010");
    face(-1, 16, "#101010"); face(0, 16, "#101010");
  }
  // Hair
  const hair = f.hair;
  const top = (h: number, c = hair) => fill(head, -4, 19, -3, 8, h, 7, c);
  const back = (y: number, h: number) => fill(head, -4, y, -4, 8, h, 1, hair);
  const sides = (y: number, h: number) => { fill(head, -5, y, -3, 1, h, 5, hair); fill(head, 4, y, -3, 1, h, 5, hair); };
  switch (f.hairStyle) {
    case "fade": top(1); back(17, 2); sides(17, 2); break;
    case "short": top(2); back(14, 5); sides(16, 3); fill(head, -4, 18, 3, 8, 1, 1, hair); break;
    case "puffs":
      top(1); back(14, 5);
      fill(head, -7, 18, -2, 4, 4, 4, hair); fill(head, 3, 18, -2, 4, 4, 4, hair);
      break;
    case "wrap":
      top(2); back(12, 7); sides(12, 7); fill(head, -5, 18, 3, 10, 1, 1, hair);
      break;
    case "long":
      top(2); back(7, 12); sides(9, 10); fill(head, -4, 18, 3, 8, 1, 1, hair);
      break;
    case "cap":
      top(1, f.accent === "#f4f4f4" ? "#101010" : f.accent); fill(head, -4, 18, 3, 8, 1, 4, "#101010"); back(14, 5);
      break;
    case "bun":
      top(1); back(14, 5); sides(16, 3); fill(head, -2, 20, -3, 4, 3, 4, hair);
      break;
  }
  // Tools, held in the right hand
  switch (f.tool) {
    case "laptop": fill(tool, -3, 5, 2, 8, 1, 5, "#c9ccd2"); fill(tool, -3, 6, 6, 8, 5, 1, "#2d2f36"); fill(tool, -2, 7, 7, 6, 3, 1, f.accent); break;
    case "pen": fill(tool, 5, 4, 2, 1, 7, 1, f.accent); fill(tool, 5, 3, 2, 1, 1, 1, "#101010"); break;
    case "clipboard": fill(tool, 3, 3, 2, 5, 7, 1, "#b58a5a"); fill(tool, 3, 4, 3, 5, 5, 1, "#f4f4f4"); fill(tool, 4, 10, 2, 3, 1, 2, "#6a6a6a"); fill(tool, 4, 7, 4, 3, 1, 1, f.accent); break;
    case "camera": fill(tool, 3, 3, 2, 5, 4, 4, "#1c1c1f"); fill(tool, 4, 4, 6, 3, 2, 2, "#3c3c42"); fill(tool, 5, 7, 3, 1, 1, 1, "#ff2357"); break;
    case "megaphone": fill(tool, 4, 7, 2, 2, 2, 2, "#f4f4f4"); fill(tool, 3, 6, 4, 4, 4, 2, "#f4f4f4"); fill(tool, 2, 5, 6, 6, 6, 1, f.accent === "#f4f4f4" ? "#ff2357" : f.accent); break;
  }
  return {
    head: { pivot: [0, 11, 0], voxels: head },
    torso: { pivot: [0, 5, 0], voxels: torso },
    armL: { pivot: [-4, 11, 0], voxels: armL },
    armR: { pivot: [4, 11, 0], voxels: armR },
    legL: { pivot: [-1.5, 5, 0], voxels: legL },
    legR: { pivot: [1.5, 5, 0], voxels: legR },
    tool: { pivot: [4, 11, 0], voxels: tool },
  };
}

const NORMALS: { n: [number, number, number]; v: [number, number, number][] }[] = [
  { n: [0, 1, 0], v: [[0, 1, 0], [1, 1, 0], [1, 1, 1], [0, 1, 1]] },
  { n: [0, -1, 0], v: [[0, 0, 0], [0, 0, 1], [1, 0, 1], [1, 0, 0]] },
  { n: [1, 0, 0], v: [[1, 0, 0], [1, 1, 0], [1, 1, 1], [1, 0, 1]] },
  { n: [-1, 0, 0], v: [[0, 0, 0], [0, 0, 1], [0, 1, 1], [0, 1, 0]] },
  { n: [0, 0, 1], v: [[0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]] },
  { n: [0, 0, -1], v: [[0, 0, 0], [0, 1, 0], [1, 1, 0], [1, 0, 0]] },
];

type RGB = [number, number, number, number];
const cache = new Map<string, RGB>();
const parse = (c: string): RGB => {
  const hit = cache.get(c);
  if (hit) return hit;
  const h = c.slice(1);
  const n = h.length === 8 ? [h.slice(0, 2), h.slice(2, 4), h.slice(4, 6), h.slice(6, 8)] : [h.slice(0, 2), h.slice(2, 4), h.slice(4, 6), "ff"];
  const v = n.map((x) => parseInt(x, 16)) as RGB;
  v[3] /= 255;
  cache.set(c, v);
  return v;
};

type Face = { pts: [number, number, number][]; c: string; light: number; depth: number };

const key = (x: number, y: number, z: number) => `${x},${y},${z}`;

/* Precomputed exposed faces per part: hidden faces never get drawn. */
export type Prepared = Record<PartName, { pivot: [number, number, number]; faces: { p: [number, number, number][]; n: [number, number, number]; c: string }[] }>;

export function prepare(parts: Record<PartName, Part>): Prepared {
  const out = {} as Prepared;
  (Object.keys(parts) as PartName[]).forEach((name) => {
    const part = parts[name];
    const seen = new Map<string, V>();
    part.voxels.forEach((v) => seen.set(key(v.x, v.y, v.z), v));
    const faces: Prepared[PartName]["faces"] = [];
    seen.forEach((v) => {
      NORMALS.forEach(({ n, v: q }) => {
        if (seen.has(key(v.x + n[0], v.y + n[1], v.z + n[2]))) return;
        faces.push({ p: q.map(([a, b, d]) => [v.x + a, v.y + b, v.z + d]), n, c: v.c });
      });
    });
    out[name] = { pivot: part.pivot, faces };
  });
  return out;
}

const rot = (p: [number, number, number], rx: number, ry: number, rz: number): [number, number, number] => {
  let [x, y, z] = p;
  if (rx) { const c = Math.cos(rx), s = Math.sin(rx); [y, z] = [y * c - z * s, y * s + z * c]; }
  if (ry) { const c = Math.cos(ry), s = Math.sin(ry); [x, z] = [x * c + z * s, -x * s + z * c]; }
  if (rz) { const c = Math.cos(rz), s = Math.sin(rz); [x, y] = [x * c - y * s, x * s + y * c]; }
  return [x, y, z];
};

/* The shared camera and light. Never changes between figures. */
const CAM_Y = -0.62;
const CAM_X = 0.5;
const LIGHT: [number, number, number] = [0.42, 0.78, 0.46];

export function renderFigure(ctx: CanvasRenderingContext2D, w: number, h: number, fig: Prepared, pose: Pose = {}, lift = 0) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, w, h);
  const scale = Math.min(w / 31, h / 31);
  const ox = w / 2, oy = h * 0.9;
  const faces: Face[] = [];
  const spin = pose.spin ?? 0;
  const bob = pose.bob ?? 0;
  (Object.keys(fig) as PartName[]).forEach((name) => {
    const part = fig[name];
    const pp = pose[name] ?? {};
    const follow = name === "tool" ? pose.armR ?? {} : pp;
    const rx = follow.rx ?? 0, rz = follow.rz ?? 0, ry = follow.ry ?? 0, dy = pp.dy ?? 0;
    part.faces.forEach((f) => {
      const pts = f.p.map((q) => {
        const local: [number, number, number] = [q[0] - part.pivot[0], q[1] - part.pivot[1], q[2] - part.pivot[2]];
        const r = rot(local, rx, ry, rz);
        let g: [number, number, number] = [r[0] + part.pivot[0], r[1] + part.pivot[1] + dy + bob, r[2] + part.pivot[2]];
        g = rot(g, 0, spin + CAM_Y, 0);
        g = rot(g, CAM_X, 0, 0);
        return g;
      });
      const nr = rot(rot(rot(f.n, rx, ry, rz), 0, spin + CAM_Y, 0), CAM_X, 0, 0);
      if (nr[2] <= 0) return;
      const nw = rot(f.n, rx, ry + spin, rz);
      const l = Math.max(0, nw[0] * LIGHT[0] + nw[1] * LIGHT[1] + nw[2] * LIGHT[2]);
      const depth = pts.reduce((s, q) => s + q[2], 0) / 4;
      faces.push({ pts, c: f.c, light: 0.58 + 0.5 * l, depth });
    });
  });
  faces.sort((a, b) => a.depth - b.depth);
  for (const f of faces) {
    const [r, g, b, al] = parse(f.c);
    ctx.fillStyle = `rgba(${Math.min(255, r * f.light + lift) | 0},${Math.min(255, g * f.light + lift) | 0},${Math.min(255, b * f.light + lift) | 0},${al})`;
    ctx.beginPath();
    f.pts.forEach((q, i) => {
      const x = ox + q[0] * scale, y = oy - q[1] * scale;
      if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
    // Hairline seal so faces never show gaps
    ctx.strokeStyle = ctx.fillStyle;
    ctx.lineWidth = 0.6;
    ctx.stroke();
  }
}

export const poses = {
  wave: (t: number): Pose => ({
    armR: { rz: 2.4 + Math.sin(t * 9) * 0.32 },
    head: { rz: Math.sin(t * 4) * 0.05 },
  }),
  spin: (t: number): Pose => ({ spin: Math.min(1, t / 0.9) * Math.PI * 2, bob: Math.sin(Math.min(1, t / 0.9) * Math.PI) * 2.4 }),
  tool: (t: number): Pose => ({
    armR: { rx: -0.9 - Math.sin(Math.min(t * 5, Math.PI / 2)) * 0.5 + Math.sin(t * 6) * 0.08 },
    head: { rx: 0.09, ry: 0.12 },
  }),
  dance: (t: number): Pose => ({
    bob: Math.abs(Math.sin(t * 7)) * 2,
    spin: Math.sin(t * 3.5) * 0.6,
    armL: { rz: -2.2 + Math.sin(t * 7) * 0.8 },
    armR: { rz: 2.2 - Math.sin(t * 7) * 0.8 },
    legL: { rx: Math.sin(t * 7) * 0.4 },
    legR: { rx: -Math.sin(t * 7) * 0.4 },
    head: { rz: Math.sin(t * 7) * 0.12 },
  }),
};

/* Poses a figure holds between actions, looping. Sitting drops the hips onto y = 0, so a figure placed
   with its feet line on a ledge sits on that ledge with its legs swinging over the front. */
export const idles = {
  sit: (t: number): Pose => ({
    bob: -5,
    legL: { rx: -1.3 + Math.sin(t * 2.1) * 0.24 },
    legR: { rx: -1.3 - Math.sin(t * 2.1) * 0.24 },
    armL: { rz: -0.3 }, armR: { rz: 0.3 },
    head: { ry: Math.sin(t * 0.5) * 0.3, rz: Math.sin(t * 0.9) * 0.03 },
  }),
  type: (t: number): Pose => ({
    bob: -5,
    legL: { rx: -1.35 + Math.sin(t * 1.3) * 0.1 },
    legR: { rx: -1.35 - Math.sin(t * 1.3) * 0.1 },
    armL: { rx: -1.15 + Math.sin(t * 13) * 0.05 },
    armR: { rx: -1.15 + Math.cos(t * 11) * 0.05 },
    head: { rx: 0.12, ry: Math.sin(t * 0.4) * 0.12 },
  }),
  stand: (t: number): Pose => ({ bob: Math.sin(t * 2) * 0.25, head: { ry: Math.sin(t * 0.6) * 0.35 } }),
  film: (t: number): Pose => ({
    bob: Math.sin(t * 1.6) * 0.2,
    armR: { rx: -1.4 + Math.sin(t * 1.2) * 0.04 },
    armL: { rx: -1.1 },
    head: { rx: 0.06, ry: 0.12 + Math.sin(t * 0.7) * 0.06 },
  }),
};

/* An action laid over an idle: the action's parts win, bob and spin add up. */
export function mergePose(base: Pose, top: Pose): Pose {
  return { ...base, ...top, bob: (base.bob ?? 0) + (top.bob ?? 0), spin: (base.spin ?? 0) + (top.spin ?? 0) };
}
