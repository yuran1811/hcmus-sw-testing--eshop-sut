---
name: hw06-api-testing
description: >-
  Orchestrates HCMUS HW06 API Testing end-to-end for EShop SUT — API selection,
  generate/audit/extend/execute pipelines, Postman+Newman, CI/CD, bug reports,
  AI audit/critique, and AI test-generator design. Use when the user mentions
  HW06, API testing homework, FR-05/FR-11/FR-15, or asks to run the HW06 pipeline.
---

# HW06 API Testing — Orchestrator

## Overview

Drives HW06 **step-by-step** (AI-first, not one generic prompt). Student ID: **23127152**. Workdir: `23127152-hw6/`. Spec: `api_specification.md`. Base URL: `http://localhost:3000`.

## Locked APIs (do not change without user confirmation)

| Pool | Feature | Endpoints |
|------|---------|-----------|
| A | FR-05 | `GET /api/products` |
| B | FR-11 | `GET /api/orders/my-orders`, `GET /api/orders/:id` |
| C | FR-15 | `POST/PUT/DELETE /api/products` |

## Skill map (invoke in order)

| Phase | Skill | Technique |
|-------|-------|-----------|
| 0 Setup | (manual / this skill §Phase 0) | Planning |
| 1.1 Generate | `api-test-generate` | Domain · state · security · schema |
| 1.2 Audit | `api-test-audit` | VALID / INVALID / INCOMPLETE |
| 1.3 Extend | `api-test-extend` | ≥5 human TCs AI missed |
| 1.4 Execute | `api-test-execute` | Postman + Newman + `X-Student-Id` |
| 1.5 Bugs | `bug-report` | Defect → Issue + local MD |
| 2–3 | Repeat 1.1–1.5 for API2, API3 | Same pipeline |
| CI/CD | `api-test-cicd` | Actions + pass/fail commits |
| G9.5 | `api-test-generator-design` | Self-drawn diagram + pseudocode |
| Docs | `ai-audit-report` | Log **during** each AI step |
| Docs | `ai-critique` | 200–300 words |
| Docs | `hw06-main-report` | Main report + README |

**Report templates:** do **not** invent new ones. Use skills restored from branch `hw5/23127152`:

- `.agents/skills/ai-audit-report/templates/audit-log-entry-template.md`
- `.agents/skills/bug-report/templates/bug-report-template.md`
- Narrative style exemplar: `git show hw5/23127152:23127152_HW05_AI_Performance_098/` (Main Report, README, AI_Critique)

## Hard rules

1. Guide AI **per technique step** — never “generate all API tests in one prompt”.
2. Every request must send `X-Student-Id: 23127152` (collection pre-request).
3. One **git commit per pipeline step** (see `23127152-hw6/git-commit-log.txt`).
4. After each AI interaction → append `ai-audit-report` entry **immediately**.
5. Human owns correctness: audit before execute; extend before claiming coverage.

## Phase 0 checklist

- [ ] Spec + SEC-01…07 read (`README.md` security table)
- [ ] APIs locked; `PHASE0_PLANNING.md` current
- [ ] Backend up; Postman env filled
- [ ] Newman + `newman-reporter-htmlextra` installed

## Per-API exit criteria

- [ ] ≥35 AI TCs covering domain + security + schema (+ state if applicable)
- [ ] Full audit labels + corrections
- [ ] ≥5 extended TCs with “why AI missed”
- [ ] Newman HTML report; student-id screenshot
- [ ] Bugs filed via `bug-report` if found

## Paths

```
23127152-hw6/
├── test-cases/API{1,2,3}_*/
├── postman/
├── cicd/
├── agent-skill/          ← G9.5 diagram (self-drawn)
├── bug-reports/
├── ai-audit/
├── report/
└── CHECKLIST.md
```

## Common mistakes

- One mega-prompt for all TCs → fails AI-first grading.
- Skipping audit → INVALID cases executed as truth.
- Fabricating Newman/`X-Student-Id` evidence → anti-cheat zero.
- AI-generated G9.5 diagram → rejected.
