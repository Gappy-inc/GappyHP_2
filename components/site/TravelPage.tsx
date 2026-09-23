import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import TravelGlobalPage from '@/components/site/TravelGlobalPage'
import { localizedPath, type Locale } from '@/content'

export default function TravelPage({ locale }: { locale: Locale }) {
  return (
    <>
      <BreadcrumbJsonLd name="Travel" path={localizedPath('/travel', locale)} locale={locale} />
      <TravelGlobalPage locale={locale} />
    </>
  )
}
