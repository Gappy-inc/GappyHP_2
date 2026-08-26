import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import PageHero from '@/components/PageHero'
import { getContent, localizedPath, type Locale } from '@/content'

export default function InsightsPage({ locale }: { locale: Locale }) {
  const page = getContent(locale).insights
  const path = localizedPath('/resources', locale)

  return (
    <div className="min-h-[70svh] bg-ivory-50 text-ink-900">
      <BreadcrumbJsonLd name="Gappy Research Notes" path={path} locale={locale} />
      <PageHero variant="utility" eyebrow={page.hero.eyebrow} title={page.hero.title} body={<><p>{page.hero.body}</p><p className="mt-6 font-medium text-navy-900">{page.note}</p></>} />
    </div>
  )
}
