export type LeadLocale = 'en' | 'ja'
export type LeadRequestType = 'demo' | 'brochure'

export const LEAD_FORM_PATHS = {
  en: { demo: '/request-demo', brochure: '/request-brochure' },
  ja: { demo: '/ja/request-demo', brochure: '/ja/request-brochure' },
} as const

export const COMPANY_TYPES = ['travel-agency', 'tour-operator', 'hotel', 'technology', 'other'] as const
export const COMPANY_SIZES = ['1-10', '11-50', '51-200', '201-500', '501+'] as const
export const WORKFLOWS = ['confirmations', 'changes', 'evidence', 'approvals', 'other'] as const

export const leadFormsPublicEnabled =
  process.env.NEXT_PUBLIC_LEAD_FORMS_PUBLIC_ENABLED === 'true'

export function demoRequestHref(locale: LeadLocale) {
  return LEAD_FORM_PATHS[locale].demo
}

export function brochureRequestHref(locale: LeadLocale) {
  return LEAD_FORM_PATHS[locale].brochure
}

export function leadLanguageHref(locale: LeadLocale, type: LeadRequestType) {
  return LEAD_FORM_PATHS[locale][type]
}

export const leadSelectOptions = {
  en: {
    companyType: [
      ['travel-agency', 'Travel agency'], ['tour-operator', 'Tour operator'],
      ['hotel', 'Hotel / accommodation'], ['technology', 'Technology provider'], ['other', 'Other'],
    ],
    companySize: [
      ['1-10', '1–10'], ['11-50', '11–50'], ['51-200', '51–200'],
      ['201-500', '201–500'], ['501+', '501+'],
    ],
    workflow: [
      ['confirmations', 'Supplier confirmations'], ['changes', 'Change monitoring'],
      ['evidence', 'Evidence collection'], ['approvals', 'Human approvals'], ['other', 'Other'],
    ],
  },
  ja: {
    companyType: [
      ['travel-agency', '旅行会社'], ['tour-operator', 'ツアーオペレーター'],
      ['hotel', '宿泊施設'], ['technology', 'テクノロジー事業者'], ['other', 'その他'],
    ],
    companySize: [
      ['1-10', '1〜10名'], ['11-50', '11〜50名'], ['51-200', '51〜200名'],
      ['201-500', '201〜500名'], ['501+', '501名以上'],
    ],
    workflow: [
      ['confirmations', 'サプライヤーへの確認'], ['changes', '変更の監視'],
      ['evidence', '根拠の収集'], ['approvals', '人による承認'], ['other', 'その他'],
    ],
  },
} as const
