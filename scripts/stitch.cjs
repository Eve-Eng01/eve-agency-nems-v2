// Stacks section captures, top to bottom in page order, into one tall review image.
// The wall is a fixed canvas behind pinned sections, so a single full-page capture would show it once;
// this keeps every screen as the visitor sees it. Usage: node scripts/stitch.cjs <out.png> <img> ...
const sharp = require(require("path").join(__dirname, "../../node_modules/sharp"));
(async () => {
  const [out, ...files] = process.argv.slice(2);
  const metas = await Promise.all(files.map((f) => sharp(f).metadata()));
  const W = metas[0].width, gap = 6;
  const H = metas.reduce((s, m) => s + m.height + gap, 0);
  let y = 0;
  const comps = files.map((f, i) => { const c = { input: f, left: 0, top: y }; y += metas[i].height + gap; return c; });
  await sharp({ create: { width: W, height: H, channels: 3, background: "#ff00ff" } }).composite(comps).png({ compressionLevel: 9 }).toFile(out);
  console.log(out, W, H);
})();
