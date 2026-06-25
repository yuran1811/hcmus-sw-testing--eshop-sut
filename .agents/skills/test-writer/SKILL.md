---
name: test-writer
description: Designs test cases using Equivalence Partitioning (EP) and Boundary Value Analysis (BVA) techniques, ensuring Error Isolation and Test Case Reduction, and outputs structured test cases and audit logs.
---

# Test Case Writer Skill

This skill guides the agent in systematically designing, reducing, and documenting test cases using Equivalence Partitioning (EP) and Boundary Value Analysis (BVA) based on software specifications, adhering to the class lecture guidelines.

## 1. Input Schema

When asked to design test cases for a feature, first ensure the following details are gathered or extracted from the specification:

```markdown
### Feature Specification Schema
- **Feature Name**: [Name of the feature]
- **Inputs**:
  - `[Input Name 1]`: { Type: [Type], Valid Range: [Range/Values], Constraints: [Constraints], Default: [Default] }
  - `[Input Name 2]`: ...
- **Outputs**:
  - `[Output Name 1]`: { Type: [Type], Expected Values / Formulas: [Formulas/Logic] }
- **Business Rules & Calculations**:
  - [Rule 1: e.g., how inputs combine to calculate output]
  - [Rule 2: e.g., discount tiers, capacity limits, preconditions]
```

---

## 2. Unified EP & BVA Analysis Guidelines

Follow these steps to analyze inputs/outputs and design test cases:

### Step 1: Identify Partitions (Equivalence Partitioning - EP)
1. List all inputs and outputs.
2. For each, divide the value domain into:
   - **Valid Partitions (VP)**: Values that the system should process normally.
   - **Invalid Partitions (IP)**: Values that the system should reject or handle as errors.
3. Assign a unique ID to each partition (e.g., `EP-IN-[Param]-[No]` or `EP-IN-[Param]-[No]-INV` for inputs, `EP-OUT-[Param]-[No]` or `EP-OUT-[Param]-[No]-INV` for outputs).
4. Identify a **Representative Value** for each partition.

### Step 2: Identify Boundaries (Boundary Value Analysis - BVA)
Identify the boundaries of each partition. Apply these two BVA techniques:
- **2-Point BVA**: Use for simple valid/invalid transitions.
  - Test the **Boundary value itself (B)** (which is valid/on the boundary).
  - Test the **adjacent invalid value** ($B+1$ or $B-1$ depending on whether $B$ is an upper or lower boundary).
- **3-Point BVA**: Use for critical numeric ranges, capacities, or complex thresholds (e.g., pricing tiers, capacity limits, discount thresholds).
  - Test the values: **$B-1$, $B$, $B+1$**.
- Assign a unique ID to each boundary value (e.g., `BVA-[Param]-[No]`).

### Step 3: Derivation of Test Cases using the Error Isolation Principle
- **Error Isolation Principle (Nguyên tắc cô lập lỗi)**: At any one time, focus on testing exactly ONE partition or boundary value of ONE variable. All other variables must be set to their representative **valid** values.
- This guarantees that if a test case fails, the cause of the failure is isolated to the specific parameter/boundary under test.
- Map each test case to the specific EP or BVA ID it covers.

### Step 4: Test Case Reduction (Rút gọn TCs)
- Two test cases are considered duplicate if they have the **exact same inputs and expected outputs**.
- If duplicates are found, keep only one test case and merge their coverage mappings.
- Provide a clear traceability mapping showing which test cases cover which EPs and boundaries.

---

## 3. Output Artifacts

For every feature analyzed, generate the following outputs:

### 1. Design Report
The report must be in Markdown and separated into two distinct sections:
- **Section 1: Equivalence Partitioning (EP) Analysis**
  - Identification of inputs and outputs.
  - Table of Valid and Invalid partitions, Representative values, and Partition IDs.
- **Section 2: Boundary Value Analysis (BVA) Analysis**
  - Identification of boundaries for inputs/outputs.
  - Justification for using 2-Point vs 3-Point BVA.
  - Table of boundary values, BVA IDs, and expected behavior.
- **Section 3: Test Case Derivation & Reduction**
  - Table of initial test cases derived using Error Isolation.
  - Explanation of the Test Case Reduction process.
  - Traceability matrix mapping final Test Cases to EP/BVA IDs.

### 2. Test Cases
Save each test case as an individual Markdown file under:
`tests/test-cases/[feature-name]/TC-[FEATURE]-[NUMBER].md`

Use the following template:
```markdown
# TC-[FEATURE]-[NUMBER]: [Short Description]

## Requirement ID

[FR-ID]

## Module / Test type / Technique

[Module] / [Test Type] / [Techniques (e.g., Equivalence Partitioning, Boundary Value Analysis)]

## Preconditions

- [Precondition 1]
- [Precondition 2]

## Test data

| Parameter | Value |
| --- | --- |

## Test steps

1. [Step 1]
2. [Step 2]

## Expected result

[Expected Result]

## Status / Related bugs

Not Run / None
```

### 3. Bug Reports (if applicable)
If any ambiguities, inconsistencies, or defects are found in the specification during analysis, document them as bug reports.

---

## 4. AI Audit Log Auto-Extraction

At the very end of the session, the agent must automatically append or output an **AI Audit Log entry** in the exact format below:

```markdown
### AI Audit Log
- **Name of AI tool**: Antigravity (Gemini 3.5 Flash)
- **Date and time**: [YYYY-MM-DD HH:MM:SS TZ]
- **Prompt**: [Exact user input prompt or a faithful representation]
- **Output**: [A structured summary of the output, listing partitions analyzed, boundary values identified, test cases generated, and files written]
```
