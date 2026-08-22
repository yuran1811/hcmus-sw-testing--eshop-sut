# AI Audit Checklist — PUT /api/orders/:id/cancel (FR-10)

**Document Identifier:** AC-EShop-API-FR10  
**Auditor / Student ID:** `23127148`  
**Endpoint Under Test:** `PUT /api/orders/:id/cancel`  
**SUT URL:** `http://localhost:3000`  
**Course:** Software Testing (FIT @ HCMUS) - HW06  

---

## 1. Test Case Evaluation Table (AI-02 Template)

| # | Test Case ID | Test Title | AI Confidence | Verdict | ISTQB & Course Reasoning | Student Fix / SUT Deviation Note |
| :---: | :--- | :--- | :---: | :---: | :--- | :--- |
| 1 | `TC-CANCEL-001` | Cancel order in `pending` status | `HIGH` | **VALID** | Verifies base valid state transition from `pending` -> `canceled` per FR-10. | Expected: 200 OK with message "Order canceled successfully". SUT passes. |
| 2 | `TC-CANCEL-002` | Cancel order in `confirmed` status | `HIGH` | **VALID** | Verifies valid state transition for confirmed order prior to shipping. | Expected: 200 OK with message "Order canceled successfully". SUT passes. |
| 3 | `TC-CANCEL-003` | Cancel order in `shipping` status | `HIGH` | **VALID** | Business rule explicitly specifies: "Chỉ được thực hiện khi đơn hàng chưa giao/chưa vận chuyển". Canceling in shipping status must be rejected. | **SUT Bug Caught (server.js:329):** SUT condition `if (order.status === 'delivered' || order.status === 'canceled')` fails to check `'shipping'`, wrongly returning 200 OK. Student Fix: SUT must check `if (order.status !== 'pending' && order.status !== 'confirmed')`. |
| 4 | `TC-CANCEL-004` | Cancel order in `delivered` status | `HIGH` | **VALID** | Verifies terminal state immutability. Delivered orders cannot be canceled. | SUT returns 400 Bad Request `{ "error": "Cannot cancel this order." }`. |
| 5 | `TC-CANCEL-005` | Double cancellation on `canceled` order | `HIGH` | **VALID** | Verifies idempotency / state guard preventing redundant cancellation. | SUT returns 400 Bad Request `{ "error": "Cannot cancel this order." }`. |
| 6 | `TC-CANCEL-006` | Order status persistence verification | `HIGH` | **VALID** | Verifies data integrity by performing subsequent `GET /api/orders/:id` query. | Confirms status is updated to `canceled` in database. |
| 7 | `TC-CANCEL-007` | Missing `Authorization` header | `HIGH` | **VALID** | SEC-02 / OWASP API2:2023 authentication enforcement. | SUT returns 401 Unauthorized `{ "error": "Unauthorized" }`. |
| 8 | `TC-CANCEL-008` | Empty Bearer token | `HIGH` | **VALID** | SEC-02 authentication edge case. | SUT returns 401 or 403. |
| 9 | `TC-CANCEL-009` | Malformed JWT string | `HIGH` | **VALID** | SEC-02 token parsing integrity. | SUT returns 403 Forbidden `{ "error": "Forbidden" }`. |
| 10 | `TC-CANCEL-010` | Expired JWT token | `HIGH` | **VALID** | SEC-02 token expiration check. | `jwt.verify` rejects expired tokens with 403 Forbidden. |
| 11 | `TC-CANCEL-011` | Invalid JWT signature | `HIGH` | **VALID** | SEC-02 cryptographic signature verification. | `jwt.verify` rejects invalid secret signature with 403 Forbidden. |
| 12 | `TC-CANCEL-012` | BOLA/IDOR - User A cancels User B's order | `HIGH` | **VALID** | SEC-04 / OWASP API1:2023 Broken Object Level Authorization. | SUT enforces `WHERE id = ? AND user_id = ?`, returning 404 `{ "error": "Order not found" }`, safely preventing cross-user cancellation. |
| 13 | `TC-CANCEL-013` | BOLA/IDOR - User cancels Admin's order | `HIGH` | **VALID** | SEC-04 privilege boundary test. | User-scoped SQL query prevents cross-tenant cancellation; returns 404. |
| 14 | `TC-CANCEL-014` | Role isolation - Admin token on user cancel | `HIGH` | **VALID** | SEC-03 RBAC isolation. | SUT checks `req.user.id`, properly scoping cancellation to the admin's own orders. Returns 404. |
| 15 | `TC-CANCEL-015` | SQLi - Boolean Tautology (`1' OR '1'='1`) | `HIGH` | **VALID** | SEC-05 / CWE-89 injection testing on path parameter. | SUT uses SQLite parameterized queries (`[req.params.id, req.user.id]`), safely neutralizing injection. Returns 404. |
| 16 | `TC-CANCEL-016` | SQLi - Stacked Query DROP TABLE | `HIGH` | **VALID** | SEC-05 / CWE-89 destructive injection testing. | Parameterized query blocks stacked statements. Returns 404 safely without 500 error. |
| 17 | `TC-CANCEL-017` | SQLi - Union-Based Injection | `HIGH` | **VALID** | SEC-05 / CWE-89 data exfiltration test. | Parameterized query prevents UNION execution. Returns 404. |
| 18 | `TC-CANCEL-018` | SQLi - Time-Based Blind Injection | `HIGH` | **VALID** | SEC-05 / CWE-89 side-channel timing attack test. | Handled safely without query delay or server crash. Returns 404. |
| 19 | `TC-CANCEL-019` | Mass Assignment - Injected status | `HIGH` | **VALID** | SEC-07 / OWASP API6:2023 mass assignment check. | SUT ignores request body and explicitly sets `UPDATE orders SET status = 'canceled'`, safely avoiding mass assignment. |
| 20 | `TC-CANCEL-020` | Mass Assignment - Injected amount/user_id | `HIGH` | **VALID** | SEC-07 mass assignment check for financial/ownership fields. | Extra fields in body are completely ignored by endpoint handler. |
| 21 | `TC-CANCEL-021` | HTTP Method Tampering - POST to PUT route | `HIGH` | **VALID** | Protocol / RFC 7231 method conformance. | Express router returns 404 (or 405) for unmapped HTTP POST method. |
| 22 | `TC-CANCEL-022` | HTTP Method Tampering - DELETE to PUT route | `HIGH` | **VALID** | Protocol / RFC 7231 method conformance. | Express router returns 404 (or 405) for unmapped HTTP DELETE method. |
| 23 | `TC-CANCEL-023` | Non-existent high integer ID (`999999`) | `HIGH` | **VALID** | Standard negative equivalence partition for ID lookup. | SUT returns 404 Not Found `{ "error": "Order not found" }`. |
| 24 | `TC-CANCEL-024` | Alphabetic string ID (`abc`) | `HIGH` | **VALID** | Negative type violation partition. | SUT casts/matches against SQLite INTEGER column and returns 404. |
| 25 | `TC-CANCEL-025` | Alphanumeric string ID (`order_123`) | `HIGH` | **VALID** | Negative type violation partition. | SUT returns 404 Not Found. |
| 26 | `TC-CANCEL-026` | Floating-point decimal ID (`1.5`) | `HIGH` | **VALID** | Non-integer numeric boundary. | SUT fails match against integer order ID; returns 404. |
| 27 | `TC-CANCEL-027` | Negative integer ID (`-1`) | `HIGH` | **VALID** | Boundary Value Analysis (Negative domain). | Autoincrement IDs are positive integers >= 1. SUT returns 404. |
| 28 | `TC-CANCEL-028` | Zero integer ID (`0`) | `HIGH` | **VALID** | Boundary Value Analysis (Zero boundary). | SUT returns 404 Not Found. |
| 29 | `TC-CANCEL-029` | Large negative integer ID (`-999999999`) | `HIGH` | **VALID** | Extreme negative boundary. | SUT returns 404 Not Found safely. |
| 30 | `TC-CANCEL-030` | Special characters & symbols (`!@#$%^&*()`) | `HIGH` | **VALID** | URL encoding and special symbol boundary. | SUT returns 404 Not Found. |
| 31 | `TC-CANCEL-031` | Maximum 64-bit integer (`9223372036854775807`) | `HIGH` | **VALID** | Extreme boundary integer overflow test. | SUT handles 64-bit integer gracefully without crash; returns 404. |
| 32 | `TC-CANCEL-032` | Maximum 32-bit integer (`2147483647`) | `HIGH` | **VALID** | 32-bit signed integer upper boundary. | SUT returns 404 Not Found. |
| 33 | `TC-CANCEL-033` | Oversized URL string (>1000 characters) | `HIGH` | **VALID** | Buffer boundary / DoS prevention test. | SUT / Express server handles without unhandled exception. Returns 404 or 414. |
| 34 | `TC-CANCEL-034` | Path traversal sequence (`../../`) | `HIGH` | **VALID** | Path traversal boundary / CWE-22 test. | Express URL resolution routes safely without file disclosure. Returns 404. |
| 35 | `TC-CANCEL-035` | Null byte injection (`1%00cancel`) | `HIGH` | **VALID** | Poison null byte / CWE-626 test. | SUT returns 404 or 400 safely. |
| 36 | `TC-CANCEL-036` | Contract - 200 OK JSON Schema Strict | `HIGH` | **VALID** | Contract testing with Draft-07 JSON Schema. | Validates property `message` is string with value "Order canceled successfully". |
| 37 | `TC-CANCEL-037` | Contract - 400 Bad Request JSON Schema | `HIGH` | **VALID** | Contract testing for error payloads. | Validates property `error` is string on 400 responses. |
| 38 | `TC-CANCEL-038` | Contract - 404 Not Found JSON Schema | `HIGH` | **VALID** | Contract testing for error payloads. | Validates property `error` is string on 404 responses. |
| 39 | `TC-CANCEL-039` | Contract - Response Header Validation | `HIGH` | **VALID** | MIME type and charset verification. | Validates `Content-Type: application/json; charset=utf-8`. |
| 40 | `TC-CANCEL-040` | Audit - Mandatory `X-Student-Id` Header | `HIGH` | **VALID** | HW06 §6.1 Academic traceability requirement. | Header `X-Student-Id: 23127148` is transmitted and verified. |

---

## 2. Security Vulnerability & Bug Findings in SUT

During test design and execution against `backend/server.js`, the following bugs and architectural observations were identified:

1. **BUG-CANCEL-01 (FR-10 State Machine Violation - SUT Line 329):**
   - *Finding:* In `backend/server.js` line 329, the cancellation guard checks `if (order.status === "delivered" || order.status === "canceled")`. It completely omits the `"shipping"` status!
   - *Impact:* Customers are able to cancel orders that are already in transit/shipping, directly violating business requirement FR-10 ("Chỉ được thực hiện khi đơn hàng chưa giao").
   - *Fix:* Replace the condition with: `if (order.status !== "pending" && order.status !== "confirmed")`.

2. **SECURITY-CANCEL-01 (BOLA/IDOR Protection - Verified Strong):**
   - *Finding:* The backend queries `SELECT * FROM orders WHERE id = ? AND user_id = ?` using the authenticated `req.user.id`.
   - *Impact:* Properly prevents Broken Object Level Authorization (IDOR) attacks across different user accounts.

3. **SECURITY-CANCEL-02 (SQL Injection Defense - Parameterized Queries):**
   - *Finding:* The database interactions utilize SQLite parameter binding (`db.get(..., [req.params.id, req.user.id])`).
   - *Impact:* Prevents SQL injection via path parameters across boolean tautologies, stacked queries, and union injections.
