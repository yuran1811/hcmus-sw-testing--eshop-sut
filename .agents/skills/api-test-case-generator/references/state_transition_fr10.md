# State Transition — FR-10 Order State Machine

## Valid states (per the assignment)

`pending → confirmed → shipping → delivered`

Also confirm against the SUT's `api_specification.md` where a `cancelled` state applies (typically: cancellation is only allowed while `pending` or `confirmed`, never once `shipping`/`delivered`).

## How to generate full coverage (don't just test the happy path)

### 1. Test every valid edge (positive)

- pending → confirmed
- confirmed → shipping
- shipping → delivered
- (if applicable) pending → cancelled
- (if applicable) confirmed → cancelled

### 2. Test EVERY invalid edge (negative) — this is what AI misses most often

Build the full N-state x N-state matrix, mark which edges are disallowed, then create one test case per invalid edge, e.g.:

- delivered → pending (backwards)
- delivered → shipping (backwards)
- shipping → pending (two steps backwards)
- pending → delivered (skipping steps)
- cancelled → any other state (terminal state, no further transitions allowed)
- shipping → cancelled (if the spec disallows cancelling while shipping)
- delivered → cancelled (can't cancel an already-delivered order)
- transition to the same current state (confirmed → confirmed) — check whether idempotency is allowed or should error

### 3. Test concurrency / race conditions (if time allows)

- Two nearly-simultaneous state-change requests (e.g. admin confirms while user cancels at the same time) — check the system stays consistent.

### 4. Test who is allowed to perform the transition

- Can a regular user change order state themselves (besides cancel)? → if the API allows calling it directly, this is a security test (role escalation), not a pure state-transition test. Mark it Category=Security, SEC_Ref = the relevant SEC item.

### 5. Test data accompanying the transition

- When moving to `shipping`, is a tracking number required? Test with it missing.
- When moving to `cancelled`, is a cancel reason required?

## Suggested matrix for the report

| From \ To | pending     | confirmed   | shipping    | delivered   | cancelled        |
| --------- | ----------- | ----------- | ----------- | ----------- | ---------------- |
| pending   | idempotent? | ✅          | ❌          | ❌          | ✅ (if allowed)  |
| confirmed | ❌          | idempotent? | ✅          | ❌          | ✅/❌ (per spec) |
| shipping  | ❌          | ❌          | idempotent? | ✅          | ❌               |
| delivered | ❌          | ❌          | ❌          | idempotent? | ❌               |
| cancelled | ❌          | ❌          | ❌          | ❌          | idempotent?      |

Fill this in against the actual `api_specification.md` before generating test cases — don't assume.
