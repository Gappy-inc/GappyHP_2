import HomePage from "@/components/home-v2/HomePageV2";
import { pageMetadata } from "@/lib/metadata";
import { homeCopy } from "@/content/home-v2";

export const metadata = pageMetadata({
  locale: "ja",
  path: "/",
  title: "Gappy | 旅行オペレーションのためのAI Workforce",
  description: `${homeCopy.ja.hero.body} 公開デモで、証拠の照合と変更からの復旧を体験できます。`,
});

export default function Page() {
  return <HomePage locale="ja" />;
}
