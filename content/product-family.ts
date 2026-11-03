export type ProductId =
  | "ai-workforce"
  | "verified-work"
  | "change-monitor"
  | "evidence-approval";

export type ProductDefinition = {
  id: ProductId;
  category: "platform" | "initial-product" | "capability";
  displayName: string;
  path: `/product/${string}`;
  cardDescription: string;
  artwork: string;
  originalArtwork: string;
  artworkWidth: number;
  artworkHeight: number;
  eyebrow: string;
  headlineLines: readonly [string, string];
  description: string;
  secondaryCta:
    | { label: string; targetProductId: ProductId }
    | { label: string; targetAnchor: string };
  sectionId: string;
  sectionEyebrow: string;
  sectionHeadline: string;
  sectionDescription: string;
  layers?: readonly { title: string; description: string }[];
};

export const productFamily = [
  {
    id: "ai-workforce",
    category: "platform",
    displayName: "Gappy AI Workforce",
    path: "/product/ai-workforce",
    cardDescription:
      "An AI workforce for post-booking travel operations. Requests, changes, and confirmations in one connected flow.",
    artwork: "/product-family/art-ai-workforce-glass-stack.png",
    originalArtwork: "/product-family/art-ai-workforce-glass-stack.png",
    artworkWidth: 1312,
    artworkHeight: 1199,
    eyebrow: "PLATFORM / GAPPY AI WORKFORCE",
    headlineLines: ["Travel operations,", "working as one."],
    description:
      "A connected AI Workforce for post-booking travel work. Track changes, supplier replies, evidence and human decisions in one accountable operating layer.",
    secondaryCta: {
      label: "Explore Verified Work",
      targetProductId: "verified-work",
    },
    sectionId: "operating-layer",
    sectionEyebrow: "THE OPERATING LAYER",
    sectionHeadline: "One clear record across every handoff.",
    sectionDescription:
      "From changed terms to accountable next actions, keep the work connected.",
    layers: [
      {
        title: "Requests & changes",
        description: "Capture a new request or a revised supplier condition.",
      },
      {
        title: "Latest conditions",
        description: "See what is current, outdated and still waiting for a reply.",
      },
      {
        title: "Evidence & approval",
        description: "Keep sources available for the responsible human review.",
      },
      {
        title: "Completion record",
        description: "Preserve the basis for a confirmed, auditable outcome.",
      },
    ],
  },
  {
    id: "verified-work",
    category: "initial-product",
    displayName: "Verified Work",
    path: "/product/verified-work",
    cardDescription:
      "Move agreed confirmation work forward using the latest conditions. Keep unanswered items open.",
    artwork: "/product-family/art-verified-work-glass-network.png",
    originalArtwork: "/product-family/art-verified-work-glass-network.png",
    artworkWidth: 1536,
    artworkHeight: 1024,
    eyebrow: "PRODUCT / GAPPY VERIFIED WORK",
    headlineLines: ["Know what's done.", "Know what's still open."],
    description:
      "Move one agreed confirmation workflow forward while keeping changed conditions, missing replies, evidence and human approval in view.",
    secondaryCta: { label: "See the workflow", targetAnchor: "workflow" },
    sectionId: "workflow",
    sectionEyebrow: "ONE WORKFLOW, A CLEAR STATE",
    sectionHeadline: "A change is not a confirmation.",
    sectionDescription:
      "Gappy keeps unconfirmed work visible until the latest evidence and required approval are in place.",
  },
  {
    id: "change-monitor",
    category: "capability",
    displayName: "Change Monitor",
    path: "/product/change-monitor",
    cardDescription:
      "Spot changed terms and outdated acceptance in configured sources. See what needs reconfirmation.",
    artwork: "/product-family/art-change-monitor-glass.png",
    originalArtwork: "/product-family/art-change-monitor-glass.png",
    artworkWidth: 1375,
    artworkHeight: 1144,
    eyebrow: "CAPABILITY / CHANGE MONITOR",
    headlineLines: ["Spot the change.", "Know what to recheck."],
    description:
      "Track revisions in agreed operational sources and surface what needs reconfirmation. Keep outdated acceptance separate from the latest requested conditions.",
    secondaryCta: {
      label: "Explore a change",
      targetAnchor: "change-example",
    },
    sectionId: "change-example",
    sectionEyebrow: "CHANGE DETECTION / RECONFIRMATION",
    sectionHeadline: "A new condition reopens the check.",
    sectionDescription:
      "Previous acceptance stays tied to its revision. New terms require fresh confirmation.",
  },
  {
    id: "evidence-approval",
    category: "capability",
    displayName: "Evidence & Approval",
    path: "/product/evidence-approval",
    cardDescription:
      "Trace decisions to their sources and the required human approval. Keep incomplete work visibly open.",
    artwork: "/product-family/art-evidence-approval-glass.png",
    originalArtwork: "/product-family/art-evidence-approval-glass.png",
    artworkWidth: 1536,
    artworkHeight: 1024,
    eyebrow: "CAPABILITY / EVIDENCE & APPROVAL",
    headlineLines: ["See the evidence.", "Stay in control."],
    description:
      "Bring source records, current conditions and required human decisions together before the agreed workflow can be marked complete.",
    secondaryCta: {
      label: "See the review flow",
      targetAnchor: "review-flow",
    },
    sectionId: "review-flow",
    sectionEyebrow: "EVIDENCE / REVISION-SPECIFIC APPROVAL",
    sectionHeadline: "Approval belongs to the latest conditions.",
    sectionDescription:
      "Trace each decision to its sources. Keep completion blocked when required evidence is missing.",
  },
] as const satisfies readonly ProductDefinition[];

export const productById = Object.fromEntries(
  productFamily.map((product) => [product.id, product]),
) as Record<ProductId, (typeof productFamily)[number]>;

export function getProductBySlug(slug: string) {
  return productFamily.find((product) => product.path.endsWith(`/${slug}`));
}

export const syntheticWorkItem = {
  id: "BK-2048",
  name: "Airport transfer",
  latestRequest: {
    revision: 4,
    pickupTime: "09:15",
    source: "Selected itinerary revision 4",
    receivedAt: "09:14",
  },
  previousSupplierAcceptance: {
    revision: 3,
    pickupTime: "08:30",
    state: "Superseded",
  },
  currentSupplierConfirmation: {
    revision: 4,
    label: "Supplier confirmation for 09:15",
    state: "Not received",
  },
  evidenceReview: { revision: 4, state: "Needs review" },
  completionApproval: {
    revision: 4,
    state: "Blocked",
    reason:
      "Current supplier confirmation and required evidence review are not complete.",
  },
  verifiedCompletion: false,
} as const;

export const productFamilyCopy = {
  eyebrow: "EXPLORE GAPPY AI WORKFORCE",
  headline: "One workforce. From change to verified completion.",
  cardLink: "Learn more",
  conceptCaption:
    "Illustrative product concepts · Final capabilities and supported integrations are agreed per workflow.",
  syntheticCaption:
    "Illustrative interface · Synthetic demo data · No live connections or sends",
} as const;
