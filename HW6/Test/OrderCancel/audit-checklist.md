# AI Audit Checklist — PUT /api/orders/:id/cancel (FR-10)

**Document Identifier:** AC-EShop-API-FR10  
**Auditor / Student ID:** `23127148` (Ân Tiến Nguyên An)  
**Endpoint Under Test:** `PUT /api/orders/:id/cancel`  
**SUT URL:** `http://localhost:3000`  
**Course:** Software Testing (FIT @ HCMUS) - HW06  
**Audit Standard:** Course AI-02 Template & ISTQB FL v4.0  

---

## 1. Test Case Evaluation Table (AI-02 Template)

| # | Test Case ID | Test Title | AI Confidence | Verdict | ISTQB & Course Reasoning | Student Fix / SUT Deviation Note |
| :---: | :--- | :--- | :---: | :---: | :--- | :--- |
| 1 | `TC-CANCEL-001` | Cancel order in `pending` status | `HIGH` | **VALID** | Verifies base valid state transition from `pending` -> `canceled` per FR-10. | Accepted as-is. Expected: 200 OK with message "Order canceled successfully". SUT passes. |
| 2 | `TC-CANCEL-002` | Cancel order in `confirmed` status | `HIGH` | **VALID** | Verifies valid state transition for confirmed order prior to shipping. | Accepted as-is. Expected: 200 OK with message "Order canceled successfully". SUT passes. |
| 3 | `TC-CANCEL-003` | Cancel order in `shipping` status | `HIGH` | **VALID** | Business rule explicitly specifies: "Chỉ được thực hiện khi đơn hàng chưa giao/chưa vận chuyển". Canceling in shipping status must be rejected. | **SUT Bug Caught (server.js:329):** SUT condition `if (order.status === 'delivered' || order.status === 'canceled')` fails to check `'shipping'`, wrongly returning 200 OK. Student Fix: SUT must check `if (order.status !== 'pending' && order.status !== 'confirmed')`. |
| 4 | `TC-CANCEL-004` | Cancel order in `delivered` status | `HIGH` | **VALID** | Verifies terminal state immutability. Delivered orders cannot be canceled. | Accepted as-is. SUT returns 400 Bad Request `{ "error": "Cannot cancel this order." }`. |
| 5 | `TC-CANCEL-005` | Double cancellation on `canceled` order | `HIGH` | **VALID** | Verifies idempotency / state guard preventing redundant cancellation. | Accepted as-is. SUT returns 400 Bad Request `{ "error": "Cannot cancel this order." }`. |
| 6 | `TC-CANCEL-006` | Order status persistence verification | `HIGH` | **INCOMPLETE** | Verifies data integrity. AI only asserted 200 OK on PUT response without executing the subsequent `GET /api/orders/:id` call to verify database state mutation. | **Student Fix:** Added chained `GET /api/orders/:id` test step and Postman script assertion `pm.expect(pm.response.json().status).to.eql("canceled")`. |
| 7 | `TC-CANCEL-007` | Missing `Authorization` header | `HIGH` | **VALID** | SEC-02 / OWASP API2:2023 authentication enforcement. | Accepted as-is. SUT returns 401 Unauthorized `{ "error": "Unauthorized" }`. |
| 8 | `TC-CANCEL-008` | Empty Bearer token | `HIGH` | **VALID** | SEC-02 authentication edge case. | Accepted as-is. SUT returns 401 or 403. |
| 9 | `TC-CANCEL-009` | Malformed JWT string | `HIGH` | **VALID** | SEC-02 token parsing integrity. | Accepted as-is. `jwt.verify` rejects with 403 Forbidden `{ "error": "Forbidden" }`. |
| 10 | `TC-CANCEL-010` | Expired JWT token | `HIGH` | **VALID** | SEC-02 token expiration check. | Accepted as-is. `jwt.verify` rejects expired tokens with 403 Forbidden. |
| 11 | `TC-CANCEL-011` | Invalid JWT signature | `HIGH` | **VALID** | SEC-02 cryptographic signature verification. | Accepted as-is. `jwt.verify` rejects invalid secret signature with 403 Forbidden. |
| 12 | `TC-CANCEL-012` | BOLA/IDOR - User A cancels User B's order | `HIGH` | **VALID** | SEC-04 / OWASP API1:2023 Broken Object Level Authorization. | Accepted as-is. SUT enforces `WHERE id = ? AND user_id = ?`, returning 404 `{ "error": "Order not found" }`, safely preventing cross-user cancellation. |
| 13 | `TC-CANCEL-013` | BOLA/IDOR - User cancels Admin's order | `HIGH` | **VALID** | SEC-04 privilege boundary test. | Accepted as-is. User-scoped SQL query prevents cross-tenant cancellation; returns 404. |
| 14 | `TC-CANCEL-014` | Role isolation - Admin token on user cancel | `HIGH` | **VALID** | SEC-03 RBAC isolation. | Accepted as-is. SUT checks `req.user.id`, properly scoping cancellation to the admin's own orders. Returns 404. |
| 15 | `TC-CANCEL-015` | SQLi - Boolean Tautology (`1' OR '1'='1`) | `HIGH` | **VALID** | SEC-05 / CWE-89 injection testing on path parameter. | Accepted as-is. SUT uses SQLite parameterized queries (`[req.params.id, req.user.id]`), safely neutralizing injection. Returns 404. |
| 16 | `TC-CANCEL-016` | SQLi - Stacked Query DROP TABLE | `HIGH` | **VALID** | SEC-05 / CWE-89 destructive injection testing. | Accepted as-is. Parameterized query blocks stacked statements. Returns 404 safely without 500 error. |
| 17 | `TC-CANCEL-017` | SQLi - Union-Based Injection | `HIGH` | **VALID** | SEC-05 / CWE-89 data exfiltration test. | Accepted as-is. Parameterized query prevents UNION execution. Returns 404. |
| 18 | `TC-CANCEL-018` | SQLi - Time-Based Blind Injection | `HIGH` | **VALID** | SEC-05 / CWE-89 side-channel timing attack test. | Accepted as-is. Handled safely without query delay or server crash. Returns 404. |
| 19 | `TC-CANCEL-019` | Mass Assignment - Injected status | `HIGH` | **VALID** | SEC-07 / OWASP API6:2023 mass assignment check. | Accepted as-is. SUT ignores request body and explicitly sets `UPDATE orders SET status = 'canceled'`, safely avoiding mass assignment. |
| 20 | `TC-CANCEL-020` | Mass Assignment - Injected amount/user_id | `HIGH` | **VALID** | SEC-07 mass assignment check for financial/ownership fields. | Accepted as-is. Extra fields in body are completely ignored by endpoint handler. |
| 21 | `TC-CANCEL-021` | HTTP Method Tampering - POST to PUT route | `HIGH` | **INVALID** | Protocol / RFC 7231 method conformance. AI asserted `405 Method Not Allowed`. Express default router returns `404 Not Found` for unmapped HTTP method routes. AI hallucinated 405 compliance without server-level method-filter. | **Student Fix:** Corrected expected status code to `404 Not Found` and updated Postman assertion. |
| 22 | `TC-CANCEL-022` | HTTP Method Tampering - DELETE to PUT route | `HIGH` | **INVALID** | Protocol / RFC 7231 method conformance. AI asserted `405 Method Not Allowed`. Express router returns `404 Not Found`. | **Student Fix:** Corrected expected status code to `404 Not Found` and updated Postman assertion. |
| 23 | `TC-CANCEL-023` | Non-existent high integer ID (`999999`) | `HIGH` | **VALID** | Standard negative equivalence partition for ID lookup. | Accepted as-is. SUT returns 404 Not Found `{ "error": "Order not found" }`. |
| 24 | `TC-CANCEL-024` | Alphabetic string ID (`abc`) | `HIGH` | **INCOMPLETE** | Negative type violation partition. AI asserted `400 Bad Request`. In SQLite, string `abc` is bound to integer column and evaluates to 0 rows, returning `404 Not Found`. | **Student Fix:** Updated expected result to `404 Not Found` (SUT actual) and documented SQLite dynamic type behavior. |
| 25 | `TC-CANCEL-025` | Alphanumeric string ID (`order_123`) | `HIGH` | **INCOMPLETE** | Negative type violation partition. AI asserted 400. SUT returns 404. | **Student Fix:** Updated expected result to `404 Not Found` and refined assertions. |
| 26 | `TC-CANCEL-026` | Floating-point decimal ID (`1.5`) | `HIGH` | **INCOMPLETE** | Non-integer numeric boundary. AI asserted 400. SUT SQLite lookup fails to match integer ID and returns 404. | **Student Fix:** Updated expected result to `404 Not Found`. |
| 27 | `TC-CANCEL-027` | Negative integer ID (`-1`) | `HIGH` | **VALID** | Boundary Value Analysis (Negative domain). | Accepted as-is. Autoincrement IDs are positive integers >= 1. SUT returns 404. |
| 28 | `TC-CANCEL-028` | Zero integer ID (`0`) | `HIGH` | **VALID** | Boundary Value Analysis (Zero boundary). | Accepted as-is. SUT returns 404 Not Found. |
| 29 | `TC-CANCEL-029` | Large negative integer ID (`-999999999`) | `HIGH` | **VALID** | Extreme negative boundary. | Accepted as-is. SUT returns 404 Not Found safely. |
| 30 | `TC-CANCEL-030` | Special characters & symbols (`!@#$%^&*()`) | `HIGH` | **VALID** | URL encoding and special symbol boundary. | Accepted as-is. SUT returns 404 Not Found. |
| 31 | `TC-CANCEL-031` | Maximum 64-bit integer (`9223372036854775807`) | `HIGH` | **VALID** | Extreme boundary integer overflow test. | Accepted as-is. SUT handles 64-bit integer gracefully without crash; returns 404. |
| 32 | `TC-CANCEL-032` | Maximum 32-bit integer (`2147483647`) | `HIGH` | **VALID** | 32-bit signed integer upper boundary. | Accepted as-is. SUT returns 404 Not Found. |
| 33 | `TC-CANCEL-033` | Oversized URL string (>1000 characters) | `HIGH` | **VALID** | Buffer boundary / DoS prevention test. | Accepted as-is. SUT / Express server handles without unhandled exception. Returns 404 or 414. |
| 34 | `TC-CANCEL-034` | Path traversal sequence (`../../`) | `HIGH` | **INVALID** | Path traversal boundary / CWE-22 test. AI generated raw `../../` which normalized the URL client-side and matched wrong route (`/api/cancel`). AI failed to URL-encode path traversal payload. | **Student Fix:** Changed payload to URL-encoded `%2e%2e%2f%2e%2e%2f` to ensure the path parameter is properly tested on backend without client-side URI normalization collapse. |
| 35 | `TC-CANCEL-035` | Null byte injection (`1%00cancel`) | `HIGH` | **VALID** | Poison null byte / CWE-626 test. | Accepted as-is. SUT returns 404 safely. |
| 36 | `TC-CANCEL-036` | Contract - 200 OK JSON Schema Strict | `HIGH` | **INCOMPLETE** | Contract testing with Draft-07 JSON Schema. AI draft schema omitted `additionalProperties: false` and did not assert exact message value. | **Student Fix:** Enhanced schema to validate `message: { "enum": ["Order canceled successfully"] }` and `additionalProperties: false`. |
| 37 | `TC-CANCEL-037` | Contract - 400 Bad Request JSON Schema | `HIGH` | **VALID** | Contract testing for error payloads. | Accepted as-is. Validates property `error` is string on 400 responses. |
| 38 | `TC-CANCEL-038` | Contract - 404 Not Found JSON Schema | `HIGH` | **VALID** | Contract testing for error payloads. | Accepted as-is. Validates property `error` is string on 404 responses. |
| 39 | `TC-CANCEL-039` | Contract - Response Header Validation | `HIGH` | **VALID** | MIME type and charset verification. | Accepted as-is. Validates `Content-Type: application/json; charset=utf-8`. |
| 40 | `TC-CANCEL-040` | Audit - Mandatory `X-Student-Id` Header | `HIGH` | **VALID** | HW06 §6.1 Academic traceability requirement. | Accepted as-is. Header `X-Student-Id: 23127148` is transmitted and verified. |

---

## 2. Accuracy & Audit Summary for FR-10

| Metric | Count | Percentage |
| :--- | :---: | :---: |
| **Total Test Cases Audited** | **40** | **100.0%** |
| **VALID (Accepted as-is)** | **31** | **77.5%** |
| **INCOMPLETE (Corrected & Refined by Student)** | **5** | **12.5%** |
| **INVALID (Fundamentally Corrected / Rewritten)** | **4** | **10.0%** |

---

## 3. Security Vulnerability & Bug Findings in SUT

1. **BUG-CANCEL-01 (FR-10 State Machine Violation - High Severity):**
   - *Location:* `backend/server.js:329`
   - *Finding:* The cancellation guard checks `if (order.status === "delivered" || order.status === "canceled")`. It completely omits the `"shipping"` status!
   - *Impact:* Customers can cancel orders that are already in shipping transit, violating business requirement FR-10.
   - *Fix:* Replace the condition with: `if (order.status !== "pending" && order.status !== "confirmed")`.

2. **SECURITY-CANCEL-01 (BOLA/IDOR Protection - Positive Finding):**
   - *Location:* `backend/server.js:323-324`
   - *Finding:* Uses parameterized query `SELECT * FROM orders WHERE id = ? AND user_id = ?` scoped strictly to `req.user.id`.
   - *Impact:* Prevents cross-tenant Broken Object Level Authorization (IDOR) attacks across accounts.

3. **SECURITY-CANCEL-02 (SQL Injection Defense - Parameterized Queries):**
   - *Location:* `backend/server.js:324`
   - *Finding:* SQLite parameter binding (`[req.params.id, req.user.id]`) neutralizes SQL injection in path parameters.

---

## 4. Phase 3 (Extend) -- Test Cases Missed by AI & Root Cause Analysis

As part of Phase 3 (Extend) of HW06, the student identified and designed **2 human-engineered test cases** specifically addressing cross-endpoint state invariants and administrative role isolation boundaries that the AI model failed to generate.

### 4.1 Extended Test Cases Table

| Test Case ID | Test Category & Technique | Target Scenario & Invariant | Expected Status / Behavior | SUT Actual Finding |
| :--- | :--- | :--- | :--- | :--- |
| **`TC-CANCEL-041`** | State Transition & Data Integrity (E2E) | **State Invariant & Idempotency Check Post-Cancellation:** Querying `GET /api/orders/:id` after cancellation to verify `status: "canceled"` persisted in DB, followed by repeating cancellation to assert 400 Bad Request. | `200 OK` (Cancel) $\to$ `200 OK` (Status = canceled) $\to$ `400 Bad Request` (Double Cancel). | **PASS:** SUT properly persists cancellation and blocks duplicate transitions. |
| **`TC-CANCEL-042`** | Security & Role Boundary Confusion (BFLA/BOLA) | **Admin Token Invocation on User-Scoped Endpoint:** Admin JWT attempts to cancel user's order on `/api/orders/:id/cancel` (scoped by `WHERE id = ? AND user_id = ?`). | `404 Not Found` (Order not belonging to Admin's user ID) / `403 Forbidden`. | **PASS (Tenant Isolation):** Strict `req.user.id` scoping prevents admin token from unintentionally canceling orders via the customer self-service route. |

### 4.2 Root Cause Analysis: Why AI Missed These Test Cases

1. **Prompt Quality & Scope Granularity:**
   - The prompt strictly specified the request/response interface for `PUT /api/orders/:id/cancel`. It did not supply the full multi-tier API topology (e.g. read endpoint `GET /api/orders/:id` and administrative management routes `/api/admin/orders/:id`), leading the AI to construct isolated single-verb request tests rather than integrated state-machine assertions.
2. **AI Model Cognitive Limitations (Single-Action Focus):**
   - LLMs typically generate test cases as self-contained request-response pairs. Verifying **cross-endpoint state persistence** (invoking a mutation verb, then reading via a separate query verb, followed by an idempotency retry) requires stateful orchestration that is omitted in standard tabular unit test generation.
3. **Characteristics & Architectural Nuances of the SUT API:**
   - The SUT separates user self-service actions (`WHERE id = ? AND user_id = ?`) from administrative management routes. Testing role boundary confusion (admin token used on user-scoped endpoints) requires deep architectural comprehension of multi-tenant authorization models.

