import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  Radar,
  Crosshair,
  ShieldAlert,
  Scale,
  Database,
  Lock,
  Eye,
  FileCheck,
  Terminal,
  Check,
  Maximize2,
  ArrowRight,
  Sparkles,
  Boxes,
  Search,
  GitBranch,
  LineChart,
  FileText,
  UserCheck,
  Signature,
  Ban,
} from "lucide-react";
import { PLATFORM_PAGES } from "@/lib/platform-content";
import { Section, fadeUp } from "./Section";
import { GlowBloom } from "./effects";
import PrivacyDiagram from "./PrivacyDiagram";
import { useTheme } from "@/lib/theme";
import { sceneImg } from "@/lib/scene-image";

/*
 * v3 landing sections — luminous dark-tech.
 *
 * Two rules run through all of this (v3 plan §2b):
 *   1. Anything representing the product uses the product's own card anatomy —
 *      rounded-md, zinc border, near-black fill, 1px rings instead of blooms.
 *   2. Every product visual is a real screenshot of the running Command Centre,
 *      captured from the demo tenant. No mockups, no invented numbers.
 */

/** Pill badge above a section heading — the Agex/JumpBot signature. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-phantix-700 bg-phantix-900 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
      {children}
    </span>
  );
}

/** Centred heading with a gold accent tail, matching the hero's two-tone rule. */
function Heading({
  eyebrow,
  lead,
  accent,
  body,
}: {
  eyebrow: React.ReactNode;
  lead: string;
  accent?: string;
  body?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {lead}
        {accent && <span className="hero-accent"> {accent}</span>}
      </h2>
      {body && <p className="mt-4 text-[15px] leading-7 text-slate-400">{body}</p>}
    </div>
  );
}

function CountUp({ to, duration = 1.4 }: { to: number; duration?: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(reduce ? to : 0);
  const started = useRef(false);

  useEffect(() => {
    if (reduce) {
      setValue(to);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();

        const t0 = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - t0) / (duration * 1000));
          // easeOutExpo — fast arrival, long settle, matching the page's easing
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          setValue(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [to, duration, reduce]);

  return <span ref={ref} className="tabular-nums">{value}</span>;
}

/**
 * Slow vertical drift as an element crosses the viewport. The image is scaled
 * slightly past its frame so the drift can never expose an edge.
 */
function useDrift(distance = 16) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return { ref, y: reduce ? undefined : y, scale: reduce ? 1 : 1.06 };
}

function Shot({ name, alt, className = "" }: { name: string; alt: string; className?: string }) {
  const { theme } = useTheme();
  const drift = useDrift(16);
  return (
    <div
      ref={drift.ref}
      className={`overflow-hidden rounded-md border border-phantix-700 shadow-[0_0_0_1px_rgba(232,181,77,0.10),0_1px_2px_0_rgba(0,0,0,0.5)] ${className}`}
    >
      <motion.div style={{ y: drift.y, scale: drift.scale }}>
        {sceneImg(name, theme, alt)}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */

/** 1. Capability cards, each carrying a real slice of the product. */
export function Capabilities() {
  const { theme } = useTheme();
  const cards = [
    {
      icon: Radar,
      title: "See every asset you own",
      body: "Domains, subdomains, IPs, APIs and mobile builds discovered continuously — not a spreadsheet someone updates quarterly.",
      shot: "assets",
      alt: "Attack-surface inventory listing discovered domains and APIs with verification state",
    },
    {
      icon: Crosshair,
      title: "Test it like an attacker would",
      body: "Approval-gated VAPT campaigns run the full pipeline across every engine, ending in staff-verified findings.",
      shot: "vapt",
      alt: "VAPT campaigns view showing scoped assessments and their progress",
    },
    {
      icon: ShieldAlert,
      title: "Know what to fix first",
      body: "Risks are scored with explainable Likelihood×Impact and ordered P1–P5, so the queue reflects real exposure.",
      shot: "risks",
      alt: "Risk register ordered by priority with P1 to P5 scoring and treatment states",
    },
    {
      icon: Scale,
      title: "Prove it to the board",
      body: "Compliance mapping and board-ready reports built from verified findings only — evidence, not adjectives.",
      shot: "compliance",
      alt: "Compliance view mapping verified findings to framework controls",
    },
  ];

  return (
    <Section id="capabilities" className="py-20">
      <motion.div {...fadeUp}>
        <Heading
          eyebrow="What you get"
          lead="From blind spots to"
          accent="board-ready proof"
          body="Four surfaces, one command centre. Every screen below is the real product, not a mockup."
        />
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.article
              key={c.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              className="card-edge card-lift group overflow-hidden p-7"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-gold-400/30 bg-gold-400/10 text-gold-300">
                  <Icon size={18} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold text-white">{c.title}</h3>
                  <p className="mt-2 text-[14px] leading-6 text-slate-400">{c.body}</p>
                </div>
              </div>

              {/* The fragment is magnified past the app's top bar and pushed down
                  so the card reads as a window onto the product rather than a
                  framed screenshot — at 100% the dashboard chrome was unreadable
                  at card width. Click opens the full-resolution capture. */}
              <a
                href={`/scenes/product-${c.shot}.jpg`}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open full-size screenshot: ${c.title}`}
                className="group/shot relative mt-7 block h-[228px] overflow-hidden rounded-md border border-phantix-700 transition-colors hover:border-gold-400/40"
              >
                {sceneImg(c.shot, theme, c.alt, "absolute inset-x-0 top-0 w-[150%] -translate-y-[5%]")}
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-phantix-900 to-transparent" />
                <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-phantix-600/60 bg-phantix-950/90 px-2.5 py-1 text-[10px] font-medium text-slate-300 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover/shot:opacity-100">
                  <Maximize2 size={11} /> Full size
                </span>
              </a>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}

/** 2. Four principles — stated at mechanism altitude. The hero names the claims
 *    and PrivacyModel quotes the notice verbatim; these cards explain what each
 *    guarantee concretely prevents, so no sentence repeats elsewhere on the page. */
export function Principles() {
  const items = [
    {
      icon: Database,
      title: "Your database",
      body: "Every company gets its own Postgres — your findings never share a table with anyone else's.",
    },
    {
      icon: Lock,
      title: "Dual control",
      body: "No account can approve its own sensitive action; an initiator and a separate authorizer are both required.",
    },
    {
      icon: FileCheck,
      title: "Verified only",
      body: "Heuristic probes stay quarantined in a report appendix — severity rollups count verified findings only.",
    },
    {
      icon: Eye,
      title: "Full audit trail",
      body: "Every mutation is attributed, timestamped and append-only, so auditors can replay the full history.",
    },
  ];

  return (
    <Section id="principles" className="pb-20">
      <motion.div {...fadeUp}>
        <Heading
          eyebrow="The four non-negotiables"
          lead="Guarantees with a "
          accent="mechanism attached"
          body="Each promise names the control that enforces it — your data stays yours, actions stay two-person, findings stay verified, history stays replayable."
        />
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <motion.div
              key={it.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="card-edge card-lift p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-md border border-gold-400/30 bg-gold-400/10 text-gold-300">
                <Icon size={18} />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-white">{it.title}</h3>
              <p className="mt-2 text-[13px] leading-6 text-slate-500">{it.body}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

/** 3. Privacy model — the page's core argument, split copy + artwork. */
export function PrivacyModel() {
  return (
    <Section id="privacy-first" className="relative py-20">
      <GlowBloom className="-left-32 top-1/4 h-[420px] w-[420px]" tone="gold" />

      <div className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <motion.div {...fadeUp}>
          <Eyebrow>Privacy model</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Your security data never{" "}
            <span className="hero-accent">leaves your database</span>
          </h2>
          <p className="mt-5 text-[15px] leading-7 text-slate-400">
            SecureGraph provisions a dedicated Postgres you control, and writes assets, scans and findings
            there. Production business data is never read, copied or stored.
          </p>

          <ul className="mt-8 space-y-3">
            {[
              "Findings and assets live only in your dedicated security database.",
              "We store account, billing and setup state only.",
              "Sensitive mutations require dual-control approval.",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3 text-[14px] leading-6 text-slate-300">
                <Check size={16} className="mt-0.5 shrink-0 text-gold-400" />
                {line}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs text-slate-600">
            Wording taken verbatim from the Platform's own privacy notice — not a marketing paraphrase.
          </p>
        </motion.div>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="relative">
          <PrivacyDiagram />
        </motion.div>
      </div>
    </Section>
  );
}

/** 4. How it works — mirrors the real Platform onboarding, not a marketing abstraction. */
export function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Register & verify",
      body: "Create your organization on the Platform. Email OTP verification — no phone number required.",
    },
    {
      n: "02",
      title: "Connect your security database",
      body: "Provision a dedicated Postgres. SecureGraph writes assets, scans and findings there — never your production database.",
    },
    {
      n: "03",
      title: "Discover, assess, report",
      body: "Run discovery and scoped assessments, then ship a board-ready report built from verified findings.",
    },
  ];

  return (
    <Section id="how-it-works" className="py-20">
      <motion.div {...fadeUp}>
        <Heading eyebrow="How it works" lead="Three steps to a" accent="verified report" />
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: i * 0.09 }}
            className="card-edge card-lift p-7"
          >
            <span className="font-mono text-sm font-semibold text-gold-400">{s.n}</span>
            <h3 className="mt-3 font-display text-lg font-semibold text-white">{s.title}</h3>
            <p className="mt-2 text-[14px] leading-6 text-slate-400">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/** 5. The verification gate — the strongest single proof point on the page. */
export function VerificationGate() {
  const funnel = [
    { value: 19, label: "After dedupe", tone: "text-slate-300" },
    { value: 14, label: "After verification", tone: "text-gold-300" },
    { value: 5, label: "Excluded as noise", tone: "text-slate-500" },
  ];

  return (
    <Section className="py-20">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <motion.div {...fadeUp}>
          <Eyebrow>False-positive control</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            If it isn't verified, it{" "}
            <span className="hero-accent">doesn't ship</span>
          </h2>
          <p className="mt-5 text-[15px] leading-7 text-slate-400">
            Every scan result carries a verification state. Risks skip non-reportable noise, compliance
            maps verified signals only, and executive reports collate auto- and human-verified findings
            exclusively. Heuristic probes are held to an appendix — never in your severity rollups.
          </p>
          <p className="mt-6 inline-flex rounded-md border border-gold-400/25 bg-gold-400/[0.08] px-3 py-2 font-mono text-[12px] text-gold-300">
            REPORT_REQUIRE_VERIFIED_FINDINGS
          </p>
        </motion.div>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
          <div className="grid grid-cols-3 gap-3">
            {funnel.map((f, i) => (
              <motion.div
                key={f.label}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className="card-edge p-5 text-center"
              >
                <p className={`font-display text-4xl font-semibold ${f.tone}`}>
                  <CountUp to={f.value} />
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {f.label}
                </p>
              </motion.div>
            ))}
          </div>
          <Shot
            name="reports"
            alt="Report library showing board-ready deliverables built from verified findings"
            className="mt-4"
          />
        </motion.div>
      </div>
    </Section>
  );
}

/** 6. The autonomous pentest agent — the headline capability. */
export function PentestAgent() {
  return (
    <Section id="ai" className="relative py-20">
      <GlowBloom className="right-[-10%] top-0 h-[380px] w-[380px]" tone="gold" />

      <motion.div {...fadeUp}>
        <Heading
          eyebrow={
            <>
              <Terminal size={12} /> AI pentest agent
            </>
          }
          lead="An agent that earns"
          accent="every skill it uses"
          body="A chief agent routes to specialists — VAPT, SOC, GRC, Threat Intel, Asset. AI orchestrates; the engines execute. It never discovers a vulnerability without a finding ID."
        />
      </motion.div>

      <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="mt-14">
        <Shot
          name="agent"
          alt="The SecureGraph Agent routing to VAPT, SOC, GRC, Threat Intel and Asset specialists, with dual-control required"
        />
        {/* The screenshot names the model behind the router — answer the
            data-residency question it raises right here, not a card below. */}
        <p className="mx-auto mt-4 max-w-2xl text-center text-xs leading-5 text-slate-500">
          Model calls route through a provider-agnostic router: prompts are PII-stripped before any
          external call, and findings are written only to your Postgres.
        </p>
      </motion.div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          ["Dual-control required", "Sensitive agent actions need an initiator and an authorizer."],
          ["PII redacted", "Personal data is stripped before any provider call."],
          ["Never rewrites findings", "The agent can read and explain, but never changes a finding or a risk score."],
        ].map(([t, b], i) => (
          <motion.div
            key={t}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 + i * 0.06 }}
            className="card-edge p-5"
          >
            <p className="font-display text-sm font-semibold text-white">{t}</p>
            <p className="mt-1.5 text-[13px] leading-6 text-slate-500">{b}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/** 7. Platform teaser — the homepage's doorway into the per-surface deep dives. */
export function PlatformTeaser() {
  return (
    <Section id="platform" className="py-20">
      <motion.div {...fadeUp}>
        <Heading
          eyebrow="The platform"
          lead="Four surfaces, tested"
          accent="the same disciplined way"
          body="Web, API, mobile and cloud testing run through one pipeline and land in one register — so a finding means the same thing wherever it came from."
        />
      </motion.div>

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PLATFORM_PAGES.map((p, i) => (
          <motion.div key={p.slug} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.06 }}>
            <Link to={`/platform/${p.slug}`} className="card-edge card-lift group block h-full p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-md border border-gold-400/30 bg-gold-400/10 text-gold-300">
                {p.icon}
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-white group-hover:text-gold-300">
                {p.navLabel}
              </h3>
              <p className="mt-2 text-[13px] leading-6 text-slate-500">{p.headline}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 opacity-0 transition-opacity group-hover:opacity-100">
                Explore <ArrowRight size={12} />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div {...fadeUp} className="mt-6">
        <a
          href="#ai"
          className="card-edge card-lift group flex flex-wrap items-center gap-4 p-6 sm:flex-nowrap"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-gold-400/30 bg-gold-400/10 text-gold-300">
            <Sparkles size={18} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-base font-semibold text-white group-hover:text-gold-300">
              AI pentest agent
            </span>
            <span className="mt-1 block text-[13px] leading-6 text-slate-500">
              Domain specialists that route to the engines — and never report a vulnerability without a finding ID.
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-gold-400">
            See how it works <ArrowRight size={12} />
          </span>
        </a>
      </motion.div>
    </Section>
  );
}

/**
 * 9. The lifecycle a finding travels — discovery through delivery.
 *
 * Distinct from HowItWorks, which is the onboarding path. This is what happens
 * to a single finding once the engines are running, with the engine that owns
 * each stage named so the claim is checkable.
 */
export function Lifecycle() {
  const stages = [
    { n: "01", icon: Search, name: "Discover", engine: "asset engine", body: "Domains, subdomains, IPs, APIs and mobile builds enter inventory. Dead hosts never do." },
    { n: "02", icon: Crosshair, name: "Assess", engine: "scanner engine", body: "Scoped scans and VAPT campaigns run in sandboxed workers, under the scope you approved." },
    { n: "03", icon: FileCheck, name: "Verify", engine: "shared classifier", body: "Every result is stamped: auto-verified, human-verified, or held back as heuristic noise." },
    { n: "04", icon: GitBranch, name: "Correlate", engine: "vapt engine", body: "Related findings chain into attack paths, so you see the route rather than the fragments." },
    { n: "05", icon: LineChart, name: "Prioritise", engine: "risk engine", body: "Explainable Likelihood × Impact ordering puts the queue in the order you should work it." },
    { n: "06", icon: FileText, name: "Deliver", engine: "reporting engine", body: "Verified findings become a board-ready package, and remediation is tracked to closure." },
  ];

  return (
    <Section id="lifecycle" className="relative py-20">
      <GlowBloom className="-left-24 top-1/3 h-[380px] w-[380px]" tone="gold" />

      <motion.div {...fadeUp}>
        <Heading
          eyebrow="The lifecycle"
          lead="Security that compounds"
          accent="with every assessment"
          body="One disciplined path from an unknown asset to a finding your board can read — and nothing skips a stage."
        />
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-6">
        {stages.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.n}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.07 }}
              className="relative"
            >
              {/* Connector — desktop only, and never after the last node. Runs
                  from the right edge of this node's tile to the next one, so it
                  has to clear the 44px tile plus the 1rem grid gap. */}
              {i < stages.length - 1 && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-[52px] right-[-1rem] top-[22px] hidden h-px bg-gradient-to-r from-gold-400/40 to-phantix-700 lg:block"
                />
              )}
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-md border border-gold-400/30 bg-phantix-900 text-gold-300">
                  <Icon size={17} />
                </span>
                <span className="mt-3 font-mono text-[10px] tracking-[0.16em] text-gold-400/80">{s.n}</span>
                <h3 className="mt-1 font-display text-[15px] font-semibold text-white">{s.name}</h3>
                <p className="mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-slate-600">{s.engine}</p>
                <p className="mt-2.5 text-[12.5px] leading-5 text-slate-500">{s.body}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.p {...fadeUp} className="mx-auto mt-14 max-w-xl text-center text-[13px] leading-6 text-slate-500">
        Everything closed becomes the baseline for the next run — and anything that regresses comes
        straight back onto the queue.
      </motion.p>
    </Section>
  );
}

/**
 * 10. Coverage matrix — what the platform actually does, grouped by outcome.
 *
 * Counts and plan labels track docs/05-product-capabilities.md exactly. If a
 * capability is an add-on or an engagement, it says so here rather than in a
 * footnote nobody reads.
 */
export function Coverage() {
  const groups = [
    {
      icon: Radar,
      title: "Know your surface",
      items: [
        ["Asset inventory", "Free"],
        ["Asset intelligence", "Starter"],
        ["DNS & network hygiene", "Free"],
        ["GitHub connection", "Free"],
      ],
    },
    {
      icon: Crosshair,
      title: "Assess what matters",
      items: [
        ["Vulnerability & network scanning", "Starter"],
        ["Web application pipeline", "Starter"],
        ["VAPT campaigns", "Starter"],
        ["API security checks", "Starter"],
        ["Mobile static analysis", "Starter"],
        ["Mobile dynamic / AVD", "Engagement"],
        ["Cloud & container packs", "Add-on"],
        ["Secrets / SCA / SAST", "Add-on"],
        ["Credentialed tests", "Engagement"],
      ],
    },
    {
      icon: Scale,
      title: "Prioritise & govern",
      items: [
        ["Risk scoring", "Starter"],
        ["Dual control", "Platform"],
        ["Audit trail", "Platform"],
        ["Compliance mapping", "Starter"],
        ["Org RBAC & MFA", "Platform"],
      ],
    },
    {
      icon: FileText,
      title: "Prove & communicate",
      items: [
        ["Verification gate", "All plans"],
        ["Impact analysis", "All plans"],
        ["JSON / Markdown export", "Free"],
        ["PDF / DOCX packages", "Starter"],
        ["Finding tracker", "Starter"],
        ["Alerts", "Free"],
      ],
    },
    {
      icon: Sparkles,
      title: "AI that stays accountable",
      items: [
        ["Finding explanation", "Starter"],
        ["Executive summary assist", "Starter"],
        ["Domain agents", "Starter"],
        ["Skill library", "Starter"],
        ["AI governance & audit", "Platform"],
        ["Public agent API", "AI Agent plan"],
      ],
    },
  ];

  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <Section className="py-20">
      <motion.div {...fadeUp}>
        <Heading
          eyebrow="Coverage"
          lead={`${total} capabilities across`}
          accent="five outcomes"
          body="Grouped by what they get you, not by which engine happens to run them — and labelled honestly, including the ones that are an add-on or an engagement."
        />
      </motion.div>

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {groups.map((g, i) => {
          const Icon = g.icon;
          return (
            <motion.div
              key={g.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 3) * 0.06 }}
              className="card-edge flex flex-col p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-md border border-gold-400/30 bg-gold-400/10 text-gold-300">
                  <Icon size={16} />
                </span>
                <span className="font-mono text-[10px] text-slate-600">{g.items.length}</span>
              </div>
              <h3 className="mt-3.5 font-display text-[14px] font-semibold leading-5 text-white">{g.title}</h3>
              <ul className="mt-3.5 space-y-2 border-t border-phantix-800 pt-3.5">
                {g.items.map(([name, plan]) => (
                  <li key={name}>
                    <span className="block text-[12.5px] leading-4 text-slate-300">{name}</span>
                    <span className="mt-0.5 block font-mono text-[9.5px] uppercase tracking-[0.12em] text-slate-600">
                      {plan}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      <motion.p {...fadeUp} className="mx-auto mt-8 max-w-2xl text-center text-xs leading-5 text-slate-600">
        Monitoring surfaces are still growing — we'd rather label "available now" and "coming" separately
        than sell you a roadmap.
      </motion.p>
    </Section>
  );
}

/** 8. Why this exists — the one-person-security-team argument, stated once. */
export function WhyWeBuilt() {
  const shifts = [
    ["Scanner output", "Findings that passed a verification gate"],
    ["A PDF nobody reads", "A report built for the board and the engineer"],
    ["Your data on someone's cloud", "Your data in a database you own"],
    ["A tool per problem", "One register, one queue, one audit trail"],
  ];

  return (
    <Section className="py-20">
      <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2">
        <motion.div {...fadeUp}>
          <Eyebrow>Why this exists</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Most teams doing this work are{" "}
            <span className="hero-accent">one person deep</span>
          </h2>
          <p className="mt-5 text-[15px] leading-7 text-slate-400">
            Not a SOC running three shifts — an engineer, an IT manager, or an ops lead who also handles
            security because somebody has to. That person doesn't need more alerts. They need the tool to
            do the sorting, and to be right often enough that leadership believes the output.
          </p>
          <p className="mt-4 text-[15px] leading-7 text-slate-400">
            So the product is built around what survives scrutiny: continuous discovery instead of a stale
            spreadsheet, a verification gate instead of a raw dump, and reports generated from findings
            that already held up. When you need help, you call a specialist agent for one task — it works
            beside you, not ahead of you.
          </p>
        </motion.div>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="card p-8">
          <p className="eyebrow text-gold-400">What changes</p>
          <div className="mt-5 space-y-4">
            {shifts.map(([before, after]) => (
              <div key={before} className="border-b border-phantix-800 pb-4 last:border-0 last:pb-0">
                <p className="text-[13px] leading-5 text-slate-600 line-through decoration-slate-700">{before}</p>
                <p className="mt-1.5 flex items-start gap-2.5 text-[14px] leading-6 text-slate-200">
                  <Check size={15} className="mt-1 shrink-0 text-gold-400" />
                  {after}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
