import type { MetadataRoute } from 'next'
import { localizedPath } from '@/content'
import { SITE_URL } from '@/lib/config'
import { productFamily } from '@/content/product-family'
import { careerJobs } from '@/content/careers'

const routes = [
  { path: '/', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/technology', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/travel', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/cases', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/resources', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/careers', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/request-demo', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/request-brochure', priority: 0.7, changeFrequency: 'monthly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedRoutes = routes.flatMap((route) => {
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

  const productRoutes = productFamily.map((product) => ({
    url: `${SITE_URL}${product.path}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    alternates: {
      languages: {
        en: `${SITE_URL}${product.path}`,
        'x-default': `${SITE_URL}${product.path}`,
      },
    },
  }))

  const careerRoutes = careerJobs.map((job) => ({
    url: `${SITE_URL}/careers/${job.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    alternates: { languages: { en: `${SITE_URL}/careers/${job.slug}`, 'x-default': `${SITE_URL}/careers/${job.slug}` } },
  }))

  return [...localizedRoutes, ...productRoutes, ...careerRoutes]
}
