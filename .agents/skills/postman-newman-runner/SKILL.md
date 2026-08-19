---
name: postman-newman-runner
description: Builds a Postman collection/environment and runs tests with Newman for HW06, ensuring EVERY request carries the X-Student-Id header via a pre-request script, leverages many Postman features (variables, environments, data-driven runs, monitors, mock servers), and exports an HTML report. Use when the user says "create a Postman collection", "run Newman", "export an HTML test report", "run test cases with Postman", or needs to move test cases from the Excel file into Postman.
---

# Postman + Newman Runner

## Mandatory requirement (anti-cheat — assignment section 11)

The `X-Student-Id: {StudentID}` header must be present on EVERY request, and must be provable via a screenshot of the console log from the pre-request script. This means:

1. The header must be set via a **pre-request script** (not set manually per request) so it can be `console.log`-ed to the Postman Console.
2. The user must personally take the screenshot of the Postman Console while running — the skill can only prepare the script, it cannot fabricate this evidence.

## Step 1 — Set up the Environment

Use `assets/environment_template.json` as a template, creating an environment with at least:

- `baseUrl` — the SUT URL (localhost for local testing, or a deployed URL)
- `studentId` — the student ID (MUST match `localhost`/`127.0.0.1` when running locally, per section 11)
- `authToken` — token obtained after login, auto-set via the login request's test script (`pm.environment.set(...)`)

## Step 2 — Pre-request script that attaches X-Student-Id (applied at the Collection level)

Go to Collection → **Pre-request Script** tab (applies to every request in the collection, not set per-request), and paste the content from `assets/student_id_pre_request.js`. This script:

- Sets the `X-Student-Id` header from the `studentId` environment variable
- `console.log`s it so there's evidence for the console screenshot

## Step 3 — Import test cases from Excel into Postman

For each audited (VALID) test case in the Excel file:

1. Create a matching Postman request, named `Test_ID - short description`.
2. Copy the input into the right place (params/body/headers).
3. Copy the assertions written using `references/schema_validation_guide.md` (from the `api-test-case-generator` skill) into the Tests tab.
4. For test cases that are the same shape but differ only by input (e.g. many domain-partition test cases for the same field) → consider merging into **1 request + a data-driven run** via Collection Runner with a CSV/JSON data file instead of creating many separate requests — cleaner, and it also demonstrates the "data-driven run" Postman feature the assignment asks you to list.

## Step 4 — Leverage Postman features (required to list in the report)

Use as many of these as reasonably possible, e.g.:

- **Workspace** dedicated to this assignment
- **Collection** organized into folders per API/per Category (DomainPartition/StateTransition/Security/Schema)
- **Variables**: collection variables, environment variables
- **Environments**: local vs. (if applicable) staging
- **Data-driven run**: Collection Runner + a CSV/JSON file (use it for the Domain Partition round — many different inputs against the same request)
- **Monitors**: schedule the collection to run periodically (try it at least once, take a screenshot)
- **Mock servers**: create a mock for at least one endpoint to demonstrate understanding of the feature (doesn't need to be used for real testing)

Record the list actually used in the report (template at `assets/postman_features_used_template.md`).

## Step 5 — Run with Newman and export an HTML report

```bash
npm install -g newman newman-reporter-htmlextra
bash scripts/run_newman.sh <collection.json> <environment.json> <output_report.html>
```

`scripts/run_newman.sh` will:

- Run `newman run` with reporters `cli,htmlextra`
- Export a timestamped HTML report into a `reports/` folder
- Print the total pass/fail count for a quick check

## Step 6 — Sample data-driven run (Domain Partition)

Example `data.csv` for a registration test with several emails:

```csv
email,expected_status
valid.user@example.com,201
invalid-email,400
,400
"a@a.a",201
```

Run: `newman run collection.json -e environment.json -d data.csv -r htmlextra`

## After running

- Update the `Execution_Status` column (Pass/Fail/Blocked) in the corresponding Excel test-case file.
- For any test case that fails unexpectedly (not a deliberate negative test) → move to the `bug-report-writer` skill.
- Include the Newman HTML report and the collection `.json` in the submission package.

## Output language

The written report content (report text, the features-used list, etc.) should be in **Vietnamese**, since that's the submission language for this course — these instructions themselves are in English.
