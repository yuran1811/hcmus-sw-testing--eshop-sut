# FR-06 Automation Test Summary

## Identification

| Field | Value |
| --- | --- |
| Student ID | 23127065 |
| Feature | FR-06 — Product Detail |
| Manual cases | TC-PRODUCT-DETAIL-001..015 |
| Data source | `automation/test-data/product-detail.json` |
| Automated spec | `automation/specs/product-detail.spec.ts` |
| Execution date | 2026-07-27 |
| UI route | `/product/:id` |
| API route | `/api/products/:id` |

The manual cases document `/products/:id`; automation uses the discovered
working SUT route `/product/:id` and records the discrepancy without modifying
the manual cases.

## Validation and discovery

- TypeScript type-check: Passed.
- External dataset validation: Passed; exactly 15 unique records.
- Playwright discovery: Passed; 15 cases per project and 45 total executions.
- Browser projects: Chromium, Firefox, and WebKit.
- Isolation: one worker and a fresh browser context per test.
- Artifacts: screenshot on failure, video retained on failure, trace on first retry.
- Report labels: exact literal and visible labels verified in all three reports.

## Execution matrix

| Browser | Total | Passed | Failed | Skipped | Exit | Label verified |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| Chromium | 15 | 2 | 13 | 0 | 1 | Yes |
| Firefox | 15 | 2 | 13 | 0 | 1 | Yes |
| WebKit | 15 | 2 | 13 | 0 | 1 | Yes |
| **Total** | **45** | **6** | **39** | **0** | **1** | **3/3** |

The matrix exit is intentionally nonzero. All 39 failures are classified as
product defects in `reports/manifests/product-detail.json`; no automation,
invalid-data, or environment failures remained after verification and repair.

## Logical case results

| Case | Result in all browsers | Covered behavior |
| --- | --- | --- |
| TC-001 | Fail | Complete details, including category |
| TC-002 | Fail | Unknown numeric product ID |
| TC-003 | Fail | Non-numeric product ID |
| TC-004 | Fail | Add quantity 2 with visual feedback |
| TC-005 | Fail | Reject zero quantity |
| TC-006 | Fail | Reject negative quantity |
| TC-007 | Fail | Reject decimal quantity |
| TC-008 | Fail | Reject empty quantity |
| TC-009 | Fail | Reject alphabetic quantity |
| TC-010 | Fail | Accept minimum quantity 1 |
| TC-011 | Fail | Accept quantity 2 above minimum |
| TC-012 | Fail | Reject unauthenticated add-to-cart in UI |
| TC-013 | Fail | Breadcrumb and working home link |
| TC-014 | Pass | Non-empty product image alt text |
| TC-015 | Pass | Stored-XSS text is escaped and not executed |

## Assertion coverage

- Visibility: `toBeVisible`.
- Text: `toHaveText`, `toContainText`.
- Attribute: `toHaveAttribute`.
- URL/navigation: `toHaveURL`.
- Collection state: `toHaveCount`.
- HTTP/plain values: `toBe`.

## Setup and cleanup evidence

- Authenticated records obtain a real JWT through `POST /api/login` and install
  it in local storage before navigation.
- TC-012 uses a clean unauthenticated context and verifies the real cart API
  returns HTTP 401.
- TC-015 creates a uniquely named malicious product through the real product API
  and deletes the exact created ID in fixture teardown.
- Post-run inspection found zero malicious-product residue.

## Failure summary

1. Product category is absent from the detail page.
2. Unknown and malformed IDs return HTTP 200 with `{}` instead of 404/400.
3. The first valid add-to-cart click is deliberately ignored.
4. Invalid quantities receive no validation feedback.
5. The unauthenticated Product Detail UI gives no login error or redirect,
   although the backend cart API correctly returns 401.
6. The required breadcrumb and home link are absent.

See `../bug-reports/FR-06-AUTOMATION-BUG-REPORTS.md` for consolidated defects
and `../reports/manifests/product-detail.json` for per-browser machine-readable
results.
