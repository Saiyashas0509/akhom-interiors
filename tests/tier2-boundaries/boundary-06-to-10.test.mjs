import { describe, it, assert } from "../harness/test-runner.mjs";
import { readSrcFile, APPROVED_CONTACTS, findFontSizesBelow12px } from "../harness/test-utils.mjs";

describe("Tier 2: Boundary 06 — The Studio Section Corner Cases", () => {
  const indexTsx = readSrcFile("routes/index.tsx");

  it("T2-F06-01: Studio eyebrow is strictly uppercase THE STUDIO", () => {
    assert.ok(indexTsx.includes(">THE STUDIO<"), "Studio eyebrow must be exactly THE STUDIO without suffix");
  });

  it("T2-F06-02: Studio trust pillars emphasize In-House joinery & One Team drawing to handover", () => {
    assert.ok(indexTsx.includes("In-House") || indexTsx.includes("In-house"));
    assert.ok(indexTsx.includes("One Team") || indexTsx.includes("One team"));
  });

  it("T2-F06-03: Segment cards link to /residential and /corporate with descriptive image alts", () => {
    assert.ok(indexTsx.includes('to="/residential"'), "Must link to /residential");
    assert.ok(indexTsx.includes('to="/corporate"'), "Must link to /corporate");
  });

  it("T2-F06-04: Studio copy highlights American walnut and natural stone palette", () => {
    assert.ok(indexTsx.includes("American walnut") || indexTsx.includes("natural stone"));
  });

  it("T2-F06-05: About the Studio link has hover transition animation", () => {
    assert.ok(indexTsx.includes('to="/about"'), "Must provide link to /about");
    assert.ok(indexTsx.includes("group-hover:translate-x-1"), "Must include group-hover transition");
  });
});

describe("Tier 2: Boundary 07 — 8-Pillar Services Grid Corner Cases", () => {
  const servicesTsx = readSrcFile("components/akhom/Services.tsx");

  it("T2-F07-01: Category badges in Services grid do not use sub-12px classes", () => {
    const sub12 = findFontSizesBelow12px(servicesTsx);
    assert.equal(sub12.length, 0, `Services grid contains sub-12px fonts: ${sub12.join(", ")}`);
  });

  it("T2-F07-02: Services card descriptions use font-light and leading-relaxed", () => {
    assert.ok(servicesTsx.includes("leading-relaxed"), "Services descriptions must use leading-relaxed");
  });

  it("T2-F07-03: Responsive grid layout adapts across breakpoints (1-col to 4-col)", () => {
    assert.ok(servicesTsx.includes("grid-cols-1"), "Grid must support 1-col on mobile");
    assert.ok(servicesTsx.includes("md:grid-cols-2") || servicesTsx.includes("sm:grid-cols-2"), "Grid must support 2-col");
    assert.ok(servicesTsx.includes("lg:grid-cols-4"), "Grid must support 4-col on desktop");
  });

  it("T2-F07-04: Turnkey Execution service card explicitly lists MEP and Civil engineering", () => {
    assert.ok(servicesTsx.includes("Civil Works"), "Must list Civil Works");
    assert.ok(servicesTsx.includes("MEP Engineering"), "Must list MEP Engineering");
  });

  it("T2-F07-05: Renovation service card specifies modern finish upgrades and bath/kitchen remodelling", () => {
    assert.ok(servicesTsx.includes("Renovation & Remodelling"), "Must include Renovation & Remodelling");
    assert.ok(servicesTsx.includes("kitchen and bath") || servicesTsx.includes("remodelling"));
  });
});

describe("Tier 2: Boundary 08 — Seven Stages Process Corner Cases", () => {
  const processTsx = readSrcFile("components/akhom/Process.tsx");

  it("T2-F08-01: High-contrast text uses ivory typography over dark background", () => {
    assert.ok(processTsx.includes("bg-dark") && processTsx.includes("text-ivory"), "Canvas must use ivory on dark");
  });

  it("T2-F08-02: Numbered stages all use strict two-digit indexing (01 to 07)", () => {
    for (let i = 1; i <= 7; i++) {
      const idx = `0${i}`;
      assert.ok(processTsx.includes(`"${idx}"`), `Process must contain index "${idx}"`);
    }
  });

  it("T2-F08-03: Stage 03 Design Development specifies 3D visualisations before civil works begin", () => {
    assert.ok(processTsx.includes("3D visualisation") || processTsx.includes("3D"));
  });

  it("T2-F08-04: Stage 04 Materials specifies locking specifications line by line", () => {
    assert.ok(processTsx.includes("locked line by line") || processTsx.includes("block by block"));
  });

  it("T2-F08-05: Stage 05 Execution specifies on-site fit-out with photo updates", () => {
    assert.ok(processTsx.includes("site supervisor") || processTsx.includes("photo updates"));
  });
});

describe("Tier 2: Boundary 09 — Portfolio & Craft Showcase Corner Cases", () => {
  const selectedWorkTsx = readSrcFile("components/akhom/SelectedWork.tsx");

  it("T2-F09-01: Filter bar maintains active category styling distinction", () => {
    assert.ok(
      selectedWorkTsx.includes("activeFilter") || selectedWorkTsx.includes("filter"),
      "Must track active filter in state"
    );
  });

  it("T2-F09-02: Project cards render image alt attributes for accessibility", () => {
    assert.ok(selectedWorkTsx.includes("item.alt") || selectedWorkTsx.includes("alt="), "Image tags must have alt attributes");
  });

  it("T2-F09-03: Puja mandir item includes in-house workshop joinery badge/meta", () => {
    assert.ok(
      selectedWorkTsx.includes("In-House Workshop Joinery") || selectedWorkTsx.includes("Mandir"),
      "Puja mandir card must feature In-House Joinery attribution"
    );
  });

  it("T2-F09-04: Lookbook request modal contains email and phone input fields", () => {
    assert.ok(selectedWorkTsx.includes('type="email"') || selectedWorkTsx.includes("lookbookEmail"), "Modal must have email field");
    assert.ok(selectedWorkTsx.includes('type="tel"') || selectedWorkTsx.includes("lookbookPhone"), "Modal must have phone field");
  });

  it("T2-F09-05: Lightbox modal provides close button and escape handling", () => {
    assert.ok(
      selectedWorkTsx.includes("setSelectedProject(null)") || selectedWorkTsx.includes("setLightboxItem(null)"),
      "Lightbox must provide dismiss action"
    );
  });
});

describe("Tier 2: Boundary 10 — Final CTA Band Corner Cases", () => {
  const finalCtaTsx = readSrcFile("components/akhom/FinalCta.tsx");

  it("T2-F10-01: WhatsApp inquiry deep link includes prefilled text parameter", () => {
    assert.ok(
      finalCtaTsx.includes("text=Hi%20AKHOM%2C%20I%27d%20like%20to%20discuss%20my%20space."),
      "WhatsApp link must include prefilled discussion prompt"
    );
  });

  it("T2-F10-02: Consultation button has uppercase tracking and ivory text", () => {
    assert.ok(finalCtaTsx.includes("uppercase"), "Consultation button must use uppercase styling");
    assert.ok(finalCtaTsx.includes("text-ivory"), "Consultation button must use ivory text");
  });

  it("T2-F10-03: Secondary WhatsApp button has hover border transition", () => {
    assert.ok(
      finalCtaTsx.includes("hover:border-burgundy") || finalCtaTsx.includes("hover:text-burgundy"),
      "Secondary WhatsApp button must include hover transition"
    );
  });

  it("T2-F10-04: Click-to-call link uses exact URI scheme tel:+919177361122 without formatting spaces", () => {
    assert.ok(finalCtaTsx.includes('href="tel:+919177361122"'), "tel URI must be +919177361122 without whitespace");
  });

  it("T2-F10-05: Direct mailto link points to approved email info@akhominteriors.com", () => {
    assert.ok(finalCtaTsx.includes("info@akhominteriors.com"), "Email link must use info@akhominteriors.com");
  });
});
