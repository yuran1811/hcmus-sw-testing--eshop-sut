---
name: dtt
description: Use when designing test cases for business logic governed by multiple conditions with discrete outcomes — login rules, pricing tiers, form validation, access control. Triggers: "all combinations of conditions", "decision table", "condition/effect", "truth table", "test coverage for rules".
---

# Decision Table Testing (DTT)

A black-box technique that exhaustively maps combinations of conditions to expected effects, then systematically reduces them to a minimal, non-redundant test suite.

## When to Use

- Logic depends on 2–6 independent boolean/enumerated conditions
- Each condition directly determines one or more effects (actions/outputs)
- You need full combinatorial coverage before shortening
- Complement with equivalence partitioning when conditions have many values

**Not ideal for:** Sequential/stateful flows (use state-transition testing), numeric ranges without discrete thresholds (use EP/BVA), or single-condition logic.

---

## Step 1 — Identify Conditions and Effects

**Conditions** = inputs or predicates that influence behaviour (each evaluates to T/F or a small set of values).  
**Effects** = observable outputs or actions that result from the combination.

```
Example: Online order discount system

Conditions:
  C1: Customer is a member?        (T / F)
  C2: Order value >= $100?         (T / F)
  C3: Coupon code applied?         (T / F)

Effects:
  E1: Apply 10% member discount
  E2: Apply 5% large-order discount
  E3: Apply coupon discount
  E4: No discount
```

**Tips:**
- Keep each condition binary if possible; multi-valued conditions multiply columns fast.
- Effects must be mutually exclusive OR independently checkable — clarify with stakeholders.
- Name conditions as yes/no questions; name effects as observable actions.

---

## Step 2 — Build the Full Truth Table

For **N binary conditions** → **2^N columns** (one per combination).

Layout: conditions occupy the top rows, effects the bottom rows, columns are test cases.

```
            TC1  TC2  TC3  TC4  TC5  TC6  TC7  TC8
C1 Member?   T    T    T    T    F    F    F    F
C2 >=100?    T    T    F    F    T    T    F    F
C3 Coupon?   T    F    T    F    T    F    T    F
---------------------------------------------------
E1 Member %  Y    Y    Y    Y    N    N    N    N
E2 Order  %  Y    Y    N    N    Y    Y    N    N
E3 Coupon %  Y    N    Y    N    Y    N    Y    N
E4 No disc.  N    N    N    N    N    N    N    Y
```

**Construction rule:** Fill condition rows using a binary counter pattern — alternate T/F in blocks of 2^(N-i) for the i-th row (top row = largest block).

---

## Step 3 — Shorten the Test Suite

Apply these reductions **in order**, re-checking after each pass.

### 3a. Remove impossible combinations

Cross out columns where the combination cannot occur in reality.

```
Example: "Coupon applied" requires "Member" in this system.
So C1=F, C3=T is an impossible combination.
-> Strike TC7 (F, F, T) and TC5 (F, T, T).
Remaining valid columns: TC1, TC2, TC3, TC4, TC6, TC8
```

### 3b. Merge columns with identical effects ("don't care")

If two columns differ in exactly one condition AND produce identical effects, that condition is irrelevant for those cases — merge and mark it **-** (don't care).

```
Check TC1 (T,T,T) vs TC3 (T,F,T):
  TC1 effects: E1=Y, E2=Y, E3=Y, E4=N
  TC3 effects: E1=Y, E2=N, E3=Y, E4=N
  -> Effects differ (E2), so cannot merge.

Check TC2 (T,T,F) vs TC4 (T,F,F):
  TC2 effects: E1=Y, E2=Y, E3=N, E4=N
  TC4 effects: E1=Y, E2=N, E3=N, E4=N
  -> Effects differ (E2), so cannot merge.
```

**Only merge when ALL effects are identical.** If any effect differs, keep columns separate.

### 3c. Final reduced table

After removing TC5 and TC7 (impossible combos), 6 test cases remain:

```
            TC1  TC2  TC3  TC4  TC6  TC8
C1 Member?   T    T    T    T    F    F
C2 >=100?    T    T    F    F    T    F
C3 Coupon?   T    F    T    F    F    F
------------------------------------------
E1 Member %  Y    Y    Y    Y    N    N
E2 Order  %  Y    Y    N    N    Y    N
E3 Coupon %  Y    N    Y    N    N    N
E4 No disc.  N    N    N    N    N    Y
```

Each surviving column becomes one test case.

---

## Quick Reference

| Step | Action | Output |
|------|--------|--------|
| 1 | List conditions (T/F or enum) + effects | C list, E list |
| 2 | Generate 2^N columns using binary counter | Full truth table |
| 3a | Strike impossible combinations | Reduced table |
| 3b | Merge identical-effect columns (mark - for don't-care) | Minimal table |
| 3c | Each surviving column = one test case | Final test suite |

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Treating a range as a condition directly | Split into boolean predicates first (e.g., "value >= threshold") |
| Merging columns with different effects | Only merge when ALL effects match exactly |
| Forgetting impossible combos | Review business rules before shortening — invalid combos give false coverage |
| Too many conditions (N > 6) | Split the table by grouping related conditions; apply risk-based selection |
| Effects not exhaustive | Add a catch-all effect (e.g., "error / no action") to cover unaccounted rows |

---

## Real-World Impact

A 6-condition table starts with 64 test cases. After removing impossible combos and merging identical-effect columns, it typically reduces to 10–20 meaningful cases — each with clear traceability to a specific business rule combination.
