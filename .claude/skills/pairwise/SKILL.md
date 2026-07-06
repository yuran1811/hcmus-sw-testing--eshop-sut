---
name: pairwise
description: Use when the number of test cases from full combinatorial coverage is too large to execute — many parameters each with multiple values, configuration matrices, feature-flag combinations. Triggers: "reduce test cases", "combinatorial explosion", "all-pairs", "pairwise", "orthogonal array", "parameter combinations".
---

# Pairwise Testing (All-Pairs)

A combinatorial technique that guarantees every **pair** of parameter values appears together in at least one test case — cutting test suite size from exponential to near-linear while catching the majority of real-world defects.

**Why it works:** Empirical studies (Kuhn et al., NIST) show 60–90% of defects are triggered by a single parameter value, and nearly all the rest by interactions between exactly two parameters. Full N-wise coverage rarely catches what pairwise misses.

---

## When to Use

- **Use pairwise when:** 3+ parameters x 2+ values each and full factorial is impractical
- **Use full DTT when:** <=6 binary conditions — the table stays manageable and business rules demand explicit coverage
- **Combine both:** DTT for critical rule groups, pairwise across configuration parameters

| Scenario | Recommended approach |
|----------|----------------------|
| 3 params x 3 values = 27 full | Pairwise -> ~9 cases |
| 5 params x 4 values = 1024 full | Pairwise -> ~16 cases |
| Login rule with 4 boolean conditions | DTT (32 -> 10 after reduction) |
| Browser x OS x Screen size matrix | Pairwise |

---

## Step 1 — Identify Parameters and Their Values

List every independent input parameter and its discrete test values. Apply equivalence partitioning first to consolidate redundant values into representative classes.

```
Example: Web form submission

P1: Browser     = {Chrome, Firefox, Safari}
P2: OS          = {Windows, macOS, Linux}
P3: Input size  = {empty, small, large}
P4: Auth state  = {logged-in, guest}
```

**Tips:**
- Boundary values count as separate entries (e.g., 0, 1, max)
- Dependent parameters (P2 value constrains P4) — note as constraints for Step 4
- If a parameter has 10+ values, apply EP first to get 2–4 representative classes

---

## Step 2 — Calculate Full vs Pairwise Count

Full factorial: multiply all value counts together.  
Pairwise target: approximately `max(v)^2 x log(N)` cases, where v = max values per param, N = number of params.

```
P1 x P2 x P3 x P4 = 3 x 3 x 3 x 2 = 54 full test cases
Pairwise target   = 9-12 test cases
```

---

## Step 3 — Generate Pairwise Combinations

### Manual method (small sets, <=4 params)

1. Take the two largest parameters as a base grid — list all combinations of their values.
2. Assign remaining parameters column-by-column, reusing values to ensure each new param forms all pairs with every prior param.

```
Base grid (P1 x P2 — all 9 pairs covered):

TC   P1       P2       P3     P4
1    Chrome   Windows  empty  logged-in
2    Chrome   macOS    small  guest
3    Chrome   Linux    large  logged-in
4    Firefox  Windows  small  logged-in
5    Firefox  macOS    large  guest
6    Firefox  Linux    empty  logged-in
7    Safari   Windows  large  guest
8    Safari   macOS    empty  logged-in
9    Safari   Linux    small  guest
```

Verify: every (P1, P2) pair appears once, every (P1, P3) pair appears, etc.

### Tool method (recommended for 5+ params)

Use **PICT** (free, open-source, Microsoft) or **ACTS** (NIST):

```
# pict input file: params.pict
Browser:   Chrome, Firefox, Safari
OS:        Windows, macOS, Linux
InputSize: empty, small, large
AuthState: logged-in, guest

# Constraint: Safari not supported on Linux
IF [Browser] = "Safari" THEN [OS] <> "Linux";

# Run (o:2 = 2-wise / pairwise)
pict params.pict /o:2
```

PICT outputs a ready-to-use test matrix with constraint handling built in.

---

## Step 4 — Handle Constraints (Invalid Pairs)

Remove or replace infeasible combinations after generation.

| Constraint type | Handling |
|-----------------|----------|
| Hard exclusion (A=x implies B != y) | Add IF/THEN in PICT, or manually strike and add a replacement row |
| Soft preference | Document as known gap, not a defect |
| Dependency (B only valid when A=x) | Model B as a conditional param in the tool |

After removing invalid rows, re-verify that all pairs remain covered — add replacement rows if any pair drops out.

---

## Step 5 — Validate Coverage

For each **pair** of parameters, confirm every combination of their values appears at least once.

```
P1 (3 values) x P2 (3 values): 9 pairs to cover
P1 (3 values) x P3 (3 values): 9 pairs to cover
P1 (3 values) x P4 (2 values): 6 pairs to cover
P2 (3 values) x P3 (3 values): 9 pairs to cover
P2 (3 values) x P4 (2 values): 6 pairs to cover
P3 (3 values) x P4 (2 values): 6 pairs to cover

Total unique pairs to cover = sum of |Pi| x |Pj| for all i < j
```

Use a spreadsheet cross-check or PICT's `/s` (statistics) flag to confirm coverage.

---

## Quick Reference

| Step | Action | Output |
|------|--------|--------|
| 1 | List params + value classes (apply EP first) | Parameter table |
| 2 | Compute full vs pairwise size | Justification for reduction |
| 3 | Generate with PICT or manual grid | Raw test matrix |
| 4 | Apply constraints — strike invalid pairs, add replacements | Cleaned matrix |
| 5 | Verify all pairs covered | Final test suite |

---

## Coverage Order Comparison

| Coverage level | Catches | Test count growth |
|----------------|---------|-------------------|
| 1-wise (each value once) | Single-param bugs | O(v) |
| **2-wise / pairwise** | **Pair interactions — most real bugs** | **O(v^2 x log N)** |
| 3-wise | Triple interactions | O(v^3 x log N) |
| N-wise (full factorial) | All interactions | O(v^N) |

Start with pairwise. Escalate to 3-wise only for safety-critical paths or known multi-factor interaction bugs.

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Applying pairwise to rule-based logic (DTT territory) | Use DTT when conditions directly determine effects; pairwise is for configuration matrices |
| Skipping EP before listing values | 10 browser versions -> 3 EP classes. Always EP before pairwise to avoid inflated param tables. |
| Not re-verifying coverage after removing invalid pairs | Check every pair remains covered after striking combos |
| Using pairwise for only 2 parameters | Full factorial IS pairwise for 2 params — no reduction needed |
| Accepting tool output without constraint review | Always scan for business-invalid combinations before running |

---

## Real-World Impact

A 5-parameter configuration test (browsers x OSes x resolutions x auth states x locales) drops from 240+ full-factorial cases to ~20 pairwise cases — with no meaningful loss in defect detection for typical two-factor interaction bugs.
