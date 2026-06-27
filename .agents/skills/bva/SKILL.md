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

This skill applies **3-value BVA** (OFF, ON, IN per boundary), which is more
thorough than the classic 2-value variant (ON + OFF only).

---

## Methodology (Step-by-Step)

### Step 1 — Identify Variables with Boundaries

Scan the requirement for every constraint that implies a numeric edge:

| Signal in spec                 | Boundary type  | Example                                        |
| ------------------------------ | -------------- | ---------------------------------------------- |
| `≥ N`                          | closed minimum | password ≥ 8 chars → ON = 8 is **Accepted**    |
| `> N`                          | open minimum   | quantity > 0 → ON = 0 is **Rejected**          |
| `≤ N`                          | closed maximum | name ≤ 255 chars → ON = 255 is **Accepted**    |
| `< N`                          | open maximum   | age < 18 → ON = 18 is **Rejected**             |
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

#### Closed minimum boundary (accepted when value ≥ min)

| Symbol  | Test value | Expected behaviour                 |
| ------- | ---------- | ---------------------------------- |
| **OFF** | min − 1    | Rejected (below minimum)           |
| **ON**  | min        | Accepted (exactly at minimum)      |
| **IN**  | min + 1    | Accepted (just inside valid range) |

#### Open minimum boundary (accepted when value > min)

| Symbol  | Test value | Expected behaviour                  |
| ------- | ---------- | ----------------------------------- |
| **OFF** | min − 1    | Rejected (below boundary)           |
| **ON**  | min        | Rejected (boundary itself excluded) |
| **IN**  | min + 1    | Accepted (just inside valid range)  |

#### Closed maximum boundary (accepted when value ≤ max)

| Symbol  | Test value | Expected behaviour                 |
| ------- | ---------- | ---------------------------------- |
| **IN**  | max − 1    | Accepted (just inside valid range) |
| **ON**  | max        | Accepted (exactly at maximum)      |
| **OFF** | max + 1    | Rejected (above maximum)           |

#### Open maximum boundary (accepted when value < max)

| Symbol  | Test value | Expected behaviour                  |
| ------- | ---------- | ----------------------------------- |
| **IN**  | max − 1    | Accepted (just inside valid range)  |
| **ON**  | max        | Rejected (boundary itself excluded) |
| **OFF** | max + 1    | Rejected (above boundary)           |

#### Threshold boundary (behaviour changes at ≥ threshold)

A threshold boundary is structurally identical to a closed minimum boundary —
apply the same OFF / ON / IN pattern.

| Symbol  | Test value    | Expected behaviour        |
| ------- | ------------- | ------------------------- |
| **OFF** | threshold − 1 | Behaviour NOT triggered   |
| **ON**  | threshold     | Behaviour triggered       |
| **IN**  | threshold + 1 | Behaviour still triggered |

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

- [ ] Every boundary has OFF, ON, IN test points — for open boundaries verify ON is marked Rejected
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

> **Max boundary:** reverse row order and swap Accepted ↔ Rejected
> (IN = N−1 Accepted, ON = N Accepted, OFF = N+1 Rejected).

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

| Field   | Value   |
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

| Point   | Attempts                 | Expected                          |
| ------- | ------------------------ | --------------------------------- |
| OFF (2) | 2 consecutive failures   | Account NOT locked                |
| ON (3)  | 3rd consecutive failure  | Account locked, 30 s timer starts |
| IN (4)  | 4th attempt while locked | Remains locked                    |

**B2 — Lock duration (min-wait = 30 s):**

| Point      | Elapsed              | Expected              |
| ---------- | -------------------- | --------------------- |
| OFF (29 s) | Wait 29 s after lock | Login still blocked   |
| ON (30 s)  | Wait 30 s after lock | Login attempt allowed |
| IN (31 s)  | Wait 31 s after lock | Login attempt allowed |

### Step 3 — Result

6 test cases: TC-LOGIN-NNN (continuing from DT sequence)  
Summary in `tests/test-cases/login/TC-LOGIN-BVA.md`; individual files at `TC-LOGIN-NNN.md` for each test point.
