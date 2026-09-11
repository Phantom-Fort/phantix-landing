import React from "react";
import { motion } from "framer-motion";
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
        {/* De-centred (Hallmark fix): left-biased block, no eyebrow pill —
            the heading carries the page's identity on its own. */}
        <motion.div {...fadeUp} className="mt-10 max-w-2xl">
          <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
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
