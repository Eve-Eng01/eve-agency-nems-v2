// Headless captures of the built site, WebGL on the CPU. Usage:
// node scripts/snap.mjs <url> <width>x<height> <outdir> <name>=<selector|y>[@wait] ...
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [url, size, out, ...shots] = process.argv.slice(2);
const [W, H] = size.split("x").map(Number);
mkdirSync(out, { recursive: true });
const port = 9400 + Math.floor(Math.random() * 400);
const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", [
  "--headless=new", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--hide-scrollbars",
  `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), "snap-"))}`,
  `--window-size=${W},${H}`, "about:blank",
]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
try {
  let target;
  for (let i = 0; i < 60 && !target; i++) {
    await sleep(250);
    try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === "page"); } catch {}
  }
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0; const wait = new Map(); const logs = [];
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id && wait.has(m.id)) { wait.get(m.id)(m.result); wait.delete(m.id); }
    if (m.method === "Runtime.exceptionThrown") logs.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
    if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") logs.push(m.params.args.map((a) => a.value ?? a.description).join(" "));
  };
  const send = (method, params = {}) => new Promise((r) => { const n = ++id; wait.set(n, r); ws.send(JSON.stringify({ id: n, method, params })); });
  await send("Page.enable"); await send("Runtime.enable");
  const mobile = W < 700;
  await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile });
  if (mobile) await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
  if (process.env.REDUCED) await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await send("Page.navigate", { url });
  await sleep(Number(process.env.START || 5000));
  const ev = async (expression) => (await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })).result?.value;
  for (const s of shots) {
    const [name, rest] = s.split("=");
    const [where0, waitMs] = rest.split("@");
    if (where0.startsWith("click:")) { await ev(`(()=>{const e=document.querySelector(${JSON.stringify(where0.slice(6))});e&&e.click();return 1})()`); await sleep(Number(waitMs || 1500)); const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 82 }); writeFileSync(join(out, `${name}.jpg`), Buffer.from(shot.data, "base64")); console.log("shot", name, where0); continue; }
    const where = where0;
    const y = /^[\d.]+$/.test(where)
      ? Number(where)
      : await ev(`(()=>{const e=document.querySelector(${JSON.stringify(where)});return e?Math.round(e.getBoundingClientRect().top+scrollY):0})()`);
    await ev(`(window.__l=window.__l||null, document.documentElement.style.scrollBehavior='auto', window.scrollTo(0, ${y}), window.dispatchEvent(new Event('scroll')), 1)`);
    await sleep(Number(waitMs || 1800));
    const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 82 });
    writeFileSync(join(out, `${name}.jpg`), Buffer.from(shot.data, "base64"));
    console.log("shot", name, y);
  }
  const info = await ev(`({wall:document.documentElement.dataset.wall, h:document.documentElement.scrollHeight, overflow: document.documentElement.scrollWidth > innerWidth})`);
  console.log(JSON.stringify(info));
  if (process.env.EVAL) console.log("EVAL", JSON.stringify(await ev(process.env.EVAL)));
  if (logs.length) console.log("ERRORS", logs.join("\n"));
  ws.close();
} finally { chrome.kill(); }
