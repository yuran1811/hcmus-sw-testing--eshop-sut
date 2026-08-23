---
name: api-test-audit
description: >-
  Human-reviews AI-generated HW06 API test cases, labeling each VALID /
  INVALID / INCOMPLETE with reasoning and corrections. Use when auditing
  generated API tests, reviewing AI test quality, or HW06 audit step.
---

# API Test Audit (HW06)

## Overview

Student-owned review of `generated.md`. Every row gets a label; INVALID/INCOMPLETE must be corrected before execution.

Log the audit AI-assist (if any) with `ai-audit-report`. Final labels are **human decisions**.

## Inputs

- `23127152-hw6/test-cases/API{n}_*/generated.md`
- Spec + `backend/server.js` for the endpoint (recon expected vs actual)
- Output: `.../audit.md`

## Labels

| Label | Meaning | Action |
|-------|---------|--------|
| **VALID** | Correct vs spec intent; executable as written | Keep |
| **INVALID** | Wrong expected result, wrong method/path, contradictory, unsafe assumption | Fix row (rewrite Input/Expected) |
| **INCOMPLETE** | Direction OK but missing assertions, preconditions, or data | Complete fields |

## Process

1. Read each TC against spec (not against buggy implementation — note bugs separately).
2. Assign label + one-line reasoning.
3. Apply corrections **in place** in a corrected table or “Correction” column.
4. Summarize counts.
5. Flag suspected product defects → hand off to `bug-report` after execute confirms.

## Output format

Use [templates/audit-tc-template.md](templates/audit-tc-template.md).

## Self-review checklist

- [ ] Every generated TC has a label
- [ ] INVALID/INCOMPLETE have concrete corrections
- [ ] No “VALID” case that only checks HTTP 200 when schema was claimed
- [ ] Audit summary counts sum to total generated

## Common mistakes

- Marking everything VALID without reading expected status
- Using implementation bugs as “expected” without filing a bug
- Auditing from memory of the prompt instead of the written TC table
