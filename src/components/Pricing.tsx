import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, PlayCircle, Crosshair, Smartphone, Sparkles, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { Section, SectionHeading, fadeUp } from "./Section";
import { loadPricing, pricingFootnote, engagementOffers } from "@/lib/pricing";
import type { PricingTier } from "@/lib/pricing";
import { PLATFORM_REGISTER_URL, APP_DEMO_URL } from "@/lib/links";
import { cx } from "@/lib/utils";
import { BrandLogo } from "@/components/BrandLogo";

const engagementIcons = [<Crosshair size={16} key="vapt" />, <Smartphone size={16} key="mobile" />, <Sparkles size={16} key="ai" />, <FileText size={16} key="white" />];

export function Pricing() {
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [engagementsOpen, setEngagementsOpen] = useState(false);
  // Always fetch the current billing price on mount (force bypasses any warm
  // cache), then re-check every 2 minutes so prices never go stale.
  useEffect(() => {
    loadPricing(true).then(setTiers);
    const t = window.setInterval(() => { loadPricing(true).then(setTiers); }, 2 * 60_000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <Section id="pricing" className="scroll-mt-20 py-24">
      <motion.div {...fadeUp}>
        <SectionHeading
          kicker="Pricing"
          title="Simple, per-company pricing"
          body="Every tier includes the privacy-first architecture, dual control and the immutable audit trail. Plan and rate limits bind to the company — all its users and keys share the bucket."
        />
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        {tiers.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.09 }}
            className={cx("card relative flex flex-col p-6", t.highlighted && "border-gold-400/50 shadow-glow md:-my-3 md:py-10")}
          >
            {t.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Most popular</span>
            )}
            <h3 className="font-display text-xl font-bold text-white">{t.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{t.tagline}</p>
            <div className="mt-5">
              {t.monthly_ngn !== null ? (
                <>
                  <span className="font-display text-4xl font-bold text-white">{t.monthly_ngn === 0 ? "Free" : `NGN ${t.monthly_ngn.toLocaleString()}`}</span>
                  {t.monthly_ngn > 0 && <span className="text-sm text-slate-500">/month</span>}
                  {t.first_month_ngn != null && t.first_month_ngn > 0 && <p className="mt-1 text-xs text-emerald-400">First month NGN {t.first_month_ngn.toLocaleString()} — {t.monthly_ngn > 0 ? `${Math.round((1 - t.first_month_ngn / t.monthly_ngn) * 100)}% off` : "free"}</p>}
                  {t.yearly_price_ngn != null && t.yearly_price_ngn > 0 && <p className="mt-0.5 text-[11px] text-slate-600">{t.yearly_note}</p>}
                </>
              ) : (
                <span className="font-display text-4xl font-bold text-white">Custom</span>
              )}
            </div>
            <ul className="mt-6 flex-1 space-y-2.5">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[13px] leading-5 text-slate-300"><CheckCircle2 size={14} className={cx("mt-0.5 shrink-0", t.highlighted ? "text-gold-400" : "text-emerald-400")} />{f}</li>
              ))}
            </ul>
            <a href={PLATFORM_REGISTER_URL} className={cx("mt-7 w-full", t.highlighted ? "btn-primary" : "btn-secondary")}>{t.cta} <ArrowRight size={14} /></a>
          </motion.div>
        ))}
      </div>

      {/* Engagements — full-width band spanning all three tiers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.55, delay: 0.15 }}
        className="mt-6 overflow-hidden rounded-2xl border border-phantix-700/40 bg-gradient-to-b from-phantix-900/70 to-phantix-900/40"
      >
        <button
          type="button"
          onClick={() => setEngagementsOpen((v) => !v)}
          className="flex w-full items-center gap-4 px-6 py-5 text-left transition-colors hover:bg-phantix-800/30"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-400/15 text-gold-400">
            <Crosshair size={19} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-lg font-bold text-white">Project engagements</span>
            <span className="block text-sm text-slate-400">
              When you need a full test or hands-on experts — full VAPT, dynamic mobile, AI Pentest Agent, white-label deliverables.
            </span>
          </span>
          <span className="hidden shrink-0 sm:block">
            <span className="chip border-gold-400/30 bg-gold-400/10 text-gold-300">Request a quote</span>
          </span>
          <span className="shrink-0 text-slate-500">{engagementsOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</span>
        </button>

        {engagementsOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-phantix-700/40"
          >
            <div className="grid grid-cols-1 gap-4 px-6 py-6 sm:grid-cols-2 lg:grid-cols-4">
              {engagementOffers.map((o, i) => (
                <div key={o.title} className="rounded-xl border border-phantix-700/40 bg-phantix-950/50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-400/12 text-gold-400">{engagementIcons[i % engagementIcons.length]}</span>
                    {o.tag && <span className="chip text-[9px] text-gold-300 bg-gold-400/10 border-gold-400/20">{o.tag}</span>}
                  </div>
                  <h4 className="mt-3 font-display text-sm font-semibold text-white">{o.title}</h4>
                  <p className="mt-1 text-xs leading-5 text-slate-400">{o.detail}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 border-t border-phantix-700/40 px-6 py-4">
              <p className="text-xs text-slate-500">
                Engagements are quoted per project — scoped with a security engineer. Not a self-serve subscription.
              </p>
              <a
                href={PLATFORM_REGISTER_URL}
                className="btn-primary ml-auto !py-2 text-sm"
              >
                Request a quote <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </motion.div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-5 text-slate-600">{pricingFootnote}</p>
    </Section>
  );
}

export function FinalCTA() {
  return (
    <Section className="pb-28 pt-8">
      <motion.div
        {...fadeUp}
        className="final-cta relative overflow-hidden rounded-3xl border border-gold-400/30 px-8 py-16 text-center shadow-glow"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid opacity-30 [mask-image:radial-gradient(ellipse_60%_80%_at_50%_50%,black,transparent)]" />
        <BrandLogo className="relative mx-auto h-20 w-20" lightSrc="/logo-white.png" darkSrc="/logo-white.png" />
        <h2 className="relative mt-6 font-display text-4xl font-bold tracking-tight text-white">Take command of your security posture</h2>
        <p className="relative mx-auto mt-4 max-w-xl text-[15px] leading-7 text-slate-300">
          Explore the product on a simulated demo tenant — no account needed. Ready for real work? Register on the Platform and issue login links for your operators to access the Application.
        </p>
        <div className="relative mt-7 flex flex-wrap items-center justify-center gap-3.5">
          <a href={APP_DEMO_URL} className="btn-primary !px-7 !py-3 !text-[15px]"><PlayCircle size={16} /> Launch the live demo</a>
          <a href={PLATFORM_REGISTER_URL} className="btn-secondary !px-7 !py-3 !text-[15px]">Register your organization</a>
        </div>
        <p className="relative mt-5 text-[12px] leading-5 text-slate-400">
          Registration happens on <strong>platform.phantix.site</strong>. After setup, you generate login links from the Platform — your team signs in on <strong>app.phantix.site</strong>.
        </p>
      </motion.div>
    </Section>
  );
}
