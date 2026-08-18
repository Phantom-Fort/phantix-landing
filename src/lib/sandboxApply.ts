const RAW =
  (import.meta.env.VITE_SANDBOX_APPLY_API as string | undefined)?.replace(/\/+$/, "") ?? "";

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
  if (!SANDBOX_APPLY_API) {
    return { max: 20, seatsUsed: 0, seatsRemaining: 20, open: true, enrolled: 0, label: "0 enrolled · 0/20 seats held" };
  }
  try {
    const res = await fetch(`${SANDBOX_APPLY_API}/api/sandbox/status`);
    if (!res.ok) return null;
    return (await res.json()) as SandboxPublicStatus;
  } catch {
    return null;
  }
}

export async function submitSandboxApply(body: ApplyBody): Promise<{ ok: boolean; detail?: string; application_id?: string }> {
  if (!SANDBOX_APPLY_API) {
    return { ok: false, detail: "Sandbox apply API is not configured (VITE_SANDBOX_APPLY_API)." };
  }
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
