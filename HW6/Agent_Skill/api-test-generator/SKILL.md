---
name: api-test-generator
description: >
  AI-driven API test generator for HW06 (Bloom-AI G9.5 Create level). Given any
  API specification, produces ≥35 executable Postman test cases per API endpoint
  group covering domain partitions, state transitions, security (SEC-01–SEC-07),
  and schema validation. Outputs a ready-to-run Postman Collection JSON,
  environment file, data-driven test data, markdown test case docs (TC-*.md),
  coverage matrix, and audit checklist. Generic and reusable across any REST API.
  Activate when the user asks to generate API tests, create a Postman collection
  from an API spec, or run the HW06 test generation pipeline.
---

# API Test Generator

## Purpose

Automate HW06 §6.1 (Generate with AI): given an API specification, produce ≥35
executable test cases per API covering the four required dimensions — domain
partitions, state transitions, security, and schema validation — as a
ready-to-run Postman collection with full documentation.

This skill IS the AI-driven API test generator described in HW06 §7.

## When to activate

| Trigger | Action |
|---------|--------|
| User says "generate tests for [API]" | Run full 5-phase pipeline |
| User provides an API spec and asks for test cases | Run full pipeline |
| User asks to add tests for a new endpoint to existing collection | Run phases 1–4, merge into existing collection |
| User asks for a coverage matrix or audit checklist only | Run phases 1–2 + 4–5 only |

## Required input — ask once if missing

Before starting, verify you have all of the following. If any are missing, ask
the user in a single numbered list. Do not guess business rules or security
constraints.

1. **API specification** — file path, pasted JSON/curl, or OpenAPI YAML/JSON.
   The project default is `api_specification.md` in the repo root.
2. **Which endpoint(s) to test** — e.g., "Login API (FR-02)" or "all Cart and
   Checkout endpoints (FR-07, FR-08, FR-10)". The user picks one feature group
   from Pool A, B, or C per HW06 §5.
3. **Student ID** — for the mandatory `X-Student-Id` header.
4. **Base URL** — default `http://localhost:3000` for this SUT.
5. **Auth mechanism** — how to obtain tokens. For this SUT: `POST /api/login`
   returns a JWT. Ask for test credentials if not in the spec.
6. **Business rules / state machine** — if the API involves state transitions
   (e.g., order lifecycle), ask for the valid/invalid transitions. If the spec
   already documents them, confirm understanding with the user.

## Pipeline — 5 Phases

Execute each phase sequentially. Show progress to the user after each phase.

---

### Phase 1: ANALYZE

Read the API specification. For each selected endpoint, extract and present to
the user for confirmation:

```
For each endpoint:
  - HTTP method + path
  - Path parameters (name, type, constraints)
  - Query parameters (name, type, optional/required)
  - Request body fields (name, type, required?, constraints)
  - Required authentication (none / bearer JWT / admin-only)
  - Response status codes and body shape per status
  - State machine rules (if applicable)
  - Related security requirements
```

Present a summary table:

| Endpoint | Method | Auth | Params | Body Fields | States |
|----------|--------|------|--------|-------------|--------|

If the spec is ambiguous about constraints (e.g., max length, allowed values),
list your assumptions explicitly and ask the user to confirm or correct.

---

### Phase 2: DESIGN TEST CASES

For each endpoint, apply the following test design techniques. Target ≥35 total
test cases across all endpoints in the selected API group.

#### A. Domain Partitions — Equivalence Partitioning (EP)

For every parameter and body field:

1. Identify equivalence classes:
   - Valid class(es): typical valid value
   - Invalid class — wrong type (string for number, number for string)
   - Invalid class — missing/null/empty when required
   - Invalid class — format violation (e.g., email without @)
2. Select one representative value per class
3. Each invalid class → one negative test case expecting 400/422

#### B. Domain Partitions — Boundary Value Analysis (BVA)

For every parameter with a defined range or length constraint:

1. Identify boundary points: min-1, min, min+1, nominal, max-1, max, max+1
2. Below-min and above-max → expect 400/422
3. At-min and at-max → expect 2xx

#### C. State Transition Testing

If the API involves a state machine (e.g., order status):

1. Draw the state transition table from the spec/business rules:

   | Current State | Event | Next State | Valid? |
   |---------------|-------|------------|--------|

2. For each valid transition → test case expecting success
3. For each invalid transition → test case expecting 400/409
4. Test terminal states (e.g., delivered, canceled) cannot transition further

#### D. Security Testing (SEC-01–SEC-07)

Generate test cases for each applicable security concern:

| ID | Security Test | Technique | Expected |
|----|---------------|-----------|----------|
| SEC-01 | No auth token | Omit Authorization header | 401 |
| SEC-02 | Expired/tampered token | Send invalid JWT | 401/403 |
| SEC-03 | Wrong role (RBAC) | User token on admin-only endpoint | 403 |
| SEC-04 | IDOR / BOLA | Access another user's resource by ID | 403 or 404 |
| SEC-05 | SQL injection | Send `' OR '1'='1` in string fields | Not 500, safely handled |
| SEC-06 | XSS payload | Send `<script>alert(1)</script>` | Sanitized or 400 |
| SEC-07 | Mass assignment | Send extra fields like `"role":"admin"` in body | Field ignored |

#### E. Schema Validation (Contract tests)

For each endpoint's success response:

1. Define a JSON Schema from the spec's documented response shape
2. Test: Content-Type is `application/json`
3. Test: response body matches the JSON Schema exactly
4. Test: required fields are present and have correct types

#### F. Data-Driven Testing (DDT)

Consolidate EP + BVA cases for one endpoint into a JSON data file:

```json
[
  { "description": "Valid login", "email": "test@domain.com", "password": "Password123!", "expectedStatus": 200 },
  { "description": "Missing email", "email": "", "password": "Password123!", "expectedStatus": 400 },
  ...
]
```

Include ≥8 rows: valid cases, boundary cases, negative cases, injection payloads.

#### G. E2E Workflow / API Chaining (Use Case Testing)

If the API group contains related endpoints (e.g., CRUD, or a business flow):

1. Chain them in execution order using `pm.collectionVariables.set()`
2. Each step validates its own response AND passes data to the next step
3. Example flow: Register → Login → Add to Cart → Checkout → Verify Order → Cancel Order → Verify Canceled

---

### Phase 3: GENERATE POSTMAN ARTIFACTS

#### 3.1 Test Scripts (JavaScript)

For each test case, write `pm.test()` blocks:

- **Naming convention** — use prefixes:
  - `Functional:` for happy path, negative, boundary, E2E, data-driven
  - `Contract:` for schema validation
  - `Security:` for auth, IDOR, SQLi, XSS, mass assignment
- Example: `pm.test("Functional: Returns 200 for valid login", function() { ... })`

#### 3.2 Pre-request Script (collection-level)

Every request must include:

```javascript
pm.request.headers.add({
    key: 'X-Student-Id',
    value: pm.environment.get('studentId')
});
```

For authenticated endpoints, add token retrieval logic or use `{{token}}` /
`{{adminToken}}` from environment.

#### 3.3 Collection JSON (Postman v2.1)

Organize into folders by test type:

```
Collection: <API Name> API Tests
├── 01-Happy-Path
├── 02-Schema-Validation
├── 03-Auth-and-RBAC
├── 04-Negative-Validation
├── 05-Boundary-and-Sanitization
├── 06-Data-Driven
├── 07-State-Transitions       (if applicable)
├── 08-E2E-Workflow
└── 09-Security-Headers
```

#### 3.4 Environment JSON

```json
{
  "values": [
    { "key": "baseUrl", "value": "http://localhost:3000" },
    { "key": "studentId", "value": "<STUDENT_ID>" },
    { "key": "token", "value": "" },
    { "key": "adminToken", "value": "" },
    { "key": "expiredToken", "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxfQ.invalid" },
    { "key": "testUserEmail", "value": "" },
    { "key": "testUserPassword", "value": "" }
  ]
}
```

#### 3.5 Data File (JSON)

For data-driven test runs. Include `expectedStatus` and `description` columns.

---

### Phase 4: OUTPUT TEST CASE DOCUMENTATION

#### 4.1 Individual test case files

For each test case, create `TC-<API>-<NNN>.md` inside `test-cases/` following the project template:

```markdown
# TC-<API>-<NNN>: <Title>

## Requirement ID
<FR-XX or SEC-XX>

## Module / Test type / Technique
<API Name> / <Functional|Contract|Security|Negative Validation|Boundary Analysis> / <Equivalence Partitioning|Boundary Value Analysis|State Transition|...>

## Preconditions
- <list preconditions>

## Test data
| Field | Value |
|---|---|
| Endpoint | <HTTP Method> <Endpoint Path> |
| Header Content-Type | application/json |
| Header X-Student-Id | <StudentId> |
| <Field Name> | <Field Value> |

## Test steps
1. <step 1>
2. <step 2>
3. <step 3>

## Expected result
<expected behavior, HTTP status code, and response attributes>

## Status / Related bugs
Not Run / None
```

#### 4.2 Coverage matrix

Create `coverage-matrix.md`:

| Test Case ID | Endpoint | Test Type | Technique | Coverage Area |
|---|---|---|---|---|
| TC-LOGIN-001 | POST /api/login | Functional | EP | Domain partition |
| TC-LOGIN-002 | POST /api/login | Contract | JSON Schema | Schema validation |
| ... | ... | ... | ... | ... |

Count totals per coverage area to verify ≥35 and all 4 areas covered.

---

### Phase 5: AUDIT PREP

Output `audit-checklist.md` — a structured table the student uses for their
VALID/INVALID/INCOMPLETE review (HW06 §6.2):

```markdown
# Audit Checklist — <API Name>

| # | Test Case ID | Title | AI Confidence | Verdict | Reasoning | Student Fix |
|---|---|---|---|---|---|---|
| 1 | TC-LOGIN-001 | Valid login | HIGH | ___ | ___ | ___ |
| 2 | TC-LOGIN-015 | SQLi in email field | MEDIUM | ___ | ___ | ___ |
```

**AI Confidence levels:**
- `HIGH` — constraint explicitly stated in spec
- `MEDIUM` — inferred from common patterns
- `LOW` — guessed; user must verify against actual SUT behavior

**Gap analysis** — flag areas the AI likely missed, to feed the student's
"Extend" step (HW06 §6.3). Common gaps:

- Business rules not documented in the spec
- Race conditions / concurrency
- Specific error message content validation
- Edge cases in state transitions (e.g., can a shipped order be canceled?)
- Security behaviors that depend on server implementation (rate limiting, CORS)
- Bugs intentionally planted in the SUT for educational purposes

---

## Output file paths

```
HW6/
├── Test/
│   └── <FeatureName>/
│       ├── test-cases/
│       │   ├── TC-<API>-001.md
│       │   ├── ...
│       │   └── TC-<API>-<NNN>.md
│       ├── coverage-matrix.md
│       ├── audit-checklist.md
│       ├── <feature-name>-data-driven.json
│       └── <FeatureName>.postman_collection.json
└── Postman/
    ├── <FeatureName>.postman_collection.json
    └── eshop.postman_environment.json
```

If the `tests/` directory structure does not exist, create it.

Use the environment file across all API test collections (shared `{{baseUrl}}`,
`{{studentId}}`, `{{token}}`). Only create a new environment file if one does
not already exist.

---

## Quality rules

1. **≥35 test cases per API group.** If you produce fewer, go back to Phase 2
   and add more EP/BVA partitions or security cases.
2. **All 4 coverage areas must be present.** Check the coverage matrix before
   finishing.
3. **No invented constraints.** If the spec does not define a max length, do not
   assert one. Flag it as an assumption in the audit checklist.
4. **Test names must be unique and descriptive.** Bad: `"test 1"`. Good:
   `"Functional: Returns 401 when email is missing"`.
5. **Data-driven file must include ≥8 rows** covering valid, boundary, negative,
   and injection cases.
6. **E2E workflow must use `pm.collectionVariables`** to chain data between
   requests. Do not hardcode IDs.
7. **Pre-request script must set `X-Student-Id`** on every request.
8. **Collection JSON must be valid Postman v2.1 format** — importable directly
   into Postman desktop.

## After completion — report to user

Print a summary:

```
✅ API Test Generator complete for: <API Name>
   Test cases generated: <N>
   Coverage: Domain Partitions (<n>), State Transitions (<n>),
             Security (<n>), Schema Validation (<n>)
   Files created:
     - tests/collections/<name>.postman_collection.json
     - tests/environments/eshop.postman_environment.json
     - tests/data/<name>-data-driven.json
     - tests/test-cases/<name>/TC-<API>-001.md ... TC-<API>-<NNN>.md
     - tests/test-cases/<name>/coverage-matrix.md
     - tests/test-cases/<name>/audit-checklist.md
   Next steps:
     1. Review audit-checklist.md — label each case VALID/INVALID/INCOMPLETE
     2. Add ≥5 test cases the AI missed (check the gap analysis)
     3. Run with api-test-executor skill
```
