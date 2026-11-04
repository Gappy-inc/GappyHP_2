'use client'

import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Locale } from '@/content'
import { careerJobs, careerMarketLabels, careerMarkets, careerTeamLabels, careerTeams } from '@/content/careers'
import styles from './Careers.module.css'

const explorerCopy = {
  en: {
    filters: 'Filter open positions',
    team: 'Team',
    market: 'Market',
    allTeams: 'All teams',
    allMarkets: 'All markets',
    search: 'Search positions',
    role: 'role',
    roles: 'roles',
    view: 'View role',
    apply: 'Apply',
    empty: 'No roles match those filters. Try another team, market, or search.',
    engineering: 'Engineering',
  },
  ja: {
    filters: '募集職種を絞り込む',
    team: 'チーム',
    market: '地域',
    allTeams: 'すべてのチーム',
    allMarkets: 'すべての地域',
    search: '募集職種を検索',
    role: '件',
    roles: '件',
    view: '詳細を見る（英語）',
    apply: '応募する（英語）',
    empty: '条件に一致する募集職種がありません。チーム、地域、検索語を変更してください。',
    engineering: 'エンジニアリング',
  },
} as const

export default function JobExplorer({ locale = 'en' }: { locale?: Locale }) {
  const [team, setTeam] = useState('all')
  const [market, setMarket] = useState('all')
  const [query, setQuery] = useState('')
  const copy = explorerCopy[locale]
  const marketLabels = careerMarketLabels[locale]
  const teamLabels = careerTeamLabels[locale]
  const jobs = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return careerJobs.filter((job) => (team === 'all' || job.team === team) && (market === 'all' || job.market === market) && (!needle || `${job.title} ${job.team} ${teamLabels[job.team]} ${job.market} ${marketLabels[job.market]}`.toLowerCase().includes(needle)))
  }, [market, marketLabels, query, team, teamLabels])

  return (
    <div className={styles.jobExplorer}>
      <div className={styles.filters} aria-label={copy.filters}>
        <label>
          <span className="sr-only">{copy.team}</span>
          <select value={team} onChange={(event) => setTeam(event.target.value)}>
            <option value="all">{copy.allTeams}</option>
            {careerTeams.map((value) => (
              <option key={value} value={value}>
                {teamLabels[value]}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">{copy.market}</span>
          <select value={market} onChange={(event) => setMarket(event.target.value)}>
            <option value="all">{copy.allMarkets}</option>
            {careerMarkets.map((value) => (
              <option key={value} value={value}>
                {marketLabels[value]}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.search}>
          <span className="sr-only">{copy.search}</span>
          <Search aria-hidden="true" size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder={copy.search} />
        </label>
      </div>
      <p className={styles.resultCount} role="status">
        {jobs.length} {jobs.length === 1 ? copy.role : copy.roles}
      </p>
      <div className={styles.jobs}>
        {jobs.map((job) => (
          <article className={styles.jobRow} key={job.slug}>
            <div>
              <p className={styles.jobTeam}>{job.shortTeam === 'Engineering' ? copy.engineering : job.shortTeam}</p>
              <h3>{teamLabels[job.team]}</h3>
              <p>{marketLabels[job.market]}</p>
            </div>
            <div className={styles.jobActions}>
              <Link href={`/careers/${job.slug}`} hrefLang="en" className={styles.viewRole}>
                {copy.view} <ArrowRight aria-hidden="true" size={17} />
              </Link>
              <Link href={`/careers/${job.slug}#application`} hrefLang="en" className={styles.applyButton} data-career-event="career_apply_click" data-role-slug={job.slug} data-team={job.team} data-market={job.market} data-cta-location="positions">
                {copy.apply} <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </div>
          </article>
        ))}
        {!jobs.length ? <p className={styles.empty}>{copy.empty}</p> : null}
      </div>
    </div>
  )
}
