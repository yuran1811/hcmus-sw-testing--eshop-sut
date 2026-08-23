---
name: api-test-generate
description: >-
  Generates API test cases for EShop HW06 from the API specification using
  step-by-step AI prompting — domain partitions, state transitions, security
  SEC-01–SEC-07, and schema validation (target ≥35 TCs per API). Use when
  generating HW06 test cases, FR-05/FR-11/FR-15 cases, or API domain/security/schema tests.
---

# API Test Generate (HW06)

## Overview

Produces a **structured test-case suite** for one locked API. Drive the model through **four technique steps** separately; merge into one table afterward. Target **≥ 35** cases per API.

After each generation step → log with `ai-audit-report` (template from HW5).

## Inputs (required)

- Endpoint(s) + FR id (from `23127152-hw6/PHASE0_PLANNING.md`)
- `api_specification.md` excerpt for that API
- SEC-01…07 from root `README.md`
- Output path: `23127152-hw6/test-cases/API{n}_*/generated.md`

## Four generation steps (separate prompts)

### Step A — Domain partitions

For **every** request parameter / body field / path param / query:

- Valid partitions (normal, boundary)
- Invalid partitions (type, empty, null, missing, oversized, charset)
- Combinations that matter (e.g. search empty vs omitted)

### Step B — State transitions (if applicable)

- Order/status machines (FR-10 related surfaces on FR-11 detail)
- Resource lifecycle create→update→delete (FR-15)
- Illegal transitions / cancel rules when relevant

Skip with an explicit “N/A” note for pure read-list APIs (FR-05) and compensate with more domain/security cases.

### Step C — Security (SEC-01…07)

Map applicable SECs to concrete HTTP cases:

| SEC | Typical probes |
|-----|----------------|
| SEC-02 | Missing / malformed / expired JWT |
| SEC-03 | User token on admin-only mutation |
| SEC-05 | SQLi / injection in query or body |
| SEC-06 | Privilege field tampering |
| — | IDOR / horizontal access (esp. `GET /api/orders/:id`) |

### Step D — Schema validation

- Status code
- Content-Type
- Required JSON fields / types
- Array vs object
- Error body shape on failures

## Output format

Use [templates/generated-tc-template.md](templates/generated-tc-template.md).

ID convention:

| API | Prefix |
|-----|--------|
| FR-05 | `TC-A1-###` |
| FR-11 | `TC-B2-###` |
| FR-15 | `TC-C3-###` |

Categories: `Domain` | `State` | `Security` | `Schema` | `Robustness`

## Self-review checklist

- [ ] ≥ 35 rows
- [ ] Every parameter has ≥1 valid and ≥1 invalid domain case
- [ ] Security section cites SEC ids in Description
- [ ] Schema cases assert fields, not only HTTP 200
- [ ] Prompts were **stepwise** (A→B→C→D), not one shot
- [ ] `ai-audit-report` entries written for each step

## Common mistakes

- Only happy-path 200 cases
- Security as vague “try SQL injection” without payload + expected behavior
- Ignoring auth differences between `my-orders` (JWT) and `orders/:id` (no auth)
