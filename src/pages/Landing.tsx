import React from "react";
import { Nav, Footer } from "@/components/chrome";
import Hero from "@/components/Hero";
import { ProblemCards, TrustDoctrine, PrivacyModel, BoardFluency, Pipeline, HowItWorks, OutcomesSection, SocialProof } from "@/components/sections-marketing";
import { Capabilities, VerificationGate, AIGovernance } from "@/components/sections-product";
import { Pricing, FinalCTA } from "@/components/Pricing";

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-phantix-950">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-grid-faint bg-grid [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-phantix-600/20 blur-[140px]" />
        <div className="absolute right-[-200px] top-[45%] h-[420px] w-[420px] rounded-full bg-gold-500/8 blur-[120px]" />
      </div>

      <Nav />
      <main className="relative">
        {/* 1. Hero — outcome-first */}
        <Hero />

        {/* 2. Social proof strip */}
        <SocialProof />

        {/* 3. Problem — pain before gain */}
        <ProblemCards />

        {/* 4. Outcomes — 4 pillars, what you get */}
        <OutcomesSection />

        {/* 5. Privacy model — core differentiator */}
        <PrivacyModel />

        {/* 6. How it works — user-action steps */}
        <HowItWorks />

        {/* 7. Product depth — capability tabs (sell outcomes first) */}
        <Capabilities />

        {/* 8. Verification gate — what ships */}
        <VerificationGate />

        {/* 9. Board fluency — dual audience */}
        <BoardFluency />

        {/* 10. AI governance — trust signal */}
        <AIGovernance />

        {/* 11. Pipeline — technical proof */}
        <Pipeline />

        {/* 12. Pricing — live API, NGN */}
        <Pricing />

        {/* 13. Trust doctrine — 3 principles before the final CTA */}
        <TrustDoctrine />

        {/* 14. Final CTA */}
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
