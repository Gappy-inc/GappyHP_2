import type { ReactNode } from 'react'

type PageHeroProps = {
  eyebrow: string
  title: string
  body: ReactNode
  children?: ReactNode
}

export default function PageHero({
  eyebrow,
  title,
  body,
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-navy-900/10 pb-20 pt-36 md:pb-28 md:pt-44">
      <div
        className="pointer-events-none absolute inset-0 -z-10 hairline-grid opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_82%)]"
        aria-hidden="true"
      />
      <div className="container-luxe">
        <p className="eyebrow text-gold-700">{eyebrow}</p>
        <div className="mt-7 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20">
          <h1 className="display-title max-w-5xl">{title}</h1>
          <div>
            <div className="body-lead max-w-xl">{body}</div>
            {children ? (
              <div className="mt-8 flex flex-wrap gap-3">{children}</div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
