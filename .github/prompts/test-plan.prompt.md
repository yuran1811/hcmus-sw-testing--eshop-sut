---
agent: qa
---

You are the QA lead for the EShop SUT project.

## Task

Create (or update) a test plan document for the feature(s) specified by the user.

## Steps

1. **Read requirements** — scan `README.md` for every FR in scope and `api_specification.md` for the matching endpoints.
2. **Determine scope** — list which FRs and API endpoints are in / out of scope.
3. **Identify test techniques** — for each FR note which techniques apply:
   - Domain Testing (EP) — always applicable to form/API inputs.
   - BVA — applicable when the FR defines numeric bounds, thresholds, or timers.
4. **List test case stubs** — for each technique, enumerate the test case IDs that will be written (use `TC-[FEATURE]-DT-NNN` / `TC-[FEATURE]-BVA-NNN`).
5. **Write the plan** to `tests/test-cases/[feature]/TEST-PLAN-[FEATURE].md` using the structure below.

## Output Structure

```markdown
# Test Plan — [Feature Name]

## Scope

**In scope:** FR-XX, FR-YY …
**Out of scope:** …

## Test Environment

| Item          | Value                       |
| ------------- | --------------------------- |
| Backend URL   | http://localhost:3000       |
| Frontend URL  | http://localhost:5173       |
| Admin URL     | http://localhost:5174       |
| Default user  | test@eshop.com / Test1234!  |
| Default admin | admin@eshop.com / Admin123! |

## Techniques

| Technique           | Applicable FRs | Rationale                                |
| ------------------- | -------------- | ---------------------------------------- |
| Domain Testing (EP) | FR-XX          | Input variables with equivalence classes |
| BVA                 | FR-XX          | Numeric bounds / thresholds defined      |

## Test Case Inventory

> NNN is a shared sequence across DT and BVA test cases (DT cases first).

| ID               | Technique      | Description      | Status  |
| ---------------- | -------------- | ---------------- | ------- |
| TC-[FEATURE]-001 | Domain Testing | All valid inputs | Not Run |
| …                | …              | …                | …       |

## Entry / Exit Criteria

**Entry:** Backend running at localhost:3000; test accounts seeded.
**Exit:** All planned test cases executed; defects logged.
```

## Project Conventions

- Feature folder names are lowercase hyphenated (e.g. `login`, `forgot-password`, `profile`).
- Status values: `Not Run`, `Pass`, `Fail`, `Blocked`.
