'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import BrandMark from '@/components/BrandMark'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { getContent, isJapanesePath, localizedPath } from '@/content'

export default function Header() {
  const pathname = usePathname()
  const locale = isJapanesePath(pathname) ? 'ja' : 'en'
  const copy = getContent(locale).navigation
  const primaryLinks = copy.primary.map(({ label, path }) => ({ label, href: localizedPath(path, locale) }))
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isMenuOpen])

  const isActive = (href: string) => pathname === href

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${scrolled || isMenuOpen ? 'border-navy-900/15 bg-ivory-50/95 backdrop-blur-xl' : 'border-transparent bg-ivory-50/80 backdrop-blur-sm'}`}>
      <div className="container-luxe flex h-[72px] items-center justify-between lg:h-[80px]">
        <BrandMark href={localizedPath('/', locale)} />
        <nav className="hidden items-center gap-7 lg:flex" aria-label={copy.primaryLabel}>
          {primaryLinks.map(({ label, href }) => (
            <Link key={href} href={href} aria-current={isActive(href) ? 'page' : undefined} className={`relative flex min-h-11 items-center text-[13px] font-medium tracking-[0.01em] transition-colors after:absolute after:bottom-1 after:left-0 after:h-0.5 after:bg-signal-600 after:transition-[width] ${isActive(href) ? 'text-navy-900 after:w-full' : 'text-ink-700 after:w-0 hover:text-navy-900 hover:after:w-full'}`}>{label}</Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <Link href={localizedPath('/contact', locale)} className="btn-primary">{copy.talk}</Link>
        </div>
        <button ref={menuButtonRef} type="button" className="flex h-11 items-center gap-3 text-sm font-medium lg:hidden" onClick={() => setIsMenuOpen((open) => !open)} aria-label={isMenuOpen ? copy.closeMenu : copy.openMenu} aria-expanded={isMenuOpen} aria-controls="mobile-navigation">
          <span>{isMenuOpen ? copy.closeText : copy.menuText}</span>
          <span className="relative block h-3 w-5" aria-hidden="true"><span className={`absolute left-0 top-0 h-px w-5 bg-navy-900 transition-transform ${isMenuOpen ? 'translate-y-[5px] rotate-45' : ''}`} /><span className={`absolute bottom-0 left-0 h-px w-5 bg-navy-900 transition-transform ${isMenuOpen ? '-translate-y-[6px] -rotate-45' : ''}`} /></span>
        </button>
      </div>
      <div id="mobile-navigation" className={`fixed inset-x-0 top-[72px] h-[calc(100dvh-72px)] bg-navy-950 text-white transition-[opacity,visibility] lg:hidden ${isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <nav className="container-luxe flex h-full flex-col overflow-y-auto pb-[max(2rem,env(safe-area-inset-bottom))] pt-7" aria-label={copy.mobileLabel}>
          <div className="border-t border-white/20">
            {primaryLinks.map(({ label, href }) => (
              <Link key={href} href={href} aria-current={isActive(href) ? 'page' : undefined} className={`grid min-h-[64px] grid-cols-[1fr_auto] items-center border-b border-white/20 text-[clamp(1.125rem,5vw,1.45rem)] font-semibold tracking-[-0.02em] ${isActive(href) ? 'text-signal-300' : 'text-white'}`}><span>{label}</span><span className="text-signal-300" aria-hidden="true">→</span></Link>
            ))}
          </div>
          <div className="mt-auto grid gap-5 pt-7">
            <Link href={localizedPath('/contact', locale)} className="btn-light w-full">{copy.talk}</Link>
            <LanguageSwitcher mobile />
          </div>
        </nav>
      </div>
    </header>
  )
}
