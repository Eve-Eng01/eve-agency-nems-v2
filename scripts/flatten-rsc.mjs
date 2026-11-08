// next export writes route payloads to work/__next.work/__PAGE__.txt, but the client asks for
// work/__next.work.__PAGE__.txt. Copy each one to the path it is requested from.
import { cpSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory() || name === "_next") continue;
    if (name.startsWith("__next.")) flatten(p, dir, name);
    else walk(p);
  }
}
function flatten(p, base, prefix) {
  for (const name of readdirSync(p)) {
    const q = join(p, name);
    const flat = `${prefix}.${name}`;
    if (statSync(q).isDirectory()) flatten(q, base, flat);
    else cpSync(q, join(base, flat));
  }
}
walk("out");
