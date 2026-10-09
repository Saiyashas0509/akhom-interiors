import fs from "node:fs";
import { describe, it, assert } from "../harness/test-runner.mjs";
import {
  readSrcFile,
  APPROVED_CONTACTS,
  DEPRECATED_PATTERNS,
  listFilesRecursively,
  SRC_DIR,
  PUBLIC_DIR,
} from "../harness/test-utils.mjs";

describe("Regression: Deprecated Values Exhaustive Audit", () => {
  const allProjectSourceFiles = [
    ...listFilesRecursively(SRC_DIR),
    ...listFilesRecursively(PUBLIC_DIR),
  ];

  it("REG-01: Zero occurrences of deprecated phone 1 (+91 90000 00000 or 9000000000)", () => {
    const hits = [];
    for (const file of allProjectSourceFiles) {
      const content = fs.readFileSync(file, "utf-8");
      if (DEPRECATED_PATTERNS[0].regex.test(content) || content.includes("9000000000")) {
        hits.push(file);
      }
    }
    assert.equal(hits.length, 0, `Found deprecated phone 1 in: ${hits.join(", ")}`);
  });

  it("REG-02: Zero occurrences of deprecated phone 2 (+91 80991 12244 or 8099112244)", () => {
    const hits = [];
    for (const file of allProjectSourceFiles) {
      const content = fs.readFileSync(file, "utf-8");
      if (DEPRECATED_PATTERNS[1].regex.test(content) || content.includes("8099112244")) {
        hits.push(file);
      }
    }
    assert.equal(hits.length, 0, `Found deprecated phone 2 in: ${hits.join(", ")}`);
  });

  it("REG-03: Zero occurrences of deprecated email hello@akhom.in", () => {
    const hits = [];
    for (const file of allProjectSourceFiles) {
      const content = fs.readFileSync(file, "utf-8");
      if (DEPRECATED_PATTERNS[2].regex.test(content)) {
        hits.push(file);
      }
    }
    assert.equal(hits.length, 0, `Found hello@akhom.in in: ${hits.join(", ")}`);
  });

  it("REG-04: Zero occurrences of deprecated email akhominteriors@gmail.com", () => {
    const hits = [];
    for (const file of allProjectSourceFiles) {
      const content = fs.readFileSync(file, "utf-8");
      if (DEPRECATED_PATTERNS[3].regex.test(content)) {
        hits.push(file);
      }
    }
    assert.equal(hits.length, 0, `Found akhominteriors@gmail.com in: ${hits.join(", ")}`);
  });

  it("REG-05: Zero occurrences of deprecated address Road No. 12", () => {
    const hits = [];
    for (const file of allProjectSourceFiles) {
      const content = fs.readFileSync(file, "utf-8");
      if (DEPRECATED_PATTERNS[4].regex.test(content)) {
        hits.push(file);
      }
    }
    assert.equal(hits.length, 0, `Found Road No. 12 in: ${hits.join(", ")}`);
  });
});

describe("Regression: Approved Contact Details Global Assertion", () => {
  it("REG-06: Approved studio phone (+91 91773 61122 / tel:+919177361122) is correctly bound", () => {
    const footer = readSrcFile("components/akhom/SiteFooter.tsx");
    const finalCta = readSrcFile("components/akhom/FinalCta.tsx");
    const root = readSrcFile("routes/__root.tsx");

    assert.ok(footer.includes(APPROVED_CONTACTS.phone), "Footer must display approved phone");
    assert.ok(footer.includes(APPROVED_CONTACTS.phoneTel), "Footer must link to approved tel URI");
    assert.ok(finalCta.includes(APPROVED_CONTACTS.phoneTel), "Final CTA must link to approved tel URI");
    assert.ok(root.includes(APPROVED_CONTACTS.phoneCompact), "Root JSON-LD must contain compact phone");
  });

  it("REG-07: Approved WhatsApp (+91 97043 52346 with country code 91) is consistently formatted", () => {
    const floating = readSrcFile("components/akhom/WhatsAppFloating.tsx");
    const footer = readSrcFile("components/akhom/SiteFooter.tsx");
    const form = readSrcFile("components/akhom/ConsultationForm.tsx");
    const root = readSrcFile("routes/__root.tsx");

    assert.ok(floating.includes(APPROVED_CONTACTS.whatsAppPrefix), "Floating widget must use wa.me/919704352346");
    assert.ok(footer.includes(APPROVED_CONTACTS.whatsAppPrefix), "Footer must use wa.me/919704352346");
    assert.ok(form.includes(APPROVED_CONTACTS.whatsAppPrefix), "ConsultationForm must use wa.me/919704352346");
    assert.ok(root.includes(APPROVED_CONTACTS.whatsAppPrefix), "Root JSON-LD sameAs must include approved WhatsApp URL");
  });

  it("REG-08: Approved studio email (info@akhominteriors.com) is universally configured", () => {
    const footer = readSrcFile("components/akhom/SiteFooter.tsx");
    const finalCta = readSrcFile("components/akhom/FinalCta.tsx");
    const form = readSrcFile("components/akhom/ConsultationForm.tsx");
    const root = readSrcFile("routes/__root.tsx");

    assert.ok(footer.includes(APPROVED_CONTACTS.email));
    assert.ok(finalCta.includes(APPROVED_CONTACTS.email));
    assert.ok(form.includes(APPROVED_CONTACTS.email));
    assert.ok(root.includes(APPROVED_CONTACTS.email));
  });

  it("REG-09: Approved studio location (Hyderabad, Telangana) is consistently asserted", () => {
    const footer = readSrcFile("components/akhom/SiteFooter.tsx");
    const nav = readSrcFile("components/akhom/Nav.tsx");
    const root = readSrcFile("routes/__root.tsx");

    assert.ok(footer.includes(APPROVED_CONTACTS.location));
    assert.ok(nav.includes(APPROVED_CONTACTS.location));
    assert.ok(root.includes("Hyderabad") && root.includes("Telangana"));
  });

  it("REG-10: Zero Palestinian prefix (wa.me/9704352346) occurrences across entire codebase", () => {
    const allFiles = listFilesRecursively(SRC_DIR);
    for (const f of allFiles) {
      const content = fs.readFileSync(f, "utf-8");
      assert.ok(
        !content.includes("wa.me/9704352346?"),
        `Found invalid wa.me/9704352346 in ${f}`
      );
    }
  });
});
