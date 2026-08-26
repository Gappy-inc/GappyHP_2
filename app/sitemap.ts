import type { MetadataRoute } from 'next'
import { localizedPath } from '@/content'
import { SITE_URL } from '@/lib/config'

const routes = [
  { path: '/', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/technology', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/travel', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/cases', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/careers', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/privacy', priority: 0.4, changeFrequency: 'yearly' as const },
  { path: '/security', priority: 0.6, changeFrequency: 'monthly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) => {
    const englishPath = localizedPath(route.path, 'en')
    const japanesePath = localizedPath(route.path, 'ja')
    const languages = {
      en: `${SITE_URL}${englishPath}`,
      ja: `${SITE_URL}${japanesePath}`,
      'x-default': `${SITE_URL}${englishPath}`,
    }

    return [
      {
        url: `${SITE_URL}${englishPath}`,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages },
      },
      {
        url: `${SITE_URL}${japanesePath}`,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages },
      },
    ]
  })
}
