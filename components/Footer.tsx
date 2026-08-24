import Link from 'next/link'
import BrandMark from '@/components/BrandMark'
import {
  COMPANY_ADDRESS,
  CONTACT_EMAIL,
  GOODTIME_URL,
} from '@/lib/config'

const exploreLinks = [
  { label: 'Technology', href: '/technology' },
  { label: 'Travel', href: '/travel' },
  { label: 'Projects', href: '/cases' },
  { label: 'Insights', href: '/resources' },
]

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 pb-8 pt-16 text-white/65">
      <div
        className="pointer-events-none absolute inset-0 hairline-grid opacity-20"
        aria-hidden="true"
      />
      <div className="container-luxe relative">
        <div className="grid gap-14 border-b border-white/10 pb-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <BrandMark inverse />
            <p className="mt-7 max-w-lg text-[clamp(1.8rem,3.6vw,3.2rem)] font-medium leading-[1.08] tracking-[-0.045em] text-white">
              AI Workforce for Business Operations.
              <br />
              <span className="text-gold-300">Starting with travel.</span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <FooterColumn title="Explore" links={exploreLinks} />
            <FooterColumn title="Company" links={companyLinks} />
          </div>
        </div>

        <div className="grid gap-8 border-b border-white/10 py-8 text-sm md:grid-cols-2">
          <div>
            <p className="eyebrow text-gold-300">Connect</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-6">
              <a
                href={GOODTIME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-11 content-center hover:text-white"
              >
                Talk to Gappy
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="min-h-11 content-center hover:text-white"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
          <div className="md:text-right">
            <p className="font-medium text-white/80">株式会社Gappy</p>
            <p className="mt-2 text-xs leading-6 text-white/40">{COMPANY_ADDRESS}</p>
          </div>
        </div>

        <p className="pt-8 text-xs text-white/35">
          © 2026 Gappy, Inc. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div>
      <p className="eyebrow text-gold-300">{title}</p>
      <ul className="mt-5 space-y-1">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className="flex min-h-11 items-center text-sm transition-colors hover:text-white"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
