---
name: build-playwright-assignment
description: Design and implement a submission-ready Playwright automation assignment for web features with data-driven test cases, Playwright locators, assertion patterns, multi-browser execution, and labeled HTML reports.
---

# Build a Playwright Automation Assignment

Produce working, evidence-backed automation rather than only sample code. Preserve the target repository's conventions when they already satisfy the requirements.

## Establish the contract

Before editing, inspect the repository, application documentation, existing manual test cases, package scripts, Playwright configuration, and relevant source or rendered UI. Determine:

- the student ID;
- exactly three in-scope features and the acceptance criteria for each;
- the application URL and startup procedure;
- credentials, seed/reset mechanisms, and feature dependencies;
- the required submission location and any existing naming convention.

Create a requirement ledger before implementation:

| Feature | Source | Case IDs | Count | Data file | Spec file | Browsers | Reports |
| --- | --- | --- | ---: | --- | --- | --- | --- |

Keep the ledger current. A feature is complete only when it has at least 12 distinct automated cases and has run on all three configured browsers.

## Drive the AI conversion step by step

For each feature independently, perform and preserve a trace of these stages:

1. **Analyze** — extract rules, actors, preconditions, state transitions, inputs, outputs, and ambiguities from the feature source.
2. **Design** — propose uniquely identified cases with a useful mix of positive, negative, boundary, validation, and state/error cases.
3. **Review** — check coverage, remove semantic duplicates, and map every expected result to an observable oracle.
4. **Model data** — define the external CSV or JSON schema and map every case ID to one record.
5. **Map automation** — choose stable locators, setup/cleanup, actions, assertions, and isolation strategy.
6. **Generate** — implement the data file, loader/helper code, and Playwright spec for this feature.
7. **Verify and repair** — list/discover tests, execute them, diagnose failures from evidence, and make targeted corrections.

## Implement maintainable Playwright tests

Prefer TypeScript or JavaScript with `@playwright/test` or `playwright`.

Use resilient, user-facing locators in this order:

1. `getByRole` with accessible name;
2. `getByLabel`, `getByPlaceholder`, or `getByText`;
3. explicit test IDs;
4. CSS only when no stable semantic locator exists.

Avoid XPath, positional selectors, arbitrary sleeps, and swallowed errors. Use Playwright's web-first waiting and assertions.

Across the suite use at least three distinct meaningful assertion patterns:

- visibility or hidden state: `toBeVisible`, `toBeHidden`;
- text or accessible state: `toHaveText`, `toContainText`, `toHaveAccessibleName`;
- value or attribute: `toHaveValue`, `toHaveAttribute`, `toBeChecked`;
- URL or navigation: `toHaveURL`;
- collection size: `toHaveCount`;
- response or plain value: `expect(status).toBe(...)`, `toEqual`, `toMatchObject`.

Enable failure artifacts such as screenshot on failure, trace on first retry, and retained video when storage permits.

## Configure multi-browser execution

Configure explicit Playwright projects (Chromium, Firefox, WebKit).

Produce labeled HTML reports containing visible `Run by: <student-id>`.

## Completion gate

- [ ] Features and test cases identified.
- [ ] Automated cases read inputs/expectations from external JSON or CSV.
- [ ] Resilient locators and web-first assertions used.
- [ ] Screenshots and evidence saved for failed items.
- [ ] Documented rerun commands and report paths.
