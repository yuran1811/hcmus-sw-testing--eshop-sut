# API 1 — Pool A / FR-05: AI-Generated Test Cases

**Student ID:** 23127152  
**Feature:** FR-05 Product listing & search  
**Endpoint(s):** `GET /api/products` (`?search=` optional)  
**Auth / Role (spec):** None / None  
**Generated:** 2026-08-19  
**AI tool:** Cursor (Cursor Grok 4.5) — stepwise A→B→C→D per `api-test-generate`  
**Target:** ≥ 35 · **Actual:** 40

---

## Generation steps (separate prompts)

| Step | Technique | Prompt summary | Audit session ref |
|------|-----------|----------------|-------------------|
| A | Domain partitions | Partitions for optional query `search` (omit/empty/valid/invalid/boundary/charset) | Session Phase1-A |
| B | State transitions | N/A — read-only list API; no resource state machine | Session Phase1-B |
| C | Security SEC-01…07 | Focus SEC-05 SQLi; also auth-optional probes, XSS-like query | Session Phase1-C |
| D | Schema validation | Array JSON, product fields, Content-Type, error shape | Session Phase1-D |

---

## Test Cases

| TC ID | Category | Description | Preconditions | Input (method/path/headers/query/body) | Expected status | Expected body / assertions | SEC / FR | Priority |
|-------|----------|-------------|---------------|----------------------------------------|-----------------|----------------------------|----------|----------|
| TC-A1-001 | Domain | List all products when `search` omitted | DB seeded (≥1 product) | `GET /api/products` | 200 | JSON array; length ≥ 1 | FR-05 | High |
| TC-A1-002 | Domain | Search with known substring `iPhone` | Seed has iPhone 15 Pro Max | `GET /api/products?search=iPhone` | 200 | Array; every `name` contains `iPhone` (case per impl) | FR-05 | High |
| TC-A1-003 | Domain | Search with full exact name | Seed | `GET /api/products?search=MacBook Pro M3` | 200 | Array length 1; name equals seed | FR-05 | Medium |
| TC-A1-004 | Domain | Search keyword with no match | Seed | `GET /api/products?search=NoSuchProductXYZ` | 200 | Empty array `[]` | FR-05 | High |
| TC-A1-005 | Domain | Empty string search `search=` | Seed | `GET /api/products?search=` | 200 | Treat as list-all OR empty filter; must be JSON array (document actual) | FR-05 | Medium |
| TC-A1-006 | Domain | Whitespace-only search | Seed | `GET /api/products?search=%20%20` | 200 | JSON array (no 5xx) | FR-05 | Medium |
| TC-A1-007 | Domain | Unicode Vietnamese keyword | Seed has `Bàn phím` | `GET /api/products?search=Bàn` | 200 | Matching products returned | FR-05 | Medium |
| TC-A1-008 | Domain | Case variant `iphone` vs `iPhone` | Seed | `GET /api/products?search=iphone` | 200 | Document case-sensitivity; array JSON | FR-05 | Low |
| TC-A1-009 | Domain | Very long search (512 chars `a`) | Seed | `GET /api/products?search=` + 512×`a` | 200 or 414 | No crash; JSON or documented limit | FR-05 | Medium |
| TC-A1-010 | Domain | Search length 1 char `M` | Seed | `GET /api/products?search=M` | 200 | Array of names containing `M` | FR-05 | Low |
| TC-A1-011 | Domain | Numeric-looking search `15` | Seed | `GET /api/products?search=15` | 200 | Match names containing `15` | FR-05 | Low |
| TC-A1-012 | Domain | Special chars not SQL: `!@#` | Seed | `GET /api/products?search=!@%23` | 200 | Empty array or safe filter; not 500 HTML | FR-05 | Medium |
| TC-A1-013 | Domain | Plus/spaces encoded `AirPods%20Pro` | Seed | `GET /api/products?search=AirPods%20Pro` | 200 | Match AirPods product | FR-05 | Medium |
| TC-A1-014 | Domain | Duplicate query keys `search=a&search=b` | Seed | `GET /api/products?search=a&search=b` | 200 | Deterministic behavior; JSON array | FR-05 | Low |
| TC-A1-015 | Domain | Unknown extra query ignored | Seed | `GET /api/products?foo=bar` | 200 | Same as list-all (array) | FR-05 | Low |
| TC-A1-016 | Domain | `search` with leading/trailing spaces | Seed | `GET /api/products?search=%20iPhone%20` | 200 | Document trim behavior | FR-05 | Low |
| TC-A1-017 | Robustness | Wrong method POST on list endpoint | — | `POST /api/products` without body as “list” misuse — **note:** POST is create API; for list misuse use `PUT /api/products` | 404/405 | List resource should not accept PUT as list | FR-05 | Low |
| TC-A1-018 | Robustness | `PUT /api/products` (no id) as list | — | `PUT /api/products` | 404 | Not a valid list operation | FR-05 | Low |
| TC-A1-019 | State | N/A placeholder — read-only; repeated GET idempotent | Seed unchanged | `GET /api/products` twice | 200 | Same count both calls (idempotent read) | FR-05 | Medium |
| TC-A1-020 | State | N/A — search does not mutate catalog | Seed | `GET ...?search=iPhone` then `GET /api/products` | 200 | Full list count unchanged after search | FR-05 | Medium |
| TC-A1-021 | Security | SEC-05: classic boolean SQLi `' OR '1'='1` | Seed ≥2 products | `GET /api/products?search=' OR '1'='1` | 200 | Must **not** dump all rows via tautology; parameterized / sanitized | SEC-05 | High |
| TC-A1-022 | Security | SEC-05: SQLi comment `--` | Seed | `GET /api/products?search=x' OR 1=1--` | 200 | No full-table dump; safe | SEC-05 | High |
| TC-A1-023 | Security | SEC-05: single quote break `'` | Seed | `GET /api/products?search='` | 200 or 400 | Must **not** return HTML DB error 500 | SEC-05 | High |
| TC-A1-024 | Security | SEC-05: UNION probe | Seed | `GET /api/products?search=' UNION SELECT 1,2,3,4,5--` | 200/400 | No schema leak / injected rows | SEC-05 | High |
| TC-A1-025 | Security | SEC-05: time/batch style `;` | Seed | `GET /api/products?search=a';DROP TABLE products;--` | 200/400 | Products table still listable afterward | SEC-05 | High |
| TC-A1-026 | Security | XSS-like query reflected? | Seed | `GET /api/products?search=<script>alert(1)</script>` | 200 | JSON array; no HTML script execution context in API | SEC-04* | Medium |
| TC-A1-027 | Security | Public API: no JWT still allowed | — | `GET /api/products` (no Authorization) | 200 | Array OK (auth not required) | FR-05 | High |
| TC-A1-028 | Security | Extraneous Bearer ignored | Valid user token optional | `GET /api/products` + `Authorization: Bearer {{userToken}}` | 200 | Same public list behavior | FR-05 | Low |
| TC-A1-029 | Security | Malformed Authorization header | — | `Authorization: Bearer not-a-jwt` | 200 | Still public; must not 500 | FR-05 | Low |
| TC-A1-030 | Security | SEC-05: LIKE wildcard `%` alone | Seed | `GET /api/products?search=%25` | 200 | May match all via LIKE; document; still JSON | SEC-05 | Medium |
| TC-A1-031 | Schema | Content-Type is JSON | Seed | `GET /api/products` | 200 | `Content-Type` includes `application/json` | FR-05 | High |
| TC-A1-032 | Schema | Top-level type is array | Seed | `GET /api/products` | 200 | `Array.isArray(body)` true | FR-05 | High |
| TC-A1-033 | Schema | Product item required fields | Seed | `GET /api/products` | 200 | Each item has `id`,`name`,`price`,`description`,`imageUrl`,`category_id` | FR-05 | High |
| TC-A1-034 | Schema | `id` is number; `name` string | Seed | `GET /api/products` | 200 | Types correct on first item | FR-05 | High |
| TC-A1-035 | Schema | `price` numeric (number) on list | Seed | `GET /api/products` | 200 | `typeof price === 'number'` for listed items | FR-05 | Medium |
| TC-A1-036 | Schema | Search hit preserves schema | Seed | `GET /api/products?search=Samsung` | 200 | Same fields as list-all items | FR-05 | Medium |
| TC-A1-037 | Schema | Empty result still JSON array | Seed | `GET /api/products?search=___none___` | 200 | `[]` not `null` / not object | FR-05 | High |
| TC-A1-038 | Schema | Error responses must not be raw HTML (SEC hygiene) | — | `GET /api/products?search='` | ≠500 HTML | Prefer JSON `{error}` if failing | SEC-05 | High |
| TC-A1-039 | Robustness | Extremely long search 2000 chars | Seed | `search=` + 2000×`b` | 200/414/400 | No process crash; recoverable | FR-05 | Medium |
| TC-A1-040 | Robustness | Null-byte in search | Seed | `search=iphone%00pro` | 200/400 | No crash; JSON or safe error | FR-05 | Low |

\*SEC-04 is primarily UI escaping; included as API payload-handling probe.

---

## Coverage matrix

| Category | Count | Notes |
|----------|-------|-------|
| Domain | 16 | TC-A1-001…016 |
| State | 2 | Idempotent read only (N/A machine) |
| Security | 10 | Mostly SEC-05 + public-auth probes |
| Schema | 8 | Array + fields + error shape |
| Robustness | 4 | Method misuse + extreme input |
| **Total** | **40** | **≥ 35** |
