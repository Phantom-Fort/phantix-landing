import React, { useMemo } from "react";

/*
 * Atmosphere layer — v3 plan §3 (E1–E4).
 *
 * Light is gold and white on true black. There is deliberately no blue: the
 * product apps run a neutral zinc palette with gold as the only chroma, and the
 * landing embeds real footage of them, so any blue here would read as a
 * different product (v3 plan §2).
 *
 * Everything here is decorative and `aria-hidden`, and every animated part is
 * gated behind `prefers-reduced-motion`.
 */

/** Deterministic PRNG so the starfield doesn't reshuffle between renders. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/**
 * E1 — the vertical light beam, built to the supplied gold-beam reference:
 * a narrow constant-width shaft with a white-hot core, soft gold falloff, a
 * bright pool where it lands, and gold dust drifting around it.
 *
 * Layered rather than single-gradient, because a beam reads as light only when
 * the core is much tighter and hotter than the haze around it.
 */
export function LightBeam({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 top-0 z-0 h-full ${className}`}
      style={{ mixBlendMode: "screen" }}
    >
      {/* 1. Outer haze — the wide, faint spill. */}
      <div
        className="absolute left-1/2 top-0 h-full w-[300px] -translate-x-1/2 blur-[74px]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(232,181,77,0.05) 0%, rgba(232,181,77,0.10) 55%, rgba(232,181,77,0.20) 92%, rgba(232,181,77,0.08) 100%)",
        }}
      />

      {/* 2. Mid glow — gives the shaft its gold body. */}
      <div
        className="absolute left-1/2 top-0 h-full w-[96px] -translate-x-1/2 blur-[30px]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(240,201,107,0.22) 0%, rgba(243,205,126,0.40) 55%, rgba(243,205,126,0.78) 93%, rgba(232,181,77,0.28) 100%)",
        }}
      />

      {/* 3. Hot core — near-white, tight, the part that reads as a beam. */}
      <div
        className="absolute left-1/2 top-0 h-full w-[9px] -translate-x-1/2 blur-[7px]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,244,214,0.70) 0%, rgba(255,253,247,0.98) 60%, rgba(255,252,242,1) 94%, rgba(255,240,205,0.55) 100%)",
        }}
      />

      {/* 4. Landing pool — the bright ellipse where the beam meets the floor. */}
      <div
        className="absolute bottom-0 left-1/2 h-[120px] w-[640px] -translate-x-1/2 translate-y-1/2 blur-[34px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,250,236,0.95) 0%, rgba(243,205,126,0.60) 34%, rgba(232,181,77,0.22) 58%, transparent 76%)",
        }}
      />
      {/* 4b. Tight specular streak along the floor line. */}
      <div
        className="absolute bottom-0 left-1/2 h-[4px] w-[420px] -translate-x-1/2 translate-y-1/2 blur-[5px]"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,250,235,0.9) 50%, transparent)",
        }}
      />
    </div>
  );
}

/**
 * Gold dust — the lit motes drifting in and around the beam. Denser toward the
 * floor, where the reference has them pooling.
 */
export function GoldDust({
  count = 70,
  seed = 21,
  className = "",
}: {
  count?: number;
  seed?: number;
  className?: string;
}) {
  const motes = useMemo(() => {
    const rand = seeded(seed);
    return Array.from({ length: count }, () => {
      // Bias horizontally toward the beam and vertically toward the floor.
      const spread = Math.pow(rand(), 0.6) * (rand() < 0.5 ? -1 : 1);
      return {
        left: 50 + spread * 32,
        top: 12 + Math.pow(rand(), 0.55) * 86,
        size: rand() < 0.75 ? 1.5 : 2.5,
        opacity: 0.25 + rand() * 0.6,
        delay: rand() * 7,
      };
    });
  }, [count, seed]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ mixBlendMode: "screen" }}
    >
      {motes.map((m, i) => (
        <span
          key={i}
          className="mote absolute rounded-full"
          style={{
            top: `${m.top}%`,
            left: `${m.left}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            opacity: m.opacity,
            background: "rgb(255 226 160)",
            boxShadow: "0 0 4px rgba(232,181,77,0.9)",
            animationDelay: `${m.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/** E2 — starfield. Static dots by default; twinkle only when motion is allowed. */
export function Starfield({
  count = 90,
  seed = 7,
  className = "",
}: {
  count?: number;
  seed?: number;
  className?: string;
}) {
  const stars = useMemo(() => {
    const rand = seeded(seed);
    return Array.from({ length: count }, () => ({
      top: rand() * 100,
      left: rand() * 100,
      size: rand() < 0.82 ? 1 : 2,
      opacity: 0.18 + rand() * 0.5,
      delay: rand() * 6,
    }));
  }, [count, seed]);

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {stars.map((s, i) => (
        <span
          key={i}
          className="star absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/** E3 — ambient bloom. Background negative space only, never on cards. */
export function GlowBloom({
  className = "",
  tone = "gold",
}: {
  className?: string;
  tone?: "gold" | "neutral";
}) {
  const bg = tone === "gold" ? "rgba(232,181,77,0.10)" : "rgba(113,113,122,0.14)";
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-[120px] ${className}`}
      style={{ background: bg }}
    />
  );
}
