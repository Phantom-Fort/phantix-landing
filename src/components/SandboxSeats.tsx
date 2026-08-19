import React from "react";
import { FlaskConical, ArrowRight } from "lucide-react";
import { SANDBOX_APPLY_URL } from "@/lib/links";

const APPLY_URL = SANDBOX_APPLY_URL;

/**
 * Landing does not collect applications.
 * CTA redirects to Command Centre public form (app.phantix.site/sandbox-apply).
 */
export default function SandboxSeats() {
  return (
    <section id="sandbox-apply" className="relative border-y border-phantix-700/30 bg-phantix-900/30 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center lg:flex-row lg:text-left">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gold-400/30 bg-gold-400/10 text-gold-300">
          <FlaskConical size={26} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-400">BETA design partners</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
            Sandbox cohort · up to <span className="text-gold-300">20</span> organizations
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
            Apply on Command Centre for staging access to Platform + product tools. Phantix staff review every
            application — no account required to submit.
          </p>
        </div>
        <div className="shrink-0">
          <a href={APPLY_URL} className="btn-primary !px-6 !py-3 !text-[15px]">
            Apply for sandbox <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
