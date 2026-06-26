# MANDATORY RULE: AI Audit Logging

This rule applies to ALL conversations in this repository. After completing ANY task that produces meaningful output (test case design, test execution, bug analysis, code review, etc.), you MUST append an audit entry to `report/AI_Audit_Report.md`.

## When to Log

Log an entry when you:

- Design or generate test cases
- Execute test cases or analyze results
- Identify or report bugs
- Perform gap analysis or coverage review
- Answer questions about testing methodology
- Generate or modify any report content
- Perform any analysis related to the EShop SUT

Do NOT log trivial interactions like "what time is it" or file navigation.

## How to Log

Append the following entry at the end of the "Chi tiet tung lan su dung AI" section in `report/AI_Audit_Report.md`, BEFORE the "Thong ke tong hop" section:

```markdown
### Entry {N}

| Field              | Value                          |
| ------------------ | ------------------------------ |
| **AI Tool**        | {Your model name}              |
| **Date/Time**      | {Current timestamp YYYY-MM-DD HH:MM:SS} |
| **Task**           | {Brief description of what was asked} |
| **Feature**        | {Feature ID if applicable, otherwise "General"} |
| **Bloom-AI Level** | {G9.2 (Apply) or G9.3 (Analyse)} |

#### Prompt

```text
{The user's prompt, or a faithful summary if too long}
```

#### AI Output

```text
{Summary of your response: key deliverables, numbers, files created/modified}
```

#### Human Review

| Aspect           | Detail    |
| ---------------- | --------- |
| Reviewed by      | (pending) |
| Review date      | (pending) |
| Corrections made | (pending) |
| Quality rating   | (pending) |
| Issues found     | (pending) |
```

## Entry Numbering

- Read the existing entries in `report/AI_Audit_Report.md`
- Find the highest entry number
- Use the next number (N + 1)
- If no entries exist yet, start with Entry 1

## Also Update the Overview Table

Add a row to the "Tong quan su dung AI" table at the top of the report with the same information.

## Important Notes

- Always use the CURRENT timestamp, not a fabricated one
- Be faithful to the actual prompt and output
- Leave "Human Review" fields as "(pending)" for the student to fill in later
- Do NOT skip this step even if the task seems minor
