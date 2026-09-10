import React from "react";
import { motion } from "framer-motion";
import { Scale } from "lucide-react";
import PageShell from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { Section, fadeUp } from "@/components/Section";
import { Pricing, FinalCTA } from "@/components/Pricing";
import { PricingComparison } from "@/components/PricingComparison";
import { FAQ } from "@/components/FAQ";

export default function PricingPage() {
  return (
    <PageShell>
      <Section className="pb-6 pt-28 md:pt-36">
        <BackLink />
        <motion.div {...fadeUp} className="mx-auto mt-10 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/25 bg-gold-400/10 px-4 py-2 text-xs font-medium text-gold-300">
            <Scale size={13} /> Pricing
          </span>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
            Simple pricing for continuous product security
          </h1>
          <p className="mt-5 text-[15px] leading-7 text-slate-400">
            Free is a genuine starter surface — not a countdown to a sales call. Starter adds full
            engine depth and board-ready output; Growth adds continuous security. Enterprise is
            quoted. Engagements cover the work that needs people, not just engines.
          </p>
          <p className="mt-4 text-[13px] leading-6 text-slate-500">
            Hero numbers are <strong className="font-medium text-slate-400">AI credits / month</strong> —
            the shared pool for Understand, Analyze and Remediate. Dual control, MFA and the immutable
            audit trail are free on every plan.
          </p>
        </motion.div>
      </Section>

      <Pricing showHeading={false} />
      <PricingComparison />
      <FAQ />
      <FinalCTA />
    </PageShell>
  );
}
