import {
  CalendarDays,
  Check,
  Circle,
  FileCheck2,
  House,
  ListChecks,
  Mail,
  MapPin,
  ShieldCheck,
  Users,
  Waypoints,
} from "lucide-react";
import Image from "next/image";
import officialLogo from "@/public/gappy-logo-official.png";
import { homeCopy, type HomeLocale } from "@/content/home-v2";
import { booking, homeStates, type HomeState } from "@/lib/home-demo";

export function ProductCaption({ locale }: { locale: HomeLocale }) {
  return (
    <p className="hv-caption hv-product-caption">
      <span className="hv-dot" />
      {homeCopy[locale].synthetic}
    </p>
  );
}

export function Readiness({
  locale,
  state = "advanced",
  large = false,
}: {
  locale: HomeLocale;
  state?: HomeState;
  large?: boolean;
}) {
  const ui = homeCopy[locale].ui;
  const s = homeStates[state];
  return (
    <div
      className={`hv-readiness ${s.readiness === 76 ? "is-risk" : ""} ${large ? "is-large" : ""}`}
      data-readiness={s.readiness}
    >
      <div className="hv-ring">
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="51" />
          <circle
            className="hv-ring-fill"
            cx="60"
            cy="60"
            r="51"
            pathLength="100"
            strokeDasharray={`${s.readiness} 100`}
          />
        </svg>
        <strong>
          {s.readiness}
          <small>%</small>
        </strong>
      </div>
      <div>
        <p className="hv-meta">{ui.readiness}</p>
        <p className="hv-status">{ui[s.status]}</p>
        {"unresolved" in s && (
          <dl className="hv-counts">
            <div>
              <dt>{ui.unresolved}</dt>
              <dd>{s.unresolved}</dd>
            </div>
            {"evidence" in s && (
              <div>
                <dt>{ui.evidence}</dt>
                <dd>{s.evidence}</dd>
              </div>
            )}
          </dl>
        )}
      </div>
    </div>
  );
}

export function Requirements({
  locale,
  pending = false,
}: {
  locale: HomeLocale;
  pending?: boolean;
}) {
  const ui = homeCopy[locale].ui;
  return (
    <div className="hv-requirements">
      <p className="hv-panel-title">
        <ListChecks size={17} />
        {ui.requirements}
      </p>
      <ul>
        {ui.tasks.map((task, i) => (
          <li key={task}>
            <span
              className={i === 0 || pending ? "hv-wait-icon" : "hv-check-icon"}
            >
              {i === 0 || pending ? <Circle size={15} /> : <Check size={15} />}
            </span>
            <span>{task}</span>
            <span
              className={`hv-tag ${i === 0 || pending ? "hv-tag-neutral" : ""}`}
            >
              {pending ? ui.pending : ui.statuses[i]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Activity({ locale }: { locale: HomeLocale }) {
  const ui = homeCopy[locale].ui;
  return (
    <div className="hv-activity">
      <p className="hv-panel-title">
        <Waypoints size={17} />
        {ui.activity}
      </p>
      <ol>
        {ui.activityItems.map((item, i) => (
          <li key={item}>
            <span className="hv-activity-dot" />
            <div>
              <strong>{item}</strong>
              <span className="hv-meta">
                {ui.agent} <span aria-hidden="true">·</span> 09:
                {[13, 14, 16][i]}
              </span>
            </div>
            <Check size={14} />
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ProductWindow({ locale }: { locale: HomeLocale }) {
  const ui = homeCopy[locale].ui;
  const icons = [House, CalendarDays, ListChecks, Users, FileCheck2];
  return (
    <figure className="hv-hero-product">
      <div
        className="hv-window"
        aria-label={`${ui.readiness} — ${homeCopy[locale].synthetic}`}
      >
        <aside className="hv-app-sidebar" aria-hidden="true">
          <Image src={officialLogo} alt="" width={76} className="hv-app-logo" />
          <div>
            {ui.nav.map((label, i) => {
              const Icon = icons[i];
              return (
                <span key={label} className={i === 2 ? "is-active" : ""}>
                  <Icon size={17} />
                  <span>{label}</span>
                </span>
              );
            })}
          </div>
          <span className="hv-operator">
            <span>TM</span>
            <span>{locale === "ja" ? "運用チーム" : "Operations"}</span>
          </span>
        </aside>
        <div className="hv-app-main">
          <div className="hv-app-top">
            <span>{ui.readiness}</span>
            <span className="hv-tag hv-tag-neutral">
              {locale === "ja" ? "合成データ" : "Synthetic data"}
            </span>
          </div>
          <div className="hv-app-title">
            <span className="hv-meta">{booking.id} · 18 OCT 2026</span>
            <h2>{booking.name}</h2>
            <span className="hv-meta">
              <MapPin size={13} /> {locale === "ja" ? "京都" : "Kyoto"} ·{" "}
              {booking.time} · {ui.guests}
            </span>
          </div>
          <Requirements locale={locale} />
          <div className="hv-window-foot">
            <ShieldCheck size={15} />
            <span>{ui.verification}</span>
            <span>{ui.waiting}</span>
          </div>
        </div>
      </div>
      <div className="hv-hero-readiness">
        <Readiness locale={locale} large />
      </div>
      <div className="hv-hero-activity hv-dark">
        <Activity locale={locale} />
      </div>
      <ProductCaption locale={locale} />
      <p className="hv-caption">
        {locale === "ja"
          ? "86%はデモ内の準備率です。"
          : "86% is the readiness state within this demo."}
      </p>
    </figure>
  );
}

export function BookingCard({ locale }: { locale: HomeLocale }) {
  const ui = homeCopy[locale].ui;
  return (
    <div className="hv-booking-card">
      <p className="hv-panel-title">
        <CalendarDays size={18} />
        {ui.booking}
      </p>
      <h3>{booking.name}</h3>
      <p className="hv-meta">{booking.id}</p>
      <dl>
        <div>
          <CalendarDays size={16} />
          <span>18 OCT 2026 · {booking.time}</span>
        </div>
        <div>
          <Users size={16} />
          <span>{ui.guests}</span>
        </div>
        <div>
          <MapPin size={16} />
          <span>{ui.place}</span>
        </div>
      </dl>
      <p className="hv-condition">{ui.needs}</p>
    </div>
  );
}

export function EvidenceCard({
  locale,
  verified = false,
}: {
  locale: HomeLocale;
  verified?: boolean;
}) {
  const ui = homeCopy[locale].ui;
  return (
    <div className="hv-evidence">
      <p className="hv-panel-title">
        <Mail size={18} />
        {ui.updated}
      </p>
      <div className="hv-person">
        <span className="hv-avatar">YT</span>
        <div>
          <strong>Yuki Tanaka</strong>
          <span className="hv-meta">
            09:18 · {locale === "ja" ? "合成の回答" : "Synthetic reply"}
          </span>
        </div>
      </div>
      <blockquote>“{ui.reply}”</blockquote>
      <span className={`hv-tag ${verified ? "" : "hv-tag-neutral"}`}>
        {verified ? ui.verified : ui.received}
      </span>
    </div>
  );
}

export function Candidate({
  locale,
  verified = false,
}: {
  locale: HomeLocale;
  verified?: boolean;
}) {
  const c = homeCopy[locale];
  return (
    <div className="hv-candidate">
      <p className="hv-panel-title">
        <Users size={18} />
        {c.candidate}
      </p>
      <div className="hv-person">
        <span className="hv-avatar">MS</span>
        <div>
          <strong>Mika Sato</strong>
          <span className="hv-meta">
            {locale === "ja" ? "英語対応・京都" : "English · Kyoto"}
          </span>
        </div>
        <span className={`hv-tag ${verified ? "" : "hv-tag-neutral"}`}>
          {verified ? c.ui.verified : c.ui.received}
        </span>
      </div>
      <ul>
        {c.evaluate.map((item, i) => (
          <li key={item}>
            <span>{item}</span>
            <span
              className={i === 4 && !verified ? "hv-pending" : "hv-checked"}
            >
              {i === 4 && !verified ? (
                <Circle size={14} />
              ) : (
                <Check size={14} />
              )}
              {verified ? c.ui.verified : c.evaluateStatus[i]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
