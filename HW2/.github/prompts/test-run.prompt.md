Please act as an automated QA test runner agent to execute the entire EShop "forgot-password" (FR-03) test suite (all 23 test cases from `tests/demo/test-cases/forgot-password/`) by strictly applying the `test-runner` skill.
Demo skill `test-runner`so we just run some test cases and find 1 bug report. Don't read other files, just read and create in `tests/demo/`
Don't read source code because this is black box testing.

Here is the SUT execution environment and workspace specifications:

- SUT Local URL: http://localhost:5173
- Browser: Google Chrome on Windows 11
- Backend API Port: http://localhost:3000 (currently running)

Please execute the following automated testing workflow:

1. **Hybrid Execution**:
   - **UI & Browser Test Cases**: Launch the `browser_subagent` to automate all UI and functional test cases (including input field validations, BVA boundaries on password length, step indicator presence, brute force UI attempts, and browser back button behaviors). The browser session must be recorded as a WebP video.
   - **API & Security Test Cases**: For backend-level security checks (such as OTP randomness, Replay Attacks using expired/used OTPs, or direct API bypasses), execute HTTP requests or cURL commands directly in the workspace terminal to verify API status codes and responses.

2. **Bug Reporting (Markdown Drafts)**:
   - If any test case fails (e.g., SUT generating 4-digit OTPs instead of 6-digit ones, or missing Step Indicators, or missing Confirm Password field), you must draft a local bug report file under the directory `tests/demo/bug-reports/` using the exact naming convention: `DRAFT-BUG-FORGOT-PASSWORD-[NUMBER].md` (e.g., `DRAFT-BUG-FORGOT-PASSWORD-001.md`).
   - The bug report must strictly follow this template:

     ```markdown
     # [BUG][Forgot Password] <Short description>

     ## Found by Test Case

     TC-FORGOT-PASSWORD-[NUMBER]

     ## Requirement liên quan

     FR-03, FR-22 (or appropriate FR-ID)

     ## Severity / Priority

     [Severity (Blocker/Critical/Major/Minor/Trivial)] / [Priority (P0/P1/P2/P3)]

     ## Environment

     - Browser: Google Chrome
     - OS: Windows 11
     - URL: http://localhost:5173/forgot-password
     - Build/Commit: [Mã commit hiện tại hoặc baseline]

     ## Steps to reproduce

     1. [Step 1]
     2. [Step 2]
        ...

     ## Expected result

     [Expected behavior according to the test case]

     ## Actual result

     [Observed behavior showing the defect]

     ## Evidence

     [Specify the WebP video path or screenshots]
     ```

3. **Output Synchronization & Traceability**:
   - **Test Run Log**: Record the results (Passed, Failed, Blocked) of all 31 test cases in the execution log table at `tests/demo/test-runs/sprint-1-test-run.md`. For any failed cases, include the file link to the local draft bug report in the `Related Bug` column.
   - **Traceability Matrix**: Immediately upon completing the forgot-password feature, update the master traceability matrix at `tests/demo/test-summary/traceability-matrix.md` mapping requirements (FR-03) to their respective test cases, execution results, and local bug draft references, ensuring the status is updated to `Done`, `Open`, or `Blocked`.

Once the run is complete, provide a concise summary report showing the final statistics (Total, Passed, Failed, Blocked), the file paths of the generated draft bugs in `tests/demo/bug-reports/`, and the path to the recorded browser session video.
