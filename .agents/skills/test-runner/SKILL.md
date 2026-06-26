---
name: test-runner
description: Executes test cases, records results, generates test run summaries, conducts AI gap analysis, and automatically drafts bug reports using the inline bug template.
---

# Test Runner Skill

This skill guides the agent in executing test cases, recording test execution results, managing bug reports, maintaining a traceability matrix, and conducting AI gap analysis and audit logging.

## 1. Input Schema

To initiate a test execution run, the user or the context must provide:
- **Target Module/Feature**: The specific module or feature under test (e.g., `login`, `cart`, `checkout`, `hotel`).
- **Test Case Directory**: Path to the designed test cases (e.g., `tests/test-cases/[module]/`).
- **Execution Environment**:
  - **Browser**: The browser type and version used (e.g., `Chrome 120`, `Firefox 121`).
  - **OS**: The operating system (e.g., `Windows 11`, `macOS Sonoma`).
  - **URL**: The URL of the system under test (SUT) if applicable.
  - **Build/Commit**: The commit hash or build version of the application being tested.
- **Tester**: Name of the person or agent executing the tests.
- **Test Data**: Pre-configured accounts, items, or parameters required for the run.

## 2. Execution Workflow

### Step 1: Pre-Execution Verification
1. Verify that the SUT is running and accessible.
2. Confirm that the designed test cases exist under `tests/test-cases/` and follow the `TC-[MODULE]-[NUMBER]` naming convention.
3. Validate that the required test data is prepared and available.

### Step 2: Step-by-Step Execution
1. Open the test case file to be executed.
2. Follow each action in `Test steps` sequentially.
3. For each step, observe the actual behavior of the SUT.
4. Document any discrepancies between the observed behavior and the `Expected result`.

### Step 3: Determine Test Status
Assign one of the following statuses to each test case:
- **Passed**: The actual SUT behavior matches the expected result.
- **Failed**: The actual SUT behavior does not match the expected result.
- **Blocked**: The test case cannot be executed because a bug or issue in a preceding step or dependency prevents execution.
- **Not Run**: The test case has not been executed yet.

### Step 4: Automatic Bug Reporting (For Failures)
When a test case status is **Failed** or **Blocked**:
1. Draft a local bug report under the path: `tests/bug-reports/DRAFT-BUG-[FEATURE]-[NUMBER].md` (replace `[FEATURE]` with the target module name in uppercase and `[NUMBER]` with an incremental 3-digit number).
2. Direct the bug details to GitHub Issues using the exact template below.
3. Establish a two-way link:
   - In the Bug Report: Include `Found by Test Case: TC-[MODULE]-[NUMBER]`.
   - In the Test Run Record: Include the Bug Issue reference (e.g., `#12` or the local draft path if offline).

#### Inline Bug Report Template
```markdown
# [BUG][Module] Short description

## Found by Test Case
TC-[MODULE]-[NUMBER]

## Requirement liên quan
FR-[MODULE]-[NUMBER]

## Severity / Priority
[Severity (Blocker/Critical/Major/Minor/Trivial)] / [Priority (P0/P1/P2/P3)]

## Environment
- Browser: [Browser version]
- OS: [Operating System]
- URL: [SUT URL]
- Build/Commit: [Build/Commit version]

## Steps to reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Expected result
[Expected SUT behavior]

## Actual result
[Actual SUT behavior showing the defect]

## Evidence
[Link to screenshot, video, console log, or network response]
```

#### Exact Labels to Attach
- `type: bug`
- `module: [x]` (where `[x]` is the specific module name in lowercase, e.g., `login`, `cart`, `checkout`, `api`)
- `severity: [x]` (where `[x]` is `blocker`, `critical`, `major`, `minor`, or `trivial`)
- `priority: [x]` (where `[x]` is `P0`, `P1`, `P2`, or `P3`)
- `status: new`
- `found-by: test-case`

## 3. Output Artifacts

### Test Run Record
Save the test execution results under `tests/test-runs/sprint-1-test-run.md`.
The file must contain:
1. **Execution Overview**:
   - **Date**: Execution timestamp.
   - **Tester**: Name of the tester.
   - **Environment**: OS, Browser, Build/Commit.
   - **Summary**: Total Cases, Passed, Failed, Blocked, Not Run, Pass Rate (%).
2. **Execution Log Table**:
   ```markdown
   | Test Case ID | Module | Tester | Result | Related Bug | Note |
   |---|---|---|---|---|---|
   ```
   *Note: If Result is `Failed` or `Blocked`, the `Related Bug` field must contain the link to the Bug Issue or local draft.*

### Traceability Matrix
Save the updated traceability matrix under `tests/test-summary/traceability-matrix.md`.
This table maps requirements to test cases, results, and issues:
```markdown
| Requirement | Test Case | Result | Bug Issue | Status |
|---|---|---|---|---|
```
- **Requirement**: The ID of the requirement (e.g., `FR-LOGIN-01`).
- **Test Case**: The ID of the test case (e.g., `TC-LOGIN-001`).
- **Result**: `Pass`, `Fail`, `Blocked`, or `Not Run`.
- **Bug Issue**: The ID of the related Bug Issue (e.g., `#12`) or `None`.
- **Status**: The workflow status of the test case/requirement mapping (e.g., `Done`, `Open`, `Blocked`, `Ready for Retest`).

## 4. AI Gap Analysis

At the end of the test execution run, analyze the testing scope and results to identify gaps. Save this analysis under `tests/test-summary/gap-analysis.md` or append it to the test summary, containing the following table:

| Dimension | Findings / Analysis | Root Cause |
|---|---|---|
| **Missed Test Cases** | [Identify edge cases, boundary values, or combinations that were not covered by the current test cases but should be added in the next cycle] | [Analyze why these test cases were missed during the design phase (e.g., undocumented requirements, incomplete boundary analysis)] |
| **Missed Bugs** | [Identify potential hidden defects, race conditions, or environmental issues that might have slipped through this run] | [Identify the underlying technical or logical cause of these bugs in the SUT code] |
| **Lessons Learned** | [Document insights regarding test coverage, test data quality, execution speed, or improvements to the testing process] | [Identify the systemic root cause of process gaps and how to address them permanently] |

## 5. Agentic Execution with Browser Subagent

When executing test cases using an AI Agent with browser automation capabilities (e.g., `browser_subagent`):
1. **Test Parsing**: The agent must parse the `Test steps` and `Test data` of each target markdown test case.
2. **UI Interaction**: The agent must launch the browser, navigate to the SUT, and perform the actions sequentially.
3. **Session Recording**: The agent must record the entire browser session as a video artifact (e.g., WebP video) to be used as `Evidence` in bug reports and test runs.
4. **Console/Network Monitoring**: The agent must monitor the browser console and network tab for errors (e.g., 500 Internal Server Error, unhandled exceptions) during execution.
5. **State Reset**: Between executing different test cases, the agent should reset the state of SUT (e.g., clearing cookies, local storage, or restarting SUT via scripts) to ensure test isolation.
6. **Result Reporting**: The agent must return a structured summary of execution outputs, screenshots, and video paths to the main agent for logging.

## 6. AI Audit Log Auto-Extraction

At the very end of the session, the agent must automatically append or output an **AI Audit Log entry** in the exact format below:

```markdown
### AI Audit Log
- **Name of AI tool**: Antigravity (Gemini 3.5 Flash)
- **Date and time**: [YYYY-MM-DD HH:MM:SS TZ]
- **Prompt**: [Exact user input prompt or a faithful representation]
- **Output**: [A structured summary of the output, listing test runs executed, bugs reported, and files written or modified]
```

