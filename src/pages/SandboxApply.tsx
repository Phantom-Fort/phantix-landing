import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Nav, Footer } from "@/components/chrome";
import SandboxApplyForm from "@/components/SandboxApplyForm";

/** Dedicated apply route — after submit, leaves back to home. */
export default function SandboxApply() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-phantix-950">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-grid-faint bg-grid [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-phantix-600/15 blur-[120px]" />
      </div>
      <Nav />
      <main className="relative mx-auto max-w-xl px-6 pb-20 pt-28">
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-gold-300">
          <ArrowLeft size={13} /> Back to home
        </Link>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <SandboxApplyForm leaveOnSuccess />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
