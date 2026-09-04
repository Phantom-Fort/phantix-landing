// Downloads a real favicon for each connector that has no simple-icons mark,
// from the vendor's own website (via Google's favicon proxy). Output is written
// to landing/public/integrations/ and a name -> path map to
// landing/src/lib/favicons.ts.
//
// Usage: node scripts/fetch-favicons.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "../public/integrations");
const OUT_TS = path.resolve(__dirname, "../src/lib/favicons.ts");

// name -> domain (or null to keep the monogram fallback). Curated for the 151
// connectors that have no simple-icons mark.
const DOMAIN_MAP = {
  "Email Alerts": null,
  "Pushover": "pushover.net",
  "Gotify": "gotify.net",
  "ServiceNow": "servicenow.com",
  "Monday.com": "monday.com",
  "Freshservice": "freshservice.com",
  "TOPdesk": "topdesk.com",
  "Incident.io": "incident.io",
  "FireHydrant": "firehydrant.com",
  "xMatters": "xmatters.com",
  "OnPage": "onpage.com",
  "OneLogin": "onelogin.com",
  "PingOne": "pingidentity.com",
  "JumpCloud": "jumpcloud.com",
  "n8n": "n8n.io",
  "Tines": "tines.com",
  "Custom Webhook": null,
  "Workato": "workato.com",
  "SARIF Ingest": null,
  "Syslog Receiver": null,
  "Generic Webhook": null,
  "Linode": "linode.com",
  "Tencent Cloud": "cloud.tencent.com",
  "KnowBe4": "knowbe4.com",
  "Proofpoint TAP": "proofpoint.com",
  "Mimecast": "mimecast.com",
  "Abnormal Security": "abnormalsecurity.com",
  "Tessian": "tessian.com",
  "Area 1 (Cloudflare)": "cloudflare.com",
  "IronScales": "ironscales.com",
  "Cyren Inbound Security": "cyren.com",
  "Barracuda Email Security": "barracuda.com",
  "SpamTitan": "titanhq.com",
  "MailGuard": "mailguard.com.au",
  "DMARC Analyzer": "dmarcanalyzer.com",
  "Valimail": "valimail.com",
  "dmarcian": "dmarcian.com",
  "OnMicrosoft": "microsoft.com",
  "CrowdStrike Falcon": "crowdstrike.com",
  "SentinelOne Singularity": "sentinelone.com",
  "Wazuh EDR": "wazuh.com",
  "Velociraptor": "docs.velociraptor.app",
  "Trellix EDR": "trellix.com",
  "Sophos Intercept X": "sophos.com",
  "ESET Protect": "eset.com",
  "FortiEDR": "fortinet.com",
  "Cylance (BlackBerry)": "cylance.com",
  "Cybereason XDR": "cybereason.com",
  "Securonix XDR": "securonix.com",
  "OSSEC": "ossec.net",
  "osquery (Fleet)": "osquery.io",
  "Wazuh SIEM": "wazuh.com",
  "LogRhythm": "logrhythm.com",
  "Securonix SIEM": "securonix.com",
  "FortiSIEM": "fortinet.com",
  "AlienVault OSSIM": "alienvault.com",
  "SolarWinds SEM": "solarwinds.com",
  "Devo": "devo.com",
  "RSA NetWitness": "netwitness.com",
  "Security Onion": "securityonion.net",
  "Humio (CrowdStrike)": "crowdstrike.com",
  "TheHive": "thehive-project.org",
  "Shuffle SOAR": "shuffler.io",
  "Swimlane": "swimlane.com",
  "Siemplify (Google)": "google.com",
  "Demisto (Cortex XSOAR legacy)": "paloaltonetworks.com",
  "FortiSOAR": "fortinet.com",
  "D3 SOAR": "d3security.com",
  "Torq": "torq.io",
  "Suricata": "suricata.io",
  "Snort": "snort.org",
  "Zeek (Bro)": "zeek.org",
  "Fail2ban": "fail2ban.org",
  "Check Point": "checkpoint.com",
  "WatchGuard": "watchguard.com",
  "Sophos Firewall": "sophos.com",
  "CrowdStrike Falcon Firewall": "crowdstrike.com",
  "Imperva WAF": "imperva.com",
  "Darktrace DETECT": "darktrace.com",
  "Vectra AI": "vectra.ai",
  "ExtraHop Reveal(x)": "extrahop.com",
  "Plixer Scrutinizer": "plixer.com",
  "Kentik": "kentik.com",
  "Awake Security": "awakesecurity.com",
  "Corelight (Zeek appliances)": "corelight.com",
  "Tenable.io / Nessus": "tenable.com",
  "OpenVAS / Greenbone": "openvas.org",
  "Nuclei": "projectdiscovery.io",
  "DefectDojo": "defectdojo.com",
  "Dependency-Track": "dependencytrack.org",
  "Wiz": "wiz.io",
  "Sysdig Secure": "sysdig.com",
  "Semgrep": "semgrep.dev",
  "Generic SAST": null,
  "Generic SCA": null,
  "Generic DAST": null,
  "MISP": "misp-project.org",
  "OpenCTI": "filigran.io",
  "Recorded Future": "recordedfuture.com",
  "AlienVault OTX": "alienvault.com",
  "Anomali": "anomali.com",
  "ThreatConnect": "threatconnect.com",
  "ThreatQuotient": "threatq.com",
  "EclecticIQ": "eclecticiq.com",
  "Cyware": "cyware.com",
  "Flashpoint": "flashpoint.io",
  "CrowdStrike Falcon Intel": "crowdstrike.com",
  "RiskIQ (Microsoft)": "microsoft.com",
  "STIX/TAXII Feed": "oasis-open.org",
  "URLhaus": "abuse.ch",
  "Emerging Threats (ET)": "proofpoint.com",
  "Tor Exit Nodes": "torproject.org",
  "TruffleHog": "trufflesecurity.com",
  "Doppler": "doppler.com",
  "Rubrik": "rubrik.com",
  "Commvault": "commvault.com",
  "Cohesity": "cohesity.com",
  "Acronis Cyber Protect": "acronis.com",
  "Lacework (Fortinet)": "lacework.com",
  "CrowdStrike Horizon": "crowdstrike.com",
  "Checkov (Bridgecrew)": "bridgecrew.io",
  "Terrascan": "tenable.com",
  "KICS": "checkmarx.com",
  "NeuVector (SUSE)": "neuvector.com",
  "Imperva DAM": "imperva.com",
  "pgAudit (PostgreSQL)": "postgresql.org",
  "SQL Server Audit": "microsoft.com",
  "MobileIron (Ivanti)": "ivanti.com",
  "Jamf Pro": "jamf.com",
  "Hexnode MDM": "hexnode.com",
  "Scalefusion": "scalefusion.com",
  "Miradore": "miradore.com",
  "Workday": "workday.com",
  "Rippling": "rippling.com",
  "Gusto": "gusto.com",
  "Teams Events": "microsoft.com",
  "SendGrid": "sendgrid.com",
  "Plivo": "plivo.com",
  "Africa's Talking": "africastalking.com",
  "Guardrails AI": "guardrailsai.com",
  "Lakera Guard": "lakera.ai",
  "Calypso AI": "calypso.ai",
  "Protect AI Guardian": "protectai.com",
  "Robust Intelligence": "robustintelligence.com",
  "WhyLabs": null,
  "Genetec Security Center": "genetec.com",
  "HID Global": "hidglobal.com",
  "Verkada": "verkada.com",
  "LenelS2 OnGuard": null,
  "Avigilon": "avigilon.com",
  "Salto KS": "saltosystems.com",
};

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const ICO_MAGIC = Buffer.from([0x00, 0x00, 0x01, 0x00]);

function classifyImage(buf) {
  if (buf.length > 200 && buf.subarray(0, 8).equals(PNG_MAGIC)) return "png";
  if (buf.length > 200 && buf.subarray(0, 4).equals(ICO_MAGIC)) return "ico";
  if (buf.length > 200 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  return null;
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const results = [];
const entries = Object.entries(DOMAIN_MAP);

async function fetchIcon(domain) {
  // 1. Google favicon proxy (returns PNG for most sites).
  try {
    const res = await fetch(
      `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`,
      { signal: AbortSignal.timeout(15000) },
    );
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer());
      const kind = classifyImage(buf);
      if (kind) return { buf, ext: kind };
    }
  } catch {}
  // 2. DuckDuckGo icons proxy (returns .ico, which still renders in <img>).
  try {
    const res = await fetch(`https://icons.duckduckgo.com/ip3/${encodeURIComponent(domain)}.ico`, {
      signal: AbortSignal.timeout(15000),
    });
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer());
      const kind = classifyImage(buf);
      if (kind) return { buf, ext: kind };
    }
  } catch {}
  return null;
}

for (const [name, domain] of entries) {
  if (!domain) {
    results.push({ name, file: null });
    continue;
  }
  try {
    const icon = await fetchIcon(domain);
    if (!icon) throw new Error("no image from either proxy");
    const file = `${slugify(name)}.${icon.ext}`;
    fs.writeFileSync(path.join(OUT_DIR, file), icon.buf);
    results.push({ name, file });
  } catch (err) {
    console.error(`FAIL ${name} (${domain}): ${err.message}`);
    results.push({ name, file: null });
  }
  // Small polite delay to avoid hammering the proxy.
  await new Promise((r) => setTimeout(r, 40));
}

const ok = results.filter((r) => r.file).length;
console.log(`Downloaded ${ok}/${results.length} favicons -> ${OUT_DIR}`);

const lines = results
  .filter((r) => r.file)
  .map((r) => `  ${JSON.stringify(r.name)}: "/integrations/${r.file}",`);

const ts = [
  "// Generated by scripts/fetch-favicons.mjs — do not edit by hand.",
  "// Connector name -> local favicon asset (for entries without a simple-icons mark).",
  "",
  "export const FAVICONS: Record<string, string> = {",
  ...lines,
  "};",
  "",
].join("\n");

fs.writeFileSync(OUT_TS, ts, "utf8");
console.log(`Wrote favicon map -> ${OUT_TS}`);
