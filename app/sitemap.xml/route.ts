import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL
  const now = new Date()

  // サイトマップに含めるページの定義
  const pages: Array<{
    path: string
    priority: number
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
    lastModified?: Date
  }> = [
    // ホームページ（最高優先度）
    {
      path: '',
      priority: 1.0,
      changeFrequency: 'weekly',
      lastModified: now,
    },
    // 主要ページ
    {
      path: '/solutions',
      priority: 0.9,
      changeFrequency: 'weekly',
      lastModified: now,
    },
    {
      path: '/about',
      priority: 0.8,
      changeFrequency: 'monthly',
      lastModified: now,
    },
    {
      path: '/cases',
      priority: 0.8,
      changeFrequency: 'weekly',
      lastModified: now,
    },
    // Solutionsサブページ
    {
      path: '/solutions/platform',
      priority: 0.8,
      changeFrequency: 'weekly',
      lastModified: now,
    },
    {
      path: '/solutions/partners',
      priority: 0.8,
      changeFrequency: 'weekly',
      lastModified: now,
    },
    {
      path: '/solutions/insight',
      priority: 0.8,
      changeFrequency: 'weekly',
      lastModified: now,
    },
    // その他のページ
    {
      path: '/news',
      priority: 0.7,
      changeFrequency: 'daily',
      lastModified: now,
    },
    {
      path: '/contact',
      priority: 0.6,
      changeFrequency: 'monthly',
      lastModified: now,
    },
  ]

  return pages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: page.lastModified || now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}


