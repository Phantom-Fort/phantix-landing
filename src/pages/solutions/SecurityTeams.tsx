import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Terminal, CheckCircle2, ArrowRight, CalendarClock, Boxes, Radar, Crosshair,
  ShieldAlert, Scale, FileText, BellRing, GitBranch, Sparkles,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { Section, fadeUp } from "@/components/Section";
import { GlowBloom } from "@/components/effects";
import { PLATFORM_REGISTER_URL } from "@/lib/links";

const OWNERSHIP = {
  yours: [
    "The security database — assets, findings, risks, evidence",
    "Scope of tests and what enters the inventory",
    "Who may approve sensitive steps",
    "When to escalate to human review",
  ],
  ours: [
    "Engines: discovery, scan, VAPT, risk, compliance, reporting, alerts",
    "Tool execution and campaign workflows",
    "Dual-control enforcement and the audit trail",
    "AI suggestions, under governance you can inspect",
  ],
};

const QUALITY_BAR = [
  {
    title: "Verification gate",
    body: "Findings are classified auto-verified, manually verified, unverified or rejected. Client reports prioritise verified material — which is what protects your credibility with leadership.",
  },
  {
    title: "Impact analysis",
    body: "Verified findings get structured impact context — confidentiality / integrity / availability framing, in both business and technical language — before they reach a deliverable.",
  },
  {
    title: "Dual control",
    body: "Destructive or production-impacting steps can require multi-party approval. Automation does not get to skip a human gate.",
  },
  {
    title: "AI with boundaries",
    body: "Domain agents call engines. They don't invent CVEs or hosts, they don't own risk scores, and sensitive paths prefer local or minimised models.",
  },
];

const SURFACES = [
  { icon: Boxes, name: "Assets & intelligence", purpose: "Inventory, criticality, exposure context" },
  { icon: Radar, name: "Scans", purpose: "On-demand and scheduled checks" },
  { icon: Crosshair, name: "VAPT campaigns", purpose: "Multi-step assessments, web pipeline, approvals" },
  { icon: ShieldAlert, name: "Risk register", purpose: "Prioritised posture after findings land" },
  { icon: Scale, name: "Compliance", purpose: "Framework mapping and the evidence path" },
  { icon: FileText, name: "Reports & tracker", purpose: "Deliverables and remediation ownership" },
  { icon: BellRing, name: "Alerts", purpose: "Email plus WhatsApp / Telegram channels" },
  { icon: GitBranch, name: "GitHub App", purpose: "Free covers public repos, Starter adds private" },
  { icon: Sparkles, name: "AI agents", purpose: "On-demand specialists for triage and write-ups" },
];

export default function SecurityTeams() {
  return (
    <PageShell>
      <Section className="pb-14 pt-28 md:pt-36">
        <BackLink />
        <motion.div {...fadeUp} className="mx-auto mt-10 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/25 bg-gold-400/10 px-4 py-2 text-xs font-medium text-gold-300">
            <Terminal size={13} /> For security teams
          </span>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
            Built for people burned by noisy scanners
          </h1>
          <p className="mt-5 text-[15px] leading-7 text-slate-400">
            If you've spent a week disproving findings someone else's tool was confident about, you already
            know the problem isn't coverage. It's what gets through the gate — and who had to sign off.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={PLATFORM_REGISTER_URL} className="btn-primary btn-shine !px-6 !py-3 !text-base">
              Get started free <ArrowRight size={16} />
            </a>
            <Link to="/demo" className="btn-secondary !px-6 !py-3 !text-base">
              <CalendarClock size={16} /> Request a demo
            </Link>
          </div>
        </motion.div>
      </Section>

      {/* Ownership split */}
      <Section className="relative pb-20">
        <GlowBloom className="-left-32 top-1/4 h-[420px] w-[420px]" tone="gold" />
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold-400">The split</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white">
            What you control, what SecureGraph orchestrates
          </h2>
        </motion.div>
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <motion.div {...fadeUp} className="card border-gold-400/30 p-8 shadow-glow">
            <h3 className="font-display text-lg font-semibold text-white">You own</h3>
            <ul className="mt-5 space-y-3">
              {OWNERSHIP.yours.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14px] leading-6 text-slate-300">
                  <CheckCircle2 size={15} className="mt-1 shrink-0 text-gold-400" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className="card p-8">
            <h3 className="font-display text-lg font-semibold text-white">SecureGraph runs</h3>
            <ul className="mt-5 space-y-3">
              {OWNERSHIP.ours.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14px] leading-6 text-slate-300">
                  <CheckCircle2 size={15} className="mt-1 shrink-0 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* Quality bar */}
      <Section className="pb-20">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold-400">The quality bar</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white">
            Four gates between a scan and a deliverable
          </h2>
        </motion.div>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {QUALITY_BAR.map((item, i) => (
            <motion.div
              key={item.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 2) * 0.06 }}
              className="card-edge card-lift p-6"
            >
              <h3 className="font-display text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-[13.5px] leading-6 text-slate-400">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Surfaces */}
      <Section className="pb-20">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold-400">Day to day</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white">
            The surfaces you'll actually live in
          </h2>
        </motion.div>
        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SURFACES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.name}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: (i % 3) * 0.05 }}
                className="flex items-start gap-3.5 rounded-md border border-phantix-700 bg-phantix-900/60 p-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-phantix-700 text-gold-300">
                  <Icon size={16} />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-[14px] font-semibold text-white">{s.name}</p>
                  <p className="mt-0.5 text-[12.5px] leading-5 text-slate-500">{s.purpose}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
        <motion.p {...fadeUp} className="mx-auto mt-8 max-w-2xl text-center text-xs leading-5 text-slate-600">
          Not every surface is equally mature, and the product labels baseline, Starter/Growth and engagement
          scope so you can plan a pilot without marketing fiction.
        </motion.p>
      </Section>

      <Section className="pb-28">
        <motion.div
          {...fadeUp}
          className="final-cta relative overflow-hidden rounded-3xl border border-gold-400/30 px-8 py-14 text-center shadow-glow"
        >
          <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid opacity-30 [mask-image:radial-gradient(ellipse_60%_80%_at_50%_50%,black,transparent)]" />
          <h2 className="relative font-display text-3xl font-bold tracking-tight text-white">
            Pilot it on a narrow scope
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-[15px] leading-7 text-slate-300">
            Connect a security database, inventory one domain, run a light assessment, and judge the
            output. Expand when the pipeline has earned your trust.
          </p>
          <div className="relative mt-7 flex flex-wrap items-center justify-center gap-5">
            <Link to="/demo" className="btn-primary !px-7 !py-3 !text-[15px]">
              <CalendarClock size={16} /> Request a live demo
            </Link>
            <Link to="/trust" className="btn-secondary !px-7 !py-3 !text-[15px]">
              Read the trust model
            </Link>
          </div>
        </motion.div>
      </Section>
    </PageShell>
  );
}
