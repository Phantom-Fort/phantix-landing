import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/lib/theme";
import PrivacyDiagram from "./PrivacyDiagram";

/*
 * Privacy model artwork — the "your database" loop, per theme.
 *
 * The claim in this section is the page's core argument, so the artwork has to
 * read as product footage rather than decoration: a 16:9 frame that matches the
 * product captures elsewhere on the page, chrome that says what is on screen,
 * and no controls to invite interaction with what is really a diagram in motion.
 *
 * Captured in both themes (dark canonical, `-light` variant), because a dark
 * loop on a light page looks like a missing asset. If the light capture is
 * missing the element falls back to the dark one rather than rendering nothing.
 *
 * Accessibility and weight:
 * - `prefers-reduced-motion` renders the static SVG diagram instead. The
 *   diagram carries the same meaning, so reduced motion loses nothing.
 * - The video only loads once the section is near the viewport; it sits well
 *   below the fold and must not compete with the hero for bandwidth.
 * - Muted + `playsInline` are required for autoplay to be allowed at all on
 *   iOS and in Chrome's autoplay policy.
 */

const SRC_DARK = "/scenes/privacy-your-database.mp4";
const SRC_LIGHT = "/scenes/privacy-your-database-light.mp4";

export default function PrivacyVideo() {
  const { theme } = useTheme();
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node || visible) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  // Swapping `src` on an already-playing element needs an explicit load()/play()
  // — React updating the attribute alone leaves the previous theme's frames up.
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !visible || reduceMotion) return;
    el.load();
    const play = el.play();
    if (play && typeof play.catch === "function") play.catch(() => {});
  }, [theme, visible, reduceMotion]);

  if (reduceMotion || failed) {
    return <PrivacyDiagram />;
  }

  const src = theme === "light" ? SRC_LIGHT : SRC_DARK;

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden rounded-md border border-phantix-700 bg-phantix-950 shadow-[0_0_0_1px_rgba(232,181,77,0.18),0_1px_2px_0_rgba(0,0,0,0.5)]"
    >
      {/* Chrome: names the surface, the way the product captures on this page do. */}
      <div className="flex items-center gap-2 border-b border-phantix-800 bg-phantix-900/60 px-3.5 py-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-gold-400/80" />
        <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-slate-500">
          your dedicated security database
        </span>
      </div>

      <div className="relative aspect-video w-full bg-phantix-950">
        {visible ? (
          <video
            ref={videoRef}
            key={src}
            src={src}
            className="absolute inset-0 block h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Assets, scans and findings being written into your own dedicated security database; nothing flows back out"
            onError={() => {
              // A missing light capture must not leave a hole in the section:
              // fall back to the dark loop, and to the diagram if that fails too.
              const el = videoRef.current;
              if (el && theme === "light" && !el.src.endsWith(SRC_DARK)) {
                el.src = SRC_DARK;
                el.load();
                void el.play().catch(() => {});
                return;
              }
              setFailed(true);
            }}
          />
        ) : (
          <div className="absolute inset-0 animate-pulse bg-phantix-900/40" />
        )}
      </div>

      <p className="border-t border-phantix-800 px-5 py-3 text-center font-mono text-[11px] text-slate-600">
        one direction only · nothing leaves the boundary
      </p>
    </div>
  );
}
