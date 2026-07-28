import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Layers, Fingerprint, KeyRound, FileLock2, Database, Eye, EyeOff, CheckCircle2,
  Presentation, LineChart, GraduationCap, Terminal, Radar, Crosshair, ShieldCheck,
  GitBranch, ArrowDown, Boxes, Share2, Scale, Search, Target, FileText, AlertTriangle, TrendingUp, Zap,
} from "lucide-react";
import { Section, SectionHeading, fadeUp } from "./Section";

// ── Engineering doctrine (from the Phantix Implementation Manifest) ───────────
export function Doctrine() {
  const items = [
    {
      icon: <Layers size={18} />,
      title: "Layered defence",
      body: "No single control is ever the last line of protection. Scans, verification, correlation and dual control each assume another layer can fail.",
    },
    {
      icon: <Fingerprint size={18} />,
      title: "Zero trust by default",
      body: "Every network segment is treated as hostile. Identity-based access on every request — no implicit trust from network location.",
    },
    {
      icon: <KeyRound size={18} />,
      title: "Least privilege, fail-safe",
      body: "Saltzer & Schroeder as product policy: least privilege, fail-safe defaults, complete mediation — from DB roles to service keys shown once.",
    },
    {
      icon: <FileLock2 size={18} />,
      title: "Immutable evidence",
      body: "Security logging is a first-class requirement. Dual-control audit trails carry name snapshots and export for compliance — never editable.",
    },
  ];
  return (
    <Section className="py-20">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            className="rounded-2xl border border-phantix-700/40 bg-phantix-900/50 p-5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-phantix-700/50 text-gold-400">{it.icon}</span>
            <h3 className="mt-3.5 font-display text-[15px] font-semibold text-white">{it.title}</h3>
            <p className="mt-1.5 text-[12.5px] leading-5 text-slate-400">{it.body}</p>
          </motion.div>
        ))}
      </div>
      <motion.p {...fadeUp} className="mt-6 text-center text-xs text-slate-600">
        From the Phantix engineering doctrine — the same rules that govern the platform govern the product you use.
      </motion.p>
    </Section>
  );
}

// ── Privacy model ─────────────────────────────────────────────────────────────
export function PrivacyModel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const cols = [
    {
      icon: <Eye size={20} />,
      title: "Phantix platform",
      tone: "blue" as const,
      points: ["Tenancy & auth realms", "Encrypted connection credentials", "Dual-control metadata", "Billing & audit pointers"],
    },
    {
      icon: <Database size={20} />,
      title: "Your security database",
      tone: "gold" as const,
      points: ["Assets, tags & history", "Scan results & findings", "Risks & treatments", "Compliance evidence"],
    },
    {
      icon: <EyeOff size={20} />,
      title: "Never touched",
      tone: "red" as const,
      points: ["Production business rows", "Customer PII datasets", "Application table contents", "Anything outside schema phantix"],
    },
  ];
  return (
    <Section id="privacy" className="py-28">
      <motion.div {...fadeUp}>
        <SectionHeading
          kicker="The privacy-first model"
          title={<>Your security data lives in <span className="text-gold-300">your</span> database</>}
          body="Phantix runs the tooling in the cloud — scanners, AI, orchestration — while every asset, finding, risk and evidence row is written only to a dedicated database you own."
        />
      </motion.div>
      <div ref={ref} className="mt-16 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
        {cols.map((col, i) => (
          <motion.div
            key={col.title}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: i * 0.14 }}
            className={`card relative overflow-hidden p-6 ${col.tone === "gold" ? "border-gold-400/30 shadow-glow" : ""}`}
          >
            <div className={`absolute inset-x-0 top-0 h-1 ${col.tone === "gold" ? "bg-gradient-to-r from-gold-400 to-gold-600" : col.tone === "red" ? "bg-gradient-to-r from-severity-critical/70 to-transparent" : "bg-gradient-to-r from-phantix-400 to-transparent"}`} />
            <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${col.tone === "gold" ? "bg-gold-400/15 text-gold-400" : col.tone === "red" ? "bg-severity-critical/12 text-severity-critical" : "bg-phantix-600/30 text-phantix-300"}`}>
              {col.icon}
            </div>
            <h3 className="font-display text-lg font-semibold text-white">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 size={15} className={`mt-0.5 shrink-0 ${col.tone === "red" ? "text-severity-critical/70" : "text-emerald-400"}`} />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ── Boardroom fluency (SME-first, from the manifest) ──────────────────────────
export function BoardFluency() {
  const board = [
    "Executive dashboards in business language — not log lines",
    "CVSS translated into plain business impact and cost of inaction",
    "A security programme roadmap: where you are vs where you need to be",
    "Board-ready PDF/DOCX packages on a standardized VAPT template",
  ];
  const soc = [
    "Every alert ships with full context: source, destination, payload summary",
    "Findings mapped to MITRE ATT&CK technique IDs with reproduction steps",
    "Runbooks for IT admins with no prior SOC experience",
    "Threat-hunt query library aligned to ATT&CK techniques",
  ];
  return (
    <Section className="py-24">
      <motion.div {...fadeUp}>
        <SectionHeading
          kicker="Built for SMEs"
          title="Boardroom-fluent, SOC-grade underneath"
          body="Security fails when it can't be understood. Phantix speaks both languages — the exec summary your board reads, and the evidence your engineer acts on."
        />
      </motion.div>
      <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {[
          { icon: <Presentation size={19} />, title: "For the boardroom", items: board, accent: "gold" as const },
          { icon: <Terminal size={19} />, title: "For the engineer", items: soc, accent: "blue" as const },
        ].map((col, i) => (
          <motion.div
            key={col.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`card p-7 ${col.accent === "gold" ? "border-gold-400/25" : ""}`}
          >
            <div className="flex items-center gap-3">
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${col.accent === "gold" ? "bg-gold-400/15 text-gold-400" : "bg-phantix-600/30 text-phantix-300"}`}>
                {col.icon}
              </span>
              <h3 className="font-display text-lg font-semibold text-white">{col.title}</h3>
            </div>
            <ul className="mt-5 space-y-3">
              {col.items.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm leading-6 text-slate-300">
                  <CheckCircle2 size={15} className={`mt-1 shrink-0 ${col.accent === "gold" ? "text-gold-400" : "text-emerald-400"}`} />
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ── The pipeline ──────────────────────────────────────────────────────────────
export function Pipeline() {
  const steps = [
    { icon: <Radar size={17} />, name: "Discover", desc: "subfinder · amass · ffuf · nmap — domains, subdomains, ports, web apps. 404s never enter inventory.", tools: "asset engine" },
    { icon: <Crosshair size={17} />, name: "Scan", desc: "nuclei · sqlmap · gowitness in Docker sandboxes — SSRF-guarded, one active job per org.", tools: "scanner engine" },
    { icon: <ShieldCheck size={17} />, name: "Verify", desc: "Every row stamped: auto_verified, human-verified, or held back as heuristic noise.", tools: "shared classifier" },
    { icon: <GitBranch size={17} />, name: "Correlate", desc: "Rule-based attack paths across findings — chains auto-verify, mapped to ATT&CK.", tools: "vapt engine" },
    { icon: <LineChart size={17} />, name: "Prioritize", desc: "Hybrid Likelihood×Impact + rules, then the P1–P5 priority algorithm: what to fix first.", tools: "risk engine" },
    { icon: <GraduationCap size={17} />, name: "Deliver", desc: "Verified-only PDF/DOCX packages, compliance sections, and a remediation tracker.", tools: "reporting engine" },
  ];
  return (
    <Section id="pipeline" className="py-24">
      <motion.div {...fadeUp}>
        <SectionHeading
          kicker="From domain to deliverable"
          title="One pipeline, no noise"
          body="Every engagement follows the same disciplined flow. Nothing reaches your report without passing the verification gate."
        />
      </motion.div>
      <div className="relative mt-16">
        <div className="absolute left-0 right-0 top-[26px] hidden h-px bg-gradient-to-r from-transparent via-phantix-500/50 to-transparent lg:block" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="relative"
            >
              <div className="relative z-10 mx-auto flex h-[52px] w-[52px] items-center justify-center rounded-2xl border border-phantix-600/50 bg-phantix-900 text-gold-400 shadow-card">
                {s.icon}
              </div>
              <p className="mt-3 text-center font-display text-sm font-semibold text-white">{s.name}</p>
              <p className="mt-1 text-center font-mono text-[9px] uppercase tracking-wider text-gold-400/70">{s.tools}</p>
              <p className="mt-2 text-center text-[11.5px] leading-4 text-slate-500">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ── Modularity doctrine (from the Architecture Vault) ─────────────────────────
export function Modularity() {
  return (
    <Section className="py-24">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <motion.div {...fadeUp}>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">Engineering honesty</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white">
            One monolith, eleven engines, zero spaghetti
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-slate-400">
            Phantix is a <span className="text-slate-200">modular monolith</span> — every domain is an engine
            with its own tables and contracts, communicating <span className="text-slate-200">only through events</span>.
            No engine calls another directly. An engine graduates to its own deployment only when it earns it:
            independent scaling, deployment needs, or its own team.
          </p>
          <div className="mt-6 rounded-2xl border border-gold-400/25 bg-gold-400/5 p-5">
            <p className="font-display text-lg italic leading-7 text-gold-300">
              "Optimize for modularity before distribution."
            </p>
            <p className="mt-2 text-xs text-slate-500">— the pinned principle of the Phantix Architecture Vault</p>
          </div>
        </motion.div>
        <motion.div {...fadeUp} className="card p-7">
          <p className="mb-5 text-xs font-semibold uppercase tracking-wider text-slate-500">How engines talk — events, not calls</p>
          <div className="space-y-3">
            {[
              { from: "Scanner Engine", event: "ScanCompleted", to: "Risk Engine", icon: <Crosshair size={14} /> },
              { from: "Risk Engine", event: "RiskCritical", to: "Alert Engine", icon: <ArrowDown size={14} /> },
              { from: "VAPT Engine", event: "CampaignCompleted", to: "Reporting Engine", icon: <GitBranch size={14} /> },
              { from: "Reporting Engine", event: "ReportGenerated", to: "Alert Engine", icon: <Share2 size={14} /> },
            ].map((f) => (
              <div key={f.event} className="flex items-center gap-3 rounded-xl border border-phantix-700/40 bg-phantix-950/50 px-4 py-3">
                <span className="text-gold-400">{f.icon}</span>
                <span className="text-xs text-slate-400">{f.from}</span>
                <span className="rounded-lg bg-phantix-800/80 px-2 py-1 font-mono text-[11px] font-semibold text-gold-300">{f.event}</span>
                <span className="ml-auto text-xs text-slate-400">{f.to}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-2.5 text-[11px] leading-4 text-slate-500">
            <Boxes size={13} className="shrink-0 text-gold-400" />
            PascalCase contracts on the engine bus — the same Celery/Redis substrate that runs the workers.
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

// ── Problem / pain cards (3) ───────────────────────────────────────────────────
export function ProblemCards() {
  const items = [
    { icon: <Search size={18} />, title: "Blind spots cost trust", body: "You can't protect what you can't inventory. Most organizations don't have a complete, current picture of what's exposed to the internet." },
    { icon: <AlertTriangle size={18} />, title: "Scans that cry wolf kill confidence", body: "Raw scanner output buries your team in noise. Without verification, every alert becomes background — and real threats slip through." },
    { icon: <FileText size={18} />, title: "Reports nobody reads", body: "Executives need business impact and cost of inaction. Engineers need reproduction steps. Most tools deliver neither — just PDFs full of CVEs." },
  ];
  return (
    <Section className="py-20">
      <motion.div {...fadeUp}>
        <SectionHeading kicker="The problem" title="Security fails when it's noisy, opaque, or lives on someone else's laptop" body="Three gaps every team faces — before Phantix." />
      </motion.div>
      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        {items.map((it, i) => (
          <motion.div key={it.title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, delay: i * 0.08 }} className="card p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-severity-critical/10 text-severity-critical">{it.icon}</span>
            <h3 className="mt-4 font-display text-base font-semibold text-white">{it.title}</h3>
            <p className="mt-2 text-[13px] leading-6 text-slate-400">{it.body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ── Outcomes (not features) — 4 pillars ────────────────────────────────────────
export function OutcomesSection() {
  const pillars = [
    { icon: <Search size={19} />, label: "Know", title: "See your attack surface clearly", desc: "Continuous asset inventory — domains, subdomains, IPs, APIs, mobile. One dashboard. No surprises.", plan: "Free  >  Premium intel", accent: "blue" as const },
    { icon: <Target size={19} />, label: "Test", title: "Assess apps, APIs, and hosts", desc: "Scoped scans, VAPT campaigns, web/API/infra testing. Run what you need, when you need it — with time budgets.", plan: "Premium + engagements", accent: "gold" as const },
    { icon: <TrendingUp size={19} />, label: "Prioritize", title: "Fix what matters first", desc: "Hybrid LikelihoodxImpact scoring + rules engine. P1—P5 priority queue tells you exactly where to start.", plan: "Premium", accent: "red" as const },
    { icon: <CheckCircle2 size={19} />, label: "Prove", title: "Show the board and the auditor", desc: "Verified-only PDF/DOCX reports, compliance mapping, and a remediation tracker. Walk into every meeting with confidence.", plan: "Premium + packs", accent: "green" as const },
  ];
  const colors = { blue: "from-phantix-400/20 to-transparent text-phantix-300", gold: "from-gold-400/20 to-transparent text-gold-400", red: "from-severity-critical/20 to-transparent text-severity-critical", green: "from-emerald-400/20 to-transparent text-emerald-400" };
  return (
    <Section id="outcomes" className="py-24">
      <motion.div {...fadeUp}>
        <SectionHeading kicker="What you get" title="From blind spots to board-ready reports" body="Every capability maps to an outcome your business cares about — not just another tool checkbox." />
      </motion.div>
      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <motion.div key={p.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, delay: i * 0.08 }} className="card relative overflow-hidden p-6">
            <div className={colors[p.accent]} />
            <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${p.accent === "blue" ? "bg-phantix-600/30 text-phantix-300" : p.accent === "gold" ? "bg-gold-400/15 text-gold-400" : p.accent === "red" ? "bg-severity-critical/10 text-severity-critical" : "bg-emerald-400/10 text-emerald-400"}`}>{p.icon}</span>
            <div className="mt-4 flex items-center gap-2"><span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{p.label}</span></div>
            <h3 className="mt-1 font-display text-base font-semibold text-white">{p.title}</h3>
            <p className="mt-2 text-[13px] leading-6 text-slate-400">{p.desc}</p>
            <p className="mt-3 text-[11px] font-semibold text-gold-400">{p.plan}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ── How it works (pipeline, user-action focused) ───────────────────────────────
export function HowItWorks() {
  const steps = [
    { step: "01", title: "Register & verify", desc: "Create your organization on the Platform. Email OTP verification — no phone number required." },
    { step: "02", title: "Connect security DB", desc: "Provision a dedicated Postgres. Phantix writes assets, scans, and findings there — never your production database." },
    { step: "03", title: "Discover assets", desc: "Subdomain enumeration, IP discovery, port scanning, API docs, APK uploads. One inventory, always current." },
    { step: "04", title: "Run assessments", desc: "Scoped scans and VAPT campaigns. Permissioned, sandboxed, one active job per org. No unintended exposure." },
    { step: "05", title: "Ship the report", desc: "Verified findings become a board-ready PDF. Risk scores, compliance maps, and a remediation tracker in one package." },
  ];
  return (
    <Section id="how-it-works" className="py-24">
      <motion.div {...fadeUp}>
        <SectionHeading kicker="How it works" title="Five steps from signup to delivery" body="Scoped by you. Run by the engines. No PhD required." />
      </motion.div>
      <div className="mt-16 space-y-6">
        {steps.map((s, i) => (
          <motion.div key={s.step} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.07 }} className="flex items-start gap-5 rounded-2xl border border-phantix-700/40 bg-phantix-900/40 p-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-400/15 font-display text-lg font-bold text-gold-400">{s.step}</span>
            <div>
              <h3 className="font-display text-base font-semibold text-white">{s.title}</h3>
              <p className="mt-1 text-[13px] leading-6 text-slate-400">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-slate-600">Scoped by you. Run by the engines. The record stays under your keys.</p>
    </Section>
  );
}
