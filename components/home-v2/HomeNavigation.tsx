"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import { DEMO_URL, type HomeLocale } from "@/content/home-v2";
import { demoRequestHref } from "@/lib/lead-forms";
import "./home-v2.css";

type HomeNavigationMode = "auto" | "light";

const HOME_HEADER_ANCHORS = new Set(["product-proof", "product-family"]);

const navigationCopy = {
  en: {
    product: "Product",
    technology: "Technology",
    company: "Company",
    resources: "Resources",
    companyLinks: ["About", "Careers", "Contact"],
    book: "Book a demo",
    announcement: "Explore the interactive product demo",
    viewDemo: "View demo",
    demoLink: "Explore the interactive demo",
    external: "Opens the public demo site",
    main: "Main navigation",
    mobile: "Mobile navigation",
    menu: "Open menu",
    close: "Close menu",
    closeText: "Close",
  },
  ja: {
    product: "製品",
    technology: "テクノロジー",
    company: "会社情報",
    resources: "資料・記事",
    companyLinks: ["会社概要", "採用情報", "お問い合わせ"],
    book: "デモを予約",
    announcement: "インタラクティブな製品デモを見る",
    viewDemo: "デモを見る",
    demoLink: "インタラクティブデモを見る",
    external: "外部の公開デモサイトへ移動します",
    main: "メインナビゲーション",
    mobile: "モバイルナビゲーション",
    menu: "メニューを開く",
    close: "メニューを閉じる",
    closeText: "閉じる",
  },
} as const;

export default function HomeNavigation({
  locale,
  mode = "auto",
}: {
  locale: HomeLocale;
  mode?: HomeNavigationMode;
}) {
  const copy = navigationCopy[locale];
  const demoHref = demoRequestHref(locale);
  const base = locale === "ja" ? "/ja" : "";
  const staticLight = mode === "light";
  const homeAnchorPrefix = staticLight ? "/" : "";
  const productAnchor = locale === "ja" ? "product-family" : "product-proof";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const company = useRef<HTMLDetailsElement>(null);
  const primaryNav = [
    { label: copy.product, href: `${homeAnchorPrefix}#${productAnchor}` },
    { label: copy.technology, href: `${base}/technology` },
  ];
  const resourceNav = { label: copy.resources, href: `${base}/resources` };
  const nav = [...primaryNav, resourceNav];

  useEffect(() => {
    if (company.current) company.current.open = false;
    const onScroll = () => {
      const hero = document.querySelector<HTMLElement>("[data-home-video-hero]");
      setScrolled(hero ? hero.getBoundingClientRect().bottom <= 80 : window.scrollY > 24);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && company.current?.open) {
        company.current.open = false;
        company.current.querySelector("summary")?.focus();
      }
    };
    if (!staticLight) {
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    document.addEventListener("keydown", onKey);
    return () => {
      if (!staticLight) window.removeEventListener("scroll", onScroll);
      document.removeEventListener("keydown", onKey);
    };
  }, [staticLight]);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
    const previousOverflow = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    const onResize = () => {
      if (window.innerWidth >= 1200) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  useEffect(() => {
    if (staticLight) return;
    let frame = 0;
    let timers: number[] = [];
    const alignTarget = () => {
      const targetId = window.location.hash.slice(1);
      if (!HOME_HEADER_ANCHORS.has(targetId)) return;
      const target = document.getElementById(targetId);
      if (!target) return;
      frame = window.requestAnimationFrame(() => {
        target.scrollIntoView({ block: "start" });
        if (target.id === "product-proof") {
          const lightHeaderHeight =
            window.innerWidth >= 1200 ? 80 : window.innerWidth >= 768 ? 68 : 64;
          window.scrollBy({
            top: target.getBoundingClientRect().top - lightHeaderHeight,
            behavior: "auto",
          });
        }
      });
    };
    const scheduleAlignment = () => {
      timers.forEach(window.clearTimeout);
      timers = [0, 250, 750].map((delay) =>
        window.setTimeout(alignTarget, delay),
      );
    };
    scheduleAlignment();
    window.addEventListener("hashchange", scheduleAlignment);
    return () => {
      window.cancelAnimationFrame(frame);
      timers.forEach(window.clearTimeout);
      window.removeEventListener("hashchange", scheduleAlignment);
    };
  }, [staticLight]);

  const close = () => {
    setOpen(false);
    trigger.current?.focus();
  };

  const languages = (
    <div className="hv-languages">
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- Locale switching must re-run the document-level SSR. */}
      <a href="/" aria-label="English" aria-current={locale === "en" ? "page" : undefined}>
        EN
      </a>
      <span>/</span>
      <a href="/ja/" aria-label="日本語" aria-current={locale === "ja" ? "page" : undefined}>
        JP
      </a>
    </div>
  );

  const light = staticLight || scrolled;
  return (
    <header
      className={`home-v2 hv-header hv-en-header ${light ? "is-scrolled" : ""}`}
      data-header-mode={mode}
      data-home-chrome
      data-locale={locale}
    >
      <div className="hv-announcement" aria-hidden={staticLight || undefined}>
        <a href={DEMO_URL} title={copy.external} tabIndex={staticLight ? -1 : undefined}>
          <span>{copy.announcement}</span>
          <span>{copy.viewDemo}<ArrowUpRight size={15} /></span>
        </a>
      </div>
      <div className="hv-container hv-nav hv-en-nav">
        <nav className="hv-en-left-nav" aria-label={copy.main}>
          {primaryNav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          <details ref={company} suppressHydrationWarning>
            <summary>{copy.company}<ChevronDown size={14} /></summary>
            <div>
              {copy.companyLinks.map((label, index) => (
                <Link key={label} href={`${base}/${["about", "careers", "contact"][index]}`}>{label}</Link>
              ))}
            </div>
          </details>
        </nav>

        <div className="hv-nav-brand"><BrandMark href={`${base}/`} /></div>

        <div className="hv-nav-actions hv-desktop-actions">
          <Link href={resourceNav.href}>{resourceNav.label}</Link>
          {languages}
          <a className="hv-header-book" href={demoHref}>
            {copy.book}
            <span aria-hidden="true"><ArrowUpRight size={17} /></span>
          </a>
        </div>

        <div className="hv-nav-actions hv-mobile-actions">
          <a className="hv-header-book" href={demoHref}>{copy.book}</a>
          <button
            ref={trigger}
            className="hv-menu-toggle"
            type="button"
            aria-label={copy.menu}
            aria-expanded={open}
            aria-controls="home-mobile-menu"
            onClick={() => setOpen(true)}
          >
            <Menu size={27} />
          </button>
        </div>
      </div>

      <dialog
        id="home-mobile-menu"
        className="hv-menu hv-en-menu"
        ref={dialog}
        onCancel={close}
        onClose={close}
        aria-label={copy.mobile}
      >
        <div className="hv-menu-head">
          <BrandMark href={`${base}/`} />
          <button type="button" onClick={close} aria-label={copy.close}>
            {copy.closeText}<X size={20} />
          </button>
        </div>
        <nav aria-label={copy.mobile}>
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={close}>{item.label}<ArrowRight size={18} /></a>
          ))}
          <details suppressHydrationWarning>
            <summary>{copy.company}<ChevronDown size={18} /></summary>
            {copy.companyLinks.map((label, index) => (
              <Link
                key={label}
                href={`${base}/${["about", "careers", "contact"][index]}`}
                onClick={close}
              >
                {label}
              </Link>
            ))}
          </details>
        </nav>
        <div className="hv-menu-bottom">
          {languages}
          <a className="hv-button" href={demoHref}>{copy.book}<ArrowUpRight size={17} /></a>
          <a href={DEMO_URL} title={copy.external}>{copy.demoLink}<ArrowUpRight size={15} /></a>
        </div>
      </dialog>
    </header>
  );
}
