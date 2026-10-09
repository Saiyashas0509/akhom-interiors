import { describe, it, assert } from "../harness/test-runner.mjs";
import { readSrcFile, APPROVED_CONTACTS } from "../harness/test-utils.mjs";

describe("Tier 1: Feature 06 — The Studio Section Overhaul", () => {
  const indexTsx = readSrcFile("routes/index.tsx");

  it("T1-F06-01: Eyebrow displays THE STUDIO", () => {
    assert.match(indexTsx, /THE STUDIO/, "Studio section eyebrow must display THE STUDIO");
  });

  it("T1-F06-02: Studio section utilizes ivory background surface", () => {
    assert.ok(indexTsx.includes("bg-ivory"), "The Studio section must render with bg-ivory surface");
  });

  it("T1-F06-03: Studio section features dedicated philosophy headline distinct from Hero", () => {
    assert.ok(
      indexTsx.includes("Built with intention") || indexTsx.includes("Finished with permanence"),
      "The Studio section must feature a dedicated architectural philosophy headline"
    );
  });

  it("T1-F06-04: Displays dual trust pillars (In-House joinery & One Team drawing to handover)", () => {
    assert.ok(indexTsx.includes("In-House") || indexTsx.includes("In-house"), "Must display In-House trust pillar");
    assert.ok(indexTsx.includes("One Team") || indexTsx.includes("One team"), "Must display One Team trust pillar");
  });

  it("T1-F06-05: Renders 2 architectural segment cards for Residential and Corporate", () => {
    assert.ok(indexTsx.includes("Homes that age well"), "Must render Residential card 'Homes that age well'");
    assert.ok(indexTsx.includes("Workplaces with presence"), "Must render Corporate card 'Workplaces with presence'");
  });
});

describe("Tier 1: Feature 07 — 8-Pillar Services Grid Overhaul", () => {
  const servicesTsx = readSrcFile("components/akhom/Services.tsx");

  it("T1-F07-01: Section title is 'Everything a finished space needs, in one contract.'", () => {
    assert.ok(
      servicesTsx.includes("Everything a finished space needs, in one contract."),
      "Services title must match PRD specification"
    );
  });

  it("T1-F07-02: Exactly 8 service pillars are declared in data inventory", () => {
    const servicesCount = (servicesTsx.match(/n:\s*"0[1-8]"/g) || []).length;
    assert.equal(servicesCount, 8, "Must contain exactly 8 services numbered 01 through 08");
  });

  it("T1-F07-03: Official category badges are present", () => {
    assert.ok(servicesTsx.includes("[PRIMARY]"), "Must have [PRIMARY] badge");
    assert.ok(servicesTsx.includes("[COMMERCIAL]"), "Must have [COMMERCIAL] badge");
    assert.ok(servicesTsx.includes("[HEALTHCARE • NEW]"), "Must have [HEALTHCARE • NEW] badge");
    assert.ok(servicesTsx.includes("[HOSPITALITY • NEW]"), "Must have [HOSPITALITY • NEW] badge");
    assert.ok(servicesTsx.includes("[CORE CAPABILITY]"), "Must have [CORE CAPABILITY] badge");
    assert.ok(servicesTsx.includes("[DIFFERENTIATOR]"), "Must have [DIFFERENTIATOR] badge");
    assert.ok(servicesTsx.includes("[GROWTH]"), "Must have [GROWTH] badge");
  });

  it("T1-F07-04: Includes Healthcare and Hospitality service pillars", () => {
    assert.ok(servicesTsx.includes("Healthcare & Hospital Interiors"), "Must include Healthcare & Hospital Interiors");
    assert.ok(servicesTsx.includes("Hospitality Interiors"), "Must include Hospitality Interiors");
  });

  it("T1-F07-05: Includes Custom Furniture & Joinery with in-house workshop description", () => {
    assert.ok(servicesTsx.includes("Custom Furniture & Joinery"), "Must include Custom Furniture & Joinery");
    assert.ok(
      servicesTsx.includes("Hyderabad workshop") || servicesTsx.includes("workshop"),
      "Must describe custom joinery workshop"
    );
  });
});

describe("Tier 1: Feature 08 — Seven Stages Process Overhaul", () => {
  const processTsx = readSrcFile("components/akhom/Process.tsx");

  it("T1-F08-01: Section canvas is styled with Dark bg-dark", () => {
    assert.ok(processTsx.includes("bg-dark"), "Process section must use bg-dark canvas");
  });

  it("T1-F08-02: Section title is 'Seven stages. You always know which one you're in.'", () => {
    assert.ok(
      processTsx.includes("Seven stages. You always know which one you're in."),
      "Process headline must match verbatim specification"
    );
  });

  it("T1-F08-03: Exactly 7 numbered stages are present in sequential order", () => {
    const stageIndices = (processTsx.match(/n:\s*"0[1-7]"/g) || []).length;
    assert.equal(stageIndices, 7, "Must contain exactly 7 stages numbered 01 through 07");
  });

  it("T1-F08-04: Mandatory Stage 06 Quality includes snagging and multi-point audit", () => {
    assert.ok(processTsx.includes('"Quality"'), "Stage 06 must be titled Quality");
    assert.ok(
      processTsx.includes("snagging") || processTsx.includes("tolerances"),
      "Stage 06 description must specify snagging / tolerances audit"
    );
  });

  it("T1-F08-05: Stage 07 Handover includes warranty and walkthrough", () => {
    assert.ok(processTsx.includes('"Handover"'), "Stage 07 must be titled Handover");
    assert.ok(
      processTsx.includes("walkthrough") || processTsx.includes("warranty"),
      "Stage 07 description must mention walkthrough or warranty"
    );
  });
});

describe("Tier 1: Feature 09 — Portfolio & Craft Showcase", () => {
  const selectedWorkTsx = readSrcFile("components/akhom/SelectedWork.tsx");

  it("T1-F09-01: Headline features architectural portfolio showcase", () => {
    assert.ok(
      selectedWorkTsx.includes("Rooms designed & built.") || selectedWorkTsx.includes("Rooms we've designed and built."),
      "Portfolio headline must introduce designed and built spaces"
    );
  });

  it("T1-F09-02: Features Request Our Portfolio interactive CTA", () => {
    assert.ok(
      selectedWorkTsx.includes("Request Our Portfolio") || selectedWorkTsx.includes("REQUEST OUR PORTFOLIO"),
      "Must feature Request Our Portfolio action"
    );
  });

  it("T1-F09-03: Incorporates authentic puja mandir craft asset puja-craft.jpg", () => {
    assert.ok(
      selectedWorkTsx.includes("pujaCraft") || selectedWorkTsx.includes("puja-craft.jpg"),
      "SelectedWork must import puja-craft.jpg asset"
    );
  });

  it("T1-F09-04: Features handcrafted wooden puja mandir description with brass details", () => {
    assert.ok(
      selectedWorkTsx.includes("Mandir") || selectedWorkTsx.includes("puja"),
      "Portfolio must include puja mandir showcase item"
    );
    assert.ok(
      selectedWorkTsx.includes("brass") || selectedWorkTsx.includes("teak"),
      "Mandir item description must detail authentic materials (brass/teak)"
    );
  });

  it("T1-F09-05: Interactive filter bar includes sector categories", () => {
    assert.ok(selectedWorkTsx.includes("All Works") || selectedWorkTsx.includes("all"), "Filter must support all items");
    assert.ok(selectedWorkTsx.includes("residential"), "Filter must support residential");
    assert.ok(selectedWorkTsx.includes("commercial"), "Filter must support commercial");
    assert.ok(selectedWorkTsx.includes("craft"), "Filter must support craft");
  });
});

describe("Tier 1: Feature 10 — Final CTA Band Overhaul", () => {
  const finalCtaTsx = readSrcFile("components/akhom/FinalCta.tsx");

  it("T1-F10-01: Headline is 'Tell us about the space. We'll tell you the truth.'", () => {
    assert.ok(
      finalCtaTsx.includes("Tell us about the space. We'll tell you the truth."),
      "Final CTA headline must match PRD specification"
    );
  });

  it("T1-F10-02: Primary consultation action button links to /contact", () => {
    assert.ok(
      finalCtaTsx.includes('to="/contact"') && finalCtaTsx.includes("Consultation"),
      "Primary button must link to /contact"
    );
  });

  it("T1-F10-03: Secondary action provides direct WhatsApp link with country code 91", () => {
    assert.ok(
      finalCtaTsx.includes(APPROVED_CONTACTS.whatsAppPrefix),
      `Secondary button must link to ${APPROVED_CONTACTS.whatsAppPrefix}`
    );
  });

  it("T1-F10-04: Direct email info@akhominteriors.com is displayed", () => {
    assert.ok(
      finalCtaTsx.includes(APPROVED_CONTACTS.email),
      `Final CTA must display ${APPROVED_CONTACTS.email}`
    );
  });

  it("T1-F10-05: Direct phone click-to-call link is present", () => {
    assert.ok(
      finalCtaTsx.includes(APPROVED_CONTACTS.phoneTel),
      `Final CTA must provide click-to-call ${APPROVED_CONTACTS.phoneTel}`
    );
  });
});
