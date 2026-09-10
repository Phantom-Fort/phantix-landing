import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, BookOpen, CalendarClock, ChevronDown, Code2, FlaskConical, Layers,
  Presentation, ShieldCheck, Sparkles, Terminal, Users,
} from "lucide-react";
import { APP_DOCS_URL, APP_LOGIN_URL, APP_URL, PLATFORM_URL, SANDBOX_APPLY_URL } from "@/lib/links";
import { PLATFORM_PAGES } from "@/lib/platform-content";
import { cx } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BrandLogo } from "@/components/BrandLogo";

interface MegaItem {
  label: string;
  to: string;
  desc: string;
  icon: React.ReactNode;
}

interface MegaConfig {
  /** Brand rail on the left of the panel. */
  intro: { eyebrow: string; title: string; body: string; linkLabel: string; linkTo: string; icon: React.ReactNode };
  itemsEyebrow: string;
  items: MegaItem[];
  /** 2 for the surface grid, 1 for the audience list. */
  cols: 1 | 2;
  /** Gold-tinted feature panel on the right. */
  promo: { eyebrow: string; title: string; body: string; linkLabel: string; linkTo: string; icon: React.ReactNode };
  footNote: string;
  width: string;
}

const PLATFORM_MENU: MegaConfig = {
  intro: {
    eyebrow: "SecureGraph platform",
    title: "One command centre for every surface you own.",
    body: "Assets, assessments, risk and evidence stay in a single register — under your keys.",
    linkLabel: "Explore the platform",
    linkTo: "/#platform",
    icon: <Layers size={16} />,
  },
  itemsEyebrow: "Testing surfaces",
  items: PLATFORM_PAGES.map((p) => ({
    label: p.navLabel,
    to: `/platform/${p.slug}`,
    desc: p.headline,
    icon: p.icon,
  })),
  cols: 2,
  promo: {
    eyebrow: "AI pentest agent",
    title: "Never reports a vulnerability without a finding ID.",
    body: "Domain specialists route to the engines — they explain, they don't invent.",
    linkLabel: "See how it works",
    linkTo: "/#ai",
    icon: <Sparkles size={16} />,
  },
  footNote: "Every surface lands in one register, one queue, one audit trail.",
  width: "w-[920px]",
};

const SOLUTIONS_MENU: MegaConfig = {
  intro: {
    eyebrow: "Who it's for",
    title: "Built for the person who also happens to own security.",
    body: "Whether that's the board asking for assurance, the engineer holding the pager, or the team integrating the agent.",
    linkLabel: "See pricing",
    linkTo: "/pricing",
    icon: <Users size={16} />,
  },
  itemsEyebrow: "By audience",
  items: [
    {
      label: "For business leaders",
      to: "/solutions/business-leaders",
      desc: "Assurance you can put in front of a board — evidence, not adjectives.",
      icon: <Presentation size={15} />,
    },
    {
      label: "For security teams",
      to: "/solutions/security-teams",
      desc: "Built for people burned by noisy scanners and unreadable PDFs.",
      icon: <Terminal size={15} />,
    },
    {
      label: "For developers",
      to: "/solutions/developers",
      desc: "Programmatic access to the AI agent — and we're specific about which API.",
      icon: <Code2 size={15} />,
    },
  ],
  cols: 1,
  promo: {
    eyebrow: "Trust & security",
    title: "Your security data stays yours.",
    body: "The boundary, the approval gates and the audit trail — documented, not asserted.",
    linkLabel: "Read the trust model",
    linkTo: "/trust",
    icon: <ShieldCheck size={16} />,
  },
  footNote: "Start on Free. Expand when the pipeline has earned it.",
  width: "w-[860px]",
};

/** Internal route or homepage anchor — anchors must not go through the router. */
function MegaLink({
  to,
  onNavigate,
  className,
  children,
}: {
  to: string;
  onNavigate: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  if (to.startsWith("/#")) {
    return (
      <a href={to} onClick={onNavigate} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} onClick={onNavigate} className={className}>
      {children}
    </Link>
  );
}

/**
 * Mega-menu — brand rail, surface grid, feature panel.
 *
 * Opens on hover for fine pointers and on click for everything else, so it stays
 * reachable by keyboard and on touch. The panel is capped to the viewport so it
 * can never push the page into horizontal scroll at the xl breakpoint.
 */
function MegaMenu({ label, config }: { label: string; config: MegaConfig }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={close}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cx("flex items-center gap-1 transition-colors", open ? "text-white" : "hover:text-white")}
      >
        {label}
        <ChevronDown size={13} className={cx("transition-transform duration-200", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={cx("absolute left-0 top-full z-50 max-w-[calc(100vw-3rem)] pt-3", config.width)}
          >
            {/* Opaque, not translucent — at this size the page behind ghosts
                through a 95% panel and the copy stops being readable. */}
            <div className="overflow-hidden rounded-xl border border-phantix-700 bg-phantix-950 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.9)]">
              <div className="grid grid-cols-[236px_1fr_236px]">
                {/* Brand rail */}
                <div className="relative border-r border-phantix-800 p-6">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid opacity-60 [mask-image:radial-gradient(ellipse_80%_60%_at_20%_0%,black,transparent)]"
                  />
                  <div className="relative">
                    <span className="flex h-9 w-9 items-center justify-center rounded-md border border-gold-400/30 bg-gold-400/10 text-gold-300">
                      {config.intro.icon}
                    </span>
                    <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-400">
                      {config.intro.eyebrow}
                    </p>
                    <p className="mt-2 font-display text-[15px] font-semibold leading-6 text-white">
                      {config.intro.title}
                    </p>
                    <p className="mt-2.5 text-[12px] leading-5 text-slate-500">{config.intro.body}</p>
                    <MegaLink
                      to={config.intro.linkTo}
                      onNavigate={close}
                      className="group mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-gold-400 hover:text-gold-300"
                    >
                      {config.intro.linkLabel}
                      <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </MegaLink>
                  </div>
                </div>

                {/* Item grid */}
                <div className="p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {config.itemsEyebrow}
                  </p>
                  <div className={cx("mt-4 grid gap-1", config.cols === 2 ? "grid-cols-2" : "grid-cols-1")}>
                    {config.items.map((item) => (
                      <MegaLink
                        key={item.label}
                        to={item.to}
                        onNavigate={close}
                        className="group relative flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-phantix-900"
                      >
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-phantix-700 bg-phantix-900 text-slate-400 transition-colors group-hover:border-gold-400/40 group-hover:bg-gold-400/10 group-hover:text-gold-300">
                          {item.icon}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[13.5px] font-semibold text-slate-200 transition-colors group-hover:text-white">
                            {item.label}
                          </span>
                          <span className="mt-0.5 block text-[11.5px] leading-4 text-slate-500">{item.desc}</span>
                        </span>
                      </MegaLink>
                    ))}
                  </div>
                </div>

                {/* Feature panel */}
                <MegaLink
                  to={config.promo.linkTo}
                  onNavigate={close}
                  className="group relative border-l border-phantix-800 bg-gold-400/[0.06] p-6 transition-colors hover:bg-gold-400/[0.1]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid opacity-70 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_10%,black,transparent)]"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-400/20 blur-[50px]"
                  />
                  <div className="relative">
                    <span className="flex h-9 w-9 items-center justify-center rounded-md border border-gold-400/40 bg-gold-400/15 text-gold-300">
                      {config.promo.icon}
                    </span>
                    <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-400">
                      {config.promo.eyebrow}
                    </p>
                    <p className="mt-2 font-display text-[15px] font-semibold leading-6 text-white">
                      {config.promo.title}
                    </p>
                    <p className="mt-2.5 text-[12px] leading-5 text-slate-400">{config.promo.body}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-gold-300">
                      {config.promo.linkLabel}
                      <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </MegaLink>
              </div>

              {/* Quiet footer strip — the line that ties the menu together. */}
              <div className="border-t border-phantix-800 bg-phantix-900/60 px-6 py-2.5">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-slate-600">
                  {config.footNote}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-all duration-300",
        scrolled ? "border-white/10 bg-phantix-950/85 py-0" : "border-white/5 bg-phantix-950/60",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-3.5">
        <BrandLogo className="h-11 w-12" lightSrc="/logo-transparent.png" />
        <div className="leading-tight">
          <p className="font-display text-[15px] font-bold text-white">SecureGraph</p>
          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-gold-400">AI-Powered Security</p>
        </div>
        <nav className="ml-8 hidden items-center gap-5 text-sm text-slate-400 xl:flex">
          <MegaMenu label="Platform" config={PLATFORM_MENU} />
          <MegaMenu label="Solutions" config={SOLUTIONS_MENU} />
          <Link to="/trust" className="transition-colors hover:text-white">Trust</Link>
          {/* Anchors only resolve on the homepage — prefix with "/" so they work
              from a standalone page too. */}
          <a href="/#how-it-works" className="transition-colors hover:text-white">How it works</a>
          <Link to="/pricing" className="transition-colors hover:text-white">Pricing</Link>
        </nav>
        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <a
            href={SANDBOX_APPLY_URL}
            title="Sandbox"
            aria-label="Sandbox"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-phantix-700/50 bg-phantix-900/50 text-slate-400 transition-colors hover:border-gold-400/40 hover:text-gold-300"
          >
            <FlaskConical size={16} />
          </a>
          <a
            href={APP_DOCS_URL}
            title="Documentation"
            aria-label="Documentation"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-phantix-700/50 bg-phantix-900/50 text-slate-400 transition-colors hover:border-phantix-500/50 hover:text-white"
          >
            <BookOpen size={16} />
          </a>
          <a href={APP_LOGIN_URL} className="btn-secondary hidden !px-3.5 !py-2 sm:inline-flex">Sign in</a>
          <Link to="/demo" className="btn-primary !px-3.5 !py-2">
            <CalendarClock size={15} /> <span className="hidden sm:inline">Request a demo</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-phantix-700/30 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-start justify-between gap-x-12 gap-y-14">
          <div className="max-w-md">
            <div className="flex items-center gap-2.5">
              <BrandLogo className="h-14 w-14" lightSrc="/logo-transparent.png" darkSrc="/logo-white.png" />
              <div>
                <p className="font-display text-lg font-semibold text-white">Phantix Security Solutions</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-400">Protect. Prevent. Perform.</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-400">
              Privacy-first security operations. Your security data lives in your database — SecureGraph runs the
              tooling, never touches the record.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-10 text-sm text-slate-400 sm:grid-cols-3 lg:grid-cols-5">
            <div className="space-y-3">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">Platform</p>
              {PLATFORM_PAGES.map((p) => (
                <Link key={p.slug} to={`/platform/${p.slug}`} className="block transition-colors hover:text-slate-200">
                  {p.navLabel}
                </Link>
              ))}
              <a href="/#ai" className="block transition-colors hover:text-slate-200">AI pentest agent</a>
            </div>
            <div className="space-y-3">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">Solutions</p>
              <Link to="/solutions/business-leaders" className="block transition-colors hover:text-slate-200">Business leaders</Link>
              <Link to="/solutions/security-teams" className="block transition-colors hover:text-slate-200">Security teams</Link>
              <Link to="/solutions/developers" className="block transition-colors hover:text-slate-200">Developers</Link>
              <Link to="/trust" className="block transition-colors hover:text-slate-200">Trust &amp; security</Link>
              <Link to="/pricing" className="block transition-colors hover:text-slate-200">Pricing</Link>
            </div>
            <div className="space-y-3">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">Surfaces</p>
              <a href={APP_URL} className="block transition-colors hover:text-slate-200">app.phantixlabs.com</a>
              <a href={PLATFORM_URL} className="block transition-colors hover:text-slate-200">platform.phantixlabs.com</a>
              <a href={APP_DOCS_URL} className="block transition-colors hover:text-slate-200">Documentation</a>
            </div>
            <div className="space-y-3">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">Start</p>
              <Link to="/demo" className="block transition-colors hover:text-slate-200">Request a demo</Link>
              <a href={SANDBOX_APPLY_URL} className="block transition-colors hover:text-slate-200">Sandbox apply</a>
              <a href={APP_LOGIN_URL} className="block transition-colors hover:text-slate-200">Sign in</a>
              <a href={`${PLATFORM_URL}/register`} className="block transition-colors hover:text-slate-200">Register</a>
            </div>
            <div className="space-y-3">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">Legal</p>
              <a href="/terms" className="block transition-colors hover:text-slate-200">Terms of Service</a>
              <a href="/aup" className="block transition-colors hover:text-slate-200">Acceptable Use Policy</a>
              <a href="/privacy" className="block transition-colors hover:text-slate-200">Privacy Notice</a>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-phantix-700/30 pt-10 text-xs text-slate-400">
          <span>© 2026 Phantix Security Solutions</span>
          <span className="font-mono">api/v1 · 326 routes · 11 engines</span>
        </div>
      </div>
    </footer>
  );
}
