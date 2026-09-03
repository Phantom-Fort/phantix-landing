import React, { useEffect, useState } from "react";
import { ArrowRight, BookOpen, PlayCircle, FlaskConical } from "lucide-react";
import { APP_DEMO_URL, APP_DOCS_URL, APP_LOGIN_URL, APP_URL, PLATFORM_URL, SANDBOX_APPLY_URL } from "@/lib/links";
import { cx } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BrandLogo } from "@/components/BrandLogo";

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
          <p className="font-display text-[15px] font-bold text-white">Phantix</p>
          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-gold-400">Security Solutions</p>
        </div>
        <nav className="ml-8 hidden items-center gap-5 text-sm text-slate-400 xl:flex">
          {/* Every target must be a real section id — Pipeline and Engines were
              retired in the v3 cut, so they don't get nav slots. */}
          <a href="#privacy-first" className="transition-colors hover:text-white">Privacy-first</a>
          <a href="#capabilities" className="transition-colors hover:text-white">Capabilities</a>
          <a href="#how-it-works" className="transition-colors hover:text-white">How it works</a>
          <a href="#ai" className="transition-colors hover:text-white">AI</a>
          <a href="#pricing" className="transition-colors hover:text-white">Pricing</a>
        </nav>
        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <a
            href={SANDBOX_APPLY_URL}
            title="Sandbox"
            aria-label="Sandbox"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-phantix-700/50 bg-phantix-900/50 text-slate-400 transition-colors hover:border-gold-400/40 hover:text-gold-300"
          >
            <FlaskConical size={16} />
          </a>
          <a
            href={APP_DOCS_URL}
            title="Documentation"
            aria-label="Documentation"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-phantix-700/50 bg-phantix-900/50 text-slate-400 transition-colors hover:border-phantix-500/50 hover:text-white"
          >
            <BookOpen size={16} />
          </a>
          <a href={APP_LOGIN_URL} className="btn-secondary hidden !px-3.5 !py-2 sm:inline-flex">Sign in</a>
          <a href={APP_DEMO_URL} className="btn-primary !px-3.5 !py-2">
            <PlayCircle size={15} /> <span className="hidden sm:inline">Live demo</span>
          </a>
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
              Privacy-first security operations. Your security data lives in your database — Phantix runs the
              tooling, never touches the record.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-16 gap-y-10 text-sm text-slate-400 sm:grid-cols-4">
            <div className="space-y-3">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">Product</p>
              <a href="#capabilities" className="block transition-colors hover:text-slate-200">Capabilities</a>
              <a href="#how-it-works" className="block transition-colors hover:text-slate-200">How it works</a>
              <a href="#pricing" className="block transition-colors hover:text-slate-200">Pricing</a>
            </div>
            <div className="space-y-3">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">Surfaces</p>
              <a href={APP_URL} className="block transition-colors hover:text-slate-200">app.phantixlabs.com</a>
              <a href={PLATFORM_URL} className="block transition-colors hover:text-slate-200">platform.phantixlabs.com</a>
              <a href={APP_DOCS_URL} className="block transition-colors hover:text-slate-200">Documentation</a>
            </div>
            <div className="space-y-3">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">Start</p>
              <a href={APP_DEMO_URL} className="block transition-colors hover:text-slate-200">Live demo</a>
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
