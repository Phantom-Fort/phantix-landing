import React from "react";
import { Nav, Footer } from "@/components/chrome";
import Hero from "@/components/Hero";
import { Doctrine, PrivacyModel, BoardFluency, Pipeline, Modularity } from "@/components/sections-marketing";
import { Capabilities, VerificationGate, AIGovernance, EnginesGrid, Surfaces } from "@/components/sections-product";
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
        <Hero />
        <Doctrine />
        <PrivacyModel />
        <Capabilities />
        <Pipeline />
        <VerificationGate />
        <BoardFluency />
        <AIGovernance />
        <Modularity />
        <EnginesGrid />
        <Surfaces />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
