/**
 * Free Test Pentest — landing Hero funnel client.
 *
 * Mirrors `demo-requests.ts`: same API base, same error shape. The endpoint is
 * public, but it is *owned*: the submission is attributed to the visitor's own
 * domain (`anonymous:<domain>`) and only runs once the work email at that domain
 * is verified. Nothing is scanned before then.
 */
import { API_BASE } from "./config";

export type TestPentestRequest = {
  asset: string;
  email: string;
  company?: string;
  name?: string;
  consent: boolean;
  turnstile_token?: string;
};

export type TestPentestResult =
  | { ok: true; status: string; message: string }
  | { ok: false; error: string };

/** Coarse, human-readable reasons. The API deliberately stays vague so it
 *  cannot be used to probe which domains are already in the system. */
const MESSAGES: Record<string, string> = {
  consent_required: "Please confirm you are authorised to test this asset.",
  invalid_asset: "Enter a valid domain or URL, for example app.example.com.",
  invalid_email: "Enter a valid work email address.",
  work_email_required: "Please use your work email — free mailboxes can't prove domain ownership.",
  email_domain_mismatch: "Your email must be on the same domain as the asset you want tested.",
  non_public_address: "That host isn't publicly reachable, so there's nothing for us to test.",
  ip_literal_not_allowed: "Enter a domain name rather than an IP address.",
  non_public_host: "That host isn't publicly reachable.",
  unresolvable: "We couldn't resolve that domain.",
  domain_already_tested: "This domain has already had its free test pentest.",
  opted_out: "This domain has asked us not to scan it.",
  capacity: "We're at capacity for today — we'll email you when a slot frees up.",
  budget: "We're at capacity for today — we'll email you when a slot frees up.",
  captcha_failed: "Please complete the verification challenge and try again.",
  funnel_disabled: "The free test pentest is temporarily unavailable.",
};

export async function requestTestPentest(
  body: TestPentestRequest,
): Promise<TestPentestResult> {
  try {
    const res = await fetch(`${API_BASE}/funnel/test-pentest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const data = (await res.json().catch(() => ({}))) as { status?: string };
      return {
        ok: true,
        status: data.status ?? "pending_verification",
        message: "Check your inbox to confirm — nothing is scanned until you do.",
      };
    }
    // FastAPI puts the reason in `detail`; it is a coarse code, not free text.
    const detail = (await res.json().catch(() => ({}))) as { detail?: string };
    const code = String(detail?.detail ?? "unknown");
    return { ok: false, error: MESSAGES[code] ?? "Something went wrong. Please try again." };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}
