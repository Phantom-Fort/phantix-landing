import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ShieldCheck, ArrowRight, PlayCircle } from "lucide-react";
import { PLATFORM_REGISTER_URL, APP_DEMO_URL } from "@/lib/links";
import { useTheme } from "@/lib/theme";
import { GlowBloom } from "@/components/effects";

/*
 * Hero — clean centred copy (from the saa-s-template reference) over the real
 * Command Centre, with the beam removed.
 *
 * The interactive dashboard visual is back: cursor tilt + gold spotlight, and
 * the three claims below the CTA are tabs that annotate the exact spot on the
 * screenshot where each one is enforced (Privacy-first / Dual control /
 * Verified only). All motion is gated behind prefers-reduced-motion and the
 * tilt is additionally gated behind a fine pointer — it's meaningless on touch.
 */

const HEADLINE = {
  lead: "Take command of your attack surface",
  accent: "without surrendering your security data",
};

/**
 * Each claim points at the real UI that enforces it. `x`/`y` are fractions of
 * the shipped screenshot, read off a percentage grid overlaid on the asset —
 * eyeballing them put two hotspots in the gaps between stat cards.
 */
const CLAIMS = [
  {
    value: "Privacy-first",
    label: "security DB",
    detail: "Findings live in a Postgres you own — the app just reports its connection state.",
    hotspot: { x: 0.703, y: 0.036 },
    align: "below" as const,
  },
  {
    value: "Verified only",
    label: "findings that ship",
    detail: "Open findings are the verified ones. Heuristic noise never reaches this number.",
    hotspot: { x: 0.354, y: 0.405 },
    align: "below" as const,
  },
  {
    value: "Always watching",
    label: "live detection queue",
    detail: "Detections land in a triage queue the SOC engine keeps current — not a nightly digest.",
    hotspot: { x: 0.679, y: 0.405 },
    align: "below" as const,
  },
  {
    value: "Closed the loop",
    label: "tracked to closure",
    detail: "Remediation is tracked to fixed, and anything that regresses comes straight back onto the queue.",
    hotspot: { x: 0.841, y: 0.405 },
    align: "below" as const,
  },
  {
    value: "Scored daily",
    label: "composite posture",
    detail: "One composite score, recomputed every day, so you can show direction — not just a snapshot.",
    hotspot: { x: 0.228, y: 0.497 },
    align: "below" as const,
  },
  {
    value: "Dual control",
    label: "sensitive actions",
    detail: "Protected mutations stay locked until an initiator and an authorizer both sign in.",
    hotspot: { x: 0.044, y: 0.883 },
    align: "above" as const,
  },
];

const ROTATE_MS = 4200;

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const apply = () => setMatches(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [query]);
  return matches;
}

/** The annotation pinned to a spot on the screenshot. */
function Hotspot({
  claim,
  reduce,
}: {
  claim: (typeof CLAIMS)[number];
  reduce: boolean | null;
}) {
  const { hotspot, align, value, detail } = claim;
  return (
    <motion.div
      key={value}
      initial={{ opacity: 0, scale: reduce ? 1 : 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none absolute z-20"
      style={{ left: `${hotspot.x * 100}%`, top: `${hotspot.y * 100}%` }}
    >
      <span className="relative block">
        {/* target ring */}
        <span className="absolute -left-3 -top-3 block h-6 w-6 rounded-full border border-gold-400/80 bg-gold-400/10" />
        {!reduce && (
          <span className="hotspot-ping absolute -left-3 -top-3 block h-6 w-6 rounded-full border border-gold-400/60" />
        )}

        {/* caption */}
        <span
          className={
            align === "above"
              ? "absolute bottom-7 left-0 w-max max-w-[min(70vw,300px)]"
              : "absolute left-1/2 top-7 w-max max-w-[min(70vw,300px)] -translate-x-1/2"
          }
        >
          <span className="block rounded-md border border-gold-400/30 bg-phantix-950/95 px-3 py-2 text-left shadow-[0_0_0_1px_rgba(0,0,0,0.6)] backdrop-blur-sm">
            <span className="block font-display text-[12px] font-semibold text-gold-300">{value}</span>
            <span className="mt-0.5 block text-[11px] leading-4 text-slate-400">{detail}</span>
          </span>
        </span>
      </span>
    </motion.div>
  );
}

function HeroVisual({
  active,
  onPause,
  onResume,
}: {
  active: number;
  onPause: () => void;
  onResume: () => void;
}) {
  const reduce = useReducedMotion();
  const { theme } = useTheme();
  const finePointer = useMediaQuery("(pointer: fine)");
  // Below lg the screenshot is far too small for pointing at a single chip to
  // mean anything, and the caption would overflow the frame.
  const annotate = useMediaQuery("(min-width: 1024px)");
  const frameRef = useRef<HTMLDivElement>(null);

  // Normalised pointer position across the frame, 0..1 on both axes.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const [hovering, setHovering] = useState(false);

  const tiltEnabled = finePointer && !reduce;

  const rotateX = useSpring(useTransform(py, [0, 1], [5.5, -5.5]), { stiffness: 140, damping: 18 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), { stiffness: 140, damping: 18 });

  // Cursor-tracking spotlight — a gold wash that follows the pointer.
  const spotX = useMotionTemplate`${useTransform(px, (v) => v * 100)}%`;
  const spotY = useMotionTemplate`${useTransform(py, (v) => v * 100)}%`;
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${spotX} ${spotY}, rgba(232,181,77,0.16), transparent 68%)`;

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = frameRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width);
      py.set((e.clientY - r.top) / r.height);
    },
    [px, py],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-5xl"
    >
      {/* Bloom sits in the negative space around the frame, never on it. */}
      <GlowBloom className="-inset-x-20 -top-12 bottom-0 h-[70%]" tone="gold" />

      {/* Bright yellow neon glow — hugs the top of the dashboard and spills upward. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-8 left-1/2 z-0 h-44 w-[78%] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse 55% 100% at 50% 0%, rgba(255,240,0,0.60) 0%, rgba(255,214,0,0.28) 45%, transparent 72%)",
          filter: "blur(24px)",
          mixBlendMode: "screen",
        }}
      />

      <div style={{ perspective: 1400 }}>
        <motion.div
          ref={frameRef}
          onMouseMove={tiltEnabled ? onMove : undefined}
          onMouseEnter={() => {
            setHovering(true);
            onPause();
          }}
          onMouseLeave={() => {
            setHovering(false);
            onResume();
            px.set(0.5);
            py.set(0.5);
          }}
          style={tiltEnabled ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
          className="relative overflow-hidden rounded-md border border-phantix-700 shadow-[0_0_0_1px_rgba(232,181,77,0.18),0_1px_2px_0_rgba(0,0,0,0.5)]"
        >
          {theme === "light" ? (
            <img
              src="/scenes/command-centre-dashboard-light.jpg"
              alt="The Phantix Command Centre: posture score, open findings, risk trend and critical assets for a live organization"
              width={2000}
              height={1225}
              className="block w-full"
              loading="eager"
              decoding="async"
              onError={(e) => {
                e.currentTarget.src = "/scenes/command-centre-dashboard.jpg";
              }}
            />
          ) : (
            <picture>
              <source srcSet="/scenes/command-centre-dashboard.webp" type="image/webp" />
              <img
                src="/scenes/command-centre-dashboard.jpg"
                alt="The Phantix Command Centre: posture score, open findings, risk trend and critical assets for a live organization"
                width={2000}
                height={1225}
                className="block w-full"
                loading="eager"
                decoding="async"
              />
            </picture>
          )}

          {/* Dim everything except the annotated region, so the eye lands on it. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
            style={{
              opacity: !annotate || hovering ? 0 : 1,
              background: `radial-gradient(circle at ${CLAIMS[active].hotspot.x * 100}% ${
                CLAIMS[active].hotspot.y * 100
              }%, transparent 6%, rgba(0,0,0,0.42) 34%)`,
            }}
          />

          {/* Cursor spotlight */}
          {tiltEnabled && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10"
              style={{ background: spotlight, opacity: hovering ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          )}

          {annotate && <Hotspot claim={CLAIMS[active]} reduce={reduce} />}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // No annotation below lg, so rotating there would be motion with no payload.
  const annotate = useMediaQuery("(min-width: 1024px)");

  // Auto-advance is motion the user didn't ask for: it stops under reduced
  // motion, and pauses whenever someone is actually interacting.
  useEffect(() => {
    if (paused || reduce || !annotate) return;
    const t = window.setInterval(() => setActive((i) => (i + 1) % CLAIMS.length), ROTATE_MS);
    return () => window.clearInterval(t);
  }, [paused, reduce, annotate]);

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-start overflow-hidden px-6 pb-20 pt-36 md:pt-44">
      {/* Brand chip */}
      <aside className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold-400/25 bg-gold-400/10 px-4 py-2 text-xs font-medium text-gold-300">
        <ShieldCheck size={13} />
        Phantix Security Solutions
      </aside>

      {/* Gradient headline */}
      <h1 className="max-w-4xl text-center font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
        <span className="hero-heading">{HEADLINE.lead}</span>{" "}
        <span className="hero-accent">{HEADLINE.accent}</span>
      </h1>

      {/* Subtitle */}
      <p className="mt-6 max-w-2xl text-center text-sm text-slate-400 md:text-base">
        Security operations without the data custody risk. Phantix runs the
        tooling — your findings never leave the database you own.
      </p>

      {/* CTAs */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a href={PLATFORM_REGISTER_URL} className="btn-primary btn-shine !px-6 !py-3 !text-base">
          Get started free <ArrowRight size={16} />
        </a>
        <a href={APP_DEMO_URL} className="btn-secondary !px-6 !py-3 !text-base">
          <PlayCircle size={16} /> Watch demo
        </a>
      </div>

      {/* The three claims are the tour controls, not decoration. */}
      <div
        role="tablist"
        aria-label="What the Command Centre enforces"
        className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-3"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {CLAIMS.map((c, i) => {
          const isActive = i === active;
          return (
            <button
              key={c.value}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              onFocus={() => {
                setActive(i);
                setPaused(true);
              }}
              onBlur={() => setPaused(false)}
              className={`group relative rounded-md border px-4 py-2.5 text-left transition-colors duration-200 ${
                isActive
                  ? "border-gold-400/45 bg-gold-400/[0.07]"
                  : "border-phantix-700 bg-phantix-900/60 hover:border-phantix-600"
              }`}
            >
              <span
                className={`block font-display text-base font-semibold transition-colors ${
                  isActive ? "text-white" : "text-slate-300"
                }`}
              >
                {c.value}
              </span>
              <span className="mt-0.5 block text-[11px] text-slate-500">{c.label}</span>

              {/* Progress bar doubles as the "which tab am I on" affordance. */}
              <span className="absolute inset-x-3 bottom-1 h-px overflow-hidden rounded-full bg-phantix-700">
                {isActive && (
                  <motion.span
                    key={`${c.value}-${paused}`}
                    className="block h-full bg-gold-400"
                    initial={{ width: reduce || paused ? "100%" : "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: reduce || paused ? 0 : ROTATE_MS / 1000, ease: "linear" }}
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Interactive dashboard preview */}
      <div className="mt-12 w-full max-w-5xl">
        <HeroVisual
          active={active}
          onPause={() => setPaused(true)}
          onResume={() => setPaused(false)}
        />
      </div>
    </section>
  );
}
