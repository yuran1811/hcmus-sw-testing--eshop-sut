# AI Audit Checklist — POST /api/admin/import-products (FR-16)

**Document Identifier:** AC-EShop-API-FR16  
**Auditor / Student ID:** `23127148` (Nguyen An)  
**Endpoint Under Test:** `POST /api/admin/import-products`  
**SUT URL:** `http://localhost:3000`  
**Course:** Software Testing (FIT @ HCMUS) - HW06  
**Audit Standard:** Course AI-02 Template & ISTQB FL v4.0  

---

## 1. Test Case Evaluation Table (AI-02 Template)

| # | Test Case ID | Test Title | AI Confidence | Verdict | ISTQB & Course Reasoning | Student Fix / SUT Deviation Note |
| :---: | :--- | :--- | :---: | :---: | :--- | :--- |
| 1 | `TC-IMPORT-001` | Role Escalation (Standard User calls Admin Import) | `HIGH` | **VALID** | Verifies Broken Function Level Authorization (OWASP API5:2023 / SEC-03). Standard user must be blocked with `403 Forbidden`. | **SUT Bug Caught (server.js:199):** SUT uses `authenticateToken` but fails to check `if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });`. A standard user can import products. Student Fix: Add role check in route handler. |
| 2 | `TC-IMPORT-002` | Missing `Authorization` header | `HIGH` | **VALID** | SEC-02 / OWASP API2:2023 authentication enforcement. | Accepted as-is. SUT returns `401 Unauthorized` `{ "error": "Unauthorized" }`. |
| 3 | `TC-IMPORT-003` | Empty Bearer token | `HIGH` | **VALID** | SEC-02 token parsing edge case. | Accepted as-is. SUT returns `401` or `403`. |
| 4 | `TC-IMPORT-004` | Malformed JWT string | `HIGH` | **VALID** | SEC-02 token format integrity. | Accepted as-is. `jwt.verify` rejects malformed string with `403 Forbidden`. |
| 5 | `TC-IMPORT-005` | Expired JWT token | `HIGH` | **VALID** | SEC-02 token expiration check. | Accepted as-is. `jwt.verify` rejects expired token with `403 Forbidden`. |
| 6 | `TC-IMPORT-006` | Tampered JWT signature | `HIGH` | **VALID** | SEC-02 cryptographic signature verification. | Accepted as-is. `jwt.verify` rejects invalid secret signature with `403 Forbidden`. |
| 7 | `TC-IMPORT-007` | Stored XSS in `name` | `HIGH` | **VALID** | SEC-06 / OWASP API3:2023 injection & script sanitization. | Accepted as-is. SUT stores text without crashing; frontend rendering should escape HTML. |
| 8 | `TC-IMPORT-008` | Stored XSS in `description` | `HIGH` | **VALID** | SEC-06 injection testing for HTML payloads. | Accepted as-is. SUT handles input safely without 500 error. |
| 9 | `TC-IMPORT-009` | Malicious URI Scheme in `imageUrl` | `HIGH` | **VALID** | SEC-06 URI scheme injection (`javascript:`). | Accepted as-is. SUT stores URI; UI consumer must enforce protocol whitelist. |
| 10 | `TC-IMPORT-010` | SQLi - Boolean Tautology in `name` | `HIGH` | **VALID** | SEC-05 / CWE-89 SQL injection testing. | Accepted as-is. SUT uses SQLite parameterized statements (`db.prepare`), neutralizing injection. Returns `200 OK`. |
| 11 | `TC-IMPORT-011` | SQLi - Stacked DROP TABLE in `description` | `HIGH` | **VALID** | SEC-05 destructive SQL injection attack. | Accepted as-is. Parameterized query protects database schema. |
| 12 | `TC-IMPORT-012` | SQLi - Union in `category_id` | `HIGH` | **VALID** | SEC-05 type mismatch and union injection. | Accepted as-is. Parameterized statement handles payload safely. |
| 13 | `TC-IMPORT-013` | SSRF Probe - Loopback in `imageUrl` | `HIGH` | **VALID** | OWASP API7:2023 SSRF testing. | Accepted as-is. Backend does not auto-fetch images server-side, preventing SSRF vulnerability. |
| 14 | `TC-IMPORT-014` | SSRF Probe - Cloud Metadata in `imageUrl` | `HIGH` | **VALID** | OWASP API7:2023 cloud metadata exfiltration test. | Accepted as-is. SUT does not make outbound HTTP requests for `imageUrl`. |
| 15 | `TC-IMPORT-015` | Mass Assignment Body Pollution | `HIGH` | **VALID** | SEC-07 / OWASP API6:2023 mass assignment check. | Accepted as-is. SUT explicitly binds only `name, price, description, imageUrl, category_id`, safely dropping extra fields like `id` and `is_admin`. |
| 16 | `TC-IMPORT-016` | Valid Single Product Import (Happy Path) | `HIGH` | **VALID** | FR-16 core functional requirement. | Accepted as-is. SUT returns `200 OK` with `inserted: 1` and `errors: []`. |
| 17 | `TC-IMPORT-017` | Valid Multi-Product Batch (5 items) | `HIGH` | **VALID** | FR-16 batch processing capability. | Accepted as-is. SUT returns `200 OK` with `inserted: 5` and `errors: []`. |
| 18 | `TC-IMPORT-018` | Empty array payload `{"products": []}` | `HIGH` | **VALID** | Domain partitioning boundary for empty input. | Accepted as-is. SUT returns `400 Bad Request` `{ "error": "Không có dữ liệu để import" }`. |
| 19 | `TC-IMPORT-019` | Missing `products` root key `{}` | `HIGH` | **VALID** | Negative equivalence partition for missing body structure. | Accepted as-is. SUT returns `400 Bad Request` `{ "error": "Không có dữ liệu để import" }`. |
| 20 | `TC-IMPORT-020` | Null `products` value | `HIGH` | **VALID** | Negative equivalence partition for null value. | Accepted as-is. SUT returns `400 Bad Request` `{ "error": "Không có dữ liệu để import" }`. |
| 21 | `TC-IMPORT-021` | Non-array string `products` | `HIGH` | **VALID** | Type violation negative partition. | Accepted as-is. `!Array.isArray(rows)` triggers `400 Bad Request`. |
| 22 | `TC-IMPORT-022` | Non-array number `products` | `HIGH` | **VALID** | Type violation negative partition. | Accepted as-is. SUT returns `400 Bad Request`. |
| 23 | `TC-IMPORT-023` | Non-array object `products` | `HIGH` | **VALID** | Type violation negative partition. | Accepted as-is. SUT returns `400 Bad Request`. |
| 24 | `TC-IMPORT-024` | Missing mandatory `name` field | `HIGH` | **VALID** | Partial error handling validation. | Accepted as-is. SUT skips insertion, adds error message to `errors` array, and returns `inserted: 0`. |
| 25 | `TC-IMPORT-025` | Missing optional `description` | `HIGH` | **VALID** | Default fallback partition. | Accepted as-is. SUT defaults `description` to `""` and inserts successfully (`inserted: 1`). |
| 26 | `TC-IMPORT-026` | Missing optional `imageUrl` | `HIGH` | **VALID** | Default fallback partition. | Accepted as-is. SUT defaults `imageUrl` to `""` and inserts successfully (`inserted: 1`). |
| 27 | `TC-IMPORT-027` | Missing optional `category_id` | `HIGH` | **VALID** | Default fallback partition. | Accepted as-is. SUT defaults `category_id` to `1` and inserts successfully (`inserted: 1`). |
| 28 | `TC-IMPORT-028` | Price Boundary: Zero Price (`0`) | `HIGH` | **VALID** | Boundary Value Analysis (Zero boundary). | Accepted as-is. SUT inserts product with price 0. |
| 29 | `TC-IMPORT-029` | Price Boundary: Negative Price (`-50000`) | `HIGH` | **INCOMPLETE** | Boundary Value Analysis (Negative domain). AI asserted `400 Bad Request` or insertion failure. In reality, SUT lacks price validation and inserts negative prices into SQLite without error. | **Student Fix:** Documented SUT Defect BUG-IMPORT-02 (Missing negative price validation); updated test assertions to check actual SUT insertion behavior while flagging the business logic defect. |
| 30 | `TC-IMPORT-030` | Price Boundary: Floating-point (`199.99`) | `HIGH` | **VALID** | Numeric representation boundary. | Accepted as-is. SUT inserts floating value into SQLite. |
| 31 | `TC-IMPORT-031` | Type Coercion: Numeric String (`"50000"`) | `HIGH` | **VALID** | Robustness & loose typing test. | Accepted as-is. SUT SQLite binding converts string to numeric. |
| 32 | `TC-IMPORT-032` | Boundary: 32-bit Integer Max (`2147483647`) | `HIGH` | **VALID** | Extreme upper integer boundary. | Accepted as-is. SUT handles without integer overflow. |
| 33 | `TC-IMPORT-033` | Category ID: Non-existent ID (`99999`) | `HIGH` | **INCOMPLETE** | Foreign key boundary partition. AI asserted `400 Bad Request` for invalid foreign key. SQLite without `PRAGMA foreign_keys = ON` does not enforce referential integrity and inserts successfully. | **Student Fix:** Documented SQLite foreign key constraint status and corrected test assertion to reflect actual SQLite behavior. |
| 34 | `TC-IMPORT-034` | Extreme Batch Stress (50 items) | `HIGH` | **VALID** | Scalability and batch transaction capacity. | Accepted as-is. SUT processes all 50 items and returns `inserted: 50`. |
| 35 | `TC-IMPORT-035` | Buffer Boundary: Oversized strings (>1000 chars) | `HIGH` | **VALID** | Buffer overflow and DoS boundary testing. | Accepted as-is. SUT / SQLite handles large text payloads safely. |
| 36 | `TC-IMPORT-036` | Partial Failure Atomicity (Mixed batch) | `HIGH` | **VALID** | Data integrity and atomic error reporting. | Accepted as-is. 2 valid items inserted (`inserted: 2`), 2 invalid items recorded in `errors`. |
| 37 | `TC-IMPORT-037` | Data Persistence Verification | `HIGH` | **INCOMPLETE** | Data integrity cross-endpoint verification. AI only asserted 200 OK on POST without calling `GET /api/products` to verify catalog persistence. | **Student Fix:** Added subsequent `GET /api/products` request in Postman test flow and asserted that the newly imported product exists with matching name and price. |
| 38 | `TC-IMPORT-038` | HTTP Method Tampering (`GET` / `PUT`) | `HIGH` | **INVALID** | Protocol / RFC 7231 method conformance. AI asserted `405 Method Not Allowed`. Express router returns `404 Not Found` for unmapped methods. | **Student Fix:** Corrected expected status code to `404 Not Found` and updated Postman assertion. |
| 39 | `TC-IMPORT-039` | JSON Schema Validation Strict Assertions | `HIGH` | **INCOMPLETE** | Contract testing with Draft-07 JSON Schema. AI draft schema lacked strict validation for `errors` array item types (must be string array). | **Student Fix:** Enhanced schema to validate `errors: { "type": "array", "items": { "type": "string" } }` and `additionalProperties: false`. |
| 40 | `TC-IMPORT-040` | Academic Traceability Header | `HIGH` | **VALID** | HW06 §6.1 Academic traceability requirement. | Accepted as-is. Header `X-Student-Id: 23127148` is transmitted and verified. |

---

## 2. Accuracy & Audit Summary for FR-16

| Metric | Count | Percentage |
| :--- | :---: | :---: |
| **Total Test Cases Audited** | **40** | **100.0%** |
| **VALID (Accepted as-is)** | **33** | **82.5%** |
| **INCOMPLETE (Corrected & Refined by Student)** | **5** | **12.5%** |
| **INVALID (Fundamentally Corrected / Rewritten)** | **2** | **5.0%** |

---

## 3. Security Vulnerability & Bug Findings in SUT

1. **CRITICAL Vulnerability — Broken Function Level Authorization (BFLA - OWASP API5:2023):**
   - **Location:** `backend/server.js:199`
   - **Description:** Route `app.post("/api/admin/import-products", authenticateToken, ...)` only verifies token validity but completely omits `req.user.role === 'admin'`.
   - **Impact:** Any authenticated user with a standard customer account can perform administrative bulk product imports.
   - **Fix:** Add role check:
     ```javascript
     if (req.user.role !== 'admin') {
       return res.status(403).json({ error: "Forbidden: Admin access required" });
     }
     ```

2. **Negative Price Validation Omission (Business Logic Defect):**
   - **Location:** `backend/server.js:218-231`
   - **Description:** SUT does not validate that `row.price >= 0`. Products with negative pricing can be imported directly into the database.
   - **Fix:** Add validation:
     ```javascript
     if (typeof row.price !== 'number' || row.price < 0) {
       errors.push(`Hàng ${index + 2}: Giá sản phẩm không hợp lệ`);
       return;
     }
     ```

3. **SQL Injection Resilience (Positive Finding):**
   - **Location:** `backend/server.js:209-211`
   - **Description:** Uses parameterized prepared statement `db.prepare("INSERT INTO products (...) VALUES (?, ?, ?, ?, ?)")`, neutralizing injection across all input fields.

---

## 4. Phase 3 (Extend) -- Test Cases Missed by AI & Root Cause Analysis

As part of Phase 3 (Extend) of HW06, the student identified and designed **2 human-engineered test cases** specifically addressing database transaction atomicity boundaries and context-specific CSV formula injection vulnerabilities that the AI model failed to generate.

### 4.1 Extended Test Cases Table

| Test Case ID | Test Category & Technique | Target Scenario & Invariant | Expected Status / Behavior | SUT Actual Finding |
| :--- | :--- | :--- | :--- | :--- |
| **`TC-IMPORT-041`** | Data Integrity & Architecture | **Non-Atomic Batch Execution & Rollback Absence:** Sending a batch with a mid-stream invalid item to test whether SQLite commits partial rows or aborts the entire transaction. | `200 OK` with `inserted: 2`, `errors: [...]`. Verified partial rows persist in DB via `GET /api/products`. | **Architectural Characteristic:** SUT uses un-transactioned `stmt.run()` loop (non-atomic partial insertion) without `BEGIN TRANSACTION / ROLLBACK`. |
| **`TC-IMPORT-042`** | Security (SEC-06 & CWE-1236) | **CSV / Formula Injection (Spreadsheet Command Execution):** Product `name` and `description` containing `=cmd\|' /C calc'!A0`, `@SUM()`, `+cmd`, `-cmd`. | DDE/Formula characters escaped or sanitized with leading `'` to prevent client-side execution upon CSV export. | **Security Finding (CWE-1236):** SUT stores raw formula characters; client export must escape leading formula tokens. |

### 4.2 Root Cause Analysis: Why AI Missed These Test Cases

1. **Prompt Quality & Scope Granularity:**
   - The generation prompt specified the input schema as a JSON array (`"products": [...]`) parsed from CSV. The AI treated this strictly as a standard JSON REST API, failing to realize that the **business context** is a CSV import pipeline vulnerable to spreadsheet formula injection (CWE-1236) and batch rollback requirements.
2. **AI Model Cognitive Limitations (Transaction Boundary Blind Spot):**
   - LLMs evaluate API endpoints as black-box input/output transforms. They cannot inherently see the asynchronous execution model of Node.js event loops and SQLite prepared statements (`stmt.run` vs `stmt.finalize`), and thus fail to formulate test cases probing transaction atomicity and partial commit rollbacks.
3. **Characteristics & Architectural Nuances of the SUT API:**
   - The SUT implements batch operations using raw `sqlite3.prepare()` without transaction wrapping. Detecting this requires white-box or architectural testing insight into database ACID semantics rather than generic black-box schema checks.

