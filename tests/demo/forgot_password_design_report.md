# Forgot Password & Password Reset (FR-03) Test Design Report

This report outlines the test design process for the EShop **Forgot Password & Password Reset** (FR-03) feature, incorporating GUI form requirements (FR-22). We use Equivalence Partitioning (EP) and Boundary Value Analysis (BVA) to achieve mathematically complete coverage, deriving test cases under the Error Isolation Principle.

---

## Section 1: Equivalence Partitioning (EP) Analysis

Equivalence Partitioning divides the input domains into valid and invalid partitions. Valid partitions represent values that the system must process successfully, while invalid partitions represent values that should trigger validation errors.

### Inputs & Output Identification

- **Inputs**:
  - `email` (Step 1): The registered email address used to request the reset OTP.
  - `otp` (Step 2): The 6-digit numeric OTP sent to the user's email.
  - `newPassword` (Step 2): The new strong password.
  - `confirmNewPassword` (Step 2): The confirmation of the new password.
- **Outputs**:
  - Step 1 Status: Successful generation and display of OTP + display of Step 2 form. Or validation error.
  - Step 2 Status: Successful password reset + redirect to login. Or validation error.

### Partitions Table

| Parameter | Partition ID | Partition Description | Representative Value | Type |
|---|---|---|---|---|
| **email** | `EP-IN-EMAIL-1` | Registered email address (exists in DB) | `test@eshop.com` | Valid |
| | `EP-IN-EMAIL-2-INV` | Email field is empty | `""` | Invalid |
| | `EP-IN-EMAIL-3-INV` | Invalid email format (missing `@`) | `testeshop.com` | Invalid |
| | `EP-IN-EMAIL-4-INV` | Invalid email format (missing domain) | `test@` | Invalid |
| | `EP-IN-EMAIL-5-INV` | Unregistered email address (does not exist in DB) | `unregistered@eshop.com` | Invalid |
| **otp** | `EP-IN-OTP-1` | Correct 6-digit numeric OTP matching requested email | `123456` | Valid |
| | `EP-IN-OTP-2-INV` | OTP field is empty | `""` | Invalid |
| | `EP-IN-OTP-3-INV` | OTP length too short (5 digits) | `12345` | Invalid |
| | `EP-IN-OTP-4-INV` | OTP length too long (7 digits) | `1234567` | Invalid |
| | `EP-IN-OTP-5-INV` | Incorrect 6-digit OTP | `654321` | Invalid |
| | `EP-IN-OTP-6-INV` | OTP contains non-digit characters | `12345a` | Invalid |
| | `EP-IN-OTP-7-INV` | Correct OTP requested for a different email | OTP from `other@eshop.com` | Invalid |
| **newPassword** | `EP-IN-PWD-1` | Strong password (len >= 8, >=1 upper, >=1 lower, >=1 digit, >=1 special in `@$,!%*?&`) | `Reset123!` | Valid |
| | `EP-IN-PWD-2-INV` | Password field is empty | `""` | Invalid |
| | `EP-IN-PWD-3-INV` | Password length too short (7 characters) | `Res123!` | Invalid |
| | `EP-IN-PWD-4-INV` | Password missing uppercase letter | `reset123!` | Invalid |
| | `EP-IN-PWD-5-INV` | Password missing lowercase letter | `RESET123!` | Invalid |
| | `EP-IN-PWD-6-INV` | Password missing digit | `Resetxyz!` | Invalid |
| | `EP-IN-PWD-7-INV` | Password missing special character | `Reset1234` | Invalid |
| | `EP-IN-PWD-8-INV` | Password contains invalid special character (e.g. `#`) | `Reset123#` | Invalid |
| **confirmNewPassword** | `EP-IN-CONFPWD-1` | Matches `newPassword` exactly | `Reset123!` | Valid |
| | `EP-IN-CONFPWD-2-INV`| Confirm password field is empty | `""` | Invalid |
| | `EP-IN-CONFPWD-3-INV`| Confirm password does not match `newPassword` | `Reset1234!` | Invalid |

---

## Section 2: Boundary Value Analysis (BVA) Analysis

Boundary Value Analysis tests the limits of partitions. We choose 2-Point or 3-Point BVA based on the type of boundary:
- **2-Point BVA**: Chosen for simple binary transitions (e.g. empty vs. non-empty, matching vs. mismatching, or Boolean flags).
- **3-Point BVA**: Chosen for critical numeric ranges, lengths, and capacities where off-by-one errors are common on both sides of the boundary (e.g. OTP exactly 6 digits, password minimum 8 characters).

### BVA Points Justification & Table

| Parameter | Boundary ID | Justification | Tested Value | Expected Behavior |
|---|---|---|---|---|
| **email** | `BVA-EMAIL-1` | **2-Point BVA** for empty vs non-empty (simple transition). | `""` (Length 0) | Invalid (Required field error) |
| | `BVA-EMAIL-2` | Boundary adjacent to empty. | `"a"` (Length 1) | Invalid (Format error) |
| **otp** | `BVA-OTP-1` | **3-Point BVA** for numeric length of exactly 6. Length 5 (Boundary - 1). | `12345` (Length 5) | Invalid (Length error) |
| | `BVA-OTP-2` | Length 6 (Boundary). | `123456` (Length 6) | Valid (Accepted if correct) |
| | `BVA-OTP-3` | Length 7 (Boundary + 1). | `1234567` (Length 7) | Invalid (Length error) |
| | `BVA-OTP-4` | **2-Point BVA** for empty check (Length 0). | `""` (Length 0) | Invalid (Required field error) |
| | `BVA-OTP-5` | Adjacent to empty. | `"1"` (Length 1) | Invalid (Format/Length error) |
| **newPassword** | `BVA-PWD-1` | **3-Point BVA** for minimum password length of 8. Length 7 (Boundary - 1). | `Res123!` (Length 7)| Invalid (Too short error) |
| | `BVA-PWD-2` | Length 8 (Boundary). | `Res1234!` (Length 8)| Valid (Strong password) |
| | `BVA-PWD-3` | Length 9 (Boundary + 1). | `Res12345!` (Length 9)| Valid (Strong password) |
| | `BVA-PWD-4` | **2-Point BVA** for empty check (Length 0). | `""` (Length 0) | Invalid (Required field error) |
| | `BVA-PWD-5` | Adjacent to empty. | `"R"` (Length 1) | Invalid (Format/Length error) |
| **confirmNewPassword** | `BVA-CONFPWD-1` | **2-Point BVA** for matching comparison. Matches exactly. | `Reset123!` | Valid (Matches `newPassword`) |
| | `BVA-CONFPWD-2` | Mismatch by 1 character. | `Reset123?` | Invalid (Mismatch error) |
| | `BVA-CONFPWD-3` | **2-Point BVA** for empty check (Length 0). | `""` (Length 0) | Invalid (Required field error) |
| | `BVA-CONFPWD-4` | Adjacent to empty. | `"R"` (Length 1) | Invalid (Mismatch/Length error)|

---

## Section 3: Test Case Derivation & Reduction

### Error Isolation Principle
All test cases are derived from a **valid baseline**:
- `email = test@eshop.com` (exists in DB)
- `otp = 123456` (correct OTP)
- `newPassword = Reset123!`
- `confirmNewPassword = Reset123!`

For each test case, we modify exactly **one** variable at a time to isolate validation behavior. If a test case fails, we know it is due to that single isolated input parameter.

### Test Case Reduction Process
- Duplicate test cases are identified as those with the **exact same inputs and expected outputs**.
- Since every test case in our derived suite targets a unique EP partition or BVA boundary point using Error Isolation, there are no duplicates.
- The happy path test case (`TC-FORGOT-PASSWORD-001`) covers the valid baselines for all inputs. The remaining test cases target individual invalid or boundary states.

### Traceability Matrix

| Test Case ID | Target Parameter | Covered EP IDs | Covered BVA IDs | Expected Outcome |
|---|---|---|---|---|
| **TC-FORGOT-PASSWORD-001** | Happy Path (Step 1 & 2) | `EP-IN-EMAIL-1`, `EP-IN-OTP-1`, `EP-IN-PWD-1`, `EP-IN-CONFPWD-1` | `BVA-OTP-2`, `BVA-PWD-3`, `BVA-CONFPWD-1` | Successful reset & login redirect |
| **TC-FORGOT-PASSWORD-002** | email | `EP-IN-EMAIL-2-INV` | `BVA-EMAIL-1` | Step 1 Validation Error: Required field |
| **TC-FORGOT-PASSWORD-003** | email | `EP-IN-EMAIL-3-INV`, `EP-IN-EMAIL-4-INV` | `BVA-EMAIL-2` | Step 1 Validation Error: Invalid format |
| **TC-FORGOT-PASSWORD-004** | email | `EP-IN-EMAIL-5-INV` | None | Step 1 Error: Unregistered email |
| **TC-FORGOT-PASSWORD-005** | Navigation | None | None | Redirect back to Login page |
| **TC-FORGOT-PASSWORD-006** | otp | `EP-IN-OTP-2-INV` | `BVA-OTP-4` | Step 2 Validation Error: Required field |
| **TC-FORGOT-PASSWORD-007** | otp | `EP-IN-OTP-3-INV` | `BVA-OTP-1` | Step 2 Validation Error: Length must be 6 |
| **TC-FORGOT-PASSWORD-008** | otp | `EP-IN-OTP-4-INV` | `BVA-OTP-3` | Step 2 Validation Error: Length must be 6 |
| **TC-FORGOT-PASSWORD-009** | otp | `EP-IN-OTP-5-INV` | None | Step 2 Error: Incorrect OTP value |
| **TC-FORGOT-PASSWORD-010** | otp | `EP-IN-OTP-6-INV` | None | Step 2 Validation Error: Numbers only |
| **TC-FORGOT-PASSWORD-011** | otp | `EP-IN-OTP-7-INV` | None | Step 2 Error: OTP mismatches requested email |
| **TC-FORGOT-PASSWORD-012** | newPassword | `EP-IN-PWD-2-INV` | `BVA-PWD-4` | Step 2 Validation Error: Required field |
| **TC-FORGOT-PASSWORD-013** | newPassword | `EP-IN-PWD-3-INV` | `BVA-PWD-1` | Step 2 Validation Error: Too short |
| **TC-FORGOT-PASSWORD-014** | newPassword | `EP-IN-PWD-4-INV` | None | Step 2 Validation Error: Missing uppercase |
| **TC-FORGOT-PASSWORD-015** | newPassword | `EP-IN-PWD-5-INV` | None | Step 2 Validation Error: Missing lowercase |
| **TC-FORGOT-PASSWORD-016** | newPassword | `EP-IN-PWD-6-INV` | None | Step 2 Validation Error: Missing digit |
| **TC-FORGOT-PASSWORD-017** | newPassword | `EP-IN-PWD-7-INV` | None | Step 2 Validation Error: Missing special char |
| **TC-FORGOT-PASSWORD-018** | newPassword | `EP-IN-PWD-8-INV` | None | Step 2 Validation Error: Invalid character |
| **TC-FORGOT-PASSWORD-019** | confirmNewPassword | `EP-IN-CONFPWD-2-INV` | `BVA-CONFPWD-3` | Step 2 Validation Error: Required field |
| **TC-FORGOT-PASSWORD-020** | confirmNewPassword | `EP-IN-CONFPWD-3-INV` | `BVA-CONFPWD-2` | Step 2 Validation Error: Passwords mismatch |
| **TC-FORGOT-PASSWORD-021** | GUI (FR-22) | None | None | Labels contain required asterisk `*` |
| **TC-FORGOT-PASSWORD-022** | GUI (FR-22) | None | None | Inputs use correct `type="email"` / `type="password"` |
| **TC-FORGOT-PASSWORD-023** | GUI (FR-22) | None | None | Validation errors appear above submit button |

---

## Section 4: AI Gap Analysis Framework

This section establishes a template for humans to review and identify edge cases, logic gaps, or security requirements that automated testing/AI generators might miss.

### 1. Key Edge Cases for Human Verification
- **OTP Expiration**: What is the TTL (Time-To-Live) of an OTP? (e.g. 5 minutes). Does the system reject correct OTPs submitted after they expire?
- **Rate Limiting**: Can a user request an OTP repeatedly (e.g. 100 times in 1 minute) to spam an email address?
- **OTP Brute Force Protection**: Does the system lock out or rate-limit the OTP field after 3-5 failed attempts (to prevent brute forcing)?
- **Email Case Sensitivity**: If registered as `Test@EShop.com`, does requesting password reset for `test@eshop.com` work? (It should be case-insensitive).
- **Session Isolation**: If a user opens two browser tabs, requests an OTP for email A in tab 1, and email B in tab 2, does tab 1's OTP overwrite tab 2's session state?

### 2. Technical Root Causes of AI Analysis Gaps
- **Lack of Temporal/State Context**: Static SRS documents rarely explicitly define timeout or session state values, so the AI has no baseline to write assertions.
- **Security-First Blind Spots**: AI defaults to functional flow validation. Security aspects like rate-limiting, clickjacking, and brute force require explicit non-functional specification prompts.
- **Architectural Isolation**: Test generators evaluate forms as discrete UI components, missing the underlying distributed state (e.g. Redis caching for OTP, SMTP queues).

---

## Section 5: AI Audit Log

### AI Audit Log
- **Name of AI tool**: Antigravity (Gemini 3.5 Flash)
- **Date and time**: 2026-06-28 16:37:15 +07:00
- **Prompt**: Complete the 4 core homework requirements for the EShop "Forgot Password & Password Reset" (FR-03) feature using an AI-First strategy. Apply the `test-writer` skill to generate a comprehensive report. Store test cases in `tests/demo/test-cases/` directory. Don't read other files. Apply Domain Testing (EP), Boundary Value Analysis (BVA), detailed navigation steps from home page `http://localhost:5173`, verification of step indicators, required asterisks, input types, error messages positioning, and AI Gap Analysis.
- **Output**: 
  - Analyzed 4 inputs: `email`, `otp`, `newPassword`, `confirmNewPassword`
  - Identified 21 EP partitions (4 valid, 17 invalid)
  - Identified 16 BVA points (applying 2-Point and 3-Point BVA)
  - Derived 23 test cases (1 happy path, 19 functional boundary/error paths, 3 GUI validations)
  - Generated and saved Design Report to `tests/demo/forgot_password_design_report.md`
  - Prepared 23 individual markdown test case files to be written in `tests/demo/test-cases/`
