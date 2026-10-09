import assert from "node:assert/strict";

const currentSuite = {
  name: "",
  tests: [],
};

const suites = [];

export function describe(name, fn) {
  const suite = { name, tests: [] };
  suites.push(suite);
  const prevSuite = currentSuite.active;
  currentSuite.active = suite;
  try {
    fn();
  } finally {
    currentSuite.active = prevSuite;
  }
}

export function it(name, fn) {
  const target = currentSuite.active || suites[0] || (describe("Default Suite", () => {}), suites[0]);
  target.tests.push({ name, fn });
}

export const test = it;

export async function runSuites(options = {}) {
  const { filter = null, verbose = true } = options;
  let totalCount = 0;
  let passCount = 0;
  let failCount = 0;
  const failures = [];

  const startTime = Date.now();

  for (const suite of suites) {
    if (filter && !suite.name.toLowerCase().includes(filter.toLowerCase())) {
      continue;
    }

    if (verbose) {
      console.log(`\n\x1b[1m\x1b[36m▶ Suite: ${suite.name}\x1b[0m`);
    }

    for (const t of suite.tests) {
      totalCount++;
      const testStart = Date.now();
      try {
        await t.fn();
        passCount++;
        const duration = Date.now() - testStart;
        if (verbose) {
          console.log(`  \x1b[32m✔\x1b[0m ${t.name} \x1b[90m(${duration}ms)\x1b[0m`);
        }
      } catch (err) {
        failCount++;
        const duration = Date.now() - testStart;
        failures.push({ suite: suite.name, test: t.name, error: err });
        if (verbose) {
          console.log(`  \x1b[31m✖\x1b[0m ${t.name} \x1b[90m(${duration}ms)\x1b[0m`);
          console.log(`    \x1b[31mError: ${err.message}\x1b[0m`);
        }
      }
    }
  }

  const elapsed = Date.now() - startTime;

  return {
    total: totalCount,
    passed: passCount,
    failed: failCount,
    durationMs: elapsed,
    failures,
  };
}

export function clearSuites() {
  suites.length = 0;
}

export { assert };
