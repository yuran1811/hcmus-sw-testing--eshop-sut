# Appendix A – Prompt Log

## Entry 1 – Hotel Room Price Calculation EP & BVA Test Case Design

### AI Audit Log

- **Name of AI tool**: Antigravity (Gemini 3.5 Flash)
- **Date and time**: 2026-06-25 15:31:00 +07:00
- **Prompt**:

  ```text
  I am working on my Software Testing homework (HW02). A key requirement of the assignment is to build and finalize an "Agent Skill" that implements Equivalence Partitioning (EP) and Boundary Value Analysis (BVA) techniques exactly as taught in our class lectures.

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
  ```

- **Output**:
  - **Partitions Analyzed**: 4 input parameters (`RoomType`, `NumDays`, `NumPeople`, `ServiceFee`) and 1 intermediate decision parameter (`PreDiscountAmount` for discount rate tiers). Divided into 9 valid equivalence partitions and 5 invalid equivalence partitions.
  - **Boundaries Identified**: Checked lower boundary of `NumDays` (B=1, 2-point BVA); checked lower and upper boundaries of `NumPeople` (B=1 and B=4, 3-point BVA); checked lower boundary of `ServiceFee` (B=0, 2-point BVA); checked price thresholds for discount tiers (T=2,000,000 and T=4,000,000, 3-point BVA).
  - **Test Case Reduction**: 20 initial test cases designed using the Error Isolation Principle. 1 duplicate test case identified and eliminated (TC-PEOPLE-003 was identical to TC-ROOM-001/TC-HOTEL-001). Reduced to 19 final unique test cases.
  - **Files Written**:
    - Skill definition: `.agents/skills/test-writer/SKILL.md`
    - Design report: `hotel_design_report.md`
    - Test case files: 19 files saved under `tests/test-cases/hotel/TC-HOTEL-001.md` to `TC-HOTEL-019.md` containing full metadata, test data, steps, and expected results.

## Entry 2 – Refinement of Skill Definition (Bug Reports to Ambiguity Notes)

### AI Audit Log

- **Name of AI tool**: Antigravity (Gemini 3.5 Flash)
- **Date and time**: 2026-06-25 16:18:00 +07:00
- **Prompt**:

  ```text
  I have a feedback for you:
  + Replace Section 3.3 "Bug Reports" with Ambiguity Notes
  ```

- **Output**:
  - **Files Modified**: `.agents/skills/test-writer/SKILL.md`
  - **Summary**: Replaced Section 3.3 "Bug Reports" with "Ambiguity Notes (if applicable)". Updated the skill guidelines to instruct the agent to document specification ambiguities, contradictions, and incomplete details as structured notes detailing the ambiguous statement, potential interpretations, and assumptions made for the test design.

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
  ```

- **Output**:
  - **Files Written**: `.agents/skills/test-runner/SKILL.md`
  - **Summary**: Read class notes and slide PDFs (`KCPM-Week03.txt`, `03 - github_testcase_management.pptx.pdf`, `03 - github_bug_management.pptx.pdf`). Identified requirements and designed the initial `test-runner` skill containing input schema, execution workflow, output artifacts templates, AI gap analysis, and AI audit log format.

## Entry 4 – Refinement of Test Runner Skill Definition (consistent AI Audit Log, Root Cause, File Renaming)

### AI Audit Log

- **Name of AI tool**: Antigravity (Gemini 3.5 Flash)
- **Date and time**: 2026-06-25 16:28:00 +07:00
- **Prompt**:

  ```text
  I have 3 feedbacks for you
  + Incorporate a consistent AI Audit Log format using test-writer skills
  + Add root cause column to Gap Analysis
  + Rename the file to sprint-1-test-run.md
  ```

- **Output**:
  - **Files Modified**: `.agents/skills/test-runner/SKILL.md`
  - **Summary**: Renamed the test run record file to `sprint-1-test-run.md`, added a `Root Cause` column to the AI Gap Analysis table, and updated the AI Audit Log format to match the consistent format of the `test-writer` skill.

