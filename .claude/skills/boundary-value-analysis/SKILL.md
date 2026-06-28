---
name: boundary-value-analysis
description: Use when testing values at and just outside the edges of equivalence class partitions — after domain testing identifies class boundaries. Triggers: spec says "between X and Y", "at least N", "no more than M"; inputs are numeric ranges, string length limits, date ranges, or ordered sets with min/max constraints.
---

# Boundary Value Analysis (BVA)

## Overview
Defects cluster at partition boundaries. BVA probes the exact boundary value and its immediate neighbors. Apply **after** [[domain-testing]] has defined your equivalence classes — BVA sharpens boundary coverage, it does not replace class coverage.

**Core rule:** For every boundary between a valid and invalid class, generate the boundary value, one unit inside, and one unit outside.

## BVA Points

### 2-Point (minimum viable)
For a single boundary at `B`:
- `B` — the boundary itself
- `B ± 1` — one unit across the boundary

### 3-Point (preferred for critical features)
For a closed range `[min, max]`:

| BVA Point | Formula | Expected |
|-----------|---------|----------|
| Below minimum | min − 1 | **rejected** |
| At minimum | min | accepted |
| Nominal | representative mid-range value | accepted |
| At maximum | max | accepted |
| Above maximum | max + 1 | **rejected** |

> "One unit" depends on the domain: `1` for integers, `1 character` for string length, `1 day` for dates, `smallest meaningful delta` for floats.

## Boundary Types Reference

| Domain | Boundary | Values to Test |
|--------|----------|----------------|
| Integer range `[a, b]` | lower end | `a−1`, `a`, `a+1` |
| Integer range `[a, b]` | upper end | `b−1`, `b`, `b+1` |
| String length `[n, m]` | min length | `n−1` chars, `n` chars, `n+1` chars |
| String length `[n, m]` | max length | `m−1` chars, `m` chars, `m+1` chars |
| Date range | start | `start−1day`, `start`, `start+1day` |
| Date range | end | `end−1day`, `end`, `end+1day` |
| Required field | presence | `null`, empty `""`, 1 char, whitespace-only |
| Enum / ordered set | first | index 0, index 1 |
| Enum / ordered set | last | index n−2, index n−1 |

## Process

1. From your domain testing table, list every class boundary (where valid meets invalid)
2. Determine the unit of increment for each variable
3. Verify spec: is the boundary **inclusive** (`≤`) or **exclusive** (`<`)? — this changes which side is valid
4. Generate 3-point values per boundary
5. Assign IDs in format `BVA-<FEATURE_ID>-<NN>`
6. Record expected result from spec (not from intuition or existing behavior)
7. Execute and capture actual result

## Multi-Variable Boundaries
When two variables interact (e.g., `quantity × unit_price` must not exceed order limit):
- Test each variable's boundary **independently** with the other at a nominal valid value
- Do NOT test both at their boundary simultaneously — it collapses two failures into one undiagnosable case

## Output
Produce a Markdown table per feature:
`ID | Variable | Boundary | BVA Point | Test Value | Expected | Actual | Pass/Fail`

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Testing boundary only, no nominal | Add a mid-range case to prove the interior works |
| Wrong increment unit | Integers → ±1, floats → smallest meaningful delta |
| Spec ambiguity ignored | "8 to 64 chars" — is 8 inclusive? Clarify before writing cases |
| Duplicating domain test values | If domain test already covers `min`, BVA adds `min−1` and `min+1` only |
| Boundary only in one dimension | Each variable has its own boundaries; test all of them |
| Assuming current behavior is correct | Compare actual vs **spec**, not actual vs prior behavior |

## Quick Checklist

- [ ] Every valid/invalid class boundary from domain testing has BVA coverage
- [ ] 3 points generated per boundary: below, at, above
- [ ] Spec read for inclusive/exclusive boundary definition
- [ ] Nominal value included per variable
- [ ] Multi-variable interactions tested one-at-a-time
- [ ] Expected results sourced from spec, not from implementation
