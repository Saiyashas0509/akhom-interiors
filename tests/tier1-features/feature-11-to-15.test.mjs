import { describe, it, assert } from "../harness/test-runner.mjs";
import { readSrcFile, APPROVED_CONTACTS } from "../harness/test-utils.mjs";

describe("Tier 1: Feature 11 — Complete Site Footer", () => {
  const footerTsx = readSrcFile("components/akhom/SiteFooter.tsx");

  it("T1-F11-01: Footer canvas is styled with Dark background", () => {
    assert.ok(footerTsx.includes("bg-dark"), "Footer must use bg-dark canvas");
  });

  it("T1-F11-02: Studio location displays Hyderabad, Telangana", () => {
    assert.ok(footerTsx.includes(APPROVED_CONTACTS.location), `Footer must display ${APPROVED_CONTACTS.location}`);
  });

  it("T1-F11-03: Studio phone links to tel:+919177361122", () => {
    assert.ok(footerTsx.includes(APPROVED_CONTACTS.phoneTel), `Footer must link to ${APPROVED_CONTACTS.phoneTel}`);
    assert.ok(footerTsx.includes(APPROVED_CONTACTS.phone), `Footer must display ${APPROVED_CONTACTS.phone}`);
  });

  it("T1-F11-04: WhatsApp link points to approved wa.me/919704352346", () => {
    assert.ok(
      footerTsx.includes(APPROVED_CONTACTS.whatsAppPrefix),
      `Footer must link to ${APPROVED_CONTACTS.whatsAppPrefix}`
    );
  });

  it("T1-F11-05: Footer includes legal navigation links for /privacy and /terms", () => {
    assert.ok(footerTsx.includes('to="/privacy"'), "Footer must link to /privacy");
    assert.ok(footerTsx.includes('to="/terms"'), "Footer must link to /terms");
  });
});

describe("Tier 1: Feature 12 — Sub-Pages Consistency (7 Routes)", () => {
  const residential = readSrcFile("routes/residential.tsx");
  const corporate = readSrcFile("routes/corporate.tsx");
  const services = readSrcFile("routes/services.tsx");
  const projects = readSrcFile("routes/projects.tsx");
  const process = readSrcFile("routes/process.tsx");
  const about = readSrcFile("routes/about.tsx");
  const contact = readSrcFile("routes/contact.tsx");

  it("T1-F12-01: /residential imports and renders PageShell architecture", () => {
    assert.ok(residential.includes("<PageShell"), "residential.tsx must wrap content in PageShell");
  });

  it("T1-F12-02: /corporate imports and renders PageShell architecture", () => {
    assert.ok(corporate.includes("<PageShell"), "corporate.tsx must wrap content in PageShell");
  });

  it("T1-F12-03: /services imports and renders PageShell with Services grid", () => {
    assert.ok(services.includes("<PageShell"), "services.tsx must wrap content in PageShell");
    assert.ok(services.includes("<Services"), "services.tsx must render <Services />");
  });

  it("T1-F12-04: /projects imports and renders PageShell with SelectedWork showcase", () => {
    assert.ok(projects.includes("<PageShell"), "projects.tsx must wrap content in PageShell");
    assert.ok(projects.includes("<SelectedWork"), "projects.tsx must render <SelectedWork />");
  });

  it("T1-F12-05: /process, /about, and /contact inherit PageShell consistency", () => {
    assert.ok(process.includes("<PageShell"), "process.tsx must render <PageShell />");
    assert.ok(about.includes("<PageShell"), "about.tsx must render <PageShell />");
    assert.ok(contact.includes("<PageShell"), "contact.tsx must render <PageShell />");
  });
});

describe("Tier 1: Feature 13 — Process Subpage Metadata Alignment", () => {
  const processTsx = readSrcFile("routes/process.tsx");

  it("T1-F13-01: Process route metadata declares Seven stages", () => {
    assert.ok(
      processTsx.includes('"Seven stages"'),
      "process.tsx meta tags must declare 'Seven stages'"
    );
  });

  it("T1-F13-02: Obsolete 'Six stages' label is completely eliminated", () => {
    assert.ok(
      !processTsx.includes('"Six stages"'),
      "process.tsx must not contain outdated 'Six stages' string"
    );
  });

  it("T1-F13-03: Metadata array includes 'One team' and 'Fixed dates'", () => {
    assert.ok(processTsx.includes('"One team"'), "process.tsx must declare 'One team'");
    assert.ok(processTsx.includes('"Fixed dates"'), "process.tsx must declare 'Fixed dates'");
  });

  it("T1-F13-04: Process route renders the <Process /> core component", () => {
    assert.ok(processTsx.includes("<Process"), "process.tsx must render <Process />");
  });

  it("T1-F13-05: Process route mounts <FinalCta /> component", () => {
    assert.ok(processTsx.includes("<FinalCta"), "process.tsx must render <FinalCta />");
  });
});

describe("Tier 1: Feature 14 — Page Title Case Branding", () => {
  const residential = readSrcFile("routes/residential.tsx");
  const corporate = readSrcFile("routes/corporate.tsx");
  const projects = readSrcFile("routes/projects.tsx");
  const services = readSrcFile("routes/services.tsx");
  const contact = readSrcFile("routes/contact.tsx");

  it("T1-F14-01: /residential title contains uppercase AKHOM INTERIORS", () => {
    assert.ok(residential.includes("AKHOM INTERIORS"), "residential.tsx must have uppercase AKHOM INTERIORS in title");
  });

  it("T1-F14-02: /corporate title contains uppercase AKHOM INTERIORS", () => {
    assert.ok(corporate.includes("AKHOM INTERIORS"), "corporate.tsx must have uppercase AKHOM INTERIORS in title");
  });

  it("T1-F14-03: /projects title contains uppercase AKHOM INTERIORS", () => {
    assert.ok(projects.includes("AKHOM INTERIORS"), "projects.tsx must have uppercase AKHOM INTERIORS in title");
  });

  it("T1-F14-04: /services title contains uppercase AKHOM INTERIORS", () => {
    assert.ok(services.includes("AKHOM INTERIORS"), "services.tsx must have uppercase AKHOM INTERIORS in title");
  });

  it("T1-F14-05: /contact title contains uppercase AKHOM INTERIORS", () => {
    assert.ok(contact.includes("AKHOM INTERIORS"), "contact.tsx must have uppercase AKHOM INTERIORS in title");
  });
});

describe("Tier 1: Feature 15 — Legal Pages Verification", () => {
  const privacyTsx = readSrcFile("routes/privacy.tsx");
  const termsTsx = readSrcFile("routes/terms.tsx");

  it("T1-F15-01: /privacy route file exists and defines createFileRoute('/privacy')", () => {
    assert.ok(privacyTsx.includes("createFileRoute(\"/privacy\")"), "privacy.tsx must define Route for /privacy");
  });

  it("T1-F15-02: /terms route file exists and defines createFileRoute('/terms')", () => {
    assert.ok(termsTsx.includes("createFileRoute(\"/terms\")"), "terms.tsx must define Route for /terms");
  });

  it("T1-F15-03: Privacy policy documents approved studio contact information", () => {
    assert.ok(privacyTsx.includes(APPROVED_CONTACTS.email), `privacy.tsx must contain ${APPROVED_CONTACTS.email}`);
    assert.ok(privacyTsx.includes(APPROVED_CONTACTS.phone), `privacy.tsx must contain ${APPROVED_CONTACTS.phone}`);
    assert.ok(privacyTsx.includes(APPROVED_CONTACTS.location), `privacy.tsx must contain ${APPROVED_CONTACTS.location}`);
  });

  it("T1-F15-04: Terms of service documents jurisdiction as Hyderabad, Telangana", () => {
    assert.ok(termsTsx.includes(APPROVED_CONTACTS.location), `terms.tsx must specify jurisdiction in ${APPROVED_CONTACTS.location}`);
  });

  it("T1-F15-05: Both legal pages provide header navigation and footer", () => {
    assert.ok(privacyTsx.includes("<Nav"), "privacy.tsx must render <Nav />");
    assert.ok(privacyTsx.includes("<SiteFooter"), "privacy.tsx must render <SiteFooter />");
    assert.ok(termsTsx.includes("<Nav"), "terms.tsx must render <Nav />");
    assert.ok(termsTsx.includes("<SiteFooter"), "terms.tsx must render <SiteFooter />");
  });
});
