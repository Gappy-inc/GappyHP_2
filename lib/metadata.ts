import type { Metadata } from 'next'
import {
  getContent,
  localizedPath,
  pagePaths,
  type Locale,
  type PageKey,
} from '@/content'
import { OG_IMAGE_URL, SITE_NAME, SITE_URL } from '@/lib/config'

type PageMetadataInput = {
  title: string
  description: string
  path: string
  locale?: Locale
}

export function pageMetadata({
  title,
  description,
  path,
  locale = 'en',
}: PageMetadataInput): Metadata {
  const canonicalPath = localizedPath(path, locale)
  const url = `${SITE_URL}${canonicalPath}`
  const englishUrl = `${SITE_URL}${localizedPath(path, 'en')}`
  const japaneseUrl = `${SITE_URL}${localizedPath(path, 'ja')}`
  const isJapanese = locale === 'ja'
  const imageUrl = isJapanese ? `${OG_IMAGE_URL}?locale=ja` : OG_IMAGE_URL

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: englishUrl,
        ja: japaneseUrl,
        'x-default': englishUrl,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: isJapanese ? 'ja_JP' : 'en_US',
      alternateLocale: [isJapanese ? 'en_US' : 'ja_JP'],
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: isJapanese
            ? 'Gappy — 業務を実行するAI Workforce'
            : 'Gappy — AI Workforce for Business Operations',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export function localizedPageMetadata(
  locale: Locale,
  page: PageKey,
): Metadata {
  const pageContent = getContent(locale)[page]

  return pageMetadata({
    title: pageContent.seo.title,
    description: pageContent.seo.description,
    path: pagePaths[page],
    locale,
  })
}
