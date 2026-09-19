import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Section, fadeUp } from "./Section";

const faqs = [
  {
    q: "What is SecureGraph?",
    a: "SecureGraph helps lean teams find real weaknesses, keep testing, and fix what matters.\n\nThe front door is vulnerability assessment and penetration testing (VAPT), with continuous security on Growth, remediation guidance, and reports built only from verified findings. Asset inventory, risk, and optional compliance or SOC depth sit on the same platform — one subscription, modules you can leave off.\n\nYour security records live in a database you control. We never treat your production business systems as a playground. And we never invent vulnerabilities: AI explains what the engines already found.",
  },
  {
    q: "Where does my security data live?",
    a: "Security evidence — assets, scans, findings, risks — lives in a dedicated database you provision and control (PostgreSQL). You choose the host. SecureGraph connects and writes into that store.\n\nWe do not park your vulnerability history in a shared multi-tenant lake next to another company’s. We do not read your ERP, CRM, or customer production data. Platform-side we keep what runs the org: identity, roles, billing, and configuration.\n\nIf you leave, you keep your security data. It was never ours to hold hostage.",
  },
  {
    q: "Is the Free plan really free?",
    a: "Yes — no card, no countdown trial.\n\nFree is the entry surface: create your organisation, dual-control and MFA, inventory assets within fair-use caps, run light hygiene scans, and export basic formats. You get a one-time 500 AI credits, then free open-source models if enabled.\n\nFull VAPT campaigns, continuous testing, deep cloud/SOC packs, and board PDF packages are on Starter and Growth. Free is meant to help you know your surface before you spend — not to replace a paid assessment plan.",
  },
  {
    q: "How is this different from buying a scanner?",
    a: "A scanner dumps issues on your desk. You still need someone to retest, prioritise, fix, and explain to leadership.\n\nSecureGraph starts with scoped VAPT, verifies what is real, guides remediation, and can keep testing continuously on Growth — in one place. Optional compliance mapping and SOC depth are available when you need them; they are not the reason to buy.\n\nThe other difference is ownership: your security database stays yours.",
  },
  {
    q: "Will AI invent fake vulnerabilities?",
    a: "No. Agents can only work with what the engines already stored. They help write up findings, suggest fixes, and plan investigations — they do not create findings, change scores, or bypass dual control.\n\nReports emphasise verified material. Unverified noise stays quarantined. Your board should only see what you can stand behind.",
  },
  {
    q: "Can we use this without a full security team?",
    a: "Yes. SecureGraph is built for the one-person security team — the engineer or ops lead who also owns security.\n\nIt inventories continuously, separates verified issues from noise, tracks fixes, and produces leadership-ready reports so you are not writing them from scratch at midnight.",
  },
  {
    q: "Do you support Nigerian companies and NDPA?",
    a: "Yes. Privacy is a foundation: security data stays in infrastructure you choose, AI paths prefer controlled models, and actions are audited.\n\nWe help you prepare evidence for privacy and security conversations. Formal certification (ISO, SOC 2, and so on) remains your responsibility — we are the tool that helps you build the case, not the auditor.",
  },
  {
    q: "What if I need a full human penetration test?",
    a: "Engagements put SecureGraph practitioners on the same platform you use daily. Scope, run, and report inside your environment so findings share the same verification path as your internal assessments.\n\nAsk us about full VAPT, complex application or mobile dynamic testing, and guided board reporting.",
  },
  {
    q: "How do I get started?",
    a: "Click Get started free, create your organisation, and connect a security database (bring your own Postgres, or ask about hosted options when available).\n\nInventory a small scope, run a light assessment on Free, then move to Starter when you need full VAPT and verified reporting, and to Growth when you need continuous testing. Many teams reach a first report quickly — no card required to begin.",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-phantix-700 bg-phantix-900 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
      {children}
    </span>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-phantix-800">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-[15px] font-semibold text-white md:text-base">{q}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="whitespace-pre-line pb-5 text-[14px] leading-7 text-slate-400">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <Section id="faq" className="py-20">
      <motion.div {...fadeUp} className="mx-auto max-w-2xl">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white">
          Straight answers
        </h2>
        <p className="mt-3 text-[15px] leading-7 text-slate-400">
          Assess. Keep testing. Fix what matters. Prove it — without drowning in jargon.
        </p>
        <div className="mt-10">
          {faqs.map((f) => (
            <FAQItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

export default FAQ;
