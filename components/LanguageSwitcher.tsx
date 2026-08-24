'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { isJapanesePath, localizedPath } from '@/content'

type LanguageSwitcherProps = {
  mobile?: boolean
}

export default function LanguageSwitcher({ mobile = false }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const current = isJapanesePath(pathname) ? 'ja' : 'en'

  return (
    <nav
      aria-label={current === 'ja' ? '言語を選択' : 'Select language'}
      className={`flex items-center ${
        mobile
          ? 'mt-5 w-full justify-center rounded-lg border border-navy-900/15 p-1'
          : 'rounded-md border border-navy-900/15 p-0.5'
      }`}
    >
      <Link
        href={localizedPath(pathname, 'en')}
        hrefLang="en"
        lang="en"
        aria-label="Switch language to English"
        aria-current={current === 'en' ? 'page' : undefined}
        className={`grid min-h-11 min-w-11 place-items-center rounded text-[10px] font-semibold tracking-[0.12em] transition-colors ${
          current === 'en'
            ? 'bg-navy-900 text-white'
            : 'text-ink-500 hover:bg-navy-900/5 hover:text-navy-900'
        }`}
      >
        EN
      </Link>
      <span className="mx-1 text-navy-900/20" aria-hidden="true">
        /
      </span>
      <Link
        href={localizedPath(pathname, 'ja')}
        hrefLang="ja"
        lang="ja"
        aria-label="Switch language to Japanese"
        aria-current={current === 'ja' ? 'page' : undefined}
        className={`grid min-h-11 min-w-11 place-items-center rounded text-[10px] font-semibold tracking-[0.12em] transition-colors ${
          current === 'ja'
            ? 'bg-navy-900 text-white'
            : 'text-ink-500 hover:bg-navy-900/5 hover:text-navy-900'
        }`}
      >
        JP
      </Link>
    </nav>
  )
}
