'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { isJapanesePath, localizedPath } from '@/content'

export default function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname()
  const current = isJapanesePath(pathname) ? 'ja' : 'en'
  return (
    <nav aria-label={current === 'ja' ? '言語を選択' : 'Select language'} className={`flex items-center font-mono text-[12px] font-medium tracking-[0.1em] ${mobile ? 'justify-center border border-white/25 p-1' : ''}`}>
      <Link href={localizedPath(pathname, 'en')} hrefLang="en" lang="en" aria-label="Switch language to English" aria-current={current === 'en' ? 'page' : undefined} className={`grid min-h-11 min-w-11 place-items-center ${current === 'en' ? mobile ? 'bg-white text-navy-900' : 'bg-navy-900 text-white' : mobile ? 'text-white/55' : 'text-ink-500'}`}>EN</Link>
      <span className={mobile ? 'text-white/25' : 'text-navy-900/20'} aria-hidden="true">/</span>
      <Link href={localizedPath(pathname, 'ja')} hrefLang="ja" lang="ja" aria-label="Switch language to Japanese" aria-current={current === 'ja' ? 'page' : undefined} className={`grid min-h-11 min-w-11 place-items-center ${current === 'ja' ? mobile ? 'bg-white text-navy-900' : 'bg-navy-900 text-white' : mobile ? 'text-white/55' : 'text-ink-500'}`}>JP</Link>
    </nav>
  )
}
