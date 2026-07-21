import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, Lock, Database, Eye, PlayCircle, BookOpen } from "lucide-react";
import { APP_DEMO_URL, APP_DOCS_URL } from "@/lib/links";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <div ref={heroRef} className="relative flex min-h-[100svh] items-center pt-24">
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-400/25 bg-gold-400/8 px-4 py-1.5 text-xs font-medium text-gold-300"
          >
            <ShieldCheck size={13} />
            Privacy-first security operations — your data never leaves your database
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="font-display text-[44px] font-bold leading-[1.04] tracking-tight text-white sm:text-[64px]"
          >
            The command centre for your{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 bg-clip-text text-transparent">
                entire attack surface
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-gold-400 to-transparent"
              />
            </span>
          </motion.h1>

          <p className="mt-3 text-[11px] font-mono uppercase tracking-[0.3em] text-gold-400">PROTECT. PREVENT. PERFORM.</p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38 }}
            className="mt-6 max-w-xl text-[17px] leading-8 text-slate-400"
          >
            Discover assets, run verified VAPT campaigns, prioritize risk with explainable scoring,
            prove compliance, and ship board-ready reports — from one console built on a
            <span className="text-slate-200"> dedicated-database privacy model</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-9 flex flex-wrap items-center gap-3.5"
          >
            <a href={APP_DEMO_URL} className="btn-primary !px-6 !py-3 !text-[15px]">
              <PlayCircle size={16} /> Explore the live demo
            </a>
            <a href={APP_DOCS_URL} className="btn-secondary !px-6 !py-3 !text-[15px]">
              <BookOpen size={16} /> Browse the docs
            </a>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="mt-3.5 text-xs text-slate-600"
          >
            No account needed — full product on a simulated tenant. Switch to your real organization anytime from the demo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-10 flex flex-wrap gap-x-10 gap-y-4"
          >
            {[
              ["326", "API routes"],
              ["11", "Product engines"],
              ["100%", "Verified-only reporting"],
              ["3 min", "Dual-control sessions"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="font-display text-2xl font-bold text-white">{v}</p>
                <p className="text-xs text-slate-500">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero visual — eagle + orbiting badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden aspect-square w-full max-w-[460px] lg:block"
        >
          <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-phantix-500/30" />
          <div className="absolute inset-8 rounded-full border border-phantix-600/25" />
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(51,85,181,0.35),transparent_65%)]" />
          <motion.img
            src="/logo-white.png"
            alt="Phantix eagle"
            className="absolute inset-0 m-auto w-[62%] object-contain drop-shadow-[0_0_60px_rgba(51,85,181,0.55)]"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {[
            { icon: <ShieldCheck size={15} />, label: "Verified findings", pos: "left-0 top-[18%]" },
            { icon: <Lock size={15} />, label: "Dual control", pos: "right-[-4%] top-[38%]" },
            { icon: <Database size={15} />, label: "Your database", pos: "bottom-[16%] left-[6%]" },
            { icon: <Eye size={15} />, label: "Full audit trail", pos: "bottom-[4%] right-[10%]" },
          ].map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.16, duration: 0.55 }}
              className={`absolute ${b.pos} glass-bright flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 shadow-card`}
            >
              <span className="text-gold-400">{b.icon}</span>
              {b.label}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="flex h-9 w-5 items-start justify-center rounded-full border border-slate-700 p-1.5"
        >
          <div className="h-2 w-1 rounded-full bg-gold-400" />
        </motion.div>
      </motion.div>
    </div>
  );
}
