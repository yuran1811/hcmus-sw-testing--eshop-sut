# AI Conversion Log — FR-06 Product Detail

This is the actual conversion record for the Product Detail feature slice. The
manual cases remain unchanged under `tests/test-cases/product-detail/`.

## Requirement ledger

| Feature | Source | Case IDs | Count | Data file | Spec file | Browsers | Reports |
| --- | --- | --- | ---: | --- | --- | --- | --- |
| Product Detail | FR-06 plus the linked FR-08, FR-23, FR-24, and SEC-04 manual cases | TC-PRODUCT-DETAIL-001..015 | 15 | `tests/automation/test-data/product-detail.json` | `tests/automation/specs/product-detail.spec.ts` | Chromium, Firefox, WebKit | `reports/html/product-detail/<browser>/` |

Scope note: this ledger intentionally contains one feature. It implements the
requested FR-06 slice and does not represent completion of a three-feature
assignment.

## Analyze

**Prompt:** Read FR-06 and all 15 Product Detail manual cases. Extract actors,
preconditions, route and API contracts, input partitions, expected state
changes, security behavior, and discrepancies with the running source.

**Inputs:** `README.md`, `tests/test-cases/product-detail/TC-PRODUCT-DETAIL-001.md`
through `015.md`, the web router, Product Detail component, auth/cart contexts,
backend product/auth/cart routes, and database seeds.

**Outcome:** The documented `/products/:id` path does not exist; the implemented
UI route is `/product/:id`, backed by `/api/products/:id`. Product 1 is the
stable seed. The page omits category and breadcrumb, the first cart click is
ignored, quantity is not validated, cart changes are client-only, and the
Product Detail UI does not call the authenticated cart API. These are test
targets, not automation workarounds.

## Design

**Prompt:** Preserve all 15 distinct manual cases and map each to a positive,
negative, boundary, GUI, or security oracle without padding or semantic
duplicates.

**Outcome:** Cases 001–003 cover detail and invalid ID behavior; 004–011 cover
valid and invalid quantity partitions; 012 covers unauthenticated UI and API
rejection; 013–014 cover breadcrumb and image accessibility; 015 covers stored
XSS escaping. Valid cart cases click exactly once.

## Review

**Prompt:** Review each expected result against FR-06 and the manual case. Remove
unsupported assumptions, keep legitimate SUT defects visible, and ensure every
case has an observable oracle.

**Outcome:** The suite uses the working singular route while recording the
manual-route discrepancy. Missing-ID and invalid-ID records require meaningful
HTTP 404 and 400 statuses. Visual feedback, validation feedback, cart state,
redirects, attributes, response status, text escaping, and dialog absence are
all directly asserted. No double-click, skip, retry inflation, or weakened
oracle compensates for known defects.

## Model Data

**Prompt:** Define a typed external JSON schema containing case metadata,
authentication, preconditions, product setup, route parameters, action key and
primitive inputs, expectation key and primitive values, and cleanup.

**Outcome:** All records live exclusively in
`tests/automation/test-data/product-detail.json`. The synchronous loader rejects
malformed JSON, non-15 counts, missing or duplicate IDs, absent fields, invalid
field types, and unknown action, expectation, authentication, or setup keys
before Playwright registers tests.

## Map Automation

**Prompt:** Map the data vocabulary to maintainable Playwright setup, locators,
actions, assertions, isolation, and teardown using the real UI and API.

**Outcome:** A shared fixture logs authenticated records in through `/api/login`
and initializes the real local-storage token. Each test receives a fresh browser
context. TC-012 remains token-free and checks `/api/cart` for 401. TC-015 creates
a uniquely named malicious product using `POST /api/products` and deletes the
same numeric ID in fixture teardown. The page helper uses role, text, and
attribute locators, with table-cell position only where the SUT exposes no
semantic quantity label.

## Generate

**Prompt:** Generate the self-contained TypeScript package, validated data,
fixture-driven data spec, explicit three-browser config, artifacts, and a
sequential report runner labeled with student ID 23127065.

**Outcome:** Generated `tests/automation/` with exactly one `test()` per external
record and `[caseId]` in every title. Configuration uses one worker, one retry,
failure screenshots, first-retry traces, retained failure videos, and explicit
Chromium, Firefox, and WebKit projects. The matrix runner preserves every cell,
classifies failures, writes a JSON manifest, verifies report labels, and returns
nonzero when any cell fails.

Assertion patterns include visibility (`toBeVisible`), text (`toHaveText`,
`toContainText`), attribute (`toHaveAttribute`), URL (`toHaveURL`), collection
count (`toHaveCount`), and plain response/state values (`toBe`).

## Verify and Repair

**Prompt:** Install locked dependencies and browser binaries; validate types and
data; confirm 15 tests per project and 45 total; run representative Chromium
cases; then run all three browser cells sequentially. Diagnose automation/data
failures and retain product failures.

**Outcome:** Executed on 2026-07-27. TypeScript and dataset validation passed.
Discovery listed 15 cases for each of Chromium, Firefox, and WebKit (45 total).
The representative Chromium run exposed and repaired an automation defect in
the TC-001 category locator: a broad text assertion had matched the category
word inside the description, so it was replaced with an exact distinct-element
oracle before the matrix.

The complete sequential matrix ran all 45 executions. Every browser produced
the same honest result: 2 passed (TC-014 and TC-015) and 13 failed, with no
skips. Total: 6 passed and 39 failed. All failed executions are classified as
product defects in `reports/manifests/product-detail.json`; no invalid-data,
automation, or environment failures remained.

Observed failure groups:

- TC-001: category is not rendered as a distinct product field.
- TC-002 and TC-003: the API returns HTTP 200 with `{}` instead of 404/400.
- TC-004, TC-010, and TC-011: the first valid add-to-cart click is ignored, so
  no feedback or cart row appears.
- TC-005 through TC-009: invalid quantities receive no validation feedback.
- TC-012: the cart API correctly returns 401, but the Product Detail UI gives
  no login error and does not redirect to `/login`.
- TC-013: the required breadcrumb and home link are absent.

The three HTML reports are under `reports/html/product-detail/<browser>/`.
Every `index.html` contains the exact literal title
`Run by: 23127065 | Product Detail | <browser>` and an independent Chromium
check confirmed that each title banner is visible. The configured Playwright
report header also renders the same title from its embedded report payload.
The matrix exit is intentionally nonzero because requirement failures remain.
