import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Check,
  FileCheck2,
  Layers3,
  ListChecks,
  Mail,
  MessageSquare,
  Route,
  ShieldCheck,
  Users,
} from "lucide-react";
import { DEMO_URL, homeCopy, type HomeLocale } from "@/content/home-v2";
import { GOODTIME_URL } from "@/lib/config";
import { ProductWindow, ProofMoment } from "./ProductUI";
import {
  BookingSequence,
  ContextFlow,
  Recovery,
  Verification,
  Workflow,
} from "./HomeInteractions";
import "./home-v2.css";

type HeadingCopy = { eyebrow: string; title: readonly string[]; body: string };
function Heading({
  copy,
  hero = false,
}: {
  copy: HeadingCopy;
  hero?: boolean;
}) {
  const Tag = hero ? "h1" : "h2";
  return (
    <div className="hv-heading">
      <p className="hv-eyebrow">{copy.eyebrow}</p>
      <Tag>
        {copy.title.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </Tag>
      <p className="hv-lead">{copy.body}</p>
    </div>
  );
}
function Actions({ locale, final = false }: { locale: HomeLocale; final?: boolean }) {
  const c = homeCopy[locale];
  return (
    <div className="hv-actions">
      <div>
        <a className="hv-button" href={DEMO_URL} title={c.external}>
          {final ? c.finalDemo : c.demo}
          <ArrowRight size={18} />
        </a>
        <a className="hv-button hv-button-secondary" href={GOODTIME_URL}>
          {final ? c.finalSales : c.sales}
          <ArrowRight size={18} />
        </a>
      </div>
      <p className="hv-caption">{c.noSignup}</p>
    </div>
  );
}
export default function HomePageV2({ locale }: { locale: HomeLocale }) {
  const c = homeCopy[locale];
  const contextIcons = [
    ListChecks,
    Route,
    Mail,
    MessageSquare,
    CalendarDays,
    FileCheck2,
    Users,
    Users,
  ];
  return (
    <div className={`home-v2 hv-home hv-${locale}`}>
      <noscript>
        <style>
          {
            ".home-v2 .hv-workflow-desktop{display:none}.home-v2 .hv-workflow-fallback{display:block}.home-v2 .hv-workflow-mobile,.home-v2 .hv-recovery-desktop{display:none}.home-v2 .hv-recovery-mobile{display:block}"
          }
        </style>
        <p className="hv-container hv-caption">
          {locale === "ja"
            ? "操作にはJavaScriptが必要です。業務の流れと各状態は、このページでそのまま確認できます。"
            : "Interactive controls require JavaScript. The workflow and its states remain readable on this page."}
        </p>
      </noscript>
      <section className="hv-hero hv-container" aria-labelledby="home-hero">
        <div id="home-hero" className="hv-hero-copy">
          <Heading copy={c.hero} hero />
          <Actions locale={locale} />
        </div>
        <ProductWindow locale={locale} />
      </section>
      <section id="product-proof" className="hv-section hv-tint">
        <div className="hv-container">
          <Heading copy={c.product} />
          <BookingSequence locale={locale} />
        </div>
      </section>
      <section id="workflow" className="hv-section">
        <div className="hv-container">
          <Heading copy={c.workflow} />
          <Workflow locale={locale} />
        </div>
      </section>
      <section id="verification" className="hv-section">
        <div className="hv-container">
          <Heading copy={c.verification} />
          <Verification locale={locale} />
        </div>
      </section>
      <section id="recovery" className="hv-section hv-tint">
        <div className="hv-container">
          <Heading copy={c.recovery} />
          <Recovery locale={locale} />
        </div>
      </section>
      <section id="context" className="hv-section hv-dark hv-context">
        <div className="hv-container">
          <Heading copy={c.context} />
          <ContextFlow>
            <ul className="hv-context-inputs">
              {c.inputs.map((label, i) => {
                const Icon = contextIcons[i];
                return (
                  <li key={label}>
                    <Icon size={19} />
                    {label}
                  </li>
                );
              })}
            </ul>
            <div className="hv-context-core">
              <Layers3 size={29} />
              <strong>{c.contextCenter}</strong>
              <span>Gappy AI Workforce</span>
            </div>
            <ul className="hv-context-outputs">
              {c.outputs.map((label) => (
                <li key={label}>
                  <Check size={17} />
                  {label}
                </li>
              ))}
            </ul>
          </ContextFlow>
        </div>
      </section>
      <section id="architecture" className="hv-section hv-dark hv-architecture">
        <div className="hv-container hv-architecture-grid">
          <div>
            <Heading copy={c.architecture} />
            <Link
              className="hv-text-link"
              href={`${locale === "ja" ? "/ja" : ""}/technology`}
            >
              {c.techLink}
              <ArrowRight size={17} />
            </Link>
          </div>
          <div className="hv-controls">
            {c.controls.map((control, i) => (
              <div key={control[0]}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{control[0]}</h3>
                  <p>{control[1]}</p>
                </div>
                <ArrowRight size={20} />
              </div>
            ))}
            <p className="hv-caption">{c.principleNote}</p>
          </div>
        </div>
      </section>
      <section id="proof" className="hv-section">
        <div className="hv-container">
          <Heading copy={c.proof} />
          <div className="hv-proof-grid">
            {c.proofs.map((proof, i) => (
              <article key={proof[0]}>
                <span className="hv-proof-number">0{i + 1}</span>
                <h3>{proof[0]}</h3>
                <ProofMoment locale={locale} index={i} />
                <p>{proof[1]}</p>
                <a href={DEMO_URL} className="hv-text-link" title={c.external}>
                  {c.proofLink}
                  <ArrowRight size={17} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="hv-section hv-dark hv-final">
        <div className="hv-container">
          <ShieldCheck size={34} className="hv-final-icon" />
          <Heading copy={c.final} />
          <Actions locale={locale} final />
        </div>
      </section>
    </div>
  );
}
