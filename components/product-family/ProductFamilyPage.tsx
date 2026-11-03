import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Check,
  FileCheck2,
  ListChecks,
  ShieldCheck,
} from "lucide-react";
import {
  productById,
  productFamily,
  productFamilyCopy,
  syntheticWorkItem,
  type ProductDefinition,
} from "@/content/product-family";
import { demoRequestHref } from "@/lib/lead-forms";
import ProductFamilyReveal from "./ProductFamilyReveal";
import styles from "./ProductFamily.module.css";

const layerIcons = [ArrowUpRight, ListChecks, ShieldCheck, FileCheck2] as const;

function SecondaryCta({ product }: { product: ProductDefinition }) {
  const cta = product.secondaryCta;
  const href =
    "targetProductId" in cta
      ? productById[cta.targetProductId].path
      : `#${cta.targetAnchor}`;
  return (
    <Link href={href} className={styles.secondaryCta}>
      {cta.label}
      <ArrowUpRight size={18} aria-hidden="true" />
    </Link>
  );
}

function HeroNotice({ productId }: { productId: ProductDefinition["id"] }) {
  const notices = {
    "ai-workforce": {
      title: "One connected operational record",
      body: "Changes · evidence · decisions",
      tone: "ready",
    },
    "verified-work": {
      title: "Reconfirmation required",
      body: "Latest condition is not yet verified",
      tone: "pending",
    },
    "change-monitor": {
      title: "New condition, fresh confirmation",
      body: "Revision 3 → 4 · Review required",
      tone: "pending",
    },
    "evidence-approval": {
      title: "Human control, at the right moment",
      body: "Completion is blocked while evidence is missing",
      tone: "pending",
    },
  } as const;
  const notice = notices[productId];
  return (
    <div className={styles.heroNotice} data-tone={notice.tone}>
      <span aria-hidden="true">
        {notice.tone === "ready" ? <Check size={18} /> : <AlertTriangle size={18} />}
      </span>
      <div>
        <strong>{notice.title}</strong>
        <p>{notice.body}</p>
      </div>
    </div>
  );
}

function PlatformExample({ product }: { product: ProductDefinition }) {
  return (
    <div className={styles.layerGrid}>
      {product.layers?.map((layer, index) => {
        const Icon = layerIcons[index];
        return (
          <article key={layer.title} data-reveal-item style={{ "--reveal-index": index } as React.CSSProperties}>
            <span className={styles.layerNumber}>0{index + 1}</span>
            <span className={styles.layerIcon} aria-hidden="true"><Icon size={23} /></span>
            <h3>{layer.title}</h3>
            <p>{layer.description}</p>
          </article>
        );
      })}
    </div>
  );
}

function ConditionComparison({ label }: { label: string }) {
  const item = syntheticWorkItem;
  return (
    <div className={styles.conditionComparison}>
      <div>
        <span>Previously confirmed · rev {item.previousSupplierAcceptance.revision}</span>
        <strong>{item.previousSupplierAcceptance.pickupTime} pickup</strong>
        <em>{item.previousSupplierAcceptance.state}</em>
      </div>
      <ArrowRight size={21} aria-hidden="true" />
      <div>
        <span>Latest request · rev {item.latestRequest.revision}</span>
        <strong>{item.latestRequest.pickupTime} pickup</strong>
        <em>{label}</em>
      </div>
    </div>
  );
}

function VerifiedWorkExample() {
  const item = syntheticWorkItem;
  const checks = [
    ["Updated itinerary received", "Received", "received"],
    [item.currentSupplierConfirmation.label, item.currentSupplierConfirmation.state, "pending"],
    ["Review current evidence", item.evidenceReview.state, "review"],
    ["Completion approval", item.completionApproval.state, "blocked"],
  ] as const;
  return (
    <div className={styles.demoShell}>
      <div className={styles.demoColumn}>
        <div className={styles.demoTopline}>
          <span>{item.name} / {item.id}</span>
          <span className={styles.badge} data-tone="pending">Reconfirmation required</span>
        </div>
        <h3>Latest conditions</h3>
        <ConditionComparison label="Not confirmed" />
        <div className={styles.pendingNote}>
          <AlertTriangle size={18} aria-hidden="true" />
          <div><strong>Supplier reconfirmation pending</strong><p>Previous acceptance does not validate the new time.</p></div>
        </div>
      </div>
      <div className={styles.demoColumn}>
        <h3>Evidence & human control</h3>
        <ul className={styles.checkList}>
          {checks.map(([title, state, tone]) => (
            <li key={title}>
              <span className={styles.checkIcon} data-tone={tone} aria-hidden="true">
                {tone === "received" ? <Check size={17} /> : <AlertTriangle size={17} />}
              </span>
              <strong>{title}</strong>
              <span className={styles.status} data-tone={tone}>{state}</span>
            </li>
          ))}
        </ul>
        <p className={styles.blockReason}>{item.completionApproval.reason}</p>
      </div>
    </div>
  );
}

function ChangeMonitorExample() {
  const item = syntheticWorkItem;
  return (
    <div className={styles.demoShell}>
      <div className={styles.demoColumn}>
        <div className={styles.demoTopline}>
          <span>Monitor example / {item.id}</span>
          <span className={styles.badge} data-tone="pending">Change detected</span>
        </div>
        <h3>Pickup time changed</h3>
        <ConditionComparison label="Fresh confirmation required" />
        <p className={styles.sourceLine}>Source: {item.latestRequest.source} · Received {item.latestRequest.receivedAt}</p>
      </div>
      <div className={styles.demoColumn}>
        <h3>Change log</h3>
        <ol className={styles.changeLog}>
          <li><time>09:14</time><span>New revision received</span></li>
          <li><time>09:14</time><span>Pickup 08:30 → 09:15</span></li>
          <li><time>09:14</time><span>Earlier acceptance superseded</span></li>
          <li data-open><time>Open</time><span>Fresh supplier confirmation</span></li>
        </ol>
        <p className={styles.incompleteRule}>Unavailable sources are shown as “Check incomplete” — never “No changes”.</p>
      </div>
    </div>
  );
}

function EvidenceApprovalExample() {
  const item = syntheticWorkItem;
  const evidence = [
    ["Itinerary · revision 4", `Latest requested pickup: ${item.latestRequest.pickupTime}`, "Received", "received"],
    ["Supplier acceptance · revision 3", `Earlier pickup: ${item.previousSupplierAcceptance.pickupTime}`, "Superseded", "superseded"],
    ["Supplier confirmation · revision 4", "Required to verify the current conditions", "Missing", "pending"],
    ["Evidence review · revision 4", "Contents require human review", item.evidenceReview.state, "review"],
  ] as const;
  return (
    <div className={`${styles.demoShell} ${styles.evidenceShell}`}>
      <div className={styles.demoColumn}>
        <h3>Evidence for {item.id}</h3>
        <ul className={styles.evidenceList}>
          {evidence.map(([title, body, state, tone]) => (
            <li key={title}>
              <span className={styles.checkIcon} data-tone={tone} aria-hidden="true">
                {tone === "received" ? <Check size={17} /> : <AlertTriangle size={17} />}
              </span>
              <div><strong>{title}</strong><p>{body}</p></div>
              <span className={styles.status} data-tone={tone}>{state}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.demoColumn}>
        <div className={styles.demoTopline}>
          <h3>Completion approval</h3>
          <span className={styles.badge} data-tone="blocked">Blocked</span>
        </div>
        <p className={styles.reviewing}>Reviewing revision {item.latestRequest.revision} · {item.latestRequest.pickupTime} pickup</p>
        <div className={styles.pendingNote}>
          <AlertTriangle size={18} aria-hidden="true" />
          <div><strong>Required supplier confirmation is missing.</strong><p>The earlier approval cannot validate this revision.</p></div>
        </div>
        <button type="button" disabled className={styles.blockedButton}>
          Completion approval unavailable
        </button>
        <p className={styles.separateDecision}>Approval to send a follow-up is a separate decision.</p>
      </div>
    </div>
  );
}

function ProductExample({ product }: { product: ProductDefinition }) {
  if (product.id === "ai-workforce") return <PlatformExample product={product} />;
  if (product.id === "verified-work") return <VerifiedWorkExample />;
  if (product.id === "change-monitor") return <ChangeMonitorExample />;
  return <EvidenceApprovalExample />;
}

export default function ProductFamilyPage({ product }: { product: ProductDefinition }) {
  return (
    <div className={styles.page} data-product-id={product.id}>
      <section className={`${styles.hero} hv-hero`} aria-labelledby="product-hero-title">
        <div className={styles.ambient} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{product.eyebrow}</p>
            <h1 id="product-hero-title">
              {product.headlineLines.map((line) => <span key={line}>{line}</span>)}
            </h1>
            <p className={styles.heroDescription}>{product.description}</p>
            <div className={styles.heroActions}>
              <a href={demoRequestHref('en')} className={styles.primaryCta}>
                Book a demo
                <span aria-hidden="true"><ArrowUpRight size={19} /></span>
              </a>
              <SecondaryCta product={product} />
            </div>
          </div>

          <div className={styles.heroArt}>
            <Image
              src={product.artwork}
              alt=""
              width={product.artworkWidth}
              height={product.artworkHeight}
              priority
              sizes="(max-width: 767px) 92vw, 52vw"
            />
            <HeroNotice productId={product.id} />
          </div>
        </div>

        <nav className={styles.productNav} aria-label="Gappy product family">
          {productFamily.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              aria-current={item.id === product.id ? "page" : undefined}
            >
              {item.displayName}
            </Link>
          ))}
        </nav>
      </section>

      <ProductFamilyReveal>
        <section
          id={product.sectionId}
          className={styles.detailSection}
          aria-labelledby={`${product.sectionId}-title`}
        >
          <div className={styles.detailInner}>
            <header className={styles.detailHeading} data-reveal-copy>
              <p className={styles.eyebrow}>{product.sectionEyebrow}</p>
              <h2 id={`${product.sectionId}-title`}>{product.sectionHeadline}</h2>
              <p>{product.sectionDescription}</p>
            </header>
            <ProductExample product={product} />
            <p className={styles.syntheticCaption}>{productFamilyCopy.syntheticCaption}</p>
          </div>
        </section>
      </ProductFamilyReveal>

      <section className={`${styles.finalCta} hv-final`} aria-labelledby="product-final-title">
        <div>
          <p className={styles.eyebrow}>WORK WITH GAPPY</p>
          <h2 id="product-final-title">Bring one workflow into focus.</h2>
          <p>Start with the operation, conditions and definition of done your team needs to make explicit.</p>
        </div>
        <div>
          <a href={demoRequestHref('en')} className={styles.primaryCta}>
            Book a demo
            <span aria-hidden="true"><ArrowUpRight size={19} /></span>
          </a>
          <Link href="/#product-family" className={styles.secondaryCta}>
            Explore all products
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
