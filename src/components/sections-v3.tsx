import React, { useEffect, useRef, useState } from "react";
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
} from "lucide-react";
import { Section, fadeUp } from "./Section";
import { GlowBloom } from "./effects";
import PrivacyDiagram from "./PrivacyDiagram";
import { useTheme } from "@/lib/theme";

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

/**
 * Product captures ship in both themes — dark is canonical, `-light` variants
 * are captured from the same demo tenant in light mode. If a light capture is
 * missing the img falls back to the dark asset rather than rendering broken.
 */
/** Intrinsic sizes of the shipped captures, so lazy images reserve their space
 *  instead of collapsing the frame to its border and jumping on load. */
const SHOT_SIZE: Record<string, { w: number; h: number }> = {
  assets: { w: 1400, h: 1340 },
  vapt: { w: 1400, h: 2390 },
  risks: { w: 1400, h: 1046 },
  compliance: { w: 1400, h: 1000 },
  reports: { w: 1400, h: 994 },
  agent: { w: 1400, h: 1122 },
};

function sceneImg(name: string, theme: "dark" | "light", alt: string, imgClassName?: string) {
  const size = SHOT_SIZE[name];
  const suffix = theme === "light" ? "-light" : "";
  return (
    <picture>
      <source srcSet={`/scenes/product-${name}${suffix}.webp`} type="image/webp" />
      <img
        src={`/scenes/product-${name}${suffix}.jpg`}
        alt={alt}
        width={size?.w}
        height={size?.h}
        loading="lazy"
        decoding="async"
        className={imgClassName ?? "block w-full"}
        onError={(e) => {
          // A missing light capture must never leave a hole — fall back to dark.
          if (suffix) e.currentTarget.src = `/scenes/product-${name}.jpg`;
        }}
      />
    </picture>
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

  return <span ref={ref}>{value}</span>;
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
    <Section className="pb-20">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
            Phantix provisions a dedicated Postgres you control, and writes assets, scans and findings
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
      body: "Provision a dedicated Postgres. Phantix writes assets, scans and findings there — never your production database.",
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
          <p className="mt-6 inline-flex rounded-md border border-gold-400/25 bg-gold-400/8 px-3 py-2 font-mono text-[12px] text-gold-300">
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
          alt="The Phantix Agent routing to VAPT, SOC, GRC, Threat Intel and Asset specialists, with dual-control required"
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
