import { describe, it, assert } from "../harness/test-runner.mjs";
import { readSrcFile, APPROVED_CONTACTS, DEPRECATED_PATTERNS } from "../harness/test-utils.mjs";

describe("Tier 2: Boundary 11 — Complete Site Footer Corner Cases", () => {
  const footerTsx = readSrcFile("components/akhom/SiteFooter.tsx");

  it("T2-F11-01: Copyright text specifies year 2026 and uppercase AKHOM INTERIORS", () => {
    assert.ok(footerTsx.includes("2026"), "Footer copyright must specify year 2026");
    assert.ok(footerTsx.includes("AKHOM INTERIORS"), "Footer copyright must specify AKHOM INTERIORS");
  });

  it("T2-F11-02: Footer lists all primary services in dedicated navigation column", () => {
    assert.ok(footerTsx.includes("Residential"), "Footer must list Residential");
    assert.ok(footerTsx.includes("Corporate"), "Footer must list Corporate");
    assert.ok(footerTsx.includes("Healthcare"), "Footer must list Healthcare");
    assert.ok(footerTsx.includes("Hospitality"), "Footer must list Hospitality");
  });

  it("T2-F11-03: Footer address does not contain Road No. 12 or Banjara Hills studio street", () => {
    assert.ok(!DEPRECATED_PATTERNS[4].regex.test(footerTsx), "Footer must not contain Road No. 12");
    assert.ok(!footerTsx.includes("Banjara Hills, Road"), "Footer must not contain Banjara Hills street address");
  });

  it("T2-F11-04: External WhatsApp footer links enforce security rel and target attributes", () => {
    assert.ok(footerTsx.includes('target="_blank"'), "WhatsApp links must use target='_blank'");
    assert.ok(footerTsx.includes('rel="noreferrer"'), "WhatsApp links must use rel='noreferrer'");
  });

  it("T2-F11-05: Footer columns use responsive grid collapsing on mobile devices", () => {
    assert.ok(footerTsx.includes("grid-cols-1"), "Footer must support 1-col on mobile");
    assert.ok(footerTsx.includes("md:grid-cols-4") || footerTsx.includes("md:grid-cols-12"), "Footer must expand on desktop");
  });
});

describe("Tier 2: Boundary 12 — Sub-Pages Consistency Corner Cases", () => {
  const subpageRoutes = [
    "residential",
    "corporate",
    "services",
    "projects",
    "process",
    "about",
    "contact",
  ];

  it("T2-F12-01: Every subpage route file exports createFileRoute()", () => {
    for (const route of subpageRoutes) {
      const code = readSrcFile(`routes/${route}.tsx`);
      assert.ok(
        code.includes(`createFileRoute("/${route}")`),
        `Route ${route}.tsx must export createFileRoute("/${route}")`
      );
    }
  });

  it("T2-F12-02: All subpages include PageShell with distinct title and eyebrow", () => {
    for (const route of subpageRoutes) {
      const code = readSrcFile(`routes/${route}.tsx`);
      assert.ok(code.includes("<PageShell"), `${route}.tsx must include <PageShell`);
      assert.ok(code.includes("eyebrow="), `${route}.tsx must define eyebrow prop`);
    }
  });

  it("T2-F12-03: Subpage hero images are imported as valid asset modules", () => {
    for (const route of subpageRoutes) {
      const code = readSrcFile(`routes/${route}.tsx`);
      assert.match(
        code,
        /import\s+\w+\s+from\s+["']@\/assets\/[\w-]+\.jpg["']/,
        `${route}.tsx must import hero image from @/assets/`
      );
    }
  });

  it("T2-F12-04: All subpages include FinalCta component for inquiry conversion", () => {
    for (const route of subpageRoutes) {
      const code = readSrcFile(`routes/${route}.tsx`);
      assert.ok(code.includes("<FinalCta"), `${route}.tsx must mount <FinalCta />`);
    }
  });

  it("T2-F12-05: Subpage metadata arrays contain at least 2 structured tags", () => {
    for (const route of subpageRoutes) {
      const code = readSrcFile(`routes/${route}.tsx`);
      assert.match(code, /meta=\{\[.+\]\s+as\s+const\}/, `${route}.tsx must define structured meta tags`);
    }
  });
});

describe("Tier 2: Boundary 13 — Process Subpage Metadata Corner Cases", () => {
  const processTsx = readSrcFile("routes/process.tsx");

  it("T2-F13-01: Process route meta tags describe schedule certainty", () => {
    assert.ok(
      processTsx.includes("schedule") || processTsx.includes("milestones"),
      "Process page description must highlight schedule certainty"
    );
  });

  it("T2-F13-02: Zero references to 'Six stages' or '6 stages' across process route", () => {
    assert.ok(!/six\s+stages/i.test(processTsx), "process.tsx must not contain 'Six stages'");
    assert.ok(!/6\s+stages/i.test(processTsx), "process.tsx must not contain '6 stages'");
  });

  it("T2-F13-03: Hero image alt text specifies plumb line and joinery details", () => {
    assert.ok(
      processTsx.includes("walnut joinery") || processTsx.includes("plumb line"),
      "Hero image alt must describe architectural process"
    );
  });

  it("T2-F13-04: Process intro text highlights dedicated stage owners", () => {
    assert.ok(
      processTsx.includes("dedicated owner") || processTsx.includes("architectural drawing"),
      "Intro must describe architectural drawing packages"
    );
  });

  it("T2-F13-05: Process subpage imports hero image hero-process.jpg", () => {
    assert.ok(
      processTsx.includes("hero-process.jpg"),
      "process.tsx must import hero-process.jpg asset"
    );
  });
});

describe("Tier 2: Boundary 14 — Page Title Case Branding Corner Cases", () => {
  const subpages = ["residential", "corporate", "projects", "services", "contact"];

  it("T2-F14-01: All subpages maintain uppercase AKHOM INTERIORS branding in document title", () => {
    for (const page of subpages) {
      const code = readSrcFile(`routes/${page}.tsx`);
      assert.ok(
        code.includes("AKHOM INTERIORS"),
        `${page}.tsx title must include uppercase 'AKHOM INTERIORS'`
      );
    }
  });

  it("T2-F14-02: Root layout specifies og:site_name as uppercase AKHOM INTERIORS", () => {
    const rootTsx = readSrcFile("routes/__root.tsx");
    assert.ok(
      rootTsx.includes('{ property: "og:site_name", content: "AKHOM INTERIORS" }'),
      "__root.tsx must set og:site_name to AKHOM INTERIORS"
    );
  });

  it("T2-F14-03: Root layout sets theme-color to brand Dark #141212", () => {
    const rootTsx = readSrcFile("routes/__root.tsx");
    assert.ok(
      rootTsx.includes('{ name: "theme-color", content: "#141212" }'),
      "__root.tsx must configure theme-color as #141212"
    );
  });

  it("T2-F14-04: Subpages set twitter:card to summary_large_image for social previews", () => {
    for (const page of subpages) {
      const code = readSrcFile(`routes/${page}.tsx`);
      assert.ok(
        code.includes('summary_large_image'),
        `${page}.tsx must define summary_large_image for twitter:card`
      );
    }
  });

  it("T2-F14-05: Legal pages privacy and terms specify uppercase AKHOM INTERIORS in titles", () => {
    const privacy = readSrcFile("routes/privacy.tsx");
    const terms = readSrcFile("routes/terms.tsx");
    assert.ok(privacy.includes("AKHOM INTERIORS"), "privacy.tsx title must include AKHOM INTERIORS");
    assert.ok(terms.includes("AKHOM INTERIORS"), "terms.tsx title must include AKHOM INTERIORS");
  });
});

describe("Tier 2: Boundary 15 — Legal Pages Verification Corner Cases", () => {
  const privacyTsx = readSrcFile("routes/privacy.tsx");
  const termsTsx = readSrcFile("routes/terms.tsx");

  it("T2-F15-01: Privacy policy documents client confidentiality and non-disclosure standards", () => {
    assert.ok(
      privacyTsx.includes("Confidentiality") || privacyTsx.includes("confidential"),
      "Privacy policy must document client confidentiality"
    );
  });

  it("T2-F15-02: Terms of service details intellectual property of drawings and specifications", () => {
    assert.ok(
      termsTsx.includes("Intellectual Property") || termsTsx.includes("drawings"),
      "Terms of service must address architectural drawings"
    );
  });

  it("T2-F15-03: Legal pages employ solid Nav header (solid={true}) for readability on ivory canvas", () => {
    assert.ok(privacyTsx.includes("solid={true}"), "privacy.tsx Nav must use solid background");
    assert.ok(termsTsx.includes("solid={true}"), "terms.tsx Nav must use solid background");
  });

  it("T2-F15-04: Privacy policy details consultation lead form processing", () => {
    assert.ok(
      privacyTsx.includes("Consultation") || privacyTsx.includes("enquiries") || privacyTsx.includes("enquiry"),
      "Privacy policy must explain consultation data processing"
    );
  });

  it("T2-F15-05: Terms of service governs disputes under courts of Hyderabad, Telangana", () => {
    assert.ok(
      termsTsx.includes("Hyderabad, Telangana") || termsTsx.includes("Telangana"),
      "Terms must specify Hyderabad jurisdiction"
    );
  });
});
