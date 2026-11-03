import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { notFound } from 'next/navigation'
import ApplicationForm from '@/components/careers/ApplicationForm'
import styles from '@/components/careers/Careers.module.css'
import { careerAbout, careerJobs, getCareerJob } from '@/content/careers'
import { SITE_NAME, SITE_URL } from '@/lib/config'
import { pageMetadata } from '@/lib/metadata'

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return careerJobs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const job = getCareerJob(slug)
  if (!job) return {}
  return pageMetadata({
    title: `${job.title} — ${job.market} | Careers at Gappy`,
    description: `Join Gappy as ${job.title} for ${job.market} and help build reliable AI-powered operations for travel.`,
    path: `/careers/${job.slug}`,
    includeJapaneseAlternate: false,
  })
}

export default async function CareerRolePage({ params }: PageProps) {
  const { slug } = await params
  const job = getCareerJob(slug)
  if (!job) notFound()
  const schema = {
    '@context': 'https://schema.org', '@type': 'JobPosting',
    title: job.title,
    description: `${careerAbout} ${job.why} What you will do: ${job.responsibilities.join(' ')}`,
    identifier: { '@type': 'PropertyValue', name: SITE_NAME, value: job.slug },
    hiringOrganization: { '@type': 'Organization', name: SITE_NAME, sameAs: SITE_URL },
    applicantLocationRequirements: { '@type': 'Country', name: job.market },
    url: `${SITE_URL}/careers/${job.slug}`,
  }
  return (
    <div className={styles.rolePage}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className={styles.roleHero}>
        <Link href="/careers#open-positions" className={styles.backLink}><ArrowLeft aria-hidden="true" size={17} />All positions</Link>
        <p className={styles.eyebrow}>{job.shortTeam} · {job.market}</p>
        <h1>{job.title}</h1>
        <p>{job.why}</p>
        <a href="#application" className={styles.primaryCta} data-career-event="career_apply_click" data-role-slug={job.slug} data-team={job.team} data-market={job.market} data-cta-location="role_hero">Apply for this role <ArrowRight aria-hidden="true" size={18} /></a>
      </div>
      <div className={styles.roleBody}>
        <aside><p>Team</p><strong>{job.team}</strong><p>Market</p><strong>{job.market}</strong></aside>
        <div className={styles.roleCopy}>
          <section><p className={styles.eyebrow}>About Gappy</p><h2>Build the work behind travel.</h2><p>{careerAbout}</p></section>
          <section><p className={styles.eyebrow}>Why this role matters</p><h2>Shape a product from real operations.</h2><p>{job.why}</p></section>
          <section><p className={styles.eyebrow}>What you’ll do</p><ul>{job.responsibilities.map((item) => <li key={item}><Check aria-hidden="true" size={18} />{item}</li>)}</ul></section>
          <section><p className={styles.eyebrow}>What we’re looking for</p><ul>{job.candidateProfile.map((item) => <li key={item}><Check aria-hidden="true" size={18} />{item}</li>)}</ul></section>
        </div>
      </div>
      <section className={styles.applicationSection} id="application" aria-labelledby="application-title"><div className={styles.applicationIntro}><p className={styles.eyebrow}>Apply</p><h2 id="application-title">Apply for {job.title}.</h2><p>Your role and market are preselected. A resume or CV is required.</p></div><ApplicationForm job={job} /></section>
    </div>
  )
}
