import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/config'

const routes = [
  { path: '/', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/technology', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/travel', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/cases', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/resources', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/careers', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
