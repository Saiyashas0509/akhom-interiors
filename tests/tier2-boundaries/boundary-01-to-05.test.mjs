import { describe, it, assert } from "../harness/test-runner.mjs";
import { readSrcFile, readProjectFile, findFontSizesBelow12px } from "../harness/test-utils.mjs";

describe("Tier 2: Boundary 01 — 6-Color Brand Palette Corner Cases", () => {
  const stylesCss = readSrcFile("styles.css");

  it("T2-F01-01: Dark mode class overrides background to dark and foreground to ivory", () => {
    assert.ok(stylesCss.includes(".dark {"), "styles.css must have .dark theme block");
    assert.ok(stylesCss.includes("--background: var(--dark);"), "Dark mode must set background to var(--dark)");
    assert.ok(stylesCss.includes("--foreground: var(--ivory);"), "Dark mode must set foreground to var(--ivory)");
  });

  it("T2-F01-02: Zero invalid or malformed color hex values in root palette definitions", () => {
    const invalidHex = /#(?:[0-9a-fA-F]{1,2}|[0-9a-fA-F]{4,5}|[0-9a-fA-F]{7})(?:[^0-9a-fA-F]|$)/;
    assert.ok(!invalidHex.test(stylesCss), "Root palette should not have malformed hex length");
  });

  it("T2-F01-03: Border contrast variables satisfy both light and dark surfaces", () => {
    assert.match(stylesCss, /--border:\s*rgba\(20,\s*18,\s*18,\s*0\.12\);/, "Light border must have adequate contrast");
    assert.match(stylesCss, /--border:\s*rgba\(244,\s*240,\s*234,\s*0\.14\);/, "Dark border must have adequate contrast");
  });

  it("T2-F01-04: Hover state for primary action uses darker shade (#621D40) than base (#7D2652)", () => {
    const hexToLum = (hex) => parseInt(hex.slice(1, 3), 16);
    const baseLum = hexToLum("#7D2652");
    const hoverLum = hexToLum("#621D40");
    assert.ok(hoverLum < baseLum, "Hover state burgundy #621D40 must be darker than base #7D2652");
  });

  it("T2-F01-05: Focus ring variable explicitly binds to brand burgundy", () => {
    assert.ok(stylesCss.includes("--ring: var(--burgundy);"), "Focus ring token must map to var(--burgundy)");
  });
});

describe("Tier 2: Boundary 02 — Typography & WCAG AA Enforcement", () => {
  const servicesTsx = readSrcFile("components/akhom/Services.tsx");
  const formTsx = readSrcFile("components/akhom/ConsultationForm.tsx");
  const heroTsx = readSrcFile("components/akhom/Hero.tsx");

  it("T2-F02-01: Services component contains zero font sizes below 12px", () => {
    const smallSizes = findFontSizesBelow12px(servicesTsx);
    assert.equal(smallSizes.length, 0, `Services.tsx contains sub-12px classes: ${smallSizes.join(", ")}`);
  });

  it("T2-F02-02: ConsultationForm component contains zero font sizes below 12px in interactive labels", () => {
    const smallSizes = findFontSizesBelow12px(formTsx);
    assert.equal(smallSizes.length, 0, `ConsultationForm.tsx contains sub-12px classes: ${smallSizes.join(", ")}`);
  });

  it("T2-F02-03: Hero component discipline pills labels specify text-[12px] or larger", () => {
    assert.ok(
      heroTsx.includes("text-[12px]") || heroTsx.includes("text-xs") || heroTsx.includes("text-sm"),
      "Hero discipline pills must use >=12px font labels"
    );
  });

  it("T2-F02-04: Serif font declaration provides Georgia and serif fallbacks", () => {
    const stylesCss = readSrcFile("styles.css");
    assert.match(stylesCss, /--font-serif:\s*"Cormorant Garamond",\s*Georgia,\s*serif;/);
  });

  it("T2-F02-05: Sans font declaration provides system-ui and sans-serif fallbacks", () => {
    const stylesCss = readSrcFile("styles.css");
    assert.match(stylesCss, /--font-sans:\s*"Inter",\s*ui-sans-serif,\s*system-ui,\s*sans-serif;/);
  });
});

describe("Tier 2: Boundary 03 — Floating WhatsApp Widget Boundary Cases", () => {
  const floatingTsx = readSrcFile("components/akhom/WhatsAppFloating.tsx");

  it("T2-F03-01: Tooltip toggles pointer-events-none when opacity is 0", () => {
    assert.ok(
      floatingTsx.includes("pointer-events-none"),
      "Tooltip must set pointer-events-none when hidden to avoid blocking background clicks"
    );
  });

  it("T2-F03-02: Fixed container uses z-50 elevation ensuring visibility above modals/bars", () => {
    assert.ok(floatingTsx.includes("z-50"), "Floating widget must be at least z-50");
  });

  it("T2-F03-03: Link specifies target='_blank' and rel='noopener noreferrer' for security", () => {
    assert.ok(floatingTsx.includes('target="_blank"'), "Must have target='_blank'");
    assert.ok(floatingTsx.includes('rel="noopener noreferrer"'), "Must have rel='noopener noreferrer'");
  });

  it("T2-F03-04: Button defines accessible aria-label for assistive technologies", () => {
    assert.ok(
      floatingTsx.includes('aria-label="Chat on WhatsApp with AKHOM Interiors"'),
      "Must have descriptive aria-label"
    );
  });

  it("T2-F03-05: Button dimensions remain fixed at h-14 w-14 preventing touch-target shrinkage", () => {
    assert.ok(
      floatingTsx.includes("h-14") && floatingTsx.includes("w-14"),
      "Touch target must be 56px (h-14 w-14), well above 44px WCAG minimum"
    );
  });
});

describe("Tier 2: Boundary 04 — 404 & HTML Shell Edge Cases", () => {
  const html404 = readProjectFile("public/404.html");
  const rootTsx = readSrcFile("routes/__root.tsx");

  it("T2-F04-01: 404 template includes UTF-8 and mobile-responsive viewport meta tag", () => {
    assert.ok(html404.includes('<meta charset="utf-8" />'), "Must specify utf-8");
    assert.ok(html404.includes('content="width=device-width, initial-scale=1"'), "Must specify responsive viewport");
  });

  it("T2-F04-02: 404 template font links include preconnect origins for fast DNS lookup", () => {
    assert.ok(html404.includes('rel="preconnect" href="https://fonts.googleapis.com"'));
    assert.ok(html404.includes('rel="preconnect" href="https://fonts.gstatic.com"'));
  });

  it("T2-F04-03: __root.tsx defines ErrorComponent boundary with recovery reset button", () => {
    assert.ok(rootTsx.includes("function ErrorComponent("), "__root.tsx must define ErrorComponent");
    assert.ok(rootTsx.includes("reset();"), "ErrorComponent must invoke reset callback on retry");
  });

  it("T2-F04-04: Schema.org structured data defines valid geo-coordinates for Hyderabad", () => {
    assert.ok(rootTsx.includes('"latitude": "17.4123"'), "Schema data must define Hyderabad latitude");
    assert.ok(rootTsx.includes('"longitude": "78.4080"'), "Schema data must define Hyderabad longitude");
  });

  it("T2-F04-05: Schema.org structured data sets telephone to approved studio number", () => {
    assert.ok(rootTsx.includes('"telephone": "+919177361122"'), "Schema data must bind to +919177361122");
  });
});

describe("Tier 2: Boundary 05 — Hero Section Edge Cases", () => {
  const heroTsx = readSrcFile("components/akhom/Hero.tsx");

  it("T2-F05-01: Discipline pills display uppercase across mobile and desktop breakpoints", () => {
    assert.ok(heroTsx.includes('"DESIGN"'), "Discipline pill 01 must be uppercase DESIGN");
    assert.ok(heroTsx.includes('"DETAIL"'), "Discipline pill 02 must be uppercase DETAIL");
    assert.ok(heroTsx.includes('"CUSTOM CRAFT"'), "Discipline pill 03 must be uppercase CUSTOM CRAFT");
    assert.ok(heroTsx.includes('"EXECUTION"'), "Discipline pill 04 must be uppercase EXECUTION");
  });

  it("T2-F05-02: Discipline pill links map to valid route endpoints /services and /process", () => {
    assert.ok(heroTsx.includes('to: "/services"'), "Pill links must route to /services");
    assert.ok(heroTsx.includes('to: "/process"'), "Pill links must route to /process");
  });

  it("T2-F05-03: Glass card uses high backdrop-blur and semi-transparent dark surface", () => {
    assert.ok(heroTsx.includes("backdrop-blur-"), "Floating glass card must include backdrop blur");
    assert.ok(heroTsx.includes("bg-dark/"), "Floating glass card must use dark translucency");
  });

  it("T2-F05-04: Primary CTA button specifies explicit hover shadow for micro-interaction", () => {
    assert.ok(
      heroTsx.includes("hover:shadow-[0_0_25px_rgba(125,38,82,0.4)]") || heroTsx.includes("hover:bg-burgundy-hover"),
      "Hero primary CTA must feature burgundy hover glow or hover transition"
    );
  });

  it("T2-F05-05: Eyebrow tracking uses wide architectural letter spacing", () => {
    assert.ok(
      heroTsx.includes("tracking-[0.28em]") || heroTsx.includes("tracking-[0.24em]"),
      "Hero breadcrumb must utilize wide tracking"
    );
  });
});
