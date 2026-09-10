import React from "react";

/*
 * Reveals are quick and trigger just inside the viewport: a long fade means a
 * fast scroller or a full-page capture catches sections half-invisible.
 */
export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  // scroll-mt keeps anchored sections clear of the fixed nav.
  return (
    <section id={id} className={`relative mx-auto w-full max-w-7xl scroll-mt-24 px-6 ${className ?? ""}`}>
      {children}
    </section>
  );
}

export function SectionHeading({
  kicker,
  title,
  body,
}: {
  kicker: string;
  title: React.ReactNode;
  body?: string;
}) {
  // Same anatomy as the sections-v3 Heading primitive: pill eyebrow, then a
  // semibold display heading. Pricing + comparison keep identical rhythm to the
  // rest of the one-page scroll (similarity rule — same role, same look).
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-phantix-700 bg-phantix-900 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
        {kicker}
      </span>
      <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      {body && <p className="mt-4 text-[15px] leading-7 text-slate-400">{body}</p>}
    </div>
  );
}
