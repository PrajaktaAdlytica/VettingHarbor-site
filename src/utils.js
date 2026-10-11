const eventNames = [
  "landing_view",
  "demo_open",
  "demo_complete",
  "pricing_view",
  "form_start",
  "form_submit",
  "verified_signup",
  "interview_booked",
];
let events = [];
let seen = new Set();
export function consent() {
  try {
    return localStorage.getItem("vh-consent") === "allowed";
  } catch {
    return false;
  }
}
export function setConsent(value) {
  try {
    localStorage.setItem("vh-consent", value);
  } catch {}
  if (value !== "allowed") {
    events = [];
    seen.clear();
  }
  window.dispatchEvent(new Event("vh-consent-change"));
}
export function track(name, context = "public-preview", key = name) {
  if (!consent() || !eventNames.includes(name)) return;
  const dedupe = `${context}:${key}`;
  if (seen.has(dedupe)) return;
  seen.add(dedupe);
  const q = new URLSearchParams(location.search);
  const campaign = {};
  [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "campaign_id",
    "ad_id",
  ].forEach((k) => {
    const v = q.get(k);
    if (v) campaign[k] = v.replace(/[^a-zA-Z0-9_. -]/g, "").slice(0, 100);
  });
  events.push({
    id: crypto.randomUUID(),
    name,
    context,
    timestamp: new Date().toISOString(),
    campaign,
  });
  // Preview events are memory-only, never sent to a server or treated as qualified leads.
  window.dispatchEvent(new Event("vh-events-change"));
}
export function getEvents() {
  return events;
}
export function clearEvents() {
  events = [];
  seen.clear();
  window.dispatchEvent(new Event("vh-events-change"));
}
export function downloadText(name, text, type = "text/plain") {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function sampleReport(preset = "version changed") {
  return `DEMO — SYNTHETIC DATA / CONCEPT PREVIEW\nNot an operating product. All identities, documents and outcomes are fictional.\n\nVETTING HARBOR · SAMPLE EVIDENCE PACK CP-ATT-12\nPublisher: Clearpath Agents / Support Assistant\nPublisher verification: SAMPLE · consented documentation fixture only\nReviewed version: 1.2 / Current submitted version: 1.3\nReviewed scope: read:tickets\nAdded scope: write:contacts / NOT TESTED\nSample review date: 01 Oct 2026\nFixed sample clock: 10 Oct 2026 12:00 UTC / Evidence age: 9 days\nSample expiry: 31 Oct 2026 (except expired preset: 09 Oct 2026)\nLifecycle preset: ${preset}\nVersion change does not imply revocation. Expiry and revocation are separate scenarios.\nSample revoked preset: issuer withdrawal on 09 Oct, incomplete protocol provenance.\n\nSources: CP-ID-12 (publisher documentation), CP-MAN-12, CP-MAN-13 (manifest fixtures), CP-TST-12 (sandbox protocol), CP-ATT-12 (simulated attestation).\nProtocol CP-TST-12: isolated mock ticket store; input ticket T-042; expected read existing ticket; observed fixture read only. Read-only test recorded for v1.2. Contact-write action has not been run for v1.3. No network or real agent calls.\n\nIssuer: Harbor Review Lab (fictional assessor). Reviewer: Mira Sol (fictional). Funding: fictional marketplace study sponsor. No real signature issued.\nProposed governance: payer disclosure, conflict declaration, recusal, no favorable-result fees; actual independence unestablished.\n\nLIMITS: no universal safety certification or regulatory accreditation; no production telemetry; untested scopes not covered; no install approval. Buyer owns the purchase decision. Human approval required before any external action.\nNext action: agree scope-specific contact-write test and acceptance criteria.\n\nDEMO — SYNTHETIC DATA / CONCEPT PREVIEW`;
}
