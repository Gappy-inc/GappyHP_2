import Link from 'next/link'
import BrandMark from '@/components/BrandMark'
import { AxisMark } from '@/components/GappyAxis'
import { getContent, localizedPath, type Locale } from '@/content'
import { COMPANY_ADDRESS, CONTACT_EMAIL, GOODTIME_URL } from '@/lib/config'

export default function Footer({ locale = 'en' }: { locale?: Locale }) {
  const copy = getContent(locale)
  const links = [...copy.navigation.primary, ...copy.navigation.company].map(({ label, path }) => ({ label, href: localizedPath(path, locale) }))
  return (
    <footer className="relative overflow-hidden bg-navy-950 pb-8 pt-16 text-white/60">
      <div className="container-luxe">
        <div className="grid gap-14 border-b border-white/20 pb-16 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <BrandMark inverse href={localizedPath('/', locale)} />
            <p className="mt-10 max-w-5xl text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[1.08] tracking-[-0.05em] text-white">{copy.footer.statement}</p>
            <p className="mt-5 text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-[-0.035em] text-gold-300">{copy.footer.accent}</p>
          </div>
          <div className="self-end border-t border-white/20">
            {links.map(({ label, href }, index) => (
              <Link key={href} href={href} className="grid min-h-14 grid-cols-[2rem_1fr_auto] items-center border-b border-white/20 text-sm text-white transition-colors hover:text-gold-300"><span className="font-mono text-[12px] text-white/35">{String(index + 1).padStart(2, '0')}</span><span>{label}</span><span aria-hidden="true">↗</span></Link>
            ))}
          </div>
        </div>
        <div className="grid gap-8 border-b border-white/20 py-8 md:grid-cols-3 md:items-end">
          <div><p className="eyebrow text-gold-300">{copy.footer.connect}</p><a href={GOODTIME_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center text-sm text-white hover:text-gold-300">{copy.footer.talk} ↗</a></div>
          <div><a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex min-h-11 items-center text-sm text-white hover:text-gold-300">{CONTACT_EMAIL}</a><p className="mt-2 text-[13px] leading-6 text-white/45">{COMPANY_ADDRESS}</p></div>
          <div className="flex items-center gap-3 md:justify-end"><AxisMark inverse /><Link href={localizedPath('/', locale === 'en' ? 'ja' : 'en')} className="font-mono text-[12px] uppercase tracking-[0.1em] text-white hover:text-gold-300">{locale === 'en' ? '日本語 / JP' : 'English / EN'}</Link></div>
        </div>
        <div className="flex flex-col gap-3 pt-8 font-mono text-[12px] uppercase tracking-[0.1em] text-white/35 sm:flex-row sm:justify-between"><p>© 2026 Gappy, Inc.</p><p>AI Workforce for Business Operations</p></div>
      </div>
    </footer>
  )
}
