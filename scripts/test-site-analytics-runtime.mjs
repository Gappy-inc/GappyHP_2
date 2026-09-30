// Execute the actual TSX effects in a no-network hook harness using the existing TS compiler.
// This proves command construction, not Google ingestion. Browser/Realtime remains a release gate.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'
import * as policy from '../lib/site-analytics.ts'
const code = ts.transpileModule(readFileSync('components/analytics/SiteAnalytics.tsx', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText
function harness(href = 'https://gappy.jp/', enabled = true, consent) {
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
  const context = { exports, URL, Date, Element, window: win, navigator: { webdriver: false }, sessionStorage: { getItem: k => store.get(k), setItem: (k, v) => store.set(k, v) }, document: { referrer: 'https://chatgpt.com/c/private-thread', addEventListener: (k, v) => listeners.set(k, v), removeEventListener: k => listeners.delete(k) }, require: name => ({
    react, 'react/jsx-runtime': { jsx: (type, props) => ({ type, props }) }, 'next/script': { default: 'Script' }, 'next/navigation': { usePathname: () => new URL(win.location.href).pathname },
    '@/content/home-v2': { DEMO_URL: 'https://demo.example.test/' }, '@/lib/config': { GOODTIME_URL: 'https://calendar.example.test/', CONTACT_EMAIL: 'contact@example.test' }, '@/lib/site-analytics': policy,
  })[name] }
  vm.runInNewContext(code, context)
  const render = () => { changed = true; let n = 0; while (changed) { assert.ok(n++ < 10); changed = false; index = 0; pending = []; result = exports.default({ enabled, measurementId: 'G-TEST1234' }); pending.forEach(fn => fn()) } return result }
  render()
  return { win, render, get result() { return result }, grant: value => { win.gappyAnalyticsConsent = value; listeners.get('gappy:analytics-consent')?.(); render() }, click: (href, section) => listeners.get('click')?.({ type: 'click', target: new Element(href, section) }), events: () => (win.dataLayer || []).filter(x => x[0] === 'event'), navigate: url => { win.location.href = url; render() } }
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
