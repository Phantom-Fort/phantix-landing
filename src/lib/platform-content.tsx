import React from "react";
import { Globe, Zap, Smartphone, Cloud } from "lucide-react";

export interface PlatformPage {
  slug: string;
  navLabel: string;
  icon: React.ReactNode;
  eyebrow: string;
  headline: string;
  intro: string;
  points: string[];
  shot: string;
  alt: string;
  footnote?: string;
}

// Testing-domain pages — the depth behind the homepage's Capabilities section.
// Copy grounded in docs/05-product-capabilities.md; nothing here is invented.
export const PLATFORM_PAGES: PlatformPage[] = [
  {
    slug: "web-applications",
    navLabel: "Web applications",
    icon: <Globe size={15} />,
    eyebrow: "Web application security",
    headline: "OWASP Top 10 as the floor, not the ceiling",
    intro:
      "Most scanners stop at a signature match against a known template. SecureGraph runs the full offensive pipeline — subdomain discovery through exploitation — so what reaches your report is what a human reviewer would actually call a finding.",
    points: [
      "Full pipeline: subfinder → httpx → katana → nuclei → sqlmap → gowitness",
      "Authentication testing: brute force, credential stuffing, session fixation",
      "Injection coverage: SQL, NoSQL, LDAP and command injection",
      "CSRF and clickjacking detection on every scanned app",
      "Subdomain takeover detection as a high-priority module",
    ],
    shot: "vapt",
    alt: "VAPT campaigns view showing scoped web application assessments and their progress",
  },
  {
    slug: "apis",
    navLabel: "APIs",
    icon: <Zap size={15} />,
    eyebrow: "API security",
    headline: "Dedicated API security, beyond CVE matching",
    intro:
      "An API doesn't show up in a CVE feed when its authorization logic is wrong. SecureGraph tests the failures that actually get exploited in production — broken object-level access, weak tokens, abuse of rate limits — not just known-signature hits.",
    points: [
      "BOLA / BFLA detection and auth-bypass checks",
      "JWT validation testing — weak algorithms, expiry bypass, algorithm confusion",
      "Rate-limit and abuse-case probing",
      "OpenAPI / Postman import turns your spec into scan scope",
      "Business-logic heuristics, not just signature hits",
    ],
    shot: "assets",
    alt: "Attack-surface inventory listing discovered APIs alongside domains and subdomains",
  },
  {
    slug: "mobile",
    navLabel: "Mobile",
    icon: <Smartphone size={15} />,
    eyebrow: "Mobile security",
    headline: "APK intelligence from a single upload",
    intro:
      "Upload the build, get an inventory. Static analysis surfaces hardcoded secrets, exported components, and manifest misconfigurations before the app reaches a store review — no separate mobile-testing vendor required.",
    points: [
      "Static analysis of the manifest, permissions and components",
      "Hardcoded secret and credential-in-file detection",
      "Exported activity / provider checks with evidence",
      "Stored in object storage; inventory rows in your security database",
      "Re-analyze anytime — findings drive automatic risk creation",
    ],
    shot: "assets",
    alt: "Attack-surface inventory listing mobile builds alongside other discovered assets",
    footnote: "Dynamic / AVD testing goes deeper than static analysis and is offered as an engagement — see Pricing.",
  },
  {
    slug: "cloud",
    navLabel: "Cloud",
    icon: <Cloud size={15} />,
    eyebrow: "Cloud security",
    headline: "Assessed with the keys you grant, nothing wider",
    intro:
      "Cloud posture is an access problem before it's a scanning problem. SecureGraph works inside the credentials and scope you grant — no standing access, no surprise reach — and every finding it produces lands in the database you own.",
    points: [
      "Cloud and container packs, enabled when credentials and scope allow",
      "Network exposure: reachable hosts, ports and services with first-seen / last-seen timelines",
      "TLS posture on public endpoints — legacy protocols, weak ciphers, certificate issues",
      "CIS-style host targets for the workloads behind the perimeter",
      "Docker-isolated execution with a per-organization concurrency lock",
    ],
    shot: "assets",
    alt: "Attack-surface inventory listing discovered cloud hosts, ports and services",
    footnote:
      "Cloud and container packs are an add-on, and what runs depends on the credentials and scope you grant — ask us what's live for your provider today.",
  },
];

export function getPlatformPage(slug: string | undefined): PlatformPage | undefined {
  return PLATFORM_PAGES.find((p) => p.slug === slug);
}
