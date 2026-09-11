import { useState } from "react";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";
import { COOKIE_POLICY_PATH, getConsent, setConsent } from "@/lib/consent";
import { onConsentAccepted } from "@/lib/analytics";

// ── Analytics consent banner (landing) ───────────────────────────────────────

export default function CookieConsent() {
  const [open, setOpen] = useState(() => getConsent() === null);

  if (!open) return null;

  const choose = (choice: "accepted" | "declined") => {
    setConsent(choice);
    if (choice === "accepted") onConsentAccepted();
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Analytics consent"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-white/10 bg-phantix-950/95 px-4 py-3 shadow-2xl shadow-black/50 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3">
        <Cookie size={16} className="shrink-0 text-gold-400" />
        <p className="min-w-0 flex-1 text-xs leading-5 text-slate-400">
          We use <strong className="text-slate-200">first-party analytics</strong> to see which pages are
          useful — page path, referrer and coarse device info, with no cookies, no fingerprints and no
          personal data. Read our{" "}
          <Link to={COOKIE_POLICY_PATH} className="text-gold-400 underline hover:text-gold-300">
            cookies &amp; analytics policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button className="btn-ghost !px-3 !py-1.5 text-xs" onClick={() => choose("declined")}>
            Decline
          </button>
          <button className="btn-primary !px-3 !py-1.5 text-xs" onClick={() => choose("accepted")}>
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
