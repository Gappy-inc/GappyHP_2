"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import styles from "./ProductFamily.module.css";

export default function ProductFamilyReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [motionReady, setMotionReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMotionReady(true);
    if (reduced.matches || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.14, rootMargin: "0px 0px -7% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={root}
      className={`${styles.reveal} ${motionReady ? styles.motionReady : ""} ${visible ? styles.visible : ""} ${className}`}
    >
      {children}
    </div>
  );
}
