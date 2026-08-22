# Master Test Suite Specification: POST /api/forgot-password (FR-03)

**Document Identifier:** TS-EShop-API-FR03-FORGOT-PASSWORD  
**Standard Compliance:** ISTQB Certified Tester Advanced / OWASP API Security Top 10 (2023) / RFC 5321 & RFC 5322  
**Target API:** `POST /api/forgot-password` (FR-03: Password Reset / OTP Generation)  
**Base URL:** `http://localhost:3000`  
**Authentication:** Public (No Token Required)  
**Student ID:** `23127148` (Mandatory Request Header `X-Student-Id`)  
**Total Test Cases:** 40 Executable Cases  

---

## 1. Executive Summary & Test Strategy

This document specifies the comprehensive automated API test suite for the `POST /api/forgot-password` endpoint of the EShop SUT. The test cases systematically cover four critical quality and risk dimensions:

1. **Domain Partitioning (EP & BVA):** Equivalence partitions for registered, non-existent, malformed, extreme data types, boundary length limits (1 to >1000 chars), and whitespace/unicode variations.
2. **Security Testing (OWASP & SEC-01 to SEC-07):** Verification of User Enumeration (CWE-203), Sensitive Data Exposure (CWE-200), Weak PRNG/OTP entropy (CWE-330), Rate Limiting / DoS, SQL Injection, XSS injection, Mass Assignment, and Content-Type tampering.
3. **Schema & Status Code Validation:** Strict JSON Schema contract testing for both success (200 OK) and error (400, 404, 422, 500) payloads, header validation, and Content-Type enforcement.
4. **State Transitions & Chained Lifecycle:** Verification of token invalidation and end-to-end chaining with the `POST /api/reset-password` endpoint.

---

## 2. Test Case Summary Table

| Test Case ID | Test Category | Test Technique | Input Description | Expected Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-FORGOT-001** | Happy Path | Equivalence Partitioning (Valid) | Registered standard user (`test@eshop.com`) | `200 OK` |
| **TC-FORGOT-002** | Happy Path | Equivalence Partitioning (Valid) | Registered admin user (`admin@eshop.com`) | `200 OK` |
| **TC-FORGOT-003** | Domain Partitioning | Equivalence Partitioning (Valid) | Email with plus sign tag (`test+reset@eshop.com`) | `200` / `404` |
| **TC-FORGOT-004** | Domain Partitioning | Equivalence Partitioning (Valid) | Email with dot in local-part (`test.user@eshop.com`) | `200` / `404` |
| **TC-FORGOT-005** | Domain Partitioning | Equivalence Partitioning (Valid) | Email with subdomain (`user@mail.eshop.com`) | `200` / `404` |
| **TC-FORGOT-006** | Domain Partitioning | Equivalence Partitioning (Negative) | Non-existent / unregistered email (`unregistered_999@eshop.com`) | `404 Not Found` |
| **TC-FORGOT-007** | Domain Partitioning | Syntax Violation (Negative) | Missing `@` symbol (`testeshop.com`) | `400 Bad Request` |
| **TC-FORGOT-008** | Domain Partitioning | Syntax Violation (Negative) | Missing domain part (`test@`) | `400 Bad Request` |
| **TC-FORGOT-009** | Domain Partitioning | Syntax Violation (Negative) | Missing local part (`@eshop.com`) | `400 Bad Request` |
| **TC-FORGOT-010** | Domain Partitioning | Syntax Violation (Negative) | Missing top-level domain (`test@eshop`) | `400 Bad Request` |
| **TC-FORGOT-011** | Domain Partitioning | Syntax Violation (Negative) | Multiple `@` characters (`test@@eshop.com`) | `400 Bad Request` |
| **TC-FORGOT-012** | Domain Partitioning | Syntax Violation (Negative) | Embedded space (`test @eshop.com`) | `400 Bad Request` |
| **TC-FORGOT-013** | Domain Partitioning | Syntax Violation (Negative) | Special character in domain (`test@es#hop.com`) | `400 Bad Request` |
| **TC-FORGOT-014** | Extreme Input | Type & Presence (Negative) | Empty string email (`""`) | `400 Bad Request` |
| **TC-FORGOT-015** | Extreme Input | Type & Presence (Negative) | Explicit `null` value (`null`) | `400 Bad Request` |
| **TC-FORGOT-016** | Extreme Input | Type & Presence (Negative) | Missing `email` property (`{}`) | `400 Bad Request` |
| **TC-FORGOT-017** | Extreme Input | Type Violation (Negative) | Integer data type (`123456`) | `400 Bad Request` |
| **TC-FORGOT-018** | Extreme Input | Type Violation (Negative) | Boolean data type (`true`) | `400 Bad Request` |
| **TC-FORGOT-019** | Extreme Input | Type Violation (Negative) | Array data type (`["test@eshop.com"]`) | `400 Bad Request` |
| **TC-FORGOT-020** | Extreme Input | Type Violation (Negative) | Nested Object data type (`{"address":"test@eshop.com"}`) | `400 Bad Request` |
| **TC-FORGOT-021** | Boundary Analysis | Boundary Value Analysis | Minimum RFC length email (`a@b.co`) | `200` / `404` / `400` |
| **TC-FORGOT-022** | Boundary Analysis | Boundary Value Analysis | Maximum 254-character RFC 5321 email | `200` / `404` |
| **TC-FORGOT-023** | Boundary Analysis | Buffer / Payload Boundary | Oversized >1000 characters string | `400` / `413` |
| **TC-FORGOT-024** | Domain Partitioning | Whitespace Handling | Leading and trailing spaces (`" test@eshop.com "`) | `200` (Trimmed) / `400` |
| **TC-FORGOT-025** | Domain Partitioning | Internationalization | Non-ASCII / Vietnamese Unicode diacritics | `400` / `200` (Punycode) |
| **TC-FORGOT-026** | Security (OWASP) | User Enumeration (CWE-203) | Side-channel discrepancy analysis (200 vs 404 leakage) | `200` (Masked) / `404` |
| **TC-FORGOT-027** | Security (OWASP) | Sensitive Data Exposure (CWE-200) | Leakage of `resetToken` in HTTP response body | Inspect Token Leak |
| **TC-FORGOT-028** | Security (OWASP) | Weak PRNG & RNG (CWE-330) | Low-entropy 4-digit token predictability check | Validate RNG entropy |
| **TC-FORGOT-029** | Security (OWASP) | Rate Limiting / Anti-DoS | Rapid burst of 10 requests (Flooding/Spamming) | `429 Too Many Requests` |
| **TC-FORGOT-030** | Security (SEC-05) | SQLi - Boolean / Tautology | Injection `' OR '1'='1` in email field | `400` / `404` (No 500) |
| **TC-FORGOT-031** | Security (SEC-05) | SQLi - Stacked / Destructive | Injection `admin@eshop.com'; DROP TABLE users;--` | `400` / `404` (No 500) |
| **TC-FORGOT-032** | Security (SEC-06) | XSS Injection | Payload `<script>alert('xss')</script>@eshop.com` | `400` / Sanitized |
| **TC-FORGOT-033** | Security (SEC-07) | Mass Assignment | Injected fields (`role`, `resetToken`, `password`) | Extra fields ignored |
| **TC-FORGOT-034** | Security / Protocol | Content-Type Tampering | `application/x-www-form-urlencoded` header | `415` / `400` |
| **TC-FORGOT-035** | Security / Protocol | Content-Type Tampering | `text/plain` payload / Missing header | `415` / `400` |
| **TC-FORGOT-036** | Schema Validation | Malformed JSON Syntax | Unclosed curly brace / Invalid JSON syntax | `400 Bad Request` |
| **TC-FORGOT-037** | Contract Testing | JSON Schema Validation | Strict Schema verification of `200 OK` body | `200 OK` Schema Match |
| **TC-FORGOT-038** | Contract Testing | Error Schema & Security Headers | Strict Schema verification of Error response & headers | `4xx` Schema Match |
| **TC-FORGOT-039** | State Transition | State Machine & Token Lifecycle | E2E Forgot-Password -> Reset-Password execution | Token Verification |
| **TC-FORGOT-040** | Audit & Traceability | Mandatory Header Validation | Request with mandatory `X-Student-Id: 23127148` | `200 OK` Header Logged |

---

## 3. Directory Layout

The generated artifacts are organized as follows:

```
HW6/
├── Test/
│   └── ForgotPassword/
│       ├── TC-FORGOT-001.md ... TC-FORGOT-040.md   # Individual executable test case specs
│       ├── coverage-matrix.md                      # Traceability and dimension coverage matrix
│       ├── audit-checklist.md                      # FIT@HCMUS AI-02 validation and audit checklist
│       ├── forgot-password-data-driven.json        # Data-driven test vectors
│       ├── ForgotPassword.postman_collection.json  # Postman v2.1 Collection
│       └── ForgotPassword_Master_Document.md       # Full master documentation
└── Postman/
    ├── ForgotPassword.postman_collection.json      # Direct runner collection
    └── eshop.postman_environment.json              # Postman environment config
```
