'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const GOODTIME_URL = 'https://meet.goodtime.io/w/gappyjp/mitsuki/30-min-video'

const NAV_LINKS = [
  { label: 'Workflows', href: '/#workflows' },
  { label: 'Cases', href: '/cases' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ivory-50/95 backdrop-blur-md border-b border-gold-500/20 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container-luxe flex items-center justify-between h-[80px] md:h-[90px]">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0 hover:opacity-80 transition-opacity" aria-label="Gappy home">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-navy-900 text-[11px] font-semibold text-white" aria-hidden="true">G</span>
          <span
            className="text-navy-900 font-semibold text-[16px] tracking-[-0.01em]"
            style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
          >
            Gappy
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="relative text-[11px] font-medium tracking-[0.1em] text-navy-900 hover:text-gold-600 transition-colors group"
            >
              {label}
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href={GOODTIME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-navy"
          >
            Talk to Gappy
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden flex flex-col gap-1.5 w-10 h-10 items-center justify-center"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span className={`block w-5 h-px bg-navy-900 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
          <span className={`block w-5 h-px bg-navy-900 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-navy-900 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-navigation"
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-500 bg-ivory-50 border-b border-gold-500/20 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-luxe py-6 flex flex-col gap-5">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsMenuOpen(false)}
              className="text-[15px] font-medium tracking-[0.08em] text-navy-900 hover:text-gold-600 transition-colors"
            >
              {label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-3">
            <Link
              href={GOODTIME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-navy text-center"
            >
              Talk to Gappy
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
