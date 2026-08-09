---
name: eshop-automation-testing
description: Drive a full data-driven, multi-browser Playwright automation workflow for EShop-style web features - from AI-assisted test-case generation through script implementation, 3-browser execution, and labeled HTML reports. Use this whenever the user wants to convert manual test cases or a feature (e.g. FR03 forgot-password/reset, FR11 order history, FR19 admin user management, or any other FR) into automated Playwright scripts, wants to build or repair a data-driven multi-browser test suite, needs "Run by: {StudentID}" HTML reports, or asks to reuse this workflow on a new feature. Trigger even if the user only says "automate FR-xx" or "làm automation testing cho FR..." without spelling out every deliverable. Does not cover the AI Audit Report or commit log — those are handled elsewhere.
---

# EShop Data-Driven, Multi-Browser Automation Testing

Turn a feature requirement into submission-ready Playwright automation: real scripts, real 3-browser execution, and real labeled reports — not a plausible-looking mockup. This skill is designed to be reused across features (FR03, FR11, FR19, and any future FR), so keep everything it produces generic to the feature being processed rather than hardcoded to one FR.

Read `references/feature-archetypes.md` before designing cases — it maps common FR shapes (auth/reset flows, read-only list/detail views, admin CRUD) to the case types and assertions they typically need.

This skill covers the automation engineering workflow only: case design, data-driven implementation, 3-browser execution, reports, and defect triage. It does not produce the AI Audit Report, AI Critique, or Git commit log — those are handled by a separate skill/process.

## 0. Establish the contract

Before touching code, pin down what cannot be safely assumed:

- **Student ID** — mandatory, must appear verbatim in every HTML report title as `Run by: <StudentID>`. Never invent it or leave a placeholder in a final artifact. If unknown, ask once.
- **Feature(s) in scope this run** — one FR or a batch (e.g. FR03, FR11, FR19). Get or write the acceptance criteria for each from the SUT repo (`https://github.com/ttbhanh/eshop-sut` or the user's fork), README, or prior manual test-case docs (e.g. HW02 output). If HW02 cases already exist, reuse and extend them instead of redesigning from scratch.
- **App URL, startup, and seed/reset mechanism** — how to run EShop locally, test accounts/credentials (read from env vars, never hardcoded), and how to reset state between runs.
- **Repo conventions already in place** — existing `playwright.config.ts`, page objects, fixtures, `test-data/` layout, npm scripts. Preserve and extend these rather than reinventing them when they already satisfy the requirements below.
- **Output location** — where scripts, data files, and reports should land in the repo (commonly `tests/`, `test-data/`, `reports/`).

Maintain a requirement ledger and keep it current as you work:

| Feature | Case IDs | Count | Data file | Spec file | Browsers run | Reports | Status |
| ------- | -------- | ----: | --------- | --------- | ------------ | ------- | ------ |

A feature is "done" only when it has ≥12 distinct automated cases, external data, ≥3 assertion patterns across the suite, and all 3 configured browsers have run and produced a labeled report.

## 1. Drive the AI conversion step by step, per feature

HW04's core anti-cheat rule: no single generic prompt like "write all the scripts." Work each feature through these stages, and keep a brief note of the outcome of each stage (feature, stage, key decision, files affected) as you go — a separate skill consumes this for the AI Audit Report, so leave a clean trail even though producing that report isn't this skill's job.

1. **Analyze** — extract rules, actors, preconditions, state transitions, valid/invalid inputs, and ambiguities directly from the FR text and the running app (or its source). Note anything the spec leaves ambiguous — you'll need to state an assumption or ask.
2. **Design** — propose ≥12 uniquely-ID'd cases (e.g. `F03-TC-001`) mixing positive, negative, boundary/edge, and — where the feature has one — state-transition cases. All types count toward the 12; there's no fixed split.
3. **Review** — remove duplicates that only differ cosmetically, resolve any case whose expected result isn't grounded in the FR or observed app behavior, and confirm every case has an observable oracle (something a `toBe*` assertion can actually check).
4. **Model data** — design the external CSV/JSON schema for this feature: one record per case ID, only primitive inputs/expected values, no selectors or secrets.
5. **Map automation** — for each case, decide locator strategy, setup/cleanup, the action sequence, and which assertion pattern verifies it.
6. **Generate** — implement the data file + Playwright spec (+ any shared helper/page-object code) for this feature.
7. **Verify and repair** — list, run, and diagnose. Fix automation bugs; never weaken an assertion or delete a case just to turn a run green — a failing assertion that reflects a genuine product defect becomes a bug report (§5), not a fix.

Do all 7 stages per feature before moving to the next feature. Don't batch "design" across all three features and then "generate" across all three — that collapses the trail into something indistinguishable from one big prompt.

## 2. Design the test cases

- ID format: `<Feature>-TC-<3-digit>` (e.g. `F11-TC-004`).
- For each case, capture: category (positive/negative/edge/state), purpose, preconditions, input data reference (not inline data), steps, precise expected result, cleanup/reset need.
- "≥12" applies **per feature**, not to the suite total — 3 features ⇒ ≥36 logical cases before browser multiplication.
- Don't pad with meaningless variants (same input, trivially different casing) just to hit 12 — reviewers can tell, and it weakens the "quality over completion" grading criterion explicitly called out in the assignment.
- Where the FR has an explicit requirement ID, keep a small traceability table: `Requirement | Case IDs | Automated test title`.

See `references/feature-archetypes.md` for what a strong 12-case set typically looks like for an auth/reset flow (FR03-shaped), a read-only order/list view (FR11-shaped), and an admin CRUD screen (FR19-shaped) — use it as a checklist, not a template to copy blindly, since each real FR will differ.

## 3. Make the suite genuinely data-driven

- One `.json` or `.csv` file per feature, normally under `test-data/`. No inline arrays/objects of case data in specs, fixtures, or config — that's an automatic fail on this criterion.
- Data files hold case ID, category, inputs, and expected primitive values only. Locators, executable logic, and secrets stay out; read secrets (passwords, tokens) from environment variables and document the variable names in the report.
- Load and validate at runtime; fail fast and loudly on: malformed file, duplicate/missing case IDs, missing required fields, fewer than 12 records, or an unrecognized action/expectation key. A silent skip is worse than a hard failure here.
- Use TypeScript types for the data shape — no `any`. Every generated test title includes its case ID.
- Don't branch per case ID inside the spec; dispatch through a small documented action/expectation vocabulary, or split materially different journeys (e.g. FR03's "request reset" vs "consume reset token" steps) into separate describe blocks that still both read from the external file.
- Avoid shared mutable state across cases: create unique test entities where needed (e.g. unique email per registration-adjacent case) and clean them up.

## 4. Implement maintainable Playwright tests

- TypeScript + `@playwright/test`. Reuse sound existing page objects/fixtures; add new abstractions only where they remove real duplication.
- Locator priority: `getByRole` with accessible name → `getByLabel`/`getByPlaceholder`/`getByText` → explicit `data-testid` → CSS only as a last resort. No XPath, no positional selectors, no arbitrary `waitForTimeout` sleeps, no order-dependent tests, no swallowed errors, no assertions inside conditionals that silently skip verification.
- Use web-first assertions (`expect(locator).toBeVisible()` style), which auto-retry, over manual polling.
- Across the whole suite, hit **≥3 distinct meaningful assertion patterns**, e.g.:
  - visibility/state: `toBeVisible`, `toBeHidden`, `toBeDisabled`
  - text/accessible content: `toHaveText`, `toContainText`, `toHaveAccessibleName`
  - value/attribute: `toHaveValue`, `toHaveAttribute`, `toBeChecked`
  - navigation: `toHaveURL`
  - collection: `toHaveCount`
  - raw value/response: `expect(x).toBe(...)`, `toEqual`, `toMatchObject`
  An assertion only counts if it verifies something meaningful about the expected result — a `toBeVisible()` slapped on an unrelated element doesn't count toward the minimum. Track which tests demonstrate which pattern in the ledger.
- Turn on `screenshot: 'only-on-failure'`, `trace: 'on-first-retry'`, and video where storage allows — this is what makes the bug-report screenshots and defect analysis possible later.

## 5. Configure and run the three-browser matrix

Configure three explicit Playwright projects — Chromium, Firefox, WebKit (or Chrome/Edge/Firefox only if the assignment version in force explicitly allows branded browsers and the environment has them installed). Every feature must be selected in every project — verify with:

```bash
npx playwright test --list
```

This gives a 3×N acceptance matrix (N = features this run). For 3 features that's 9 required cells, ≥108 test executions (3 × 12 × 3) minimum.

**Report per cell.** Don't rely on one combined report. Run each feature-browser pair to its own output folder, e.g. `reports/html/<feature-slug>/<browser>/`, with the Playwright HTML reporter configured `open: 'never'` and a title containing the exact literal text:

```
Run by: <actual-student-id> | <feature-name> | <browser>
```

Pass feature/browser/student-ID/output-folder through a small matrix runner or env vars consumed by `playwright.config.ts`. Prefer a runner that iterates every cell, keeps going on a failed cell (recording nonzero exit, but still preserving its report), prints a summary table (feature, browser, exit status, report path), and returns nonzero overall if anything failed. Never start cells concurrently if they share mutable app state.

After the run, open (or grep) each `index.html` and confirm the literal `Run by: <student-id>` text is present — file existence is not enough. Record all 9 paths/statuses in a run manifest.

## 6. Human review

This is the part most likely to get skipped under time pressure — don't skip it, it's worth real grade weight (Task 1's rubric is explicitly "review and fix," not just "generate").

- After running the AI-generated scripts, explicitly document what the AI got wrong or missed (fragile selector, missing edge case, flaky wait, weak assertion, wrong oracle, etc.) and *why* — bad prompt specificity, a model limitation, or something about the feature the AI couldn't observe (e.g. it can't see a hidden validation rule without being shown the FR text). Keep this as plain notes per feature; another process turns it into the formal review write-up.
- Never fabricate a tool transcript or claim an execution that didn't happen. If something is blocked (app won't run, browser won't install, etc.), say so plainly and mark it blocked rather than faking success.

## 7. Bug reporting on genuine defects

When a failing assertion reflects a real product defect (not flaky automation or bad test data):

1. Keep the test failing — its evidence (screenshot/trace) is the proof.
2. Log it in the Markdown report with repro steps, expected vs actual, and the case ID that caught it.
3. File it on GitHub Issues with a screenshot attached.
4. Distinguish clearly in your notes between: product defect (keep), incorrect/unstable automation (fix), invalid test data (fix data), and environment/dependency failure (fix env) — don't let one masquerade as another.

## 8. Validate in increasing scope

Cheapest checks first, don't jump straight to the full matrix:

1. install/confirm dependencies (no unnecessary upgrades)
2. type-check / static validation
3. `npx playwright test --list` — confirm ≥12 cases per feature per project
4. one representative case per feature, Chromium only
5. full N×3 matrix
6. inspect counts, browser identity, failures, artifacts, and the visible `Run by:` label in every report

## 9. Completion gate

Don't call a feature (or the run) done until:

- [ ] Feature(s) identified with source acceptance criteria captured.
- [ ] ≥12 distinct cases per feature, IDs stable, traceable to requirements.
- [ ] Each feature was worked through all 7 stages of §1 individually (no single generic prompt).
- [ ] All case data lives in external CSV/JSON — nothing hardcoded inline.
- [ ] ≥3 meaningful assertion patterns used and tracked.
- [ ] Chromium/Firefox/WebKit projects configured; every feature runs on all three.
- [ ] One labeled HTML report per feature×browser cell; `Run by: <StudentID>` verified present, not just assumed.
- [ ] Run manifest records every cell honestly (including failures).
- [ ] Review notes: what the AI got wrong/missed, and why.
- [ ] Genuine defects filed as bug reports (Markdown + GitHub Issue + screenshot); non-defects fixed instead.

In the handoff, state per feature: case count, assertion patterns demonstrated, matrix result, report paths, label verification, blockers/failed tests, and the exact rerun command. Keep "implemented" and "executed and verified" clearly separate — don't claim the latter for something you only wrote.
