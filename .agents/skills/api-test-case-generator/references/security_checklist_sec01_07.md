# Security Checklist — SEC-01 → SEC-07

Note: this is a thinking framework, NOT a replacement for `api_specification.md` — the EShop assignment defines exactly what SEC-01..SEC-07 are, so read that first. The list below is a set of common vulnerability categories that typically map to this kind of numbering, used to cross-check and to shape questions for the AI — do NOT assert these definitions override the actual spec.

## How to use it

For each SEC-xx, ask the AI one separate turn (never combined), using a template like:

> "For endpoint [method] [path], with input fields [list them], propose 2-3 concrete test cases (real payloads, not generic descriptions) to check for [vulnerability name]. For each, state the input, how it's sent, and the expected result (status code + system behavior required to be considered safe)."

## Vulnerability groups to check (cross-reference against the actual SEC-01..SEC-07 in the spec)

1. **Injection** (SQL/NoSQL/command injection) — payloads like `' OR '1'='1`, `; DROP TABLE users;--`, try on every text input including search, filter, sort fields.
2. **IDOR (Insecure Direct Object Reference)** — user A uses their own token to call an API with another user's resource ID (order, profile, cart) → must be rejected (403/404), no data returned.
3. **Role escalation / Broken Access Control** — regular user calling an admin endpoint (FR-12..FR-19); unauthenticated user calling an endpoint that requires auth; an expired token still being accepted.
4. **Authentication bypass** — missing Authorization header, malformed token, token from a logged-out session, tampered JWT payload (if JWT is used).
5. **Rate limiting / Brute force** (related to FR-02 account lockout) — send many consecutive wrong-password attempts, check whether the account locks per spec, and whether other endpoints (e.g. forgot-password) are also rate-limited.
6. **Input sanitization / XSS / HTML injection** — inject `<script>alert(1)</script>` into text fields (product name, review, address), check whether the response escapes/sanitizes it.
7. **Sensitive data exposure** — do error responses (500/400) leak stack traces, DB info, password hashes, internal tokens; do successful responses return unnecessary sensitive fields (another user's password hash, token)?

## Notes when auditing AI output for this round

AI tends to:

- Only give a generic description like "test for SQL injection" without a concrete payload → require actual payloads.
- Miss IDOR because it requires understanding the ownership relationship between a resource and a user, which AI can't infer if the spec doesn't state it explicitly → the reviewer must add these manually (this is usually the source of the "5 extra test cases" required in the Extend step).
- Miss race conditions/rate limiting because they require sending multiple requests in sequence, which is hard to express as a single static test case.
