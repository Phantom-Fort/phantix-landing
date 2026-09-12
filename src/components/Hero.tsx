import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { PLATFORM_REGISTER_URL } from "@/lib/links";
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

const HEADLINE= {
  lead: "Privacy-first security operations platform.",
  highlight: "Built for lean security teams.",
};

/**
 * Each claim points at the real UI that enforces it. `x`/`y` are fractions of
 * the shipped screenshot, read off a percentage grid overlaid on the asset —
 * eyeballing them put two hotspots in the gaps between stat cards.
 */
const CLAIMS = [
  {
    value: "Privacy-First",
    label: "security DB",
    detail: "Findings live in a Postgres you own — the app just reports its connection state.",
    hotspot: { x: 0.703, y: 0.036 },
    align: "below" as const,
  },
  {
    value: "Verified Only",
    label: "findings that ship",
    detail: "Open findings are the verified ones. Heuristic noise never get here.",
    hotspot: { x: 0.354, y: 0.405 },
    align: "below" as const,
  },
  {
    value: "Real-Time",
    label: "live detection queue",
    detail: "Detections land in a triage queue the SOC engine keeps current — not a nightly digest.",
    hotspot: { x: 0.679, y: 0.405 },
    align: "below" as const,
  },
  {
    value: "Tracked Fixes",
    label: "tracked to closure",
    detail: "Remediation is tracked to fixed, and anything that regresses comes straight back onto the queue.",
    hotspot: { x: 0.841, y: 0.405 },
    align: "below" as const,
  },
  {
    value: "Daily Scoring",
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

const ROTATE_MS = 3000;

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
      className="relative w-full"
    >
      {/* Bloom sits in the negative space around the frame, never on it —
          on-token gold, the only ambient glow the visual carries. */}
      <GlowBloom className="-inset-x-20 -top-12 bottom-0 h-[70%]" tone="gold" />

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
              alt="The SecureGraph Command Centre: posture score, open findings, risk trend and critical assets for a live organization"
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
                alt="The SecureGraph Command Centre: posture score, open findings, risk trend and critical assets for a live organization"
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
    <section className="relative overflow-hidden px-6 pb-20 pt-28 md:pt-32">
      {/*
       * De-centred hero (Hallmark fix): a left-biased copy column against a
       * wider right-biased product column, instead of every element stacked
       * on one centred vertical axis. Height follows content — no forced
       * 100svh — and the section naturally collapses to a single column
       * below lg, copy first.
       */}
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-10">
        <div>
          <h1 className="max-w-xl font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.1rem]">
            <span className="hero-heading">{HEADLINE.lead}</span>{" "}
            <span className="hero-accent">{HEADLINE.highlight}</span>
          </h1>

          <p className="mt-6 max-w-md text-sm text-slate-400 md:text-base">
            AI-powered end-to-end security operations — from setup to continuous security —
            built for security professionals by security professionals.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a href={PLATFORM_REGISTER_URL} className="btn-primary btn-shine !px-6 !py-3 !text-base">
              Get started free <ArrowRight size={16} />
            </a>
            <Link to="/demo" className="btn-secondary !px-6 !py-3 !text-base">
              <PlayCircle size={16} /> Watch demo
            </Link>
          </div>

          {/* The claims are the tour controls, not decoration — a compact
              pill row (not a stacked wall of boxes) that annotates the
              visual beside it. One caption line carries the detail for
              whichever claim is active. */}
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div role="tablist" aria-label="What the Command Centre enforces" className="mt-6 flex flex-wrap gap-1.5">
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
                    className={`rounded-full border px-3.5 py-1.5 font-display text-xs font-semibold transition-colors duration-200 ${
                      isActive
                        ? "border-gold-400/45 bg-gold-400/[0.1] text-white"
                        : "border-phantix-700 bg-phantix-900/60 text-slate-400 hover:border-phantix-600 hover:text-slate-200"
                    }`}
                  >
                    {c.value}
                  </button>
                );
              })}
            </div>

            {/* Progress bar doubles as the "which tab am I on" affordance. */}
            <span className="mt-3 block h-px w-full max-w-xs overflow-hidden rounded-full bg-phantix-700">
              <motion.span
                key={`${CLAIMS[active].value}-${paused}`}
                className="block h-full bg-gold-400"
                initial={{ width: reduce || paused ? "100%" : "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: reduce || paused ? 0 : ROTATE_MS / 1000, ease: "linear" }}
              />
            </span>

            <p className="mt-2.5 max-w-sm text-xs leading-5 text-slate-500">
              <span className="text-slate-300">{CLAIMS[active].label}</span> — {CLAIMS[active].detail}
            </p>
          </div>
        </div>

        {/* Interactive dashboard preview — the wider, right-biased column. */}
        <HeroVisual
          active={active}
          onPause={() => setPaused(true)}
          onResume={() => setPaused(false)}
        />
      </div>
    </section>
  );
}
