---
name: domain-testing
description: Use when designing systematic test cases for a SUT feature with input variables — agent must partition each input domain into valid/invalid equivalence classes, select one representative per class, and build a coverage matrix. Triggers: "what values should I test", feature has typed inputs with formats/ranges/constraints, preparing test case documents.
---

# Domain Testing

## Overview
Domain testing partitions each input variable's space into **equivalence classes** — groups where the system behaves identically. Test one representative per class. Bugs found in one value of a class apply to the whole class.

**Core rule:** Cover every valid class AND every invalid class. Missing invalid classes is the #1 gap in amateur test design.

## Process

### 1 — Identify Input Variables
List every input that drives the behavior under test. Include hidden inputs: session state, account status, pre-existing data.

### 2 — Define Each Domain
For each variable: data type, valid format, valid range, and all constraints from the spec.

| Variable | Type | Valid Range / Format | Constraints |
|----------|------|----------------------|-------------|
| email | string | RFC 5321 | max 254 chars, must contain @ |
| password | string | any printable | 8–64 chars |
| quantity | integer | positive | 1–99 |

### 3 — Partition into Equivalence Classes
For each variable, name and describe every class. Always include:

| Class Category | Must Include |
|----------------|--------------|
| Valid — typical | Most common usage |
| Valid — minimum | Smallest acceptable value |
| Valid — maximum | Largest acceptable value |
| Invalid — empty / null | Blank, null, absent |
| Invalid — wrong format | Wrong type or structure |
| Invalid — below minimum | One unit below valid range |
| Invalid — above maximum | One unit above valid range |
| Invalid — special chars | Only if the feature sanitizes input |

### 4 — Select Representatives & Expected Outcomes

| ID | Variable | Class | Test Value | Expected Result |
|----|----------|-------|------------|-----------------|
| DT-01 | email | valid typical | `user@example.com` | accepted |
| DT-02 | email | missing @ | `userdomain.com` | rejected |
| DT-03 | email | empty | `` | rejected |
| DT-04 | password | valid | `Secret#9` | accepted |
| DT-05 | password | too short | `Ab1` | rejected |

### 5 — Build Multi-Variable Test Cases
Use **one-variable-at-a-time** isolation:
- Baseline case: all variables valid → expect success
- Vary ONE variable to an invalid class → expect failure
- Repeat for each variable independently

Never combine two invalid variables in one test case — it hides the root cause.

### 6 — Number and Document
Format: `DT-<FEATURE_ID>-<NN>`. Record: preconditions, inputs, expected result, actual result, pass/fail.

## Quick Reference

| What to never forget | Why it matters |
|----------------------|----------------|
| Empty / null class | Most apps miss null-guard bugs |
| Invalid format class | Catches injection and parse errors |
| Boundary values | Delegate to [[boundary-value-analysis]] |
| State preconditions | Login state, account flags affect outcomes |
| One class = one representative | More reps add noise, not coverage |

## Common Mistakes

- **Skipping invalid classes** — they catch more bugs than valid ones
- **Basing classes on code, not spec** — read requirements, not source
- **Over-partitioning** — if the system treats two ranges identically, merge them
- **Forgetting hidden variables** — user role, session token, locale are inputs too
- **Testing all-invalid combos** — isolate variables; combined invalids obscure root cause

## Output
Produce a Markdown table per feature:
`ID | Variable(s) | Class Name | Test Value | Preconditions | Expected | Actual | Pass/Fail`
