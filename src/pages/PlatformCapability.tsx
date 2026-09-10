import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, CalendarClock } from "lucide-react";
import PageShell from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { Section, fadeUp } from "@/components/Section";
import { GlowBloom } from "@/components/effects";
import { getPlatformPage, PLATFORM_PAGES } from "@/lib/platform-content";
import { useTheme } from "@/lib/theme";
import { sceneImg } from "@/lib/scene-image";
import { PLATFORM_REGISTER_URL } from "@/lib/links";
import { cx } from "@/lib/utils";

export default function PlatformCapability() {
  const { slug } = useParams<{ slug: string }>();
  const page = getPlatformPage(slug);
  const { theme } = useTheme();

  if (!page) return <Navigate to="/" replace />;

  const siblings = PLATFORM_PAGES.filter((p) => p.slug !== page.slug);

  return (
    <PageShell>
      <Section className="pb-14 pt-28 md:pt-36">
        <BackLink />

        <motion.div {...fadeUp} className="mx-auto mt-10 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/25 bg-gold-400/10 px-4 py-2 text-xs font-medium text-gold-300">
            {page.icon} {page.eyebrow}
          </span>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
            {page.headline}
          </h1>
          <p className="mt-5 text-[15px] leading-7 text-slate-400">{page.intro}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={PLATFORM_REGISTER_URL} className="btn-primary btn-shine !px-6 !py-3 !text-base">
              Get started free <ArrowRight size={16} />
            </a>
            <Link to="/demo" className="btn-secondary !px-6 !py-3 !text-base">
              <CalendarClock size={16} /> Request a demo
            </Link>
          </div>
        </motion.div>
      </Section>

      <Section className="relative pb-20">
        <GlowBloom className="right-[-10%] top-0 h-[380px] w-[380px]" tone="gold" />
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <motion.div {...fadeUp}>
            <p className="eyebrow text-gold-400">What ships</p>
            <ul className="mt-5 space-y-3.5">
              {page.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[14px] leading-6 text-slate-300">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-400" />
                  {p}
                </li>
              ))}
            </ul>
            {page.footnote && (
              <p className="mt-6 rounded-lg border border-phantix-700/50 bg-phantix-900/50 px-4 py-3 text-[13px] leading-5 text-slate-500">
                {page.footnote}
              </p>
            )}
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="overflow-hidden rounded-md border border-phantix-700 shadow-[0_0_0_1px_rgba(232,181,77,0.10),0_1px_2px_0_rgba(0,0,0,0.5)]"
          >
            {sceneImg(page.shot, theme, page.alt)}
          </motion.div>
        </div>

        <motion.p {...fadeUp} className="mt-10 flex items-center justify-center gap-2 text-center text-xs text-slate-600">
          SSRF-guarded targets — http/https only, private ranges and cloud metadata endpoints blocked, DNS-rebinding defense.
        </motion.p>
      </Section>

      {/* Cross-links to the other platform pages */}
      <Section className="pb-20">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold-400">Also on the platform</p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white">
            Every surface, one command centre
          </h2>
        </motion.div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {siblings.map((s, i) => (
            <motion.div key={s.slug} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.06 }}>
              <Link
                to={`/platform/${s.slug}`}
                className={cx(
                  "card-edge card-lift group block h-full p-5 transition-colors",
                )}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-md border border-gold-400/30 bg-gold-400/10 text-gold-300">
                  {s.icon}
                </span>
                <h3 className="mt-3.5 font-display text-[15px] font-semibold text-white group-hover:text-gold-300">
                  {s.navLabel}
                </h3>
                <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 opacity-0 transition-opacity group-hover:opacity-100">
                  Explore <ArrowRight size={12} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="pb-28">
        <motion.div
          {...fadeUp}
          className="final-cta relative overflow-hidden rounded-3xl border border-gold-400/30 px-8 py-14 text-center shadow-glow"
        >
          <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid opacity-30 [mask-image:radial-gradient(ellipse_60%_80%_at_50%_50%,black,transparent)]" />
          <h2 className="relative font-display text-3xl font-bold tracking-tight text-white">
            See {page.navLabel.toLowerCase()} testing on your own stack
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-[15px] leading-7 text-slate-300">
            Walk through the product yourself, or talk to the team about a scoped assessment.
          </p>
          <div className="relative mt-7 flex flex-wrap items-center justify-center gap-5">
            <Link to="/demo" className="btn-primary !px-7 !py-3 !text-[15px]">
              <CalendarClock size={16} /> Request a live demo
            </Link>
            <a href={PLATFORM_REGISTER_URL} className="btn-secondary !px-7 !py-3 !text-[15px]">
              Get started free
            </a>
          </div>
        </motion.div>
      </Section>
    </PageShell>
  );
}
