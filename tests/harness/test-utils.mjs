import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const ROOT_DIR = path.resolve(__dirname, "../..");
export const SRC_DIR = path.resolve(ROOT_DIR, "src");
export const PUBLIC_DIR = path.resolve(ROOT_DIR, "public");

/**
 * Read source file relative to `src`
 */
export function readSrcFile(relativeSubpath) {
  const fullPath = path.resolve(SRC_DIR, relativeSubpath);
  return fs.readFileSync(fullPath, "utf-8");
}

/**
 * Read arbitrary project file relative to akhom-main root
 */
export function readProjectFile(relativeSubpath) {
  const fullPath = path.resolve(ROOT_DIR, relativeSubpath);
  return fs.readFileSync(fullPath, "utf-8");
}

/**
 * Recursively list all files matching extension
 */
export function listFilesRecursively(dir, filter = () => true) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name !== "node_modules" && item.name !== ".git" && item.name !== "dist") {
        results = results.concat(listFilesRecursively(fullPath, filter));
      }
    } else if (filter(fullPath)) {
      results.push(fullPath);
    }
  }
  return results;
}

export const DEPRECATED_PATTERNS = [
  { name: "Deprecated Phone 1 (+91 90000 00000)", regex: /90000\s*00000/i },
  { name: "Deprecated Phone 2 (+91 80991 12244)", regex: /80991\s*12244/i },
  { name: "Deprecated Email 1 (hello@akhom.in)", regex: /hello@akhom\.in/i },
  { name: "Deprecated Email 2 (akhominteriors@gmail.com)", regex: /akhominteriors@gmail\.com/i },
  { name: "Deprecated Address (Road No. 12)", regex: /Road\s+No\.?\s*12/i },
];

export const APPROVED_CONTACTS = {
  phone: "+91 91773 61122",
  phoneTel: "tel:+919177361122",
  phoneCompact: "+919177361122",
  whatsAppPhone: "+91 97043 52346",
  whatsAppPrefix: "https://wa.me/919704352346",
  email: "info@akhominteriors.com",
  location: "Hyderabad, Telangana",
};

/**
 * Validates a generated or static WhatsApp URL
 */
export function validateWhatsAppUrl(rawUrl, options = {}) {
  const { requireCountryCode = true, requiredTextFragment = null } = options;
  if (!rawUrl || typeof rawUrl !== "string") {
    return { valid: false, reason: "URL is empty or not a string" };
  }

  if (rawUrl.includes("wa.me/9704352346") && !rawUrl.includes("wa.me/919704352346")) {
    return { valid: false, reason: "Missing country code 91; found Palestinian prefix wa.me/9704352346" };
  }

  if (requireCountryCode && !rawUrl.startsWith("https://wa.me/919704352346")) {
    return { valid: false, reason: `URL does not start with approved prefix https://wa.me/919704352346 (Got: ${rawUrl})` };
  }

  if (requiredTextFragment) {
    const urlObj = new URL(rawUrl);
    const textParam = urlObj.searchParams.get("text") || "";
    if (!textParam.includes(requiredTextFragment)) {
      return { valid: false, reason: `Decoded text param does not contain "${requiredTextFragment}"` };
    }
  }

  return { valid: true, url: rawUrl };
}

/**
 * Simulates Consultation Form lead submission logic
 */
export function simulateConsultationSubmission(formData, options = {}) {
  const { honeypotTrap = false, bypassValidation = false } = options;

  if (honeypotTrap || formData.honeypot) {
    return {
      status: "trapped",
      submitted: false,
      error: null,
      message: "Bot honeypot triggered; submission silently ignored.",
    };
  }

  if (!bypassValidation) {
    if (!formData.name?.trim() || !formData.email?.trim() || !formData.phone?.trim()) {
      return {
        status: "validation_error",
        submitted: false,
        error: "Please complete all required fields (Name, Email, Phone).",
      };
    }

    if (formData.consent === false) {
      return {
        status: "validation_error",
        submitted: false,
        error: "Please agree to our privacy policy to proceed.",
      };
    }
  }

  const leadRecord = {
    name: formData.name.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    location: formData.location || "Hyderabad — Kokapet / Gandipet",
    scope: formData.scope || "Villa",
    approxArea: formData.approxArea || "Not specified",
    projectStage: formData.projectStage || "Ready for Interior Fit-Out",
    contactMethod: formData.contactMethod || "WhatsApp",
    message: formData.message || "",
    leadSource: formData.leadSource || "website_direct",
    submittedAt: new Date().toISOString(),
    recipient: "info@akhominteriors.com",
    cc: "projects@akhominteriors.com",
  };

  const messageText = `Hi AKHOM, I'd like to discuss my space.\n*Name:* ${leadRecord.name}\n*Location:* ${leadRecord.location}\n*Scope:* ${leadRecord.scope}\n*Approx Area:* ${leadRecord.approxArea}\n*Project Stage:* ${leadRecord.projectStage}\n*Preferred Contact:* ${leadRecord.contactMethod}\n*Phone:* ${leadRecord.phone}`;
  const whatsappUrl = `https://wa.me/919704352346?text=${encodeURIComponent(messageText)}`;

  return {
    status: "success",
    submitted: true,
    leadRecord,
    whatsappUrl,
    error: null,
  };
}

/**
 * Validates WCAG AA 12px minimum rule for Tailwind classnames in content
 */
export function findFontSizesBelow12px(content) {
  // Finds explicit Tailwind font sizes below 12px, e.g. text-[10px], text-[11px], text-[9px]
  const pattern = /text-\[(?:[0-9]|10|11)px\]/g;
  const matches = [];
  let m;
  while ((m = pattern.exec(content)) !== null) {
    matches.push(m[0]);
  }
  return matches;
}
