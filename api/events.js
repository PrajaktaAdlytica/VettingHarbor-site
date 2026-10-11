import { receiveEvent } from "../server/event-receiver.mjs";
/** Vercel-only optional adapter. Missing configuration fails closed. */
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST")
    return res.status(405).json({ error: "POST only" });
  if (!process.env.EVENT_REDIS_REST_URL || !process.env.EVENT_REDIS_REST_TOKEN)
    return res.status(503).json({ error: "Event receiver is not configured" });
  if (req.headers.origin !== process.env.PUBLIC_SITE_ORIGIN)
    return res.status(403).json({ error: "Unapproved origin" });
  if (Buffer.byteLength(JSON.stringify(req.body || {})) > 4096)
    return res.status(413).json({ error: "Event too large" });
  const redis = async (command) => {
    const r = await fetch(process.env.EVENT_REDIS_REST_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.EVENT_REDIS_REST_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
    });
    if (!r.ok) throw new Error("Event store unavailable");
    const data = await r.json();
    if (data.error) throw new Error("Event store error");
    return data.result;
  };
  try {
    const r = await receiveEvent(req.body, {
      claim: (id) =>
        redis(["SET", `vh:dedupe:${id}`, "1", "NX", "EX", "86400"]).then(
          (v) => v === "OK",
        ),
      release: (id) => redis(["DEL", `vh:dedupe:${id}`]),
      store: (event) =>
        redis(["RPUSH", "vh:public-events", JSON.stringify(event)]),
    });
    return r.status === 204
      ? res.status(204).end()
      : res.status(r.status).json(r.body);
  } catch {
    return res.status(503).json({ error: "Event store unavailable" });
  }
}
