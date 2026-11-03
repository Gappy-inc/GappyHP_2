import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import LeadRequestPage from '@/components/lead-forms/LeadRequestPage'
import { LEAD_FORM_PATHS, type LeadLocale, type LeadRequestType } from '@/lib/lead-forms'
import { SITE_URL } from '@/lib/config'

const names = {
  en: { demo: 'Request a demo', brochure: 'Request the Gappy overview' },
  ja: { demo: 'デモを依頼', brochure: '概要資料をリクエスト' },
} as const

export default function LeadRequestRoute({ locale, requestType }: { locale: LeadLocale; requestType: LeadRequestType }) {
  const path = LEAD_FORM_PATHS[locale][requestType]
  const name = names[locale][requestType]
  const webPage = {
    '@context': 'https://schema.org', '@type': 'WebPage', name,
    url: `${SITE_URL}${path}`, inLanguage: locale,
    isPartOf: { '@id': `${SITE_URL}/#website` },
  }
  return <>
    <BreadcrumbJsonLd name={name} path={path} locale={locale} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
    <LeadRequestPage locale={locale} requestType={requestType} />
  </>
}
