// Builds landing/src/lib/integrations.ts from the SOC Enhancement connector
// catalog + simple-icons (legacy v11, which still ships the full brand set).
//
// Usage: node scripts/build-integrations.mjs
//
// Matching strategy, in order:
//   1. manual OVERRIDES (name -> slug, or null to force a monogram fallback)
//   2. exact match on normalized title / slug / aliases
//   3. prefix match (icon title/slug is a prefix of the connector name,
//      e.g. "Qualys VMDR" -> "qualys"), longest prefix wins
//
// Anything unmatched renders as a monogram in the marquee.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CATALOG = path.resolve(__dirname, "../../SOC Enhancement/appendices/appendix-h-integration-hub-expanded-catalog.md");
const OUT = path.resolve(__dirname, "../src/lib/integrations.ts");

const si = require("simple-icons-legacy");
const ICONS = Object.values(si);

const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");

// name -> slug (string) or null (force monogram). Only the cases the automatic
// matcher can't get right.
const OVERRIDES = {
  // Cloud providers group their many products under one mark.
  "Amazon Web Services": "amazonaws",
  "Amazon ECR": "amazonaws",
  "Amazon SES": "amazonaws",
  "AWS API Gateway": "amazonaws",
  "AWS Backup": "amazonaws",
  "AWS Secrets Manager": "amazonaws",
  "AWS Security Hub": "amazonaws",
  "AWS WAF": "amazonaws",
  "Microsoft Azure": "microsoftazure",
  "Azure API Management": "microsoftazure",
  "Azure Backup": "microsoftazure",
  "Azure Container Registry": "microsoftazure",
  "Azure Key Vault": "microsoftazure",
  "Azure Repos": "microsoftazure",
  "Azure WAF (Front Door)": "microsoftazure",
  "Microsoft Entra ID (OIDC)": "microsoftazure",
  "Microsoft Entra ID (SAML)": "microsoftazure",
  "Microsoft Defender for Cloud": "microsoftazure",
  "Microsoft Sentinel": "microsoftazure",
  "Microsoft Defender for Endpoint": "microsoft",
  "Microsoft Intune": "microsoft",
  "Microsoft Dynamics 365": "microsoft",
  "Defender for Office 365": "microsoft",
  "Google Cloud Platform": "googlecloud",
  "GCP API Gateway": "googlecloud",
  "GCP Artifact Registry": "googlecloud",
  "GCP Backup": "googlecloud",
  "GCP Secret Manager": "googlecloud",
  "GCP Security Command Center": "googlecloud",
  "Google Workspace (OIDC)": "google",
  "Google Workspace Events": "google",
  "Google Workspace Security": "google",
  "Okta (OIDC)": "okta",
  "Jira Cloud": "jira",
  "Jira Server/DC": "jira",
  "Palo Alto Cortex XDR": "paloaltonetworks",
  "Palo Alto Cortex XSOAR": "paloaltonetworks",
  "Palo Alto NGFW/IPS": "paloaltonetworks",
  // Not in simple-icons v11 — keep as monogram rather than a wrong match.
  "Wiz": null,
  "Devo": null,
  "Check Point": null,
};

// Exact-match index on normalized title / slug / aliases.
const exact = new Map();
const prefixCandidates = [];
for (const icon of ICONS) {
  const entry = { slug: icon.slug, path: icon.path, title: icon.title };
  const keys = [norm(icon.title), norm(icon.slug)];
  for (const aka of icon.aliases?.aka || []) keys.push(norm(aka));
  for (const k of keys) if (k && !exact.has(k)) exact.set(k, entry);
  prefixCandidates.push({ norm: norm(icon.title), entry, len: norm(icon.title).length });
  prefixCandidates.push({ norm: norm(icon.slug), entry, len: norm(icon.slug).length });
}
// longest prefix first so "elasticcloud" beats "elastic" only when it actually prefixes.
prefixCandidates.sort((a, b) => b.len - a.len);

function resolve(name) {
  if (Object.prototype.hasOwnProperty.call(OVERRIDES, name)) {
    const slug = OVERRIDES[name];
    if (slug === null) return null;
    const hit = ICONS.find((i) => i.slug === slug);
    return hit ? { slug: hit.slug, path: hit.path } : null;
  }

  const key = norm(name);
  if (exact.has(key)) return exact.get(key);

  // icon-name is a prefix of connector name ("Qualys VMDR" -> qualys)
  for (const c of prefixCandidates) {
    if (c.len >= 3 && key.startsWith(c.norm)) return c.entry;
  }
  // connector name is a prefix of icon-name ("Traefik" -> traefikproxy)
  for (const c of prefixCandidates) {
    if (key.length >= 4 && c.norm.startsWith(key)) return c.entry;
  }
  return null;
}

// Extract connector display names in catalog order.
const md = fs.readFileSync(CATALOG, "utf8");
const names = [];
for (const line of md.split("\n")) {
  if (!/^\| `/.test(line)) continue;
  const cols = line.split("|");
  if (cols.length < 8) continue;
  const n = (cols[2] || "").trim();
  if (n && n !== "Display Name") names.push(n);
}
const uniq = [...new Set(names)];

const rows = uniq.map((name) => {
  const m = resolve(name);
  return {
    name,
    slug: m ? m.slug : null,
    path: m ? m.path : null,
  };
});

const withIcon = rows.filter((r) => r.path).length;
const monogram = rows.length - withIcon;

const lines = rows.map((r) => {
  const name = JSON.stringify(r.name);
  if (!r.path) return `  { name: ${name}, slug: null, path: null },`;
  return `  { name: ${name}, slug: ${JSON.stringify(r.slug)}, path: ${JSON.stringify(r.path)} },`;
});

const out = [
  "// Generated by scripts/build-integrations.mjs — do not edit by hand.",
  "//",
  `// ${rows.length} connectors from the SOC Enhancement catalog (appendix H).`,
  `// ${withIcon} matched to a simple-icons brand mark; ${monogram} use a monogram fallback.`,
  "",
  "export interface Integration {",
  "  name: string;",
  "  slug: string | null;",
  "  path: string | null;",
  "}",
  "",
  "export const INTEGRATIONS: Integration[] = [",
  ...lines,
  "];",
  "",
].join("\n");

fs.writeFileSync(OUT, out, "utf8");
console.log(`Wrote ${rows.length} integrations -> ${OUT}`);
console.log(`  with icon: ${withIcon}`);
console.log(`  monogram fallback: ${monogram}`);

// Report monograms for review.
console.log("\nMONOGRAMS:");
for (const r of rows) if (!r.path) console.log("  -", r.name);
