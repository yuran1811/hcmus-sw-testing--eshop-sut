---
name: api-test-extend
description: >-
  Adds human-authored HW06 API test cases that AI missed (minimum 5 per API),
  especially security and state transitions, with explanations of why AI missed
  them. Use when extending API tests, adding missed security cases, or HW06
  extend step.
---

# API Test Extend (HW06)

## Overview

After audit, add **≥ 5** original test cases the AI did not produce. Prefer **security** and **state** gaps. Each case must explain *why* AI missed it (prompt quality, model limits, or API-specific behavior).

## Inputs

- Audited suite + `PHASE0_PLANNING.md` recon notes
- Known gap areas for locked APIs:
  - FR-05: encoded SQLi, comment variants, error HTML vs JSON
  - FR-11: IDOR across users, token on public `:id`, empty vs populated history
  - FR-15: unauthenticated CRUD success (missing middleware), mass-assignment, negative price
- Output: `23127152-hw6/test-cases/API{n}_*/extended.md` (+ Excel later)

## Process

1. Diff coverage matrix vs SEC list and recon suspects.
2. Write ≥5 TCs with IDs `TC-*-E##`.
3. For each: Category, Input, Expected, **Why AI missed**.
4. Optionally ask AI “what else?” then **discard duplicates**; only keep human-chosen misses.
5. Log any AI brainstorming via `ai-audit-report`.

## Output format

Use [templates/extended-tc-template.md](templates/extended-tc-template.md).

## Why-AI-missed taxonomy (use one)

| Code | Meaning |
|------|---------|
| `PROMPT` | Step prompt omitted this partition/SEC |
| `MODEL` | Model genericized / skipped edge encoding |
| `API_SPECIFIC` | Needs SUT source insight (`server.js`) not in spec |
| `IMPL_DRIFT` | Spec vs implementation mismatch AI assumed away |

## Self-review checklist

- [ ] ≥ 5 extended TCs
- [ ] Majority security and/or state
- [ ] Each has Why AI missed (+ taxonomy code)
- [ ] No duplicate of VALID generated rows

## Common mistakes

- Five trivial renames of AI cases
- “AI missed it” without causal explanation
- Extending before audit finishes
