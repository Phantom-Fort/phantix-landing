import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { Section, SectionHeading, fadeUp } from "./Section";
import { loadPricing } from "@/lib/pricing";
import type { PricingTier } from "@/lib/pricing";
import { cx } from "@/lib/utils";

// Detailed compare matrix — docs/08-frontend/contracts/landing-pricing-page.md §2

type Cell = "yes" | "no" | string;

interface Group {
  title: string;
  rows: { label: string; values: [Cell, Cell, Cell, Cell] }[];
}

const PLAN_NAMES = ["Free", "Starter", "Growth", "Enterprise"] as const;

const GROUPS: Group[] = [
  {
    title: "Pricing & AI credits",
    rows: [
      // Values overridden at render from live GET /billing/plans (see listPriceCells).
      { label: "List price (NGN / mo)", values: ["₦0", "₦9,900", "₦19,900", "Quote"] },
      { label: "Yearly billing", values: ["—", "10× monthly", "10× monthly", "Custom"] },
      { label: "AI credits (monthly allowance)", values: ["—", "5,000", "20,000", "Custom"] },
      { label: "AI credits (one-time onboarding)", values: ["500", "5,000", "20,000", "Custom"] },
      { label: "Credit top-ups (500 / 2k / 5k)", values: ["yes", "yes", "yes", "yes"] },
      { label: "Shared AI credit pool", values: ["yes", "yes", "yes", "yes"] },
    ],
  },
  {
    title: "Engine & AI — identical quality on every paid plan",
    rows: [
      { label: "Threat modelling & product context", values: ["1 project", "yes", "yes", "yes"] },
      { label: "Doc & architecture imports (draw.io)", values: ["yes", "yes", "yes", "yes"] },
      {
        label: "Six-layer code security (SAST / SCA / IaC / secrets / pipeline / malware)",
        values: ["no", "yes", "yes", "yes"],
      },
      { label: "Context-aware AI triage", values: ["no", "yes", "yes", "yes"] },
      { label: "Authenticated / role-aware testing", values: ["no", "yes", "yes", "yes"] },
      { label: "AI AutoFix (credit-metered)", values: ["no", "yes", "yes", "yes"] },
      { label: "Agentic branch / PR review", values: ["yes", "yes", "yes", "yes"] },
    ],
  },
  {
    title: "Scale & continuity",
    rows: [
      { label: "Projects", values: ["1", "1", "5", "Unlimited / custom"] },
      { label: "PR / MR reviews / mo", values: ["Credit-metered", "10", "Continuous", "Custom"] },
      { label: "On-demand assessments / mo", values: ["—", "3", "20", "Custom"] },
      { label: "Model refreshes / mo", values: ["—", "1", "10", "Custom"] },
      {
        label: "Web / API / mobile assessment",
        values: ["Web + API + scanner", "On demand", "Recurring", "Custom"],
      },
      { label: "Continuous PR review", values: ["no", "no", "yes", "yes"] },
      { label: "Continuous / recurring pentest", values: ["no", "no", "yes", "yes"] },
    ],
  },
  {
    title: "Cloud, posture & governance",
    rows: [
      { label: "Multi-cloud posture", values: ["no", "no", "yes", "yes"] },
      { label: "Kubernetes posture", values: ["no", "no", "yes", "yes"] },
      { label: "Blocking policies & path rules", values: ["no", "no", "yes", "yes"] },
      { label: "Compliance workbench", values: ["no", "no", "yes", "yes"] },
      { label: "SOC alert console", values: ["no", "no", "yes", "yes"] },
      { label: "Org-wide governance & audit views", values: ["no", "no", "no", "yes"] },
    ],
  },
  {
    title: "Deliverables & support",
    rows: [
      {
        label: "Reports",
        values: ["Every type & format", "Every type & format", "Every type & format", "Custom / white-label"],
      },
      {
        label: "Support",
        values: ["Community", "Email", "Guided / priority email", "Dedicated / priority"],
      },
      { label: "Uptime / commercial SLA", values: ["no", "no", "no", "Yes (deal)"] },
      {
        label: "Sales motion",
        values: ["Self-serve", "Paystack", "Paystack", "Quote"],
      },
    ],
  },
];

const PRICE_FALLBACK: Record<string, string> = {
  free: "NGN 0",
  starter: "NGN 9,900/mo",
  growth: "NGN 19,900/mo",
  enterprise: "Custom quote",
};

function priceLabel(tiers: PricingTier[], id: string): string {
  const t = tiers.find((x) => x.id === id);
  if (!t) return PRICE_FALLBACK[id] ?? "";
  if (t.monthly_ngn === null) return "Custom quote";
  if (t.monthly_ngn === 0) return "NGN 0";
  return `NGN ${t.monthly_ngn.toLocaleString()}/mo`;
}

/** Compare-table body uses ₦ formatting (same figures as the live catalog). */
function listPriceCells(tiers: PricingTier[]): [Cell, Cell, Cell, Cell] {
  const cell = (id: string, fallback: string): Cell => {
    const t = tiers.find((x) => x.id === id);
    if (!t) return fallback;
    if (t.monthly_ngn === null) return "Quote";
    if (t.monthly_ngn === 0) return "₦0";
    return `₦${t.monthly_ngn.toLocaleString()}`;
  };
  return [cell("free", "₦0"), cell("starter", "₦9,900"), cell("growth", "₦19,900"), "Quote"];
}

function CellView({ value }: { value: Cell }) {
  if (value === "yes") return <Check size={15} className="mx-auto text-emerald-400" />;
  if (value === "no") return <Minus size={13} className="mx-auto text-slate-600" />;
  return <span className="block text-xs leading-5 text-slate-300">{value}</span>;
}

export function PricingComparison() {
  const [tiers, setTiers] = useState<PricingTier[]>([]);

  useEffect(() => {
    loadPricing().then(setTiers);
  }, []);

  return (
    <Section id="compare" className="pb-24">
      <motion.div {...fadeUp}>
        <SectionHeading
          kicker="Compare plans"
          title="Every plan, side by side"
          body="Subscription plan comparison — every paid plan runs the complete security engine. Tiers differ in coverage, continuity, credits and support. Engine quality is never tier-gated."
        />
      </motion.div>

      <motion.div
        {...fadeUp}
        className="mt-12 overflow-x-auto rounded-2xl border border-phantix-700/40 bg-phantix-900/30"
      >
        <table className="w-full min-w-[820px] border-collapse text-left">
          <thead>
            <tr className="border-b border-phantix-700/40">
              <th className="px-5 py-4 align-bottom text-xs font-medium uppercase tracking-wider text-slate-500">
                Feature
              </th>
              {PLAN_NAMES.map((name, i) => (
                <th
                  key={name}
                  className={cx(
                    "px-4 py-4 text-center align-bottom",
                    i === 2 && "bg-gold-400/5",
                  )}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-display text-base font-semibold text-white">{name}</span>
                    {i === 2 && (
                      <span className="chip border-gold-400/30 bg-gold-400/10 !px-2 !py-0.5 text-[9px] text-gold-300">
                        Most popular
                      </span>
                    )}
                    <span className="font-mono text-[11px] text-slate-400">
                      {priceLabel(tiers, name.toLowerCase())}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GROUPS.map((group) => (
              <React.Fragment key={group.title}>
                <tr className="border-b border-phantix-700/20 bg-phantix-800/20">
                  <td
                    colSpan={5}
                    className="px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400"
                  >
                    {group.title}
                  </td>
                </tr>
                {group.rows.map((row) => {
                  const values =
                    row.label === "List price (NGN / mo)" ? listPriceCells(tiers) : row.values;
                  return (
                  <tr
                    key={row.label}
                    className="border-b border-phantix-700/20 last:border-b-0 hover:bg-phantix-800/10"
                  >
                    <td className="px-5 py-3 text-[13px] leading-5 text-slate-300">{row.label}</td>
                    {values.map((v, i) => (
                      <td
                        key={i}
                        className={cx("px-4 py-3 text-center", i === 2 && "bg-gold-400/5")}
                      >
                        <CellView value={v} />
                      </td>
                    ))}
                  </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </motion.div>

      <motion.p
        {...fadeUp}
        className="mx-auto mt-6 max-w-2xl text-center text-xs leading-6 text-slate-500"
      >
        Deliberate gates — dual control, MFA, audit immutability and evidence redaction — are free on
        every plan. AI work is metered as credits (allowance → allotment → top-ups); viewing, assigning
        and exporting results is never billed. Prices in NGN, per company, updated live from SecureGraph
        billing.
      </motion.p>
    </Section>
  );
}
