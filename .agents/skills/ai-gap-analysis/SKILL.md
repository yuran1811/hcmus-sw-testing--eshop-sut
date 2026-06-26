# Agent Skill: AI Gap Analysis

## Metadata

| Field    | Value                                                    |
| -------- | -------------------------------------------------------- |
| Skill ID | `ai-gap-analysis`                                        |
| Version  | 1.0                                                      |
| Author   | AI Agent                                                 |
| Created  | 2026-06-26                                               |
| Reusable | Yes — works for any feature of EShop SUT or similar apps |
| Purpose  | Analyze gaps in AI-generated test cases (HW02 §6.3)      |

## Purpose

This skill fulfills **HW02 Requirement 3 (AI Gap Analysis)**: If AI tools miss test cases or bugs, report them and explain why they were missed (prompt quality, tool limitations, or feature complexity).

The skill systematically compares AI-generated test cases against the SRS requirements to identify coverage gaps, then analyzes root causes and generates supplementary test cases.

---

## Prerequisites

1. **Domain Testing** and **BVA** test cases have been generated (using `test-writer` skill)
2. **Test execution** has been completed (using `test-runner` skill)
3. SRS document (`README.md`) is available
4. API specification (`api_specification.md`) is available

---

## Input Parameters

| Parameter      | Required | Description                                | Example                      |
| -------------- | -------- | ------------------------------------------ | ---------------------------- |
| `FEATURE_ID`   | Yes      | Feature to analyze                         | `FR-01`                      |
| `FEATURE_NAME` | Yes      | Human-readable feature name                | `Đăng ký tài khoản`          |
| `TC_DIR`       | No       | Directory containing test cases            | `tests/test-cases/register/` |
| `REPORT_DIR`   | No       | Directory for reports (default: `report/`) | `report/`                    |

---

## Execution Workflow

### PHASE 1: REQUIREMENTS EXTRACTION

#### Step 1: Extract All Testable Requirements

Read the SRS section for `{FEATURE_ID}` and create an exhaustive list of **testable requirements**.

Each testable requirement is a single, atomic, verifiable statement.

**Output format**:

```markdown
### Testable Requirements — {FEATURE_NAME} ({FEATURE_ID})

| #   | Req ID           | Testable Requirement (Vietnamese) | Testable Requirement (English) | Category         |
| --- | ---------------- | --------------------------------- | ------------------------------ | ---------------- |
| 1   | {FEATURE_ID}-R01 | {requirement in VI}               | {requirement in EN}            | Input Validation |
| 2   | {FEATURE_ID}-R02 | {requirement in VI}               | {requirement in EN}            | Business Logic   |
| 3   | {FEATURE_ID}-R03 | {requirement in VI}               | {requirement in EN}            | Security         |
| 4   | {FEATURE_ID}-R04 | {requirement in VI}               | {requirement in EN}            | GUI/UX           |
| ... | ...              | ...                               | ...                            | ...              |
```

**Categories to check**:

- **Input Validation**: Field constraints, data types, formats, required/optional
- **Business Logic**: State transitions, calculations, workflows
- **Security**: Authentication, authorization, injection, XSS
- **GUI/UX**: Language consistency, colors, layout, navigation, feedback
- **Error Handling**: Error messages, edge cases, system behavior under failure
- **Integration**: API contracts, data flow between frontend and backend
- **Performance**: Loading states, timeouts, concurrent users

---

### PHASE 2: COVERAGE MAPPING

#### Step 2: Map Existing Test Cases to Requirements

1. Read all `TC-*.md` files in `{TC_DIR}`
2. For each test case, identify which testable requirement(s) it covers
3. Build a coverage matrix

**Output format**:

```markdown
### Coverage Matrix — {FEATURE_NAME}

| Req ID           | Requirement   | Covered by TC(s)       | Coverage Status   |
| ---------------- | ------------- | ---------------------- | ----------------- |
| {FEATURE_ID}-R01 | {requirement} | TC-XXX-001, TC-XXX-003 | Covered           |
| {FEATURE_ID}-R02 | {requirement} | TC-XXX-005             | Covered           |
| {FEATURE_ID}-R03 | {requirement} | —                      | NOT Covered       |
| {FEATURE_ID}-R04 | {requirement} | TC-XXX-002             | Partially Covered |
| ...              | ...           | ...                    | ...               |

### Coverage Summary

| Metric                      | Value                    |
| --------------------------- | ------------------------ |
| Total testable requirements | {N}                      |
| Fully covered               | {X} ({X/N \* 100}%)      |
| Partially covered           | {Y} ({Y/N \* 100}%)      |
| Not covered                 | {Z} ({Z/N \* 100}%)      |
| Overall coverage rate       | {(X + 0.5*Y) / N * 100}% |
```

---

### PHASE 3: GAP IDENTIFICATION

#### Step 3: Identify Specific Gaps

For each requirement with NOT Covered or Partially Covered status, document:

```markdown
### Identified Gaps — {FEATURE_NAME}

#### Gap {N}: {Short description}

| Field               | Value                                             |
| ------------------- | ------------------------------------------------- |
| **Requirement**     | {FEATURE_ID}-R{XX}: {requirement text}            |
| **Coverage Status** | Not Covered / Partially Covered                   |
| **Gap Description** | {What is missing — specific scenarios not tested} |
| **Severity**        | Critical / Major / Minor                          |
| **Impact**          | {What bugs could be missed due to this gap}       |
```

---

### PHASE 4: ROOT CAUSE ANALYSIS

#### Step 4: Analyze Why AI Missed These Gaps

For each identified gap, determine the **root cause** of the AI's failure to cover it.

**Root Cause Categories**:

| Category                 | Code | Description                                                             | Example                                                  |
| ------------------------ | ---- | ----------------------------------------------------------------------- | -------------------------------------------------------- |
| Prompt Quality           | PQ   | The prompt was too vague, missing context, or didn't mention the aspect | Not asking about Vietnamese-specific validation          |
| Tool Limitation          | TL   | The AI tool cannot perform this type of analysis                        | Cannot test UI interactions, cannot run code             |
| Feature Complexity       | FC   | The requirement involves complex logic that AI struggles with           | State machine transitions, coupon calculation edge cases |
| Implicit Requirement     | IR   | The requirement is implied but not explicitly stated in SRS             | Security testing, accessibility, performance             |
| Cross-Feature Dependency | CD   | The test requires interaction between multiple features                 | Cart + Coupon + Checkout integration                     |
| Domain Knowledge         | DK   | Requires Vietnamese market/cultural knowledge AI lacks                  | Vietnamese phone format, Vietnamese name patterns        |

**Output format**:

```markdown
### Root Cause Analysis — {FEATURE_NAME}

| #   | Gap               | Root Cause   | Category | Explanation                         |
| --- | ----------------- | ------------ | -------- | ----------------------------------- |
| 1   | {gap description} | {root cause} | PQ       | {explanation of why AI missed this} |
| 2   | {gap description} | {root cause} | TL       | {explanation}                       |
| 3   | {gap description} | {root cause} | FC       | {explanation}                       |
| ... | ...               | ...          | ...      | ...                                 |

### Root Cause Distribution

| Category                      | Count | Percentage |
| ----------------------------- | ----- | ---------- |
| Prompt Quality (PQ)           | {n}   | {%}        |
| Tool Limitation (TL)          | {n}   | {%}        |
| Feature Complexity (FC)       | {n}   | {%}        |
| Implicit Requirement (IR)     | {n}   | {%}        |
| Cross-Feature Dependency (CD) | {n}   | {%}        |
| Domain Knowledge (DK)         | {n}   | {%}        |
```

---

### PHASE 5: SUPPLEMENTARY TEST CASES

#### Step 5: Generate Missing Test Cases

For each identified gap, create supplementary test cases to close the coverage gap.

1. Follow the same format as `test-writer` skill test cases
2. Use naming convention: `TC-{FEATURE_SLUG}-GAP-{NNN}`
3. Mark technique as "AI Gap Analysis — Supplementary"
4. Save to the same `{TC_DIR}` directory

```markdown
# TC-{FEATURE_SLUG}-GAP-{NNN}: {Test case title}

## Requirement ID

{FEATURE_ID} — Gap Analysis Supplementary

## Module / Test type / Technique

{Feature Name} / Functional / AI Gap Analysis — Supplementary

## Gap Reference

| Field                | Value               |
| -------------------- | ------------------- |
| Gap ID               | GAP-{NN}            |
| Root Cause           | {PQ/TL/FC/IR/CD/DK} |
| Original Miss Reason | {brief explanation} |

## Preconditions

- {preconditions}

## Test data

| Field | Value |
| ----- | ----- |
| ...   | ...   |

## Test steps

1. ...

## Expected result

{expected result}

## Status / Related bugs

Not Run / None
```

---

### PHASE 6: AI GAP ANALYSIS REPORT

#### Step 6: Compile the AI Gap Analysis Report

Append the analysis to the Domain Testing Report or create a dedicated section:

```markdown
## AI Gap Analysis — {FEATURE_NAME} ({FEATURE_ID})

### 1. Coverage Assessment

{Coverage matrix from Step 2}

### 2. Identified Gaps

{Gap details from Step 3}

### 3. Root Cause Analysis

{Root cause analysis from Step 4}

### 4. Supplementary Test Cases

| #   | TC ID          | Gap Reference | Description   | Root Cause |
| --- | -------------- | ------------- | ------------- | ---------- |
| 1   | TC-XXX-GAP-001 | GAP-01        | {description} | PQ         |
| 2   | TC-XXX-GAP-002 | GAP-02        | {description} | TL         |
| ... | ...            | ...           | ...           | ...        |

### 5. Recommendations for Future Prompts

Based on the gap analysis, the following improvements should be made when prompting AI for similar tasks:

| #   | Current Issue                | Recommended Improvement |
| --- | ---------------------------- | ----------------------- |
| 1   | {issue with current prompts} | {specific improvement}  |
| 2   | ...                          | ...                     |

### 6. Lessons Learned

{2-3 paragraph summary of what was learned about AI-assisted testing}
```

---

### PHASE 7: AI AUDIT LOGGING

Append audit entry to `report/AI_Audit_Report.md`:

```markdown
### Entry {N} — AI Gap Analysis for {FEATURE_NAME}

| Field              | Value                            |
| ------------------ | -------------------------------- |
| **AI Tool**        | {tool_name}                      |
| **Date/Time**      | {timestamp}                      |
| **Task**           | AI Gap Analysis for {FEATURE_ID} |
| **Bloom-AI Level** | G9.3 (Analyse)                   |

#### Prompt

Invoked `ai-gap-analysis` agent skill to identify coverage gaps
in AI-generated test cases for {FEATURE_ID}.

#### AI Output

- Extracted {N} testable requirements
- Current coverage: {X}% ({Y}/{N} requirements covered)
- Gaps identified: {Z}
- Root causes: {breakdown}
- Supplementary test cases generated: {W}

#### Human Review

| Aspect                | Detail  |
| --------------------- | ------- |
| Reviewed by           | {name}  |
| Additional gaps found | {count} |
| Agreement level       | {%}     |
```

---

## Common Gap Patterns for EShop SUT

The following are **common gaps** that AI frequently misses for EShop features. Use this checklist to validate coverage:

### Security Testing Gaps

- [ ] SQL injection in text fields (`' OR 1=1 --`)
- [ ] XSS in text fields (`<script>alert('xss')</script>`)
- [ ] CSRF attacks on state-changing operations
- [ ] JWT token manipulation (expired, modified, missing)
- [ ] Role escalation (user accessing admin endpoints)
- [ ] IDOR (accessing other users' data by changing IDs)

### Vietnamese Localization Gaps

- [ ] Vietnamese characters in names (diacritics: ă, â, ê, ô, ơ, ư, đ)
- [ ] Vietnamese phone numbers (10-11 digits starting with 0)
- [ ] Currency formatting (₫ with thousand separators)
- [ ] Vietnamese error messages consistency
- [ ] Vietnamese navigation labels

### GUI/UX Gaps (FR-21 to FR-24)

- [ ] Single `<h1>` per page
- [ ] Required field markers (`*`)
- [ ] Error message position (above submit button, not below)
- [ ] Step indicators for multi-step forms
- [ ] Navbar highlight for active page
- [ ] Cart badge with item count
- [ ] Logout label = "Đăng xuất" (not "Thoát")
- [ ] Breadcrumb on child pages
- [ ] Empty state illustrations
- [ ] Delete confirmation dialogs
- [ ] Toast notifications after actions
- [ ] Alt text on product images

### Boundary Edge Cases

- [ ] Empty string vs null vs undefined
- [ ] Maximum integer values
- [ ] Very long strings (>1000 characters)
- [ ] Unicode emoji in text fields
- [ ] Leading/trailing whitespace
- [ ] Double-byte characters

### State Machine Gaps (FR-10)

- [ ] All valid transitions tested
- [ ] All invalid transitions tested (should be rejected)
- [ ] Final states cannot transition
- [ ] User vs Admin permissions for each transition
- [ ] Concurrent state changes

---

## Tips for Human Reviewer

- [DO] Use the common gap patterns checklist above as a starting point
- [DO] Think about what a **real attacker or mischievous user** would try
- [DO] Consider **integration scenarios** between features
- [DO] Test with **real Vietnamese data** (not just ASCII)
- [DO] Be honest in root cause analysis — it shows learning
- [DO NOT] Just accept AI's gap analysis — think critically
- [DO NOT] Skip security testing gaps
