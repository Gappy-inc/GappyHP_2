import type { ReactNode } from 'react'
import { GappyAxis, SectionLabel } from '@/components/GappyAxis'

export type PageHeroVariant =
  | 'brand'
  | 'product'
  | 'technology'
  | 'company'
  | 'utility'

type PageHeroProps = {
  eyebrow: string
  title: ReactNode
  body: ReactNode
  children?: ReactNode
  visual?: ReactNode
  variant?: PageHeroVariant
}

export default function PageHero({
  eyebrow,
  title,
  body,
  children,
  visual,
  variant = 'utility',
}: PageHeroProps) {
  const inverse = variant === 'technology'
  const shellClass = {
    brand: 'pb-20 pt-32 md:pb-28 md:pt-40',
    product: 'pb-16 pt-28 md:pb-24 md:pt-36',
    technology: 'bg-navy-950 pb-16 pt-28 text-white md:pb-24 md:pt-36',
    company: 'pb-20 pt-32 md:pb-24 md:pt-40',
    utility: 'pb-14 pt-28 md:pb-16 md:pt-32',
  }[variant]

  const gridClass = visual
    ? 'lg:grid-cols-[0.82fr_1.18fr] lg:items-center'
    : variant === 'utility'
      ? 'lg:grid-cols-[0.78fr_0.72fr] lg:items-end'
      : 'lg:grid-cols-[1.05fr_0.75fr] lg:items-end'

  return (
    <section className={`relative overflow-hidden border-b ${inverse ? 'border-white/20' : 'border-navy-900/15'} ${shellClass}`}>
      <div className="container-luxe">
        <SectionLabel index="00" inverse={inverse}>{eyebrow}</SectionLabel>
        <div className={`mt-8 grid gap-10 lg:gap-16 ${gridClass}`}>
          <div className={variant === 'company' ? 'border-l-2 border-signal-500 pl-6 md:pl-8' : undefined}>
            <h1 className={`page-title max-w-[20ch] ${inverse ? '!text-white' : ''}`}>{title}</h1>
            <div className={`mt-8 ${visual ? '' : 'lg:hidden'}`}>
                <div className={`body-lead max-w-xl ${inverse ? '!text-white/75' : ''}`}>{body}</div>
                {children ? <div className="mt-7 flex flex-wrap gap-3">{children}</div> : null}
            </div>
          </div>
          <div className={visual ? '' : 'hidden lg:block lg:pb-2'}>
            {visual ?? (
              <>
                <div className={`body-lead max-w-xl ${inverse ? '!text-white/75' : ''}`}>{body}</div>
                {children ? <div className="mt-7 flex flex-wrap gap-3">{children}</div> : null}
              </>
            )}
          </div>
        </div>
        {variant === 'product' || variant === 'technology' ? (
          <div className={`mt-10 h-10 overflow-hidden ${inverse ? 'opacity-70' : 'opacity-45'}`}><GappyAxis label={eyebrow} inverse={inverse} /></div>
        ) : null}
      </div>
    </section>
  )
}
