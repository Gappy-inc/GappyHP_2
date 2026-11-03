import { ArrowRight } from "lucide-react";
import type { HomeLocale } from "@/content/home-v2";
import { brochureRequestHref, demoRequestHref, leadFormsPublicEnabled } from "@/lib/lead-forms";
import styles from "./EnglishHomeEnd.module.css";

const closingCopy = {
  en: {
    title: "See what Gappy can do for your team.",
    body: "Explore Gappy AI Workforce with your team’s workflow in mind. Start with one recurring confirmation task.",
    cta: "Book a demo",
    brochure: "Request an overview",
  },
  ja: {
    title: "あなたの業務で、Gappyにできること。",
    body: "チームの業務に合わせて、Gappyの活用方法をご紹介します。まずは、繰り返し発生する一つの確認業務から。",
    cta: "デモを予約",
    brochure: "概要資料をリクエスト",
  },
} as const;

export default function EnglishClosingCta({ locale }: { locale: HomeLocale }) {
  const copy = closingCopy[locale];
  const demoHref = demoRequestHref(locale);
  return (
    <section
      className={`hv-final ${styles.closing}`}
      aria-labelledby="home-closing-title"
      data-locale={locale}
    >
      <div className={styles.closingInner}>
        <h2 id="home-closing-title">{copy.title}</h2>
        <p>{copy.body}</p>
        <a className={styles.closingCta} href={demoHref}>
          {copy.cta}
          <ArrowRight size={20} aria-hidden="true" />
        </a>
        {leadFormsPublicEnabled && <a className={styles.closingSecondary} href={brochureRequestHref(locale)}>{copy.brochure}</a>}
      </div>
    </section>
  );
}
