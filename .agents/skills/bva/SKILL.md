---
name: bva
description: >
  Apply Boundary Value Analysis (BVA) to a functional requirement: identify
  every input variable with explicit boundaries, generate OFF / ON / IN test
  points for each boundary, and produce test cases that probe the exact edges
  where defects are most likely. Reusable for any EShop feature.
applyTo: '**'
---

# Skill: Boundary Value Analysis (BVA)

## Purpose

Generate test cases that target the edges of valid input ranges. Software
defects cluster at boundaries (off-by-one errors, fence-post errors,
threshold miscalculations). BVA forces tests at the exact boundary, one unit
below, and one unit above — guaranteeing coverage of these high-risk zones.

---

## Methodology (Step-by-Step)

### Step 1 — Identify Variables with Boundaries

Scan the requirement for every constraint that implies a numeric edge:

| Signal in spec                 | Boundary type  | Example                                        |
| ------------------------------ | -------------- | ---------------------------------------------- |
| `≥ N` / `> N`                  | minimum        | password ≥ 8 chars → min = 8                   |
| `≤ N` / `< N`                  | maximum        | name ≤ 255 chars → max = 255                   |
| "after N attempts"             | threshold      | lock after 3 consecutive fails → threshold = 3 |
| "expires after N seconds/days" | time threshold | unlock after 30 s → min-wait = 30              |
| "must be ≥ 1"                  | minimum count  | special char count ≥ 1 → min = 1               |

Do **not** try to apply BVA to unordered/categorical data (enum values, email
format flags) — use Domain Testing (EP) for those.

---

### Step 2 — Characterise Each Boundary

For every identified boundary fill in this table:

| #   | Variable        | Constraint           | Boundary value | Step size | Effect at boundary         |
| --- | --------------- | -------------------- | -------------- | --------- | -------------------------- |
| B1  | Password length | ≥ 8 chars            | 8              | 1 char    | Accepted when ≥ 8          |
| B2  | Failed attempts | triggers lock at ≥ 3 | 3              | 1 count   | Locked when count = 3      |
| B3  | Lock duration   | unlocks after ≥ 30 s | 30             | 1 second  | Unlock when elapsed ≥ 30 s |

---

### Step 3 — Generate Test Points per Boundary

#### Minimum boundary (accepted when value ≥ min)

| Symbol  | Test value | Expected behaviour                 |
| ------- | ---------- | ---------------------------------- |
| **OFF** | min − 1    | Rejected (below minimum)           |
| **ON**  | min        | Accepted (exactly at minimum)      |
| **IN**  | min + 1    | Accepted (just inside valid range) |

#### Maximum boundary (accepted when value ≤ max)

| Symbol  | Test value | Expected behaviour                 |
| ------- | ---------- | ---------------------------------- |
| **IN**  | max − 1    | Accepted (just inside valid range) |
| **ON**  | max        | Accepted (exactly at maximum)      |
| **OFF** | max + 1    | Rejected (above maximum)           |

#### Threshold boundary (behaviour changes at ≥ threshold)

| Symbol    | Test value    | Expected behaviour        |
| --------- | ------------- | ------------------------- |
| **Below** | threshold − 1 | Behaviour NOT triggered   |
| **ON**    | threshold     | Behaviour triggered       |
| **Above** | threshold + 1 | Behaviour still triggered |

---

### Step 4 — Create Test Cases

One test case per boundary test point:

- Set the boundary variable to the test point value.
- Keep all other variables at their valid representative (IN) values.
- Describe the exact expected outcome: accepted/rejected, action triggered/not.

For **state-based boundaries** (attempt counters, timers) the test case must
describe the setup steps that bring the system to the required state
(e.g., "perform 2 failed logins before this step").

---

### Step 5 — Coverage Checklist

- [ ] Every boundary has at least 3 test points (OFF, ON, IN or equivalent)
- [ ] Both sides of every boundary are tested
- [ ] Cumulative/state boundaries describe the exact sequence to reach the state
- [ ] Time-based boundaries include a waiting step with precise duration
- [ ] Combined constraint variables (e.g., password length AND character rules) have separate BVA test cases per constraint

---

## Output Format

### 1. Summary File

Create: `tests/test-cases/[feature-folder]/TC-[FEATURE]-BVA.md`

Structure (boundary analysis + summary table; **no detailed steps**):

```markdown
# TC-[FEATURE]-BVA: Boundary Value Analysis — [Feature Name]

## Requirement ID

FR-XX

## How BVA Was Applied

[Explain which boundaries were found, boundary values, and test points generated]

## Boundary Analysis

### Boundary B1: [Variable] — [Constraint]

| Attribute      | Value                 |
| -------------- | --------------------- |
| Variable       | …                     |
| Boundary type  | min / max / threshold |
| Boundary value | N                     |
| Step size      | 1                     |

| Test Point | Test Value | Expected |
| ---------- | ---------- | -------- |
| OFF (N−1)  | …          | Rejected |
| ON (N)     | …          | Accepted |
| IN (N+1)   | …          | Accepted |

_(repeat for each boundary)_

## Test Cases Summary

| TC ID            | Description | Boundary | Point | Expected |
| ---------------- | ----------- | -------- | ----- | -------- |
| TC-[FEATURE]-NNN | [desc]      | B1       | OFF   | Fail     |
| …                | …           | …        | …     | …        |
```

### 2. Individual Test Case Files

Create one file per test case: `tests/test-cases/[feature-folder]/TC-[FEATURE]-NNN.md`

NNN **continues from the last DT sequence number** (e.g. if DT wrote `TC-LOGIN-001` … `TC-LOGIN-010`,
BVA starts from `TC-LOGIN-011`).

Structure:

```markdown
# TC-[FEATURE]-NNN: [Short Description]

## Requirement ID

FR-XX

## Module / Test type / Technique

[Module] / Functional / BVA

## Preconditions

- [list]

## Test Data

| Trường  | Giá trị |
| ------- | ------- |
| [field] | [value] |

## Test Steps

1. …

## Expected Result

…

## Status / Related Bugs

Not Run / None
```

---

## Full Example: FR-02 Login — Account Lock

### Step 1 — Boundaries found

```
B1: Consecutive failed login attempts → lock at ≥ 3  (threshold = 3, step = 1)
B2: Lock duration → unlock after ≥ 30 seconds        (min-wait = 30, step = 1 s)
```

### Step 2 — Test points

**B1 — Failed attempts (threshold = 3):**

| Point     | Attempts                 | Expected                          |
| --------- | ------------------------ | --------------------------------- |
| Below (2) | 2 consecutive failures   | Account NOT locked                |
| ON (3)    | 3rd consecutive failure  | Account locked, 30 s timer starts |
| Above (4) | 4th attempt while locked | Remains locked                    |

**B2 — Lock duration (min-wait = 30 s):**

| Point      | Elapsed              | Expected              |
| ---------- | -------------------- | --------------------- |
| OFF (29 s) | Wait 29 s after lock | Login still blocked   |
| ON (30 s)  | Wait 30 s after lock | Login attempt allowed |
| IN (31 s)  | Wait 31 s after lock | Login attempt allowed |

### Step 3 — Result

6 test cases: TC-LOGIN-NNN (continuing from DT sequence)  
Summary in `tests/test-cases/login/TC-LOGIN-BVA.md`; individual files at `TC-LOGIN-NNN.md` for each test point.
