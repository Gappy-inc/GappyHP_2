import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { analyticsEnabled, eligibleBrowser, pageParameters, ctaEvent, trackedLink, publicPath } from '../lib/site-analytics.ts'

for (const env of [undefined, 'preview', 'development', 'test']) assert.equal(analyticsEnabled(env, 'G-TEST1234', 'true'), false)
for (const id of [undefined, '', 'UA-123', '<script>']) assert.equal(analyticsEnabled('production', id, 'true'), false)
assert.equal(analyticsEnabled('production', 'G-TEST1234', undefined), false)
assert.equal(analyticsEnabled('production', 'G-TEST1234', 'true'), true)
for (const url of ['http://localhost:3020/', 'https://preview.vercel.app/', 'https://gappy.jp/private/id', 'https://gappy.jp/?analytics_qa=1']) assert.equal(eligibleBrowser(url, false, false), false)
assert.equal(eligibleBrowser('https://gappy.jp/', true, false), false)
assert.equal(eligibleBrowser('https://gappy.jp/', false, true), false)
assert.equal(eligibleBrowser('https://gappy.jp/ja/', false, false), true)
for (const path of ['/', '/ja/', '/travel', '/ja/travel']) assert.equal(publicPath(path), true)
for (const path of ['/api/travel/events', '/travel/preview-privacy', '/email@example.test']) assert.equal(publicPath(path), false)

const p = pageParameters('https://gappy.jp/ja/?email=private@example.test&token=secret&utm_source=chatgpt.com&utm_medium=referral&utm_campaign=lp-launch#private', 'https://chatgpt.com/c/secret?email=private@example.test')
assert.equal(p.page_location, 'https://gappy.jp/ja/')
assert.equal(p.page_referrer, 'https://chatgpt.com')
assert.equal(p.locale, 'ja')
assert.equal(p.utm_source, 'chatgpt.com')
assert.equal(p.utm_medium, 'referral')
assert.equal(p.utm_campaign, 'lp-launch')
assert.equal(p.campaign_source, 'chatgpt.com')
assert.doesNotMatch(JSON.stringify(p), /private|secret|token|email|@/)
for (const val of ['email@example.test', 'JaneSmith', '123456789', 'secret-token', 'chatgpt.com.evil.test']) {
  const unsafe = pageParameters(`https://gappy.jp/?utm_source=${val}&utm_medium=${val}&utm_campaign=${val}`, '')
  assert.equal(unsafe.utm_source, undefined)
  assert.equal(unsafe.utm_medium, undefined)
  assert.equal(unsafe.utm_campaign, undefined)
}
assert.equal(pageParameters('https://gappy.jp/', 'https://chat.openai.com/c/private').utm_source, 'chatgpt.com')
assert.equal(pageParameters('https://gappy.jp/', 'https://private:password@example.test/').page_referrer, '')
assert.equal(pageParameters('https://gappy.jp/api/private', ''), null)
for (const locale of ['en', 'ja']) for (const location of ['hero', 'header', 'final', 'announcement', 'proof', 'mobile_header', 'footer']) {
  for (const kind of ['demo', 'sales']) {
    const e = ctaEvent(location, kind, locale)
    assert.equal(e.name, 'cta_click')
    assert.deepEqual(Object.keys(e.parameters).sort(), ['cta_id', 'cta_location', 'destination_type', 'locale'])
    assert.equal(e.parameters.cta_id, `${location}_${kind}`)
  }
}
assert.equal(ctaEvent('workflow', 'demo', 'en'), null) // No such CTA in frozen markup.
const anchor = (href, selector) => ({ getAttribute: () => href, closest: s => s === selector })
assert.deepEqual(trackedLink(anchor('/ja/', '.home-v2 .hv-languages'), 'en', 'demo', 'sales', 'email'), { name: 'language_switch', parameters: { from_locale: 'en', to_locale: 'ja' } })
assert.equal(trackedLink(anchor('demo', '.hv-hero'), 'en', 'demo', 'sales', 'email').parameters.cta_id, 'hero_demo')
assert.equal(trackedLink(anchor('unapproved', '.hv-hero'), 'en', 'demo', 'sales', 'email'), null)
const component = readFileSync('components/analytics/SiteAnalytics.tsx', 'utf8')
assert.match(component, /from 'next\/script'/)
assert.match(component, /send_page_view: false/)
assert.match(component, /allow_google_signals: false/)
assert.match(component, /allow_ad_personalization_signals: false/)
assert.match(component, /ga-disable-/)
assert.doesNotMatch(component, /\.preventDefault\(|event_callback|fetch\(|sendBeacon\(/)
assert.doesNotMatch(readFileSync('package.json', 'utf8'), /@vercel\/analytics|@next\/third-parties/)
console.log('PASS: GA4 environment, consent guard, PII/UTM redaction, CTA taxonomy and non-blocking navigation contracts')
