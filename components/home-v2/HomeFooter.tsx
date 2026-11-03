import type { HomeLocale } from "@/content/home-v2";
import EnglishHomeFooter from "./EnglishHomeFooter";
import "./home-v2.css";

export default function HomeFooter({ locale }: { locale: HomeLocale }) {
  return <EnglishHomeFooter locale={locale} />;
}
