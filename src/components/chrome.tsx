import React, { useEffect, useState } from "react";
import { ArrowRight, BookOpen, PlayCircle, FlaskConical } from "lucide-react";
import { APP_DEMO_URL, APP_DOCS_URL, APP_LOGIN_URL, APP_URL, PLATFORM_URL } from "@/lib/links";
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
          <a href="#privacy" className="transition-colors hover:text-white">Privacy-first</a>
          <a href="#capabilities" className="transition-colors hover:text-white">Capabilities</a>
          <a href="#pipeline" className="transition-colors hover:text-white">Pipeline</a>
          <a href="#ai" className="transition-colors hover:text-white">AI</a>
          <a href="#engines" className="transition-colors hover:text-white">Engines</a>
          <a href="#pricing" className="transition-colors hover:text-white">Pricing</a>
        </nav>
        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <a
            href="/#sandbox-apply"
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
    <footer className="border-t border-phantix-700/30 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <BrandLogo className="h-10 w-10" lightSrc="/logo-transparent.png" darkSrc="/logo-white.png" />
              <div>
                <p className="font-display text-sm font-bold text-white">Phantix Security Solutions</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-400">Protect. Prevent. Perform.</p>
              </div>
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-500">
              Privacy-first security operations. Your security data lives in your database — Phantix runs the
              tooling, never touches the record.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-14 gap-y-2 text-xs text-slate-500 sm:grid-cols-4">
            <div className="space-y-2">
              <p className="mb-2.5 font-semibold uppercase tracking-wider text-slate-400">Product</p>
              <a href="#capabilities" className="block hover:text-slate-300">Capabilities</a>
              <a href="#pipeline" className="block hover:text-slate-300">Pipeline</a>
              <a href="#pricing" className="block hover:text-slate-300">Pricing</a>
            </div>
            <div className="space-y-2">
              <p className="mb-2.5 font-semibold uppercase tracking-wider text-slate-400">Surfaces</p>
              <a href={APP_URL} className="block hover:text-slate-300">app.phantix.site</a>
              <a href={PLATFORM_URL} className="block hover:text-slate-300">platform.phantix.site</a>
              <a href={APP_DOCS_URL} className="block hover:text-slate-300">Documentation</a>
            </div>
            <div className="space-y-2">
              <p className="mb-2.5 font-semibold uppercase tracking-wider text-slate-400">Start</p>
              <a href={APP_DEMO_URL} className="block hover:text-slate-300">Live demo</a>
              <a href="/#sandbox-apply" className="block hover:text-slate-300">Sandbox apply</a>
              <a href={APP_LOGIN_URL} className="block hover:text-slate-300">Sign in</a>
              <a href={`${PLATFORM_URL}/register`} className="block hover:text-slate-300">Register</a>
            </div>
            <div className="space-y-2">
              <p className="mb-2.5 font-semibold uppercase tracking-wider text-slate-400">Legal</p>
              <a href="/terms" className="block hover:text-slate-300">Terms of Service</a>
              <a href="/aup" className="block hover:text-slate-300">Acceptable Use Policy</a>
              <a href="/privacy" className="block hover:text-slate-300">Privacy Notice</a>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-phantix-700/30 pt-6 text-[11px] text-slate-600">
          <span>© 2026 Phantix Security Solutions</span>
          <span className="font-mono">api/v1 · 326 routes · 11 engines</span>
        </div>
      </div>
    </footer>
  );
}
