# AI Audit Checklist — POST /api/forgot-password (FR-03)

**Document Identifier:** AC-EShop-API-FR03  
**Auditor / Student ID:** `23127148`  
**Endpoint Under Test:** `POST /api/forgot-password`  
**SUT URL:** `http://localhost:3000`  
**Course:** Software Testing (FIT @ HCMUS) - HW06  

---

## 1. Test Case Evaluation Table (AI-02 Template)

| # | Test Case ID | Test Title | AI Confidence | Verdict | ISTQB & Course Reasoning | Student Fix / SUT Deviation Note |
| :---: | :--- | :--- | :---: | :---: | :--- | :--- |
| 1 | `TC-FORGOT-001` | Valid registered standard email | `HIGH` | **VALID** | Verifies base functional happy path per FR-03 specification. | Expected: 200 OK with `message` and `resetToken`. |
| 2 | `TC-FORGOT-002` | Valid registered admin email | `HIGH` | **VALID** | Verifies role independence for password reset request. | SUT seeds `admin@eshop.com`. Expected 200 OK. |
| 3 | `TC-FORGOT-003` | Valid email with plus addressing | `MEDIUM` | **VALID** | Sub-addressing (RFC 5233) is valid email syntax. | SUT returns 404 if email is not exact string in DB, which is semantically correct for user lookup. |
| 4 | `TC-FORGOT-004` | Valid email with dot in local-part | `MEDIUM` | **VALID** | Dots in local-part are standard per RFC 5322. | Handled cleanly by string matching. |
| 5 | `TC-FORGOT-005` | Valid email with subdomain | `MEDIUM` | **VALID** | Multi-level FQDN is valid email format. | Handled cleanly by string matching. |
| 6 | `TC-FORGOT-006` | Non-existent / unregistered email | `HIGH` | **VALID** | Standard negative equivalence partition for user lookup. | SUT returns 404 `{ "error": "User not found" }`. Note: OWASP recommends 200 generic message. |
| 7 | `TC-FORGOT-007` | Invalid syntax - Missing `@` | `HIGH` | **VALID** | Invalid syntax equivalence partition; violates RFC 5322. | SUT backend currently lacks regex validation and returns 404 instead of 400. Flagged as Bug. |
| 8 | `TC-FORGOT-008` | Invalid syntax - Missing domain | `HIGH` | **VALID** | Incomplete address partition. | SUT returns 404 instead of 400. Flagged as input validation bug. |
| 9 | `TC-FORGOT-009` | Invalid syntax - Missing local-part | `HIGH` | **VALID** | Missing user prefix partition. | SUT returns 404 instead of 400. Flagged as input validation bug. |
| 10 | `TC-FORGOT-010` | Invalid syntax - Missing TLD | `HIGH` | **VALID** | Incomplete domain partition. | SUT returns 404 instead of 400. Flagged as input validation bug. |
| 11 | `TC-FORGOT-011` | Invalid syntax - Multiple `@` chars | `HIGH` | **VALID** | Multiple separators violate grammar. | SUT returns 404 instead of 400. |
| 12 | `TC-FORGOT-012` | Invalid syntax - Space inside email | `HIGH` | **VALID** | Unquoted spaces are invalid in email. | SUT returns 404 instead of 400. |
| 13 | `TC-FORGOT-013` | Invalid syntax - Special char in domain | `HIGH` | **VALID** | `#` is illegal in domain labels. | SUT returns 404 instead of 400. |
| 14 | `TC-FORGOT-014` | Extreme input - Empty string | `HIGH` | **VALID** | Boundary / empty field negative test. | SUT returns 404 instead of 400. |
| 15 | `TC-FORGOT-015` | Extreme input - Explicit null value | `HIGH` | **VALID** | Null type injection. | SUT returns 404 instead of 400. |
| 16 | `TC-FORGOT-016` | Extreme input - Missing email key | `HIGH` | **VALID** | Missing required schema property. | `req.body.email` is undefined. SUT returns 404 instead of 400. |
| 17 | `TC-FORGOT-017` | Extreme input - Integer data type | `HIGH` | **VALID** | Wrong JSON data type partition. | SUT fails type check; should return 400 Bad Request. |
| 18 | `TC-FORGOT-018` | Extreme input - Boolean data type | `HIGH` | **VALID** | Wrong JSON data type partition. | SUT should reject non-string types with 400. |
| 19 | `TC-FORGOT-019` | Extreme input - Array data type | `HIGH` | **VALID** | Array payload tampering. | SUT should reject array structure with 400. |
| 20 | `TC-FORGOT-020` | Extreme input - Nested Object type | `HIGH` | **VALID** | Object injection partition. | SUT should reject nested object with 400. |
| 21 | `TC-FORGOT-021` | Boundary Length - Min RFC length | `MEDIUM` | **VALID** | `a@b.co` (6 chars) is shortest standard email. | Validates lower boundary handling. |
| 22 | `TC-FORGOT-022` | Boundary Length - 254 RFC limit | `HIGH` | **VALID** | RFC 5321 specifies 254 octets max path length. | Validates upper boundary without truncation error. |
| 23 | `TC-FORGOT-023` | Boundary Length - Oversized (>1000) | `HIGH` | **VALID** | Buffer boundary / DoS payload test. | SUT should reject or handle safely without crashing. |
| 24 | `TC-FORGOT-024` | Whitespace handling - Leading/trailing | `HIGH` | **VALID** | User experience / sanitization edge case. | Systems should trim whitespace before DB lookup. |
| 25 | `TC-FORGOT-025` | Unicode / Diacritics in email | `MEDIUM` | **VALID** | Internationalized Domain Names (IDN) / RFC 6530. | SUT should handle unicode safely without crash. |
| 26 | `TC-FORGOT-026` | User Enumeration discrepancy | `HIGH` | **VALID** | OWASP API3:2023 / CWE-203 side-channel vulnerability. | Discrepancy between 200 (existing) and 404 (non-existing) allows attackers to enumerate users. |
| 27 | `TC-FORGOT-027` | Cleartext OTP token leakage | `HIGH` | **VALID** | OWASP API3:2023 / CWE-200 Sensitive Data Exposure. | SUT directly returns `resetToken` in JSON response. Critical security flaw in SUT design. |
| 28 | `TC-FORGOT-028` | Low entropy 4-digit OTP RNG | `HIGH` | **VALID** | OWASP API2:2023 / CWE-330 Weak PRNG. | `Math.floor(1000 + Math.random() * 9000)` only yields 9,000 possibilities; brute-forceable in seconds. |
| 29 | `TC-FORGOT-029` | Rate Limiting / Flooding DoS | `HIGH` | **VALID** | OWASP API4:2023 / CWE-799 lack of throttling. | SUT lacks rate limiting middleware, allowing email flooding & token overwrite attacks. |
| 30 | `TC-FORGOT-030` | SQL Injection - Boolean Tautology | `HIGH` | **VALID** | SEC-05 / CWE-89 injection testing. | SUT uses parameterized query (`[email]`), safely preventing SQL syntax execution. Returns 404. |
| 31 | `TC-FORGOT-031` | SQL Injection - Stacked Query DROP | `HIGH` | **VALID** | SEC-05 / CWE-89 destructive injection testing. | Parameterized queries prevent command stacking. Returns 404 safely without 500 error. |
| 32 | `TC-FORGOT-032` | XSS Injection in email payload | `HIGH` | **VALID** | SEC-06 / CWE-79 cross-site scripting test. | Parameterized query prevents persistence; SUT returns 404 safely. |
| 33 | `TC-FORGOT-033` | Mass Assignment / Injected fields | `HIGH` | **VALID** | SEC-07 / OWASP API6:2023 mass assignment check. | Extra fields (`role`, `newPassword`) are ignored by endpoint handler. |
| 34 | `TC-FORGOT-034` | Content-Type - Form URL Encoded | `HIGH` | **VALID** | Protocol & MIME type enforcement test. | Tests server parsing behavior when non-JSON body is transmitted. |
| 35 | `TC-FORGOT-035` | Content-Type - Plain text | `HIGH` | **VALID** | Protocol & MIME type enforcement test. | SUT fails to parse body as JSON, `req.body` is undefined/empty. |
| 36 | `TC-FORGOT-036` | Malformed JSON Syntax | `HIGH` | **VALID** | RFC 8259 syntax validation. | Express `bodyParser.json()` catches syntax errors and responds with 400 Bad Request. |
| 37 | `TC-FORGOT-037` | Contract - 200 OK JSON Schema | `HIGH` | **VALID** | Contract testing with Draft-07 JSON Schema. | Validates property types: `message` is string, `resetToken` is string. |
| 38 | `TC-FORGOT-038` | Contract - Error JSON Schema | `HIGH` | **VALID** | Contract testing for error payloads. | Validates property `error` is string on 404/400 responses. |
| 39 | `TC-FORGOT-039` | State Transition - OTP Lifecycle | `HIGH` | **VALID** | State Machine Testing: FR-03 -> FR-04. | Tests that token generated in FR-03 is accepted by `/api/reset-password`. |
| 40 | `TC-FORGOT-040` | Audit - Mandatory `X-Student-Id` | `HIGH` | **VALID** | HW06 §6.1 Academic traceability requirement. | Header `X-Student-Id: 23127148` is transmitted and verified. |

---

## 2. Security Vulnerability & Bug Findings in SUT

During test design and execution against `backend/server.js`, the following architectural vulnerabilities and bugs were discovered:

1. **BUG-FORGOT-01 (CWE-200: Sensitive Data Exposure):**
   - *Finding:* The API responds with `{ "message": "...", "resetToken": "1234" }` directly in the HTTP body.
   - *Impact:* Anyone knowing a user's email can initiate a password reset and intercept the OTP token in the response without accessing the user's email inbox.

2. **BUG-FORGOT-02 (CWE-330: Insufficient Entropy / Weak PRNG):**
   - *Finding:* The token is generated via `Math.floor(1000 + Math.random() * 9000).toString()`.
   - *Impact:* Generates only 4 digits (1,000 - 9,999; 9,000 combinations total) using a predictable pseudo-random number generator (`Math.random()`), allowing trivial brute-force guessing in under 1 second.

3. **BUG-FORGOT-03 (CWE-203: User Enumeration):**
   - *Finding:* The API returns `200 OK` for registered users and `404 Not Found` (`{ "error": "User not found" }`) for unregistered emails.
   - *Impact:* Malicious actors can harvest valid email addresses from the system by scraping responses.

4. **BUG-FORGOT-04 (CWE-20: Missing Input Format Validation):**
   - *Finding:* The backend queries the database directly with `db.get("SELECT * FROM users WHERE email = ?", [email])` without checking email format, non-empty status, or string type.
   - *Impact:* Malformed inputs, missing keys, and invalid types return `404 User not found` instead of `400 Bad Request`.
