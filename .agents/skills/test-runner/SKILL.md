---
name: test-runner
description: Executes test cases, records results, generates test run summaries, and automatically drafts bug reports for failed tests using the project's bug template.
---

# Test Case Runner Skill

This skill guides the agent in executing designed test cases, recording test statuses, compiling test run summaries, and automatically drafting bug reports for failed tests.

## 1. Input Schema

When asked to run tests, the agent expects:

```markdown
### Test Execution Input
- **Test Case Directory/Files**: [Path to test cases, e.g., tests/test-cases/login/]
- **Target Environment Details**: [OS, browser, app version under test]
- **Execution Mode**: [Manual walkthrough or automated script execution]
```

---

## 2. Execution Workflow

The agent must follow this systematic workflow:

### Step 1: Pre-Execution Verification
- Verify that all preconditions for the test cases are met in the test environment.
- Prepare the specified test data.

### Step 2: Step-by-Step Execution
- For each test case, follow the `Test steps` sequentially.
- Record the **Actual Result** of the system at each step.
- Compare the **Actual Result** against the **Expected Result**.

### Step 3: Determine Test Status
Assign one of the following statuses to each test case:
- **Passed**: The actual result perfectly matches the expected result.
- **Failed**: The actual result deviates from the expected result (indicating a bug).
- **Blocked**: The test cannot be executed due to a blocker (e.g., system crash, environment down, missing prerequisite).
- **Not Run**: The test has not been executed yet.

### Step 4: Automatic Bug Reporting (For Failures)
If a test case status is **Failed**:
- Immediately extract the details from the failed test case.
- Create a new draft bug report file under `tests/bug-reports/BUG-[FEATURE]-[NUMBER].md`.
- Format the bug report exactly according to the template in `.github/ISSUE_TEMPLATE/bug_report.md`:
  - **Found by Test Case**: Map to the failed Test Case ID.
  - **Requirement liên quan**: Map to the tested Requirement ID.
  - **Severity / Priority**: Assess based on impact (e.g., Major/P1 for blocking bugs, Minor/P3 for UI issues).
  - **Environment**: OS, Browser, CWD, Commit Hash.
  - **Steps to reproduce**: Copy the test steps.
  - **Expected result**: Copy the expected result from the test case.
  - **Actual result**: Describe the incorrect behavior observed.

---

## 3. Output Artifacts

At the end of the test run, the agent must generate a **Test Run Summary** (`tests/test-runs/run_[date]_[time].md`) containing:

```markdown
# Test Run Summary: [Date] [Time]

## 1. Execution Overview
- **Environment**: [OS, Browser, Commit Hash]
- **Total Test Cases**: [Count]
- **Passed**: [Count] ([Percentage]%)
- **Failed**: [Count] ([Percentage]%)
- **Blocked**: [Count] ([Percentage]%)

## 2. Detailed Results Table
| Test Case ID | Description | Status | Related Bug ID |
| --- | --- | --- | --- |
| TC-LOGIN-001 | Successful login | Passed | None |
| TC-LOGIN-003 | Login with wrong password | Failed | BUG-LOGIN-001 |

## 3. Discovered Bugs List
- **BUG-[ID]-001**: [Short description of bug, linking to the draft bug report file]
```
