import { SITE_NAME, SITE_URL } from '@/lib/config'
import { localizedPath, type Locale } from '@/content'

type BreadcrumbJsonLdProps = {
  name: string
  path: string
  locale?: Locale
}

export default function BreadcrumbJsonLd({
  name,
  path,
  locale = 'en',
}: BreadcrumbJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: SITE_NAME,
        item: `${SITE_URL}${localizedPath('/', locale)}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name,
        item: `${SITE_URL}${path}`,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
