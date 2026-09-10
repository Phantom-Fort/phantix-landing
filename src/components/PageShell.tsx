import React from "react";
import { Nav, Footer } from "./chrome";

/** Shared page chrome — grid wash, ambient gold bloom, Nav + Footer — for every
 *  standalone marketing page beyond the homepage. */
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-phantix-950">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-grid-faint bg-grid [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-gold-400/[0.07] blur-[140px]" />
      </div>
      <Nav />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  );
}
