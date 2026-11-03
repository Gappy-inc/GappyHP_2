import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DEMO_URL, homeCopy, type HomeLocale } from "@/content/home-v2";
import { ProofMoment } from "./ProductUI";
import { Recovery, Verification } from "./HomeInteractions";
import GappyIntegrationOrbit from "./orbit/GappyIntegrationOrbit";
import orbitStyles from "./orbit/OrbitSection.module.css";
import CinematicHero from "./CinematicHero";
import GappyWorkforceShowcase from "./GappyWorkforceShowcase";
import ProductFamilyCards from "@/components/product-family/ProductFamilyCards";
import UseCasesCarousel from "./UseCasesCarousel";
import EnglishClosingCta from "./EnglishClosingCta";
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
export default function HomePageV2({ locale }: { locale: HomeLocale }) {
  const c = homeCopy[locale];
  return (
    <div className={`home-v2 hv-home hv-${locale}`}>
      <noscript>
        <style>
          {
            ".home-v2 .hv-recovery-desktop{display:none}.home-v2 .hv-recovery-mobile{display:block}"
          }
        </style>
        <p className="hv-container hv-caption">
          {locale === "ja"
            ? "操作にはJavaScriptが必要です。業務の流れと各状態は、このページでそのまま確認できます。"
            : "Interactive controls require JavaScript. The page content and its states remain readable."}
        </p>
      </noscript>
      <CinematicHero locale={locale} />
      <GappyWorkforceShowcase locale={locale} />
      <ProductFamilyCards locale={locale} />
      <UseCasesCarousel locale={locale} />
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
          <div className={orbitStyles.section}>
            <Heading copy={locale === "en" ? {
              eyebrow: "Operational context",
              title: ["Your tools.", "One coordinated workforce."],
              body: "Start with one workflow across the tools your team already uses. Connection methods and scope are agreed with your team.",
            } : c.context} />
            <GappyIntegrationOrbit locale={locale} pauseOnHover={false} />
          </div>
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
      <EnglishClosingCta locale={locale} />
    </div>
  );
}
