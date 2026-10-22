'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import toolData from '@/public/orbit-reference/tools.json';
import { createGappyOrbit, type OrbitController, type OrbitTool, type OrbitColors, type OrbitState } from './orbit-runtime';
import styles from './orbit.module.css';

type Props = {
  showCaption?: boolean;
  showControls?: boolean;
  pauseOnHover?: boolean;
  locale?: 'en' | 'ja';
  tools?: readonly OrbitTool[];
  theme?: 'dark' | 'light';
  colors?: OrbitColors;
  periods?: [number, number];
  mobileCount?: number;
};
const defaultTools = toolData as OrbitTool[];

/** React lifecycle adapter for the supplied vanilla SVG animation runtime. */
export default function GappyIntegrationOrbit({ showCaption = true, showControls = true, pauseOnHover = true, locale = 'en', tools = defaultTools, theme = 'dark', colors, periods, mobileCount = 4 }: Props) {
  const copy = locale === 'ja' ? {
    caption: '表示しているロゴは連携イメージです。接続方法や対応範囲は、ご利用環境に合わせて個別に確認します。',
    pause: 'アニメーションを停止', resume: 'アニメーションを再開', reduced: '動きを抑えて表示中',
    alt: 'Gappy AI Workforceを中心に、Gmail、Google カレンダー、Google スプレッドシート、Notionなどを配置した連携イメージ。',
  } : {
    caption: 'Illustrative ecosystem. Tool logos are examples; connections are scoped individually.',
    pause: 'Pause animation', resume: 'Resume animation', reduced: 'Reduced motion enabled',
    alt: 'Gappy AI Workforce surrounded by illustrative tools: Gmail, Google Calendar, Google Sheets, Notion, WhatsApp, and Google Drive.',
  };
  const suffix = theme === 'light' ? '-light' : '';
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<OrbitController | null>(null);
  const [state, setState] = useState<OrbitState | null>(null);
  useEffect(() => {
    if (!host.current) return;
    const orbit = createGappyOrbit(host.current, { tools, theme, locale, colors, periods, mobileCount, pauseOnHover, onStateChange: setState });
    controller.current = orbit;
    return () => { orbit.destroy(); controller.current = null; };
  }, [tools, theme, locale, colors, periods, mobileCount, pauseOnHover]);

  return <figure className={styles.orbit} data-theme={theme}>
    <div className={styles.stage}>
      <picture className={styles.fallback} hidden={state !== null}>
        <source media="(max-width: 900px)" srcSet={`/orbit-reference/static-mobile${suffix}.svg`}/>
        {/* This SVG fallback must render before hydration and when JavaScript is disabled. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/orbit-reference/static-desktop${suffix}.svg`} alt={copy.alt} width="1200" height="620"/>
      </picture>
      <div ref={host} className={styles.runtime} data-orbit-stage/>
    </div>
    {showCaption && <figcaption className={styles.caption}>{copy.caption}</figcaption>}
    {showControls && <div className={styles.controls}>
      {state && <button type="button" disabled={state.reduced} aria-pressed={state.paused || state.reduced} onClick={() => controller.current?.setPaused(!state.paused)}>
        {state.paused || state.reduced ? <Play size={16} aria-hidden="true"/> : <Pause size={16} aria-hidden="true"/>}
        {state.reduced ? copy.reduced : state.paused ? copy.resume : copy.pause}
      </button>}
    </div>}
  </figure>;
}
