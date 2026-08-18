import React, { useEffect, useState } from "react";
import { FlaskConical, ArrowRight } from "lucide-react";
import { fetchSandboxStatus, type SandboxPublicStatus } from "@/lib/sandboxApply";

/** Landing strip: enrolled / 20 + CTA to apply. */
export default function SandboxSeats() {
  const [status, setStatus] = useState<SandboxPublicStatus | null>(null);

  useEffect(() => {
    void fetchSandboxStatus().then(setStatus);
  }, []);

  const enrolled = status?.enrolled ?? 0;
  const max = status?.max ?? 20;
  const used = status?.seatsUsed ?? 0;
  const open = status?.open !== false;
  const pct = Math.min(100, Math.round((used / max) * 100));

  return (
    <section className="relative border-y border-phantix-700/30 bg-phantix-900/30 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center lg:flex-row lg:text-left">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gold-400/30 bg-gold-400/10 text-gold-300">
          <FlaskConical size={26} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-400">BETA design partners</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
            Sandbox cohort ·{" "}
            <span className="text-gold-300">{enrolled}</span>
            <span className="text-slate-500"> / {max}</span> enrolled
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
            {open
              ? `${used} of ${max} seats held. Apply for staging access to Platform + Command Centre — staff reviews every application.`
              : `All ${max} seats are taken. Applications are closed until a seat opens.`}
          </p>
          <div className="mx-auto mt-4 h-2 max-w-md overflow-hidden rounded-full bg-phantix-800 lg:mx-0">
            <div className="h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-600 transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="shrink-0">
          {open ? (
            <a href="#sandbox-apply" className="btn-primary !px-6 !py-3 !text-[15px]">
              Apply below <ArrowRight size={16} />
            </a>
          ) : (
            <span className="chip border-slate-500/40 bg-slate-500/10 px-4 py-2 text-sm text-slate-400">Cohort full</span>
          )}
        </div>
      </div>
    </section>
  );
}
