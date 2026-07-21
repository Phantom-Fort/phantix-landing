// ── Cross-surface URLs ────────────────────────────────────────────────────────
export const LANDING_URL =
  (import.meta.env.VITE_LANDING_URL as string | undefined) ?? "https://phantix.site";
export const PLATFORM_URL =
  (import.meta.env.VITE_PLATFORM_URL as string | undefined) ?? "https://platform.phantix.site";
export const APP_URL =
  (import.meta.env.VITE_APP_URL as string | undefined) ?? "https://app.phantix.site";

export const APP_DEMO_URL = `${APP_URL}/demo`;
export const APP_LOGIN_URL = `${APP_URL}/login`;
export const APP_DOCS_URL = `${APP_URL}/docs`;
export const PLATFORM_REGISTER_URL = `${PLATFORM_URL}/register`;
