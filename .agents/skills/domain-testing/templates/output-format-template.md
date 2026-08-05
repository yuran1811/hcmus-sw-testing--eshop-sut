- Write all explanatory text and test case content in **Vietnamese**. Keep section headers and column names in English.
- Each `Test Case ID` must follow the convention `TC-[MODULE]-[NNN]` (e.g. `TC-LOGIN-001`).

Structure the response as:

1. Explanation of how the technique was applied (Text format).
2. Partition definition table (Markdown Table with columns: Variable, Valid Classes, Invalid Classes).
3. Generate each Test Case as a separate Markdown code block. For each test case, use the following template exactly:

**File:** `tests/test-cases/[module]/TC-[MODULE]-[NNN].md`

```markdown
# TC-[MODULE]-[NNN]: [Short Description]

**Requirement ID:** [FR-NN]
**Test Type:** Domain Testing

### 1. Preconditions

- [List any prerequisites]

### 2. Test Data (Inputs)

- [List specific variables and their values]

### 3. Test Steps

1. [Step 1]
2. [Step 2]

### 4. Expected Result

- [What the system must do]
```
