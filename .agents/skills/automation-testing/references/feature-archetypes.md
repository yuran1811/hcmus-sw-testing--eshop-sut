# Feature Archetypes

Most EShop FRs (and most CRUD-heavy web apps in general) fall into a handful of shapes. Recognizing the shape speeds up §1–2 of the main skill: it tells you where the 12+ cases usually come from and which assertion patterns naturally apply. Treat these as a checklist to sanity-check your own design against the actual FR text and running app — never substitute them for reading the real spec, and never force a case in just because the archetype "expects" it.

## A. Auth / multi-step token flow (shape of FR03 — forgot password & reset)

Characteristics: a request step (submit identifier, receive out-of-band token/link) followed by a consume step (use the token to set a new value), each with its own validation and its own failure modes, plus a time/one-time-use constraint.

Typical case sources for ≥12:
- Request step: valid identifier, unregistered identifier, malformed identifier (format validation), empty submission, rate-limit/repeat request if the app has one.
- Consume step: valid token + valid new value, expired token, already-used token, malformed/tampered token, new value fails policy (too short, mismatch confirmation), missing token param.
- Cross-cutting: successful end-to-end flow (request → consume → login with new credentials), old credentials rejected after reset.

Good assertion mix: `toHaveURL` (post-request/post-reset redirect), `toContainText`/`toHaveText` (success/error messaging), `toBeDisabled`/`toBeVisible` (submit button state, form validation messages), `expect(status).toBe(...)` if any API call is asserted directly.

Data modeling note: the token itself usually can't be a static CSV value (it's generated per run) — model the *scenario* in data (e.g. `tokenState: "valid" | "expired" | "used" | "malformed"`) and have a small test-only helper mint/mutate a real token per scenario, rather than hardcoding a token string.

## B. Read-only list / detail view (shape of FR11 — order history)

Characteristics: no data mutation from the test's own actions (usually), but strong dependence on *which* fixture/seed data is present, filtering/sorting, pagination, and permission scoping (a user only sees their own records).

Typical case sources for ≥12:
- Empty state (user with no orders).
- Single record, multiple records, boundary count around a page size.
- Sort/filter variants if the UI exposes them (by date, by status).
- Detail drill-down: correct detail shown for a selected row, back-navigation preserves list state.
- Access control: user A cannot see user B's history via direct URL manipulation (important negative case — often the one AI-generated suites miss, since it requires reasoning about authorization, not just the happy path).
- Data formatting: currency/date formatting, status label mapping.

Good assertion mix: `toHaveCount` (row/item count matches fixture), `toHaveText`/`toContainText` (specific field values), `toHaveURL` (detail navigation, direct-URL access-control check), `toBeVisible`/`toBeHidden` (empty-state messaging).

Data modeling note: because this archetype depends on seeded data, the CSV/JSON should reference fixture/seed identifiers (order IDs, user IDs) rather than duplicating the seed data itself — keep one source of truth for what "order #123 belongs to user X" means.

## C. Admin CRUD (shape of FR19 — admin user management)

Characteristics: create/read/update/delete plus access control (only admins reach the screen at all), validation on writes, and often a confirm-before-destructive-action step.

Typical case sources for ≥12:
- Access control: non-admin redirected/blocked, admin reaches screen.
- Create: valid record, duplicate/unique-constraint violation, required-field validation, invalid format field.
- Read/list: search/filter, pagination boundary.
- Update: valid edit persists, invalid edit rejected, edit-in-place vs edit-then-save UX if applicable.
- Delete: confirmation dialog blocks accidental delete, cancel leaves record intact, confirmed delete removes it and it disappears from the list, delete-in-use record (e.g. can't delete a user with active orders, if that's a real business rule) — check the FR/app for whether this rule exists before assuming it.
- State side-effects: deactivating vs deleting a user, if the app distinguishes them.

Good assertion mix: `toHaveCount` (list shrinks/grows), `toBeVisible`/`toBeHidden` (confirm dialog), `toHaveValue` (form pre-fill on edit), `toHaveText`/`toContainText` (success/error toast), `toHaveURL` (redirect on access-denied).

Data modeling note: CRUD tests mutate shared state — give every case a uniquely generated entity (e.g. suffix emails/usernames with a run-scoped random string) and clean up in an `afterEach`/`afterAll` so re-runs don't collide with leftover data from a previous run.

## Using this for a new/unfamiliar FR

If a future FR doesn't cleanly match A/B/C, decompose it into whichever sub-shapes it contains — e.g. a checkout flow is partly "multi-step flow" (A-like) and partly "form validation," a coupon feature is partly CRUD (C-like, admin side) and partly a "apply and see effect" flow. Pick the closest archetype(s) per screen/step rather than forcing the whole feature into one bucket.
