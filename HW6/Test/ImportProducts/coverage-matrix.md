# Test Coverage & Traceability Matrix: POST /api/admin/import-products (FR-16)

**Document Identifier:** CM-EShop-API-FR16  
**Target API:** `POST /api/admin/import-products`  
**Student ID:** `23127148`  
**Total Test Cases:** 40  

---

## 1. Traceability Matrix by Testing Dimension

### Dimension 1: Broken Function Level Authorization & Security (BFLA & OWASP API Top 10)

| Test Case ID | Sub-Category | Vulnerability / Control Code | Target Field / Parameter | Expected Status |
| :--- | :--- | :--- | :--- | :--- |
| `TC-IMPORT-001` | Broken Function Level Auth | OWASP API5:2023 / SEC-03 | Request Endpoint Authorization (`user` token) | `403 Forbidden` |
| `TC-IMPORT-002` | Authentication Bypass | OWASP API2:2023 / SEC-02 | Missing `Authorization` header | `401 Unauthorized` |
| `TC-IMPORT-003` | Broken Authentication | OWASP API2:2023 / SEC-02 | Empty Bearer token (`Bearer `) | `401` / `403` |
| `TC-IMPORT-004` | Broken Authentication | OWASP API2:2023 / SEC-02 | Malformed JWT string | `403 Forbidden` |
| `TC-IMPORT-005` | Broken Authentication | OWASP API2:2023 / SEC-02 | Expired JWT token | `403 Forbidden` |
| `TC-IMPORT-006` | Broken Authentication | OWASP API2:2023 / SEC-02 | Invalid secret signature | `403 Forbidden` |
| `TC-IMPORT-007` | Cross-Site Scripting (XSS) | OWASP API3:2023 / SEC-06 | Product item `name` (`<script>`) | `200 OK` (Neutralized) |
| `TC-IMPORT-008` | Cross-Site Scripting (XSS) | OWASP API3:2023 / SEC-06 | Product item `description` (`<img onerror>`) | `200 OK` (Neutralized) |
| `TC-IMPORT-009` | Malicious URI / XSS | OWASP API3:2023 / SEC-06 | Product item `imageUrl` (`javascript:`) | `200 OK` (Neutralized) |
| `TC-IMPORT-010` | SQL Injection (SQLi) | OWASP API3:2023 / SEC-05 | Product item `name` (`' OR '1'='1`) | `200 OK` (No 500) |
| `TC-IMPORT-011` | SQL Injection (SQLi) | OWASP API3:2023 / SEC-05 | Product item `description` (`'; DROP TABLE`) | `200 OK` (No 500) |
| `TC-IMPORT-012` | SQL Injection (SQLi) | OWASP API3:2023 / SEC-05 | Product item `category_id` (`UNION SELECT`) | Handled safely |
| `TC-IMPORT-013` | SSRF Probing | OWASP API7:2023 / SSRF | Product item `imageUrl` (`127.0.0.1:3000`) | `200 OK` (No SSRF) |
| `TC-IMPORT-014` | SSRF Probing | OWASP API7:2023 / SSRF | Product item `imageUrl` (`169.254.169.254`) | `200 OK` (No SSRF) |
| `TC-IMPORT-015` | Mass Assignment | OWASP API6:2023 / SEC-07 | Payload injection (`id`, `role`, `is_admin`) | Injected fields ignored |

---

### Dimension 2: Domain Partitioning (Equivalence Partitioning & Boundary Value Analysis)

| Test Case ID | Partition / Boundary | Input Condition | Expected Status | Response Assertion |
| :--- | :--- | :--- | :--- | :--- |
| `TC-IMPORT-016` | Valid Single Product (Happy Path) | 1 valid product item | `200 OK` | `inserted: 1`, `errors: []` |
| `TC-IMPORT-017` | Valid Multi-Product Batch | 5 valid product items | `200 OK` | `inserted: 5`, `errors: []` |
| `TC-IMPORT-018` | Empty Array Boundary | `{"products": []}` | `400 Bad Request` | `error: "Không có dữ liệu để import"` |
| `TC-IMPORT-019` | Missing Root Property | `{}` | `400 Bad Request` | `error: "Không có dữ liệu để import"` |
| `TC-IMPORT-020` | Null Root Property | `{"products": null}` | `400 Bad Request` | `error: "Không có dữ liệu để import"` |
| `TC-IMPORT-021` | Type Violation (String) | `{"products": "SP 1, 10000"}` | `400 Bad Request` | `error: "Không có dữ liệu để import"` |
| `TC-IMPORT-022` | Type Violation (Number) | `{"products": 12345}` | `400 Bad Request` | `error: "Không có dữ liệu để import"` |
| `TC-IMPORT-023` | Type Violation (Object) | `{"products": {"name": "SP 1"}}` | `400 Bad Request` | `error: "Không có dữ liệu để import"` |
| `TC-IMPORT-024` | Missing Mandatory Field | `{"price": 10000}` (missing `name`) | `200 OK` | `inserted: 0`, `errors.length >= 1` |
| `TC-IMPORT-025` | Missing Optional Field | Missing `description` | `200 OK` | Fallback to `""` |
| `TC-IMPORT-026` | Missing Optional Field | Missing `imageUrl` | `200 OK` | Fallback to `""` |
| `TC-IMPORT-027` | Missing Optional Field | Missing `category_id` | `200 OK` | Fallback to `1` |
| `TC-IMPORT-028` | Boundary: Price Zero | `price: 0` | `200 OK` | `inserted: 1` |
| `TC-IMPORT-029` | Boundary: Negative Price | `price: -50000` | `200 OK` / Check | SUT price handling |
| `TC-IMPORT-030` | Boundary: Float / Decimal | `price: 199.99` | `200 OK` | `inserted: 1` |
| `TC-IMPORT-031` | Type Coercion: String Price | `price: "50000"` | `200 OK` | `inserted: 1` |
| `TC-IMPORT-032` | Boundary: 32-bit Integer Max | `price: 2147483647` | `200 OK` | `inserted: 1` |
| `TC-IMPORT-033` | Foreign Key Boundary | `category_id: 99999` | Handled safely | No 500 unhandled crash |
| `TC-IMPORT-034` | Extreme Batch Stress | Array of 50 items | `200 OK` | `inserted: 50` |
| `TC-IMPORT-035` | Buffer Boundary | Length > 1000 chars | Handled safely | No buffer overflow |

---

### Dimension 3: Data Integrity, Concurrency & Protocol

| Test Case ID | Test Focus | Description | Expected Status | Integrity Verification |
| :--- | :--- | :--- | :--- | :--- |
| `TC-IMPORT-036` | Partial Failure Atomicity | Batch with 2 valid + 2 invalid items | `200 OK` | `inserted: 2`, `errors.length: 2` |
| `TC-IMPORT-037` | Persistence & Duplicate Handling | Import items -> `GET /api/products` | `200 OK` | Record persisted in database |
| `TC-IMPORT-038` | HTTP Method Tampering | `GET` / `PUT` on import route | `404` / `405` | Method rejected |
| `TC-IMPORT-041` | Transaction Atomicity & Rollback Absence | Batch with mid-stream failure, check rollback | `200 OK` | Non-atomic partial commit |
| `TC-IMPORT-042` | CSV Formula Injection (CWE-1236) | Product fields containing `=cmd`, `@SUM`, `+cmd` | Handled / Escaped | Formula execution prevented |

---

### Dimension 4: Contract & Traceability

| Test Case ID | Test Focus | Description | Expected Status | Contract Standard |
| :--- | :--- | :--- | :--- | :--- |
| `TC-IMPORT-039` | JSON Schema Validation | Strict schema match for 200 OK & 400 Bad Request | Schema Valid | Draft-07 JSON Schema |
| `TC-IMPORT-040` | Academic Traceability | Transmission of `X-Student-Id: 23127148` | `200 OK` | Header verified & logged |

---

## 2. Requirement Coverage Summary

| Dimension | Total Cases | Target Test Case IDs | Percentage |
| :--- | :---: | :--- | :---: |
| Security & BFLA (SEC-02/03/05/06/07 & CWE-1236) | 16 | `TC-IMPORT-001` - `TC-IMPORT-015`, `TC-IMPORT-042` | 38.1% |
| Domain Partitioning & Boundaries | 20 | `TC-IMPORT-016` - `TC-IMPORT-035` | 47.6% |
| Data Integrity, Concurrency & Transactions | 4 | `TC-IMPORT-036` - `TC-IMPORT-038`, `TC-IMPORT-041` | 9.5% |
| Contract & Traceability | 2 | `TC-IMPORT-039` - `TC-IMPORT-040` | 4.8% |
| **Total** | **42** | `TC-IMPORT-001` - `TC-IMPORT-042` | **100%** |

