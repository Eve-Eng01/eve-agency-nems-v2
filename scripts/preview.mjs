// Serves the static export in ./out for local preview.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = join(process.cwd(), "out");
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".jpg": "image/jpeg", ".woff2": "font/woff2", ".json": "application/json", ".txt": "text/plain", ".xml": "application/xml", ".svg": "image/svg+xml", ".webp": "image/webp", ".webm": "video/webm", ".ico": "image/x-icon" };

createServer(async (req, res) => {
  /* collapse leading slashes ("//" would parse as a host and crash the server) and never throw on a bad path */
  let path = "/";
  try { path = normalize(decodeURIComponent(new URL((req.url || "/").replace(/^\/+/, "/"), "http://x").pathname)).replace(/^(\.\.[/\\])+/, ""); } catch {}
  let file = join(root, path);
  try {
    if ((await stat(file)).isDirectory()) file = join(file, "index.html");
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch {
    const body = await readFile(join(root, "404.html")).catch(() => "Not found");
    res.writeHead(404, { "Content-Type": types[".html"] });
    res.end(body);
  }
}).listen(4175, "127.0.0.1", () => console.log("http://127.0.0.1:4175"));
