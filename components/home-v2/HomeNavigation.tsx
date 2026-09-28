"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import { DEMO_URL, homeCopy, type HomeLocale } from "@/content/home-v2";
import { GOODTIME_URL } from "@/lib/config";
import "./home-v2.css";

export default function HomeNavigation({ locale }: { locale: HomeLocale }) {
  const c = homeCopy[locale];
  const base = locale === "ja" ? "/ja" : "";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const company = useRef<HTMLDetailsElement>(null);
  const nav = [
    { label: c.nav[0], href: "#product-proof" },
    { label: c.nav[1], href: "#workflow" },
    { label: c.nav[2], href: `${base}/technology` },
    { label: c.nav[4], href: `${base}/resources` },
  ];
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && company.current?.open) {
        company.current.open = false;
        company.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
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
  const close = () => {
    setOpen(false);
    trigger.current?.focus();
  };
  const languages = (
    <div className="hv-languages">
      <Link
        href="/"
        aria-label="English"
        aria-current={locale === "en" ? "page" : undefined}
      >
        EN
      </Link>
      <span>/</span>
      <Link
        href="/ja/"
        aria-label="日本語"
        aria-current={locale === "ja" ? "page" : undefined}
      >
        JP
      </Link>
    </div>
  );
  return (
    <header
      className={`home-v2 hv-header ${scrolled ? "is-scrolled" : ""}`}
      data-home-chrome
    >
      <div className="hv-announcement">
        <span>{c.announcement}</span>
        <a href={DEMO_URL} title={c.external}>
          {c.viewDemo}
          <ArrowRight size={14} />
        </a>
      </div>
      <div className="hv-container hv-nav">
        <BrandMark href={`${base}/`} />
        <nav
          className="hv-desktop-nav"
          aria-label={
            locale === "ja" ? "メインナビゲーション" : "Main navigation"
          }
        >
          {nav.slice(0, 3).map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
          <details ref={company}>
            <summary>
              {c.nav[3]}
              <ChevronDown size={14} />
            </summary>
            <div>
              {c.company.map((label, i) => (
                <Link
                  key={label}
                  href={`${base}/${["about", "careers", "contact"][i]}`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </details>
          <Link href={nav[3].href}>{nav[3].label}</Link>
        </nav>
        <div className="hv-nav-actions">
          {languages}
          <a className="hv-sales-nav" href={GOODTIME_URL}>
            {c.sales}
          </a>
          <a className="hv-button" href={DEMO_URL} title={c.external}>
            {c.viewDemo}
            <ArrowRight size={16} />
          </a>
        </div>
        <button
          ref={trigger}
          className="hv-menu-toggle"
          aria-expanded={open}
          aria-controls="home-mobile-menu"
          onClick={() => setOpen(true)}
        >
          {c.menu}
          <Menu size={20} />
        </button>
      </div>
      <dialog
        id="home-mobile-menu"
        className="hv-menu"
        ref={dialog}
        onCancel={close}
        onClose={close}
        aria-label={c.menu}
      >
        <div className="hv-menu-head">
          <BrandMark href={`${base}/`} />
          <button onClick={close}>
            {c.close}
            <X size={20} />
          </button>
        </div>
        <nav aria-label={c.menu}>
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={close}>
              {n.label}
              <ArrowRight size={18} />
            </a>
          ))}
          <details>
            <summary>
              {c.nav[3]}
              <ChevronDown size={18} />
            </summary>
            {c.company.map((label, i) => (
              <Link
                key={label}
                href={`${base}/${["about", "careers", "contact"][i]}`}
                onClick={close}
              >
                {label}
              </Link>
            ))}
          </details>
        </nav>
        <div className="hv-menu-bottom">
          {languages}
          <a className="hv-button" href={DEMO_URL}>
            {c.demo}
            <ArrowRight size={17} />
          </a>
          <a href={GOODTIME_URL}>{c.sales}</a>
        </div>
      </dialog>
    </header>
  );
}
