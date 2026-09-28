import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import {
  homeStates,
  verificationTransition,
  recoveryTransition,
  recoveryScene,
} from "../lib/home-demo.ts";
import { homeCopy, DEMO_URL, workflowIds } from "../content/home-v2.ts";

let checks = 0;
const check = (name, run) => {
  run();
  checks++;
  console.log(`PASS ${name}`);
};
check("canonical specifications remain byte-for-byte frozen", () => {
  for (const [file, expected] of Object.entries({
    "GAPPY_LP_V2_SPEC.md":
      "2e921cd45caaebf2083e39cacc3f947cfc1cac39657ec370d16a482bdbd4bd41",
    "GAPPY_LP_V2_SECTION_MAP.md":
      "f8f31f11fa70ff0b9706d947a7bf7b974c6dc0135a586b7961ac9d008d8f059e",
  }))
    assert.equal(
      createHash("sha256").update(readFileSync(file)).digest("hex"),
      expected,
    );
});
check("source-backed discrete readiness sequence", () =>
  assert.deepEqual(
    Object.values(homeStates).map((s) => s.readiness),
    [42, 57, 71, 86, 86, 100, 76, 76, 100],
  ),
);
check("reply alone cannot complete verification", () => {
  assert.equal(verificationTransition("response", "complete"), "response");
  assert.equal(verificationTransition("response", "check"), "checking");
  assert.equal(verificationTransition("checking", "complete"), "ready");
  assert.equal(verificationTransition("ready", "replay"), "response");
});
check("recovery requires invalidation and candidate evaluation", () => {
  assert.equal(recoveryTransition("ready", "verify"), "ready");
  assert.equal(recoveryTransition("invalidated", "verify"), "invalidated");
  let s = recoveryTransition("ready", "cancel");
  assert.equal(s, "invalidated");
  s = recoveryTransition(s, "evaluate");
  assert.equal(s, "candidate");
  s = recoveryTransition(s, "verify");
  assert.equal(s, "recovered");
  assert.equal(recoveryTransition(s, "replay"), "ready");
  assert.deepEqual([0, 1, 2].map(recoveryScene), [
    "ready",
    "candidate",
    "recovered",
  ]);
});
check("unknown intermediate counts are never fabricated", () => {
  for (const state of ["execution57", "execution71", "response", "candidate"]) {
    assert.equal("evidence" in homeStates[state], false);
    assert.equal("unresolved" in homeStates[state], false);
  }
});
check("bilingual schema parity and exact workflow/check counts", () => {
  // Headline line breaks are intentionally locale-specific; all other arrays retain exact parity.
  const keys = (value) =>
    typeof value === "object" && value !== null
      ? Object.fromEntries(
          Object.entries(value).map(([key, v]) => {
            if (key === "title") {
              assert.ok(
                v.length > 0 &&
                  v.every(
                    (line) => typeof line === "string" && line.length > 0,
                  ),
              );
              return [key, "localized headline lines"];
            }
            return [key, keys(v)];
          }),
        )
      : typeof value;
  assert.deepEqual(keys(homeCopy.en), keys(homeCopy.ja));
  assert.equal(workflowIds.length, 4);
  for (const c of Object.values(homeCopy)) {
    assert.equal(c.jobs.length, 4);
    assert.equal(c.stages.length, 6);
    assert.equal(c.ui.checks.length, 5);
    assert.equal(c.evaluate.length, 5);
    assert.equal(c.recoveryStates.length, 3);
    assert.ok(c.synthetic);
    assert.ok(c.disclaimer);
  }
});
check("stable demo and existing Calendar destinations", () => {
  assert.equal(
    DEMO_URL,
    "https://gappy-workforce-lab-0925.mitsuki222581.chatgpt.site/",
  );
  assert.match(
    readFileSync("lib/config.ts", "utf8"),
    /https:\/\/calendar\.app\.google\/KpXGF5RTgqRpg72n6/,
  );
});
const source = readdirSync("components/home-v2")
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => readFileSync(`components/home-v2/${f}`, "utf8"))
  .join("\n");
check("homepage never introduces capture, storage or outbound sends", () => {
  assert.doesNotMatch(
    source,
    /\bfetch\s*\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|<iframe|<video|type=["']email|TravelAcquisitionProvider|TravelAnalytics/,
  );
});
check("explicit accessibility and cleanup contracts", () => {
  assert.match(source, /aria-pressed/);
  assert.match(source, /aria-expanded/);
  assert.match(source, /aria-controls/);
  assert.match(source, /showModal\(\)/);
  assert.match(source, /Escape/);
  assert.match(source, /clearTimeout/);
  assert.match(source, /<noscript>/);
  assert.match(source, /prefers-reduced-motion/);
  assert.match(source, /ArrowLeft/);
  assert.match(source, /ArrowRight/);
});
check("11-block IA and no unapproved proof elements", () => {
  const page = readFileSync("components/home-v2/HomePageV2.tsx", "utf8");
  assert.equal((page.match(/<section\b/g) || []).length, 9);
  assert.doesNotMatch(
    source,
    /Trusted by|meeting_booked|Production proven|free trial|fully self-serve/,
  );
});
check("editorial workflow has one changing canvas and readable fallbacks", () => {
  const interactions = readFileSync("components/home-v2/HomeInteractions.tsx", "utf8");
  assert.equal((interactions.match(/data-active-workflow=/g) || []).length, 1);
  assert.match(interactions, /<JobUI locale=\{locale\} index=\{active\}/);
  assert.match(interactions, /hv-workflow-fallback/);
  assert.match(interactions, /observer\.disconnect\(\)/);
  const css = readFileSync("components/home-v2/home-v2.css", "utf8");
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /\.hv-workflow-fallback\s*\{\s*display: block/);
  assert.doesNotMatch(css, /(?:linear|radial)-gradient/);
});
console.log(`Home V2: ${checks} test groups passed`);
