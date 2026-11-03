"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  Check,
  Clock3,
  FileCheck2,
  LayoutGrid,
  ListTodo,
  Sparkles,
} from "lucide-react";
import type { HomeLocale } from "@/content/home-v2";
import styles from "./GappyWorkforceShowcase.module.css";

const showcaseCopy = {
  en: {
    eyebrow: "PRODUCT / GAPPY AI WORKFORCE",
    title: "See the work. Trust the outcome.",
    supporting: "Track changes, confirmations, evidence, and human approvals across travel operations.",
    interfaceLabel: "Illustrative Gappy AI Workforce interface",
    sidebarLabel: "Illustrative workspace navigation",
    workspace: "Workspace",
    control: "Control",
    demoWorkspace: "Demo workspace",
    syntheticOnly: "Synthetic records only",
    workspaceLinks: ["Overview", "Work queue", "Bookings", "Suppliers"],
    controlLinks: ["Approvals", "Evidence", "Audit trail"],
    queryLabel: "Illustrative query",
    query: "What changed since the last confirmation?",
    overview: "Operational overview",
    syntheticDemo: "Synthetic demo",
    metrics: ["Work items", "Awaiting supplier", "Needs approval", "Verified"],
    workQueue: "Work queue",
    workQueueSupporting: "Changes that still need follow-through",
    shown: "4 shown",
    workItems: [
      ["Airport transfer", "Pickup time changed", "Reconfirm"],
      ["Hotel room allocation", "Room type amended", "Needs approval"],
      ["Private itinerary", "Supplier reply received", "Checking evidence"],
      ["Corporate shuttle", "Vehicle details checked", "Verified"],
    ],
    airportTransfer: "Airport transfer",
    required: "Reconfirmation required",
    latestConditions: "Latest conditions",
    conditionsSupport: "",
    previouslyConfirmed: "Previously confirmed",
    superseded: "Superseded",
    latestPickup: "Latest requested pickup",
    awaitingReply: "Awaiting supplier reply",
    source: "Itinerary revision 4 · Updated 09:14",
    humanReview: "Human review required",
    beforeFollowUp: "Before any external follow-up",
    evidenceFreshness: "Evidence freshness",
    revisionReceived: "Current itinerary revision received",
    confirmationPending: "Supplier confirmation for 09:15 is still pending",
    reviewEvidence: "Review evidence",
    prepareReconfirmation: "Prepare reconfirmation",
    evidenceNotice: "The latest itinerary confirms that the requested time changed, but no supplier confirmation for 09:15 has been received.",
    draftNotice: "Draft preparation is disabled in this illustrative interface. No message has been sent.",
    disclaimer: "Illustrative interface · Synthetic demo data · No live connections or sends",
  },
  ja: {
    eyebrow: "製品 / GAPPY AI WORKFORCE",
    title: "業務の進捗と、確認の根拠をひと目で。",
    supporting: "条件変更、最新の合意、未回答事項、必要な承認をまとめて確認。次に何を確認すべきかを整理します。",
    interfaceLabel: "Gappy AI Workforceのデモ画面",
    sidebarLabel: "デモ用ワークスペースのナビゲーション",
    workspace: "ワークスペース",
    control: "管理",
    demoWorkspace: "デモ用ワークスペース",
    syntheticOnly: "架空データのみ",
    workspaceLinks: ["概要", "業務一覧", "予約", "手配先"],
    controlLinks: ["承認", "根拠資料", "操作・判断の履歴"],
    queryLabel: "デモ用の質問",
    query: "前回の確認から、何が変わりましたか？",
    overview: "業務の状況",
    syntheticDemo: "デモ用の架空データ",
    metrics: ["対応業務", "手配先の回答待ち", "承認待ち", "検証済み"],
    workQueue: "業務一覧",
    workQueueSupporting: "引き続き対応が必要な変更",
    shown: "4件を表示",
    workItems: [
      ["空港送迎", "迎車時刻が変更", "再確認"],
      ["ホテルの部屋割り", "部屋タイプが変更", "承認待ち"],
      ["個人旅行の日程", "手配先から回答を受領", "根拠を照合中"],
      ["企業向け送迎", "車両情報を確認", "検証済み"],
    ],
    airportTransfer: "空港送迎",
    required: "再確認が必要",
    latestConditions: "条件が変わったら、確認もやり直す。",
    conditionsSupport: "旧条件への了承を、変更後の了承として扱いません。",
    previouslyConfirmed: "以前の確認内容",
    superseded: "旧条件での確認",
    latestPickup: "最新の依頼内容",
    awaitingReply: "手配先の回答待ち",
    source: "旅程 第4版 · 09:14更新",
    humanReview: "担当者の確認が必要",
    beforeFollowUp: "手配先への確認依頼は未送信",
    evidenceFreshness: "根拠の更新状況",
    revisionReceived: "最新の旅程を受領済み",
    confirmationPending: "09:15の迎車は手配先から未回答",
    reviewEvidence: "根拠を確認",
    prepareReconfirmation: "再確認の依頼を準備",
    evidenceNotice: "最新の旅程で時刻変更は確認できましたが、09:15の迎車について手配先の確認はまだ得られていません。",
    draftNotice: "このデモ画面では依頼文を作成できません。外部へのメッセージ送信は行っていません。",
    disclaimer: "画面はデモです。実データへの接続・外部送信は行いません。",
  },
} as const;

const metricValues = ["24", "06", "03", "15"] as const;
const metricTones = ["neutral", "pending", "approval", "verified"] as const;
const itemIds = ["BK-2048", "BK-2051", "BK-2054", "BK-2057"] as const;
const itemTones = ["pending", "approval", "evidence", "verified"] as const;
const workspaceIcons = [LayoutGrid, ListTodo, CalendarDays, Building2] as const;
const controlIcons = [BadgeCheck, FileCheck2, Clock3] as const;

export default function GappyWorkforceShowcase({ locale }: { locale: HomeLocale }) {
  const copy = showcaseCopy[locale];
  const section = useRef<HTMLElement>(null);
  const [motionReady, setMotionReady] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [draftNotice, setDraftNotice] = useState(false);

  useEffect(() => {
    const element = section.current;
    if (!element) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMotionReady(true);
    if (preference.matches || !("IntersectionObserver" in window)) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={section}
      id="product-proof"
      className={`${styles.section} ${motionReady ? styles.motionReady : ""} ${revealed ? styles.revealed : ""}`}
      aria-labelledby="gappy-workforce-title"
      data-locale={locale}
    >
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glowOne} aria-hidden="true" />
      <div className={styles.glowTwo} aria-hidden="true" />

      <div className={styles.container}>
        <header className={styles.copy}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h2 id="gappy-workforce-title">{copy.title}</h2>
          <p className={styles.supporting}>{copy.supporting}</p>
        </header>

        <div className={styles.workspace} aria-label={copy.interfaceLabel} data-locale={locale}>
          <aside className={styles.sidebar} aria-label={copy.sidebarLabel}>
            <div className={styles.workspaceBrand}>
              <span aria-hidden="true">G</span>
              <strong>Gappy</strong>
            </div>

            <nav aria-label={copy.workspace}>
              <p>{copy.workspace}</p>
              {copy.workspaceLinks.map((label, index) => {
                const Icon = workspaceIcons[index];
                return (
                <span key={label} className={index === 0 ? styles.navActive : undefined}>
                  <Icon size={18} aria-hidden="true" />
                  {label}
                </span>
              )})}
            </nav>

            <nav aria-label={copy.control}>
              <p>{copy.control}</p>
              {copy.controlLinks.map((label, index) => {
                const Icon = controlIcons[index];
                return (
                <span key={label}>
                  <Icon size={18} aria-hidden="true" />
                  {label}
                </span>
              )})}
            </nav>

            <div className={styles.sidebarNote}>
              <strong>{copy.demoWorkspace}</strong>
              <span>{copy.syntheticOnly}</span>
            </div>
          </aside>

          <div className={styles.workspaceMain}>
            <div className={styles.questionBar} aria-label={copy.queryLabel}>
              <span className={styles.sparkle} aria-hidden="true">
                <Sparkles size={16} />
              </span>
              <span>{copy.query}</span>
              <span className={styles.queryLabel}>{copy.queryLabel}</span>
            </div>

            <div className={styles.overviewHeading}>
              <h3>{copy.overview}</h3>
              <span>{copy.syntheticDemo}</span>
            </div>

            <dl className={styles.metrics}>
              {copy.metrics.map((label, index) => (
                <div key={label} className={styles.metric} data-tone={metricTones[index]}>
                  <dt>{label}</dt>
                  <dd>{metricValues[index]}</dd>
                </div>
              ))}
            </dl>

            <div className={styles.workspaceBody}>
              <section className={styles.queue} aria-labelledby="gappy-work-queue">
                <div className={styles.panelHeading}>
                  <div>
                    <h3 id="gappy-work-queue">{copy.workQueue}</h3>
                    <p>{copy.workQueueSupporting}</p>
                  </div>
                  <span>{copy.shown}</span>
                </div>

                <ul>
                  {copy.workItems.map((item, index) => (
                    <li
                      key={itemIds[index]}
                      className={index === 0 ? styles.selectedItem : undefined}
                      aria-current={index === 0 ? "true" : undefined}
                    >
                      <span className={styles.itemIcon} aria-hidden="true">
                        <ArrowRight size={16} />
                      </span>
                      <span className={styles.itemCopy}>
                        <strong>{item[0]}</strong>
                        <span>{itemIds[index]} · {item[1]}</span>
                      </span>
                      <span className={styles.status} data-tone={itemTones[index]}>
                        {item[2]}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <aside className={styles.conditions} aria-labelledby="latest-conditions-title">
                <div className={styles.conditionsTopline}>
                  <div>
                    <p>{copy.airportTransfer}</p>
                    <span>BK-2048</span>
                  </div>
                  <span className={styles.required}>{copy.required}</span>
                </div>

                <h3 id="latest-conditions-title">{copy.latestConditions}</h3>
                {copy.conditionsSupport ? (
                  <p className={styles.conditionsSupport}>{copy.conditionsSupport}</p>
                ) : null}
                <div className={styles.timeChange}>
                  <div className={styles.oldCondition}>
                    <span>{copy.previouslyConfirmed}</span>
                    <strong>08:30</strong>
                    <em>{copy.superseded}</em>
                  </div>
                  <ArrowRight size={18} aria-hidden="true" />
                  <div className={styles.newCondition}>
                    <span>{copy.latestPickup}</span>
                    <strong>09:15</strong>
                    <em>{copy.awaitingReply}</em>
                  </div>
                </div>

                <p className={styles.source}>{copy.source}</p>

                <div className={styles.controlState}>
                  <span className={styles.controlIcon} aria-hidden="true">
                    <AlertTriangle size={17} />
                  </span>
                  <div>
                    <strong>{copy.humanReview}</strong>
                    <span>{copy.beforeFollowUp}</span>
                  </div>
                </div>

                <div className={styles.evidenceState}>
                  <span aria-hidden="true"><Check size={15} /></span>
                  <div>
                    <strong>{copy.evidenceFreshness}</strong>
                    <p>{copy.revisionReceived}</p>
                    <p>{copy.confirmationPending}</p>
                  </div>
                </div>

                <div className={styles.actions}>
                  <button
                    type="button"
                    onClick={() => setEvidenceOpen((open) => !open)}
                    aria-expanded={evidenceOpen}
                    aria-controls="gappy-evidence-detail"
                  >
                    {copy.reviewEvidence}
                  </button>
                  <button
                    type="button"
                    className={styles.secondaryAction}
                    onClick={() => setDraftNotice((visible) => !visible)}
                    aria-expanded={draftNotice}
                    aria-controls="gappy-draft-notice"
                  >
                    {copy.prepareReconfirmation}
                  </button>
                </div>

                {evidenceOpen ? (
                  <p id="gappy-evidence-detail" className={styles.localNotice}>
                    {copy.evidenceNotice}
                  </p>
                ) : null}
                {draftNotice ? (
                  <p id="gappy-draft-notice" className={styles.localNotice} role="status">
                    {copy.draftNotice}
                  </p>
                ) : null}
              </aside>
            </div>

            <p className={styles.disclaimer}>
              {copy.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
