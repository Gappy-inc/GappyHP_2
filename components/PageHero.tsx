import type { ReactNode } from 'react'
import { GappyAxis, SectionLabel } from '@/components/GappyAxis'

type PageHeroProps = { eyebrow: string; title: string; body: ReactNode; children?: ReactNode }

export default function PageHero({ eyebrow, title, body, children }: PageHeroProps) {
  return (
    <section className="view-react relative overflow-hidden border-b border-navy-900/15 pb-20 pt-32 md:pb-28 md:pt-40">
      <div className="container-luxe">
        <SectionLabel index="00">{eyebrow}</SectionLabel>
        <div className="mt-8 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-24">
          <h1 className="page-title max-w-[18ch]">{title}</h1>
          <div className="lg:pb-3">
            <div className="body-lead max-w-xl">{body}</div>
            {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
          </div>
        </div>
        <div className="mt-16 h-20 overflow-hidden opacity-55"><GappyAxis label={eyebrow} /></div>
      </div>
    </section>
  )
}
