import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Cookie, RefreshCw, ShieldCheck } from "lucide-react";
import { Nav, Footer } from "@/components/chrome";
import { clearConsent, getConsent } from "@/lib/consent";

// ── Cookies & analytics policy (public) ──────────────────────────────────────

export default function Cookies() {
  const consent = getConsent();

  const reset = () => {
    clearConsent();
    window.location.reload();
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-phantix-950">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-grid-faint bg-grid [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black,transparent)]" />
      </div>

      <Nav />
      <main className="relative px-4 pb-16 pt-28 md:pt-36">
        <div className="mx-auto max-w-3xl">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-200">
            <ArrowLeft size={15} /> Back to phantixlabs.com
          </Link>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
            <div className="flex items-center gap-4">
              <img src="/logo-white.png" alt="SecureGraph" className="h-16 w-16 object-contain" />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-400">
                  Cookies &amp; Analytics
                </p>
                <h1 className="mt-1 text-2xl font-semibold text-white">Cookies &amp; analytics policy</h1>
              </div>
            </div>
          </motion.div>

          <div className="mt-10 space-y-8 text-sm leading-6 text-slate-300">
            <section>
              <h2 className="flex items-center gap-2 text-base font-semibold text-white">
                <Cookie size={16} className="text-gold-400" /> We do not use advertising cookies
              </h2>
              <p className="mt-2.5">
                We use <strong className="text-slate-100">first-party, cookieless analytics</strong> to
                understand which pages are useful so we can improve the site. We do <strong>not</strong> use
                advertising cookies, we do <strong>not</strong> sell data, and we do <strong>not</strong> track
                you across other sites.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">What the analytics records</h2>
              <ul className="mt-3 space-y-2">
                {[
                  "Page path and the referring page",
                  "Coarse device info: screen size, browser language and time zone",
                  "Campaign parameters (UTM) when a link carries them",
                  "A random per-session id kept in sessionStorage — not a cookie",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <ShieldCheck size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-slate-400">
                It does <strong>not</strong> record your name, email, keystrokes, page content or any personal
                data. We honour <code>Do Not Track</code> and a deployment kill-switch.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">Your choice</h2>
              <p className="mt-2.5">
                Analytics runs only after you accept. You can change your choice at any time; declining stops
                all beacons and affects nothing else.
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Current choice:{" "}
                <strong className="text-slate-300">
                  {consent === "accepted" ? "Accepted" : consent === "declined" ? "Declined" : "Not set"}
                </strong>
              </p>
              <button className="btn-secondary mt-4 text-xs" onClick={reset}>
                <RefreshCw size={13} className="mr-1.5 inline" /> Change my choice
              </button>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">Retention &amp; contact</h2>
              <p className="mt-2.5">
                Analytics records are retained in aggregate for product measurement and are not used to
                identify you. For access, correction or erasure requests, contact our Data Protection Officer
                at privacy@phantixlabs.com.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
