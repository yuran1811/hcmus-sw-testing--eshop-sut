---
name: api-test-case-generator
description: Generate API test cases through a disciplined, step-by-step process (NEVER a single generic prompt) for the HW06 API Testing assignment. Use this skill whenever the user wants to "generate test cases", "create API test cases", mentions FR-01..FR-19, SEC-01..SEC-07, domain partitioning, state transitions, schema validation, or wants to build an "AI-driven API test generator". The skill walks through 4 generation rounds (domain partition → state transition → security → schema validation) and writes results directly into the standard test-case Excel file required for submission. This also serves as the design of the automated test generator required in section 7 of the assignment — ALWAYS remind the user that the diagram they submit must be hand-drawn, never generated directly by AI.
---

# API Test Case Generator (AI-driven, HW06 pipeline)

## Goal

Generate ≥ 35 test cases per API, in a disciplined way, covering all 4 required categories:

1. **Domain Partition** — every parameter (email format, password complexity, price > 0, pagination, string length...)
2. **State Transition** — especially FR-10: `pending → confirmed → shipping → delivered` + cancellation rules
3. **Security** — SEC-01 → SEC-07 (SQL injection, IDOR, role escalation, auth bypass, rate limiting, input sanitization — see full detail in the SUT's `api_specification.md`)
4. **Schema Validation** — response shape (status code, fields, types, required/optional) exactly matches the spec

**Mandatory principle:** NEVER use a single generic prompt like "generate all test cases for this API from the spec." Go through each round below separately — each round is one or more distinct AI turns — and EVERY turn must be logged with the `ai-audit-logger` skill.

## Required input before starting

- Path/content of the `api_specification.md` from the `eshop-sut` repo (ask the user to provide it if not already available — never invent endpoints).
- The names of the 3 chosen APIs (1 per pool: A, B, C) and their FR numbers.
- For any API tied to FR-10 (order state machine) or any API with a lifecycle/status field, get the table of valid/invalid states first.

If the spec is missing, STOP and ask the user to provide the file/spec before proceeding — never guess endpoints.

## 4-round process (run sequentially, NEVER merged)

### Round 1 — Domain Partition

1. List every input parameter of the API (path, query, body, header) from the spec.
2. For EACH parameter, split into partitions: valid (lower bound, upper bound, typical value), invalid (empty, wrong type, too long/short, special characters, null/missing).
3. Read `references/domain_partition_checklist.md` for a detailed checklist per field type (email, password, price, id, pagination, string length...).
4. Generate one test case per partition — each test case is one row in the Excel file (use `scripts/init_test_case_excel.py` to initialize the file if it doesn't exist yet).

### Round 2 — State Transition (only for stateful APIs, especially FR-10)

1. Read `references/state_transition_fr10.md`.
2. Draw out (in text) the full valid-state graph and list EVERY invalid edge (invalid transition) — this is the source of test cases AI most commonly misses.
3. Generate test cases for: every valid transition, every INVALID transition (e.g. delivered → pending), and the cancellation rules for each state.

### Round 3 — Security (SEC-01 → SEC-07)

1. Read `references/security_checklist_sec01_07.md`.
2. For each SEC-xx, ask the AI: "How could this specific endpoint be vulnerable to SEC-xx, based on its actual spec (not generic theory)?" — ask about each SEC item separately, never combined.
3. Priorities: SQL/NoSQL injection on every text input, IDOR (accessing another user's resource by changing an ID), role escalation (regular user calling an admin endpoint), broken auth (expired/forged/missing token), rate limiting, mass assignment, sensitive info leaking in error responses.
4. This round is the one AI most often generates superficially — ALWAYS require the AI to give a concrete payload rather than a generic description.

### Round 4 — Schema Validation

1. For each test case from rounds 1-3, add a dedicated test case checking: correct status code, correct required response fields, correct data types, no missing/extra fields vs. the spec.
2. Read `references/schema_validation_guide.md` for how to write schema assertions in Postman (pm.test + tv4/ajv or pm.response.to.have.jsonSchema).

## After generating one API's test cases

- Verify total test case count ≥ 35, spread across all 4 categories above (don't dump everything into domain partition).
- Move immediately to the `test-case-auditor` skill to label VALID/INVALID/INCOMPLETE — NEVER submit this round's raw output directly.
- Log every AI turn with the `ai-audit-logger` skill right after asking, don't batch it at the end of the session (details get lost).

## Standard Excel test-case column format

Use `scripts/init_test_case_excel.py` to create/initialize the file with these columns:
`Test_ID | API | FR | Category (DomainPartition/StateTransition/Security/Schema) | SEC_Ref | Preconditions | Steps | Input | Expected_Result | Priority | Source (AI/Human) | Audit_Label (VALID/INVALID/INCOMPLETE) | Audit_Reason | Execution_Status (Pass/Fail/Blocked) | Notes`

Run:

```bash
python3 scripts/init_test_case_excel.py --api "FR-02 Login" --out testcases_api1.xlsx
```

The script creates the header row plus dropdown data validation for the Category/Source/Audit_Label/Execution_Status columns.

## Connection to section 7 (Agent Skill designing a test generator)

The 4-round pipeline above IS the design of an AI-driven test generator. When the user needs to submit the diagram + pseudocode for section 7:

- Pseudocode: base it directly on the 4 rounds above (input spec → loop through each round → validate coverage → emit test cases). You can help write detailed pseudocode.
- Diagram: ALWAYS remind the user that "the submitted diagram must be hand-drawn / self-designed in a drawing tool (draw.io, Excalidraw, or manually laid out Mermaid), and must NOT be generated directly by AI." You may suggest the blocks it should contain (Spec Parser → Partition Engine → State Machine Extractor → Security Rule Engine → Schema Validator → Test Case Emitter) so the user can draw it themselves, but never generate the diagram image file on the user's behalf.

## Note on report/output language

Any deliverable text you generate for this assignment (test case descriptions, the report, README, etc.) should be written in **Vietnamese**, since that is the submission language for this course. This skill's own instructions are in English, but its outputs are not.
