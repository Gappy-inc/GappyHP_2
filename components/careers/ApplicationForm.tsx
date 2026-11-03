'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText } from 'lucide-react'
import { FormEvent, useEffect, useRef, useState } from 'react'
import type { CareerJob } from '@/content/careers'
import styles from './Careers.module.css'

type Availability = 'checking' | 'available' | 'unavailable'
type Submission = 'idle' | 'sending' | 'success' | 'error'

function emit(name: string, job: CareerJob, ctaLocation = 'application') {
  window.dispatchEvent(new CustomEvent('gappy:analytics-event', { detail: { name, parameters: { role_slug: job.slug, team: job.team, market: job.market, page_language: 'en', cta_location: ctaLocation } } }))
}

export default function ApplicationForm({ job }: { job: CareerJob }) {
  const [availability, setAvailability] = useState<Availability>('checking')
  const [submission, setSubmission] = useState<Submission>('idle')
  const [message, setMessage] = useState('')
  const started = useRef(false)
  const idempotencyKey = useRef('')

  useEffect(() => {
    let active = true
    fetch('/api/careers/applications', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : null)
      .then((result: { available?: boolean } | null) => { if (active) setAvailability(result?.available ? 'available' : 'unavailable') })
      .catch(() => { if (active) setAvailability('unavailable') })
    return () => { active = false }
  }, [])

  function markStarted() {
    if (started.current) return
    started.current = true
    emit('career_application_start', job)
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submission === 'sending' || availability !== 'available') return
    const form = event.currentTarget
    if (!form.reportValidity()) return
    setSubmission('sending')
    setMessage('')
    if (!idempotencyKey.current) idempotencyKey.current = crypto.randomUUID()
    const data = new FormData(form)
    data.set('idempotencyKey', idempotencyKey.current)
    emit('career_application_submit', job)
    try {
      const response = await fetch('/api/careers/applications', { method: 'POST', body: data, headers: { 'Idempotency-Key': idempotencyKey.current } })
      const result = await response.json().catch(() => null) as { status?: string; message?: string } | null
      if (!response.ok || result?.status !== 'accepted') throw new Error(result?.message || 'We could not safely receive your application. Please try again.')
      setSubmission('success')
      emit('career_application_success', job)
      form.reset()
      idempotencyKey.current = ''
    } catch (error) {
      setSubmission('error')
      setMessage(error instanceof Error ? error.message : 'We could not safely receive your application. Please try again.')
      emit('career_application_error', job)
    }
  }

  if (submission === 'success') return <div className={styles.applicationSuccess} role="status"><CheckCircle2 aria-hidden="true" /><p className={styles.eyebrow}>Application received</p><h2>Thank you for applying.</h2><p>Your application, resume, and notification were received successfully. The Gappy team will review your details.</p><Link href="/careers#open-positions">View other roles <ArrowRight aria-hidden="true" size={18} /></Link></div>

  return (
    <form className={styles.applicationForm} onSubmit={submit} onFocus={markStarted} noValidate={false}>
      {availability === 'unavailable' ? <div className={styles.applicationNotice} role="status"><strong>Applications are not connected in this environment.</strong><p>The form is shown for local review, but no application or file can be sent until the approved private receiver and notification service are configured.</p></div> : null}
      {submission === 'error' ? <div className={styles.applicationError} role="alert"><strong>Application not sent.</strong><p>{message}</p></div> : null}
      <input type="hidden" name="roleSlug" value={job.slug} /><input className={styles.honeypot} tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" />
      <div className={styles.formGrid}>
        <label><span className={styles.fieldLabel}>First name <b aria-hidden="true">*</b></span><input name="firstName" required maxLength={80} autoComplete="given-name" /></label>
        <label><span className={styles.fieldLabel}>Last name <b aria-hidden="true">*</b></span><input name="lastName" required maxLength={80} autoComplete="family-name" /></label>
        <label><span className={styles.fieldLabel}>Email <b aria-hidden="true">*</b></span><input name="email" required maxLength={254} type="email" autoComplete="email" /></label>
        <label><span className={styles.fieldLabel}>Current location / timezone <b aria-hidden="true">*</b></span><input name="location" required maxLength={160} autoComplete="country-name" placeholder="e.g. Seoul / UTC+9" /></label>
        <label><span className={styles.fieldLabel}>Role</span><input name="role" readOnly value={job.title} /></label>
        <label><span className={styles.fieldLabel}>Market</span><input name="market" readOnly value={job.market} /></label>
        <label><span className={styles.fieldLabel}>LinkedIn URL <em>Optional</em></span><input name="linkedin" maxLength={500} type="url" inputMode="url" placeholder="https://" /></label>
        <label><span className={styles.fieldLabel}>GitHub / Portfolio URL <em>Optional</em></span><input name="github" maxLength={500} type="url" inputMode="url" placeholder="https://" /></label>
      </div>
      <label className={styles.resumeField}><span className={styles.fieldLabel}>Resume / CV <b aria-hidden="true">*</b></span><span className={styles.fileInput}><FileText aria-hidden="true" size={22} />Choose a PDF, DOC, or DOCX file (maximum 10 MB)<input name="resume" required type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(event) => {
        const input = event.currentTarget
        const file = input.files?.[0]
        if (!file) { input.setCustomValidity('Choose a resume or CV.'); return }
        const extension = file.name.toLowerCase().match(/\.(pdf|docx?)$/)?.[1]
        const expectedType = extension === 'pdf' ? 'application/pdf' : extension === 'doc' ? 'application/msword' : extension === 'docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : ''
        input.setCustomValidity(file.size > 0 && file.size <= 10 * 1024 * 1024 && file.type === expectedType ? '' : 'Choose a PDF, DOC, or DOCX file no larger than 10 MB.')
        input.reportValidity()
        if (!input.validationMessage) emit('career_resume_selected', job)
      }} /></span></label>
      <label className={styles.messageField}><span className={styles.fieldLabel}>Short message / Why Gappy <em>Optional</em></span><textarea name="message" maxLength={2000} rows={6} /></label>
      <label className={styles.consent}><input name="privacyAccepted" value="true" required type="checkbox" /><span>I agree to the Gappy <Link href="/privacy">Privacy Policy</Link> and consent to the use of my information for recruitment purposes.</span></label>
      <p className={styles.formPurpose}>Application information is used only for recruitment and is not added to a marketing list.</p>
      <button className={styles.submitApplication} disabled={availability !== 'available' || submission === 'sending'} type="submit">{submission === 'sending' ? 'Sending application…' : availability === 'checking' ? 'Checking application service…' : 'Send application'} <ArrowRight aria-hidden="true" size={19} /></button>
    </form>
  )
}
