# Master Test Suite Specification: PUT /api/orders/:id/cancel (FR-10)

**Document Identifier:** TS-EShop-API-FR10-ORDER-CANCEL  
**Standard Compliance:** ISTQB Certified Tester Advanced / OWASP API Security Top 10 (2023) / RFC 7231 & RFC 8259  
**Target API:** `PUT /api/orders/:id/cancel` (FR-10: Order State Machine & Order Cancellation)  
**Base URL:** `http://localhost:3000`  
**Authentication:** Bearer JWT Token (`Authorization: Bearer <user_token>`, Role: `user`)  
**Student ID:** `23127148` (Mandatory Request Header `X-Student-Id`)  
**Total Test Cases:** 40 Executable Cases  

---

## 1. Executive Summary & Test Strategy

This document specifies the comprehensive automated API test suite for the `PUT /api/orders/:id/cancel` endpoint of the EShop SUT. The test cases systematically cover four critical quality and risk dimensions:

1. **State Transitions & Finite State Machine (FSM - FR-10):** Valid and invalid state transitions across the full order lifecycle (`pending`, `confirmed`, `shipping`, `delivered`, `canceled`), terminal state immutability, double-cancellation idempotency, and targeted verification of the known SUT logic defect on line 329 where `shipping` orders are improperly permitted to be canceled.
2. **Security Testing (OWASP & SEC-01 to SEC-07):** Verification of Broken Object Level Authorization / IDOR (SEC-01/SEC-04), Authentication Bypass & Broken Authentication with tampered/expired JWTs (SEC-02), SQL Injection attacks on `:id` parameter (SEC-05), Mass Assignment / Body Tampering (SEC-07), and HTTP Method Tampering.
3. **Domain Partitioning (EP & BVA on `:id`):** Equivalence partitioning for non-existent IDs, invalid types (alphabetic, alphanumeric, float), boundary values (0, negative numbers, extreme 64-bit/32-bit limits), oversized URI buffers (>1000 chars), null bytes, and path traversal sequences.
4. **Schema & Contract Validation:** Strict Draft-07 JSON Schema validation for both `200 OK` success responses and `4xx` error responses, MIME/Content-Type enforcement, and academic traceability header verification (`X-Student-Id: 23127148`).

---

## 2. Test Case Summary Table

| Test Case ID | Test Category | Test Technique | Input Description | Expected Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-CANCEL-001** | State Transition (FSM) | State Machine (Valid) | Cancel order in `pending` status | `200 OK` |
| **TC-CANCEL-002** | State Transition (FSM) | State Machine (Valid) | Cancel order in `confirmed` status | `200 OK` |
| **TC-CANCEL-003** | State Transition (FSM) | State Machine (Negative / SUT Bug) | Cancel order in `shipping` status (Catches Line 329 defect) | `400 Bad Request` |
| **TC-CANCEL-004** | State Transition (FSM) | State Machine (Negative / Terminal) | Cancel order in `delivered` status | `400 Bad Request` |
| **TC-CANCEL-005** | State Transition (FSM) | State Machine (Negative / Idempotent) | Cancel order already in `canceled` status (Double cancel) | `400 Bad Request` |
| **TC-CANCEL-006** | State Transition (FSM) | State Persistence Verification | Query `GET /api/orders/:id` to verify status is `canceled` | `200 OK` |
| **TC-CANCEL-007** | Security (SEC-02) | Missing Authentication | Request without `Authorization` header | `401 Unauthorized` |
| **TC-CANCEL-008** | Security (SEC-02) | Empty Authorization Header | Header `Authorization: Bearer ` (Empty token) | `401` / `403` |
| **TC-CANCEL-009** | Security (SEC-02) | Malformed JWT Token | Header `Authorization: Bearer invalid.jwt.string` | `403 Forbidden` |
| **TC-CANCEL-010** | Security (SEC-02) | Expired JWT Token | Header `Authorization: Bearer <expired_jwt_token>` | `403 Forbidden` |
| **TC-CANCEL-011** | Security (SEC-02) | Tampered JWT Signature | JWT signed with wrong secret key | `403 Forbidden` |
| **TC-CANCEL-012** | Security (SEC-04 / BOLA) | IDOR / Object Authorization | User A attempts to cancel User B's order | `404` / `403` |
| **TC-CANCEL-013** | Security (SEC-04 / BOLA) | IDOR / Privilege Separation | Standard user attempts to cancel Admin's order | `404` / `403` |
| **TC-CANCEL-014** | Security (SEC-03 / RBAC) | Role Isolation | Admin token canceling user order via user cancel route | `404 Not Found` |
| **TC-CANCEL-015** | Security (SEC-05) | SQLi - Boolean Tautology | Path parameter `1' OR '1'='1` in `:id` | `404` (No 500) |
| **TC-CANCEL-016** | Security (SEC-05) | SQLi - Stacked Query DROP | Path parameter `1; DROP TABLE orders;--` in `:id` | `404` (No 500) |
| **TC-CANCEL-017** | Security (SEC-05) | SQLi - Union-Based Injection | Path parameter `1 UNION SELECT 1,2,3,4--` in `:id` | `404` (No 500) |
| **TC-CANCEL-018** | Security (SEC-05) | SQLi - Time-Based / Blind Injection | Path parameter `1' AND (SELECT 1 FROM (SELECT(SLEEP(2)))a)--` | `404` (Fast, No 500) |
| **TC-CANCEL-019** | Security (SEC-07) | Mass Assignment | Request body with injected `{"status": "delivered"}` | Body Ignored (`200 OK`) |
| **TC-CANCEL-020** | Security (SEC-07) | Mass Assignment | Request body with injected `{"total_amount": 0, "user_id": 99}` | Body Ignored (`200 OK`) |
| **TC-CANCEL-021** | Security / Protocol | HTTP Method Tampering | `POST /api/orders/:id/cancel` instead of `PUT` | `404` / `405` |
| **TC-CANCEL-022** | Security / Protocol | HTTP Method Tampering | `DELETE /api/orders/:id/cancel` instead of `PUT` | `404` / `405` |
| **TC-CANCEL-023** | Domain Partitioning | Equivalence Partitioning (Negative) | Non-existent high integer ID (`999999`) | `404 Not Found` |
| **TC-CANCEL-024** | Domain Partitioning | Type Violation (Negative) | Alphabetic string ID (`abc`) | `404 Not Found` |
| **TC-CANCEL-025** | Domain Partitioning | Type Violation (Negative) | Alphanumeric string ID (`order_123`) | `404 Not Found` |
| **TC-CANCEL-026** | Domain Partitioning | Type Violation (Negative) | Floating-point decimal ID (`1.5`) | `404 Not Found` |
| **TC-CANCEL-027** | Domain Partitioning | Boundary Value Analysis | Negative integer ID (`-1`) | `404 Not Found` |
| **TC-CANCEL-028** | Domain Partitioning | Boundary Value Analysis | Zero integer ID (`0`) | `404 Not Found` |
| **TC-CANCEL-029** | Domain Partitioning | Boundary Value Analysis | Extreme negative integer ID (`-999999999`) | `404 Not Found` |
| **TC-CANCEL-030** | Domain Partitioning | Special Characters | Special characters and symbols (`!@#$%^&*()`) in `:id` | `404 Not Found` |
| **TC-CANCEL-031** | Boundary Analysis | Extreme Integer Boundary | 64-bit integer max (`9223372036854775807`) in `:id` | `404 Not Found` |
| **TC-CANCEL-032** | Boundary Analysis | Extreme Integer Boundary | 32-bit integer max (`2147483647`) in `:id` | `404 Not Found` |
| **TC-CANCEL-033** | Boundary Analysis | Buffer / Payload Boundary | Oversized URL string (>1000 characters) in `:id` | `404` / `414` |
| **TC-CANCEL-034** | Boundary Analysis | Path Traversal Boundary | Directory traversal sequence (`../../orders/1/cancel`) | `404 Not Found` |
| **TC-CANCEL-035** | Boundary Analysis | Sanitization / Null Byte | Null byte injection (`1%00cancel`) in `:id` | `404` / `400` |
| **TC-CANCEL-036** | Contract Testing | JSON Schema Validation | Strict Schema verification of `200 OK` success body | `200 OK` Schema Match |
| **TC-CANCEL-037** | Contract Testing | JSON Schema Validation | Strict Schema verification of `400 Bad Request` error body | `400` Schema Match |
| **TC-CANCEL-038** | Contract Testing | JSON Schema Validation | Strict Schema verification of `404 Not Found` error body | `404` Schema Match |
| **TC-CANCEL-039** | Contract Testing | Header Verification | Response header `Content-Type: application/json; charset=utf-8` | Headers Match |
| **TC-CANCEL-040** | Audit & Traceability | Mandatory Header Validation | Request with mandatory `X-Student-Id: 23127148` header | `200 OK` Header Logged |

---

## 3. Directory Layout

The generated artifacts are organized as follows:

```
HW6/
├── Test/
│   └── OrderCancel/
│       ├── test-cases/
│       │   ├── TC-CANCEL-001.md ... TC-CANCEL-040.md   # Individual executable test case specs
│       ├── coverage-matrix.md                          # Traceability and dimension coverage matrix
│       ├── audit-checklist.md                          # FIT@HCMUS AI-02 validation and audit checklist
│       ├── order-cancel-data-driven.json               # Data-driven test vectors for Collection Runner
│       ├── OrderCancel.postman_collection.json         # Postman v2.1 Collection
│       └── OrderCancel_Master_Document.md              # Full master documentation
└── Postman/
    ├── OrderCancel.postman_collection.json             # Runner collection
    └── eshop.postman_environment.json                  # Shared Postman environment config
```
