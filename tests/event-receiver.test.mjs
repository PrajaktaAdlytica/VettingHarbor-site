import { test } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { validateEvent, receiveEvent } from "../server/event-receiver.mjs";
const base = () => ({
  name: "form_submit",
  context: "public",
  consent: true,
  id: randomUUID(),
  timestamp: new Date().toISOString(),
  campaign: { utm_source: "linkedin" },
  email: "must-never-store@example.com",
  freeText: "must never store",
});
test("strips PII and free text from an event", () => {
  const { event } = validateEvent(base());
  assert.equal(event.email, undefined);
  assert.equal(event.freeText, undefined);
  assert.deepEqual(event.campaign, { utm_source: "linkedin" });
});
test("ignores synthetic and preview events; requires real public consent", () => {
  assert.equal(
    validateEvent({ ...base(), context: "synthetic-demo" }).ignored,
    true,
  );
  assert.ok(validateEvent({ ...base(), consent: false }).error);
});
test("does not accept unconfirmed signup or booking milestones", () => {
  for (const name of ["verified_signup", "interview_booked"])
    assert.ok(validateEvent({ ...base(), name }).error);
});
test("durable claim prevents duplicate storage", async () => {
  const set = new Set(),
    stored = [];
  const adapter = {
    claim: async (id) => {
      if (set.has(id)) return false;
      set.add(id);
      return true;
    },
    release: async (id) => set.delete(id),
    store: async (e) => stored.push(e),
  };
  const body = base();
  assert.equal((await receiveEvent(body, adapter)).body.accepted, true);
  assert.equal((await receiveEvent(body, adapter)).body.duplicate, true);
  assert.equal(stored.length, 1);
});
test("failed storage releases claim for a retry", async () => {
  let released = false;
  await assert.rejects(() =>
    receiveEvent(base(), {
      claim: async () => true,
      release: async () => {
        released = true;
      },
      store: async () => {
        throw Error("failure");
      },
    }),
  );
  assert.equal(released, true);
});
