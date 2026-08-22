# AI Audit Checklist — POST /api/admin/import-products (FR-16)

**Document Identifier:** AC-EShop-API-FR16  
**Auditor / Student ID:** `23127148`  
**Endpoint Under Test:** `POST /api/admin/import-products`  
**SUT URL:** `http://localhost:3000`  
**Course:** Software Testing (FIT @ HCMUS) - HW06  

---

## 1. Test Case Evaluation Table (AI-02 Template)

| # | Test Case ID | Test Title | AI Confidence | Verdict | ISTQB & Course Reasoning | Student Fix / SUT Deviation Note |
| :---: | :--- | :--- | :---: | :---: | :--- | :--- |
| 1 | `TC-IMPORT-001` | Role Escalation (Standard User calls Admin Import) | `HIGH` | **VALID** | Verifies Broken Function Level Authorization (OWASP API5:2023 / SEC-03). Standard user must be blocked with `403 Forbidden`. | **SUT Bug Caught (server.js:199):** SUT uses `authenticateToken` but fails to check `if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });`. A standard user can import products. Student Fix: Add role check in route handler. |
| 2 | `TC-IMPORT-002` | Missing `Authorization` header | `HIGH` | **VALID** | SEC-02 / OWASP API2:2023 authentication enforcement. | SUT returns `401 Unauthorized` `{ "error": "Unauthorized" }`. |
| 3 | `TC-IMPORT-003` | Empty Bearer token | `HIGH` | **VALID** | SEC-02 token parsing edge case. | SUT returns `401` or `403`. |
| 4 | `TC-IMPORT-004` | Malformed JWT string | `HIGH` | **VALID** | SEC-02 token format integrity. | `jwt.verify` rejects malformed string with `403 Forbidden`. |
| 5 | `TC-IMPORT-005` | Expired JWT token | `HIGH` | **VALID** | SEC-02 token expiration check. | `jwt.verify` rejects expired token with `403 Forbidden`. |
| 6 | `TC-IMPORT-006` | Tampered JWT signature | `HIGH` | **VALID** | SEC-02 cryptographic signature verification. | `jwt.verify` rejects invalid secret signature with `403 Forbidden`. |
| 7 | `TC-IMPORT-007` | Stored XSS in `name` | `HIGH` | **VALID** | SEC-06 / OWASP API3:2023 injection & script sanitization. | SUT stores text without crashing; frontend rendering should escape HTML. |
| 8 | `TC-IMPORT-008` | Stored XSS in `description` | `HIGH` | **VALID** | SEC-06 injection testing for HTML payloads. | SUT handles input safely without 500 error. |
| 9 | `TC-IMPORT-009` | Malicious URI Scheme in `imageUrl` | `HIGH` | **VALID** | SEC-06 URI scheme injection (`javascript:`). | SUT stores URI; UI consumer must enforce protocol whitelist. |
| 10 | `TC-IMPORT-010` | SQLi - Boolean Tautology in `name` | `HIGH` | **VALID** | SEC-05 / CWE-89 SQL injection testing. | SUT uses SQLite parameterized statements (`db.prepare`), neutralizing injection. Returns `200 OK`. |
| 11 | `TC-IMPORT-011` | SQLi - Stacked DROP TABLE in `description` | `HIGH` | **VALID** | SEC-05 destructive SQL injection attack. | Parameterized query protects database schema. |
| 12 | `TC-IMPORT-012` | SQLi - Union in `category_id` | `HIGH` | **VALID** | SEC-05 type mismatch and union injection. | Parameterized statement handles payload safely. |
| 13 | `TC-IMPORT-013` | SSRF Probe - Loopback in `imageUrl` | `HIGH` | **VALID** | OWASP API7:2023 SSRF testing. | Backend does not auto-fetch images server-side, preventing SSRF vulnerability. |
| 14 | `TC-IMPORT-014` | SSRF Probe - Cloud Metadata in `imageUrl` | `HIGH` | **VALID** | OWASP API7:2023 cloud metadata exfiltration test. | SUT does not make outbound HTTP requests for `imageUrl`. |
| 15 | `TC-IMPORT-015` | Mass Assignment Body Pollution | `HIGH` | **VALID** | SEC-07 / OWASP API6:2023 mass assignment check. | SUT explicitly binds only `name, price, description, imageUrl, category_id`, safely dropping extra fields like `id` and `is_admin`. |
| 16 | `TC-IMPORT-016` | Valid Single Product Import (Happy Path) | `HIGH` | **VALID** | FR-16 core functional requirement. | SUT returns `200 OK` with `inserted: 1` and `errors: []`. |
| 17 | `TC-IMPORT-017` | Valid Multi-Product Batch (5 items) | `HIGH` | **VALID** | FR-16 batch processing capability. | SUT returns `200 OK` with `inserted: 5` and `errors: []`. |
| 18 | `TC-IMPORT-018` | Empty array payload `{"products": []}` | `HIGH` | **VALID** | Domain partitioning boundary for empty input. | SUT returns `400 Bad Request` `{ "error": "Không có dữ liệu để import" }`. |
| 19 | `TC-IMPORT-019` | Missing `products` root key `{}` | `HIGH` | **VALID** | Negative equivalence partition for missing body structure. | SUT returns `400 Bad Request` `{ "error": "Không có dữ liệu để import" }`. |
| 20 | `TC-IMPORT-020` | Null `products` value | `HIGH` | **VALID** | Negative equivalence partition for null value. | SUT returns `400 Bad Request` `{ "error": "Không có dữ liệu để import" }`. |
| 21 | `TC-IMPORT-021` | Non-array string `products` | `HIGH` | **VALID** | Type violation negative partition. | `!Array.isArray(rows)` triggers `400 Bad Request`. |
| 22 | `TC-IMPORT-022` | Non-array number `products` | `HIGH` | **VALID** | Type violation negative partition. | SUT returns `400 Bad Request`. |
| 23 | `TC-IMPORT-023` | Non-array object `products` | `HIGH` | **VALID** | Type violation negative partition. | SUT returns `400 Bad Request`. |
| 24 | `TC-IMPORT-024` | Missing mandatory `name` field | `HIGH` | **VALID** | Partial error handling validation. | SUT skips insertion, adds error message to `errors` array, and returns `inserted: 0`. |
| 25 | `TC-IMPORT-025` | Missing optional `description` | `HIGH` | **VALID** | Default fallback partition. | SUT defaults `description` to `""` and inserts successfully (`inserted: 1`). |
| 26 | `TC-IMPORT-026` | Missing optional `imageUrl` | `HIGH` | **VALID** | Default fallback partition. | SUT defaults `imageUrl` to `""` and inserts successfully (`inserted: 1`). |
| 27 | `TC-IMPORT-027` | Missing optional `category_id` | `HIGH` | **VALID** | Default fallback partition. | SUT defaults `category_id` to `1` and inserts successfully (`inserted: 1`). |
| 28 | `TC-IMPORT-028` | Price Boundary: Zero Price (`0`) | `HIGH` | **VALID** | Boundary Value Analysis (Zero boundary). | SUT inserts product with price 0. |
| 29 | `TC-IMPORT-029` | Price Boundary: Negative Price (`-50000`) | `HIGH` | **VALID** | Boundary Value Analysis (Negative domain). | SUT inserts or validates; confirms SUT behavior without crash. |
| 30 | `TC-IMPORT-030` | Price Boundary: Floating-point (`199.99`) | `HIGH` | **VALID** | Numeric representation boundary. | SUT inserts floating value into SQLite. |
| 31 | `TC-IMPORT-031` | Type Coercion: Numeric String (`"50000"`) | `HIGH` | **VALID** | Robustness & loose typing test. | SUT SQLite binding converts string to numeric. |
| 32 | `TC-IMPORT-032` | Boundary: 32-bit Integer Max (`2147483647`) | `HIGH` | **VALID** | Extreme upper integer boundary. | SUT handles without integer overflow. |
| 33 | `TC-IMPORT-033` | Category ID: Non-existent ID (`99999`) | `HIGH` | **VALID** | Foreign key boundary partition. | SQLite without PRAGMA foreign_keys executes without unhandled error. |
| 34 | `TC-IMPORT-034` | Extreme Batch Stress (50 items) | `HIGH` | **VALID** | Scalability and batch transaction capacity. | SUT processes all 50 items and returns `inserted: 50`. |
| 35 | `TC-IMPORT-035` | Buffer Boundary: Oversized strings (>1000 chars) | `HIGH` | **VALID** | Buffer overflow and DoS boundary testing. | SUT / SQLite handles large text payloads safely. |
| 36 | `TC-IMPORT-036` | Partial Failure Atomicity (Mixed batch) | `HIGH` | **VALID** | Data integrity and atomic error reporting. | 2 valid items inserted (`inserted: 2`), 2 invalid items recorded in `errors`. |
| 37 | `TC-IMPORT-037` | Data Persistence Verification | `HIGH` | **VALID** | Data integrity cross-endpoint verification. | Confirms imported product is retrievable via `GET /api/products`. |
| 38 | `TC-IMPORT-038` | HTTP Method Tampering (`GET` / `PUT`) | `HIGH` | **VALID** | Protocol / RFC 7231 method conformance. | Express router returns `404 Not Found` for unmapped methods. |
| 39 | `TC-IMPORT-039` | JSON Schema Validation Strict Assertions | `HIGH` | **VALID** | Contract testing with Draft-07 JSON Schema. | Validates schema structure of `200 OK` and `400 Bad Request` responses. |
| 40 | `TC-IMPORT-040` | Academic Traceability Header | `HIGH` | **VALID** | HW06 §6.1 Academic traceability requirement. | Header `X-Student-Id: 23127148` is transmitted and verified. |

---

## 2. Security Vulnerability & Bug Findings in SUT

During test analysis against `backend/server.js:198-241`, the following findings were documented:

1. **CRITICAL Vulnerability — Broken Function Level Authorization (BFLA - OWASP API5:2023):**
   - **Location:** `backend/server.js:199`
   - **Description:** Route definition `app.post("/api/admin/import-products", authenticateToken, (req, res) => ...)` only invokes `authenticateToken` middleware without validating `req.user.role === 'admin'`.
   - **Impact:** Any authenticated user with a valid standard user JWT (`role: 'user'`) can perform batch product imports into the database.
   - **Remediation:** Add role check:
     ```javascript
     if (req.user.role !== 'admin') {
       return res.status(403).json({ error: "Forbidden: Admin access required" });
     }
     ```

2. **Negative Price Validation Omission:**
   - **Location:** `backend/server.js:218-231`
   - **Description:** SUT does not validate that `row.price >= 0`. Negative prices are inserted directly into SQLite.
   - **Remediation:** Add validation `if (typeof row.price !== 'number' || row.price < 0) { errors.push(...); return; }`.

3. **SQL Injection Resilience (Positive Finding):**
   - **Location:** `backend/server.js:209-211`
   - **Description:** SUT uses parameterized prepared statements `db.prepare("INSERT INTO products (...) VALUES (?, ?, ?, ?, ?)")`, effectively neutralizing SQL injection attacks in all product fields.
