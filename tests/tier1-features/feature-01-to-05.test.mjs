import { describe, it, assert } from "../harness/test-runner.mjs";
import { readSrcFile, readProjectFile, APPROVED_CONTACTS } from "../harness/test-utils.mjs";

describe("Tier 1: Feature 01 — 6-Color Brand Palette", () => {
  const stylesCss = readSrcFile("styles.css");

  it("T1-F01-01: Burgundy token is exactly #7D2652", () => {
    assert.match(stylesCss, /--burgundy:\s*#7D2652;/i, "styles.css must declare --burgundy: #7D2652");
  });

  it("T1-F01-02: Burgundy hover (#621D40) and light (#D6A6BC) tokens are declared", () => {
    assert.match(stylesCss, /--burgundy-hover:\s*#621D40;/i, "styles.css must declare --burgundy-hover: #621D40");
    assert.match(stylesCss, /--burgundy-light:\s*#D6A6BC;/i, "styles.css must declare --burgundy-light: #D6A6BC");
  });

  it("T1-F01-03: Dark token is exactly #141212", () => {
    assert.match(stylesCss, /--dark:\s*#141212;/i, "styles.css must declare --dark: #141212");
    assert.match(stylesCss, /--ink:\s*#141212;/i, "styles.css must declare --ink: #141212");
  });

  it("T1-F01-04: Ivory (#F4F0EA) and Stone (#E6DFD6) tokens are declared", () => {
    assert.match(stylesCss, /--ivory:\s*#F4F0EA;/i, "styles.css must declare --ivory: #F4F0EA");
    assert.match(stylesCss, /--stone:\s*#E6DFD6;/i, "styles.css must declare --stone: #E6DFD6");
  });

  it("T1-F01-05: @theme inline maps all official color variables to Tailwind tokens", () => {
    assert.ok(stylesCss.includes("--color-burgundy: var(--burgundy);"), "Must expose --color-burgundy");
    assert.ok(stylesCss.includes("--color-dark: var(--dark);"), "Must expose --color-dark");
    assert.ok(stylesCss.includes("--color-ivory: var(--ivory);"), "Must expose --color-ivory");
    assert.ok(stylesCss.includes("--color-stone: var(--stone);"), "Must expose --color-stone");
  });
});

describe("Tier 1: Feature 02 — Typography Hierarchy & WCAG AA", () => {
  const rootTsx = readSrcFile("routes/__root.tsx");
  const stylesCss = readSrcFile("styles.css");

  it("T1-F02-01: Cormorant Garamond serif Google Font link is configured in root layout", () => {
    assert.ok(
      rootTsx.includes("family=Cormorant+Garamond") && rootTsx.includes("family=Inter"),
      "__root.tsx must load Google Fonts Cormorant Garamond and Inter"
    );
  });

  it("T1-F02-02: Tailwind font tokens configure Cormorant Garamond for serif", () => {
    assert.match(stylesCss, /--font-serif:\s*"Cormorant Garamond"/, "styles.css must configure Cormorant Garamond for --font-serif");
  });

  it("T1-F02-03: Tailwind font tokens configure Inter for sans", () => {
    assert.match(stylesCss, /--font-sans:\s*"Inter"/, "styles.css must configure Inter for --font-sans");
  });

  it("T1-F02-04: Display typography utility is styled with serif and light weight", () => {
    assert.ok(stylesCss.includes("@utility display"), "styles.css must define @utility display");
    assert.ok(stylesCss.includes("font-family: var(--font-serif);"), "display utility must use var(--font-serif)");
  });

  it("T1-F02-05: Base body typography applies antialiasing and Inter sans font", () => {
    assert.ok(stylesCss.includes("font-family: var(--font-sans);"), "body must use var(--font-sans)");
    assert.ok(stylesCss.includes("-webkit-font-smoothing: antialiased;"), "body must have antialiased smoothing");
  });
});

describe("Tier 1: Feature 03 — Global Floating WhatsApp Mount", () => {
  const rootTsx = readSrcFile("routes/__root.tsx");
  const floatingTsx = readSrcFile("components/akhom/WhatsAppFloating.tsx");

  it("T1-F03-01: WhatsAppFloating is imported into __root.tsx", () => {
    assert.match(
      rootTsx,
      /import\s+\{\s*WhatsAppFloating\s*\}\s+from\s+["']@\/components\/akhom\/WhatsAppFloating["']/,
      "__root.tsx must import WhatsAppFloating component"
    );
  });

  it("T1-F03-02: WhatsAppFloating is mounted inside RootComponent", () => {
    assert.match(rootTsx, /<WhatsAppFloating\s*\/>/, "__root.tsx must render <WhatsAppFloating />");
  });

  it("T1-F03-03: WhatsAppFloating container uses fixed bottom-right coordinates", () => {
    assert.ok(
      floatingTsx.includes("fixed") && floatingTsx.includes("bottom-6") && floatingTsx.includes("right-6"),
      "WhatsAppFloating must use fixed bottom-6 right-6 positioning"
    );
  });

  it("T1-F03-04: Floating WhatsApp link uses approved prefix and country code 91", () => {
    assert.ok(
      floatingTsx.includes(APPROVED_CONTACTS.whatsAppPrefix),
      `WhatsAppFloating must point to ${APPROVED_CONTACTS.whatsAppPrefix}`
    );
  });

  it("T1-F03-05: Floating WhatsApp button includes animated ping pulse indicator", () => {
    assert.ok(
      floatingTsx.includes("animate-ping") && floatingTsx.includes("bg-[#25D366]"),
      "WhatsAppFloating must include animate-ping pulse ring"
    );
  });
});

describe("Tier 1: Feature 04 — Global 404 & HTML Shell Clean-up", () => {
  const html404 = readProjectFile("public/404.html");
  const rootTsx = readSrcFile("routes/__root.tsx");

  it("T1-F04-01: public/404.html uses root-relative icon path /favicon.png", () => {
    assert.ok(html404.includes('href="/favicon.png"'), "404.html icon path must be /favicon.png");
    assert.ok(!html404.includes("/akhom-interiors/"), "404.html must not contain obsolete /akhom-interiors/ prefix");
  });

  it("T1-F04-02: public/404.html script points to /src/main.tsx without subpath prefix", () => {
    assert.ok(html404.includes('src="/src/main.tsx"'), "404.html main script must be /src/main.tsx");
  });

  it("T1-F04-03: __root.tsx defines custom NotFoundComponent", () => {
    assert.ok(rootTsx.includes("function NotFoundComponent()"), "__root.tsx must define NotFoundComponent");
  });

  it("T1-F04-04: NotFoundComponent contains return link to homepage", () => {
    assert.ok(
      rootTsx.includes('to="/"') && rootTsx.includes("Return to Homepage"),
      "NotFoundComponent must provide Return to Homepage link"
    );
  });

  it("T1-F04-05: __root.tsx binds notFoundComponent in Route configuration", () => {
    assert.ok(rootTsx.includes("notFoundComponent: NotFoundComponent"), "Route configuration must mount notFoundComponent");
  });
});

describe("Tier 1: Feature 05 — Hero Section Overhaul", () => {
  const heroTsx = readSrcFile("components/akhom/Hero.tsx");

  it("T1-F05-01: Hero canvas uses dark background styling", () => {
    assert.ok(heroTsx.includes("bg-dark") || heroTsx.includes("HeroVideoBg"), "Hero must incorporate dark canvas or video background");
  });

  it("T1-F05-02: Breadcrumb displays uppercase AKHOM INTERIORS / HYDERABAD", () => {
    assert.ok(heroTsx.includes("AKHOM INTERIORS / HYDERABAD"), "Hero breadcrumb must display AKHOM INTERIORS / HYDERABAD");
  });

  it("T1-F05-03: Headline renders Timeless designs and Thoughtful spaces", () => {
    assert.ok(heroTsx.includes("Timeless designs."), "Hero must feature 'Timeless designs.'");
    assert.ok(heroTsx.includes("Thoughtful spaces."), "Hero must feature 'Thoughtful spaces.'");
  });

  it("T1-F05-04: Dual action buttons link to /contact and /projects", () => {
    assert.ok(heroTsx.includes('to="/contact"'), "Primary action must link to /contact");
    assert.ok(heroTsx.includes('to="/projects"'), "Secondary action must link to /projects");
  });

  it("T1-F05-05: Floating card renders all 4 uppercase discipline pills", () => {
    assert.ok(heroTsx.includes('"DESIGN"'), "Discipline pill 01 must be DESIGN");
    assert.ok(heroTsx.includes('"DETAIL"'), "Discipline pill 02 must be DETAIL");
    assert.ok(heroTsx.includes('"CUSTOM CRAFT"'), "Discipline pill 03 must be CUSTOM CRAFT");
    assert.ok(heroTsx.includes('"EXECUTION"'), "Discipline pill 04 must be EXECUTION");
  });
});
