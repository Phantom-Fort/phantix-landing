// Pricing catalog — fetches live pricing from the backend; falls back to the
// pricing-v3 catalogue (Free / Starter / Growth / Enterprise) when offline.
// Landing layout: docs/08-frontend/contracts/landing-pricing-page.md
import { API_BASE } from "./config";

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  /** Big number above the price (e.g. "3,000"). */
  heroMetric: string;
  /** Unit under the hero number (e.g. "AI credits / month"). */
  heroUnit: string;
  monthly_ngn: number | null;
  first_month_ngn?: number | null;
  yearly_price_ngn?: number;
  yearly_note?: string;
  highlighted?: boolean;
  badge?: string;
  cta: string;
  features: string[];
}

export interface EngagementOffer {
  title: string;
  detail: string;
  tag: string;
  /** POST /demo-requests `source` (contracts/pricing-and-plans.md §3). */
  source: string;
  /** Prefill for the demo-request message field. */
  interestTag: string;
}

/**
 * Live `/billing/pricing` may return either:
 *  - the legacy single-price object (Starter list price + first-month + yearly),
 *  - or a plans array (`[{ id, name, monthly_ngn, first_month_ngn, ... }]`).
 */
interface BillingPricingResponse {
  monthly_list_price_ngn: number;
  first_month_price_ngn?: number;
  subsequent_monthly_price_ngn?: number;
  yearly_price_ngn?: number;
  first_month_discount_percent?: number;
  growth_monthly_price_ngn?: number;
  plans?: Array<Partial<PricingTier> & { id: string; monthly_ngn: number | null }>;
}

const freeFeatures = [
  "Baseline / hygiene scans & asset inventory (fair use)",
  "Integrations Hub (free connectors)",
  "JSON & CSV exports",
  "Dual control, MFA, immutable audit — free on every plan",
  "Community support",
  "Not included: threat-model projects, continuous PR, cloud posture, board PDFs",
];

const starterFeatures = [
  "1 security project / product context",
  "Full engine — six-layer code security, threat modelling, web/API assessment",
  "10 PR / MR security reviews / mo",
  "3 on-demand assessments / mo · 1 model refresh / mo",
  "PDF · Markdown · HTML reports + email support",
];

const growthFeatures = [
  "5 projects · continuous PR / MR review (fair use)",
  "Continuous / recurring pentest",
  "20 on-demand assessments / mo · 10 model refreshes / mo",
  "Multi-cloud + Kubernetes posture",
  "Compliance workbench · SOC alert console",
];

const enterpriseFeatures = [
  "Everything in Growth, at custom volume",
  "Unlimited / negotiated projects & assessments",
  "Org-wide governance & audit views",
  "Priority support · dedicated success (deal-dependent)",
  "Partner / white-label reports + custom SLA (deal-dependent)",
];

const engagementOffers: EngagementOffer[] = [
  {
    title: "Full VAPT engagement",
    detail:
      "Broad, multi-party approved assessment with correlated attack paths and verified findings.",
    tag: "Most requested",
    source: "pricing-most-requested-full-vapt",
    interestTag: "[interest:full_vapt_engagement]",
  },
  {
    title: "Dynamic mobile / AVD testing",
    detail:
      "Deep runtime analysis of Android apps and virtual devices — beyond static APK checks.",
    tag: "Project",
    source: "pricing-most-requested-dynamic-mobile",
    interestTag: "[interest:dynamic_mobile_testing]",
  },
  {
    title: "AI Pentest Agent",
    detail:
      "Autonomous, governed investigation with skills minted only after anonymization + review.",
    tag: "New",
    source: "pricing-most-requested-ai-pentest-agent",
    interestTag: "[interest:ai_pentest_agent]",
  },
  {
    title: "White-label deliverables",
    detail:
      "MSSP / partner branded reports — your logo on the board-ready package.",
    tag: "Partners",
    source: "pricing-most-requested-white-label",
    interestTag: "[interest:white_label_reports]",
  },
];

function yearsNote(monthly: number): string {
  const yearly = monthly * 10; // annual = 10× monthly
  return `NGN ${yearly.toLocaleString()}/year · pay 10 months, get 12`;
}

function yearlySavePercent(): number {
  // 10× monthly vs 12× monthly ≈ 16.7%
  return 17;
}

/**
 * A live catalog may return machine identifiers (`full_engine`, `k8s_posture`)
 * instead of human sentences. Only trust raw feature text when every item reads
 * as prose (no snake_case identifiers); otherwise fall back to the curated
 * human list for the tier.
 */
function pickFeatures(raw: string[] | undefined, curated: string[] | undefined): string[] {
  const list = Array.isArray(raw) ? raw.filter((x): x is string => typeof x === "string" && Boolean(x.trim())) : [];
  const readable = list.length > 0 && list.every((f) => !f.includes("_"));
  return readable ? list : (curated ?? []);
}

export function buildPricingTiers(raw: BillingPricingResponse | null): PricingTier[] {
  const fallback = raw ?? {
    monthly_list_price_ngn: 19_900,
    first_month_price_ngn: 9_900,
    yearly_price_ngn: 199_000,
    growth_monthly_price_ngn: 49_900,
    first_month_discount_percent: 50,
  };

  if (Array.isArray(fallback.plans) && fallback.plans.length > 0) {
    const defaults: Record<string, Partial<PricingTier>> = {
      free: {
        heroMetric: "100",
        heroUnit: "AI credits / month",
        tagline: "For teams exploring SecureGraph with no card",
        features: freeFeatures,
        cta: "Get started free",
      },
      starter: {
        heroMetric: "3,000",
        heroUnit: "AI credits / month (+ 3,000 allotment)",
        tagline: "Full engine, starter coverage",
        features: starterFeatures,
        cta: "Get started",
      },
      growth: {
        heroMetric: "10,000",
        heroUnit: "AI credits / month (+ 10,000 allotment)",
        tagline: "Continuous security for teams shipping every week",
        features: growthFeatures,
        highlighted: true,
        badge: "Most popular",
        cta: "Get started",
      },
      enterprise: {
        heroMetric: "Custom",
        heroUnit: "AI credits & volume",
        tagline: "For platforms and regulated orgs at serious scale",
        features: enterpriseFeatures,
        cta: "Talk to sales",
      },
    };
    return fallback.plans
      .filter((p) => p && typeof p.id === "string")
      .map((p) => {
        const d = defaults[p.id] ?? {};
        return {
          id: p.id,
          name: p.name ?? p.id,
          tagline: p.tagline ?? d.tagline ?? "",
          heroMetric: p.heroMetric ?? d.heroMetric ?? "—",
          heroUnit: p.heroUnit ?? d.heroUnit ?? "",
          monthly_ngn: p.monthly_ngn,
          first_month_ngn: p.first_month_ngn ?? null,
          yearly_price_ngn: p.yearly_price_ngn,
          yearly_note: p.yearly_price_ngn
            ? yearsNote(p.monthly_ngn ?? 0)
            : p.id === "free"
              ? "No card required"
              : undefined,
          highlighted: Boolean(p.highlighted ?? d.highlighted),
          badge: p.badge ?? d.badge,
          cta:
            p.cta ??
            d.cta ??
            (p.id === "free"
              ? "Get started free"
              : p.id === "enterprise"
                ? "Talk to sales"
                : "Get started"),
          features: pickFeatures(p.features, d.features),
        };
      });
  }

  const starterMonthly = fallback.monthly_list_price_ngn;
  const starterFirstMonth = fallback.first_month_price_ngn ?? 0;
  const starterYearly = fallback.yearly_price_ngn ?? starterMonthly * 10;
  const growthMonthly =
    fallback.growth_monthly_price_ngn ?? Math.round(starterMonthly * (49_900 / 19_900));

  return [
    {
      id: "free",
      name: "Free",
      tagline: "For teams exploring SecureGraph with no card",
      heroMetric: "100",
      heroUnit: "AI credits / month",
      monthly_ngn: 0,
      first_month_ngn: 0,
      yearly_note: "No card required",
      cta: "Get started free",
      features: freeFeatures,
    },
    {
      id: "starter",
      name: "Starter",
      tagline: "Full engine, starter coverage",
      heroMetric: "3,000",
      heroUnit: "AI credits / month (+ 3,000 allotment)",
      monthly_ngn: starterMonthly,
      first_month_ngn: starterFirstMonth,
      yearly_price_ngn: starterYearly,
      yearly_note: yearsNote(starterMonthly),
      cta: "Get started",
      features: starterFeatures,
    },
    {
      id: "growth",
      name: "Growth",
      tagline: "Continuous security for teams shipping every week",
      heroMetric: "10,000",
      heroUnit: "AI credits / month (+ 10,000 allotment)",
      monthly_ngn: growthMonthly,
      yearly_price_ngn: growthMonthly * 10,
      yearly_note: yearsNote(growthMonthly),
      highlighted: true,
      badge: "Most popular",
      cta: "Get started",
      features: growthFeatures,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      tagline: "For platforms and regulated orgs at serious scale",
      heroMetric: "Custom",
      heroUnit: "AI credits & volume",
      monthly_ngn: null,
      cta: "Talk to sales",
      features: enterpriseFeatures,
    },
  ];
}

export { engagementOffers, yearlySavePercent };

export const pricingFootnote =
  "Prices in Nigerian Naira (NGN), per company per month — updated live from SecureGraph billing; annual = 10× monthly. AI work is metered as credits (allowance → allotment → top-ups). Viewing, assigning and exporting results is never billed. Enterprise is a custom quote.";

const CACHE_TTL_MS = 2 * 60_000;
let _cache: { tiers: PricingTier[]; ts: number } | null = null;

export async function loadPricing(force = false): Promise<PricingTier[]> {
  const now = Date.now();
  if (!force && _cache && now - _cache.ts < CACHE_TTL_MS) return _cache.tiers;

  let tiers: PricingTier[];
  try {
    if (!API_BASE) throw new Error("no API base");
    // Prefer plans catalog when available; fall back to legacy /billing/pricing.
    let data: BillingPricingResponse | null = null;
    try {
      const plansRes = await fetch(`${API_BASE}/billing/plans`, { cache: "no-store" });
      if (plansRes.ok) {
        const plansJson = await plansRes.json();
        const list = Array.isArray(plansJson) ? plansJson : plansJson?.plans;
        if (Array.isArray(list) && list.length) {
          data = {
            monthly_list_price_ngn: 19_900,
            plans: list.map(
              (p: {
                key?: string;
                id?: string;
                name?: string;
                list_price_ngn?: number | null;
                features?: string[];
              }) => ({
                id: String(p.key ?? p.id ?? ""),
                name: p.name,
                monthly_ngn: p.list_price_ngn ?? null,
                yearly_price_ngn:
                  p.list_price_ngn != null && p.list_price_ngn > 0
                    ? p.list_price_ngn * 10
                    : undefined,
                features: p.features,
              }),
            ),
          };
        }
      }
    } catch {
      /* try legacy */
    }
    if (!data) {
      const res = await fetch(`${API_BASE}/billing/pricing`, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      data = (await res.json()) as BillingPricingResponse;
    }
    tiers = buildPricingTiers(data);
  } catch {
    tiers = buildPricingTiers(null);
  }
  _cache = { tiers, ts: now };
  return tiers;
}
