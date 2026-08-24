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
  const primaryLinks = copy.primary.map(({ label, path }) => ({
    label,
    href: localizedPath(path, locale),
  }))
  const companyLinks = copy.company.map(({ label, path }) => ({
    label,
    href: localizedPath(path, locale),
  }))
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCompanyOpen, setIsCompanyOpen] = useState(false)
  const [isMobileCompanyOpen, setIsMobileCompanyOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const companyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
    setIsCompanyOpen(false)
    setIsMobileCompanyOpen(false)
  }, [pathname])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsCompanyOpen(false)
        setIsMenuOpen(false)
      }
    }
    const onPointerDown = (event: PointerEvent) => {
      if (
        companyRef.current &&
        !companyRef.current.contains(event.target as Node)
      ) {
        setIsCompanyOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [])

  const isActive = (href: string) => pathname === href
  const isCompanyActive = companyLinks.some(({ href }) => pathname === href)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || isMenuOpen
          ? 'border-navy-900/10 bg-ivory-50/95 shadow-sm backdrop-blur-xl'
          : 'border-transparent bg-ivory-50/80 backdrop-blur-sm'
      }`}
    >
      <div className="container-luxe flex h-[76px] items-center justify-between lg:h-[84px]">
        <BrandMark href={localizedPath('/', locale)} />

        <nav className="hidden items-center gap-6 lg:flex" aria-label={copy.primaryLabel}>
          {primaryLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? 'page' : undefined}
              className={`flex min-h-11 items-center border-b text-[11px] font-medium tracking-[0.08em] transition-colors ${
                isActive(href)
                  ? 'border-gold-500 text-navy-900'
                  : 'border-transparent text-ink-500 hover:text-navy-900'
              }`}
            >
              {label}
            </Link>
          ))}

          <div ref={companyRef} className="relative">
            <button
              type="button"
              className={`flex min-h-11 items-center gap-2 border-b text-[11px] font-medium tracking-[0.08em] transition-colors ${
                isCompanyActive
                  ? 'border-gold-500 text-navy-900'
                  : 'border-transparent text-ink-500 hover:text-navy-900'
              }`}
              aria-expanded={isCompanyOpen}
              aria-haspopup="true"
              aria-controls="company-navigation"
              onClick={() => setIsCompanyOpen((open) => !open)}
            >
              {copy.companyLabel}
              <span
                className={`text-[10px] transition-transform ${isCompanyOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              >
                ↓
              </span>
            </button>
            {isCompanyOpen ? (
              <div
                id="company-navigation"
                className="absolute right-0 top-[calc(100%+10px)] w-52 rounded-xl border border-navy-900/10 bg-white p-2 shadow-[0_24px_60px_rgba(7,14,34,0.14)]"
              >
                {companyLinks.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex min-h-11 items-center rounded-lg px-4 text-sm text-ink-500 transition-colors hover:bg-ivory-100 hover:text-navy-900"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <a
            href={GOODTIME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            {copy.talk}
          </a>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-md lg:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? copy.closeMenu : copy.openMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span className="relative block h-4 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 top-0 h-px w-5 bg-navy-900 transition-transform ${
                isMenuOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-px w-5 bg-navy-900 transition-opacity ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-px w-5 bg-navy-900 transition-transform ${
                isMenuOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`overflow-hidden border-t border-navy-900/10 bg-ivory-50 transition-[max-height,opacity] duration-300 lg:hidden ${
          isMenuOpen ? 'max-h-[calc(100vh-76px)] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav
          className="container-luxe max-h-[calc(100vh-76px)] overflow-y-auto py-5"
          aria-label={copy.mobileLabel}
        >
          {primaryLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="flex min-h-12 items-center border-b border-navy-900/10 text-base font-medium text-navy-900"
            >
              {label}
            </Link>
          ))}
          <button
            type="button"
            className="flex min-h-12 w-full items-center justify-between border-b border-navy-900/10 text-left text-base font-medium text-navy-900"
            aria-expanded={isMobileCompanyOpen}
            aria-controls="mobile-company-navigation"
            onClick={() => setIsMobileCompanyOpen((open) => !open)}
          >
            {copy.companyLabel}
            <span aria-hidden="true">{isMobileCompanyOpen ? '−' : '+'}</span>
          </button>
          {isMobileCompanyOpen ? (
            <div id="mobile-company-navigation" className="border-b border-navy-900/10 py-2">
              {companyLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex min-h-11 items-center pl-5 text-sm text-ink-500"
                >
                  {label}
                </Link>
              ))}
            </div>
          ) : null}
          <a
            href={GOODTIME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-5 w-full"
          >
            {copy.talk}
          </a>
          <LanguageSwitcher mobile />
        </nav>
      </div>
    </header>
  )
}
