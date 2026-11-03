import assert from 'node:assert/strict'
import { readFileSync, statSync } from 'node:fs'
import { getProductBySlug, productFamily, syntheticWorkItem } from '../content/product-family.ts'

assert.equal(productFamily.length, 4)
assert.deepEqual(productFamily.map((product) => product.id), [
  'ai-workforce',
  'verified-work',
  'change-monitor',
  'evidence-approval',
])
assert.equal(new Set(productFamily.map((product) => product.path)).size, 4)
for (const product of productFamily) {
  assert.ok(getProductBySlug(product.path.split('/').at(-1)))
  assert.ok(statSync(`public${product.artwork}`).size > 0)
  assert.ok(statSync(`public${product.originalArtwork}`).size > 0)
}

assert.equal(syntheticWorkItem.latestRequest.revision, 4)
assert.equal(syntheticWorkItem.latestRequest.pickupTime, '09:15')
assert.equal(syntheticWorkItem.previousSupplierAcceptance.revision, 3)
assert.equal(syntheticWorkItem.previousSupplierAcceptance.pickupTime, '08:30')
assert.equal(syntheticWorkItem.currentSupplierConfirmation.state, 'Not received')
assert.equal(syntheticWorkItem.evidenceReview.state, 'Needs review')
assert.equal(syntheticWorkItem.completionApproval.state, 'Blocked')
assert.equal(syntheticWorkItem.verifiedCompletion, false)

const page = readFileSync('components/product-family/ProductFamilyPage.tsx', 'utf8')
const cards = readFileSync('components/product-family/ProductFamilyCards.tsx', 'utf8')
const reveal = readFileSync('components/product-family/ProductFamilyReveal.tsx', 'utf8')
const css = readFileSync('components/product-family/ProductFamily.module.css', 'utf8')
const route = readFileSync('app/product/[slug]/page.tsx', 'utf8')
const language = readFileSync('components/LanguageSwitcher.tsx', 'utf8')
const header = readFileSync('components/Header.tsx', 'utf8')
const homeNavigation = readFileSync('components/home-v2/HomeNavigation.tsx', 'utf8')

for (const copy of [
  'Travel operations,',
  "Know what's done.",
  'Spot the change.',
  'See the evidence.',
  'Supplier confirmation for 09:15',
  'Not received',
  'Needs review',
  'Blocked',
  'Illustrative interface · Synthetic demo data · No live connections or sends',
]) assert.match(readFileSync('content/product-family.ts', 'utf8') + page, new RegExp(copy.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))

assert.match(cards, /<Link[\s\S]*className=\{styles\.productCard\}/)
assert.doesNotMatch(cards, /<button/)
assert.match(page, /disabled className=\{styles\.blockedButton\}/)
assert.doesNotMatch(page, /\bfetch\s*\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage/)
assert.match(reveal, /IntersectionObserver/)
assert.match(css, /prefers-reduced-motion: reduce/)
assert.match(route, /generateStaticParams/)
assert.match(language, /productPage \? '\/ja\/'/)
assert.match(header, /pathname\.startsWith\('\/product\/'\)[\s\S]*<HomeNavigation locale="en" mode="light" \/>/)
assert.match(homeNavigation, /type HomeNavigationMode = "auto" \| "light"/)
assert.match(homeNavigation, /const light = staticLight \|\| scrolled/)
assert.match(homeNavigation, /data-header-mode=\{mode\}/)
assert.match(homeNavigation, /productAnchor = locale === "ja" \? "product-family" : "product-proof"/)
assert.doesNotMatch(homeNavigation, /#workflow/)
assert.match(homeNavigation, /const nav = \[\.\.\.primaryNav, resourceNav\]/)
assert.match(homeNavigation, /tabIndex=\{staticLight \? -1 : undefined\}/)
assert.match(homeNavigation, /window\.location\.hash[\s\S]*scrollIntoView\(\{ block: "start" \}\)/)
assert.match(homeNavigation, /addEventListener\("hashchange", scheduleAlignment\)/)
assert.match(homeNavigation, /HOME_HEADER_ANCHORS\.has\(targetId\)/)
assert.match(homeNavigation, /company\.current\.open = false/)
assert.match(homeNavigation, /<details ref=\{company\} suppressHydrationWarning>/)

console.log('PASS: four product routes, shared truthful fixture, unified light header, assets, links, no-send controls, motion and locale fallback')
