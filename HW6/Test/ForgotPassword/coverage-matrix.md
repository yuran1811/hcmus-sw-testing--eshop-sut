# Test Coverage Matrix: POST /api/forgot-password (FR-03)

**API Endpoint:** `POST /api/forgot-password`  
**SUT:** EShop Backend (`http://localhost:3000`)  
**Student ID:** `23127148`  
**Total Test Cases:** 45  

---

## 1. Coverage by Quality Dimension

| Coverage Dimension | Count | Target Ratio | Status |
| :--- | :---: | :---: | :---: |
| **1. Domain Partitioning (EP & BVA)** | 26 | ≥ 15 | ✅ Met (26 cases) |
| **2. Security Testing (OWASP / SEC-01 to SEC-07)** | 13 | ≥ 10 | ✅ Met (13 cases) |
| **3. Schema & Status Code Validation** | 2 | ≥ 2 | ✅ Met (2 cases) |
| **4. State Transition & Traceability** | 4 | ≥ 2 | ✅ Met (4 cases) |
| **Total** | **45** | **≥ 35** | **✅ 128.6% of Target** |

---

## 2. Detailed Test Case Traceability Matrix

| Test Case ID | Test Name | Dimension | Technique | Requirement / Standard | Expected Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| `TC-FORGOT-001` | Valid registered standard email | Domain Partitioning | Equivalence Partitioning | FR-03 / Happy Path | `200 OK` |
| `TC-FORGOT-002` | Valid registered admin email | Domain Partitioning | Equivalence Partitioning | FR-03 / Happy Path | `200 OK` |
| `TC-FORGOT-003` | Valid email with plus addressing | Domain Partitioning | Equivalence Partitioning | RFC 5322 | `200` / `404` |
| `TC-FORGOT-004` | Valid email with dot in local-part | Domain Partitioning | Equivalence Partitioning | RFC 5322 | `200` / `404` |
| `TC-FORGOT-005` | Valid email with subdomain | Domain Partitioning | Equivalence Partitioning | RFC 5322 | `200` / `404` |
| `TC-FORGOT-006` | Non-existent / unregistered email | Domain Partitioning | Equivalence Partitioning | FR-03 / Error Path | `404 Not Found` |
| `TC-FORGOT-007` | Invalid syntax - Missing `@` symbol | Domain Partitioning | Syntax Equivalence Class | RFC 5322 / Negative | `400 Bad Request` |
| `TC-FORGOT-008` | Invalid syntax - Missing domain | Domain Partitioning | Syntax Equivalence Class | RFC 5322 / Negative | `400 Bad Request` |
| `TC-FORGOT-009` | Invalid syntax - Missing local-part | Domain Partitioning | Syntax Equivalence Class | RFC 5322 / Negative | `400 Bad Request` |
| `TC-FORGOT-010` | Invalid syntax - Missing TLD | Domain Partitioning | Syntax Equivalence Class | RFC 5322 / Negative | `400 Bad Request` |
| `TC-FORGOT-011` | Invalid syntax - Multiple `@` symbols | Domain Partitioning | Syntax Equivalence Class | RFC 5322 / Negative | `400 Bad Request` |
| `TC-FORGOT-012` | Invalid syntax - Space inside email | Domain Partitioning | Syntax Equivalence Class | RFC 5322 / Negative | `400 Bad Request` |
| `TC-FORGOT-013` | Invalid syntax - Special char in domain | Domain Partitioning | Syntax Equivalence Class | RFC 5322 / Negative | `400 Bad Request` |
| `TC-FORGOT-014` | Extreme input - Empty string | Domain Partitioning | Boundary Value Analysis | Data Integrity / Negative | `400 Bad Request` |
| `TC-FORGOT-015` | Extreme input - Explicit null value | Domain Partitioning | Type & Nullability | Data Integrity / Negative | `400 Bad Request` |
| `TC-FORGOT-016` | Extreme input - Missing email key | Domain Partitioning | Field Presence Validation | Data Integrity / Negative | `400 Bad Request` |
| `TC-FORGOT-017` | Extreme input - Integer data type | Domain Partitioning | Type Validation | JSON Schema / Negative | `400 Bad Request` |
| `TC-FORGOT-018` | Extreme input - Boolean data type | Domain Partitioning | Type Validation | JSON Schema / Negative | `400 Bad Request` |
| `TC-FORGOT-019` | Extreme input - Array data type | Domain Partitioning | Type Validation | JSON Schema / Negative | `400 Bad Request` |
| `TC-FORGOT-020` | Extreme input - Nested Object type | Domain Partitioning | Type Validation | JSON Schema / Negative | `400 Bad Request` |
| `TC-FORGOT-021` | Boundary Length - Minimum RFC valid length | Domain Partitioning | Boundary Value Analysis | RFC 5321 (Min Length) | `200` / `404` / `400` |
| `TC-FORGOT-022` | Boundary Length - Exact 254 RFC limit | Domain Partitioning | Boundary Value Analysis | RFC 5321 (Max Length) | `200` / `404` |
| `TC-FORGOT-023` | Boundary Length - Oversized string (>1000) | Domain Partitioning | Buffer / Stress Boundary | Denial of Service / BVA | `400` / `413` |
| `TC-FORGOT-024` | Whitespace handling - Leading/trailing spaces | Domain Partitioning | Sanitization & Trimming | Input Sanitization | `200` / `400` |
| `TC-FORGOT-025` | Unicode / Diacritics in email | Domain Partitioning | Internationalization | IDN / RFC 6530 | `400` / `200` |
| `TC-FORGOT-026` | User Enumeration discrepancy | Security Testing | OWASP API3:2023 | CWE-203 | `200` (Masked) / `404` |
| `TC-FORGOT-027` | Cleartext OTP token leakage in response | Security Testing | OWASP API3:2023 | CWE-200 / CWE-359 | Token Leakage Check |
| `TC-FORGOT-028` | Low entropy 4-digit OTP RNG | Security Testing | OWASP API2:2023 | CWE-330 | Entropy Check |
| `TC-FORGOT-029` | Rate Limiting / Flooding DoS | Security Testing | OWASP API4:2023 | CWE-799 / Rate Limit | `429 Too Many Requests` |
| `TC-FORGOT-030` | SQL Injection - Boolean Tautology | Security Testing | SEC-05 / Injection | CWE-89 | `400` / `404` (No 500) |
| `TC-FORGOT-031` | SQL Injection - Stacked Query DROP | Security Testing | SEC-05 / Injection | CWE-89 | `400` / `404` (No 500) |
| `TC-FORGOT-032` | XSS Injection in email payload | Security Testing | SEC-06 / Cross-Site Scripting | CWE-79 | `400` / Sanitized |
| `TC-FORGOT-033` | Mass Assignment / Injected fields | Security Testing | SEC-07 / Mass Assignment | OWASP API6:2023 | Extra fields ignored |
| `TC-FORGOT-034` | Content-Type tampering - Form URL Encoded | Security Testing | Protocol Tampering | RFC 7231 | `415` / `400` |
| `TC-FORGOT-035` | Content-Type tampering - Plain text | Security Testing | Protocol Tampering | RFC 7231 | `415` / `400` |
| `TC-FORGOT-036` | Malformed JSON Syntax | Schema Validation | Syntax Parsing | RFC 8259 | `400 Bad Request` |
| `TC-FORGOT-037` | Contract - 200 OK JSON Schema | Schema Validation | JSON Schema (Draft-07) | Contract Testing | `200 OK` Schema Match |
| `TC-FORGOT-038` | Contract - Error JSON Schema & Headers | Schema Validation | JSON Schema (Draft-07) | Contract Testing | `4xx` Schema Match |
| `TC-FORGOT-039` | State Transition - OTP Token Lifecycle | State Transition | State Machine Testing | FR-03 -> FR-04 Lifecycle | Valid Transition |
| `TC-FORGOT-040` | Audit - Mandatory `X-Student-Id` header | Traceability | Audit Compliance | HW06 §6.1 Requirement | `200 OK` Header Logged |
| `TC-FORGOT-041` | Lockout Bypass via Password Reset | Security & State Interaction | FR-02 & FR-03 Coupling | OWASP ASVS V3.2 | `403` / `423` (Bug Found) |
| `TC-FORGOT-042` | OTP Invalidation on Successive Requests | State Transition | Temporal Invariant | Single-Use OTP Lifecycle | `400` on Old Token |
| `TC-FORGOT-043` | Anti-Spam OTP Rate Limiting & Cooldown | Stress & Security | Rate Limiting / Flooding | NFR-SEC-01 / Abuse Prevention | `429 Too Many Requests` |
| `TC-FORGOT-044` | Email Case-Insensitive & Trimming Robustness | Domain Partitioning | Data Normalization | NFR-UX-01 / Robustness | `200 OK` (Normalized) |
| `TC-FORGOT-045` | Timing Attack Analysis on Account Lookup | Security Testing | Side-Channel Analysis | NFR-SEC-02 / CWE-208 | `200 OK` ($\Delta t < 50\text{ms}$) |

---

## 3. Summary Breakdown

- **Total Test Cases:** 45 (40 AI Generated + 5 Human Extended)
- **Equivalence Partitioning (EP) cases:** 17
- **Boundary Value Analysis (BVA) cases:** 5
- **Data-Driven Test Candidates:** 15 rows mapped in `forgot-password-data-driven.json`
- **Security & OWASP Vulnerability checks:** 14 cases
- **Contract & Schema checks:** 2 cases
- **State Transition & Lifecycle checks:** 4 cases
- **Audit & Compliance checks:** 1 case
