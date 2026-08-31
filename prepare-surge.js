import fs from "fs";
import path from "path";

const clientDir = path.resolve("dist/client");
const assetsDir = path.resolve("dist/client/assets");

const files = fs.readdirSync(assetsDir);
const cssFile = files.find((f) => f.startsWith("styles-") && f.endsWith(".css"));
const jsFile = files.find((f) => f.startsWith("index-") && f.endsWith(".js"));

if (!cssFile || !jsFile) {
  console.error("Could not find generated CSS or JS bundles in dist/client/assets");
  process.exit(1);
}

const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>AKHOM Interiors — Timeless Designs, Thoughtful Spaces</title>
    <meta name="description" content="Premium residential and commercial interior design in Hyderabad. Design, detail, custom craft and turnkey execution by one accountable team." />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/assets/${cssFile}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${jsFile}"></script>
  </body>
</html>`;

fs.writeFileSync(path.join(clientDir, "index.html"), htmlContent);
fs.writeFileSync(path.join(clientDir, "200.html"), htmlContent);

console.log("Successfully prepared Surge static deployment files:");
console.log(`- index.html & 200.html -> CSS: ${cssFile}, JS: ${jsFile}`);

