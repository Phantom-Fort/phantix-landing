import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Presentation, Eye, FileCheck, Scale, Database, Users, TrendingUp, CalendarClock, ArrowRight,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { Section, fadeUp } from "@/components/Section";
import { GlowBloom } from "@/components/effects";
import { PLATFORM_REGISTER_URL } from "@/lib/links";

const OUTCOMES = [
  { icon: Eye, title: "Visibility", body: "A current inventory of the domains, apps, APIs and critical systems that are actually in scope." },
  { icon: FileCheck, title: "Credible findings", body: "Issues that passed verification — not a raw dump of scanner output with your logo on the cover." },
  { icon: TrendingUp, title: "Business impact", body: "Every reportable finding carries what's at stake, not only a severity label an executive can't act on." },
  { icon: Presentation, title: "Board-ready packages", body: "PDF and structured reports built for leadership review — every report type and format is free on every plan." },
  { icon: Users, title: "Governance", body: "Sensitive actions can require dual control — no single person runs an unreviewed high-risk test." },
  { icon: Database, title: "Data control", body: "Findings and assets live in your own dedicated security database, and leave with you if you go." },
];

const QUESTIONS = [
  {
    q: "Will this expose our customer data?",
    a: "No. Security evidence — assets, scans, findings, risks — lives in a dedicated database you control. SecureGraph manages tenancy, identity, billing and orchestration. Your production business systems are not a scanning playground; you define scope, and nothing runs outside it.",
  },
  {
    q: "How do I know the report is real?",
    a: "Client-facing reports emphasise verified findings. Heuristic noise is held back or listed separately for transparency, rather than mixed into the executive narrative as though every line were confirmed.",
  },
  {
    q: "What do Starter and Growth actually buy?",
    a: "Depth and continuity. Free already gives you asset inventory, vulnerability and web/API scanning, VAPT campaigns, one threat-modelling project and every report type. Starter adds the full engine, mobile and code security, AI AutoFix, more projects and a monthly AI credit allowance. Growth adds continuous PR review and continuous pentesting, cloud and Kubernetes posture, blocking policies, the compliance workbench and the SOC alert console. Engagements cover the work that needs people.",
  },
  {
    q: "Can we start without committing to a project?",
    a: "Yes. Free is designed for safe onboarding — inventory a small scope, run a light assessment, see a report. You grow into Starter and Growth, and optional engagements, when the business is ready, not before.",
  },
];

export default function BusinessLeaders() {
  return (
    <PageShell>
      <Section className="pb-14 pt-28 md:pt-36">
        <BackLink />
        <motion.div {...fadeUp} className="mx-auto mt-10 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/25 bg-gold-400/10 px-4 py-2 text-xs font-medium text-gold-300">
            <Presentation size={13} /> For business leaders
          </span>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
            You don't need another dashboard. You need assurance.
          </h1>
          <p className="mt-5 text-[15px] leading-7 text-slate-400">
            Know the risk, fix what matters, and show directors and auditors evidence that stands up to a
            second question. That's the whole job — and it's what the product is organised around.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/demo" className="btn-primary btn-shine !px-6 !py-3 !text-base">
              <CalendarClock size={16} /> Request a demo
            </Link>
            <Link to="/pricing" className="btn-secondary !px-6 !py-3 !text-base">
              See pricing
            </Link>
          </div>
        </motion.div>
      </Section>

      <Section className="relative pb-20">
        <GlowBloom className="right-[-10%] top-0 h-[380px] w-[380px]" tone="gold" />
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold-400">Outcomes</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white">
            What you should expect to get
          </h2>
        </motion.div>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OUTCOMES.map((o, i) => {
            const Icon = o.icon;
            return (
              <motion.div
                key={o.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: (i % 3) * 0.06 }}
                className="card-edge card-lift p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-md border border-gold-400/30 bg-gold-400/10 text-gold-300">
                  <Icon size={18} />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-white">{o.title}</h3>
                <p className="mt-2 text-[13px] leading-6 text-slate-500">{o.body}</p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      <Section className="pb-20">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold-400">Straight answers</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white">
            The four questions we always get
          </h2>
        </motion.div>
        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {QUESTIONS.map((item, i) => (
            <motion.div
              key={item.q}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              className="card-edge p-6"
            >
              <h3 className="font-display text-[15px] font-semibold text-white">{item.q}</h3>
              <p className="mt-2.5 text-[14px] leading-7 text-slate-400">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="pb-20">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl">
          <div className="card border-gold-400/25 p-8">
            <p className="eyebrow text-gold-400">How to describe it in a meeting</p>
            <blockquote className="mt-4 border-l-2 border-gold-400/60 pl-5 font-display text-lg leading-8 text-slate-200">
              "We run a command centre for our attack surface. Assets and findings stay in our own security
              database. Scans and VAPT produce verified issues with business impact, packaged for both
              engineers and the board. Sensitive tests need dual approval. We're not handing our
              vulnerability list to a random cloud folder."
            </blockquote>
          </div>
        </motion.div>
      </Section>

      <Section className="pb-28">
        <motion.div
          {...fadeUp}
          className="final-cta relative overflow-hidden rounded-3xl border border-gold-400/30 px-8 py-14 text-center shadow-glow"
        >
          <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid opacity-30 [mask-image:radial-gradient(ellipse_60%_80%_at_50%_50%,black,transparent)]" />
          <h2 className="relative font-display text-3xl font-bold tracking-tight text-white">
            Start small. Expand when it earns it.
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-[15px] leading-7 text-slate-300">
            Begin on Free with a narrow scope, or ask for a guided pilot and we'll scope it with you.
          </p>
          <div className="relative mt-7 flex flex-wrap items-center justify-center gap-5">
            <Link to="/demo" className="btn-primary !px-7 !py-3 !text-[15px]">
              <CalendarClock size={16} /> Request a live demo
            </Link>
            <a href={PLATFORM_REGISTER_URL} className="btn-secondary !px-7 !py-3 !text-[15px]">
              Get started free <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>
      </Section>
    </PageShell>
  );
}
