// Execute the actual TSX effects in a no-network hook harness using the existing TS compiler.
// This proves command construction, not Google ingestion. Browser/Realtime remains a release gate.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'
import * as policy from '../lib/site-analytics.ts'
const code = ts.transpileModule(readFileSync('components/analytics/SiteAnalytics.tsx', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText
function harness(href = 'https://gappy.jp/', enabled = true, consent, dnt = false) {
  const slots = [], listeners = new Map(), store = new Map()
  let index = 0, pending = [], changed = true, result
  const depsEqual = (a, b) => a && b && a.length === b.length && a.every((v, i) => Object.is(v, b[i]))
  const win = { location: { href }, gappyAnalyticsConsent: consent, addEventListener: (k, v) => listeners.set(k, v), removeEventListener: k => listeners.delete(k) }
  class Element { constructor(href, section) { this.href = href; this.section = section } getAttribute() { return this.href } closest(s) { return s === 'a[href]' || s === this.section ? this : null } }
  const react = {
    useRef: v => { const i = index++; return slots[i] ||= { current: v } },
    useState: v => { const i = index++; slots[i] ||= { value: v }; return [slots[i].value, value => { if (!Object.is(slots[i].value, value)) { slots[i].value = value; changed = true } }] },
    useCallback: (fn, deps) => { const i = index++; if (!depsEqual(slots[i]?.deps, deps)) slots[i] = { fn, deps }; return slots[i].fn },
    useEffect: (fn, deps) => { const i = index++; if (!depsEqual(slots[i]?.deps, deps)) { slots[i]?.cleanup?.(); slots[i] = { deps }; pending.push(() => { slots[i].cleanup = fn() }) } },
  }
  const exports = {}
  let observer
  const headings = new Map(['#product-proof h2', '#workflow h2', '#verification h2', '#recovery h2', '#context h2', '.hv-final h2'].map(s => [s, { selector: s }]))
  class IntersectionObserver {
    constructor(callback, options) { this.callback = callback; this.targets = []; this.disconnected = false; observer = this; assert.equal(options.threshold, 0.5) }
    observe(target) { this.targets.push(target) }
    disconnect() { this.disconnected = true }
  }
  const context = { exports, URL, Date, Element, IntersectionObserver, window: win, navigator: { webdriver: false, doNotTrack: dnt ? '1' : '0' }, sessionStorage: { getItem: k => store.get(k), setItem: (k, v) => store.set(k, v) }, document: { querySelector: s => headings.get(s), referrer: 'https://chatgpt.com/c/private-thread', addEventListener: (k, v) => listeners.set(k, v), removeEventListener: k => listeners.delete(k) }, require: name => ({
    react, 'react/jsx-runtime': { jsx: (type, props) => ({ type, props }) }, 'next/script': { default: 'Script' }, 'next/navigation': { usePathname: () => new URL(win.location.href).pathname },
    '@/content/home-v2': { DEMO_URL: 'https://demo.example.test/' }, '@/lib/config': { GOODTIME_URL: 'https://calendar.example.test/', CONTACT_EMAIL: 'contact@example.test' }, '@/lib/site-analytics': policy,
  })[name] }
  vm.runInNewContext(code, context)
  const render = () => { changed = true; let n = 0; while (changed) { assert.ok(n++ < 10); changed = false; index = 0; pending = []; result = exports.default({ enabled, measurementId: 'G-TEST1234' }); pending.forEach(fn => fn()) } return result }
  render()
  return { win, render, get result() { return result }, see: (ratio = 1) => observer?.callback(observer.targets.map(target => ({ target, isIntersecting: ratio > 0, intersectionRatio: ratio }))), grant: value => { win.gappyAnalyticsConsent = value; listeners.get('gappy:analytics-consent')?.(); render() }, click: (href, section) => listeners.get('click')?.({ type: 'click', target: new Element(href, section) }), events: () => (win.dataLayer || []).filter(x => x[0] === 'event'), navigate: url => { win.location.href = url; render() } }
}
const h = harness('https://gappy.jp/?utm_source=chatgpt.com&email=private@example.test&token=SECRET')
assert.equal(h.result, null)
assert.equal(h.win.dataLayer, undefined)
h.grant('granted')
assert.match(h.result.props.src, /googletagmanager\.com\/gtag\/js/)
assert.equal(h.events().length, 1)
assert.equal(h.events()[0][1], 'page_view')
assert.equal(h.events()[0][2].page_location, 'https://gappy.jp/')
assert.equal(h.events()[0][2].utm_source, 'chatgpt.com')
assert.equal(h.win.dataLayer[0][1], 'default')
assert.equal(h.win.dataLayer[0][2].analytics_storage, 'denied')
h.render()
assert.equal(h.events().length, 1)
h.click('https://demo.example.test/', '.hv-hero')
h.click('https://calendar.example.test/', '.hv-hero')
h.click('/ja/', '.home-v2 .hv-languages')
assert.deepEqual(Array.from(h.events(), x => x[1]), ['page_view', 'cta_click', 'cta_click', 'language_switch'])
assert.equal(h.events()[1][2].cta_id, 'hero_demo')
assert.equal(h.events()[2][2].cta_id, 'hero_sales')
assert.doesNotMatch(JSON.stringify(h.win.dataLayer), /private|SECRET|email|token/)
h.navigate('https://gappy.jp/ja/')
assert.equal(h.events().at(-1)[2].locale, 'ja')
const before = h.events().length
h.grant('denied')
h.click('https://demo.example.test/', '.hv-hero')
assert.equal(h.result, null)
assert.equal(h.win['ga-disable-G-TEST1234'], true)
assert.equal(h.events().length, before)
h.grant('granted')
h.win.gtag = () => { throw new Error('blocked provider') }
assert.doesNotThrow(() => h.click('https://demo.example.test/', '.hv-hero'))
for (const url of ['http://localhost:3020/', 'https://preview.vercel.app/', 'https://gappy.jp/?analytics_qa=1']) {
  const blocked = harness(url, true, 'granted')
  assert.equal(blocked.result, null)
  assert.equal(blocked.events().length, 0)
}
const disabled = harness('https://gappy.jp/', false, 'granted')
assert.equal(disabled.win.dataLayer, undefined)
assert.equal(disabled.result, null)
console.log('PASS: actual TSX effects — consent/revocation, EN/JA views, CTA and language commands, redaction, duplicate render, provider failure, QA/localhost/Preview exclusion (no network)')

const sections = harness()
sections.see()
assert.equal(sections.events().length, 0)
sections.grant('granted')
sections.see(0.49)
assert.equal(sections.events().length, 1)
sections.see(0.5); sections.see(1); sections.see(0); sections.see(1)
assert.deepEqual(Array.from(sections.events().filter(x => x[1] === 'section_view'), x => x[2].section_id), ['product_proof', 'workflow', 'verification', 'recovery', 'context', 'final_cta'])
const sectionCount = sections.events().length
sections.grant('denied'); sections.see()
assert.equal(sections.events().length, sectionCount)
sections.grant('granted'); sections.see()
assert.equal(sections.events().length, sectionCount) // same document: no repeated view or sections
for (const locale of ['en', 'ja']) {
  const persisted = harness(locale === 'en' ? 'https://gappy.jp/' : 'https://gappy.jp/ja/', true, 'granted')
  assert.equal(persisted.events().length, 1)
  assert.equal(persisted.events()[0][2].locale, locale)
  for (const loc of ['.hv-hero', '.hv-final', '.hv-nav-actions']) {
    persisted.click('https://demo.example.test/', loc)
    persisted.click('https://calendar.example.test/', loc)
  }
  assert.equal(persisted.events().filter(x => x[1] === 'cta_click').length, 6)
}
const dnt = harness('https://gappy.jp/', true, 'granted', true)
assert.equal(dnt.result, null)
assert.equal(dnt.events().length, 0)
console.log('PASS: section_view consent/threshold/dedup/revoke, persisted EN/JP document views, header/hero/final CTAs, DNT')
