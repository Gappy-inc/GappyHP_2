import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import {
  homeStates,
  verificationTransition,
  recoveryTransition,
  recoveryScene,
} from "../lib/home-demo.ts";
import { homeCopy, DEMO_URL, workflowIds } from "../content/home-v2.ts";
import { jaUseCases, useCases } from "../content/use-cases.ts";

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
check("both locales remove the legacy workflow before the retained use cases", () => {
  const page = readFileSync("components/home-v2/HomePageV2.tsx", "utf8");
  const component = readFileSync("components/home-v2/UseCasesCarousel.tsx", "utf8");
  const componentCss = readFileSync("components/home-v2/UseCasesCarousel.module.css", "utf8");
  const data = readFileSync("content/use-cases.ts", "utf8");
  assert.doesNotMatch(page, /id="workflow"|<Workflow\b/);
  assert.match(page, /<ProductFamilyCards locale=\{locale\} \/>[\s\S]*<UseCasesCarousel locale=\{locale\} \/>[\s\S]*id="verification"/);
  assert.equal(useCases.length, 6);
  assert.equal(jaUseCases.length, 6);
  assert.deepEqual(jaUseCases.map(({ id }) => id), useCases.map(({ id }) => id));
  assert.match(component, /AUTOPLAY_INTERVAL = 6000/);
  assert.match(component, /prefers-reduced-motion: reduce/);
  assert.match(component, /IntersectionObserver/);
  assert.match(component, /visibilitychange/);
  assert.match(component, /demoRequestHref\(locale\)/);
  assert.match(component, /href=\{demoHref\}/);
  assert.match(component, /mobileTitle}>さまざまな<\/span>/);
  assert.match(component, /mobileTitle}>確認業務に。<\/span>/);
  assert.match(componentCss, /@media \(max-width: 640px\)[\s\S]*\.section\[data-locale="ja"\] \.heading h2 \.desktopTitle[\s\S]*display: none/);
  assert.match(componentCss, /@media \(max-width: 640px\)[\s\S]*\.section\[data-locale="ja"\] \.heading h2 \.mobileTitle[\s\S]*display: block/);
  assert.doesNotMatch(component, /fetch\(|sendBeacon|localStorage|sessionStorage/);
});
const source = readdirSync("components/home-v2", { recursive: true })
  .filter((f) => f.endsWith(".tsx") || f.endsWith(".js"))
  .map((f) => readFileSync(`components/home-v2/${f}`, "utf8"))
  .join("\n");
check("homepage never introduces capture, storage or outbound sends", () => {
  assert.doesNotMatch(
    source,
    /\bfetch\s*\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|<iframe|type=["']email|TravelAcquisitionProvider|TravelAnalytics/,
  );
});
check("English hero uses the approved cinematic media, copy and controls", () => {
  const hero = readFileSync("components/home-v2/CinematicHero.tsx", "utf8");
  assert.match(hero, /<video[\s\S]*autoPlay[\s\S]*loop[\s\S]*muted[\s\S]*playsInline/);
  assert.match(hero, /gappy-ai-workforce-hero\.mp4/);
  assert.match(hero, /gappy-ai-workforce-hero-mobile\.mp4/);
  assert.match(hero, /media="\(max-width: 767px\)"/);
  assert.match(hero, /gappy-ai-workforce-hero-poster\.jpg/);
  assert.match(hero, /\?v=20261104-fast-final/);
  assert.match(hero, /preload="auto"/);
  const layout = readFileSync("app/layout.tsx", "utf8");
  const middleware = readFileSync("middleware.ts", "utf8");
  assert.match(layout, /rel="preload"[\s\S]*as="video"[\s\S]*fetchPriority="high"/);
  assert.match(layout, /gappy-ai-workforce-hero\.mp4\?v=20261104-fast-final/);
  assert.match(layout, /gappy-ai-workforce-hero-mobile\.mp4\?v=20261104-fast-final/);
  assert.match(layout, /media="\(max-width: 767px\)"/);
  assert.match(layout, /media="\(min-width: 768px\)"/);
  assert.ok(statSync("public/hero/gappy-ai-workforce-hero.mp4").size < 4_000_000);
  assert.ok(statSync("public/hero/gappy-ai-workforce-hero-mobile.mp4").size < 2_400_000);
  const nextConfig = readFileSync("next.config.js", "utf8");
  assert.match(nextConfig, /\/hero\/:asset\*/);
  assert.match(nextConfig, /max-age=31536000, immutable/);
  assert.match(middleware, /x-gappy-home/);
  assert.match(hero, /The AI workforce for travel operations\./);
  assert.match(hero, /From booking changes to supplier coordination, Gappy moves operational[\s\S]*work toward verified completion—with people in control\./);
  assert.match(hero, /Book a demo/);
  assert.match(hero, /Pause background video/);
  assert.match(hero, /prefers-reduced-motion: reduce/);
  assert.match(hero, /onCanPlay=\{playWhenAllowed\}/);
  assert.match(hero, /visibilitychange/);
  assert.match(hero, /pageshow/);
  assert.match(hero, /manuallyPaused\.current = true/);
  assert.match(hero, /has-video-fallback/);
});
check("Japanese hero reuses the media and exposes approved localized controls", () => {
  const hero = readFileSync("components/home-v2/CinematicHero.tsx", "utf8");
  assert.match(hero, /旅行業務のためのAI Workforce。/);
  assert.match(hero, /予約後の確認・再確認を、最新の条件と根拠に基づいて進める。/);
  assert.match(hero, /デモを予約/);
  assert.match(hero, /動画を一時停止/);
  assert.match(hero, /動画を再生/);
  assert.equal((hero.match(/<video\b/g) || []).length, 1);
});
check("English product showcase keeps synthetic states truthful and local", () => {
  const showcase = readFileSync("components/home-v2/GappyWorkforceShowcase.tsx", "utf8");
  const showcaseCss = readFileSync("components/home-v2/GappyWorkforceShowcase.module.css", "utf8");
  assert.match(showcase, /See the work\. Trust the outcome\./);
  assert.match(showcase, /Track changes, confirmations, evidence, and human approvals across/);
  assert.match(showcase, /Work items[\s\S]*24/);
  assert.match(showcase, /Awaiting supplier[\s\S]*06/);
  assert.match(showcase, /Needs approval[\s\S]*03/);
  assert.match(showcase, /Verified[\s\S]*15/);
  assert.match(showcase, /08:30/);
  assert.match(showcase, /Superseded/);
  assert.match(showcase, /09:15/);
  assert.match(showcase, /Awaiting supplier reply/);
  assert.match(showcase, /Human review required/);
  assert.match(showcase, /No live connections or sends/);
  assert.doesNotMatch(showcase, /\bfetch\s*\(|sendBeacon|XMLHttpRequest/);
  assert.match(showcase, /IntersectionObserver/);
  assert.match(showcaseCss, /prefers-reduced-motion: reduce/);
  assert.match(showcaseCss, /grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
});
check("English integration orbit keeps moving under the cursor", () => {
  const page = readFileSync("components/home-v2/HomePageV2.tsx", "utf8");
  assert.match(page, /<GappyIntegrationOrbit locale=\{locale\} pauseOnHover=\{false\} \/>/);
});
check("English homepage exposes the four linked product cards after the workspace", () => {
  const page = readFileSync("components/home-v2/HomePageV2.tsx", "utf8");
  assert.match(page, /<GappyWorkforceShowcase locale=\{locale\} \/>[\s\S]*<ProductFamilyCards locale=\{locale\} \/>/);
  const cards = readFileSync("components/product-family/ProductFamilyCards.tsx", "utf8");
  assert.match(cards, /productFamily\.map/);
  assert.match(cards, /href=\{product\.path\}/);
  assert.match(cards, /詳しく見る（英語）/);
});
check("localized closing CTA and footer reuse approved routes, controls and tracking hooks", () => {
  const page = readFileSync("components/home-v2/HomePageV2.tsx", "utf8");
  const closing = readFileSync("components/home-v2/EnglishClosingCta.tsx", "utf8");
  const footer = readFileSync("components/home-v2/EnglishHomeFooter.tsx", "utf8");
  const homeFooter = readFileSync("components/home-v2/HomeFooter.tsx", "utf8");
  const footerSelector = readFileSync("components/home-v2/FooterSelector.tsx", "utf8");
  const css = readFileSync("components/home-v2/EnglishHomeEnd.module.css", "utf8");
  assert.match(page, /<EnglishClosingCta locale=\{locale\} \/>/);
  assert.match(closing, /className=\{`hv-final \$\{styles\.closing\}`\}/);
  assert.match(closing, /See what Gappy can do for your team\./);
  assert.match(closing, /あなたの業務で、Gappyにできること。/);
  assert.match(closing, /Explore Gappy AI Workforce with your team’s workflow in mind\. Start[\s\S]*with one recurring confirmation task\./);
  assert.match(closing, /demoRequestHref\(locale\)/);
  assert.match(closing, /leadFormsPublicEnabled/);
  assert.match(closing, /brochureRequestHref\(locale\)/);
  assert.equal((closing.match(/<a\b/g) || []).length, 2);
  assert.match(footerSelector, /pathname === "\/"[\s\S]*<HomeFooter locale=\{locale\} \/>/);
  assert.match(homeFooter, /return <EnglishHomeFooter locale=\{locale\} \/>/);
  assert.equal((footer.match(/<footer\b/g) || []).length, 1);
  assert.match(footer, /className=\{`hv-footer \$\{styles\.footer\}`\}/);
  assert.match(footer, /productFamily\.map/);
  for (const route of ["/#use-cases", "/technology", "/resources", "/travel", "/cases", "/about", "/careers", "/contact"]) {
    assert.ok(footer.includes(route), route);
  }
  assert.match(footer, /<BrandMark href=\{locale === "ja" \? "\/ja\/" : "\/"\} \/>/);
  assert.match(footer, /<LanguageSwitcher \/>/);
  assert.match(footer, /<PrivacySettings locale=\{locale\} \/>/);
  assert.match(footer, /\$\{displayName\}（英語）/);
  assert.match(footer, /mailto:\$\{CONTACT_EMAIL\}/);
  assert.match(footer, /LEGAL_NAME/);
  assert.match(footer, /COMPANY_ADDRESS/);
  assert.match(css, /grid-template-columns: minmax\(280px, 1\.3fr\) repeat\(3/);
  assert.match(css, /@media \(max-width: 767px\)/);
  assert.match(css, /@media \(max-width: 320px\)[\s\S]*grid-template-columns: 1fr/);
  assert.match(css, /prefers-reduced-motion: reduce/);
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
check("workflow-free IA and no unapproved proof elements", () => {
  const page = readFileSync("components/home-v2/HomePageV2.tsx", "utf8");
  assert.equal((page.match(/<section\b/g) || []).length, 5);
  assert.doesNotMatch(
    source,
    /Trusted by|meeting_booked|Production proven|free trial|fully self-serve/,
  );
});
check("legacy workflow runtime and observers are removed", () => {
  const interactions = readFileSync("components/home-v2/HomeInteractions.tsx", "utf8");
  assert.doesNotMatch(interactions, /export function Workflow|function WorkflowSignals|data-active-workflow|data-job=/);
  assert.doesNotMatch(interactions, /#job-|mobile-job-/);
  assert.match(interactions, /export function Verification/);
  assert.match(interactions, /export function Recovery/);
});
check("handoff presentation primitives and source-backed proof fragments", () => {
  const css = readFileSync("components/home-v2/home-v2.css", "utf8");
  for (const token of ["--hv-page-width", "--hv-gutter", "--hv-grid-gap", "--hv-motion-fast", "--hv-motion-state", "--hv-motion-reveal", "--hv-ease"])
    assert.ok(css.includes(token));
  assert.match(source, /<ProofMoment locale=\{locale\} index=\{i\}/);
  assert.match(source, /homeStates\[state\]\.readiness/);
  assert.match(source, /data-context-visible/);
  assert.match(css, /\.hv-recovery-mobile > \.hv-recovery-rail\s*\{\s*grid-template-columns: 1fr/);
});
check("structural reference preserves the hero evidence and final CTA", () => {
  const css = readFileSync("components/home-v2/home-v2.css", "utf8");
  assert.match(css, /--hv-page-width: 1392px/);
  assert.match(source, /hv-hero-evidence/);
  assert.deepEqual(homeCopy.en.final.title, ["From task automation", "to verified operations."]);
  assert.equal(homeCopy.en.finalDemo, "View interactive demo");
  assert.equal(homeCopy.en.finalSales, "Talk to Gappy");
  assert.equal(homeCopy.ja.final.title.length, 2);
  assert.doesNotMatch(source, /attio\.com|\/attio[^"']*\.(png|jpg|svg)/i);
});
check("final P1 pass preserves dc78226 copy, IA, product and verification/recovery", () => {
  const frozen = {
    "content/home-v2.ts": "ee4596447d9b0490aa520ac7948b520f58c3b365150de8f6574ad04de58a5fca",
    "components/home-v2/ProductUI.tsx": "8e025cb19e825d16cea13288c50e09a83dd24c01a20818b162f2766ba907dc37",
    "lib/home-demo.ts": "762d13fc7960b6f59e3de0fbec350625be5cf3baef35e42d44ace3e8be87ec4d",
  };
  for (const [file, hash] of Object.entries(frozen)) {
    const source = readFileSync(file, "utf8");
    assert.equal(createHash("sha256").update(source).digest("hex"), hash, file);
  }
  const page = readFileSync("components/home-v2/HomePageV2.tsx", "utf8");
  assert.match(page, /<GappyWorkforceShowcase locale=\{locale\} \/>/);
  const downstreamBeforeClosing = page
    .slice(
      page.indexOf('      <section id="verification"'),
      page.lastIndexOf('      <EnglishClosingCta locale={locale} />'),
    )
    .replace(
      '<GappyIntegrationOrbit pauseOnHover={false} />',
      '<GappyIntegrationOrbit />',
    );
  for (const sectionId of ["verification", "recovery", "context", "architecture", "proof"])
    assert.match(downstreamBeforeClosing, new RegExp(`id="${sectionId}"`));
  const interactions = readFileSync("components/home-v2/HomeInteractions.tsx", "utf8");
  assert.equal(createHash("sha256").update(interactions.slice(interactions.indexOf("export function Verification("))).digest("hex"), "ef2bd73ef1fc2f96277d31e81bae7a427ef5702ff272c34720e89e2088bd67ca");
  const css = readFileSync("components/home-v2/home-v2.css", "utf8");
  assert.match(css, /\.home-v2\.hv-footer \{ background: #08111b;/);
});
check("homepage locale switches reload the SSR document in desktop and mobile navigation", () => {
  const navigation = readFileSync("components/home-v2/HomeNavigation.tsx", "utf8");
  const languagesStart = navigation.indexOf("const languages = (");
  const languages = navigation.slice(languagesStart, navigation.indexOf("  return (", languagesStart));
  assert.equal((languages.match(/<a\s/g) || []).length, 2);
  assert.match(languages, /<a\s+href="\/"\s+aria-label="English"/);
  assert.match(languages, /<a\s+href="\/ja\/"\s+aria-label="日本語"/);
  assert.doesNotMatch(languages, /<Link\b|onClick|preventDefault/);
  assert.equal((navigation.match(/\{languages\}/g) || []).length, 2);
  assert.match(navigation, /const \[open, setOpen\] = useState\(false\)/);
  assert.doesNotMatch(navigation, /document\.documentElement|setAttribute\(["']lang/);
});
console.log(`Home V2: ${checks} test groups passed`);
