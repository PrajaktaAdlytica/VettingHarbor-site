/** Inactive deployment adapter. No client in the preview calls this module. */
export const ALLOWED_EVENTS = new Set([
  "landing_view",
  "demo_open",
  "demo_complete",
  "pricing_view",
  "form_start",
  "form_submit",
  "verified_signup",
  "interview_booked",
]);
export function validateEvent(input) {
  if (!input || !ALLOWED_EVENTS.has(input.name))
    return { error: "Unknown event" };
  if (input.context === "synthetic-demo" || input.context === "public-preview")
    return { ignored: true };
  if (input.context !== "public" || input.consent !== true)
    return { error: "Explicit public analytics consent required" };
  if (!/^[a-f\d-]{36}$/i.test(input.id || ""))
    return { error: "Stable UUID required" };
  if (["verified_signup", "interview_booked"].includes(input.name))
    return {
      error: "Server-confirmed events require a trusted confirmation service",
    };
  const timestamp = Date.parse(input.timestamp);
  if (
    !Number.isFinite(timestamp) ||
    Math.abs(Date.now() - timestamp) > 86400000
  )
    return { error: "Invalid timestamp" };
  const campaign = {};
  for (const key of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "campaign_id",
    "ad_id",
  ]) {
    if (typeof input.campaign?.[key] === "string")
      campaign[key] = input.campaign[key]
        .replace(/[^a-zA-Z0-9_. -]/g, "")
        .slice(0, 100);
  }
  return {
    event: {
      id: input.id,
      name: input.name,
      context: "public",
      timestamp: new Date(timestamp).toISOString(),
      campaign,
    },
  };
}
/** A durable SET NX gate is required; no process-memory dedupe masquerades as server persistence. */
export async function receiveEvent(body, { claim, release, store }) {
  const result = validateEvent(body);
  if (result.error) return { status: 400, body: { error: result.error } };
  if (result.ignored) return { status: 204 };
  const fresh = await claim(result.event.id);
  if (!fresh) return { status: 202, body: { duplicate: true } };
  try {
    await store(result.event);
    return { status: 202, body: { accepted: true } };
  } catch (error) {
    await release(result.event.id);
    throw error;
  }
}
