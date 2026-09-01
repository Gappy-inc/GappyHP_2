import Link from 'next/link'
import BrandMark from '@/components/BrandMark'
import { getContent, localizedPath, type Locale } from '@/content'
import { COMPANY_ADDRESS, CONTACT_EMAIL } from '@/lib/config'

export default function Footer({ locale = 'en' }: { locale?: Locale }) {
  const copy = getContent(locale)
  const links = copy.footer.links.map(({ label, path }) => ({ label, href: localizedPath(path, locale) }))
  return (
    <footer className="bg-navy-950 py-10 text-white/80 md:py-12">
      <div className="container-luxe">
        <div className="grid gap-10 border-b border-white/20 pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <BrandMark inverse href={localizedPath('/', locale)} priority={false} />
            <p className="mt-6 text-base font-semibold text-white">{copy.footer.legalName}</p>
            <address className="mt-4 max-w-sm not-italic text-[13px] leading-6 text-white/70">{COMPANY_ADDRESS}</address>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-3 inline-flex min-h-11 items-center text-sm text-white underline decoration-signal-400 underline-offset-4 hover:text-signal-300">{CONTACT_EMAIL}</a>
          </div>
          <nav aria-label={locale === 'ja' ? 'フッターナビゲーション' : 'Footer navigation'} className="grid grid-cols-2 gap-x-8 border-t border-white/20 sm:grid-cols-4">
            {links.map(({ label, href }) => (
              <Link key={href} href={href} className="flex min-h-12 items-center border-b border-white/20 text-[13px] font-medium text-white transition-colors hover:text-signal-300">{label}</Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-4 pt-6 text-[12px] leading-5 text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Gappy, Inc.</p>
          <Link href={localizedPath('/', locale === 'en' ? 'ja' : 'en')} hrefLang={locale === 'en' ? 'ja' : 'en'} className="inline-flex min-h-11 items-center font-mono font-medium uppercase tracking-[0.08em] text-white hover:text-signal-300">{locale === 'en' ? '日本語 / JP' : 'English / EN'}</Link>
        </div>
      </div>
    </footer>
  )
}
