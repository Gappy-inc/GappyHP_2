'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import BrandMark from '@/components/BrandMark'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { getContent, isJapanesePath, localizedPath } from '@/content'
import { GOODTIME_URL } from '@/lib/config'

export default function Header() {
  const pathname = usePathname()
  const locale = isJapanesePath(pathname) ? 'ja' : 'en'
  const copy = getContent(locale).navigation
  const primaryLinks = copy.primary.map(({ label, path }) => ({ label, href: localizedPath(path, locale) }))
  const companyLinks = copy.company.map(({ label, path }) => ({ label, href: localizedPath(path, locale) }))
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCompanyOpen, setIsCompanyOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const companyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
    setIsCompanyOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setIsCompanyOpen(false); setIsMenuOpen(false) }
    }
    const onPointerDown = (event: PointerEvent) => {
      if (companyRef.current && !companyRef.current.contains(event.target as Node)) setIsCompanyOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => { document.removeEventListener('keydown', onKeyDown); document.removeEventListener('pointerdown', onPointerDown) }
  }, [])

  const isActive = (href: string) => pathname === href
  const isCompanyActive = companyLinks.some(({ href }) => pathname === href)

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${scrolled || isMenuOpen ? 'border-navy-900/15 bg-ivory-50/95 backdrop-blur-xl' : 'border-transparent bg-ivory-50/80 backdrop-blur-sm'}`}>
      <div className="container-luxe flex h-[72px] items-center justify-between lg:h-[80px]">
        <BrandMark href={localizedPath('/', locale)} />
        <nav className="hidden items-center gap-7 lg:flex" aria-label={copy.primaryLabel}>
          {primaryLinks.map(({ label, href }) => (
            <Link key={href} href={href} aria-current={isActive(href) ? 'page' : undefined} className={`relative flex min-h-11 items-center font-mono text-[10px] uppercase tracking-[0.13em] transition-colors after:absolute after:bottom-1 after:left-0 after:h-px after:bg-gold-500 after:transition-[width] ${isActive(href) ? 'text-navy-900 after:w-full' : 'text-ink-500 after:w-0 hover:text-navy-900 hover:after:w-full'}`}>{label}</Link>
          ))}
          <div ref={companyRef} className="relative">
            <button type="button" className={`relative flex min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.13em] after:absolute after:bottom-1 after:left-0 after:h-px after:bg-gold-500 ${isCompanyActive ? 'text-navy-900 after:w-full' : 'text-ink-500 after:w-0'}`} aria-expanded={isCompanyOpen} aria-controls="company-navigation" onClick={() => setIsCompanyOpen((open) => !open)}>{copy.companyLabel}<span aria-hidden="true">{isCompanyOpen ? '−' : '+'}</span></button>
            {isCompanyOpen ? (
              <div id="company-navigation" className="absolute right-0 top-full w-56 border border-navy-900/15 bg-ivory-50 p-3">
                {companyLinks.map(({ label, href }) => <Link key={href} href={href} className="flex min-h-11 items-center border-b border-navy-900/10 text-sm last:border-b-0 hover:text-gold-700">{label}</Link>)}
              </div>
            ) : null}
          </div>
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <a href={GOODTIME_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">{copy.talk}</a>
        </div>
        <button type="button" className="flex h-11 items-center gap-3 font-mono text-[10px] uppercase tracking-[0.12em] lg:hidden" onClick={() => setIsMenuOpen((open) => !open)} aria-label={isMenuOpen ? copy.closeMenu : copy.openMenu} aria-expanded={isMenuOpen} aria-controls="mobile-navigation">
          <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
          <span className="relative block h-3 w-5" aria-hidden="true"><span className={`absolute left-0 top-0 h-px w-5 bg-navy-900 transition-transform ${isMenuOpen ? 'translate-y-[5px] rotate-45' : ''}`} /><span className={`absolute bottom-0 left-0 h-px w-5 bg-navy-900 transition-transform ${isMenuOpen ? '-translate-y-[6px] -rotate-45' : ''}`} /></span>
        </button>
      </div>
      <div id="mobile-navigation" className={`fixed inset-x-0 top-[72px] h-[calc(100dvh-72px)] bg-navy-950 text-white transition-[opacity,visibility] lg:hidden ${isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <nav className="container-luxe flex h-full flex-col overflow-y-auto py-8" aria-label={copy.mobileLabel}>
          <div className="border-t border-white/20">
            {[...primaryLinks, ...companyLinks].map(({ label, href }, index) => (
              <Link key={href} href={href} className="grid min-h-[68px] grid-cols-[2rem_1fr_auto] items-center border-b border-white/20 text-[clamp(1.35rem,7vw,2.2rem)] font-medium tracking-[-0.04em]"><span className="font-mono text-[9px] text-gold-300">{String(index + 1).padStart(2, '0')}</span><span>{label}</span><span className="text-gold-300" aria-hidden="true">↗</span></Link>
            ))}
          </div>
          <div className="mt-auto grid gap-5 pt-7">
            <a href={GOODTIME_URL} target="_blank" rel="noopener noreferrer" className="btn-light w-full">{copy.talk}</a>
            <LanguageSwitcher mobile />
          </div>
        </nav>
      </div>
    </header>
  )
}
