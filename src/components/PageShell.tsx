import React from "react";
import { Nav, Footer } from "./chrome";

/**
 * Shared page chrome — grid wash, ambient gold bloom, Nav + Footer — for every
 * standalone marketing page beyond the homepage.
 *
 * The wash is deliberately not identical to the homepage's (Hallmark fix):
 * inner pages get a quieter, corner-anchored bloom rather than the
 * homepage's large top-centred one plus its second neutral bloom, so
 * standalone pages read as a calmer register instead of a copy-pasted hero.
 */
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-phantix-950">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-grid-faint bg-grid [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-24 right-[-160px] h-[440px] w-[440px] rounded-full bg-gold-400/[0.06] blur-[130px]" />
      </div>
      <Nav />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  );
}
