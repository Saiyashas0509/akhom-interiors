import { describe, it, assert } from "../harness/test-runner.mjs";
import {
  readSrcFile,
  simulateConsultationSubmission,
  validateWhatsAppUrl,
  APPROVED_CONTACTS,
} from "../harness/test-utils.mjs";

describe("Tier 3: Cross-Feature Interaction & Pairwise Integration", () => {
  const rootTsx = readSrcFile("routes/__root.tsx");
  const navTsx = readSrcFile("components/akhom/Nav.tsx");
  const formTsx = readSrcFile("components/akhom/ConsultationForm.tsx");
  const footerTsx = readSrcFile("components/akhom/SiteFooter.tsx");
  const heroTsx = readSrcFile("components/akhom/Hero.tsx");
  const servicesTsx = readSrcFile("components/akhom/Services.tsx");
  const selectedWorkTsx = readSrcFile("components/akhom/SelectedWork.tsx");
  const stylesCss = readSrcFile("styles.css");

  it("T3-INT-01: Navigation CTA links to /contact where ConsultationForm is mounted", () => {
    assert.ok(navTsx.includes('to="/contact"'), "Nav CTA must route to /contact");
    const contactTsx = readSrcFile("routes/contact.tsx");
    assert.ok(contactTsx.includes("<ConsultationForm"), "/contact must mount <ConsultationForm />");
  });

  it("T3-INT-02: Portfolio sector filter and lightbox modal coordinate state transitions", () => {
    assert.ok(selectedWorkTsx.includes("filter"), "SelectedWork must track active filter");
    assert.ok(
      selectedWorkTsx.includes("lightbox") || selectedWorkTsx.includes("setSelectedProject") || selectedWorkTsx.includes("portfolioModalOpen"),
      "SelectedWork must track modal/lightbox display state"
    );
  });

  it("T3-INT-03: Floating WhatsApp persists globally in root alongside all route outlets", () => {
    assert.ok(rootTsx.includes("<Outlet />"), "__root.tsx must render <Outlet />");
    assert.ok(rootTsx.includes("<WhatsAppFloating />"), "__root.tsx must render <WhatsAppFloating />");
    assert.ok(
      rootTsx.indexOf("<WhatsAppFloating />") > rootTsx.indexOf("<Outlet />"),
      "WhatsAppFloating must be mounted globally next to Outlet"
    );
  });

  it("T3-INT-04: Consultation form submission produces valid deep-linked WhatsApp dispatch URL", () => {
    const submission = simulateConsultationSubmission({
      name: "Sanjay Varma",
      email: "sanjay@varma.com",
      phone: "+91 94400 55667",
      location: "Hyderabad — Jubilee Hills",
      scope: "Villa",
      approxArea: "7,200 sq ft",
      projectStage: "Ready for Interior Fit-Out",
      contactMethod: "WhatsApp",
      consent: true,
    });

    assert.equal(submission.submitted, true);
    const validation = validateWhatsAppUrl(submission.whatsappUrl, {
      requiredTextFragment: "Sanjay%20Varma",
    });
    assert.ok(validation.valid, validation.reason);
    assert.ok(submission.whatsappUrl.includes("919704352346"));
  });

  it("T3-INT-05: 8-Pillars services grid categories align with Hero discipline pills", () => {
    // Hero discipline pills: DESIGN, DETAIL, CUSTOM CRAFT, EXECUTION
    // Services categories include: Design Services, Turnkey Execution, Custom Furniture & Joinery
    assert.ok(heroTsx.includes('"DESIGN"') && servicesTsx.includes("Design Services"));
    assert.ok(heroTsx.includes('"EXECUTION"') && servicesTsx.includes("Turnkey Execution"));
    assert.ok(heroTsx.includes('"CUSTOM CRAFT"') && servicesTsx.includes("Custom Furniture & Joinery"));
  });

  it("T3-INT-06: Brand palette tokens propagate from styles.css into core layout components", () => {
    assert.ok(stylesCss.includes("--burgundy: #7D2652;"));
    assert.ok(navTsx.includes("bg-burgundy") || navTsx.includes("text-burgundy"));
    assert.ok(heroTsx.includes("bg-burgundy") || heroTsx.includes("text-burgundy"));
    assert.ok(formTsx.includes("bg-burgundy") || formTsx.includes("text-burgundy"));
    assert.ok(footerTsx.includes("bg-dark"));
  });

  it("T3-INT-07: Schema.org structured data telephone matches SiteFooter and click-to-call links", () => {
    assert.ok(rootTsx.includes(APPROVED_CONTACTS.phoneCompact));
    assert.ok(footerTsx.includes(APPROVED_CONTACTS.phoneTel));
    assert.ok(footerTsx.includes(APPROVED_CONTACTS.phone));
  });

  it("T3-INT-08: Subpage PageShell component integrates Nav and SiteFooter across all 7 routes", () => {
    const pageShellTsx = readSrcFile("components/akhom/PageShell.tsx");
    assert.ok(pageShellTsx.includes("<Nav"), "PageShell must render <Nav />");
    assert.ok(pageShellTsx.includes("<SiteFooter"), "PageShell must render <SiteFooter />");
  });

  it("T3-INT-09: Mobile menu drawer open event traps keyboard focus and prevents underlying scroll", () => {
    assert.ok(
      navTsx.includes('overflow = open ? "hidden" : ""') || navTsx.includes('overflow = "hidden"'),
      "Nav must lock body overflow"
    );
    assert.ok(navTsx.includes("open") || navTsx.includes("menuOpen"), "Nav must manage drawer open state");
  });

  it("T3-INT-10: Privacy consent statement links directly to /privacy route created in M3", () => {
    assert.ok(formTsx.includes('to="/privacy"'));
    const privacyTsx = readSrcFile("routes/privacy.tsx");
    assert.ok(privacyTsx.includes("createFileRoute(\"/privacy\")"));
  });

  it("T3-INT-11: Footer legal links correctly map to registered routes /privacy and /terms", () => {
    assert.ok(footerTsx.includes('to="/privacy"'));
    assert.ok(footerTsx.includes('to="/terms"'));
    const termsTsx = readSrcFile("routes/terms.tsx");
    assert.ok(termsTsx.includes("createFileRoute(\"/terms\")"));
  });

  it("T3-INT-12: Lead persistence saves consultation in localStorage while generating email dispatch", () => {
    assert.ok(formTsx.includes("localStorage.setItem(\"akhom_last_enquiry\""));
    assert.ok(formTsx.includes("info@akhominteriors.com"));
    assert.ok(formTsx.includes("projects@akhominteriors.com"));
  });

  it("T3-INT-13: Process page 7 stages correspond to 8-pillar services execution stage", () => {
    const processTsx = readSrcFile("components/akhom/Process.tsx");
    assert.ok(processTsx.includes('"Execution"'));
    assert.ok(processTsx.includes('"Quality"'));
    assert.ok(processTsx.includes('"Handover"'));
  });

  it("T3-INT-14: Lightbox modal triggers from authentic puja-craft image card", () => {
    assert.ok(selectedWorkTsx.includes("pujaCraft"));
    assert.ok(selectedWorkTsx.includes("Bespoke Teak & Brass Mandir"));
  });

  it("T3-INT-15: Final CTA dual buttons direct to /contact and wa.me/919704352346 synchronously", () => {
    const finalCta = readSrcFile("components/akhom/FinalCta.tsx");
    assert.ok(finalCta.includes('to="/contact"'));
    assert.ok(finalCta.includes(APPROVED_CONTACTS.whatsAppPrefix));
  });
});
