# Appendix A – Prompt Log

## Entry 1 – Hotel Room Price Calculation EP & BVA Test Case Design

### AI Audit Log

- **Name of AI tool**: Antigravity (Gemini 3.5 Flash)
- **Date and time**: 2026-06-25 15:31:00 +07:00
- **Prompt**:

  ```text
  I am working on my Software Testing homework (HW02). A key requirement of the assignment is to build and finalize an "Agent Skill" that implements Equivalence Partitioning (EP) and Boundary Value Analysis (BVA) techniques exactly as taught in our class lectures.
  ```

Please help me build and refine this skill step-by-step.

### Step 1: Read My Class Notes & Homework PDF

Please read my attached class notes in `KCPM-Week03.txt` and the exercise in `KCPM-Week03-EP&BVA.txt`. Pay special attention to:

- The "Error Isolation Principle" (Nguyên tắc cô lập lỗi).
- Test Case Reduction (Rút gọn TCs).
- The difference between 3-Point and 2-Point Boundary Value Analysis.
- The homework requirement for an AI Audit Report (including Name of AI tool, Date/Time, Prompt, and Output).

### Step 2: Write the Skill Definition

Write the content for an agent skill file named `SKILL.md`.

The skill must contain the following structured sections:

1.  **Input Schema**: A standard template that defines what details the user must provide about a feature before the agent can write tests (e.g., Parameters, Data Types, Constraints, Rules).
2.  **Unified EP & BVA Analysis**: Instructions to identify partitions (EP) and boundaries (BVA) together using Error Isolation and specific triggers:
    - Use **2-Point BVA** for simple valid/invalid transitions.
    - Use **3-Point BVA** for critical numeric ranges/capacities.
3.  **Output Artifacts**:
    - **Design Report**: A markdown report detailing the EP and BVA analysis step-by-step (separated into two distinct sections to match the homework grading rubric).
    - **Test Cases**: Individual markdown files for each test case, saved under `tests/test-cases/[feature-name]/TC-[FEATURE]-[NUMBER].md` following the template of `TC-LOGIN-001.md`.
    - **Bug Reports**: Markdown drafts of any discovered bugs.
4.  **AI Audit Log Auto-Extraction**: A rule instructing the agent to automatically generate and save/output an **AI Audit Log entry** at the end of the session in the exact format required by the homework:
    - **Name of the AI tool**
    - **Date and time**
    - **Your prompt** (the exact input prompt)
    - **The AI output** (a structured summary of the output)

### Step 3: Demonstrate the Skill

Apply this newly defined skill to the hotel room calculation exercise (`KCPM-Week03-EP&BVA.txt`) and generate the **Design Report**, the **Test Cases**, and the **AI Audit Log Entry** as a demonstration of how the skill works.

Let's start by generating the `SKILL.md` in test-writer folder and the demonstration!

@[d:\Project\Testing\hcmus-sw-testing--eshop-sut\KCPM-Week03.txt] @[d:\Project\Testing\hcmus-sw-testing--eshop-sut\KCPM-Week03-EP&BVA.txt]

`````

- **Output**:

````text
I have completed the tasks to build the test design skill and demonstrate its application to the hotel room calculation exercise.

Here is a summary of the files created and the required outputs.

### 1. Created Skill Definition File
The skill definition file has been written to the project workspace at:
*   [.agents/skills/test-writer/SKILL.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/.agents/skills/test-writer/SKILL.md)

It contains the standard **Input Schema**, guidelines for **Unified EP & BVA Analysis** (utilizing 2-point BVA for simple boundaries and 3-point BVA for capacity and pricing thresholds), guidelines for the **Error Isolation Principle** and **Test Case Reduction**, and instructions for generating the **AI Audit Log**.

### 2. Applied Skill to Hotel Room Calculation
Using the rules defined in the skill, I analyzed the hotel room price calculation specification (`KCPM-Week03-EP&BVA.txt`) and generated the following outputs:
*   **Design Report**: Detailed EP and BVA analyses, justifications, and a traceability matrix mapping the final test cases to their coverage IDs.
  *   Saved at: [hotel_design_report.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/hotel_design_report.md)
*   **Test Cases**: 19 unique, non-duplicate ca kiểm thử following the exact formatting of `TC-LOGIN-001.md`.
  *   Saved in directory: [tests/test-cases/hotel/](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/hotel/)

---

## Entry 2 – Refinement of Skill Definition (Bug Reports to Ambiguity Notes)

### AI Audit Log

- **Name of AI tool**: Antigravity (Gemini 3.5 Flash)
- **Date and time**: 2026-06-25 16:18:00 +07:00
- **Prompt**:

```text
I have a feedback for you:
+ Replace Section 3.3 "Bug Reports" with Ambiguity Notes
`````

- **Output**:

  ```text
  I have updated the skill definition file as requested.
  ```

Section 3.3 in [.agents/skills/test-writer/SKILL.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/.agents/skills/test-writer/SKILL.md) has been modified from **Bug Reports** to **Ambiguity Notes**.

### Changes Made:

- **Modified Section**: `### 3. Ambiguity Notes (if applicable)`
- **Instruction Update**: Directs the agent to document any ambiguities, contradictions, or incomplete details found in a feature specification as a structured list containing the ambiguous statement, potential interpretations, and the chosen design assumption.

`````

## Entry 3 – Test Runner Agent Skill Definition

### AI Audit Log

- **Name of AI tool**: Antigravity (Gemini 3.5 Flash)
- **Date and time**: 2026-06-25 16:23:00 +07:00
- **Prompt**:

```text
I am working on my Software Testing homework (HW02). I need to build, refine, and finalize the "test-runner" Agent Skill exactly as taught in our class lectures.

Please help me build and I will refine this skill step-by-step.

### Step 1: Read My Class Notes & Slide PDF Contents
Please read my class notes in `KCPM-Week03.txt` and the course presentations:
- `03 - github_testcase_management.pptx.pdf`
- `03 - github_bug_management.pptx.pdf`

Pay special attention to:
- Standard folder structure (`tests/test-cases/`, `tests/test-runs/`, `tests/test-summary/`).
- Bug report template guidelines (title format, evidence section, required labels).
- Two-way traceability requirements between test runs and bug issues.
- The homework requirement for AI Gap Analysis and AI Audit Log.

### Step 2: Write the Skill Definition
Write the content for the agent skill file named `SKILL.md`.

The skill must contain the following structured sections:
1.  **Input Schema**: Defines what details the user must provide about a test execution run.
2.  **Execution Workflow**:
  - Step 1: Pre-Execution Verification
  - Step 2: Step-by-Step Execution
  - Step 3: Determine Test Status (Passed/Failed/Blocked/Not Run)
  - Step 4: Automatic Bug Reporting (For Failures): Directs bugs to GitHub Issues, defines local draft paths as `tests/bug-reports/DRAFT-BUG-[FEATURE]-[NUMBER].md`, and embeds the exact bug report template inline:
    - Title: `[BUG][Module] Short description`
    - Found by Test Case, Requirement liên quan, Severity / Priority, Environment, Steps to reproduce, Expected result, Actual result, and Evidence.
    - Exact labels to attach: `type: bug`, `module: [x]`, `severity: [x]`, `priority: [x]`, `status: new`, `found-by: test-case`.
3.  **Output Artifacts**:
  - **Test Run Record**: Saved under `tests/test-runs/test-run-[feature-name].md` containing the execution overview and log table.
  - **Traceability Matrix**: Saved under `tests/test-summary/traceability-matrix.md` mapping Requirement, Test Case, Result, Bug Issue, and Status.
4.  **AI Gap Analysis**: Instructs the agent to output a gap analysis table answering Missed Test Cases, Missed Bugs, and Lesson Learned.
5.  **AI Audit Log Auto-Extraction**: A template at the end of the session to extract the tool name, date/time, user prompt, and execution stats.

Let's start by generating this `SKILL.md` for the test-runner!
@[d:\Project\Testing\hcmus-sw-testing--eshop-sut\03 - github_testcase_management.pptx.pdf] @[d:\Project\Testing\hcmus-sw-testing--eshop-sut\03 - github_bug_management.pptx.pdf]

@[d:\Project\Testing\hcmus-sw-testing--eshop-sut\KCPM-Week03.txt]
```

- **Output**:

````text
I have completed Step 1 and Step 2 to build the `test-runner` Agent Skill definition based on your class materials.

### Completed Actions
1. **Read Class Notes & Presentations**: Analyzed [KCPM-Week03.txt](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/KCPM-Week03.txt), [03 - github_testcase_management.pptx.pdf](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/03%20-%20github_testcase_management.pptx.pdf), and [03 - github_bug_management.pptx.pdf](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/03%20-%20github_bug_management.pptx.pdf) using extraction and viewing tools.
2. **Identified Requirements**:
 - Directory conventions: `tests/test-cases/`, `tests/test-runs/`, and `tests/test-summary/`.
 - Bug report templates, including the exact Vietnamese header `Requirement liên quan` and specific labels.
 - Two-way traceability between test runs and bug issues.
 - Post-execution steps: AI Gap Analysis and AI Audit Log.
3. **Created Skill Definition**: Written the complete structure to the skill file at [.agents/skills/test-runner/SKILL.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/.agents/skills/test-runner/SKILL.md).

### Skill File Contents (`SKILL.md`)
The file contains:
- **Input Schema**: Fields for target modules, test cases, environment details, tester, and data.
- **Execution Workflow**: Pre-execution checks, execution tracking, status assignment (Passed, Failed, Blocked, Not Run), and automatic bug report drafting using the specified title format and headers under `tests/bug-reports/DRAFT-BUG-[FEATURE]-[NUMBER].md` with the required labels.
- **Output Artifacts**: Templates for the Test Run Record (`tests/test-runs/test-run-[feature-name].md`) and the Traceability Matrix (`tests/test-summary/traceability-matrix.md`).
- **AI Gap Analysis**: Template for `tests/test-summary/gap-analysis.md` assessing missed cases, missed bugs, and lessons learned.
- **AI Audit Log**: Auto-extraction format for `tests/test-summary/ai-audit-log.md` detailing tool names, dates, prompts, and execution statistics.

Please review the generated file and let me know the next step or refinement you would like to make.
`````

## Entry 4 – Refinement of Test Runner Skill Definition (consistent AI Audit Log, Root Cause, File Renaming)

### AI Audit Log

- **Name of AI tool**: Antigravity (Gemini 3.5 Flash)
- **Date and time**: 2026-06-25 16:28:00 +07:00
- **Prompt**:

  ```text
  I have 3 feedbacks for you
  ```

* Incorporate a consistent AI Audit Log format using test-writer skills
* Add root cause column to Gap Analysis
* Rename the file to sprint-1-test-run.md

  ```

  ```

- **Output**:

  ```text
  I have updated the `test-runner` skill file [.agents/skills/test-runner/SKILL.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/.agents/skills/test-runner/SKILL.md) to address your three feedbacks.
  ```

### Summary of Modifications

1. **Renamed Test Run Record**: Changed the target path for the test run record from `tests/test-runs/test-run-[feature-name].md` to `tests/test-runs/sprint-1-test-run.md`.
2. **Added Root Cause Column**: Modified the AI Gap Analysis section to include a `Root Cause` column in the gap analysis table, tracking reasons for missed cases, missed bugs, and systemic process gaps.
3. **Aligned AI Audit Log Format**: Updated the AI Audit Log auto-extraction template to match the format used by the `test-writer` skill:

   ```markdown
   ### AI Audit Log

   - **Name of AI tool**: Antigravity (Gemini 3.5 Flash)
   - **Date and time**: [YYYY-MM-DD HH:MM:SS TZ]
   - **Prompt**: [Exact user input prompt or a faithful representation]
   - **Output**: [A structured summary of the output, listing test runs executed, bugs reported, and files written or modified]
   ```

The updated skill definition matches your requirements. Please let me know how you would like to proceed.

````

## Entry 5 – Forgot Password & Password Reset (FR-03) EP & BVA Test Case Design

### AI Audit Log

- **Name of AI tool**: Antigravity (Gemini 3.5 Flash)
- **Date and time**: 2026-06-25 22:45:00 +07:00
- **Prompt**:

  ```text
  I want to complete the 4 core homework requirements for the EShop "Forgot Password & Password Reset" (FR-03) feature using an AI-First strategy.

Please apply the `test-writer` skill to generate a comprehensive report that addresses all of the following requirements.

Do NOT limit the suite to a fixed number of test cases (e.g., 20). Instead, dynamically determine the optimal number of test cases based on your EP and BVA analysis to achieve mathematically complete coverage.

---

### Task 1 & 2: Domain Testing (EP) & Boundary Value Analysis (BVA)

Here is the exact System Requirements Specification (SRS) extracted from README.md:

#### 1. Đặc tả FR-03: Quên mật khẩu & Đặt lại mật khẩu (2 bước)

**Bước 1 — Lấy mã OTP:**
- Người dùng nhập địa chỉ Email đã đăng ký.
- Hệ thống sinh mã OTP **6 chữ số ngẫu nhiên** và gửi qua Email (trong môi trường demo: hiển thị trực tiếp trên màn hình).
- Giao diện phải hiển thị **chỉ báo bước (Step Indicator)** — ví dụ: "Bước 1 / 2".
- Có nút **Quay lại đăng nhập**.

**Bước 2 — Đặt lại mật khẩu:**
- Người dùng nhập OTP, Mật khẩu mới, và **Xác nhận mật khẩu mới**.
- Mật khẩu mới phải tuân thủ điều kiện như FR-01 (Yêu cầu mật khẩu mạnh: Tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt gồm `@`, `$`, `!`, `%`, `*`, `?`, `&`).
- Hai trường mật khẩu phải khớp nhau.
- OTP chỉ hợp lệ cho email đã yêu cầu, không thể dùng cho email khác.

#### 2. Đặc tả FR-22: Form Requirements (GUI)
- Tất cả trường bắt buộc phải có ký hiệu `*` bên cạnh nhãn.
- Trường Email phải dùng `type="email"`.
- Trường Mật khẩu phải dùng `type="password"` (không hiển thị rõ).
- Thông báo lỗi phải xuất hiện **trên** nút submit, không phải bên dưới.
- Các form có từ 2 bước trở lên phải có **Step Indicator** rõ ràng.

---

### Instructions for the Agent Skill:

Please execute the following steps exactly as defined in the `test-writer` skill, incorporating our established refinements:

1. **Domain Testing (EP) Step-by-Step Analysis**:
   - Divide inputs (`email`, `otp`, `newPassword`, `confirmNewPassword`) into Valid and Invalid partitions.
   - Assign unique Partition IDs (e.g., `EP-IN-EMAIL-1`, `EP-IN-EMAIL-2-INV`) and provide representative values.
2. **Boundary Value Analysis (BVA) Step-by-Step Analysis**:
   - Justify the choice of BVA points. Use 2-Point BVA for simple transitions (e.g., email empty check) and 3-Point BVA for critical numeric ranges/capacities (e.g., OTP length 6, password length 8).
   - List the boundary values with unique BVA IDs.
3. **Test Case Naming & Module Convention**:
   - All test cases must be named following the format: `TC-FORGOT-PASSWORD-[NUMBER]` (starting from `TC-FORGOT-PASSWORD-001`).
   - Standardize the `Module` field in all test cases to exactly `forgot-password`.
4. **Test Case Derivation (Error Isolation & Detailed Navigation)**:
   - Establish a valid baseline: `email = test@eshop.com` (exists in DB), `otp = correct OTP`, `newPassword = Reset123!`, `confirmNewPassword = Reset123!`.
   - Derive the test cases using the Error Isolation Principle (changing one variable at a time while holding all others constant at baseline values).
   - **CRITICAL REFINEMENTS**:
     - All test cases must have **detailed navigation steps** starting from the EShop home page (`http://localhost:5173`) through the login page to the Forgot Password steps.
     - Include explicit verification of the "Quay lại đăng nhập" button and the Step Indicator ("Bước 1 / 2" and "Bước 2 / 2") in the happy path test cases.
     - Keep the `Requirement ID` fields clean: map only `FR-03` for functional test cases, and reserve `FR-22` for specialized GUI validation test cases.
5. **Test Case Reduction & Traceability Matrix**:
   - Merge duplicates and map the final set of test cases to their respective EP and BVA IDs in a Traceability Matrix.

---

### Task 3: AI Gap Analysis Framework

Provide a structured **AI Gap Analysis Template** for FR-03. This template must guide me (the human reviewer) to document:
- Any edge cases or logical flows that the AI might have missed (e.g., OTP expiration time, rate limiting on requests, brute force protection on OTP inputs, email case-sensitivity).
- The technical root causes of why these test cases or bugs might be missed during design vs. execution.

---

### Task 4: Bug Reporting Workflow & Templates

Provide a detailed **Bug Reporting Guide** for FR-03. This must include:
1. The exact **GitHub Issue Title and Body Markdown template** that follows the class standards:
   - Issue Title format: `[BUG][forgot-password] <Short description>`
   - Required sections: Found by Test Case, Related Requirement, Severity/Priority, Environment, Steps to reproduce, Expected vs. Actual, and Evidence.
   - Use priority levels `P0 / P1 / P2 / P3` and severity levels `Block / Critical / Major / Minor`.
2. The specific **GitHub labels** to apply (`type: bug`, `module: forgot-password`, severity, priority, `status: new`, `found-by: test-case`).
3. The **Retest and Closure checklist** (confirming PR merge, retest comment, and tester-only closure).
````

- **Output**:

  ```text
  I have completed the requested test design task using the `test-writer` skill guidelines. By removing the artificial 20 test case limit, I dynamically derived and generated a mathematically complete suite of **25 unique test cases** and the master `DESIGN_REPORT.md` for the EShop **Forgot Password & Password Reset** feature (FR-03, FR-22).
  ```

All assets have been successfully created and written directly to the workspace and brain directories.

### 1. Generated Assets in the Workspace

The files are located in the project repository:

- **Master Report**: [DESIGN_REPORT.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/forgot-password/DESIGN_REPORT.md)
- **Individual Test Cases**: 23 distinct markdown files from [TC-FORGOT-PASSWORD-001.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/forgot-password/TC-FORGOT-PASSWORD-001.md) to [TC-FORGOT-PASSWORD-025.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/forgot-password/TC-FORGOT-PASSWORD-025.md) under the directory `tests/test-cases/forgot-password/`.

### 2. Refined Design & Methodology Highlights

The unconstrained test suite incorporates all of your refined requirements:

- **Equivalence Partitioning (EP)**: Divided input parameters (`email`, `otp`, `newPassword`, `confirmNewPassword`) into 4 valid and 17 invalid partitions to establish complete test coverage boundaries.
- **Boundary Value Analysis (BVA)**: Applied 2-Point BVA for empty check inputs (`email`, `otp`, `newPassword`, `confirmNewPassword`). Applied 3-Point BVA for the OTP length (5, 6, 7 digits) and for the password length (7, 8, 9 characters) to verify boundary compliance.
- **Error Isolation**: Derived exactly 25 test cases, ensuring each case modifies only a single parameter from the valid baseline scenario to pinpoint failure sources.
- **GUI Compliance**: Isolated the functional logic (FR-03) from the presentation rules (FR-22). Test cases `TC-FORGOT-PASSWORD-022` and `TC-FORGOT-PASSWORD-023` verify specific GUI criteria: password field masking (type="password"), mandatory field asterisks (`*`), step indicators, and rendering of error messages above submit buttons.
- **Detailed Navigation**: Every test case contains complete navigation steps starting from the home page (`http://localhost:5173`) to ensure realistic user journey verification.
- **AI Gap Analysis & Bug Templates**: Included a structured gap analysis framework (addressing OTP expiration, rate limiting, and brute-force protection) and the standardized bug reporting guide with `P0/P1/P2/P3` priority classifications and severity levels.

---

### Interactive Design Report

The comprehensive report has been loaded as an interactive user-facing artifact. You can review the complete EP/BVA tables, the Traceability Matrix, the AI Gap Analysis, and the Bug Reporting Guide in the viewer:

- [forgot_password_test_design.md](file:///C:/Users/USER/.gemini/antigravity-ide/brain/42f7ca08-9690-47b0-aa07-81df6ea990d5/forgot_password_test_design.md)

````

## Entry 6 – Forgot Password & Password Reset (FR-03) Review & Refinement

### AI Audit Log

- **Name of AI tool**: Antigravity (Gemini 3.5 Flash)
- **Date and time**: 2026-06-26 14:24:00 +07:00
- **Prompt**:

  ```text
  Based on human review findings, update the FR-03 test suite:

  1. Add TC-FORGOT-PASSWORD-026: expired OTP → system must reject
     - Requirement: FR-03 Step 2, SEC-07

  2. Add TC-FORGOT-PASSWORD-027: reused OTP (Replay Attack) → system must reject
     - Requirement: FR-03 Step 2, SEC-07

  3. Fix TC-FORGOT-PASSWORD-002: BVA mapping BVA-PASS-LEN-2 → BVA-PASS-LEN-3
     (Reset123! is 9 chars = B+1, not B=8)

  4. Append AI Gap Analysis to DESIGN_REPORT.md explaining why AI missed TC-026
     and TC-027 (prompt only referenced FR-03, not SEC-07)

  Follow test-writer skill format. Final suite: 27 TCs.
````

- **Output**:

  ```text
  I have successfully updated the **Forgot Password (FR-03)** test suite based on your review findings.

  ### 1. Created Security Test Cases
  - Created [TC-FORGOT-PASSWORD-026.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/forgot-password/TC-FORGOT-PASSWORD-026.md) to verify that the system rejects an expired OTP (FR-03 Step 2, SEC-07).
  - Created [TC-FORGOT-PASSWORD-027.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/forgot-password/TC-FORGOT-PASSWORD-027.md) to verify that the system rejects a reused OTP/Replay Attack (FR-03 Step 2, SEC-07).

  ### 2. Fixed BVA Mappings
  - Corrected [TC-FORGOT-PASSWORD-002.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/forgot-password/TC-FORGOT-PASSWORD-002.md) mapping in [DESIGN_REPORT.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/forgot-password/DESIGN_REPORT.md) to map to `BVA-PASS-LEN-3` (9 characters `Reset123!`).
  - Modified [TC-FORGOT-PASSWORD-024.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/forgot-password/TC-FORGOT-PASSWORD-024.md) to test the exact boundary $B=8$ characters (`BVA-PASS-LEN-2`) with the password `Reset12!`.

  ### 3. Appended AI Gap Analysis
  - Appended the **Phân tích Khoảng trống Thực tế (Actual AI Gap Analysis)** section to the master [DESIGN_REPORT.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/test-cases/forgot-password/DESIGN_REPORT.md) explaining why the security cases were originally missed (the initial prompt only referenced FR-03, not SEC-07).
  - Synchronized the brain artifact [forgot_password_test_design.md](file:///C:/Users/USER/.gemini/antigravity-ide/brain/42f7ca08-9690-47b0-aa07-81df6ea990d5/forgot_password_test_design.md).
  ```

- ```

  ```
