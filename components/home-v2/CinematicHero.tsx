"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import type { HomeLocale } from "@/content/home-v2";
import { demoRequestHref } from "@/lib/lead-forms";

const VIDEO_SRC = "/hero/gappy-ai-workforce-hero.mp4?v=20261103";
const POSTER_SRC = "/hero/gappy-ai-workforce-hero-poster.jpg?v=20261103";

const heroCopy = {
  en: {
    eyebrow: "GAPPY AI WORKFORCE",
    title: "The AI workforce for travel operations.",
    body: "From booking changes to supplier coordination, Gappy moves operational work toward verified completion—with people in control.",
    cta: "Book a demo",
    pause: "Pause background video",
    play: "Play background video",
    pauseLabel: "Pause",
    playLabel: "Play",
    reduced: "Motion is paused based on your device preference",
  },
  ja: {
    eyebrow: "GAPPY AI WORKFORCE",
    title: "旅行業務のためのAI Workforce。",
    body: "予約後の確認・再確認を、最新の条件と根拠に基づいて進める。",
    cta: "デモを予約",
    pause: "動画を一時停止",
    play: "動画を再生",
    pauseLabel: "一時停止",
    playLabel: "再生",
    reduced: "端末の設定に合わせて動画を停止しています",
  },
} as const;

export default function CinematicHero({ locale }: { locale: HomeLocale }) {
  const copy = heroCopy[locale];
  const demoHref = demoRequestHref(locale);
  const video = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const prefersReducedMotion = useRef(false);
  const [playing, setPlaying] = useState(true);
  const [failed, setFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const playWhenAllowed = useCallback(() => {
    const element = video.current;
    if (!element || manuallyPaused.current || prefersReducedMotion.current) return;
    element.defaultMuted = true;
    element.muted = true;
    element.playsInline = true;
    void element
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyPreference = () => {
      prefersReducedMotion.current = media.matches;
      setReducedMotion(media.matches);
      const element = video.current;
      if (!element) return;
      element.defaultMuted = true;
      element.muted = true;
      if (media.matches) {
        element.pause();
        element.currentTime = 0;
        setPlaying(false);
        return;
      }
      playWhenAllowed();
    };
    const resumeWhenVisible = () => {
      if (document.visibilityState === "visible") playWhenAllowed();
    };

    applyPreference();
    media.addEventListener("change", applyPreference);
    document.addEventListener("visibilitychange", resumeWhenVisible);
    window.addEventListener("pageshow", resumeWhenVisible);
    return () => {
      media.removeEventListener("change", applyPreference);
      document.removeEventListener("visibilitychange", resumeWhenVisible);
      window.removeEventListener("pageshow", resumeWhenVisible);
    };
  }, [playWhenAllowed]);

  const togglePlayback = () => {
    const element = video.current;
    if (!element || failed) return;
    if (element.paused) {
      manuallyPaused.current = false;
      playWhenAllowed();
    } else {
      manuallyPaused.current = true;
      element.pause();
    }
  };

  return (
    <section
      className={`hv-cinematic-hero${failed ? " has-video-fallback" : ""}`}
      data-home-video-hero
      aria-labelledby="home-hero"
    >
      <div
        className="hv-cinematic-media"
        style={{ backgroundImage: `url(${POSTER_SRC})` }}
        aria-hidden="true"
      >
        <video
          ref={video}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={POSTER_SRC}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onCanPlay={playWhenAllowed}
          onLoadedData={playWhenAllowed}
          onError={() => {
            setFailed(true);
            setPlaying(false);
          }}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      </div>

      <div className="hv-cinematic-copy">
        <p className="hv-cinematic-eyebrow">{copy.eyebrow}</p>
        <h1 id="home-hero">
          {locale === "ja" ? (
            <>
              <span className="hv-ja-hero-phrase">旅行業務のための</span>
              <wbr />
              <span className="hv-ja-hero-phrase">AI Workforce。</span>
            </>
          ) : copy.title}
        </h1>
        <p className="hv-cinematic-lead">{copy.body}</p>
        <a className="hv-cinematic-cta" href={demoHref}>
          {copy.cta}
          <span aria-hidden="true">
            <ArrowUpRight size={20} />
          </span>
        </a>
      </div>

      {!failed && (
        <button
          type="button"
          className="hv-video-control"
          onClick={togglePlayback}
          aria-label={playing ? copy.pause : copy.play}
          title={reducedMotion && !playing ? copy.reduced : undefined}
        >
          {playing ? <Pause size={17} /> : <Play size={17} />}
          <span>{playing ? copy.pauseLabel : copy.playLabel}</span>
        </button>
      )}
    </section>
  );
}
