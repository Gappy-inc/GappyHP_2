import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Travel Demo Shared Preview Privacy Notice | Gappy',
  robots: {
    index: false,
    follow: false,
  },
}

export default function TravelPreviewPrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] px-6 py-20 text-[#102f27] sm:px-10">
      <article className="mx-auto max-w-3xl rounded-3xl border border-[#102f27]/15 bg-white p-8 shadow-[0_24px_80px_rgba(16,47,39,0.08)] sm:p-12">
        <p className="mb-5 inline-flex rounded-full bg-[#e8f56b] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]">
          Shared Preview only
        </p>
        <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
          Travel demo test privacy notice
        </h1>
        <p className="mt-6 text-base leading-7 text-[#33544c]">
          This protected Preview is for synthetic testing only. Do not enter a
          real person&apos;s name, email address, booking details, or other
          personal information. Test email addresses must use the{' '}
          <code className="rounded bg-[#102f27]/5 px-1.5 py-0.5">
            example.test
          </code>{' '}
          domain.
        </p>

        <section className="mt-10 border-t border-[#102f27]/10 pt-8">
          <h2 className="text-xl font-semibold">What the Preview stores</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-[#33544c]">
            <li>
              Synthetic work email and demo-entry location submitted to test
              requested video access. No newsletter consent is requested or
              implied, and no outbound email is sent in this Preview.
            </li>
            <li>
              Operational test data needed for reliable processing, including
              a generated lead reference, idempotency key, payload fingerprint,
              email hash, timestamps, and rate-limit counters.
            </li>
            <li>
              Allowlisted analytics events for page view, demo start, video
              progress or completion, lead-capture success, and booking-CTA
              click, together with a pseudonymous session hash and limited
              page context. Raw email, booking data, tokens, and arbitrary URL
              values are not accepted as analytics fields.
            </li>
          </ul>
        </section>

        <section className="mt-10 border-t border-[#102f27]/10 pt-8">
          <h2 className="text-xl font-semibold">Use, retention, and deletion</h2>
          <p className="mt-4 leading-7 text-[#33544c]">
            The records are used only to validate this Shared Preview flow in a
            dedicated marketing test database. Synthetic lead records and test
            analytics are removed as part of the validation procedure. A
            separate, human-approved retention period, deletion process, access
            ownership, and public privacy notice are still required before any
            Production collection can be enabled.
          </p>
        </section>

        <section className="mt-10 rounded-2xl bg-[#102f27] p-6 text-white">
          <h2 className="text-lg font-semibold">Not a Production notice</h2>
          <p className="mt-2 leading-7 text-white/75">
            This notice applies only to the protected Shared Preview and does
            not authorize collection of real prospects or Production use.
          </p>
        </section>
      </article>
    </main>
  )
}
