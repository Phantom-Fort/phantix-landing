import { SANDBOX_APPLY_API as RAW } from "./config";

export const SANDBOX_APPLY_API = RAW;

export type SandboxPublicStatus = {
  max: number;
  seatsUsed: number;
  seatsRemaining: number;
  open: boolean;
  enrolled: number;
  pending?: number;
  label?: string;
};

export type ApplyBody = {
  organization_name: string;
  website?: string;
  contact_name: string;
  contact_email: string;
  country?: string;
  industry?: string;
  team_size?: string;
  use_case: string;
  hear_about?: string;
};

export async function fetchSandboxStatus(): Promise<SandboxPublicStatus | null> {
  try {
    const res = await fetch(`${SANDBOX_APPLY_API}/api/sandbox/status`);
    if (!res.ok) return null;
    return (await res.json()) as SandboxPublicStatus;
  } catch {
    // Proxy down — show empty open cohort so the form still renders
    return { max: 20, seatsUsed: 0, seatsRemaining: 20, open: true, enrolled: 0, label: "0 enrolled · 0/20 seats held" };
  }
}

export async function submitSandboxApply(body: ApplyBody): Promise<{ ok: boolean; detail?: string; application_id?: string }> {
  const res = await fetch(`${SANDBOX_APPLY_API}/api/sandbox/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail =
      typeof data?.detail === "string"
        ? data.detail
        : res.status === 409
          ? "Applications are closed or duplicate."
          : "Application failed";
    return { ok: false, detail };
  }
  return { ok: true, application_id: data.application_id };
}
