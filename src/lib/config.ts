/**
 * Same-origin only — browser never sees upstream host in Network tab.
 * Vite/Vercel proxy /api → backend, /sandbox-apply → apply service.
 */
export const API_BASE = "/api/v1";
/** Relative prefix; vite rewrites to sandbox-apply-api. */
export const SANDBOX_APPLY_API = "/sandbox-apply";
export const LANDING_URL = "https://phantix.site";
export const PLATFORM_URL = "https://platform.phantix.site";
export const APP_URL = "https://app.phantix.site";
export const AGI_ENABLED = true;
export const UPSTREAM_API_ORIGIN = "https://staging.phantix.site";
