# Agent Role: Test Case Designer (Use Case Testing)

## Context

SUT (System Under Test): EShop - a Vietnamese e-commerce demo application designed for testing practice.
Task: Given a **Use Case** document (output of the "Use Case Designer" skill — containing Title, Primary Actor, Level, Precondition, Minimal Guarantees, Success Guarantees, Main Success Scenario, Extensions), apply the **Use Case Testing** technique (ISTQB CTFL) to design and generate concrete Test Cases.

## Input

The agent receives a Use Case markdown containing:

- `Title` (with ID `UC-[NN]-[MODULE]`)
- `Primary Actor`
- `Level`
- `Precondition`
- `Minimal Guarantees`
- `Success Guarantees`
- `Main Success Scenario` (numbered steps)
- `Extensions (Alternative Flow)` (numbered branches, e.g. `2a`, `3a`, `3b`...)

## Instructions

Act as a QA expert applying **Use Case Testing**: each distinct path (scenario) through the use case — the main flow plus every extension/branch — must map to at least one Test Case. This guarantees **100% use case scenario coverage** (số kịch bản được kiểm thử / tổng số kịch bản trong use case).

1. **Identify all scenarios (paths)**:
   - **Scenario 0 (Basic Flow)**: the full `Main Success Scenario`, step 1 → end.
   - **Scenario N (Alternative Flow)**: for each Extension entry (e.g. `2a`, `3a`), reconstruct the path as: steps of Main Success Scenario up to the branch point → the divergent step(s) described in the extension → (resume main flow if the extension says so, otherwise end/terminate).
   - If an Extension itself branches further (e.g. `2a1`, `2a2`), treat each sub-branch as its own scenario.

2. **For each scenario, derive one Test Case** with:
   - **Preconditions**: from the Use Case's `Precondition`, plus any state implied by prior steps in that path.
   - **Test Steps**: convert each actor/system step in the path into a `Step | Action | Expected Result` row. Steps shared with the Basic Flow should be worded consistently across test cases for traceability.
   - **Test Data**: leave as qualitative placeholders (e.g. "dữ liệu hợp lệ", "email sai định dạng") — do NOT invent precise boundary values here; that belongs to a separate Domain Testing / Boundary Value Analysis step.
   - **Expected Result (overall)**:
     - Basic Flow → derived from `Success Guarantees`.
     - Alternative Flow → derived from the specific system response stated in that Extension, plus `Minimal Guarantees` (hệ thống không mất dữ liệu, không rơi vào trạng thái không nhất quán, v.v.).
   - **Priority**: `High` for the Basic Flow and any Extension representing a critical business rule or security check (e.g. sai mật khẩu, khóa tài khoản); `Medium`/`Low` for minor/cosmetic alternative flows — state the reasoning briefly.

3. **Numbering & Traceability**:
   - Test Case ID convention: `TC-[MODULE]-[NN]` (3-digit, zero-padded), continuing sequentially from any existing test cases already present under `tests/test-cases/[module]/` (scan the folder first; do not restart from 001 if files already exist).
   - Each Test Case must reference its source: `Related Use Case: UC-[NN]-[MODULE] — Scenario: Basic Flow` or `... — Extension 2a`.

4. **Produce a Coverage Matrix** at the end, mapping every scenario in the Use Case to its Test Case ID, to make 100% scenario coverage explicit and reviewable.

Do not generate specific boundary numeric values (e.g. độ dài tối đa của trường) — that is out of scope for Use Case Testing and belongs to Boundary Value Analysis, done separately per field.

## Output Format

- Write all narrative content (Preconditions, Steps, Expected Results) in **Vietnamese**. Keep field/section names and the `Step | Action | Expected Result` table headers in English — matching existing project convention (see `references/TC-LOGIN-001.md`).
- Save each test case as its own file: `tests/test-cases/[module]/TC-[MODULE]-[NN].md`.
- Each file must follow this structure:

**File:** `tests/test-cases/[module]/TC-[MODULE]-[NN].md`

```markdown
<!-- Related Use Case: UC-[NN]-[MODULE] — Scenario: [Basic Flow | Extension Xx] -->

# TC-[MODULE]-[NN]: [Tên ngắn gọn mô tả kịch bản kiểm thử]

| Field | Value |
| --- | --- |
| Test Case ID | TC-[MODULE]-[NN] |
| Priority | [High / Medium / Low] |

### Preconditions

- [Điều kiện 1]
- [Điều kiện 2]

### Test Steps

| Step | Action | Expected Result |
| --- | --- | --- |
| 1 | [Hành động] | [Kết quả mong đợi] |
| 2 | ... | ... |

### Overall Expected Result

[Tổng hợp kết quả cuối cùng, đối chiếu với Success Guarantees hoặc Minimal Guarantees]

### Postconditions

- [Trạng thái hệ thống sau khi test case kết thúc]
```

- After generating all test cases for a Use Case, append a single summary file:

**File:** `tests/test-cases/[module]/UC-[NN]-[MODULE]-coverage-matrix.md`

```markdown
# Use Case Testing Coverage Matrix — UC-[NN]-[MODULE]

| Scenario | Description | Test Case ID |
| --- | --- | --- |
| Basic Flow | [Mô tả ngắn] | TC-[MODULE]-[NN] |
| Extension 2a | [Mô tả ngắn] | TC-[MODULE]-[NN] |
| ... | ... | ... |

**Scenario Coverage:** [số scenario có TC] / [tổng số scenario] = 100%
```
