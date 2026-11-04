export const careerTeams = ['GTM Manager / Sales', 'Development Engineer'] as const
export const careerMarkets = ['Japan', 'South Korea', 'Taiwan', 'Singapore', 'Thailand'] as const

export type CareerTeam = (typeof careerTeams)[number]
export type CareerMarket = (typeof careerMarkets)[number]

type RoleCopy = {
  shortTeam: 'GTM' | 'Engineering'
  why: string
  responsibilities: readonly string[]
  candidateProfile: readonly string[]
}

export type CareerJob = {
  slug: string
  title: CareerTeam
  team: CareerTeam
  shortTeam: RoleCopy['shortTeam']
  market: CareerMarket
  why: string
  responsibilities: readonly string[]
  candidateProfile: readonly string[]
}

const roleCopy: Record<CareerTeam, RoleCopy> = {
  'GTM Manager / Sales': {
    shortTeam: 'GTM',
    why: 'This role connects real travel operations to the product. You will help identify work worth solving, validate it with customers, and turn what we learn into a repeatable go-to-market motion.',
    responsibilities: [
      'Build relationships with travel companies, DMCs, operators, experience businesses, and relevant partners in the target market.',
      'Run discovery conversations and identify operational workflows worth solving.',
      'Lead product demos, pilots, follow-ups, and commercial discussions.',
      'Build early pipeline and help create a repeatable local GTM motion.',
      'Translate customer needs and objections into product feedback.',
      'Work directly with the founder and product / engineering team.',
    ],
    candidateProfile: [
      'Experience in B2B sales, business development, partnerships, GTM, consulting, or customer-facing roles.',
      'Ability to understand operational workflows.',
      'Strong ownership.',
      'Strong written and verbal communication.',
      'Comfort working in an early-stage environment.',
      'Interest in travel and AI.',
    ],
  },
  'Development Engineer': {
    shortTeam: 'Engineering',
    why: 'This role turns customer workflows into reliable, reusable product capabilities. You will work across the system to make AI-powered operations visible, testable, and safe to use.',
    responsibilities: [
      'Build reliable AI-powered workflows for real travel operations.',
      'Turn customer workflows into reusable product capabilities rather than customer-specific scripts.',
      'Work across product UI, backend, APIs, integrations, execution state, evidence, approvals, and recovery.',
      'Build tests and safeguards for AI workflows.',
      'Work closely with GTM and customers to understand operational failure modes.',
      'Improve shared infrastructure as customer deployments expand.',
    ],
    candidateProfile: [
      'Strong software engineering fundamentals.',
      'Experience with backend, web applications, APIs, data systems, or developer tooling.',
      'Ability to learn unfamiliar systems quickly.',
      'Interest in AI agents, workflow automation, and reliability.',
      'Product sense and willingness to work directly from customer problems.',
      'Strong ownership.',
    ],
  },
}

function slugPart(value: string) {
  return value.toLowerCase().replace(/\s*\/\s*/g, '-').replace(/\s+/g, '-').replace(/[^a-z-]/g, '')
}

export const careerJobs: readonly CareerJob[] = careerTeams.flatMap((title) =>
  careerMarkets.map((market) => ({
    slug: `${slugPart(title)}-${slugPart(market)}`,
    title,
    team: title,
    market,
    ...roleCopy[title],
  })),
)

export function getCareerJob(slug: string) {
  return careerJobs.find((job) => job.slug === slug)
}

export const careerAbout = 'Gappy is building an AI workforce for the operational work behind travel. We work directly with travel businesses across Asia to turn real customer workflows into reliable product capabilities.'
