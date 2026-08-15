---
name: bug-report
description: Use when documenting a defect found during testing — turning an observed bug into a standardized report with severity/priority, repro steps, expected vs actual result, and evidence, ready to file as a GitHub Issue.
---

# Bug Report

## Overview
Turns an observed defect into a report matching this repo's GitHub Issue template (`.github/ISSUE_TEMPLATE/bug_report.md`) plus a local Markdown record, so every bug is traceable back to the test case and requirement that found it.

## When to use
- A test execution (functional or performance) surfaces a genuine defect: wrong behavior, error response, crash, functional regression
- User asks to "file a bug", "report an issue", "log a defect"

## Process
1. **Bug ID** — `BUG-[MODULE]-[NNN]` (3-digit, zero-padded), `[MODULE]` matching the related test case's module (e.g., `BUG-LOGIN-001`). Check existing bug reports/issues first so the number doesn't collide.
2. **Found by Test Case** — the test case ID that exposed it (e.g., `TC-LOGIN-003`); if the defect came from a performance run rather than a functional test case, reference the scenario instead (e.g., "Stress test, step 4 @ 150 VUs").
3. **Requirement liên quan** — the FR-xx it violates.
4. **Severity / Priority** — Blocker/Critical/Major/Minor, P0–P3. Justify in one line if not obvious.
5. **Environment** — browser/OS/URL/build or commit; for a performance-run defect, also note the load level and tool (JMeter/k6) active when it occurred.
6. **Steps to reproduce** — numbered, minimal, deterministic.
7. **Expected result** vs **Actual result** — stated separately, not merged into one sentence.
8. **Evidence** — screenshot/video/console log/raw metric value. For performance defects, cite the actual number from `performance-test-analyzer`'s output (e.g., "checkout p95 = 4200ms at 150 VUs, see `results/...jtl`"), not a description like "it was slow."

## Output
Field structure is `.github/ISSUE_TEMPLATE/bug_report.md` (this repo's canonical GitHub Issue template — don't fork a second copy of it for the Issue body itself). Copy `templates/bug-report-template.md` for the local record and produce two matching artifacts:
1. **GitHub Issue body** — field-for-field match to `.github/ISSUE_TEMPLATE/bug_report.md`, title `[BUG][FEAT] - <short description>`.
2. **Local Markdown record** — `templates/bug-report-template.md` filled in, saved under the current task's bug-reports folder as `BUG-[MODULE]-[NNN].md`.

All narrative content (steps, results, environment notes) in Vietnamese; field labels stay exactly as in the issue template (including `Requirement liên quan`) so the report pastes directly into a GitHub Issue.

After filing, remind to update the traceability matrix (`tests/test-summary/traceability-matrix.md` or the current task's equivalent) with the Issue number/link.

## Self-review checklist
- [ ] Bug ID follows `BUG-[MODULE]-[NNN]` and doesn't collide with an existing one
- [ ] Expected vs Actual are both stated, not merged
- [ ] Evidence is a concrete artifact/number, not a description
- [ ] GitHub Issue body and local Markdown record match field-for-field
- [ ] Traceability matrix update reminder issued

## Common mistakes
- Vague Actual result ("nó bị lỗi") instead of the precise observed behavior/response — makes the bug unverifiable.
- Skipping Evidence when a screenshot/log was available at the time but not captured immediately — capture it as part of the same test run, not after.
- Filing a performance issue without the concrete metric (latency number, error rate, load level) — "it felt slow" isn't reproducible.
