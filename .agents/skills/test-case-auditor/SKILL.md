---
name: test-case-auditor
description: Performs the "Human Review / Audit" step of the HW06 pipeline — labels each AI-generated test case as VALID/INVALID/INCOMPLETE with justification, fixes wrong or incomplete test cases, and finds ≥5 test cases AI missed (prioritizing security + state transitions) with an explanation of why they were missed. Use this skill right after api-test-case-generator, or when the user says "audit test cases", "review AI-generated test cases", "extend test cases", "add missed test cases".
---

# Test Case Auditor (Human Review + Extend)

## When to use
Right after getting a raw test-case set from `api-test-case-generator`, BEFORE feeding it into Postman for execution.

## Step 1 — Audit each test case (assign a label)
For each row in the Excel test-case file, review and fill in:
- **Audit_Label**: `VALID` (correct, complete, runs exactly as designed) / `INVALID` (wrong logic, wrong input, wrong or impossible expected result) / `INCOMPLETE` (missing step, missing assertion, missing precondition, ambiguous)
- **Audit_Reason**: a short, CLEAR sentence explaining WHY you assigned that label — this is grading evidence, it must not be left blank or filled with something generic like "good test case."

### Concrete criteria for labeling
| Label | Condition |
|---|---|
| VALID | Input, steps, and expected result are consistent and match the spec exactly; no changes needed |
| INVALID | Expected result is wrong (e.g. expects 200 but the spec requires 400); input doesn't match the declared partition; test case is a full duplicate of another case |
| INCOMPLETE | Missing precondition (e.g. needs a token but doesn't mention it); missing schema assertion; description too vague to execute; missing cleanup step |

### For INVALID/INCOMPLETE test cases
Fix them directly in the file (don't delete the original row — keep the audit trail), update Steps/Input/Expected_Result correctly, and clearly note in Audit_Reason what was fixed.

## Step 2 — Extend: find ≥5 test cases AI missed
Don't ask the AI to generate more at this step — this is a THINK-IT-YOURSELF step (demonstrates analysis skill, not more AI dependence). Prioritize looking at:
1. **Security**: attack variants AI can't come up with because they require deep business-logic understanding (e.g. tampering with the price in a checkout request to buy cheaper, a race condition applying the same discount code twice at once, reusing a token after logout).
2. **State transition**: rare invalid-transition edges, or transitions with hidden secondary conditions (e.g. an order can only be confirmed if stock is available — test what happens when stock runs out mid-confirmation).
3. **EShop-specific business edge cases**: a discount code expiring right at submission time, checking out with an empty cart, a product being deleted by an admin while a user is adding it to their cart.

For EVERY added test case, you must write a "Why AI missed this" explanation, categorized as one of:
- **Prompt quality** (the question wasn't specific enough, missing business context)
- **Model limitation** (AI can't reason about race conditions/real-time behavior, or doesn't know business context beyond the spec)
- **API characteristics** (a hidden business rule not stated in the spec, only discoverable by reading the code or manual testing)

Add these to the same Excel file, with `Source = Human`, and write the miss-reason in `Notes`.

## Step 3 — Summarize stats for the report
After auditing one API's test cases, calculate and record:
- Total AI-generated test cases initially
- Count per label (VALID/INVALID/INCOMPLETE) and percentages
- Number of test cases fixed
- Number of added test cases (must be ≥ 5)
- Distribution by Category (DomainPartition/StateTransition/Security/Schema)

This table feeds directly into the audit section of the main report and into the 200-300 word "AI Critique" section — quantitative numbers are the evidence behind your assessment of the AI.

## Important reminders
- The student is FULLY RESPONSIBLE for the final test cases — never submit raw AI output as-is even if labeled VALID.
- If unsure whether a test case is correct, actually run it first (via the `postman-newman-runner` skill) before labeling it — don't guess.

## Output language
The audit labels/reasons and every deliverable text you write here should be in **Vietnamese**, since that's the submission language for this course.
