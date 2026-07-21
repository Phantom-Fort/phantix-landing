import React from "react";

export const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
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
  return (
    <section id={id} className={`relative mx-auto w-full max-w-7xl px-6 ${className ?? ""}`}>
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
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">{kicker}</p>
      <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white">{title}</h2>
      {body && <p className="mt-4 text-[15px] leading-7 text-slate-400">{body}</p>}
    </div>
  );
}
