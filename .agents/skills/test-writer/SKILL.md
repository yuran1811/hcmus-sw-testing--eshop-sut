---
name: test-writer
description: >
  AI-driven API test generator for HW06. Given an API specification (markdown, OpenAPI YAML/JSON,
  or pasted endpoint details), generates ≥35 structured test cases per API covering all mandatory
  categories: Happy Path, Schema Validation, Auth 401/403, Negative 400/404, Boundary & Sanitization
  (SQLi/XSS), Data-Driven, and E2E Workflow. Outputs Postman collection JSON, environment file,
  data-driven CSV/JSON, and newman run commands. Reusable for any API — not locked to EShop.
  Trigger when the user mentions: generate API tests, write test cases, test-writer, HW06 generate,
  Postman tests, contract tests, or API test generator.
---

# API Test Writer — AI-Driven Test Generator

## Purpose

Generate a comprehensive API test suite from an API specification document. This skill implements
the full HW06 pipeline Step 1 (Generate) and Step 3 (Extend), producing all artifacts needed for
Postman + Newman execution.

## When to use

| Trigger | Action |
| --- | --- |
| User provides an API spec and asks for test generation | Full GENERATE flow |
| User asks to extend existing test cases with missed scenarios | EXTEND flow |
| User asks for a specific test category only (e.g., "write auth tests") | Single-category flow |
| User mentions HW06, API testing, Postman tests, newman | Check if this skill applies |

## Inputs — what you need before generating

Before writing any test, collect or confirm these inputs. Ask **once** if missing:

1. **API Specification** — one of:
   - Markdown spec (like `api_specification.md`)
   - OpenAPI / Swagger YAML or JSON
   - Pasted endpoint details (method, URL, headers, request/response samples)

2. **Target endpoint(s)** — which API(s) to generate tests for. HW06 requires 3 APIs from different pools.

3. **Student ID** — for the `X-Student-Id` header (HW06 anti-cheat requirement).

4. **Base URL** — default `http://localhost:3000` for EShop SUT.

5. **Auth details** — how the API handles authentication:
   - Token endpoint (e.g., `POST /api/login`)
   - Admin vs. user role tokens
   - Token format (Bearer JWT)

6. **Business rules** — validation rules, unique constraints, state machine transitions,
   security requirements (SEC-01–SEC-07) if applicable.

7. **Sample responses** — real JSON responses for happy path and error cases.
   If not provided, extract from the spec. Never invent field names.

## Output artifacts

For each target API, produce these files:

```text
tests/
├── postman/
│   ├── collections/
│   │   └── {API_NAME}_tests.postman_collection.json
│   ├── environments/
│   │   └── eshop_local.postman_environment.json
│   ├── data/
│   │   └── {API_NAME}_data_driven.json        # or .csv
│   └── newman-reports/                         # created by test-runner skill
└── test-cases/
    └── {api_name}/
        ├── TC-{API}-001.md through TC-{API}-0NN.md   # individual test case docs
        └── test_summary.md                            # summary table
```

## Mandatory test categories (7 categories, all required)

Generate test cases across ALL of these categories for each API. Target **≥ 35 test cases per API**.
Use the distribution below as a guideline:

| # | Category | Min cases | Test name prefix | Description |
| --- | --- | ---: | --- | --- |
| 1 | Happy Path & Performance | 3–5 | `Functional:` | Correct status code, response time < 1000ms, returned ID/Location |
| 2 | Schema & Type Validation | 3–5 | `Contract:` / `Functional:` | Content-Type header, JSON Schema assertion, required fields, data types |
| 3 | Auth 401 / RBAC 403 | 3–4 | `Functional:` | No token → 401, expired token → 401, wrong role → 403 (separate cases) |
| 4 | Validation & Negative (400/404) | 5–8 | `Functional:` | Missing required field, wrong data type, nonexistent resource ID |
| 5 | Boundary & Sanitization (SQLi/XSS) | 4–6 | `Functional:` | Min/max length, SQLi payload, XSS payload — test safe handling, not penetration |
| 6 | Data-Driven | 1 (with ≥8 data rows) | `DataDriven:` | JSON/CSV data file, pm.iterationData, expectedStatus column |
| 7 | E2E Workflow (CRUD chain) | 4–6 | `Integration:` | Create → Read → Update → Delete → Verify deletion, using collection variables |

### Extended categories (optional, add if applicable)

| # | Category | Test name prefix |
| --- | --- | --- |
| 8 | Rate Limiting / Throttling | `Functional:` |
| 9 | Idempotency | `Functional:` |
| 10 | Security Headers | `Security:` |
| 11 | Pagination | `Functional:` |
| 12 | API Versioning | `Contract:` |

## Step-by-step generation workflow

### Phase 1: Analyze the API spec

1. Read the full API specification document.
2. For the target endpoint(s), extract:
   - HTTP method + URL pattern
   - Request headers (especially Authorization)
   - Request body schema (required fields, types, constraints)
   - Response schema for each status code (200, 201, 400, 401, 403, 404, 500)
   - Business rules, state transitions, security requirements
3. List all extracted information and state assumptions explicitly.
   **Never invent fields not in the spec.**

### Phase 2: Generate test cases (category by category)

Work through each mandatory category in order. For each test case, produce:

#### Test case markdown format

```markdown
# TC-{API}-{NNN}: {Short description}

## Requirement ID

{FR-XX / SEC-XX}

## Module / Test type / Technique

{Module} / {Functional|Contract|Security|Integration} / {EP|BVA|StateTransition|ErrorGuessing}

## Category

{One of the 7+ categories}

## Preconditions

- {List preconditions}

## Test data

| Field | Value |
| --- | --- |
| {field} | {value} |

## Request

- **Method:** {GET/POST/PUT/DELETE}
- **URL:** {{baseUrl}}/{path}
- **Headers:** {list}
- **Body:** {JSON or "N/A"}

## Postman test script

\`\`\`javascript
// {test script code}
\`\`\`

## Expected result

{Expected status code, response body assertions, side effects}

## Status / Related bugs

Not Run / None
```

### Phase 3: Build Postman collection JSON

After all test cases are written, assemble them into a valid Postman Collection v2.1 JSON:

#### Collection structure rules

1. **Collection-level pre-request script**: inject `X-Student-Id` header on every request.
   ```javascript
   pm.request.headers.add({
       key: 'X-Student-Id',
       value: pm.collectionVariables.get('studentId')
   });
   ```

2. **Folder hierarchy**: one folder per test category.
   ```
   Collection: {API_NAME} API Tests
   ├── 01 - Happy Path & Performance
   ├── 02 - Schema & Type Validation
   ├── 03 - Authentication & Authorization
   ├── 04 - Validation & Negative
   ├── 05 - Boundary & Sanitization
   ├── 06 - Data-Driven
   └── 07 - E2E Workflow
   ```

3. **Collection variables**: define `baseUrl`, `studentId`, `adminToken`, `userToken`,
   `expiredToken`, and any resource IDs created during E2E flows.

4. **Auth inheritance**: set Bearer token at collection level, override per-request for
   no-token and wrong-token test cases.

5. **Request ordering in E2E folder**: must be sequential (Create → Read → Update → Delete → Verify).
   Use `pm.collectionVariables.set()` to pass IDs between requests.

6. **Test scripts**: embed the `pm.test(...)` blocks in each request's `event[type=test].script`.

#### Collection JSON template skeleton

```json
{
  "info": {
    "name": "{API_NAME} API Tests",
    "_postman_id": "{uuid}",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    { "key": "baseUrl", "value": "http://localhost:3000" },
    { "key": "studentId", "value": "{STUDENT_ID}" },
    { "key": "adminToken", "value": "" },
    { "key": "userToken", "value": "" },
    { "key": "expiredToken", "value": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QGRvbWFpbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE2MDAwMDAwMDB9.invalid" }
  ],
  "event": [
    {
      "listen": "prerequest",
      "script": {
        "type": "text/javascript",
        "exec": [
          "pm.request.headers.add({ key: 'X-Student-Id', value: pm.collectionVariables.get('studentId') });"
        ]
      }
    }
  ],
  "item": []
}
```

### Phase 4: Generate environment file

```json
{
  "id": "{uuid}",
  "name": "EShop Local",
  "values": [
    { "key": "baseUrl", "value": "http://localhost:3000", "enabled": true },
    { "key": "studentId", "value": "{STUDENT_ID}", "enabled": true },
    { "key": "adminEmail", "value": "admin@eshop.com", "enabled": true },
    { "key": "adminPassword", "value": "Admin123!", "enabled": true },
    { "key": "userEmail", "value": "user@eshop.com", "enabled": true },
    { "key": "userPassword", "value": "User123!", "enabled": true }
  ],
  "_postman_variable_scope": "environment"
}
```

### Phase 5: Generate data-driven file

For the data-driven category, create a JSON array (or CSV) with **≥ 8 rows** covering:

| Row type | Count | Example |
| --- | --- | --- |
| Valid/happy path | 2–3 | Correct data, expected 200/201 |
| Boundary valid | 1–2 | Min/max valid values |
| Missing required field | 1–2 | Omit one field, expected 400 |
| Wrong data type | 1 | String for number field, expected 400 |
| Injection payload | 1 | SQLi string, expected 400 or safe response |

Each row must include an `expectedStatus` field for assertion.

### Phase 6: Generate newman run commands

```bash
# Run full collection
newman run tests/postman/collections/{API_NAME}_tests.postman_collection.json \
  -e tests/postman/environments/eshop_local.postman_environment.json \
  --reporters cli,htmlextra \
  --reporter-htmlextra-export tests/postman/newman-reports/{API_NAME}_report.html

# Run data-driven tests only
newman run tests/postman/collections/{API_NAME}_tests.postman_collection.json \
  -e tests/postman/environments/eshop_local.postman_environment.json \
  --folder "06 - Data-Driven" \
  -d tests/postman/data/{API_NAME}_data_driven.json \
  --reporters cli,htmlextra \
  --reporter-htmlextra-export tests/postman/newman-reports/{API_NAME}_data_driven_report.html

# Run E2E workflow only (sequential)
newman run tests/postman/collections/{API_NAME}_tests.postman_collection.json \
  -e tests/postman/environments/eshop_local.postman_environment.json \
  --folder "07 - E2E Workflow" \
  --reporters cli,htmlextra \
  --reporter-htmlextra-export tests/postman/newman-reports/{API_NAME}_e2e_report.html
```

### Phase 7: Generate test summary

Produce `test_summary.md` with:

```markdown
# Test Summary — {API_NAME}

## Coverage matrix

| Category | Test IDs | Count | Status |
| --- | --- | ---: | --- |
| Happy Path & Performance | TC-{API}-001 to 003 | 3 | Not Run |
| Schema & Type Validation | TC-{API}-004 to 008 | 5 | Not Run |
| ... | ... | ... | ... |
| **Total** | | **≥ 35** | |

## Postman features exercised

- [x] Collections with folder hierarchy
- [x] Collection variables (baseUrl, studentId, tokens, dynamic IDs)
- [x] Environment file (local configuration)
- [x] Pre-request scripts (X-Student-Id injection, token acquisition)
- [x] Test scripts (pm.test assertions)
- [x] Data-driven runs (JSON data file + pm.iterationData)
- [x] Collection Runner / Newman CLI
- [ ] Monitors (if applicable)
- [ ] Mock servers (if applicable)

## Newman commands

{paste the newman commands from Phase 6}
```

## EXTEND flow

When asked to extend existing test cases:

1. Read all existing test cases for the target API.
2. Identify gaps in these categories (commonly missed by AI):
   - **Security**: IDOR (accessing another user's resource by guessing ID), privilege escalation
     (user calling admin endpoints), token reuse after password change, SQL injection in query
     params (not just body), mass assignment (sending extra fields to elevate role).
   - **State transitions**: Invalid transitions (e.g., `delivered` → `pending`), concurrent
     modifications, cancellation after shipping, double-cancel.
   - **Edge cases**: Empty arrays, null vs. missing fields, unicode/emoji in string fields,
     extremely large numeric values, negative prices/quantities.
   - **Race conditions**: Double-submit checkout, concurrent cart modifications.
3. Generate **≥ 5** additional test cases with explanation of why the AI likely missed them.
4. Append to the existing collection JSON and update the test summary.

## Quality rules

1. **Never invent fields.** If the spec doesn't mention a field, don't assert it exists.
   State assumptions explicitly.
2. **Separate Contract: and Functional: tests.** Schema checks get `Contract:` prefix,
   business logic checks get `Functional:` prefix. Never mix in one pm.test block.
3. **Auth tests must distinguish 401 vs 403.** No token / expired token = 401.
   Valid token but wrong role = 403. Always write separate test cases.
4. **SQLi/XSS tests are behavioral, not penetration tests.** Use benign payloads.
   Assert the API handles them safely (400 or sanitized response). Never use destructive
   payloads. Note this in test case documentation.
5. **E2E tests depend on execution order.** Document this clearly. Use
   `pm.collectionVariables.set/get` for passing IDs between steps.
6. **Data-driven tests use real data structures.** The data file must match the actual
   request body schema. Include an `expectedStatus` column for flexible assertions.
7. **All test names must be descriptive.** Pattern: `"{Prefix}: {Action} when {condition}"`.
   Example: `"Functional: Returns 401 when no token provided"`.

## Common mistakes to catch and avoid

| Mistake | Impact | Prevention |
| --- | --- | --- |
| No real response sample provided | AI guesses field names/types wrong | Always reference spec or real response |
| Mixing schema + business logic in one test | Hard to maintain, unclear failures | Separate with Contract:/Functional: prefix |
| SQLi/XSS with destructive payloads on prod | Security/legal risk | Only benign payloads, only test environments |
| Confusing 401 and 403 | Hides real auth bugs | Always write 2 separate test cases |
| Pact consumer test with hard-coded values | Contract too brittle, false failures | Use like/eachLike/regex matchers |
| Provider verification without real state handlers | False positive (test passes but nothing verified) | Handler must actually setup test data |
| E2E tests without variable chaining | Tests fail when run in collection | Use pm.collectionVariables for dynamic IDs |

## Pact contract testing (Group II — use when requested)

When the user asks for Pact tests in addition to Postman:

### Consumer Interaction Test

1. Identify consumer name, provider name, SDK language (JS/JVM/Python).
2. Define interactions with clear `description` and `providerState`.
3. Use Pact Matchers (not hard-coded values):
   - `like(value)` — match type, not exact value
   - `eachLike(example)` — match array where each element matches the example
   - `regex(pattern, example)` — match format (email, UUID, date)
4. Test against Pact mock server.
5. Output: consumer test file + instructions to generate `pact.json`.

### Provider Verification & State Test

1. Configure Verifier to read pact.json (local or Pact Broker).
2. Write state handlers that **actually setup test data** (insert into DB/mock).
3. Run verification — Pact replays all interactions against the real provider.
4. Output: provider verification test file + publish commands.

## Activation examples

```
Full generate:
  "Generate API tests for POST /api/login from api_specification.md.
   Student ID: 23127001. Cover all 7 categories, ≥35 test cases."

Single category:
  "Write boundary & sanitization tests for the name field in POST /api/products.
   Max length is 255 chars."

Extend:
  "Review existing tests for /api/orders and add 5 missed security/state transition cases."

With Pact:
  "Generate Pact JS consumer test for frontend calling GET /api/products.
   Consumer: eshop-web, Provider: eshop-api."
```

## Related skills

- `test-runner` — executes the generated collection via newman, produces HTML reports
- `ai-audit-report` — logs each generation session as an auditable artifact with verdict
