/**
 * Landing (phantixlabs.com) — hardcoded browser config (no VITE_*).
 * Does not collect sandbox data; CTAs open Command Centre apply page.
 */
export const API_BASE = "/api/v1";
export const LANDING_URL = "https://phantixlabs.com";
export const PLATFORM_URL = "https://platform.phantixlabs.com";
export const APP_URL = "https://app.phantixlabs.com";
/** The operator product ships as four applications, each on its own host. */
export const ATTACK_URL = "https://attack.phantixlabs.com";
export const DEFEND_URL = "https://defend.phantixlabs.com";
export const CODE_URL = "https://code.phantixlabs.com";
/** Public form on Command Centre (separate host). */
export const SANDBOX_APPLY_URL = `${APP_URL}/sandbox-apply`;
export const AGI_ENABLED = true;

/**
 * Cloudflare Turnstile site key for the free test-pentest widget.
 *
 * Public by design (it ships in the page); the matching secret is verified
 * server-side. This widget is bound to the hostnames it renders on —
 * `phantixlabs.com` here — not to the staging API domain, which the browser
 * only reaches through the `/api` rewrite in vercel.json.
 */
export const TURNSTILE_SITE_KEY = "0x4AAAAAAFBSaNlvt3D770NG";
