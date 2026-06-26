# Agent Skill: Test Runner — Execute Test Cases on EShop SUT

## Metadata

| Field      | Value                                           |
| ---------- | ----------------------------------------------- |
| Skill ID   | `test-runner`                                   |
| Version    | 1.0                                             |
| Author     | AI Agent                                        |
| Created    | 2026-06-26                                      |
| Reusable   | Yes — works for any feature of EShop SUT        |
| Techniques | API Testing (cURL/fetch) + UI Testing (Browser) |

## Purpose

This skill guides an AI agent to **execute** previously designed test cases against the running EShop SUT system. It supports both **API-level testing** (using HTTP requests) and **UI-level testing** (using browser interactions).

The skill reads test case files, performs the test steps, captures actual results, and updates the test status with pass/fail verdicts and bug reports.

---

## Prerequisites

Before invoking this skill, ensure:

1. **EShop Backend** is running at `http://localhost:3000`
2. **EShop Frontend Web** is running at `http://localhost:5173` (for UI tests)
3. **EShop Web Admin** is running at `http://localhost:5174` (for admin feature tests)
4. **Test cases** exist in `tests/test-cases/{feature}/` directory
5. **Database** has been reset to initial state: `node database.js` in `backend/` directory

### Default Test Accounts

| Role  | Email             | Password    |
| ----- | ----------------- | ----------- |
| Admin | `admin@eshop.com` | `Admin123!` |
| User  | `test@eshop.com`  | `Test1234!` |

---

## Input Parameters

| Parameter        | Required | Description                                             | Example                 |
| ---------------- | -------- | ------------------------------------------------------- | ----------------------- |
| `FEATURE_SLUG`   | Yes      | Feature directory name in test-cases                    | `register`              |
| `TEST_LEVEL`     | Yes      | Type of testing: `API`, `UI`, or `BOTH`                 | `BOTH`                  |
| `BASE_URL_API`   | No       | Backend API base URL (default: `http://localhost:3000`) | `http://localhost:3000` |
| `BASE_URL_WEB`   | No       | Frontend Web URL (default: `http://localhost:5173`)     | `http://localhost:5173` |
| `BASE_URL_ADMIN` | No       | Admin Web URL (default: `http://localhost:5174`)        | `http://localhost:5174` |
| `RESET_DB`       | No       | Reset database before running (default: `true`)         | `true`                  |

---

## Execution Workflow

### PHASE 1: PREPARATION

#### Step 1: Read All Test Cases

1. List all `TC-*.md` files in `tests/test-cases/{FEATURE_SLUG}/`
2. Parse each file to extract:
   - Test Case ID
   - Preconditions
   - Test data (input values)
   - Test steps
   - Expected result
3. Sort test cases by ID number

#### Step 2: Reset Database (if RESET_DB = true)

Run the following command to reset the database to its initial state:

```bash
cd backend && node database.js
```

This ensures test isolation — each test run starts from a known state.

#### Step 3: Obtain Authentication Tokens

For tests requiring authentication, obtain JWT tokens:

**User token**:

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@eshop.com", "password": "Test1234!"}'
```

**Admin token**:

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@eshop.com", "password": "Admin123!"}'
```

Store the returned `token` values for subsequent API calls.

---

### PHASE 2: API-LEVEL TEST EXECUTION

For each test case, if `TEST_LEVEL` is `API` or `BOTH`:

#### Step 4: Execute API Tests

1. **Map test data to API request**:
   - Identify the correct API endpoint from `api_specification.md`
   - Construct the HTTP request (method, URL, headers, body)
   - Include `Authorization: Bearer <token>` header if authentication is required

2. **Send the request** using `curl` or equivalent:

```bash
curl -s -w "\nHTTP_STATUS:%{http_code}" \
  -X POST http://localhost:3000/api/{endpoint} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{json_body}'
```

3. **Capture actual result**:
   - HTTP status code
   - Response body (JSON)
   - Any error messages

4. **Compare actual vs expected**:
   - Does the HTTP status match? (200 for success, 400/401/403 for errors)
   - Does the response message match the expected result?
   - Does the system state change as expected? (e.g., new user created, cart updated)

5. **Determine verdict**:
   - `PASS` — Actual result matches expected result
   - `FAIL` — Actual result differs from expected result
   - `BLOCKED` — Cannot execute due to unmet preconditions

---

### PHASE 3: UI-LEVEL TEST EXECUTION

For each test case, if `TEST_LEVEL` is `UI` or `BOTH`:

#### Step 5: Execute UI Tests

1. **Navigate to the correct page** based on test steps
2. **Perform UI interactions**:
   - Fill in form fields with test data
   - Click buttons
   - Wait for page transitions or notifications
3. **Observe and capture**:
   - Visual feedback (toast notifications, error messages, redirects)
   - Form validation messages
   - Page state changes
   - Take **screenshots** for evidence
4. **Compare with expected result** from the test case
5. **Check GUI requirements** (FR-21 to FR-24):
   - Language consistency (Vietnamese)
   - Color consistency (blue for positive, red for danger)
   - Currency format (₫ with thousand separators)
   - Single `<h1>` per page
   - Required field markers (`*`)
   - Error message position (above submit button)
   - Tab order

---

### PHASE 4: RESULT RECORDING

#### Step 6: Update Test Case Status

For each executed test case, update the `Status / Related bugs` section:

**If PASS**:

```markdown
## Status / Related bugs

PASS — Executed on {YYYY-MM-DD HH:MM} / None
```

**If FAIL**:

```markdown
## Status / Related bugs

FAIL — Executed on {YYYY-MM-DD HH:MM} / BUG-{FEATURE}-{NNN}

### Actual Result

{Description of what actually happened}

### Evidence

{Screenshot path or API response}
```

#### Step 7: Create Bug Reports

For each FAIL verdict, create an entry in `report/Bug_Report.md`:

```markdown
## BUG-{FEATURE}-{NNN}: {Bug title}

| Field           | Value                               |
| --------------- | ----------------------------------- |
| **Bug ID**      | BUG-{FEATURE}-{NNN}                 |
| **Feature**     | {FEATURE_NAME} ({FEATURE_ID})       |
| **Test Case**   | TC-{FEATURE_SLUG}-{NNN}             |
| **Severity**    | Critical / Major / Minor / Cosmetic |
| **Priority**    | High / Medium / Low                 |
| **Status**      | Open                                |
| **Found On**    | {YYYY-MM-DD}                        |
| **Environment** | {Browser/OS or API client}          |

### Description

{Clear description of the bug}

### Steps to Reproduce

1. {Step 1}
2. {Step 2}
3. ...

### Expected Result

{What should happen according to SRS}

### Actual Result

{What actually happened}

### Evidence

{Screenshots, API responses, or console logs}

### Notes

{Any additional context, such as whether this is a security vulnerability}
```

#### Step 8: Update Traceability Matrix

Append entries to `tests/test-summary/traceability-matrix.md`:

```markdown
| Requirement  | Test Case               | Result    | Bug Issue      | Status |
| ------------ | ----------------------- | --------- | -------------- | ------ |
| {FEATURE_ID} | TC-{FEATURE_SLUG}-{NNN} | PASS/FAIL | BUG-XXX / None | Done   |
```

#### Step 9: Update Test Run Log

Append a test run entry to `tests/test-runs/`:

```markdown
# Test Run: {FEATURE_NAME} — {YYYY-MM-DD}

## Summary

| Metric     | Value            |
| ---------- | ---------------- |
| Total TCs  | {N}              |
| Passed     | {P}              |
| Failed     | {F}              |
| Blocked    | {B}              |
| Pass Rate  | {P/N \* 100}%    |
| Bugs Found | {number of bugs} |

## Test Environment

| Component | Version / URL              |
| --------- | -------------------------- |
| Backend   | http://localhost:3000      |
| Frontend  | http://localhost:5173      |
| Browser   | {browser name and version} |
| OS        | {operating system}         |
| Database  | SQLite (reset before test) |

## Detailed Results

| #   | TC ID      | TC Name | Result  | Bug ID      | Notes        |
| --- | ---------- | ------- | ------- | ----------- | ------------ |
| 1   | TC-XXX-001 | ...     | PASS    | -           |              |
| 2   | TC-XXX-002 | ...     | FAIL    | BUG-XXX-001 | {brief note} |
```

---

### PHASE 5: AI AUDIT LOGGING

After completing all test execution, append an audit entry to `report/AI_Audit_Report.md`:

```markdown
### Entry {N} — Test Execution for {FEATURE_NAME}

| Field                     | Value                                                              |
| ------------------------- | ------------------------------------------------------------------ |
| **AI Tool**               | {Tool name}                                                        |
| **Date/Time**             | {ISO 8601 timestamp}                                               |
| **Task**                  | Test case execution for {FEATURE_ID}                               |
| **Test Level**            | {API / UI / BOTH}                                                  |
| **Prompt Summary**        | Invoked `test-runner` skill with FEATURE_SLUG={FEATURE_SLUG}       |
| **Output Summary**        | Executed {N} TCs: {P} PASS, {F} FAIL, {B} BLOCKED. Found {X} bugs. |
| **Human Review Required** | Yes — verify FAIL verdicts and bug reports                         |
| **Files Modified**        | {List of updated TC files and reports}                             |
```

---

## Common API Test Patterns

### Pattern 1: Registration Test

```bash
# Valid registration
curl -s -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"newuser@test.com","password":"Test1234!"}'

# Expected: 200 OK with success message
```

### Pattern 2: Login Test

```bash
# Valid login
curl -s -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@eshop.com","password":"Test1234!"}'

# Expected: 200 OK with JWT token
```

### Pattern 3: Authenticated Request

```bash
# Get user profile (requires auth)
curl -s -X GET http://localhost:3000/api/users/me \
  -H "Authorization: Bearer {token}"

# Expected: 200 OK with user data
```

### Pattern 4: Admin-Only Request

```bash
# Get all users (admin only)
curl -s -X GET http://localhost:3000/api/admin/users \
  -H "Authorization: Bearer {admin_token}"

# Expected: 200 OK with user list
```

### Pattern 5: Apply Coupon

```bash
curl -s -X POST http://localhost:3000/api/apply-coupon \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{"code":"SAVE10","total_amount":500000,"user_id":1}'

# Expected: 200 OK with discount_amount and final_amount
```

---

## Tips for Human Reviewer

- [DO] Verify that the database was reset before the test run
- [DO] Check that FAIL verdicts are genuine (not caused by test environment issues)
- [DO] Review bug reports for completeness (steps to reproduce, screenshots)
- [DO] Ensure all test cases were executed (no gaps)
- [DO] Check that the traceability matrix is up to date
- [DO NOT] Mark a test as PASS if the actual result only partially matches
- [DO NOT] Ignore GUI/UX issues — they count as bugs per FR-21 to FR-24
