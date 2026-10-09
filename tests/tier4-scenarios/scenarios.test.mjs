import { describe, it, assert } from "../harness/test-runner.mjs";
import {
  readSrcFile,
  simulateConsultationSubmission,
  validateWhatsAppUrl,
  APPROVED_CONTACTS,
} from "../harness/test-utils.mjs";

describe("Tier 4: Scenario 1 — Villa Consultation Booking Flow", () => {
  it("S01: Complete client journey from residential discovery to consultation lead capture", () => {
    // 1. Client views homepage Studio section emphasizing residential spaces
    const indexTsx = readSrcFile("routes/index.tsx");
    assert.ok(indexTsx.includes("Homes that age well"), "Homepage must showcase Residential segment card");
    assert.ok(indexTsx.includes('to="/residential"'), "Segment card links to /residential");

    // 2. Client navigates to /residential
    const residentialTsx = readSrcFile("routes/residential.tsx");
    assert.ok(residentialTsx.includes("<PageShell"), "Residential page renders PageShell");

    // 3. Client proceeds to /contact
    const contactTsx = readSrcFile("routes/contact.tsx");
    assert.ok(contactTsx.includes("<ConsultationForm"), "Contact page renders ConsultationForm");

    // 4. Client submits Villa lead form
    const leadInput = {
      name: "Ramesh Kolasani",
      email: "ramesh@kolasani.com",
      phone: "+91 98480 22334",
      location: "Hyderabad — Kokapet / Gandipet",
      scope: "Villa",
      approxArea: "6,500 sq ft",
      projectStage: "Ready for Interior Fit-Out",
      contactMethod: "WhatsApp",
      message: "Looking for complete turnkey interior design with solid teak joinery and Italian marble floors.",
      consent: true,
      leadSource: "homepage_villa_segment",
    };

    const submissionResult = simulateConsultationSubmission(leadInput);

    // 5. Verify lead record schema
    assert.equal(submissionResult.status, "success");
    assert.equal(submissionResult.submitted, true);
    assert.equal(submissionResult.leadRecord.scope, "Villa");
    assert.equal(submissionResult.leadRecord.approxArea, "6,500 sq ft");
    assert.equal(submissionResult.leadRecord.recipient, APPROVED_CONTACTS.email);
    assert.equal(submissionResult.leadRecord.leadSource, "homepage_villa_segment");

    // 6. Verify instant WhatsApp follow-up link
    const waValidation = validateWhatsAppUrl(submissionResult.whatsappUrl, {
      requiredTextFragment: "Ramesh%20Kolasani",
    });
    assert.ok(waValidation.valid, waValidation.reason);
    assert.ok(submissionResult.whatsappUrl.includes("wa.me/919704352346"));
    assert.ok(submissionResult.whatsappUrl.includes(encodeURIComponent("*Scope:* Villa")));
  });
});

describe("Tier 4: Scenario 2 — Corporate GCC Fit-Out Inquiry Flow", () => {
  it("S02: Commercial client discovers GCC workspace solutions and initiates consultation", () => {
    // 1. Client visits /corporate route
    const corporateTsx = readSrcFile("routes/corporate.tsx");
    assert.ok(corporateTsx.includes("Workplaces with presence") || corporateTsx.includes("Commercial"));

    // 2. Client reviews 8-Pillar Services corporate offering
    const servicesTsx = readSrcFile("components/akhom/Services.tsx");
    assert.ok(servicesTsx.includes("Corporate & Commercial"));
    assert.ok(servicesTsx.includes("[COMMERCIAL]"));
    assert.ok(servicesTsx.includes("Corporate & GCC"));

    // 3. Client fills out corporate consultation request
    const corporateLead = {
      name: "Vikas Malhotra",
      email: "v.malhotra@tech-gcc.com",
      phone: "+91 99890 33445",
      location: "Hyderabad — Financial District / Hitec City",
      scope: "Commercial / GCC",
      approxArea: "25,000 sq ft",
      projectStage: "Civil Structure Under Construction",
      contactMethod: "Email",
      message: "Phase 1 GCC development for 200 workstations, cafeteria, and leadership boardrooms.",
      consent: true,
      leadSource: "corporate_page",
    };

    const result = simulateConsultationSubmission(corporateLead);

    assert.equal(result.submitted, true);
    assert.equal(result.leadRecord.scope, "Commercial / GCC");
    assert.equal(result.leadRecord.approxArea, "25,000 sq ft");
    assert.equal(result.leadRecord.contactMethod, "Email");

    // Verify WhatsApp deep-link formatting for corporate lead
    assert.ok(result.whatsappUrl.includes(encodeURIComponent("*Scope:* Commercial / GCC")));
    assert.ok(result.whatsappUrl.includes("919704352346"));
  });
});

describe("Tier 4: Scenario 3 — Lookbook PDF Request Flow", () => {
  it("S03: Prospect browses portfolio, inspects mandir craft, and requests confidential lookbook", () => {
    // 1. User arrives at /projects route
    const projectsTsx = readSrcFile("routes/projects.tsx");
    assert.ok(projectsTsx.includes("<SelectedWork"));

    // 2. User explores SelectedWork items including authentic puja-craft
    const selectedWorkTsx = readSrcFile("components/akhom/SelectedWork.tsx");
    assert.ok(selectedWorkTsx.includes("pujaCraft") || selectedWorkTsx.includes("puja-craft.jpg"));
    assert.ok(selectedWorkTsx.includes("Bespoke Teak & Brass Mandir"));

    // 3. User clicks Request Our Portfolio CTA button
    assert.ok(
      selectedWorkTsx.includes("Request Our Portfolio") || selectedWorkTsx.includes("REQUEST OUR PORTFOLIO")
    );

    // 4. Lookbook request captures contact and sector preference
    assert.ok(selectedWorkTsx.includes("lookbookEmail") || selectedWorkTsx.includes('type="email"'));
    assert.ok(selectedWorkTsx.includes("lookbookPhone") || selectedWorkTsx.includes('type="tel"'));

    // 5. Direct WhatsApp alternative for portfolio access is available
    assert.ok(
      selectedWorkTsx.includes(APPROVED_CONTACTS.whatsAppPrefix),
      `Portfolio section must provide direct WhatsApp link ${APPROVED_CONTACTS.whatsAppPrefix}`
    );
  });
});

describe("Tier 4: Scenario 4 — WhatsApp Inquiry Dispatch Formatting with Country Code 91", () => {
  it("S04: Rigorous cross-component validation of WhatsApp dispatch URLs", () => {
    // A. Floating WhatsApp Widget
    const floatingTsx = readSrcFile("components/akhom/WhatsAppFloating.tsx");
    const floatingUrlMatch = floatingTsx.match(/href="(https:\/\/wa\.me\/[^"]+)"/);
    assert.ok(floatingUrlMatch, "Floating widget must define href wa.me URL");
    const floatingValidation = validateWhatsAppUrl(floatingUrlMatch[1]);
    assert.ok(floatingValidation.valid, floatingValidation.reason);

    // B. Final CTA Band
    const finalCtaTsx = readSrcFile("components/akhom/FinalCta.tsx");
    const finalCtaUrlMatch = finalCtaTsx.match(/href="(https:\/\/wa\.me\/[^"]+)"/);
    assert.ok(finalCtaUrlMatch, "Final CTA must define href wa.me URL");
    const finalCtaValidation = validateWhatsAppUrl(finalCtaUrlMatch[1]);
    assert.ok(finalCtaValidation.valid, finalCtaValidation.reason);

    // C. Site Footer
    const footerTsx = readSrcFile("components/akhom/SiteFooter.tsx");
    const footerUrlMatch = footerTsx.match(/href="(https:\/\/wa\.me\/[^"]+)"/);
    assert.ok(footerUrlMatch, "Footer must define href wa.me URL");
    const footerValidation = validateWhatsAppUrl(footerUrlMatch[1]);
    assert.ok(footerValidation.valid, footerValidation.reason);

    // D. Consultation Form dynamic dispatch URL
    const simulatedDispatch = simulateConsultationSubmission({
      name: "Sneha Reddy",
      email: "sneha@reddy.org",
      phone: "+91 97000 12345",
      scope: "Apartment",
      consent: true,
    });
    const formValidation = validateWhatsAppUrl(simulatedDispatch.whatsappUrl);
    assert.ok(formValidation.valid, formValidation.reason);
    assert.ok(simulatedDispatch.whatsappUrl.startsWith("https://wa.me/919704352346"));
  });
});

describe("Tier 4: Scenario 5 — Complete Navigation & Route Architecture Audit", () => {
  it("S05: Full traversal across all 10 registered application routes", () => {
    const expectedRoutes = [
      { path: "index.tsx", name: "Homepage" },
      { path: "residential.tsx", name: "Residential" },
      { path: "corporate.tsx", name: "Corporate" },
      { path: "services.tsx", name: "Services" },
      { path: "projects.tsx", name: "Projects" },
      { path: "process.tsx", name: "Process" },
      { path: "about.tsx", name: "About" },
      { path: "contact.tsx", name: "Contact" },
      { path: "privacy.tsx", name: "Privacy Policy" },
      { path: "terms.tsx", name: "Terms of Service" },
    ];

    for (const r of expectedRoutes) {
      const routeContent = readSrcFile(`routes/${r.path}`);
      assert.ok(routeContent.length > 50, `Route ${r.path} must not be empty`);
      assert.ok(
        routeContent.includes("createFileRoute") || routeContent.includes("createRootRoute"),
        `Route ${r.path} must define a valid TanStack route`
      );
    }
  });
});
