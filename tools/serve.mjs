import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
// usage: node serve.mjs [folder] [port] [host]
// host defaults to 127.0.0.1 (this computer only); pass 0.0.0.0 to let phones on the same Wi-Fi in
const root = path.resolve(process.argv[2] || "."), port = +(process.argv[3] || 5533), host = process.argv[4] || "127.0.0.1";
const T = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".json": "application/json", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml", ".mp4": "video/mp4", ".woff2": "font/woff2", ".ico": "image/x-icon" };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p.endsWith("/")) p += "index.html"; // before normalize: on Windows it turns "/" into "\"
  p = path.normalize(p);
  const f = path.join(root, p);
  if (f !== root && !f.startsWith(root + path.sep)) {
    res.writeHead(403).end();
    return;
  }
  fs.stat(f, (e, st) => {
    if (e || !st.isFile()) {
      res.writeHead(404, { "content-type": "text/plain" }).end("404");
      return;
    }
    const h = { "content-type": T[path.extname(f)] || "application/octet-stream", "accept-ranges": "bytes", "cache-control": "no-cache" };
    const m = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || "");
    if (m) {
      const s = m[1] ? +m[1] : 0, en = m[2] ? Math.min(+m[2], st.size - 1) : st.size - 1;
      res.writeHead(206, { ...h, "content-range": `bytes ${s}-${en}/${st.size}`, "content-length": en - s + 1 });
      fs.createReadStream(f, { start: s, end: en }).pipe(res);
    } else {
      res.writeHead(200, { ...h, "content-length": st.size });
      fs.createReadStream(f).pipe(res);
    }
  });
}).listen(port, host, () => {
  console.log(`serving ${root}`);
  console.log(`  on this computer: http://localhost:${port}`);
  if (host === "0.0.0.0") {
    for (const list of Object.values(os.networkInterfaces()))
      for (const a of list || [])
        if (a.family === "IPv4" && !a.internal) console.log(`  on the same Wi-Fi:  http://${a.address}:${port}`);
  }
});
