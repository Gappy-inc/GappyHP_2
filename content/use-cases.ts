export const useCases = [
  {
    id: "transfers",
    label: "Transfers",
    workflow: "Transfer confirmations",
    title: "Keep pickup details aligned with the plan.",
    description:
      "Check pickup time, location, passenger count and luggage requirements against the latest supplier response. Keep mismatches visible until current conditions are confirmed and any required review is complete.",
    image: "01-transfer-confirmations",
    alt: "Two fictional transport professionals reviewing a pickup plan beside a parked passenger van at an airport.",
  },
  {
    id: "hotels",
    label: "Hotels",
    workflow: "Rooming-list confirmations",
    title: "Align rooms with the latest requirements.",
    description:
      "Reconcile the latest rooming list with property responses on room type, occupancy and special requests. Separate confirmed allocations from unresolved changes before an operator approves the update.",
    image: "02-rooming-list-confirmations",
    alt: "Two fictional professionals reviewing room-allocation documents at a hotel worktable.",
  },
  {
    id: "guides",
    label: "Guides",
    workflow: "Guide confirmations",
    title: "Confirm the person behind the experience.",
    description:
      "Keep availability, assignment details and the latest schedule together. A changed time or scope needs a fresh confirmation, with unanswered requests left open for follow-up.",
    image: "03-guide-confirmations",
    alt: "A fictional travel coordinator and local guide reviewing an assignment itinerary in a daylight-filled office.",
  },
  {
    id: "dining",
    label: "Dining",
    workflow: "Dining confirmations",
    title: "Confirm the details before guests arrive.",
    description:
      "Check date, time, party size and agreed menu requirements with the venue. Keep changed arrangements or unanswered requests open until the latest response and any required approval are recorded.",
    image: "04-dining-confirmations",
    alt: "A fictional restaurant manager and travel coordinator reviewing a group dining plan before service.",
  },
  {
    id: "activities",
    label: "Activities",
    workflow: "Activity confirmations",
    title: "Reconfirm the slot, capacity and conditions.",
    description:
      "Check the latest activity date, entry time, party size and participation requirements with the provider. Flag outdated acceptance when conditions change, and keep unresolved details visible.",
    image: "05-activity-confirmations",
    alt: "Two fictional professionals checking a group-visit booking in a cultural venue reception office.",
  },
  {
    id: "venues",
    label: "Venues",
    workflow: "Venue confirmations",
    title: "Align the venue with the latest event plan.",
    description:
      "Confirm access windows, room layout, equipment and headcount with the venue. Track changes against its latest response, and keep completion blocked while required evidence or approval is missing.",
    image: "06-venue-confirmations",
    alt: "Two fictional venue and travel-operations staff checking a group arrival plan in a conference foyer.",
  },
] as const;

export const jaUseCases = [
  {
    id: "transfers",
    label: "送迎",
    workflow: "送迎の確認",
    title: "変更後の送迎条件を、確認し直す。",
    description:
      "到着時刻や集合場所の変更を、送迎事業者の最新回答と照合。再確認が必要な項目を整理します。",
    image: "01-transfer-confirmations",
    alt: "空港で、駐車中の送迎車の横で迎車計画を確認する架空の運送担当者2人。",
  },
  {
    id: "hotels",
    label: "宿泊",
    workflow: "宿泊の確認",
    title: "人数と部屋条件を、最新の回答と照合。",
    description:
      "人数・部屋タイプ・宿泊日の変更と、ホテルの回答を突き合わせ、未確定事項を残します。",
    image: "02-rooming-list-confirmations",
    alt: "ホテルのテーブルで部屋割り資料を確認する架空の担当者2人。",
  },
  {
    id: "guides",
    label: "ガイド",
    workflow: "ガイドの確認",
    title: "ガイドの承諾を、最新条件で確認。",
    description:
      "日時・言語・集合場所の変更を、ガイドの承諾内容と照合。追加で確認すべき点をまとめます。",
    image: "03-guide-confirmations",
    alt: "明るいオフィスで担当旅程を確認する、架空の旅行担当者と現地ガイド。",
  },
  {
    id: "dining",
    label: "食事",
    workflow: "食事の確認",
    title: "人数や食事条件の変更を、確認につなぐ。",
    description:
      "人数・時間・食事条件の変更を、店舗の回答と照合。未回答の項目は、確認待ちとして残します。",
    image: "04-dining-confirmations",
    alt: "営業前のレストランで団体の食事計画を確認する、架空の店舗責任者と旅行担当者。",
  },
  {
    id: "activities",
    label: "体験",
    workflow: "体験の確認",
    title: "実施条件と回答のずれを、見える形に。",
    description:
      "参加人数や実施条件を、催行事業者の回答と照合。変更点と未確定事項を整理します。",
    image: "05-activity-confirmations",
    alt: "文化施設の受付で団体予約を確認する、架空の担当者2人。",
  },
  {
    id: "venues",
    label: "会場",
    workflow: "会場の確認",
    title: "会場の利用条件を、関係者で確かめる。",
    description:
      "利用日時・人数・設備条件を、会場の回答と照合。差分と追加確認事項をまとめます。",
    image: "06-venue-confirmations",
    alt: "会議施設のロビーで団体の到着計画を確認する、架空の会場担当者と旅行業務担当者。",
  },
] as const;

export type UseCase = (typeof useCases)[number];
