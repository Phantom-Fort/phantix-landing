import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, PlayCircle } from "lucide-react";
import { Section, SectionHeading, fadeUp } from "./Section";
import { pricingTiers, pricingFootnote } from "@/lib/pricing";
import { PLATFORM_REGISTER_URL, APP_DEMO_URL } from "@/lib/links";
import { cx } from "@/lib/utils";

export function Pricing() {
  return (
    <Section id="pricing" className="scroll-mt-20 py-24">
      <motion.div {...fadeUp}>
        <SectionHeading
          kicker="Pricing"
          title="Simple, per-company pricing"
          body="Every tier includes the privacy-first architecture, dual control and the immutable audit trail. Plan and rate limits bind to the company — all its users and keys share the bucket."
        />
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {pricingTiers.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.09 }}
            className={cx(
              "card relative flex flex-col p-7",
              t.highlighted && "border-gold-400/50 shadow-glow lg:-my-3 lg:py-10",
            )}
          >
            {t.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-phantix-950">
                Most popular
              </span>
            )}
            <h3 className="font-display text-xl font-bold text-white">{t.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{t.tagline}</p>
            <div className="mt-5">
              {t.monthly_ngn !== null ? (
                <>
                  <span className="font-display text-4xl font-bold text-white">₦{t.monthly_ngn.toLocaleString()}</span>
                  <span className="text-sm text-slate-500">/month</span>
                  {t.first_month_ngn != null && (
                    <p className="mt-1 text-xs text-emerald-400">First month ₦{t.first_month_ngn.toLocaleString()} — 50% off</p>
                  )}
                  {t.yearly_note && <p className="mt-0.5 text-[11px] text-slate-600">{t.yearly_note}</p>}
                </>
              ) : (
                <span className="font-display text-4xl font-bold text-white">Custom</span>
              )}
            </div>
            <ul className="mt-6 flex-1 space-y-2.5">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[13px] leading-5 text-slate-300">
                  <CheckCircle2 size={14} className={cx("mt-0.5 shrink-0", t.highlighted ? "text-gold-400" : "text-emerald-400")} />
                  {f}
                </li>
              ))}
            </ul>
            <a href={PLATFORM_REGISTER_URL} className={cx("mt-7 w-full", t.highlighted ? "btn-primary" : "btn-secondary")}>
              {t.cta} <ArrowRight size={14} />
            </a>
          </motion.div>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-5 text-slate-600">{pricingFootnote}</p>
    </Section>
  );
}

export function FinalCTA() {
  return (
    <Section className="pb-28 pt-8">
      <motion.div {...fadeUp} className="relative overflow-hidden rounded-3xl border border-gold-400/25 bg-gradient-to-b from-phantix-800/80 to-phantix-900/80 px-8 py-16 text-center shadow-glow">
        <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_80%_at_50%_50%,black,transparent)]" />
        <img src="/logo-white.png" alt="" className="mx-auto h-20 w-20 object-contain" />
        <h2 className="mt-6 font-display text-4xl font-bold tracking-tight text-white">
          Take command of your security posture
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[15px] text-slate-400">
          Explore the full console on a simulated tenant — no account needed. When you're ready,
          switch to your real organization from right inside the demo.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <a href={APP_DEMO_URL} className="btn-primary !px-7 !py-3 !text-[15px]">
            <PlayCircle size={16} /> Launch the live demo
          </a>
          <a href={PLATFORM_REGISTER_URL} className="btn-secondary !px-7 !py-3 !text-[15px]">
            Register your organization
          </a>
        </div>
      </motion.div>
    </Section>
  );
}
