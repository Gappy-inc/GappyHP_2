'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, ExternalLink, X } from 'lucide-react'
import BrandMark from '@/components/BrandMark'
import { GOODTIME_URL } from '@/lib/config'
import {
  leadLanguageHref,
  leadSelectOptions,
  type LeadLocale,
  type LeadRequestType,
} from '@/lib/lead-forms'
import styles from './LeadRequestPage.module.css'

type FormState = 'ready' | 'submitting' | 'success' | 'error'
type FieldErrors = Record<string, string>

const copy = {
  en: {
    close: 'Close and return home', switch: '日本語', eyebrow: 'GAPPY AI WORKFORCE',
    demo: {
      title: 'See what Gappy can do for your team.',
      intro: 'Tell us about one recurring confirmation task. We’ll review your request before you choose a meeting time.',
      submit: 'Send demo request', success: 'Your demo request has been received.',
      successBody: 'Choose a meeting time when you are ready. Your request is received, but a meeting is not booked yet.',
      next: 'Choose a meeting time',
    },
    brochure: {
      title: 'Request the Gappy overview.',
      intro: 'Share a little about your team. We’ll review the request and follow up manually with the appropriate material.',
      submit: 'Request the overview', success: 'Your request has been received.',
      successBody: 'Our team will review it and follow up. No file has been downloaded or sent automatically.', next: '',
    },
    labels: {
      fullName: 'Full name', workEmail: 'Work email', company: 'Company', companyType: 'Company type',
      companySize: 'Company size', workflow: 'Workflow to explore', message: 'What would you like to improve?',
      privacy: 'I agree that Gappy may use these details to respond to this request.', optional: 'Optional', choose: 'Choose one',
    },
    privacy: 'Read the privacy notice', required: 'Required', unavailable: 'Online requests are not connected in this environment.',
    unavailableDemo: 'The booking page appears only after a request has been safely received.', unavailableBrochure: 'Please contact us from the Gappy contact page.',
    fallbackBrochure: 'Go to contact page',
    invalid: 'Please review the required fields below.', server: 'We could not safely save your request. Please try again.',
    sending: 'Sending…', edit: 'Send another request', back: 'Back to Gappy', characters: 'Up to 1,000 characters',
  },
  ja: {
    close: '閉じてホームへ戻る', switch: 'English', eyebrow: 'GAPPY AI WORKFORCE',
    demo: {
      title: 'あなたの業務で、Gappyにできること。',
      intro: '繰り返し発生する確認業務を一つ教えてください。内容を確認後、ご都合のよい日時を選択できます。',
      submit: 'デモを依頼する', success: 'デモのご依頼を受け付けました。',
      successBody: '準備ができましたら日時を選択してください。依頼は受け付け済みですが、まだ予約は確定していません。',
      next: '日時を選択する',
    },
    brochure: {
      title: 'Gappyの概要資料をリクエスト。',
      intro: 'チームについて少し教えてください。内容を確認し、適切な資料を担当者から個別にご案内します。',
      submit: '資料をリクエスト', success: '資料のご依頼を受け付けました。',
      successBody: '担当者が内容を確認してご連絡します。ファイルの自動送信やダウンロードは行われていません。', next: '',
    },
    labels: {
      fullName: 'お名前', workEmail: '勤務先メールアドレス', company: '会社名', companyType: '会社種別',
      companySize: '会社規模', workflow: '検討したい業務', message: '改善したい業務について',
      privacy: 'この依頼への回答のため、Gappyが入力内容を利用することに同意します。', optional: '任意', choose: '選択してください',
    },
    privacy: 'プライバシーについて確認', required: '必須', unavailable: 'この環境ではオンライン受付が接続されていません。',
    unavailableDemo: '依頼が安全に受け付けられた後にだけ、予約ページを表示します。', unavailableBrochure: 'Gappyのお問い合わせページからご連絡ください。',
    fallbackBrochure: 'お問い合わせへ',
    invalid: '必須項目を確認してください。', server: '依頼を安全に保存できませんでした。時間をおいて再度お試しください。',
    sending: '送信中…', edit: '別の依頼を送る', back: 'Gappyへ戻る', characters: '1,000文字以内',
  },
} as const

function emitLeadEvent(name: 'lead_form_view' | 'form_start' | 'generate_lead' | 'lead_form_error' | 'booking_link_click', requestType: LeadRequestType, errorCode?: string) {
  window.dispatchEvent(new CustomEvent('gappy:analytics-event', {
    detail: { name, parameters: { form_type: requestType, ...(errorCode ? { error_code: errorCode } : {}) } },
  }))
}

export default function LeadRequestPage({ locale, requestType }: { locale: LeadLocale; requestType: LeadRequestType }) {
  const c = copy[locale]
  const requestCopy = c[requestType]
  const options = leadSelectOptions[locale]
  const home = locale === 'ja' ? '/ja/' : '/'
  const privacy = locale === 'ja' ? '/ja/privacy' : '/privacy'
  const brochureFallback = `${locale === 'ja' ? '/ja' : ''}/contact`
  const [available, setAvailable] = useState<boolean | null>(null)
  const [state, setState] = useState<FormState>('ready')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [message, setMessage] = useState('')
  const summaryRef = useRef<HTMLDivElement>(null)
  const started = useRef(false)
  const submission = useRef<{ signature: string; key: string } | null>(null)
  const trackedSuccess = useRef(new Set<string>())

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/lead-requests', { cache: 'no-store', signal: controller.signal })
      .then((response) => response.json())
      .then((result) => setAvailable(result.available === true))
      .catch(() => setAvailable(false))
    return () => controller.abort()
  }, [requestType])

  const onStart = () => {
    if (!started.current) {
      started.current = true
      emitLeadEvent('form_start', requestType)
    }
  }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (state === 'submitting' || available !== true) return
    const form = event.currentTarget
    const data = new FormData(form)
    const nextErrors: FieldErrors = {}
    for (const name of ['fullName', 'workEmail', 'company', 'privacyAccepted']) {
      const field = form.elements.namedItem(name) as HTMLInputElement | null
      if (!field?.validity.valid) nextErrors[name] = c.required
    }
    if (!form.checkValidity() || Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      setMessage(c.invalid)
      setState('error')
      emitLeadEvent('lead_form_error', requestType, 'validation')
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    const payload = {
      requestType, locale,
      fullName: String(data.get('fullName') || ''), workEmail: String(data.get('workEmail') || ''),
      company: String(data.get('company') || ''), companyType: String(data.get('companyType') || ''),
      companySize: String(data.get('companySize') || ''), workflow: String(data.get('workflow') || ''),
      message: String(data.get('message') || ''), privacyAccepted: data.get('privacyAccepted') === 'on',
      website: String(data.get('website') || ''),
    }
    const signature = JSON.stringify(payload)
    if (!submission.current || submission.current.signature !== signature) {
      submission.current = { signature, key: crypto.randomUUID() }
    }
    const key = submission.current.key
    setState('submitting')
    setErrors({})
    setMessage('')
    try {
      const response = await fetch('/api/lead-requests', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, idempotencyKey: key }),
      })
      const result = await response.json().catch(() => null) as { status?: string; message?: string } | null
      if (response.status === 202 && result?.status === 'accepted') {
        setState('success')
        if (!trackedSuccess.current.has(key)) {
          trackedSuccess.current.add(key)
          emitLeadEvent('generate_lead', requestType)
        }
        return
      }
      setMessage(result?.message || c.server)
      setState('error')
      emitLeadEvent('lead_form_error', requestType, result?.status || 'server')
      requestAnimationFrame(() => summaryRef.current?.focus())
    } catch {
      setMessage(c.server)
      setState('error')
      emitLeadEvent('lead_form_error', requestType, 'network')
      requestAnimationFrame(() => summaryRef.current?.focus())
    }
  }

  return (
    <main id="main-content" className={styles.page} data-locale={locale}>
      <section className={styles.brandPanel} aria-label="Gappy">
        <Image src="/hero/gappy-ai-workforce-hero-poster.jpg" alt="" fill priority sizes="(max-width: 899px) 100vw, 46vw" />
        <div className={styles.brandShade} />
        <div className={styles.brandHeader}><BrandMark inverse href={home} /></div>
        <div className={styles.brandCopy}><p>{c.eyebrow}</p><h1>{requestCopy.title}</h1><span>{requestCopy.intro}</span></div>
      </section>

      <section className={styles.formPanel} aria-label={requestCopy.title}>
        <div className={styles.actions}>
          <Link href={leadLanguageHref(locale === 'en' ? 'ja' : 'en', requestType)}>{c.switch}</Link>
          <Link href={home} aria-label={c.close}><X size={21} /><span>{c.close}</span></Link>
        </div>

        <div className={styles.formInner}>
          <Link className={styles.back} href={home}><ArrowLeft size={17} />{c.back}</Link>
          <div className={styles.mobileIntro}><p>{c.eyebrow}</p><h1>{requestCopy.title}</h1><span>{requestCopy.intro}</span></div>

          {state === 'success' ? (
            <div className={styles.success} role="status">
              <span className={styles.successIcon}><Check size={30} /></span>
              <h2>{requestCopy.success}</h2>
              <p>{requestCopy.successBody}</p>
              {requestType === 'demo' && (
                <a href={GOODTIME_URL} target="_blank" rel="noopener noreferrer" onClick={() => emitLeadEvent('booking_link_click', requestType)}>
                  {requestCopy.next}<ExternalLink size={18} />
                </a>
              )}
              <button type="button" onClick={() => { setState('ready'); setMessage(''); submission.current = null }}>{c.edit}</button>
            </div>
          ) : (
            <form noValidate onSubmit={submit} onInput={onStart}>
              {message && <div ref={summaryRef} tabIndex={-1} className={styles.errorSummary} role="alert"><strong>{message}</strong></div>}
              {available === false && (
                <div className={styles.unavailable} role="status">
                  <strong>{c.unavailable}</strong>
                  <p>{requestType === 'demo' ? c.unavailableDemo : c.unavailableBrochure}</p>
                  {requestType === 'brochure' && <a href={brochureFallback}>{c.fallbackBrochure}<ArrowRight size={17} /></a>}
                </div>
              )}
              <div className={styles.fields}>
                <Field name="fullName" label={c.labels.fullName} required error={errors.fullName}><input id="fullName" name="fullName" autoComplete="name" required aria-invalid={errors.fullName ? true : undefined} aria-describedby={errors.fullName ? 'fullName-error' : undefined} /></Field>
                <Field name="workEmail" label={c.labels.workEmail} required error={errors.workEmail}><input id="workEmail" name="workEmail" type="email" inputMode="email" autoComplete="email" required aria-invalid={errors.workEmail ? true : undefined} aria-describedby={errors.workEmail ? 'workEmail-error' : undefined} /></Field>
                <Field name="company" label={c.labels.company} required error={errors.company}><input id="company" name="company" autoComplete="organization" required aria-invalid={errors.company ? true : undefined} aria-describedby={errors.company ? 'company-error' : undefined} /></Field>
                <Field name="companyType" label={c.labels.companyType} optional={c.labels.optional}><select id="companyType" name="companyType" defaultValue=""><option value="">{c.labels.choose}</option>{options.companyType.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></Field>
                <Field name="companySize" label={c.labels.companySize} optional={c.labels.optional}><select id="companySize" name="companySize" defaultValue=""><option value="">{c.labels.choose}</option>{options.companySize.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></Field>
                <Field name="workflow" label={c.labels.workflow} optional={c.labels.optional}><select id="workflow" name="workflow" defaultValue=""><option value="">{c.labels.choose}</option>{options.workflow.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></Field>
                <Field name="message" label={c.labels.message} optional={c.characters} wide><textarea id="message" name="message" maxLength={1000} rows={5} /></Field>
              </div>
              <div className={styles.honeypot} aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
              <label className={styles.privacyCheck} data-error={errors.privacyAccepted ? 'true' : undefined}>
                <input name="privacyAccepted" type="checkbox" required aria-invalid={errors.privacyAccepted ? true : undefined} /><span>{c.labels.privacy} <Link href={privacy}>{c.privacy}</Link></span>
              </label>
              <button className={styles.submit} type="submit" disabled={state === 'submitting' || available !== true}>
                {state === 'submitting' ? c.sending : requestCopy.submit}<ArrowRight size={19} />
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}

function Field({ name, label, required, optional, error, wide, children }: {
  name: string; label: string; required?: boolean; optional?: string; error?: string; wide?: boolean; children: React.ReactNode
}) {
  return <div className={`${styles.field}${wide ? ` ${styles.wide}` : ''}`} data-error={error ? 'true' : undefined}>
    <label htmlFor={name}>{label} <span>{required ? '*' : optional}</span></label>
    {children}
    {error && <p id={`${name}-error`}>{error}</p>}
  </div>
}
