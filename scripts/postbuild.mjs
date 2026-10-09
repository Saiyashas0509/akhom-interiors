import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const distClient = path.join(root, "dist", "client");
const dist = path.join(root, "dist");

console.log("[postbuild] Ensuring dist output compatibility for Cloudflare Pages & Vercel...");

if (fs.existsSync(distClient)) {
  // Copy all files from dist/client into dist root so whether the host looks for dist or dist/client, it succeeds!
  const files = fs.readdirSync(distClient);
  for (const file of files) {
    const src = path.join(distClient, file);
    const dest = path.join(dist, file);
    if (file !== "client") {
      fs.cpSync(src, dest, { recursive: true });
    }
  }

  // Ensure _redirects for Cloudflare Pages SPA routing
  const redirectsContent = "/*    /index.html   200\n";
  fs.writeFileSync(path.join(dist, "_redirects"), redirectsContent, "utf8");
  fs.writeFileSync(path.join(distClient, "_redirects"), redirectsContent, "utf8");

  // Ensure 404 and 200 fallbacks
  const indexPath = path.join(dist, "index.html");
  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, path.join(dist, "404.html"));
    fs.copyFileSync(indexPath, path.join(dist, "200.html"));
    fs.copyFileSync(indexPath, path.join(distClient, "404.html"));
    fs.copyFileSync(indexPath, path.join(distClient, "200.html"));
  }

  console.log("[postbuild] Compatibility files created successfully in dist and dist/client!");
}
