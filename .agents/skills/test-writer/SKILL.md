# Agent Skill: Domain Testing & Boundary Value Analysis — Test Case Writer

## Metadata

| Field      | Value                                                               |
| ---------- | ------------------------------------------------------------------- |
| Skill ID   | `domain-testing-writer`                                             |
| Version    | 2.0                                                                 |
| Author     | AI Agent                                                            |
| Created    | 2026-06-26                                                          |
| Reusable   | Yes — works for any feature of EShop SUT or similar apps            |
| Techniques | Domain Testing (Equivalence Partitioning) + Boundary Value Analysis |

## Purpose

This skill guides an AI agent to systematically design test cases for a given feature using **Domain Testing** and **Boundary Value Analysis** techniques, following the exact methodology taught in the Software Testing course at HCMUS.

The AI must act as a **disciplined assistant** — NOT a black box. Every step must be explicit, traceable, and reviewable by the human tester.

---

## Prerequisites

Before invoking this skill, ensure:

1. **SRS document** is available at: `README.md` (root of the repository)
2. **API specification** is available at: `api_specification.md`
3. **Setup guide** is available at: `setup_guide.md`
4. The target **Feature ID** is specified (e.g., `FR-01`, `FR-07`, `FR-14`, `FR-20`)

---

## Input Parameters

| Parameter       | Required | Description                                                                   | Example                      |
| --------------- | -------- | ----------------------------------------------------------------------------- | ---------------------------- |
| `FEATURE_ID`    | Yes      | The Functional Requirement ID from SRS                                        | `FR-01`                      |
| `FEATURE_NAME`  | Yes      | Human-readable feature name                                                   | `User Registration`          |
| `POOL`          | Yes      | Feature pool (A/B/C/D)                                                        | `A`                          |
| `SRS_PATH`      | No       | Path to SRS document (default: `README.md`)                                   | `README.md`                  |
| `API_SPEC_PATH` | No       | Path to API spec (default: `api_specification.md`)                            | `api_specification.md`       |
| `OUTPUT_DIR`    | No       | Output directory for test cases (default: `tests/test-cases/{feature-slug}/`) | `tests/test-cases/register/` |

---

## Execution Workflow

### PHASE 1: DOMAIN TESTING (Equivalence Partitioning)

The AI MUST follow these 5 steps in order. Do NOT skip any step.

---

#### Step 1 (B1): Identify Input & Output Variables

**Objective**: Read the SRS and extract ALL input variables and expected outputs for the target feature.

**Instructions for AI**:

1. Read the SRS section for `{FEATURE_ID}` carefully
2. Read the corresponding API endpoint from `api_specification.md`
3. For each input variable, document:
   - Variable name
   - Data type (string, integer, email, password, etc.)
   - Constraints from SRS (min/max length, format, required/optional, allowed values)
   - Source (UI form field, API parameter, system-generated)
4. For each output variable, document:
   - Variable name
   - Data type
   - Description (what the output represents)

**Output format**:

```markdown
### B1: Identify Input & Output Variables — {FEATURE_NAME}

#### Input Variables

| #   | Variable Name | Data Type | Constraints            | Source  |
| --- | ------------- | --------- | ---------------------- | ------- |
| 1   | Full Name     | String    | Required               | UI Form |
| 2   | Email         | String    | Required, email format | UI Form |
| ... | ...           | ...       | ...                    | ...     |

#### Output Variables

| #   | Variable Name    | Data Type | Description                         |
| --- | ---------------- | --------- | ----------------------------------- |
| 1   | Response Status  | Integer   | HTTP status code (200, 400, 409...) |
| 2   | Response Message | String    | Success or error message            |
| ... | ...              | ...       | ...                                 |
```

---

#### Step 2 (B2): Identify Value Domains for Each Variable

**Objective**: For each input AND output variable, define the complete set of equivalence classes (valid and invalid domains).

**Instructions for AI**:

1. **For each INPUT variable** from B1:
   - Define **Valid Domain(s)**: all sets of values that should be accepted
   - Define **Invalid Domain(s)**: all sets of values that should be rejected
   - Identify **Boundary Values**: the edges between valid and invalid domains
2. **For each OUTPUT variable** from B1:
   - Define **Valid Domain(s)**: all expected output values/ranges on success
   - Define **Invalid/Error Domain(s)**: all expected output values/ranges on failure
3. Consider both **explicit constraints** (from SRS) and **implicit constraints** (common sense, data type limits)
4. Pay special attention to:
   - Empty/null values
   - Minimum and maximum lengths
   - Format requirements (email, phone, password patterns)
   - Special characters
   - Unicode characters
   - SQL injection / XSS payloads (security testing)

**Output format**:

```markdown
### B2: Identify Value Domains — {FEATURE_NAME}

#### Input Variable: {Variable Name}

| #   | Domain Type | Equivalence Class    | Value Range / Description        | Expected |
| --- | ----------- | -------------------- | -------------------------------- | -------- |
| EC1 | Valid       | Normal valid value   | 8-255 chars, meets all rules     | Accept   |
| EC2 | Valid       | Minimum valid length | Exactly 8 chars                  | Accept   |
| EC3 | Invalid     | Empty string         | ""                               | Reject   |
| EC4 | Invalid     | Too short            | 1-7 chars                        | Reject   |
| EC5 | Invalid     | Missing uppercase    | lowercase + digit + special only | Reject   |
| ... | ...         | ...                  | ...                              | ...      |

#### Output Variable: {Variable Name}

| #   | Domain Type | Equivalence Class    | Value Range / Description | Triggered By           |
| --- | ----------- | -------------------- | ------------------------- | ---------------------- |
| OC1 | Valid       | Success response     | HTTP 200 / 201            | All inputs valid       |
| OC2 | Error       | Validation error     | HTTP 400                  | Invalid input format   |
| OC3 | Error       | Conflict / duplicate | HTTP 409                  | Duplicate unique field |
| ... | ...         | ...                  | ...                       | ...                    |
```

---

#### Step 3 (B3): Select Representative Values

**Objective**: Choose concrete test data values that represent each equivalence class.

**Instructions for AI**:

1. For each equivalence class from B2 (both input and output), choose **at least one** representative value
2. For valid domains: choose a **typical/nominal** value (not boundary)
3. For boundary-related classes: choose the **exact boundary value**
4. For invalid domains: choose the **most likely to cause bugs** value
5. Ensure values are **realistic** (real-looking names, emails, phone numbers, etc.)

**Output format**:

```markdown
### B3: Select Representative Values — {FEATURE_NAME}

#### Input Variable: {Variable Name}

| #   | EC Reference        | Representative Value | Rationale           |
| --- | ------------------- | -------------------- | ------------------- |
| 1   | EC1 (Valid normal)  | `Nguyen Van A`       | Typical name        |
| 2   | EC2 (Valid min)     | `NguyenVA`           | Shortest valid name |
| 3   | EC3 (Invalid empty) | `` (empty)           | Boundary: no input  |
| ... | ...                 | ...                  | ...                 |

#### Output Variable: {Variable Name}

| #   | OC Reference         | Representative Value | Rationale                   |
| --- | -------------------- | -------------------- | --------------------------- |
| 1   | OC1 (Success)        | HTTP 200             | Normal success response     |
| 2   | OC2 (Validation err) | HTTP 400             | Standard validation failure |
| ... | ...                  | ...                  | ...                         |
```

---

#### Step 4 (B4): Enumerate Partition Scenarios

**Objective**: For **every** equivalence class (EC) and output class (OC) from B2, write out the full scenario that triggers it. This step produces a complete list of partition scenarios — NOT yet test cases.

**Instructions for AI**:

1. **One row per EC**: For each input equivalence class from B2, describe:
   - Which variable takes the EC's representative value
   - What values the other variables take (always valid nominal)
   - What the expected output is (mapped to the corresponding OC)
2. **One row per OC**: For each output equivalence class from B2, describe:
   - Which input condition triggers this output class
   - What the full input scenario looks like
   - What the expected output is
3. If a feature has 10 ECs and 7 OCs, this table should have **17 rows**.
4. Apply the **fault isolation principle**: at any given time, only ONE input variable takes a non-nominal value.

**Key principle (Fault Isolation)**:

> At any given time, focus on the value domain of ONE variable only. All other variables take their valid (nominal) values.

**Output format**:

```markdown
### B4: Enumerate Partition Scenarios — {FEATURE_NAME}

Nominal values: {Variable 1} = {nominal value}, {Variable 2} = {nominal value}, ...

#### Input Partition Scenarios

| #   | Partition | Variable Tested | Test Value | Other Variables | Expected Output (OC) | Expected Result |
| --- | --------- | --------------- | ---------- | --------------- | -------------------- | --------------- |
| 1   | EC1       | Variable 1      | {value}    | all nominal     | OC1, OC3             | Accept          |
| 2   | EC2       | Variable 1      | {value}    | all nominal     | OC2, OC4             | Reject          |
| ... | ...       | ...             | ...        | ...             | ...                  | ...             |

#### Output Partition Scenarios

| #   | Partition | Output Description | Triggering Input Condition   | Same As Input Scenario |
| --- | --------- | ------------------ | ---------------------------- | ---------------------- |
| 1   | OC1       | Success response   | All inputs valid (EC1 + EC6) | Scenario #1            |
| 2   | OC2       | Validation error   | Any invalid input            | Scenarios #2-#10       |
| ... | ...       | ...                | ...                          | ...                    |
```

---

#### Step 5 (B5): Consolidate into Test Cases

**Objective**: Review all partition scenarios from B4. Merge scenarios that share identical test data and identical expected results into a single test case. The result is the final set of test cases.

**Instructions for AI**:

1. Compare ALL scenarios from B4 (both input and output)
2. Two scenarios are **duplicates** if and only if:
   - ALL input values are identical AND
   - ALL expected outputs are identical
3. **Merge duplicates**: keep one test case and note all ECs/OCs it covers
4. **Generate test case files**: Each surviving unique scenario becomes a `.md` file in `{OUTPUT_DIR}`
5. **Naming convention**: `TC-{FEATURE_SLUG}-{NNN}` (e.g., `TC-REGISTER-001`)

**Test Case file format**:

```markdown
# TC-{FEATURE_SLUG}-{NNN}: {Test case title}

## Requirement ID

{FEATURE_ID}

## Module / Test type / Technique

{Feature Name} / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- {List all preconditions}

## Test data

| Field        | Value   |
| ------------ | ------- |
| {Variable 1} | {Value} |
| {Variable 2} | {Value} |
| ...          | ...     |

## Test steps

1. {Step 1}
2. {Step 2}
3. ...

## Expected result

{Detailed expected result, including error messages if applicable}

## EC / Partition Covered

{List ALL equivalence classes this TC covers, e.g., "EC1 + EC6 + OC1 + OC3"}

## Status / Related bugs

Not Run / None
```

**Summary output format**:

```markdown
### B5: Consolidate into Test Cases — {FEATURE_NAME}

#### Consolidation Table

| Scenario(s) Merged              | Reason                              | Resulting TC |
| ------------------------------- | ----------------------------------- | ------------ |
| EC1 (#1) + EC6 (#6) + OC1 + OC3 | Identical test data and output      | TC-XXX-001   |
| OC2                             | Already covered by scenarios #2-#10 | (no new TC)  |

#### Removed Duplicates

| Removed Scenario | Merged Into | Reason                         |
| ---------------- | ----------- | ------------------------------ |
| EC6 (#6)         | EC1 (#1)    | Same input and expected output |
| OC1              | EC1 (#1)    | Same input and expected output |
| OC3              | EC1 (#1)    | Same input and expected output |

#### Final Test Case Summary

| #   | TC ID      | Description      | Technique | EC/OC Covered      | Expected        |
| --- | ---------- | ---------------- | --------- | ------------------ | --------------- |
| 1   | TC-XXX-001 | All valid inputs | DT        | EC1, EC5, OC1, OC3 | Pass            |
| 2   | TC-XXX-002 | Empty name       | DT        | EC3, OC2, OC4      | Fail - required |
| ... | ...        | ...              | ...       | ...                | ...             |
```

---

### PHASE 2: BOUNDARY VALUE ANALYSIS (BVA)

After completing Phase 1, apply BVA to add additional boundary-specific test cases.

---

#### BVA Step 1: Identify All Boundaries

**Instructions for AI**:

1. From the equivalence classes in B2, identify ALL boundary points
2. A boundary is a point where the expected behavior changes (valid ↔ invalid)
3. Document each boundary with its exact value

**Output format**:

```markdown
### BVA Step 1: Identify Boundary Points — {FEATURE_NAME}

| #   | Variable            | Boundary Description | Boundary Value (B) | Valid Side            | Invalid Side              |
| --- | ------------------- | -------------------- | -----------------: | --------------------- | ------------------------- |
| 1   | Password length     | Minimum length       |                  8 | B (8 chars) = valid   | B-1 (7 chars) = invalid   |
| 2   | Phone number length | Minimum digits       |                 10 | B (10 digits) = valid | B-1 (9 digits) = invalid  |
| 3   | Phone number length | Maximum digits       |                 11 | B (11 digits) = valid | B+1 (12 digits) = invalid |
| ... | ...                 | ...                  |                ... | ...                   | ...                       |
```

---

#### BVA Step 2: Enumerate 3-Point BVA Scenarios

**Instructions for AI**:

For each boundary B, enumerate **three** test scenarios with full detail (like Domain Testing B4):

- `B - 1` (one unit below boundary)
- `B` (exactly at boundary)
- `B + 1` (one unit above boundary)

Apply the fault isolation principle: only ONE variable takes the boundary value, all others take valid nominal values.

**Output format**:

```markdown
### BVA Step 2: 3-Point BVA Scenarios — {FEATURE_NAME}

Nominal values: {Variable 1} = {nominal value}, {Variable 2} = {nominal value}, ...

| #   | Boundary     | Test Point | Variable Tested | Test Value | Other Variables | Expected Result |
| --- | ------------ | ---------- | --------------- | ---------- | --------------- | --------------- |
| 1   | Var1 Min = 8 | B-1        | Variable 1      | 7          | all nominal     | Reject          |
| 2   | Var1 Min = 8 | B          | Variable 1      | 8          | all nominal     | Accept          |
| 3   | Var1 Min = 8 | B+1        | Variable 1      | 9          | all nominal     | Accept          |
| ... | ...          | ...        | ...             | ...        | ...             | ...             |
```

---

#### BVA Step 3: Enumerate 2-Point BVA Scenarios

**Instructions for AI**:

For each boundary B, enumerate **two** test scenarios with full detail:

- `B` (the boundary itself — valid side)
- `B ± 1` (one step into the invalid side)

Apply the fault isolation principle: only ONE variable takes the boundary value, all others take valid nominal values.

**Output format**:

```markdown
### BVA Step 3: 2-Point BVA Scenarios — {FEATURE_NAME}

Nominal values: {Variable 1} = {nominal value}, {Variable 2} = {nominal value}, ...

| #   | Boundary     | Test Point    | Variable Tested | Test Value | Other Variables | Expected Result |
| --- | ------------ | ------------- | --------------- | ---------- | --------------- | --------------- |
| 1   | Var1 Min = 8 | B (valid)     | Variable 1      | 8          | all nominal     | Accept          |
| 2   | Var1 Min = 8 | B-1 (invalid) | Variable 1      | 7          | all nominal     | Reject          |
| ... | ...          | ...           | ...             | ...        | ...             | ...             |
```

---

#### BVA Step 4: Compare, Consolidate, and Generate BVA Test Cases

**Instructions for AI**:

1. **Compare** all scenarios from Step 2 (3-Point) and Step 3 (2-Point)
2. Identify **overlapping** scenarios — where both techniques test the same variable with the same value and the same expected result
3. **Merge** overlapping scenarios: keep one entry, note it is covered by both techniques
4. Also check against **Domain Testing TCs** from Phase 1 — if any BVA scenario has the same test data and expected result as an existing DT test case, mark it as already covered
5. The remaining unique scenarios become the final BVA test cases
6. **Generate test case files**: Each unique BVA scenario becomes a `.md` file in `{OUTPUT_DIR}`
7. **Naming convention**: `TC-{FEATURE_SLUG}-BVA-{NNN}`

**Test Case file format** (same structure as Domain Testing):

```markdown
# TC-{FEATURE_SLUG}-BVA-{NNN}: {Test case title}

## Requirement ID

{FEATURE_ID}

## Module / Test type / Technique

{Feature Name} / Functional / Boundary Value Analysis ({3-point / 2-point / both})

## Preconditions

- {List all preconditions}

## Test data

| Field        | Value   |
| ------------ | ------- |
| {Variable 1} | {Value} |
| {Variable 2} | {Value} |
| ...          | ...     |

## Test steps

1. {Step 1}
2. {Step 2}
3. ...

## Expected result

{Detailed expected result, including error messages if applicable}

## BVA Coverage

{Which boundary this TC tests, which technique(s) it covers, e.g., "a Min boundary, B-1 = -100, covered by 3-Point and 2-Point"}

## Status / Related bugs

Not Run / None
```

**Summary output format**:

```markdown
### BVA Step 4: Consolidate BVA Test Cases — {FEATURE_NAME}

#### Overlap Between 3-Point and 2-Point

| 3-Point Scenario # | 2-Point Scenario # | Variable   | Test Value | Overlap Reason                   |
| ------------------ | ------------------ | ---------- | ---------- | -------------------------------- |
| #2 (B at min)      | #1 (B valid)       | Variable 1 | 8          | Same value, same expected result |
| #1 (B-1 at min)    | #2 (B-1 invalid)   | Variable 1 | 7          | Same value, same expected result |

#### Overlap with Domain Testing TCs

| BVA Scenario # | DT Test Case | Variable   | Test Value | Overlap Reason                     |
| -------------- | ------------ | ---------- | ---------- | ---------------------------------- |
| (none or list) | TC-XXX-NNN   | Variable 1 | value      | Same test data and expected result |

#### Final BVA Test Case Summary

| #   | TC ID          | Description     | Technique(s)      | Boundary      | Expected |
| --- | -------------- | --------------- | ----------------- | ------------- | -------- |
| 1   | TC-XXX-BVA-001 | Var1 at min - 1 | 3-Point + 2-Point | Var1 Min, B-1 | Reject   |
| 2   | TC-XXX-BVA-002 | Var1 at min     | 3-Point + 2-Point | Var1 Min, B   | Accept   |
| 3   | TC-XXX-BVA-003 | Var1 above min  | 3-Point only      | Var1 Min, B+1 | Accept   |
| ... | ...            | ...             | ...               | ...           | ...      |
```

---

### PHASE 3: GENERATE REPORTS

After all test cases are designed, generate two comprehensive reports:

#### Report 1: Domain Testing Report

Save to: `report/Domain_Testing_Report.md`

**Structure**:

```markdown
# Domain Testing Report — HW02

## Feature: {FEATURE_NAME} ({FEATURE_ID})

### B1: Identify Input & Output Variables

{Content from Step 1}

### B2: Identify Value Domains

{Content from Step 2}

### B3: Select Representative Values

{Content from Step 3}

### B4: Enumerate Partition Scenarios

{Content from Step 4}

### B5: Consolidate into Test Cases

{Content from Step 5}

---

{Repeat for each feature}
```

#### Report 2: Boundary Value Analysis Report

Save to: `report/Boundary_Value_Analysis_Report.md`

**Structure**:

```markdown
# Boundary Value Analysis Report — HW02

## Feature: {FEATURE_NAME} ({FEATURE_ID})

### BVA Step 1: Identify Boundary Points

{Content from BVA Step 1}

### BVA Step 2: 3-Point BVA Scenarios

{Content from BVA Step 2 — full enumeration table}

### BVA Step 3: 2-Point BVA Scenarios

{Content from BVA Step 3 — full enumeration table}

### BVA Step 4: Consolidate BVA Test Cases

{Content from BVA Step 4 — overlap comparison + final TC summary}

---

{Repeat for each feature}
```

---

### PHASE 4: LINT & FORMAT

After generating the test case files and reports, it is important to format the Markdown files so that tables and content are neatly aligned.

**Instructions for AI**:

Run the following command to format all markdown files that were just created or modified:

```bash
npx prettier --write "tests/test-cases/**/*.md" "report/*.md"
```

---

### PHASE 5: AI AUDIT LOGGING

**CRITICAL**: After completing ALL phases, the AI MUST append an audit entry to `report/AI_Audit_Report.md`.

**Entry format**:

```markdown
### Entry {N} — Domain Testing & BVA for {FEATURE_NAME}

| Field                      | Value                                                                                             |
| -------------------------- | ------------------------------------------------------------------------------------------------- |
| **AI Tool**                | {Tool name, e.g., Gemini 2.5 Pro, Claude Opus 4}                                                  |
| **Date/Time**              | {ISO 8601 timestamp}                                                                              |
| **Task**                   | Domain Testing + BVA test case design for {FEATURE_ID}                                            |
| **Feature**                | {FEATURE_NAME}                                                                                    |
| **Prompt Summary**         | User Prompt: "{user_prompt}" + Invoked `domain-testing-writer` skill with FEATURE_ID={FEATURE_ID} |
| **Output Summary**         | Generated {N} Domain Testing TCs + {M} BVA TCs, covering {K} input variables                      |
| **Human Review Required**  | Yes — review all TCs for correctness and completeness                                             |
| **Files Created/Modified** | {List of files}                                                                                   |
```

---

## Example: Applying This Skill to FR-01 (User Registration)

### Quick walkthrough

1. **B1 — Variables**:
   - Inputs: Full Name (string, required), Email (string, required, email format, unique), Password (string, required, min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special), Confirm Password (string, required, must match)
   - Outputs: Response Status (integer), Response Message (string)

2. **B2 — Domains (Input + Output)**:
   - Full Name: Valid = non-empty string | Invalid = empty, null
   - Email: Valid = `user@domain.com` format, unique | Invalid = empty, no @, duplicate, no domain
   - Password: Valid = 8+ chars with uppercase+lowercase+digit+special | Invalid = <8 chars, no uppercase, no lowercase, no digit, no special char
   - Confirm Password: Valid = matches Password | Invalid = doesn't match, empty
   - Response Status: Valid = 200/201 (success) | Error = 400 (validation), 409 (conflict)
   - Response Message: Valid = success message | Error = field-specific error message

3. **B3 — Representatives**:
   - Valid nominal name: `Nguyen Van A`
   - Valid email: `newuser@gmail.com`
   - Valid password: `Test1234!`
   - Invalid password (too short): `Te1!abc`
   - Invalid password (no uppercase): `test1234!`

4. **B4 — Test Cases** (one per partition, fault isolation):
   - TC-REGISTER-001: All valid → EC1+EC5+EC9+EC13 → Success (200)
   - TC-REGISTER-002: Empty name, rest valid → EC3 → Reject (400)
   - TC-REGISTER-003: Invalid email format, rest valid → EC6 → Reject (400)
   - TC-REGISTER-004: Duplicate email, rest valid → EC7 → Reject (409)
   - TC-REGISTER-005: Password < 8 chars, rest valid → EC10 → Reject (400)
   - TC-REGISTER-006: Password no uppercase, rest valid → EC11 → Reject (400)
   - TC-REGISTER-007: Password no lowercase, rest valid → EC12 → Reject (400)
   - TC-REGISTER-008: Password no digit, rest valid → EC13 → Reject (400)
   - TC-REGISTER-009: Password no special char, rest valid → EC14 → Reject (400)
   - TC-REGISTER-010: Confirm password mismatch, rest valid → EC15 → Reject (400)

5. **B5 — Consolidation**:
   - Check if any TCs share identical input data AND expected output → merge if found
   - Otherwise, keep all TCs

6. **BVA**:
   - Password length boundary at 8: test 7 chars (Reject), 8 chars (Accept), 9 chars (Accept)
   - Password special chars: test with each allowed special char (`@`, `$`, `!`, `%`, `*`, `?`, `&`)

---

## Tips for Human Reviewer

- [DO] Check that the AI identified ALL input AND output variables from SRS
- [DO] Check that equivalence classes are **mutually exclusive and collectively exhaustive (MECE)**
- [DO] Check that EVERY equivalence class has at least one corresponding test case
- [DO] Check that the fault isolation principle is correctly applied
- [DO] Check that boundary values are at the EXACT boundary (not off by one)
- [DO] Check for missing negative test cases (SQL injection, XSS, extremely long inputs)
- [DO] Check that expected results match the SRS specification
- [DO] Verify that output domains correctly map to input conditions
- [DO NOT] Submit raw AI output without review
