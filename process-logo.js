import fs from "fs";
import path from "path";
import jpeg from "jpeg-js";
import { PNG } from "pngjs";

const srcPath = "C:/Users/The Storii/.gemini/antigravity/brain/084e681f-9f9b-45f9-ba80-be14176aa800/.user_uploaded/media_1788189680582.jpg";
const jpegData = fs.readFileSync(srcPath);
const rawImage = jpeg.decode(jpegData, { useTArray: true });

const width = rawImage.width;
const height = rawImage.height;

console.log(`Processing full logo (${width}x${height})...`);

// 1. Create Dark Transparent PNG (Black text, transparent bg)
const darkPng = new PNG({ width, height });
// 2. Create Light Transparent PNG (Ivory #F3EFE8 text, transparent bg)
const lightPng = new PNG({ width, height });

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (width * y + x) * 4;
    const r = rawImage.data[idx];
    const g = rawImage.data[idx + 1];
    const b = rawImage.data[idx + 2];

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    if (brightness > 210) {
      darkPng.data[idx] = 0;
      darkPng.data[idx + 1] = 0;
      darkPng.data[idx + 2] = 0;
      darkPng.data[idx + 3] = 0;

      lightPng.data[idx] = 0;
      lightPng.data[idx + 1] = 0;
      lightPng.data[idx + 2] = 0;
      lightPng.data[idx + 3] = 0;
    } else {
      const alpha = Math.min(255, Math.max(0, Math.round((255 - brightness) * 1.3)));

      darkPng.data[idx] = 11;
      darkPng.data[idx + 1] = 11;
      darkPng.data[idx + 2] = 11;
      darkPng.data[idx + 3] = alpha;

      lightPng.data[idx] = 243;
      lightPng.data[idx + 1] = 239;
      lightPng.data[idx + 2] = 232;
      lightPng.data[idx + 3] = alpha;
    }
  }
}

// Write logo files
const darkPngBuffer = PNG.sync.write(darkPng);
const lightPngBuffer = PNG.sync.write(lightPng);

fs.writeFileSync("d:/akhom-main/akhom-main/public/logo-dark.png", darkPngBuffer);
fs.writeFileSync("d:/akhom-main/akhom-main/public/logo-light.png", lightPngBuffer);
fs.writeFileSync("d:/akhom-main/akhom-main/src/assets/logo-dark.png", darkPngBuffer);
fs.writeFileSync("d:/akhom-main/akhom-main/src/assets/logo-light.png", lightPngBuffer);
fs.writeFileSync("d:/akhom-main/akhom-main/public/logo.png", darkPngBuffer);
fs.writeFileSync("d:/akhom-main/akhom-main/src/assets/logo.png", darkPngBuffer);

// 3. Generate Favicon with ONLY the letter 'A' of AKHOM!
// Bounding box for 'A': minX: 0, maxX: 210, minY: 11, maxY: 175
const aMinX = 0;
const aMaxX = 210;
const aMinY = 11;
const aMaxY = 175;
const aW = aMaxX - aMinX; // 210
const aH = aMaxY - aMinY; // 164

const favSize = 256;
const faviconPng = new PNG({ width: favSize, height: favSize });

// Calculate aspect-preserved scaling & centering inside 256x256 canvas with 32px padding
const maxDrawDim = favSize - 64; // 192px max dimension
const scale = Math.min(maxDrawDim / aW, maxDrawDim / aH);
const targetW = Math.round(aW * scale);
const targetH = Math.round(aH * scale);
const offsetX = Math.round((favSize - targetW) / 2);
const offsetY = Math.round((favSize - targetH) / 2);

// Fill with 100% transparent pixels first
for (let i = 0; i < favSize * favSize * 4; i += 4) {
  faviconPng.data[i] = 0;
  faviconPng.data[i + 1] = 0;
  faviconPng.data[i + 2] = 0;
  faviconPng.data[i + 3] = 0;
}

// Draw letter 'A'
for (let dy = 0; dy < targetH; dy++) {
  for (let dx = 0; dx < targetW; dx++) {
    const srcX = aMinX + Math.floor(dx / scale);
    const srcY = aMinY + Math.floor(dy / scale);

    if (srcX >= 0 && srcX < width && srcY >= 0 && srcY < height) {
      const srcIdx = (width * srcY + srcX) * 4;
      const r = rawImage.data[srcIdx];
      const g = rawImage.data[srcIdx + 1];
      const b = rawImage.data[srcIdx + 2];
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;

      if (brightness <= 210) {
        const alpha = Math.min(255, Math.max(0, Math.round((255 - brightness) * 1.3)));
        const destX = offsetX + dx;
        const destY = offsetY + dy;

        if (destX >= 0 && destX < favSize && destY >= 0 && destY < favSize) {
          const destIdx = (favSize * destY + destX) * 4;
          // Architectural Bronze/Black letter 'A'
          faviconPng.data[destIdx] = 11;
          faviconPng.data[destIdx + 1] = 11;
          faviconPng.data[destIdx + 2] = 11;
          faviconPng.data[destIdx + 3] = alpha;
        }
      }
    }
  }
}

const faviconBuffer = PNG.sync.write(faviconPng);
fs.writeFileSync("d:/akhom-main/akhom-main/public/favicon.png", faviconBuffer);
fs.writeFileSync("d:/akhom-main/akhom-main/public/apple-touch-icon.png", faviconBuffer);

console.log("Successfully generated letter 'A' favicon (256x256) and transparent logos!");
