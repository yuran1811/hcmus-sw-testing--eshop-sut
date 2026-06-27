---
name: domain-testing
description: >
  Apply the Domain Testing technique to a functional requirement: identify
  every input variable's domain, partition it into valid and invalid
  equivalence classes, locate ON/OFF/IN/OUT boundary points, and generate
  a comprehensive test suite. Reusable for any EShop feature.
applyTo: '**'
---

# Skill: Domain Testing

## Purpose

Systematically design test cases for any feature by partitioning each
input variable's domain into equivalence classes and probing representative
values — especially at boundaries. The technique maximises fault detection
while minimising redundant tests.

---

## Methodology (Step-by-Step)

### Step 1 — Identify All Input Variables

Parse the requirement (README.md / api_specification.md) and list every
input the feature processes:

- Form fields (text, number, date, select, password)
- URL / query parameters
- State variables (login status, account lock counter, attempt count)
- Implicit constraints (role, token validity)

For each variable record:

| Attribute      | Example                                             |
| -------------- | --------------------------------------------------- |
| Name           | Password                                            |
| Data type      | string                                              |
| Required?      | Yes                                                 |
| Format rules   | ≥ 8 chars, ≥1 upper, ≥1 lower, ≥1 digit, ≥1 special |
| Business rules | Must match Confirm Password field                   |

---

### Step 2 — Define Each Variable's Domain

Write the domain formally so boundaries are unambiguous:

```
Variable: Password
Domain:
  - type: string
  - required: true
  - length ≥ 8
  - contains ≥ 1 uppercase  (A–Z)
  - contains ≥ 1 lowercase  (a–z)
  - contains ≥ 1 digit      (0–9)
  - contains ≥ 1 special    (@, $, !, %, *, ?, &)
```

---

### Step 3 — Create Equivalence Partitions

For every variable define:

**Valid partition (EP-V):** values the system must accept.  
**Invalid partitions (EP-I):** one partition per violated rule.

| Label      | Type    | Rule Violated | Representative Value           |
| ---------- | ------- | ------------- | ------------------------------ |
| EP-[VAR]-1 | Valid   | —             | typical valid value            |
| EP-[VAR]-2 | Invalid | [rule]        | value violating only that rule |
| …          | …       | …             | …                              |

Naming convention: `EP-[Variable initials]-[number]`  
Examples: `EP-P-3` = Password partition 3, `EP-E-2` = Email partition 2.

Rules for completeness:

- One invalid partition per each distinct validation rule
- Add partitions for structural problems: empty, null, wrong type
- Add partitions for business-logic violations: duplicate, mismatch, non-existent

---

### Step 4 — Identify ON / OFF / IN / OUT Points

For variables with numeric or length boundaries:

| Symbol  | Position                    | Description                                           |
| ------- | --------------------------- | ----------------------------------------------------- |
| **ON**  | At boundary                 | Exactly at the edge — `min` or `max` itself           |
| **OFF** | Just outside                | One step beyond the boundary — `min − 1` or `max + 1` |
| **IN**  | Well inside valid domain    | Typical valid value far from boundary                 |
| **OUT** | Well outside invalid domain | Obviously invalid value far from boundary             |

Treat ON and OFF as additional test cases on top of the partition-based ones.

---

### Step 5 — Design Test Cases (Single Fault Assumption)

For each test case, vary **exactly one** variable to an invalid partition
while keeping all others at their valid IN-point values. This isolates
failures to a specific input.

Ordering:

1. **TC-[FEATURE]-001**: All variables valid → expected pass (base case)
2. **TC-[FEATURE]-002 … N**: One invalid partition per case, rest valid

---

### Step 6 — Coverage Checklist

Before finalising, confirm:

- [ ] At least one success case (all valid)
- [ ] Every invalid partition for every variable has a test case
- [ ] Every required field tested as empty
- [ ] All state-based conditions (locked, duplicate, expired) covered
- [ ] ON, OFF, and OUT points tested for every numeric/length boundary

---

## Output Format

### 1. Summary File

Create: `tests/test-cases/[feature-folder]/TC-[FEATURE]-DT.md`

Structure (analysis + summary table; **no detailed steps**):

```markdown
# TC-[FEATURE]-DT: Domain Testing — [Feature Name]

## Requirement ID

FR-XX

## How Domain Testing Was Applied

[Bullet-point explanation: variables found, partitions created, test strategy]

## Input Domain Analysis

### Variable: [Name]

| Partition | Type    | Description     | Representative Value |
| --------- | ------- | --------------- | -------------------- |
| EP-X-1    | Valid   | All rules met   | [value]              |
| EP-X-2    | Invalid | [rule violated] | [value]              |

_(repeat for each variable)_

## Test Cases Summary

| TC ID            | Description | Partition Exercised | Expected |
| ---------------- | ----------- | ------------------- | -------- |
| TC-[FEATURE]-001 | All valid   | All EP-V            | Pass     |
| …                | …           | …                   | …        |
```

### 2. Individual Test Case Files

Create one file per test case: `tests/test-cases/[feature-folder]/TC-[FEATURE]-NNN.md`

NNN is a **shared sequence** across all DT and BVA test cases for the feature
(e.g. `TC-LOGIN-001`, `TC-LOGIN-002` …). DT cases are numbered first; BVA cases follow.

Structure:

```markdown
# TC-[FEATURE]-NNN: [Short Description]

## Requirement ID

FR-XX

## Module / Test type / Technique

[Module] / Functional / Domain Testing (EP + BVA)

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

## Full Example: FR-01 Register

### Step 1 — Variables

Name, Email, Password, Confirm Password

### Step 2 — Domains

```
Name:             required string, non-empty
Email:            required string, valid format (RFC 5322 subset), unique in DB
Password:         required string, ≥8 chars, ≥1 upper, ≥1 lower, ≥1 digit, ≥1 special
Confirm Password: required string, must equal Password
```

### Step 3 — Partitions

| Label   | Variable   | Type    | Violated Rule      | Representative Value   |
| ------- | ---------- | ------- | ------------------ | ---------------------- |
| EP-N-1  | Name       | Valid   | —                  | "Nguyen Van A"         |
| EP-N-2  | Name       | Invalid | required, empty    | ""                     |
| EP-N-3  | Name       | Invalid | non-whitespace     | " "                    |
| EP-E-1  | Email      | Valid   | —                  | "newuser@test.com"     |
| EP-E-2  | Email      | Invalid | uniqueness         | "test@eshop.com" (dup) |
| EP-E-3  | Email      | Invalid | format (no @)      | "userdomain.com"       |
| EP-E-4  | Email      | Invalid | format (no domain) | "user@"                |
| EP-E-5  | Email      | Invalid | required, empty    | ""                     |
| EP-P-1  | Password   | Valid   | —                  | "Password1!"           |
| EP-P-2  | Password   | Invalid | length < 8         | "Pa1@"                 |
| EP-P-3  | Password   | Invalid | no uppercase       | "password1!"           |
| EP-P-4  | Password   | Invalid | no lowercase       | "PASSWORD1!"           |
| EP-P-5  | Password   | Invalid | no digit           | "Password!!"           |
| EP-P-6  | Password   | Invalid | no special char    | "Password12"           |
| EP-P-7  | Password   | Invalid | required, empty    | ""                     |
| EP-CP-1 | Confirm PW | Valid   | —                  | "Password1!"           |
| EP-CP-2 | Confirm PW | Invalid | mismatch           | "Different1!"          |
| EP-CP-3 | Confirm PW | Invalid | required, empty    | ""                     |

### Step 4 — Boundary Points (Password length, 8 ≤ length ≤ 64)

When a variable has both a minimum and maximum boundary, test all four points
for each boundary. The IN point is shared between both boundaries.

| Point           | Value     | Boundary | Expected |
| --------------- | --------- | -------- | -------- |
| OUT (far below) | 2 chars   | min      | Invalid  |
| OFF (below min) | 7 chars   | min      | Invalid  |
| ON (at min)     | 8 chars   | min      | Valid    |
| IN (mid-range)  | 20 chars  | —        | Valid    |
| ON (at max)     | 64 chars  | max      | Valid    |
| OFF (above max) | 65 chars  | max      | Invalid  |
| OUT (far above) | 100 chars | max      | Invalid  |

### Step 5 — Test Cases

15 test cases: TC-REGISTER-001 (all valid) + 14 covering each invalid partition.

Summary in `tests/test-cases/register/TC-REGISTER-DT.md`; individual files at `TC-REGISTER-001.md` … `TC-REGISTER-015.md`.
