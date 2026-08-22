# Master Test Suite Specification: POST /api/admin/import-products (FR-16)

**Document Identifier:** TS-EShop-API-FR16-IMPORT-PRODUCTS  
**Standard Compliance:** ISTQB Certified Tester Advanced / OWASP API Security Top 10 (2023) / RFC 7231 & RFC 8259  
**Target API:** `POST /api/admin/import-products` (FR-16: Product Import from CSV as JSON Array)  
**Base URL:** `http://localhost:3000`  
**Authentication:** Bearer JWT Token (`Authorization: Bearer <token>`, Expected Role: `admin`)  
**Student ID:** `23127148` (Mandatory Request Header `X-Student-Id`)  
**Total Test Cases:** 40 Executable Cases  

---

## 1. Executive Summary & Test Strategy

This document specifies the comprehensive automated API test suite for the `POST /api/admin/import-products` endpoint of the EShop SUT. The test suite systematically evaluates four core quality and security dimensions:

1. **Broken Function Level Authorization & Security (BFLA & OWASP API Top 10 - SEC-02 & SEC-03):** 
   - Strict privilege separation and role escalation verification (Standard user `role: 'user'` invoking admin import endpoint, catching the critical defect in `server.js:199` where `req.user.role === 'admin'` check is omitted).
   - Authentication bypass and broken authentication with missing, empty, malformed, expired, and signature-tampered JWT tokens (SEC-02).
   - Stored Cross-Site Scripting (XSS - SEC-06) injection in `name`, `description`, and `imageUrl`.
   - SQL Injection (SEC-05) resilience across batch items.
   - SSRF / Malicious URI probing targeting loopback and cloud metadata endpoints in `imageUrl`.
   - Mass Assignment (SEC-07) payload pollution.

2. **Domain Partitioning (Equivalence Partitioning & Boundary Value Analysis):**
   - Single item import, multi-item batch import (5+ items), and large batch stress testing (50 items).
   - Empty array `[]`, missing `products` root key, null `products`, and non-array invalid types (string, number, object).
   - Missing mandatory `name` field vs. missing optional fields (`description`, `imageUrl`, `category_id` fallback defaults).
   - Boundary value analysis on `price` (0, negative -50000, decimal 199.99, string numeric "50000", max 32-bit integer 2147483647).
   - Foreign key boundary on `category_id` (non-existent category ID 99999).
   - Oversized text fields (>1000 characters).

3. **Data Integrity, Concurrency & Protocol Tampering:**
   - Partial failure atomicity (batch containing both valid and invalid items).
   - Duplicate product names within the same batch.
   - End-to-end data persistence verification (`POST /api/admin/import-products` -> `GET /api/products`).
   - HTTP method tampering (`GET`, `PUT` to `POST` endpoint).

4. **Schema & Contract Validation:**
   - Strict JSON Schema assertions for `200 OK` response (`message`, `inserted`, `errors`).
   - Strict JSON Schema assertions for `400 Bad Request` response (`error`).
   - Traceability header verification (`X-Student-Id: 23127148`).

---

## 2. Test Case Summary Table

| Test Case ID | Test Category | Test Technique | Input Description | Expected Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-IMPORT-001** | Security (SEC-03 / BFLA) | Role Escalation (Privilege Separation) | Standard user (`role: 'user'`) calls admin import endpoint | `403 Forbidden` (Catches SUT line 199 defect) |
| **TC-IMPORT-002** | Security (SEC-02) | Missing Authentication | Request without `Authorization` header | `401 Unauthorized` |
| **TC-IMPORT-003** | Security (SEC-02) | Empty Authorization Header | Header `Authorization: Bearer ` (Empty token) | `401` / `403` |
| **TC-IMPORT-004** | Security (SEC-02) | Malformed JWT Token | Header `Authorization: Bearer invalid.jwt.string` | `403 Forbidden` |
| **TC-IMPORT-005** | Security (SEC-02) | Expired JWT Token | Header `Authorization: Bearer <expired_jwt>` | `403 Forbidden` |
| **TC-IMPORT-006** | Security (SEC-02) | Tampered JWT Signature | JWT signed with unauthorized secret key | `403 Forbidden` |
| **TC-IMPORT-007** | Security (SEC-06 / XSS) | Stored XSS Payload in Name | `{"name": "<script>alert('xss')</script>", "price": 10000}` | `200 OK` (Sanitized/Handled safely) |
| **TC-IMPORT-008** | Security (SEC-06 / XSS) | Stored XSS Payload in Description | `{"description": "<img src=x onerror=alert(1)>"}` | `200 OK` (Sanitized/Handled safely) |
| **TC-IMPORT-009** | Security (SEC-06 / XSS) | Malicious URI Scheme in ImageUrl | `{"imageUrl": "javascript:alert(document.cookie)"}` | `200 OK` (Sanitized/Handled safely) |
| **TC-IMPORT-010** | Security (SEC-05 / SQLi) | SQLi Tautology in Name | `{"name": "SP 1' OR '1'='1", "price": 10000}` | `200 OK` (No 500 / Sanitized) |
| **TC-IMPORT-011** | Security (SEC-05 / SQLi) | SQLi Stacked Query in Description | `{"description": "Desc'; DROP TABLE products;--"}` | `200 OK` (No 500 / No Data Loss) |
| **TC-IMPORT-012** | Security (SEC-05 / SQLi) | SQLi Union in Category ID String | `{"category_id": "1 UNION SELECT 1,2,3,4,5"}` | Handled safely (No 500) |
| **TC-IMPORT-013** | Security (SSRF Probe) | Internal Loopback in ImageUrl | `{"imageUrl": "http://127.0.0.1:3000/api/users/me"}` | `200 OK` (No internal fetch trigger) |
| **TC-IMPORT-014** | Security (SSRF Probe) | Cloud Metadata IP in ImageUrl | `{"imageUrl": "http://169.254.169.254/latest/meta-data/"}` | `200 OK` (No internal fetch trigger) |
| **TC-IMPORT-015** | Security (SEC-07) | Mass Assignment Body Pollution | Extra fields: `{"id": 9999, "role": "admin", "is_admin": 1}` | Injected fields ignored safely |
| **TC-IMPORT-016** | Domain Partitioning | Equivalence Partitioning (Happy Path) | Valid single product import with all fields | `200 OK` (`inserted: 1`) |
| **TC-IMPORT-017** | Domain Partitioning | Equivalence Partitioning (Valid Batch) | Valid multi-product batch (5 products) | `200 OK` (`inserted: 5`) |
| **TC-IMPORT-018** | Domain Partitioning | Boundary Value Analysis | Empty array `{"products": []}` | `400 Bad Request` |
| **TC-IMPORT-019** | Domain Partitioning | Equivalence Partitioning (Negative) | Missing `products` root key `{}` | `400 Bad Request` |
| **TC-IMPORT-020** | Domain Partitioning | Equivalence Partitioning (Negative) | Null `products` value `{"products": null}` | `400 Bad Request` |
| **TC-IMPORT-021** | Domain Partitioning | Type Violation (Negative) | String value `{"products": "SP 1, 10000"}` | `400 Bad Request` |
| **TC-IMPORT-022** | Domain Partitioning | Type Violation (Negative) | Number value `{"products": 12345}` | `400 Bad Request` |
| **TC-IMPORT-023** | Domain Partitioning | Type Violation (Negative) | Object value `{"products": {"name": "SP 1"}}` | `400 Bad Request` |
| **TC-IMPORT-024** | Domain Partitioning | Missing Mandatory Field | Item missing `name` field `{"price": 10000}` | `200 OK` (`inserted: 0`, `errors: [...]`) |
| **TC-IMPORT-025** | Domain Partitioning | Missing Optional Field | Item missing `description` field | `200 OK` (Default `""`) |
| **TC-IMPORT-026** | Domain Partitioning | Missing Optional Field | Item missing `imageUrl` field | `200 OK` (Default `""`) |
| **TC-IMPORT-027** | Domain Partitioning | Missing Optional Field | Item missing `category_id` field | `200 OK` (Default `1`) |
| **TC-IMPORT-028** | Domain Partitioning | Boundary Value Analysis | Price boundary: Zero price (`price: 0`) | `200 OK` (`inserted: 1`) |
| **TC-IMPORT-029** | Domain Partitioning | Boundary Value Analysis | Price boundary: Negative price (`price: -50000`) | Validation / Insertion Check |
| **TC-IMPORT-030** | Domain Partitioning | Boundary Value Analysis | Price boundary: Floating-point price (`price: 199.99`) | `200 OK` (`inserted: 1`) |
| **TC-IMPORT-031** | Domain Partitioning | Type Conversion Boundary | Price boundary: Numeric string price (`price: "50000"`) | `200 OK` (`inserted: 1`) |
| **TC-IMPORT-032** | Domain Partitioning | Extreme Boundary | Maximum 32-bit integer price (`price: 2147483647`) | `200 OK` (`inserted: 1`) |
| **TC-IMPORT-033** | Domain Partitioning | Foreign Key Boundary | Non-existent category ID (`category_id: 99999`) | Handled without 500 error |
| **TC-IMPORT-034** | Domain Partitioning | Extreme Batch Stress | Large batch import with 50 products | `200 OK` (`inserted: 50`) |
| **TC-IMPORT-035** | Boundary Analysis | Buffer Boundary | Oversized string values (>1000 chars in `name`/`description`) | Handled safely |
| **TC-IMPORT-036** | Data Integrity | Partial Failure Atomicity | Mixed batch: 2 valid items and 2 items missing `name` | `200 OK` (`inserted: 2`, `errors: 2`) |
| **TC-IMPORT-037** | Data Integrity | Duplicate Handling & Persistence | Duplicate product names imported -> Query `GET /api/products` | `200 OK` (Persisted) |
| **TC-IMPORT-038** | Protocol Testing | HTTP Method Tampering | `GET` / `PUT` against `/api/admin/import-products` | `404 Not Found` / `405` |
| **TC-IMPORT-039** | Contract Testing | JSON Schema Strict Validation | Strict Draft-07 validation of 200 OK & 400 Bad Request | JSON Schema Match |
| **TC-IMPORT-040** | Audit & Traceability | Mandatory Header Validation | Request with mandatory `X-Student-Id: 23127148` header | `200 OK` Header Logged |

---

## 3. Directory Layout

The generated artifacts are organized as follows:

```
HW6/
├── Test/
│   └── ImportProducts/
│       ├── test-cases/
│       │   ├── TC-IMPORT-001.md ... TC-IMPORT-040.md   # Individual executable test case specs
│       ├── coverage-matrix.md                          # Traceability and dimension coverage matrix
│       ├── audit-checklist.md                          # FIT@HCMUS AI-02 validation and audit checklist
│       ├── import-products-data-driven.json            # Data-driven test vectors for Collection Runner
│       ├── ImportProducts.postman_collection.json      # Postman v2.1 Collection
│       └── ImportProducts_Master_Document.md           # Full master documentation
└── Postman/
    ├── ImportProducts.postman_collection.json          # Runner collection
    └── eshop.postman_environment.json                  # Shared Postman environment config
```
