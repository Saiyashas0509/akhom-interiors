import fs from "fs";
import path from "path";

// Vite already emits dist/client/index.html (fonts, styles, hashed bundles) and
// scripts/postbuild.mjs copies it to 200.html for SPA routing. This step only
// verifies that output and pins the Surge domain — it must not rewrite the HTML.
const clientDir = path.resolve("dist/client");
const index = path.join(clientDir, "index.html");
const fallback = path.join(clientDir, "200.html");

for (const file of [index, fallback]) {
  if (!fs.existsSync(file)) {
    console.error(`Missing ${path.relative(process.cwd(), file)} — run "npm run build" first.`);
    process.exit(1);
  }
}

fs.writeFileSync(path.join(clientDir, "CNAME"), "akhominteriors.surge.sh\n");

console.log("Surge deployment ready: dist/client (index.html, 200.html, CNAME=akhominteriors.surge.sh)");
