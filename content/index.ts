import { enContent, type SiteContent } from '@/content/en'
import { jaContent } from '@/content/ja'

export type Locale = 'en' | 'ja'
export type PageKey =
  | 'home'
  | 'technology'
  | 'travel'
  | 'projects'
  | 'insights'
  | 'about'
  | 'careers'
  | 'contact'
  | 'privacy'
  | 'security'

export const pagePaths: Record<PageKey, string> = {
  home: '/',
  technology: '/technology',
  travel: '/travel',
  projects: '/cases',
  insights: '/resources',
  about: '/about',
  careers: '/careers',
  contact: '/contact',
  privacy: '/privacy',
  security: '/security',
}

export function getContent(locale: Locale): SiteContent {
  return locale === 'ja' ? jaContent : enContent
}

export function isJapanesePath(pathname: string): boolean {
  return pathname === '/ja' || pathname.startsWith('/ja/')
}

export function localizedPath(path: string, locale: Locale): string {
  const normalized = path === '' ? '/' : path
  const englishPath =
    normalized === '/ja' || normalized === '/ja/'
      ? '/'
      : normalized.replace(/^\/ja(?=\/)/, '') || '/'

  if (locale === 'ja') {
    return englishPath === '/' ? '/ja/' : `/ja${englishPath}`
  }

  return englishPath
}

export function counterpartPath(pathname: string): string {
  return isJapanesePath(pathname)
    ? localizedPath(pathname, 'en')
    : localizedPath(pathname, 'ja')
}
