"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import type { HomeLocale } from "@/content/home-v2";

const HomeFooter = dynamic(() => import("./HomeFooter"));

export default function FooterSelector({
  locale,
  children,
}: {
  locale: HomeLocale;
  children: ReactNode;
}) {
  const pathname = usePathname();
  return (
    <>
      {pathname === "/" || pathname === "/ja" || pathname === "/ja/"
        ? <HomeFooter locale={locale} />
        : children}
    </>
  );
}
