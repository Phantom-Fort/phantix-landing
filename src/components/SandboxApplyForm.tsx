import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FlaskConical, CheckCircle2, Loader2 } from "lucide-react";
import { fetchSandboxStatus, submitSandboxApply, type SandboxPublicStatus } from "@/lib/sandboxApply";
import { cx } from "@/lib/utils";

const empty = {
  organization_name: "",
  website: "",
  contact_name: "",
  contact_email: "",
  country: "",
  industry: "",
  team_size: "",
  use_case: "",
  hear_about: "",
};

type Props = {
  /** After success, leave landing (redirect home). Default true. */
  leaveOnSuccess?: boolean;
  /** Compact layout for homepage section */
  compact?: boolean;
  className?: string;
};

/** Shared sandbox application form — used on homepage section and /sandbox-apply. */
export default function SandboxApplyForm({ leaveOnSuccess = true, compact = false, className }: Props) {
  const navigate = useNavigate();
  const [status, setStatus] = useState<SandboxPublicStatus | null>(null);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    void fetchSandboxStatus().then(setStatus);
  }, []);

  useEffect(() => {
    if (!done || !leaveOnSuccess) return;
    const t = window.setTimeout(() => navigate("/", { replace: true }), 2800);
    return () => window.clearTimeout(t);
  }, [done, leaveOnSuccess, navigate]);

  // On homepage success: scroll to top after brief thank-you
  useEffect(() => {
    if (!done || leaveOnSuccess) return;
    const t = window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2200);
    return () => window.clearTimeout(t);
  }, [done, leaveOnSuccess]);

  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (status && !status.open) {
      setError("The sandbox cohort is full (20 organizations).");
      return;
    }
    setBusy(true);
    try {
      const res = await submitSandboxApply({
        organization_name: form.organization_name.trim(),
        website: form.website.trim() || undefined,
        contact_name: form.contact_name.trim(),
        contact_email: form.contact_email.trim(),
        country: form.country.trim() || undefined,
        industry: form.industry.trim() || undefined,
        team_size: form.team_size.trim() || undefined,
        use_case: form.use_case.trim(),
        hear_about: form.hear_about.trim() || undefined,
      });
      if (!res.ok) {
        setError(res.detail || "Application failed");
        void fetchSandboxStatus().then(setStatus);
        return;
      }
      setDone(true);
      void fetchSandboxStatus().then(setStatus);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setBusy(false);
    }
  };

  const enrolled = status?.enrolled ?? 0;
  const max = status?.max ?? 20;
  const used = status?.seatsUsed ?? 0;
  const open = status?.open !== false;

  return (
    <div className={cx("rounded-3xl border border-phantix-700/40 bg-phantix-900/50 p-6 shadow-card backdrop-blur-sm sm:p-8", className)}>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-400/15 text-gold-300">
          <FlaskConical size={22} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-400">Design partners</p>
          <h2 className={cx("font-display font-bold text-white", compact ? "text-lg" : "text-xl")}>
            Apply for sandbox access
          </h2>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl font-bold text-white">
            <span className="text-gold-300">{enrolled}</span>
            <span className="text-slate-500">/{max}</span>
          </p>
          <p className="text-[10px] uppercase tracking-wider text-slate-500">enrolled</p>
        </div>
      </div>

      <div className="mb-5">
        <div className="mb-1.5 flex justify-between text-[11px] text-slate-500">
          <span>{used}/{max} seats held</span>
          <span>{open ? `${Math.max(0, max - used)} open` : "closed"}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-phantix-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-600 transition-all"
            style={{ width: `${Math.min(100, (used / max) * 100)}%` }}
          />
        </div>
      </div>

      {done ? (
        <div className="py-8 text-center">
          <CheckCircle2 size={36} className="mx-auto text-emerald-400" />
          <p className="mt-4 font-display text-lg font-semibold text-white">Application submitted</p>
          <p className="mt-2 text-sm text-slate-400">
            Phantix staff will review and enroll your org.
            {leaveOnSuccess ? " Leaving this page…" : " Thank you."}
          </p>
        </div>
      ) : !open ? (
        <div className="py-6 text-center">
          <p className="text-sm font-semibold text-slate-200">Cohort is full</p>
          <p className="mt-2 text-xs text-slate-500">All {max} sandbox seats are taken.</p>
        </div>
      ) : (
        <form className="space-y-3.5" onSubmit={(e) => void submit(e)}>
          <div>
            <label className="label">Organization name *</label>
            <input className="input" required value={form.organization_name} onChange={set("organization_name")} placeholder="Acme Security Ltd" />
          </div>
          <div>
            <label className="label">Website</label>
            <input className="input" value={form.website} onChange={set("website")} placeholder="https://" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="label">Contact name *</label>
              <input className="input" required value={form.contact_name} onChange={set("contact_name")} />
            </div>
            <div>
              <label className="label">Work email *</label>
              <input className="input" type="email" required value={form.contact_email} onChange={set("contact_email")} />
            </div>
          </div>
          {!compact && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="label">Country</label>
                <input className="input" value={form.country} onChange={set("country")} />
              </div>
              <div>
                <label className="label">Industry</label>
                <input className="input" value={form.industry} onChange={set("industry")} placeholder="Fintech, health…" />
              </div>
            </div>
          )}
          <div>
            <label className="label">Team size</label>
            <select className="input" value={form.team_size} onChange={set("team_size")}>
              <option value="">Select…</option>
              <option value="1-5">1–5</option>
              <option value="6-20">6–20</option>
              <option value="21-50">21–50</option>
              <option value="51+">51+</option>
            </select>
          </div>
          <div>
            <label className="label">Why sandbox? What will you test? *</label>
            <textarea className="input min-h-[88px]" required minLength={10} value={form.use_case} onChange={set("use_case")} placeholder="SOC, assets, reports, Pentest Agent…" />
          </div>
          {!compact && (
            <div>
              <label className="label">How did you hear about us?</label>
              <input className="input" value={form.hear_about} onChange={set("hear_about")} />
            </div>
          )}
          {error && <p className="text-xs text-severity-critical">{error}</p>}
          <p className="text-[11px] leading-5 text-slate-500">
            Limited to {max} organizations. Staff review applications, then enroll you on Platform + Command Centre.
          </p>
          <button type="submit" className="btn-primary w-full !py-3" disabled={busy}>
            {busy ? <Loader2 size={16} className="animate-spin" /> : <FlaskConical size={16} />} Submit application
          </button>
        </form>
      )}
    </div>
  );
}
