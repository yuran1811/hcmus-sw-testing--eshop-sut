---
name: playwright-ai-automation
description: >-
  AI-first Playwright automation workflow — from ISTQB test-case design (equivalence
  partitioning, boundary value analysis, decision tables, state transitions), through
  step-by-step AI-driven script generation, data-driven JSON/CSV test data, multi-browser
  execution (Chromium/Firefox/WebKit), HTML/Allure reporting with a student-ID run tag,
  human review and defect analysis, to GitHub bug reporting and submission packaging. Use
  whenever the user asks to automate a web feature with Playwright/Selenium using AI,
  build a data-driven or cross-browser test suite, generate a tagged HTML/Allure report,
  write a bug report from a failing assertion, or prepare an automation-testing
  homework/assignment submission (e.g. "HW04", "automation testing report", "AI-generated
  test scripts"). Trigger even for one sub-step (e.g. "viết test case", "chạy đa trình
  duyệt", "làm report HTML") — load the relevant reference file for that step.
---

# Playwright AI Automation Workflow

An end-to-end, audit-friendly workflow for turning a feature's requirements into a
reviewed, data-driven, multi-browser Playwright test suite — built *with* AI, not
handed off *to* AI. This skill encodes the full pipeline so nothing required by an
"AI-first automation testing" assignment gets skipped: test design theory → AI-driven
generation → data-driven scripts → multi-browser run → tagged HTML report → human
review/gap analysis → bug reporting → submission packaging.

## When to use this skill

Use this any time the task involves:
- Converting requirements/user stories into a structured set of **test cases** (positive, negative, edge) before automating anything.
- Driving an AI tool **step by step** (not one giant prompt) to produce Playwright (or Selenium) scripts.
- Making scripts **data-driven** with external `.json`/`.csv` files and multiple assertion patterns.
- Running the same suite across **at least 3 browsers** and producing an **HTML report** that visibly shows who ran it.
- **Reviewing AI output critically** — finding fragile selectors, weak assertions, missing edge cases, flaky waits — and documenting *why* the AI missed them.
- Turning a genuine failing assertion into a **bug report** (Markdown + GitHub Issue with screenshot).
- Packaging everything into a submission-ready deliverable.

Do not skip straight to "write the scripts" when the person hasn't given you test cases yet —
Step 1 below (test design) is a first-class part of the workflow, not optional boilerplate.

## Workflow overview

```
Requirements / FR spec
        │
        ▼
Step 0  Chọn tính năng, tránh trùng trong nhóm        → references/feature-selection-and-oral-defense.md
        │
        ▼
Step 1  Test-case design (ISTQB techniques)        → references/test-design-techniques.md
        │  (≥12 cases/feature: positive+negative+edge)
        ▼
Step 2  AI-driven script generation (step-by-step)  → references/ai-prompting-workflow.md
        │  (Page Object → one test case at a time → data extraction)
        ▼
Step 3  Data-driven + multi-browser Playwright setup → references/playwright-setup.md
        │  (.json/.csv data, ≥3 assertion patterns, 3 browsers, tagged HTML report)
        ▼
Step 4  Human review & gap analysis                 → references/review-and-critique.md
        │  (fix AI mistakes, log what/why, write the AI Critique paragraph)
        ▼
Step 5  Bug reporting (only for genuine defects)     → references/bug-report-template.md
        │  (Markdown + GitHub Issue + screenshot)
        ▼
Step 6  Demo video (Task 2 + Agent Skill demo)       → references/demo-video-guide.md
        │  (≥5 min, Vietnamese narration, face-cam/whoami, unlisted YouTube)
        ▼
Step 7  Verify Git commit log & package & submit      → references/submission-checklist.md
        │  (scripts/check_git_commits.sh, scripts/package_submission.sh)
```

Work through the steps in order for a new feature. If the person only asks about one
step, jump straight to that reference file — don't force the whole pipeline on them.

---

## Step 1 — Design the test cases first (don't let the AI invent them from scratch)

Before generating any script, produce a written test-case table for the feature using
proper black-box test design techniques — this is what separates "AI-first, disciplined"
work from "one generic prompt." Read `references/test-design-techniques.md` for the full
theory (Equivalence Partitioning, Boundary Value Analysis, Decision Tables, State
Transition Testing) with worked examples for e-commerce-style features (login, cart,
checkout, coupons, CRUD, order state machines).

Minimum bar per feature: **≥12 test cases**, mixing:
- Positive cases (valid equivalence classes)
- Negative cases (invalid equivalence classes, error handling)
- Edge/boundary cases (BVA on limits: min/max length, quantity 0/1/max, empty cart, expired coupon, etc.)

Output this as a table (ID, Technique used, Precondition, Steps, Test data, Expected
result) — this table becomes the input to Step 2, and later becomes the traceability
matrix and the source for the JSON/CSV test data file in Step 3.

## Step 2 — Drive the AI step by step (never one generic prompt)

`references/ai-prompting-workflow.md` gives the exact prompt sequence to use with any AI
tool (Claude, ChatGPT, Copilot, Cursor, Gemini). The sequence is intentionally broken
into stages so each output is small enough to review:

1. Ask the AI to propose the **Page Object** (locators + methods) for the feature — review/fix locators before moving on.
2. Ask the AI to convert **one test case at a time** (or a small batch of related ones) into a test function using the Page Object — never "generate all 12 at once."
3. Ask the AI to **extract the test data** it just hardcoded into a separate `.json`/`.csv` structure, then rewire the test to read from it.
4. Ask the AI to **add/verify assertions**, explicitly requesting a mix of assertion types (see Step 3).
5. Record every prompt + AI output pair immediately (see the companion skill `ai-audit-logger`) — don't reconstruct the log from memory later.

This staged approach is also what your AI Critique (Step 4) will end up discussing:
which stage the AI got wrong, and why.

## Step 3 — Make it data-driven and cross-browser

`references/playwright-setup.md` has ready-to-adapt code for:
- Project scaffold (`npm init playwright@latest`) and folder layout (`pages/`, `tests/`, `data/`).
- Reading `.json` and `.csv` test data and looping into `test()` calls (no hardcoded inline arrays).
- **Three distinct assertion patterns** you can mix across the 12+ cases (element-state assertions, value/text assertions, network/response assertions, visual/count assertions, soft assertions) — pick at least 3 kinds.
- `playwright.config.ts` `projects` array for Chromium/Firefox/WebKit (or Chrome/Edge/Firefox) so every feature runs on all 3 — this is what gets you to the required ≥9 browser runs for 3 features.
- The exact `reporter` config (`html` metadata, or `allure-playwright` environment/label options) to make **"Run by: {StudentID}"** plus an ISO timestamp show up in the report, satisfying the anti-cheat requirement.

Run `scripts/scaffold_playwright_project.sh` to generate this folder structure and a
pre-filled `playwright.config.ts` in one step (see script header for usage).

## Step 4 — Review like a senior tester, not a rubber stamp

`references/review-and-critique.md` gives a checklist for the human-review pass
(selectors, assertions, waits, edge-case coverage, data validity) and a structured way
to log each fix as `{what AI produced → what was wrong → the fix → why the AI likely missed it}`.
It also gives a scaffold for the mandatory 200–300 word AI Critique paragraph (Section 10
of the assignment) so you don't stare at a blank page.

## Step 5 — Report real bugs, not test-script bugs

Only file a bug report when a failing assertion reveals a genuine defect in the SUT
(EShop), not a mistake in your own script. `references/bug-report-template.md` gives the
Markdown template and the `gh issue create` command pattern (with screenshot attachment)
so the same content goes to both the report and GitHub Issues without retyping it twice.

## Step 6 — Record the demo video (Task 2 + Agent Skill demonstration)

`references/demo-video-guide.md` gives a minute-by-minute script outline (≥5 minutes,
Vietnamese narration), recording tool setup (OBS Studio, or an `ffmpeg` command-line
alternative for Linux), the exact authorship-evidence requirement (face-cam OR a terminal
showing `whoami`/`hostname` on screen long enough to read), and the current YouTube Studio
steps to publish as **Unlisted**. It also explains how one video can satisfy both the
Task 2 demo requirement and the Section 7 "Agent Skill usage demo" requirement so you
don't have to record twice.

## Step 7 — Verify the Git commit log, then package & submit

Before packaging, run `scripts/check_git_commits.sh` inside your automation repo to
verify you actually meet the assignment's anti-cheat commit rule: **≥8 commits that touch
a `.spec.js`/`.spec.ts` (or equivalent) file, spread across ≥4 different days** — commits
touching only README/PDF/docs do not count. Fix your commit history before submission day
if the script reports a shortfall.

`references/submission-checklist.md` mirrors the assignment's required `.zip` contents
and filename convention. Run `scripts/package_submission.sh <student_id> <grade>` to
assemble and validate the archive name (`<StudentID>_HW04_AI_Automation_<Grade>.zip`)
and to sanity-check that the expected files/folders are present before zipping.

---

## Quick reference index

| Need | File |
|---|---|
| Feature selection (avoid duplicates) + oral defense prep | `references/feature-selection-and-oral-defense.md` |
| ISTQB test design theory + examples | `references/test-design-techniques.md` |
| Exact AI prompt sequence per feature | `references/ai-prompting-workflow.md` |
| Playwright data-driven + multi-browser + reporter code | `references/playwright-setup.md` |
| Review checklist + AI critique scaffold | `references/review-and-critique.md` |
| Bug report Markdown + GitHub Issue template | `references/bug-report-template.md` |
| Demo video script, recording tools, YouTube unlisted upload | `references/demo-video-guide.md` |
| Submission `.zip` checklist + naming rule | `references/submission-checklist.md` |
| Scaffold a new Playwright project | `scripts/scaffold_playwright_project.sh` |
| Verify Git commit log meets the ≥8-commit/≥4-day rule | `scripts/check_git_commits.sh` |
| Package the final submission zip | `scripts/package_submission.sh` |
