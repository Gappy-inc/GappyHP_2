'use client'

import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { careerJobs, careerMarkets, careerTeams } from '@/content/careers'
import styles from './Careers.module.css'

export default function JobExplorer() {
  const [team, setTeam] = useState('All teams')
  const [market, setMarket] = useState('All markets')
  const [query, setQuery] = useState('')
  const jobs = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return careerJobs.filter((job) =>
      (team === 'All teams' || job.team === team)
      && (market === 'All markets' || job.market === market)
      && (!needle || `${job.title} ${job.team} ${job.market}`.toLowerCase().includes(needle)),
    )
  }, [market, query, team])

  return (
    <div className={styles.jobExplorer}>
      <div className={styles.filters} aria-label="Filter open positions">
        <label><span className="sr-only">Team</span><select value={team} onChange={(event) => setTeam(event.target.value)}><option>All teams</option>{careerTeams.map((value) => <option key={value}>{value}</option>)}</select></label>
        <label><span className="sr-only">Market</span><select value={market} onChange={(event) => setMarket(event.target.value)}><option>All markets</option>{careerMarkets.map((value) => <option key={value}>{value}</option>)}</select></label>
        <label className={styles.search}><span className="sr-only">Search positions</span><Search aria-hidden="true" size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search positions" /></label>
      </div>
      <p className={styles.resultCount} role="status">{jobs.length} {jobs.length === 1 ? 'role' : 'roles'}</p>
      <div className={styles.jobs}>
        {jobs.map((job) => (
          <article className={styles.jobRow} key={job.slug}>
            <div><p className={styles.jobTeam}>{job.shortTeam}</p><h3>{job.title}</h3><p>{job.market}</p></div>
            <div className={styles.jobActions}>
              <Link href={`/careers/${job.slug}`} className={styles.viewRole}>View role <ArrowRight aria-hidden="true" size={17} /></Link>
              <Link href={`/careers/${job.slug}#application`} className={styles.applyButton} data-career-event="career_apply_click" data-role-slug={job.slug} data-team={job.team} data-market={job.market} data-cta-location="positions">Apply <ArrowRight aria-hidden="true" size={17} /></Link>
            </div>
          </article>
        ))}
        {!jobs.length ? <p className={styles.empty}>No roles match those filters. Try another team, market, or search.</p> : null}
      </div>
    </div>
  )
}
