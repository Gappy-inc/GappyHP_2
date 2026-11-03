"use client";

import {
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import type { HomeLocale } from "@/content/home-v2";
import { jaUseCases, useCases } from "@/content/use-cases";
import { demoRequestHref } from "@/lib/lead-forms";
import styles from "./UseCasesCarousel.module.css";

const AUTOPLAY_INTERVAL = 6000;

const carouselCopy = {
  en: {
    eyebrow: "USE CASES",
    title: ["The work behind", "every journey."],
    intro: "Explore confirmation workflows across transfers, stays, guides, dining, activities, and venues. Start with one clearly defined job.",
    previous: "Show previous use case",
    next: "Show next use case",
    choose: "Choose a use case",
    show: (label: string, index: number, length: number) => `Show ${label}, ${index} of ${length}`,
    pause: "Pause automatic slide changes",
    play: "Play automatic slide changes",
    pauseText: "Pause animation",
    playText: "Play animation",
    carousel: "Travel operations use cases",
    select: (label: string) => `Select ${label} use case`,
    unavailable: "Image unavailable",
    book: "Book a demo",
    manual: (label: string, index: number, length: number) => `${label}, ${index} of ${length}. Automatic movement paused.`,
    disclosure: [
      "Illustrative scenarios. Workflow scope and availability are agreed before use.",
      "AI-generated illustrative scenes. No real customer or workplace is depicted.",
    ],
  },
  ja: {
    eyebrow: "活用シーン",
    title: ["旅を支える、", "さまざまな確認業務に。"],
    intro: "送迎、宿泊、ガイド、食事、体験、会場。業務ごとの変更点と未確定事項を整理し、必要な再確認を進めます。",
    previous: "前の活用シーン",
    next: "次の活用シーン",
    choose: "活用シーンを選ぶ",
    show: (label: string, index: number, length: number) => `${label}を表示、全${length}件中${index}件目`,
    pause: "自動再生を一時停止",
    play: "自動再生を再開",
    pauseText: "自動再生を一時停止",
    playText: "自動再生を再開",
    carousel: "旅行業務の活用シーン",
    select: (label: string) => `${label}の活用シーンを選択`,
    unavailable: "画像を表示できません",
    book: "デモを予約",
    manual: (label: string, index: number, length: number) => `${label}、全${length}件中${index}件目。自動再生を一時停止しました。`,
    disclosure: [
      "画面は活用シーンのイメージです。業務範囲と利用条件は導入前に確認します。",
      "画像はAIで生成したイメージです。実在の顧客や職場を表すものではありません。",
    ],
  },
} as const;

type SlideStyle = CSSProperties & {
  "--use-cases-x": string;
  "--use-cases-scale": string;
  "--use-cases-opacity": string;
};

type StageStyle = CSSProperties & {
  "--use-cases-stage-height": string;
  "--use-cases-active-width": string;
};

const modulo = (value: number, length: number) =>
  ((value % length) + length) % length;

export default function UseCasesCarousel({ locale }: { locale: HomeLocale }) {
  const demoHref = demoRequestHref(locale);
  const copy = carouselCopy[locale];
  const items = locale === "ja" ? jaUseCases : useCases;
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<{ id: number; x: number; y: number } | null>(
    null,
  );
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1440);
  const [autoplayEnabled, setAutoplayEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [playFocusOverride, setPlayFocusOverride] = useState(false);
  const [inView, setInView] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [manualStatus, setManualStatus] = useState("");
  const [brokenImages, setBrokenImages] = useState<Set<string>>(
    () => new Set(),
  );

  const activeCase = items[active];
  const isAutoplayRunning =
    autoplayEnabled &&
    !hovered &&
    (!focusWithin || playFocusOverride) &&
    inView &&
    documentVisible;

  useEffect(() => {
    setEnhanced(true);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAutoplayEnabled(!media.matches);
    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) setAutoplayEnabled(false);
    };
    if (media.addEventListener) media.addEventListener("change", handleMotionChange);
    else media.addListener(handleMotionChange);
    return () => {
      if (media.removeEventListener)
        media.removeEventListener("change", handleMotionChange);
      else media.removeListener(handleMotionChange);
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const updateWidth = () => setViewportWidth(stage.clientWidth || 1440);
    updateWidth();
    const ResizeObserverApi = (
      window as unknown as { ResizeObserver?: typeof ResizeObserver }
    ).ResizeObserver;
    if (!ResizeObserverApi) {
      window.addEventListener("resize", updateWidth, { passive: true });
      return () => window.removeEventListener("resize", updateWidth);
    }
    const observer = new ResizeObserverApi(updateWidth);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const IntersectionObserverApi = (
      window as unknown as { IntersectionObserver?: typeof IntersectionObserver }
    ).IntersectionObserver;
    if (!IntersectionObserverApi) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserverApi(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.1),
      { threshold: [0, 0.1, 0.4] },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleVisibility = () => setDocumentVisible(!document.hidden);
    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (!isAutoplayRunning) return;
    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % items.length),
      AUTOPLAY_INTERVAL,
    );
    return () => window.clearTimeout(timer);
  }, [active, isAutoplayRunning, items.length]);

  const layout = useMemo(() => {
    const mobile = viewportWidth <= 640;
    const desktop = viewportWidth >= 1100;
    const activeWidth = mobile
      ? Math.min(390, viewportWidth * 0.8)
      : desktop
        ? Math.min(480, Math.max(400, viewportWidth * 0.25))
        : Math.min(400, viewportWidth * 0.43);
    const neighborScale = mobile ? 0.9 : desktop ? 0.6 : 0.72;
    const neighborWidth = activeWidth * neighborScale;
    const gap = mobile ? 14 : desktop ? Math.min(64, viewportWidth * 0.035) : 26;
    const middle = viewportWidth / 2;
    const visibleRange = desktop ? 2 : 1;
    const xFor = (delta: number) => {
      if (delta === 0) return middle - activeWidth / 2;
      if (delta > 0) {
        return (
          middle +
          activeWidth / 2 +
          gap +
          (delta - 1) * (neighborWidth + gap)
        );
      }
      return (
        middle -
        activeWidth / 2 -
        gap -
        neighborWidth +
        (delta + 1) * (neighborWidth + gap)
      );
    };

    return {
      activeWidth,
      stageHeight: activeWidth * 1.25 + 2,
      neighborScale,
      visibleRange,
      mobile,
      xFor,
    };
  }, [viewportWidth]);

  const selectCase = (index: number) => {
    setAutoplayEnabled(false);
    setPlayFocusOverride(false);
    setActive(index);
    setManualStatus(
      copy.manual(items[index].label, index + 1, items.length),
    );
  };

  const move = (amount: number) => selectCase(modulo(active + amount, items.length));

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectCase(0);
    } else if (event.key === "End") {
      event.preventDefault();
      selectCase(items.length - 1);
    }
  };

  const handleFocus = (event: FocusEvent<HTMLElement>) => {
    setFocusWithin(true);
    const target = event.target as HTMLElement;
    if (!target.closest("[data-autoplay-toggle]")) setPlayFocusOverride(false);
  };

  const handleBlur = () => {
    window.setTimeout(() => {
      const section = sectionRef.current;
      if (!section?.contains(document.activeElement)) {
        setFocusWithin(false);
        setPlayFocusOverride(false);
      }
    }, 0);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "touch" && event.pointerType !== "pen") return;
    pointerStart.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    if (!start || start.id !== event.pointerId) return;
    pointerStart.current = null;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      move(dx < 0 ? 1 : -1);
    }
  };

  const stageStyle: StageStyle = {
    "--use-cases-stage-height": `${layout.stageHeight}px`,
    "--use-cases-active-width": `${layout.activeWidth}px`,
  };

  return (
    <section
      id="use-cases"
      ref={sectionRef}
      className={`${styles.section} ${enhanced ? styles.enhanced : ""}`}
      aria-labelledby="use-cases-title"
      data-locale={locale}
      onFocusCapture={handleFocus}
      onBlurCapture={handleBlur}
    >
      <div className={styles.heading}>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <h2 id="use-cases-title">
          {locale === "ja" ? (
            <>
              <span className={styles.desktopTitle}>{copy.title[0]}</span>
              <span className={styles.desktopTitle}>{copy.title[1]}</span>
              <span className={styles.mobileTitle}>{copy.title[0]}</span>
              <span className={styles.mobileTitle}>さまざまな</span>
              <span className={styles.mobileTitle}>確認業務に。</span>
            </>
          ) : (
            <>
              <span>{copy.title[0]}</span>
              <span>{copy.title[1]}</span>
            </>
          )}
        </h2>
        <p className={styles.intro}>{copy.intro}</p>
      </div>

      <div className={styles.carousel} onKeyDown={handleKeyDown}>
        <div className={styles.controls} hidden={!enhanced}>
          <button
            type="button"
            className={styles.arrow}
            aria-label={copy.previous}
            onClick={() => move(-1)}
          >
            <ArrowLeft aria-hidden="true" />
          </button>
          <div className={styles.centerControls}>
            <div className={styles.dots} aria-label={copy.choose}>
              {items.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={styles.dot}
                  aria-label={copy.show(item.label, index + 1, items.length)}
                  aria-current={index === active ? "true" : undefined}
                  onClick={() => selectCase(index)}
                />
              ))}
            </div>
            <button
              type="button"
              className={styles.autoplay}
              data-autoplay-toggle
              aria-label={
                autoplayEnabled
                  ? copy.pause
                  : copy.play
              }
              onClick={(event) => {
                const next = !autoplayEnabled;
                setAutoplayEnabled(next);
                setPlayFocusOverride(next && document.activeElement === event.currentTarget);
              }}
            >
              {autoplayEnabled ? (
                <Pause aria-hidden="true" />
              ) : (
                <Play aria-hidden="true" />
              )}
              <span>{autoplayEnabled ? copy.pauseText : copy.playText}</span>
            </button>
          </div>
          <button
            type="button"
            className={styles.arrow}
            aria-label={copy.next}
            onClick={() => move(1)}
          >
            <ArrowRight aria-hidden="true" />
          </button>
        </div>

        <div
          ref={stageRef}
          className={styles.stage}
          style={stageStyle}
          role="group"
          aria-roledescription="carousel"
          aria-label={copy.carousel}
          tabIndex={enhanced ? 0 : -1}
          onPointerEnter={(event) => {
            if (event.pointerType !== "touch") setHovered(true);
          }}
          onPointerLeave={(event) => {
            if (event.pointerType !== "touch") setHovered(false);
          }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            pointerStart.current = null;
          }}
        >
          <div className={styles.track}>
            {items.map((item, index) => {
              const delta = modulo(index - active + 2, items.length) - 2;
              const visible = layout.mobile
                ? delta === 0 || delta === 1
                : Math.abs(delta) <= layout.visibleRange;
              const slideStyle: SlideStyle = {
                "--use-cases-x": `${layout.xFor(delta)}px`,
                "--use-cases-scale": delta === 0 ? "1" : String(layout.neighborScale),
                "--use-cases-opacity": visible ? "1" : "0",
              };
              const broken = brokenImages.has(item.id);
              return (
                <article
                  key={item.id}
                  className={`${styles.slide} ${delta === 0 ? styles.activeSlide : ""}`}
                  style={slideStyle}
                  aria-hidden={enhanced && !visible ? "true" : undefined}
                  inert={enhanced && !visible ? true : undefined}
                >
                  <button
                    type="button"
                    className={styles.media}
                    tabIndex={enhanced && !visible ? -1 : 0}
                    aria-label={copy.select(item.label)}
                    aria-current={delta === 0 ? "true" : undefined}
                    onClick={() => selectCase(index)}
                  >
                    <picture className={broken ? styles.brokenImage : undefined}>
                      <source
                        srcSet={`/use-cases/${item.image}-560.webp 560w, /use-cases/${item.image}-840.webp 840w, /use-cases/${item.image}-1122.webp 1122w`}
                        sizes="(max-width: 640px) 80vw, (max-width: 1099px) 43vw, 25vw"
                        type="image/webp"
                      />
                      <img
                        src={`/use-cases/${item.image}-1122.webp`}
                        alt={item.alt}
                        width="1122"
                        height="1402"
                        loading="lazy"
                        decoding="async"
                        onError={() =>
                          setBrokenImages((current) => {
                            const next = new Set(current);
                            next.add(item.id);
                            return next;
                          })
                        }
                      />
                    </picture>
                    <span className={styles.imageFallback} aria-hidden={!broken}>
                      {copy.unavailable}
                    </span>
                    <span className={styles.photoLabel}>{item.label}</span>
                  </button>
                  <div className={styles.fallbackDetail}>
                    <p className={styles.workflow}>{item.workflow}</p>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <p className={styles.status} aria-live="polite" aria-atomic="true">
          {manualStatus}
        </p>

        <div className={styles.activeDetail} hidden={!enhanced} key={activeCase.id}>
          <p className={styles.workflow}>{activeCase.workflow}</p>
          <h3>{activeCase.title}</h3>
          <p className={styles.description}>{activeCase.description}</p>
          <a className={styles.cta} href={demoHref}>
            {copy.book}
            <span aria-hidden="true">
              <ArrowRight />
            </span>
          </a>
        </div>

        <a className={styles.staticCta} href={demoHref}>
          {copy.book} <ArrowRight aria-hidden="true" />
        </a>
      </div>

      <div className={styles.disclosure}>
        <p>{copy.disclosure[0]}</p>
        <p>{copy.disclosure[1]}</p>
      </div>
    </section>
  );
}
