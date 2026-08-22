# Test Coverage Matrix: PUT /api/orders/:id/cancel (FR-10)

**API Endpoint:** `PUT /api/orders/:id/cancel`  
**Feature:** FR-10 (Order State Machine & Order Cancellation)  
**SUT:** EShop Backend (`http://localhost:3000`)  
**Student ID:** `23127148`  
**Total Test Cases:** 45  

---

## 1. Coverage by Quality Dimension

| Coverage Dimension | Count | Target Ratio | Status |
| :--- | :---: | :---: | :---: |
| **1. State Transitions & Finite State Machine (FSM)** | 8 | ≥ 5 | ✅ Met (8 cases) |
| **2. Security Testing (OWASP / SEC-01 to SEC-07)** | 17 | ≥ 10 | ✅ Met (17 cases) |
| **3. Domain Partitioning (EP & BVA on `:id`)** | 13 | ≥ 12 | ✅ Met (13 cases) |
| **4. Schema & Contract Validation & Traceability** | 5 | ≥ 4 | ✅ Met (5 cases) |
| **5. Cross-Entity Data Integrity & Concurrency** | 2 | ≥ 2 | ✅ Met (2 cases) |
| **Total** | **45** | **≥ 35** | **✅ 128.6% of Target** |

---

## 2. Detailed Test Case Traceability Matrix

| Test Case ID | Test Name | Dimension | Technique | Requirement / Standard | Expected Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| `TC-CANCEL-001` | Cancel order in `pending` status | State Transition | State Machine Testing | FR-10 / Happy Path | `200 OK` |
| `TC-CANCEL-002` | Cancel order in `confirmed` status | State Transition | State Machine Testing | FR-10 / Happy Path | `200 OK` |
| `TC-CANCEL-003` | Cancel order in `shipping` status | State Transition | State Machine (Negative) | FR-10 / SUT Line 329 Defect | `400 Bad Request` |
| `TC-CANCEL-004` | Cancel order in `delivered` status | State Transition | Terminal State Immutability | FR-10 / Terminal State | `400 Bad Request` |
| `TC-CANCEL-005` | Cancel order in `canceled` status | State Transition | Idempotency / Double Cancel | FR-10 / Duplicate Action | `400 Bad Request` |
| `TC-CANCEL-006` | Order status persistence verification | State Transition | State Verification (Chained) | FR-10 / State Integrity | `200 OK` |
| `TC-CANCEL-007` | Missing `Authorization` header | Security Testing | SEC-02 Authentication Bypass | OWASP API2:2023 | `401 Unauthorized` |
| `TC-CANCEL-008` | Empty Bearer token | Security Testing | SEC-02 Authentication Bypass | OWASP API2:2023 | `401` / `403` |
| `TC-CANCEL-009` | Malformed JWT string | Security Testing | SEC-02 Broken Authentication | OWASP API2:2023 | `403 Forbidden` |
| `TC-CANCEL-010` | Expired JWT token | Security Testing | SEC-02 Token Expiration | OWASP API2:2023 | `403 Forbidden` |
| `TC-CANCEL-011` | Invalid JWT signature | Security Testing | SEC-02 Token Integrity | OWASP API2:2023 | `403 Forbidden` |
| `TC-CANCEL-012` | BOLA/IDOR - User A cancels User B's order | Security Testing | SEC-04 / BOLA (IDOR) | OWASP API1:2023 / CWE-639 | `404` / `403` |
| `TC-CANCEL-013` | BOLA/IDOR - Standard user cancels Admin order | Security Testing | SEC-04 / Privilege Escalation | OWASP API1:2023 / CWE-639 | `404` / `403` |
| `TC-CANCEL-014` | Role isolation - Admin token on user cancel | Security Testing | SEC-03 / RBAC Isolation | User-scoped Data Access | `404 Not Found` |
| `TC-CANCEL-015` | SQLi - Boolean Tautology (`1' OR '1'='1`) | Security Testing | SEC-05 SQL Injection | OWASP API3:2023 / CWE-89 | `404` (No 500) |
| `TC-CANCEL-016` | SQLi - Stacked Query DROP TABLE | Security Testing | SEC-05 SQL Injection | OWASP API3:2023 / CWE-89 | `404` (No 500) |
| `TC-CANCEL-017` | SQLi - Union-Based Injection | Security Testing | SEC-05 SQL Injection | OWASP API3:2023 / CWE-89 | `404` (No 500) |
| `TC-CANCEL-018` | SQLi - Time-Based Blind Injection | Security Testing | SEC-05 SQL Injection | OWASP API3:2023 / CWE-89 | `404` (No Delay/500) |
| `TC-CANCEL-019` | Mass Assignment - Injected status in body | Security Testing | SEC-07 Mass Assignment | OWASP API6:2023 | Body Ignored (`200 OK`) |
| `TC-CANCEL-020` | Mass Assignment - Injected amount/user_id | Security Testing | SEC-07 Mass Assignment | OWASP API6:2023 | Body Ignored (`200 OK`) |
| `TC-CANCEL-021` | HTTP Method Tampering - POST to PUT route | Security Testing | Protocol Tampering | RFC 7231 / HTTP Methods | `404` / `405` |
| `TC-CANCEL-022` | HTTP Method Tampering - DELETE to PUT route | Security Testing | Protocol Tampering | RFC 7231 / HTTP Methods | `404` / `405` |
| `TC-CANCEL-023` | Non-existent high integer ID (`999999`) | Domain Partitioning | Equivalence Partitioning | Error Path Validation | `404 Not Found` |
| `TC-CANCEL-024` | Alphabetic string ID (`abc`) | Domain Partitioning | Type Violation Partition | Parameter Type Integrity | `404 Not Found` |
| `TC-CANCEL-025` | Alphanumeric string ID (`order_123`) | Domain Partitioning | Type Violation Partition | Parameter Type Integrity | `404 Not Found` |
| `TC-CANCEL-026` | Floating-point decimal ID (`1.5`) | Domain Partitioning | Type Violation Partition | Parameter Type Integrity | `404 Not Found` |
| `TC-CANCEL-027` | Negative integer ID (`-1`) | Domain Partitioning | Boundary Value Analysis | Lower Boundary Limit | `404 Not Found` |
| `TC-CANCEL-028` | Zero integer ID (`0`) | Domain Partitioning | Boundary Value Analysis | Non-positive Boundary | `404 Not Found` |
| `TC-CANCEL-029` | Large negative integer ID (`-999999999`) | Domain Partitioning | Boundary Value Analysis | Negative Extremes | `404 Not Found` |
| `TC-CANCEL-030` | Special characters & symbols (`!@#$%^&*()`) | Domain Partitioning | Character Set Partition | URL Encoding / Sanitization | `404 Not Found` |
| `TC-CANCEL-031` | Maximum 64-bit integer (`9223372036854775807`) | Domain Partitioning | Boundary Value Analysis | Integer Overflow Boundary | `404 Not Found` |
| `TC-CANCEL-032` | Maximum 32-bit integer (`2147483647`) | Domain Partitioning | Boundary Value Analysis | 32-Bit Max Boundary | `404 Not Found` |
| `TC-CANCEL-033` | Oversized URL string (>1000 characters) | Domain Partitioning | Buffer / Stress Boundary | Denial of Service / Buffer | `404` / `414` |
| `TC-CANCEL-034` | Path traversal sequence (`../../`) | Domain Partitioning | Boundary / Sanitization | Path Traversal / CWE-22 | `404 Not Found` |
| `TC-CANCEL-035` | Null byte injection (`1%00cancel`) | Domain Partitioning | Sanitization Boundary | Poison Null Byte / CWE-626 | `404` / `400` |
| `TC-CANCEL-036` | Contract - 200 OK JSON Schema Strict | Schema Validation | JSON Schema (Draft-07) | Contract Testing | `200 OK` Schema Match |
| `TC-CANCEL-037` | Contract - 400 Bad Request JSON Schema | Schema Validation | JSON Schema (Draft-07) | Contract Testing | `400` Schema Match |
| `TC-CANCEL-038` | Contract - 404 Not Found JSON Schema | Schema Validation | JSON Schema (Draft-07) | Contract Testing | `404` Schema Match |
| `TC-CANCEL-039` | Contract - Response Header Validation | Schema Validation | HTTP Header Conformance | RFC 7231 / MIME Types | `application/json` |
| `TC-CANCEL-040` | Audit - Mandatory `X-Student-Id` Header | Traceability | Audit Compliance | HW06 §6.1 Requirement | Header Logged / `200 OK` |
| `TC-CANCEL-041` | Post-Cancellation Invariant & Idempotency | State Transition | End-to-End Verification | Cross-Endpoint Persistence | `200` $\to$ `200` $\to$ `400` |
| `TC-CANCEL-042` | Admin Token on User-Scoped Route | Security / BFLA & BOLA | Role Boundary Isolation | Tenant Scoping Integrity | `404 Not Found` |
| `TC-CANCEL-043` | Concurrent Double Cancel (Race Condition) | Concurrency & Integrity | Race Condition Testing | NFR-REL-01 / Concurrency | `200 OK` + `400/409` |
| `TC-CANCEL-044` | Inventory Stock Restoration Invariant | Cross-Entity Invariant | Stock Release Verification | FR-08 & FR-10 Integration | `Stock + Quantity` |
| `TC-CANCEL-045` | Coupon Quota Rollback & Reuse Lifecycle | State & Business Logic | Quota Reinstatement Flow | FR-07 & FR-10 Lifecycle | Coupon Restored |

---

## 3. Finite State Machine (FSM) State Transition Matrix

The table below outlines all valid and forbidden state transitions defined for the Order entity under **FR-10**:

| Initial State | Event / Trigger | Target State | Expected Status | SUT Behavior & Finding |
| :--- | :--- | :---: | :---: | :--- |
| **`pending`** | Cancel Request | `canceled` | `200 OK` | ✅ Correctly transitions to `canceled` |
| **`confirmed`** | Cancel Request | `canceled` | `200 OK` | ✅ Correctly transitions to `canceled` |
| **`shipping`** | Cancel Request | *Rejected* | `400 Bad Request` | ❌ **BUG:** SUT line 329 allows cancel (returns 200 OK instead of 400) |
| **`delivered`** | Cancel Request | *Rejected* | `400 Bad Request` | ✅ Correctly returns `400 Cannot cancel this order.` |
| **`canceled`** | Cancel Request | *Rejected* | `400 Bad Request` | ✅ Correctly returns `400 Cannot cancel this order.` |
