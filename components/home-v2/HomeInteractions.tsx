"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Circle,
  RotateCcw,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { homeCopy, workflowIds, type HomeLocale } from "@/content/home-v2";
import {
  recoveryScene,
  verificationTransition,
  type HomeState,
  type VerificationState,
} from "@/lib/home-demo";
import {
  Activity,
  BookingCard,
  Candidate,
  EvidenceCard,
  ProductCaption,
  Readiness,
  Requirements,
} from "./ProductUI";

export function BookingSequence({ locale }: { locale: HomeLocale }) {
  const c = homeCopy[locale];
  const [stage, setStage] = useState(0);
  const [execution, setExecution] = useState<HomeState>("advanced");
  const states: HomeState[] = [
    "received",
    "received",
    execution,
    "response",
    "response",
    "ready",
  ];
  return (
    <div className="hv-sequence">
      <ol className="hv-stage-rail">
        {c.stages.map((label, i) => (
          <li key={label}>
            <button aria-pressed={stage === i} onClick={() => setStage(i)}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {label}
            </button>
          </li>
        ))}
      </ol>
      <div className="hv-sequence-body hv-dark">
        <BookingCard locale={locale} />
        <div>
          <p className="hv-sr-only" aria-live="polite">
            {c.stages[stage]}
          </p>
          <Readiness locale={locale} state={states[stage]} large />
          {stage === 2 && (
            <div className="hv-execution">
              <span>{c.interim}</span>
              {(["execution57", "execution71", "advanced"] as const).map(
                (state, i) => (
                  <button
                    key={state}
                    onClick={() => setExecution(state)}
                    aria-pressed={state === execution}
                  >
                    {[57, 71, 86][i]}%
                  </button>
                ),
              )}
            </div>
          )}
          {stage < 3 ? (
            <Requirements locale={locale} pending={stage < 2} />
          ) : stage < 5 ? (
            <>
              {stage === 3 ? (
                <EvidenceCard locale={locale} />
              ) : (
                <div className="hv-checks hv-sequence-checks">
                  <p className="hv-panel-title">{c.ui.waiting}</p>
                  <ol>
                    {c.ui.checks.map((check) => (
                      <li key={check}>
                        <Circle size={16} />
                        {check}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              <a className="hv-text-link" href="#verification">
                {c.ui.inspect}
                <ArrowRight size={16} />
              </a>
            </>
          ) : (
            <div className="hv-complete">
              <ShieldCheck size={24} />
              <p>{c.ui.current}</p>
              <span>{c.ui.checked}</span>
            </div>
          )}
        </div>
      </div>
      <ProductCaption locale={locale} />
      <p className="hv-caption">{c.disclaimer}</p>
    </div>
  );
}

function JobUI({ locale, index }: { locale: HomeLocale; index: number }) {
  const c = homeCopy[locale];
  return (
    <div className={`hv-dark hv-job-ui hv-job-ui-${index}`}>
      {index === 0 ? (
        <>
          <BookingCard locale={locale} />
          <Requirements locale={locale} pending />
        </>
      ) : index === 1 ? (
        <>
          <Readiness locale={locale} />
          <Activity locale={locale} />
        </>
      ) : index === 2 ? (
        <>
          <EvidenceCard locale={locale} />
          <div className="hv-principle">{c.ui.principle}</div>
          <a className="hv-text-link" href="#verification">
            {c.ui.inspect}
            <ArrowRight size={16} />
          </a>
        </>
      ) : (
        <>
          <div className="hv-invalidation">
            <TriangleAlert size={20} />
            <div>
              <strong>{c.cancel}</strong>
              <p>{c.ui.invalidated}</p>
            </div>
          </div>
          <Candidate locale={locale} />
          <a className="hv-text-link" href="#recovery">
            {c.ui.explore}
            <ArrowRight size={16} />
          </a>
        </>
      )}
    </div>
  );
}

export function Workflow({ locale }: { locale: HomeLocale }) {
  const c = homeCopy[locale];
  const [active, setActive] = useState(0);
  const [mobilePanel, setMobilePanel] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting)
            setActive(Number(entry.target.getAttribute("data-job")));
      },
      { rootMargin: "-25% 0px -40% 0px" },
    );
    root.current
      ?.querySelectorAll("[data-job]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <div className="hv-workflow-desktop" ref={root}>
        <div className="hv-workflow-pinned">
          <nav aria-label={c.workflow.eyebrow}>
            {c.tabs.map((label, i) => (
              <a
                key={label}
                href={`#job-${workflowIds[i]}`}
                aria-current={active === i ? "step" : undefined}
              >
                <span>0{i + 1}</span>
                {label}
                <ArrowRight size={17} />
              </a>
            ))}
          </nav>
          <div
            className="hv-workflow-canvas"
            data-active-workflow={workflowIds[active]}
          >
            <div className="hv-job-heading">
              <span className="hv-eyebrow">
                0{active + 1} / {c.tabs[active]}
              </span>
              <h3>{c.jobs[active][0]}</h3>
              <p>{c.jobs[active][1]}</p>
            </div>
            <JobUI locale={locale} index={active} />
          </div>
        </div>
        <div className="hv-workflow-markers" aria-hidden="true">
          {workflowIds.map((id, i) => (
            <div id={`job-${id}`} data-job={i} key={id} />
          ))}
        </div>
      </div>
      <div className="hv-workflow-fallback">
        {c.jobs.map((job, i) => (
          <article key={job[0]}>
            <div className="hv-job-heading">
              <span className="hv-eyebrow">
                0{i + 1} / {c.tabs[i]}
              </span>
              <h3>{job[0]}</h3>
              <p>{job[1]}</p>
            </div>
            <JobUI locale={locale} index={i} />
          </article>
        ))}
      </div>
      <div className="hv-workflow-mobile">
        {c.jobs.map((job, i) => (
          <details key={job[0]} open={mobilePanel === i}>
            <summary
              aria-expanded={mobilePanel === i}
              aria-controls={`mobile-job-${workflowIds[i]}`}
              onClick={(event) => {
                event.preventDefault();
                setMobilePanel(i);
              }}
            >
              <span>0{i + 1}</span>
              {c.tabs[i]}
              <ChevronDown size={18} />
            </summary>
            <div id={`mobile-job-${workflowIds[i]}`}>
              <div className="hv-job-heading">
                <h3>{job[0]}</h3>
                <p>{job[1]}</p>
              </div>
              <JobUI locale={locale} index={i} />
            </div>
          </details>
        ))}
      </div>
      <ProductCaption locale={locale} />
    </>
  );
}

export function Verification({ locale }: { locale: HomeLocale }) {
  const c = homeCopy[locale];
  const [state, setState] = useState<VerificationState>("response");
  useEffect(() => {
    if (state !== "checking") return;
    const timer = setTimeout(
      () => setState((s) => verificationTransition(s, "complete")),
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 300,
    );
    return () => clearTimeout(timer);
  }, [state]);
  const verified = state === "ready";
  return (
    <>
      <div className="hv-verification" data-verification-state={state}>
        <div className="hv-verification-source">
          <EvidenceCard locale={locale} verified={verified} />
          <div className="hv-principle">{c.ui.principle}</div>
          <Readiness locale={locale} state={verified ? "ready" : "response"} />
        </div>
        <div className="hv-checks">
          <p className="hv-panel-title">
            <ShieldCheck size={18} />
            {c.ui.verification}
          </p>
          <ol>
            {c.ui.checks.map((check, i) => (
              <li key={check}>
                <span className="hv-check-number">0{i + 1}</span>
                <span>{check}</span>
                {verified ? (
                  <Check className="hv-checked" size={19} />
                ) : (
                  <Circle size={16} />
                )}
              </li>
            ))}
          </ol>
          <div className="hv-verification-result" aria-live="polite">
            <strong>
              {verified
                ? c.ui.verified
                : state === "checking"
                  ? c.ui.checking
                  : c.ui.waiting}
            </strong>
            <p>{verified ? c.ui.current : c.ui.principle}</p>
          </div>
          <button
            className="hv-button hv-button-lime"
            disabled={state === "checking"}
            onClick={() =>
              setState((s) =>
                verificationTransition(s, verified ? "replay" : "check"),
              )
            }
          >
            {verified ? c.ui.replay : c.ui.check}
            {verified ? <RotateCcw size={16} /> : <ArrowRight size={16} />}
          </button>
        </div>
      </div>
      <ProductCaption locale={locale} />
    </>
  );
}

function RecoveryPanel({
  locale,
  scene,
}: {
  locale: HomeLocale;
  scene: number;
}) {
  const c = homeCopy[locale];
  return (
    <div className="hv-recovery-panel" data-recovery-scene={scene}>
      <Readiness locale={locale} state={recoveryScene(scene)} />
      {scene === 0 ? (
        <div className="hv-complete">
          <ShieldCheck size={28} />
          <strong>{c.ui.verified}</strong>
          <p>{c.ui.current}</p>
          <span>{c.ui.checked}</span>
        </div>
      ) : scene === 1 ? (
        <>
          <div className="hv-invalidation">
            <TriangleAlert size={21} />
            <div>
              <strong>{c.cancel}</strong>
              <p>Yuki Tanaka: {c.cancelReply}</p>
              <span className="hv-tag hv-tag-risk">{c.ui.invalidated}</span>
            </div>
          </div>
          <Candidate locale={locale} />
        </>
      ) : (
        <>
          <Candidate locale={locale} verified />
          <div className="hv-complete hv-complete-compact">
            <ShieldCheck size={22} />
            <span>
              {c.ui.checked} · {c.ui.recovered}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export function Recovery({ locale }: { locale: HomeLocale }) {
  const c = homeCopy[locale];
  const [scene, setScene] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const manual = useRef(false);
  const controls = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (manual.current) return;
        for (const entry of entries)
          if (entry.isIntersecting)
            setScene(Number(entry.target.getAttribute("data-scene")));
      },
      { rootMargin: "-35% 0px -45% 0px" },
    );
    const resume = () => {
      manual.current = false;
    };
    window.addEventListener("scroll", resume, { passive: true });
    root.current
      ?.querySelectorAll("[data-scene]")
      .forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", resume);
    };
  }, []);
  const choose = (next: number) => {
    manual.current = true;
    setScene(next);
    // Keep the narrative chapter and the inspected product state together.
    document
      .getElementById(`recovery-${next}`)
      ?.scrollIntoView({ block: "center", behavior: "instant" });
  };
  const onKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % 3
        : event.key === "ArrowLeft"
          ? (index + 2) % 3
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? 2
              : null;
    if (next === null) return;
    event.preventDefault();
    choose(next);
    controls.current?.querySelectorAll("button")[next]?.focus();
  };
  const buttons = (
    <ol
      ref={controls}
      className="hv-recovery-rail hv-recovery-controls"
      aria-label={c.recovery.eyebrow}
    >
      {c.recoveryStates.map((label, i) => (
        <li key={label} className={i === 1 ? "is-risk" : ""}>
          <button
            aria-pressed={scene === i}
            onClick={() => choose(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span>{label}</span>
            <strong>
              {[100, 76, 100][i]}
              <small>%</small>
            </strong>
          </button>
          {i < 2 && <ArrowRight size={20} />}
        </li>
      ))}
    </ol>
  );
  const rail = (
    <ol className="hv-recovery-rail">
      {c.recoveryStates.map((label, i) => (
        <li key={label} className={i === 1 ? "is-risk" : ""}>
          <span>{label}</span>
          <strong>
            {[100, 76, 100][i]}
            <small>%</small>
          </strong>
          {i < 2 && <ArrowRight size={20} />}
        </li>
      ))}
    </ol>
  );
  return (
    <>
      <div className="hv-recovery-desktop" ref={root}>
        <div className="hv-recovery-sticky">
          {buttons}
          <RecoveryPanel locale={locale} scene={scene} />
          <p className="hv-caption">
            {c.stage} {scene + 1} / 3
          </p>
          <ProductCaption locale={locale} />
        </div>
        <div className="hv-recovery-chapters">
          {c.recoveryTitles.map((title, i) => (
            <article key={title} id={`recovery-${i}`} data-scene={i}>
              <span className="hv-eyebrow">
                0{i + 1} / {c.recoveryStates[i]}
              </span>
              <h3>{title}</h3>
              <p>{c.recoveryBodies[i]}</p>
              <a href={`#recovery-${(i + 1) % 3}`} className="hv-text-link">
                {c.recoveryStates[(i + 1) % 3]}
                <ArrowRight size={17} />
              </a>
            </article>
          ))}
        </div>
      </div>
      <div className="hv-recovery-mobile">
        {rail}
        {c.recoveryTitles.map((title, i) => (
          <article key={title}>
            <span className="hv-eyebrow">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{c.recoveryBodies[i]}</p>
            <RecoveryPanel locale={locale} scene={i} />
          </article>
        ))}
        <ProductCaption locale={locale} />
      </div>
    </>
  );
}
