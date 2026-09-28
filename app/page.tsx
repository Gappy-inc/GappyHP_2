import HomePage from "@/components/home-v2/HomePageV2";
import { pageMetadata } from "@/lib/metadata";
import { homeCopy } from "@/content/home-v2";

export const metadata = pageMetadata({
  locale: "en",
  path: "/",
  title: "Gappy — Keep every tour ready to operate.",
  description: homeCopy.en.hero.body,
});

export default function Page() {
  return <HomePage locale="en" />;
}
