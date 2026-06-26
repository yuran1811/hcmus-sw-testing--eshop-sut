# Agent Skill: Domain Testing & Boundary Value Analysis — Test Case Writer

## Metadata

| Field      | Value                                                               |
| ---------- | ------------------------------------------------------------------- |
| Skill ID   | `domain-testing-writer`                                             |
| Version    | 1.0                                                                 |
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
| `FEATURE_NAME`  | Yes      | Human-readable feature name                                                   | `Đăng ký tài khoản`          |
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
   - Variable name (Vietnamese + English)
   - Data type (string, integer, email, password, etc.)
   - Constraints from SRS (min/max length, format, required/optional, allowed values)
   - Source (UI form field, API parameter, system-generated)
4. For each output, document:
   - Expected behavior on success
   - Expected behavior on failure (error messages, HTTP status codes)

**Output format**:

```markdown
### B1: Xác định Input & Output — {FEATURE_NAME}

#### Input Variables

| #   | Variable Name (VI) | Variable Name (EN) | Data Type | Constraints                    | Source  |
| --- | ------------------ | ------------------ | --------- | ------------------------------ | ------- |
| 1   | Họ Tên             | Full Name          | String    | Bắt buộc                       | UI Form |
| 2   | Email              | Email              | String    | Bắt buộc, format email, unique | UI Form |
| ... | ...                | ...                | ...       | ...                            | ...     |

#### Output Variables

| Condition        | Expected Output            |
| ---------------- | -------------------------- |
| All inputs valid | Success message + redirect |
| Invalid input X  | Error message describing X |
| ...              | ...                        |
```

---

#### Step 2 (B2): Identify Value Domains for Each Variable

**Objective**: For each input variable, define the complete set of equivalence classes (valid and invalid domains).

**Instructions for AI**:

1. For each input variable from B1:
   - Define **Valid Domain(s)**: all sets of values that should be accepted
   - Define **Invalid Domain(s)**: all sets of values that should be rejected
   - Identify **Boundary Values**: the edges between valid and invalid domains
2. Consider both **explicit constraints** (from SRS) and **implicit constraints** (common sense, data type limits)
3. Pay special attention to:
   - Empty/null values
   - Minimum and maximum lengths
   - Format requirements (email, phone, password patterns)
   - Special characters
   - Unicode/Vietnamese characters
   - SQL injection / XSS payloads (security testing)

**Output format**:

```markdown
### B2: Xác định miền giá trị — {FEATURE_NAME}

#### Variable: {Variable Name}

| #   | Domain Type | Equivalence Class    | Value Range / Description        | Expected |
| --- | ----------- | -------------------- | -------------------------------- | -------- |
| EC1 | Valid       | Normal valid value   | 8-255 chars, meets all rules     | Accept   |
| EC2 | Valid       | Minimum valid length | Exactly 8 chars                  | Accept   |
| EC3 | Invalid     | Empty string         | ""                               | Reject   |
| EC4 | Invalid     | Too short            | 1-7 chars                        | Reject   |
| EC5 | Invalid     | Missing uppercase    | lowercase + digit + special only | Reject   |
| ... | ...         | ...                  | ...                              | ...      |
```

---

#### Step 3 (B3): Select Representative Values

**Objective**: Choose concrete test data values that represent each equivalence class.

**Instructions for AI**:

1. For each equivalence class from B2, choose **at least one** representative value
2. For valid domains: choose a **typical/nominal** value (not boundary)
3. For boundary-related classes: choose the **exact boundary value**
4. For invalid domains: choose the **most likely to cause bugs** value
5. Ensure values are **realistic** (Vietnamese names, Vietnamese phone numbers, etc.)

**Output format**:

```markdown
### B3: Giá trị đại diện — {FEATURE_NAME}

#### Variable: {Variable Name}

| #   | EC Reference        | Representative Value | Rationale               |
| --- | ------------------- | -------------------- | ----------------------- |
| 1   | EC1 (Valid normal)  | `Nguyen Van A`       | Typical Vietnamese name |
| 2   | EC2 (Valid min)     | `NguyenVA`           | Shortest valid name     |
| 3   | EC3 (Invalid empty) | `` (empty)           | Boundary: no input      |
| ... | ...                 | ...                  | ...                     |
```

---

#### Step 4 (B4): Design Test Cases

**Objective**: Create test cases using the **fault isolation principle** — at any given time, only ONE variable is tested with an invalid/boundary value while ALL other variables use valid nominal values.

**Instructions for AI**:

1. **Base Test Case (All Valid)**: Create one TC with all variables set to valid nominal values → Expected: Success
2. **Single-fault Test Cases**: For each invalid equivalence class of each variable:
   - Set the target variable to the invalid representative value
   - Set ALL other variables to their valid nominal values
   - Expected result: specific error related to the target variable
3. **Naming convention**: `TC-{FEATURE_SLUG}-{NNN}` (e.g., `TC-REGISTER-001`)
4. Generate EACH test case as a separate `.md` file in `{OUTPUT_DIR}`

**Key principle (Nguyên tắc cô lập lỗi)**:

> Tại một thời điểm, chỉ quan tâm đến miền giá trị của 1 biến. Các biến khác lấy giá trị trong miền hợp lệ (nominal) của nó.

**Test Case file format**:

```markdown
# TC-{FEATURE_SLUG}-{NNN}: {Test case title in Vietnamese}

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

## Status / Related bugs

Not Run / None
```

---

#### Step 5 (B5): Reduce/Consolidate Test Cases

**Objective**: Eliminate duplicate test cases.

**Instructions for AI**:

1. Two test cases are **duplicates** if and only if:
   - ALL input values are identical AND
   - ALL expected outputs are identical
2. If duplicates exist, keep only ONE and document which were removed
3. Create a summary table of final test cases

**Output format**:

```markdown
### B5: Rút gọn Test Cases — {FEATURE_NAME}

#### Removed duplicates

| Removed TC | Duplicate of | Reason                         |
| ---------- | ------------ | ------------------------------ |
| TC-XXX-010 | TC-XXX-003   | Same input and expected output |

#### Final Test Case Summary

| #   | TC ID      | Description      | Technique | Expected        |
| --- | ---------- | ---------------- | --------- | --------------- |
| 1   | TC-XXX-001 | All valid inputs | DT        | Pass            |
| 2   | TC-XXX-002 | Empty name       | DT        | Fail - required |
| ... | ...        | ...              | ...       | ...             |
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
### BVA B1: Xác định Boundary Points — {FEATURE_NAME}

| #   | Variable            | Boundary Description | Boundary Value (B) | Valid Side            | Invalid Side              |
| --- | ------------------- | -------------------- | -----------------: | --------------------- | ------------------------- |
| 1   | Password length     | Minimum length       |                  8 | B (8 chars) = valid   | B-1 (7 chars) = invalid   |
| 2   | Phone number length | Minimum digits       |                 10 | B (10 digits) = valid | B-1 (9 digits) = invalid  |
| 3   | Phone number length | Maximum digits       |                 11 | B (11 digits) = valid | B+1 (12 digits) = invalid |
| ... | ...                 | ...                  |                ... | ...                   | ...                       |
```

---

#### BVA Step 2: Apply 3-Point BVA

**Instructions for AI**:

For each boundary B, create test cases for THREE values:

- `B - 1` (one unit below boundary)
- `B` (exactly at boundary)
- `B + 1` (one unit above boundary)

Each test case follows the same format as Domain Testing TCs but with technique = "BVA (3-point)".

**Output format**:

```markdown
### BVA B2: 3-Point Boundary Values — {FEATURE_NAME}

| #   | Variable        | B Value | B-1       | B-1 Expected | B         | B Expected | B+1       | B+1 Expected |
| --- | --------------- | ------- | --------- | ------------ | --------- | ---------- | --------- | ------------ |
| 1   | Password len    | 8       | 7 chars   | Reject       | 8 chars   | Accept     | 9 chars   | Accept       |
| 2   | Phone len (min) | 10      | 9 digits  | Reject       | 10 digits | Accept     | 11 digits | Accept       |
| 3   | Phone len (max) | 11      | 10 digits | Accept       | 11 digits | Accept     | 12 digits | Reject       |
```

---

#### BVA Step 3: Apply 2-Point BVA

**Instructions for AI**:

For each boundary B, test:

- `B` (the boundary itself — valid side)
- `B ± 1` (one step into the invalid side)

```markdown
### BVA B3: 2-Point Boundary Values — {FEATURE_NAME}

| #   | Variable              | Boundary (B)      | B Expected | Invalid Adjacent | Adjacent Expected |
| --- | --------------------- | ----------------- | ---------- | ---------------- | ----------------- |
| 1   | Password length (min) | 8 chars (valid)   | Accept     | 7 chars          | Reject            |
| 2   | Phone length (max)    | 11 digits (valid) | Accept     | 12 digits        | Reject            |
```

---

#### BVA Step 4: Generate BVA Test Cases

Create individual TC files for each BVA test point that is NOT already covered by Domain Testing TCs from Phase 1.

Use naming: `TC-{FEATURE_SLUG}-BVA-{NNN}`

---

### PHASE 3: GENERATE REPORTS

After all test cases are designed, generate two comprehensive reports:

#### Report 1: Domain Testing Report

Save to: `report/Domain_Testing_Report.md`

**Structure**:

```markdown
# Domain Testing Report — HW02

## Feature: {FEATURE_NAME} ({FEATURE_ID})

### B1: Xác định Input & Output

{Content from Step 1}

### B2: Xác định miền giá trị

{Content from Step 2}

### B3: Giá trị đại diện

{Content from Step 3}

### B4: Thiết kế Test Cases

{Summary table from Step 4}

### B5: Rút gọn Test Cases

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

### Xác định Boundary Points

{Content from BVA Step 1}

### 3-Point BVA

{Content from BVA Step 2}

### 2-Point BVA

{Content from BVA Step 3}

### BVA Test Cases

{Summary table from BVA Step 4}

---

{Repeat for each feature}
```

---

### PHASE 4: AI AUDIT LOGGING

**CRITICAL**: After completing ALL phases, the AI MUST append an audit entry to `report/AI_Audit_Report.md`.

**Entry format**:

```markdown
### Entry {N} — Domain Testing & BVA for {FEATURE_NAME}

| Field                      | Value                                                                        |
| -------------------------- | ---------------------------------------------------------------------------- |
| **AI Tool**                | {Tool name, e.g., Gemini 2.5 Pro, Claude Opus 4}                             |
| **Date/Time**              | {ISO 8601 timestamp}                                                         |
| **Task**                   | Domain Testing + BVA test case design for {FEATURE_ID}                       |
| **Feature**                | {FEATURE_NAME}                                                               |
| **Prompt Summary**         | Invoked `domain-testing-writer` skill with FEATURE_ID={FEATURE_ID}           |
| **Output Summary**         | Generated {N} Domain Testing TCs + {M} BVA TCs, covering {K} input variables |
| **Human Review Required**  | Yes — review all TCs for correctness and completeness                        |
| **Files Created/Modified** | {List of files}                                                              |
```

---

## Example: Applying This Skill to FR-01 (Đăng ký tài khoản)

### Quick walkthrough

1. **B1 — Inputs**: Họ Tên (string, required), Email (string, required, email format, unique), Mật khẩu (string, required, min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special), Xác nhận mật khẩu (string, required, must match)

2. **B2 — Domains**:
   - Họ Tên: Valid = non-empty string | Invalid = empty, null
   - Email: Valid = `user@domain.com` format, unique | Invalid = empty, no @, duplicate, no domain
   - Mật khẩu: Valid = 8+ chars with uppercase+lowercase+digit+special | Invalid = <8 chars, no uppercase, no lowercase, no digit, no special char
   - Xác nhận MK: Valid = matches Mật khẩu | Invalid = doesn't match, empty

3. **B3 — Representatives**:
   - Valid nominal name: `Nguyen Van A`
   - Valid email: `newuser@gmail.com`
   - Valid password: `Test1234!`
   - Invalid password (too short): `Te1!abc`
   - Invalid password (no uppercase): `test1234!`

4. **B4 — Test Cases** (fault isolation):
   - TC-REGISTER-001: All valid → Success
   - TC-REGISTER-002: Empty name, rest valid → Reject
   - TC-REGISTER-003: Invalid email format, rest valid → Reject
   - TC-REGISTER-004: Duplicate email, rest valid → Reject
   - TC-REGISTER-005: Password < 8 chars, rest valid → Reject
   - TC-REGISTER-006: Password no uppercase, rest valid → Reject
   - TC-REGISTER-007: Password no lowercase, rest valid → Reject
   - TC-REGISTER-008: Password no digit, rest valid → Reject
   - TC-REGISTER-009: Password no special char, rest valid → Reject
   - TC-REGISTER-010: Confirm password mismatch, rest valid → Reject

5. **BVA**:
   - Password length boundary at 8: test 7 chars (Reject), 8 chars (Accept), 9 chars (Accept)
   - Password special chars: test with each allowed special char (`@`, `$`, `!`, `%`, `*`, `?`, `&`)

---

## Tips for Human Reviewer

- [DO] Check that the AI identified ALL input variables from SRS
- [DO] Check that equivalence classes are **mutually exclusive and collectively exhaustive (MECE)**
- [DO] Check that the fault isolation principle is correctly applied
- [DO] Check that boundary values are at the EXACT boundary (not off by one)
- [DO] Check for missing negative test cases (SQL injection, XSS, extremely long inputs)
- [DO] Check that expected results match the SRS specification
- [DO NOT] Submit raw AI output without review
