# API 1 — Pool A / FR-05: Extended Test Cases (Manual)

**Student ID:** 23127152  
**Feature:** FR-05  
**Added:** 2026-08-19  
**Minimum:** 5 · **Actual:** 6  
**Skill:** `api-test-extend`

---

## Coverage gaps addressed

- Encoded / double-encoded SQLi variants (AI used raw classic payloads only)
- Error channel returns **HTML** instead of JSON (needs explicit assert on `Content-Type`)
- Blind-ish tautology comparing row counts to baseline
- `search` value that closes quote and injects `OR` with URL encoding
- Confirm catalog still intact after destructive SQL probe (stronger than TC-A1-025 wording)

---

## Extended test cases

| TC ID | Category | Description | Input | Expected | Why AI missed | Taxonomy |
|-------|----------|-------------|-------|----------|---------------|----------|
| TC-A1-E01 | Security | URL-encoded boolean SQLi `%27%20OR%20%271%27%3D%271` | `GET /api/products?search=%27%20OR%20%271%27%3D%271` | 200; result length **≠** full catalog dump via tautology; no auth bypass of filter | Step C listed raw `' OR '1'='1` only; skipped encoding variants | PROMPT |
| TC-A1-E02 | Security | Syntax-error quote must not be `text/html` 500 | `GET /api/products?search=%27` | Status ≠ 500 **or** if error, `Content-Type` application/json (not HTML page) | AI said “no HTML 500” but did not assert Content-Type explicitly | MODEL |
| TC-A1-E03 | Security | Baseline vs tautology row-count oracle | (1) `GET /api/products` count=N; (2) `search=' OR '1'='1` | Secure: filtered set; **fail if** count(search)=N and payload clearly not a product name | Needs live baseline comparison — AI wrote qualitative “no dump” without oracle | API_SPECIFIC |
| TC-A1-E04 | Security | Double-encoded quote `%2527` | `GET /api/products?search=%2527` | 200 JSON array or safe 4xx; not HTML SQLITE_ERROR | Encoding edge often skipped by models | MODEL |
| TC-A1-E05 | Security | After `;DROP…` probe, `GET /api/products` still returns ≥1 product | Sequence: malicious search then list-all | Catalog still present (table not dropped) | AI stated “still listable” but no sequenced TC | PROMPT |
| TC-A1-E06 | Schema | SQLi error body must not contain `<h1>Database Error</h1>` | `search='` | Body must not include HTML heading markers | Requires knowing SUT error HTML string from `server.js` | API_SPECIFIC |

---

## Notes for Excel export

Columns: TC ID, Category, Description, Input, Expected, Source (`AI`/`Manual`), Audit label, Execution result, Bug ID.
