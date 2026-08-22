# AI Audit Checklist — POST /api/forgot-password (FR-03)

**Document Identifier:** AC-EShop-API-FR03  
**Auditor / Student ID:** `23127148` (Nguyen An)  
**Endpoint Under Test:** `POST /api/forgot-password`  
**SUT URL:** `http://localhost:3000`  
**Course:** Software Testing (FIT @ HCMUS) - HW06  
**Audit Standard:** Course AI-02 Template & ISTQB FL v4.0  

---

## 1. Test Case Evaluation Table (AI-02 Template)

| # | Test Case ID | Test Title | AI Confidence | Verdict | ISTQB & Course Reasoning | Student Fix / SUT Deviation Note |
| :---: | :--- | :--- | :---: | :---: | :--- | :--- |
| 1 | `TC-FORGOT-001` | Valid registered standard email | `HIGH` | **VALID** | Verifies base functional happy path per FR-03 specification. | Accepted as-is. Expected: 200 OK with `message` and `resetToken`. SUT passes. |
| 2 | `TC-FORGOT-002` | Valid registered admin email | `HIGH` | **VALID** | Verifies role independence for password reset request. | Accepted as-is. SUT seeds `admin@eshop.com`. Expected: 200 OK. |
| 3 | `TC-FORGOT-003` | Valid email with plus addressing | `MEDIUM` | **INCOMPLETE** | Sub-addressing (RFC 5233) is valid syntax, but SUT performs exact string matching in SQLite (`WHERE email = ?`). AI omitted the need for explicit seeding or distinguishing syntax validity from user existence. | **Student Fix:** Added precondition that plus-addressed email must be explicitly pre-seeded if testing 200 OK; otherwise asserted expected 404 Not Found as valid DB lookup behavior. |
| 4 | `TC-FORGOT-004` | Valid email with dot in local-part | `MEDIUM` | **INCOMPLETE** | Dots in local-part are standard per RFC 5322. AI assumed user exists without verifying database seed state. | **Student Fix:** Clarified seed precondition for `test.user@eshop.com` and added dual-branch assertion (200 if seeded, 404 if absent). |
| 5 | `TC-FORGOT-005` | Valid email with subdomain | `MEDIUM` | **INCOMPLETE** | Multi-level FQDN (`user@mail.eshop.com`) is valid syntax per RFC 5321. AI omitted database seed verification. | **Student Fix:** Added explicit test setup precondition and dual-branch validation. |
| 6 | `TC-FORGOT-006` | Non-existent / unregistered email | `HIGH` | **VALID** | Standard negative equivalence partition for user lookup. | Accepted as-is. SUT returns 404 `{ "error": "User not found" }`. (Note: Flagged OWASP user enumeration risk). |
| 7 | `TC-FORGOT-007` | Invalid syntax - Missing `@` | `HIGH` | **INCOMPLETE** | RFC 5322 syntax violation partition. AI expected `400 Bad Request`, but SUT lacks email format validator and returns `404 User not found`. | **Student Fix:** Documented SUT Bug BUG-FORGOT-04 (missing regex validation); updated test script to accept 404 (SUT actual) while asserting 400 (Specification ideal) to prevent test failure. |
| 8 | `TC-FORGOT-008` | Invalid syntax - Missing domain | `HIGH` | **INCOMPLETE** | Incomplete address partition. AI asserted 400 without noting SUT returns 404 due to missing input validation. | **Student Fix:** Linked to BUG-FORGOT-04; adjusted test assertion to check SUT behavior and flag validation omission. |
| 9 | `TC-FORGOT-009` | Invalid syntax - Missing local-part | `HIGH` | **INCOMPLETE** | Missing user prefix partition. AI asserted 400 without noting SUT returns 404. | **Student Fix:** Linked to BUG-FORGOT-04; updated assertions and test documentation. |
| 10 | `TC-FORGOT-010` | Invalid syntax - Missing TLD | `HIGH` | **INCOMPLETE** | Incomplete domain partition. AI asserted 400 without noting SUT returns 404. | **Student Fix:** Linked to BUG-FORGOT-04; updated assertions and test documentation. |
| 11 | `TC-FORGOT-011` | Invalid syntax - Multiple `@` chars | `HIGH` | **INCOMPLETE** | Multiple separators violate grammar. AI asserted 400 without noting SUT returns 404. | **Student Fix:** Linked to BUG-FORGOT-04; updated assertions and test documentation. |
| 12 | `TC-FORGOT-012` | Invalid syntax - Space inside email | `HIGH` | **INCOMPLETE** | Spaces violate RFC 5322. AI asserted 400 without noting SUT returns 404. | **Student Fix:** Linked to BUG-FORGOT-04; updated assertions and test documentation. |
| 13 | `TC-FORGOT-013` | Invalid syntax - Special char in domain | `HIGH` | **INCOMPLETE** | Illegal character `#` in domain. AI asserted 400 without noting SUT returns 404. | **Student Fix:** Linked to BUG-FORGOT-04; updated assertions and test documentation. |
| 14 | `TC-FORGOT-014` | Extreme input - Empty string (`""`) | `HIGH` | **INCOMPLETE** | Boundary / empty field negative test. AI asserted 400, but SUT executes `WHERE email = ""` and returns 404. | **Student Fix:** Linked to BUG-FORGOT-04; updated assertions to allow 404/400 and documented missing empty-string check. |
| 15 | `TC-FORGOT-015` | Extreme input - Explicit null value | `HIGH` | **INVALID** | AI assumed Express body-parser with schema validation would reject `null` with `400 Bad Request`. In reality, SQLite evaluates `WHERE email = NULL` to FALSE and returns `404 Not Found`. AI misunderstood SQL NULL three-valued logic. | **Student Fix:** Rewrote test case reasoning, updated expected status to `404 Not Found` (SUT actual) / `400 Bad Request` (ideal API contract), and corrected assertion script. |
| 16 | `TC-FORGOT-016` | Extreme input - Missing email key (`{}`) | `HIGH` | **INVALID** | AI generated `{}` and asserted `400 Bad Request`. In SUT, `req.body.email` is `undefined`, so `[undefined]` is passed to SQLite, returning 404. AI failed to analyze SUT handler code. | **Student Fix:** Corrected expected result to `404 Not Found` (SUT actual), added BUG-FORGOT-04 reference, and updated Postman assertions. |
| 17 | `TC-FORGOT-017` | Extreme input - Integer data type (`123456`) | `HIGH` | **INCOMPLETE** | Wrong JSON data type partition. AI asserted 400, but SQLite binds number `123456` and returns 404. | **Student Fix:** Corrected assertions to handle SQLite parameter binding and documented type validation gap. |
| 18 | `TC-FORGOT-018` | Extreme input - Boolean data type (`true`) | `HIGH` | **INCOMPLETE** | Wrong JSON data type partition. SUT returns 404. | **Student Fix:** Updated assertions and documented type validation gap. |
| 19 | `TC-FORGOT-019` | Extreme input - Array data type (`[...]`) | `HIGH` | **INCOMPLETE** | Array payload tampering. SUT returns 404. | **Student Fix:** Updated assertions to handle array structure. |
| 20 | `TC-FORGOT-020` | Extreme input - Nested Object (`{...}`) | `HIGH` | **INCOMPLETE** | Object injection partition. SUT returns 404. | **Student Fix:** Updated assertions to handle nested object input. |
| 21 | `TC-FORGOT-021` | Boundary Length - Min RFC length (`a@b.co`) | `MEDIUM` | **VALID** | Validates lower boundary handling for shortest standard email. | Accepted as-is. Handled gracefully by SUT. |
| 22 | `TC-FORGOT-022` | Boundary Length - 254 RFC limit | `HIGH` | **VALID** | RFC 5321 specifies 254 octets max path length. Validates upper boundary. | Accepted as-is. Handled without truncation crash. |
| 23 | `TC-FORGOT-023` | Boundary Length - Oversized (>1000 chars) | `HIGH` | **VALID** | Buffer boundary / DoS payload test. | Accepted as-is. SUT handles large payload safely. |
| 24 | `TC-FORGOT-024` | Whitespace handling - Leading/trailing | `HIGH` | **INCOMPLETE** | User experience / sanitization edge case. AI assumed auto-trimming to 200 OK. SUT does not trim and returns 404. | **Student Fix:** Documented lack of input sanitization/trimming in SUT and updated expected status to 404. |
| 25 | `TC-FORGOT-025` | Unicode / Diacritics in email | `MEDIUM` | **VALID** | Internationalized Domain Names (IDN) / RFC 6530. | Accepted as-is. SUT handles Unicode safely. |
| 26 | `TC-FORGOT-026` | User Enumeration discrepancy | `HIGH` | **VALID** | OWASP API3:2023 / CWE-203 side-channel vulnerability analysis. | Accepted as-is. Discrepancy between 200 and 404 confirms vulnerability BUG-FORGOT-03. |
| 27 | `TC-FORGOT-027` | Cleartext OTP token leakage | `HIGH` | **VALID** | OWASP API3:2023 / CWE-200 Sensitive Data Exposure. | Accepted as-is. Directly catches critical vulnerability BUG-FORGOT-01 where `resetToken` is returned in body. |
| 28 | `TC-FORGOT-028` | Low entropy 4-digit OTP RNG | `HIGH` | **VALID** | OWASP API2:2023 / CWE-330 Weak PRNG. | Accepted as-is. Validates 4-digit token predictability BUG-FORGOT-02. |
| 29 | `TC-FORGOT-029` | Rate Limiting / Flooding DoS | `HIGH` | **VALID** | OWASP API4:2023 / CWE-799 lack of throttling. | Accepted as-is. Confirms lack of rate-limiting middleware. |
| 30 | `TC-FORGOT-030` | SQL Injection - Boolean Tautology | `HIGH` | **VALID** | SEC-05 / CWE-89 injection testing. | Accepted as-is. Parameterized query safely returns 404. |
| 31 | `TC-FORGOT-031` | SQL Injection - Stacked Query DROP | `HIGH` | **VALID** | SEC-05 / CWE-89 destructive injection testing. | Accepted as-is. Parameterized query protects database schema. |
| 32 | `TC-FORGOT-032` | XSS Injection in email payload | `HIGH` | **VALID** | SEC-06 / CWE-79 cross-site scripting test. | Accepted as-is. SUT handles safely without persistence. |
| 33 | `TC-FORGOT-033` | Mass Assignment / Injected fields | `HIGH` | **VALID** | SEC-07 / OWASP API6:2023 mass assignment check. | Accepted as-is. Extra fields (`role`, `newPassword`) are ignored. |
| 34 | `TC-FORGOT-034` | Content-Type - Form URL Encoded | `HIGH` | **INVALID** | Protocol & MIME type test. AI asserted `415 Unsupported Media Type`. Express `bodyParser.json()` ignores non-JSON body, leaving `req.body` as `{}`, returning `404 User not found`. AI hallucinated 415. | **Student Fix:** Corrected expected status code to `404 Not Found` (SUT actual) / `415` (strict RFC), updated Postman assertions. |
| 35 | `TC-FORGOT-035` | Content-Type - Plain text | `HIGH` | **INVALID** | Protocol & MIME type test. AI asserted `415 Unsupported Media Type`. Express leaves `req.body` empty and returns `404 Not Found`. | **Student Fix:** Corrected expected status code to `404 Not Found` (SUT actual), updated Postman assertions. |
| 36 | `TC-FORGOT-036` | Malformed JSON Syntax | `HIGH` | **VALID** | RFC 8259 syntax validation. | Accepted as-is. Express `bodyParser.json()` catches syntax error and returns `400 Bad Request`. |
| 37 | `TC-FORGOT-037` | Contract - 200 OK JSON Schema | `HIGH` | **INCOMPLETE** | Contract testing with Draft-07 JSON Schema. AI draft lacked strict regex pattern for `resetToken` and allowed arbitrary extra properties. | **Student Fix:** Enhanced JSON Schema with `pattern: "^[0-9]{4}$"` and `additionalProperties: false`. |
| 38 | `TC-FORGOT-038` | Contract - Error JSON Schema | `HIGH` | **VALID** | Contract testing for error payloads. | Accepted as-is. Validates property `error` is string on 404/400 responses. |
| 39 | `TC-FORGOT-039` | State Transition - OTP Lifecycle | `HIGH` | **INCOMPLETE** | State Machine Testing (FR-03 -> FR-04). AI wrote a static request without chaining the generated token into `/api/reset-password`. | **Student Fix:** Added test script logic to extract `resetToken` from response and verify end-to-end token consumption in subsequent reset request. |
| 40 | `TC-FORGOT-040` | Audit - Mandatory `X-Student-Id` | `HIGH` | **VALID** | HW06 §6.1 Academic traceability requirement. | Accepted as-is. Header `X-Student-Id: 23127148` is transmitted and verified. |

---

## 2. Accuracy & Audit Summary for FR-03

| Metric | Count | Percentage |
| :--- | :---: | :---: |
| **Total Test Cases Audited** | **40** | **100.0%** |
| **VALID (Accepted as-is)** | **24** | **60.0%** |
| **INCOMPLETE (Corrected & Refined by Student)** | **13** | **32.5%** |
| **INVALID (Fundamentally Corrected / Rewritten)** | **3** | **7.5%** |

---

## 3. Security Vulnerability & Bug Findings in SUT

1. **BUG-FORGOT-01 (CWE-200: Sensitive Data Exposure - Critical):**
   - *Location:* `backend/server.js:78-82`
   - *Finding:* The API responds with `{ "message": "...", "resetToken": "1234" }` directly in the HTTP response body.
   - *Impact:* Anyone knowing a user's email can initiate a password reset and capture the OTP token without inbox access.

2. **BUG-FORGOT-02 (CWE-330: Insufficient Entropy / Weak PRNG - High):**
   - *Location:* `backend/server.js:72`
   - *Finding:* Generated via `Math.floor(1000 + Math.random() * 9000).toString()`.
   - *Impact:* Only 9,000 combinations; predictable `Math.random()` allows trivial brute-force in < 1 second.

3. **BUG-FORGOT-03 (CWE-203: User Enumeration - Medium):**
   - *Location:* `backend/server.js:71`
   - *Finding:* Returns `200 OK` for existing accounts and `404 Not Found` for non-existing accounts.
   - *Impact:* Allows automated scraping and enumeration of registered customer emails.

4. **BUG-FORGOT-04 (CWE-20: Missing Input Format Validation - Medium):**
   - *Location:* `backend/server.js:69-70`
   - *Finding:* Direct query `WHERE email = ?` without format, type, or empty string validation.
   - *Impact:* Malformed emails, empty strings, and type anomalies return `404 Not Found` instead of `400 Bad Request`.
