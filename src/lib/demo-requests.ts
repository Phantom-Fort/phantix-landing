// Demo-request lead capture — POST /api/v1/demo-requests.
//
// Contract (live on the backend since 2026-09-06):
//   POST /api/v1/demo-requests
//   { name, email, company, teamSize, phone?, message?, source, path, referrer, utm?, ts }
//   → 2xx on success. Any other status/network failure surfaces as an error in the UI.
//
// The lead is persisted and emailed to the superadmin notify address; staff
// triage it in the Staff Portal at /analytics → Demo requests
// (GET/PATCH /api/v1/admin/demo-requests).
import { API_BASE } from "./config";

export interface DemoRequestPayload {
  name: string;
  email: string;
  company: string;
  teamSize: string;
  phone?: string;
  message?: string;
  /** Where in the funnel the request was opened, e.g. "demo-tour-complete" | "demo-page-cta" | "nav-cta". */
  source: string;
}

function utmParams(): Record<string, string> | null {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
    const v = params.get(key);
    if (v) utm[key] = v;
  }
  return Object.keys(utm).length ? utm : null;
}

export async function submitDemoRequest(payload: DemoRequestPayload): Promise<void> {
  const body = JSON.stringify({
    ...payload,
    path: `${window.location.pathname}${window.location.hash || ""}`,
    referrer: document.referrer || null,
    utm: utmParams(),
    ts: Date.now(),
  });

  const res = await fetch(`${API_BASE}/demo-requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
}
