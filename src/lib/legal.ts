// Public legal content fetcher for the landing (Terms / AUP / Privacy).
// These endpoints require no auth; the landing renders the active document.

export interface LegalSection {
  id?: string;
  title?: string;
  body?: string;
  items?: string[];
}

export interface LegalDocument {
  doc_key?: string;
  title?: string;
  version?: string;
  effective?: string;
  summary?: string;
  sections?: LegalSection[];
  acceptance_required_copy?: string;
  links?: { id?: string; label?: string; path?: string }[];
}

const RAW_API_BASE = (import.meta.env.VITE_API_BASE as string | undefined) ?? "";
const API_BASE = (() => {
  if (!RAW_API_BASE) return RAW_API_BASE;
  let base = RAW_API_BASE.replace(/\/+$/, "").replace(/^(?!https?:\/\/|\/)/i, "https://");
  if (base.startsWith("/")) return base;
  if (!/\/api\/v1(?:\/|$)/i.test(base)) base = `${base}/api/v1`;
  return base;
})();

export async function loadLegalDocument(docKey: string): Promise<LegalDocument | null> {
  try {
    if (!API_BASE) throw new Error("no API base");
    const res = await fetch(`${API_BASE}/organizations/${docKey}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as LegalDocument;
  } catch {
    return null;
  }
}
