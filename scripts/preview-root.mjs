// Lets the preview start from the parent folder.
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
process.chdir(join(dirname(fileURLToPath(import.meta.url)), ".."));
await import("./preview.mjs");
