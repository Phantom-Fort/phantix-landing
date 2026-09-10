import React from "react";
import { Nav, Footer } from "@/components/chrome";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import {
  Capabilities,
  Principles,
  PrivacyModel,
  HowItWorks,
  VerificationGate,
  PentestAgent,
  PlatformTeaser,
  WhyWeBuilt,
  Lifecycle,
  Coverage,
} from "@/components/sections-v3";
import { Pricing, FinalCTA } from "@/components/Pricing";
import SandboxSection from "@/components/SandboxSection";
import IntegrationsMarquee from "@/components/IntegrationsMarquee";
import { FAQ } from "@/components/FAQ";

/*
 * Landing — v3 structure (see PHANTIX_LANDING_V3_PLAN.md §5).
 *
 * Seventeen blocks, one intent each, ordered hook → proof → close. The old page
 * argued the same point four times (ProblemCards, Outcomes, BoardFluency and
 * TrustDoctrine all restated "security is fragmented and we fix it"); this one
 * states it once and spends the rest of the page on proof — real screens from
 * the running Command Centre.
 *
 * Retired: ProblemCards, OutcomesSection, BoardFluency, AIGovernance, Pipeline,
 * TrustDoctrine, ContributorsSection (its entries were literal placeholders),
 * SocialProof (no real customers to cite yet — Marquee is the honest stand-in).
 */

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-phantix-950">
      {/* Ambient page wash — gold/neutral, matching the product palette. */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-grid-faint bg-grid [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-gold-400/[0.07] blur-[140px]" />
        <div className="absolute right-[-200px] top-[45%] h-[420px] w-[420px] rounded-full bg-phantix-500/10 blur-[120px]" />
      </div>

      <Nav />
      <main className="relative">
        {/* 1 — Hook: clean centred hero over the real Command Centre */}
        <Hero />

        {/* 2 — Sector marquee */}
        <Marquee />

        {/* 3 — What you get, shown rather than described */}
        <Capabilities />

        {/* 3b — Doorway into the per-surface platform pages */}
        <PlatformTeaser />

        {/* 4 — The four non-negotiables */}
        <Principles />

        {/* 5 — Privacy model: the core differentiator */}
        <PrivacyModel />

        {/* 5b — The lifecycle a finding travels, engine by engine */}
        <Lifecycle />

        {/* 6 — The real onboarding journey */}
        <HowItWorks />

        {/* 7 — Verification gate: strongest proof point */}
        <VerificationGate />

        {/* 8 — The AI pentest agent */}
        <PentestAgent />

        {/* 8b — Why this exists: the one-person security team */}
        <WhyWeBuilt />

        {/* 8c — Full coverage matrix, grouped by outcome and labelled by plan */}
        <Coverage />

        {/* 9 — Sandbox cohort (real programme, real seat count) */}
        <SandboxSection />

        {/* 10 — Integration hub: 200+ connectors, two counter-scrolling layers */}
        <IntegrationsMarquee />

        {/* 11 — Pricing, live from the API in NGN */}
        <Pricing />

        {/* 12 — FAQ before final CTA */}
        <FAQ />

        {/* 13 — Close: the card version (demo-first, register secondary) */}
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
