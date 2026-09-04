import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Section, fadeUp } from "./Section";

const faqs = [
  {
    q: "What is Phantix?",
    a: "Phantix is a security operations platform built specifically for organizations that have one security person \u2014 or someone wearing the security hat alongside other responsibilities. It brings together everything you need: asset inventory, vulnerability assessment, penetration testing, risk management, compliance tracking, and board-ready reporting. All from one dashboard.\n\nWhat makes us different is how we handle your data. Your security records \u2014 assets, findings, risks, evidence \u2014 live in a database you control. We never copy or store your production business data. And every finding that reaches a report is verified, so you never have to explain a false positive to your CEO.",
  },
  {
    q: "Where does my security data live?",
    a: "Your security data lives in a dedicated PostgreSQL database that you provision and control. You choose where to host it \u2014 AWS, DigitalOcean, your own data center, anywhere you like. Phantix connects to this database and writes assets, scan results, findings, and risks directly into it.\n\nHere is what we do not do: we do not store your security data in a shared multi-tenant cloud where your vulnerability list sits next to another company\u2019s. We do not read, copy, or store your production business database \u2014 your ERP, CRM, or customer data never touches us. The only data we keep on our side is what\u2019s needed to run your organization: login credentials, user roles, billing information, and setup configuration.\n\nIf you ever decide to leave Phantix, you walk away with every byte of your security data. It was never ours to hold hostage.",
  },
  {
    q: "Is the Free plan really free?",
    a: "Yes. No credit card required. No time-limited trial. You get real, usable functionality from day one.\n\nWith the Free plan you can create your organization, set up dual-control approvals, inventory your assets (domains, subdomains, IPs, APIs, mobile builds), run baseline hygiene scans, analyze public GitHub repositories, and export findings in JSON or Markdown format. Email alerts are included.\n\nThere are fair-use caps on asset volume, and some features are reserved for Premium \u2014 private repository analysis, full VAPT campaigns, AI domain agents, and board-ready PDF reports. But Free is not a crippled demo. It is a genuine starter surface that helps you know your security posture before you spend any money.",
  },
  {
    q: "How is this different from buying a scanner or other security tools?",
    a: "Most security tools are point solutions. A scanner finds vulnerabilities and dumps them on your desk. A separate tool handles compliance. Another one generates reports. You end up juggling five products, each with its own login, its own data format, and its own way of deciding what matters.\n\nPhantix replaces that stack with one platform. It discovers your assets, runs assessments (including VAPT campaigns with approval gates), separates verified findings from scanner noise, maps findings to compliance frameworks, and produces reports your leadership can read \u2014 all in one place.\n\nBut the biggest difference is data ownership. With most SaaS security tools, your vulnerability data lives on their servers. If you cancel, you may not get your history back. With Phantix, your security database is yours. You host it. You control access. You keep everything even if you stop using the platform.",
  },
  {
    q: "Will AI make things up or invent fake vulnerabilities?",
    a: "No. This is a common concern with AI in security, and we designed Phantix to avoid it completely.\n\nOur AI agents \u2014 whether SOC, GRC, VAPT, threat intelligence, or asset specialist \u2014 cannot create findings on their own. They can only read and explain what the engines have already discovered and stored in your database. They help you write up findings, suggest remediation steps, explain compliance gaps to auditors, and plan investigation sequences. But they never assign risk scores, never change a finding, never bypass dual-control approvals, and never invent a vulnerability that does not exist.\n\nEvery finding that appears in a report carries a verification state: auto-verified, manually verified, unverified, or rejected. Reports prioritize verified material. Unverified noise is quarantined to an appendix. This means your board and clients see only what you can stand behind.",
  },
  {
    q: "Can my team use this without a dedicated security person?",
    a: "That is exactly the team Phantix is built for. We call it the one-person security team \u2014 the engineer, IT manager, or operations lead who also handles security because someone has to.\n\nPhantix does not assume you have a SOC with three shifts. It assumes you have one person with limited time and a growing list of responsibilities. So the platform is designed to do the heavy lifting on its own: continuous asset discovery keeps your inventory current without manual effort, verification gates separate real risks from noise so you don\u2019t waste time chasing false positives, and reports are generated automatically from verified findings so you can send them to leadership without spending hours writing them up.\n\nWhen you need help, you summon an AI agent for a specific task \u2014 triaging an alert, writing up a finding, mapping a compliance gap. It works alongside you, not ahead of you. You stay in command of every decision.",
  },
  {
    q: "Do you support Nigerian companies and NDPA?",
    a: "Yes. Our architecture was designed from the start with data privacy as a foundation, not an afterthought. This makes alignment with Nigeria\u2019s Data Protection Act (NDPA) straightforward.\n\nHere is how: your security data stays in your own database on infrastructure you choose. Our AI paths prefer local or controlled models for routine work, and external model calls strip personal data before they leave your boundary. Every action on the platform is attributed, timestamped, and stored in an append-only audit trail \u2014 so when you need to demonstrate compliance, the evidence is ready.\n\nPhantix helps you prepare for certification by mapping findings to framework controls and producing audit-ready evidence packages. But your legal certification remains your responsibility \u2014 we are the tool that helps you build the case, not the auditor who approves it.",
  },
  {
    q: "What if I need a full penetration test from human experts?",
    a: "If your assessment needs go beyond what your team can run internally, we offer engagements. These are human-led penetration tests delivered by Phantix security professionals, working on top of the same platform you use daily.\n\nThe advantage is continuity. Your external VAPT campaign is scoped, run, and reported inside your existing Phantix environment. Findings flow through the same verification gate and impact analysis as your internal assessments. You get a single source of truth for all findings \u2014 whether they came from your team or from ours \u2014 instead of stitching together reports from multiple vendors.\n\nEngagements cover full external and internal VAPT, complex application testing, mobile dynamic testing, and guided onboarding with board reporting. Contact us through the site to discuss scope and pricing.",
  },
  {
    q: "How do I get started?",
    a: "Click \u2018Get started free\u2019 on this page. You will create your organization, verify your email, and set up your first users.\n\nNext, provision a dedicated PostgreSQL database on any infrastructure you prefer \u2014 AWS RDS, DigitalOcean, a server in your office. Phantix connects to it and handles the rest. You can inventory your first assets \u2014 domains, public GitHub repositories, APIs \u2014 within minutes.\n\nRun a light assessment, see your first findings flow through the verification pipeline, and export a report. From registration to first report, many teams complete the full cycle in under an hour. Start with Free, expand into Premium when you need VAPT campaigns, AI agents, and board-ready PDFs. No card required to begin.",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-phantix-700 bg-phantix-900 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
      {children}
    </span>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <Section id="faq" className="py-20">
      <motion.div {...fadeUp}>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Answers to{" "}
            <span className="hero-accent">common questions</span>
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-slate-400">
            Straight answers {"\u2014"} no marketing gloss.
          </p>
        </div>
      </motion.div>

      <div className="mx-auto mt-14 max-w-3xl space-y-3">
        {faqs.map((faq, i) => (
          <motion.div
            key={faq.q}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: i * 0.05 }}
            className="card-edge overflow-hidden"
          >
            <button
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[15px] font-medium text-white transition-colors hover:text-gold-300"
            >
              {faq.q}
              <ChevronDown
                size={16}
                className={`shrink-0 text-slate-500 transition-transform duration-200 ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-phantix-700 px-6 pb-5 pt-4 text-[14px] leading-7 text-slate-400">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}