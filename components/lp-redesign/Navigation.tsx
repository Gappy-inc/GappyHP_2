'use client';
import { useRef, useState } from 'react';
import { CTA, Logo } from './Primitives';
import type { Variant } from './content';
export default function Navigation({ variant }: {
    variant: Variant;
}) {
    const [open, setOpen] = useState(false);
    const button = useRef<HTMLButtonElement>(null);
    const links = [['#mechanism', '仕組み'], ['#proof', '製品デモ'], ['#getting-started', '導入のご相談'], ['#faq', 'よくあるご質問']];
    return <>
    <div className="lp-comparison"><span>DESIGN PREVIEW</span><nav aria-label="デザイン案の比較">{(['a', 'b', 'c'] as const).map(v => <a key={v} href={`/lp-${v}`} aria-current={variant === v ? 'page' : undefined}>案 {v.toUpperCase()}</a>)}</nav><span className="lp-comparison-note">日本語LP・比較用</span></div>
    <header className="lp-header" onKeyDown={e => { if (e.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
    } }}>
      <div className="lp-container lp-nav"><Logo /><nav className="lp-desktop-nav" aria-label="メインナビゲーション">{links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}</nav><div className="lp-nav-cta"><CTA location="header"/></div><button ref={button} type="button" className="lp-menu-toggle" aria-expanded={open} aria-controls="lp-mobile-nav" onClick={() => setOpen(!open)}>{open ? '閉じる' : 'メニュー'}<span aria-hidden="true">{open ? '−' : '+'}</span></button></div>
      <nav id="lp-mobile-nav" className="lp-mobile-nav" aria-label="モバイルナビゲーション" hidden={!open}>{links.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}<span aria-hidden="true">↗</span></a>)}<CTA location="mobile_header"/></nav>
    </header>
  </>;
}
