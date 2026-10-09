#!/usr/bin/env node

/**
 * AKHOM Interiors — Master Automated Test Runner
 * Executes Tier 1, Tier 2, Tier 3, Tier 4, and Regression test suites.
 */

import { runSuites } from "../tests/harness/test-runner.mjs";

console.log("================================================================================");
console.log("             AKHOM INTERIORS — AUTOMATED E2E & VERIFICATION SUITE               ");
console.log("================================================================================");
console.log("Environment: Node.js " + process.version);
console.log("Integrity Mode: Strict Verification\n");

// Parse CLI flags
const args = process.argv.slice(2);
let tierFilter = null;
let nameFilter = null;

for (const arg of args) {
  if (arg.startsWith("--tier=")) {
    tierFilter = arg.split("=")[1].trim();
  } else if (arg.startsWith("--filter=")) {
    nameFilter = arg.split("=")[1].trim();
  }
}

// Dynamically load test suites based on tier filter
async function loadSuites() {
  const loadAll = !tierFilter;

  if (loadAll || tierFilter === "1") {
    await import("../tests/tier1-features/feature-01-to-05.test.mjs");
    await import("../tests/tier1-features/feature-06-to-10.test.mjs");
    await import("../tests/tier1-features/feature-11-to-15.test.mjs");
    await import("../tests/tier1-features/feature-16-to-22.test.mjs");
  }

  if (loadAll || tierFilter === "2") {
    await import("../tests/tier2-boundaries/boundary-01-to-05.test.mjs");
    await import("../tests/tier2-boundaries/boundary-06-to-10.test.mjs");
    await import("../tests/tier2-boundaries/boundary-11-to-15.test.mjs");
    await import("../tests/tier2-boundaries/boundary-16-to-22.test.mjs");
  }

  if (loadAll || tierFilter === "3") {
    await import("../tests/tier3-interactions/cross-feature.test.mjs");
  }

  if (loadAll || tierFilter === "4") {
    await import("../tests/tier4-scenarios/scenarios.test.mjs");
  }

  if (loadAll || tierFilter === "regression") {
    await import("../tests/regression/contact-and-deprecation.test.mjs");
  }
}

async function main() {
  await loadSuites();

  const results = await runSuites({
    filter: nameFilter,
    verbose: true,
  });

  console.log("\n================================================================================");
  console.log("                          TEST EXECUTION SUMMARY                                ");
  console.log("================================================================================");
  console.log(`Total Test Cases : ${results.total}`);
  console.log(`Passed           : \x1b[32m${results.passed}\x1b[0m`);
  console.log(`Failed           : ${results.failed > 0 ? `\x1b[31m${results.failed}\x1b[0m` : `\x1b[32m0\x1b[0m`}`);
  console.log(`Execution Time   : ${results.durationMs}ms`);

  if (results.failed > 0) {
    console.log("\n\x1b[31m[FAILED SUITES / TESTS]:\x1b[0m");
    for (const f of results.failures) {
      console.log(`  - [${f.suite}] ${f.test}`);
      console.log(`    ${f.error.message}`);
    }
    console.log("================================================================================\n");
    process.exit(1);
  } else {
    console.log("\n\x1b[32m[PASS] ALL REQUIREMENTS, TIERS, SCENARIOS, AND REGRESSIONS SATISFIED!\x1b[0m");
    console.log("================================================================================\n");
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("FATAL TEST RUNNER ERROR:", err);
  process.exit(1);
});
