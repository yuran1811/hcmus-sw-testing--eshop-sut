# Agent Skill: AI Audit Report Generator

## Metadata

| Field    | Value                                                         |
| -------- | ------------------------------------------------------------- |
| Skill ID | `ai-audit-report-generator`                                   |
| Version  | 1.0                                                           |
| Author   | AI Agent                                                      |
| Created  | 2026-06-26                                                    |
| Reusable | Yes — works for any homework requiring AI Audit Report        |
| Purpose  | Automatically generate and maintain AI Audit Report (HW02 §9) |

## Purpose

This skill automates the creation and maintenance of the **AI Audit Report** as required by HW02 Section 9. It ensures that every AI interaction during the homework process is properly logged, formatted, and ready for submission.

The AI Audit Report is a **mandatory appendix** — missing it results in **0 points**.

---

## Prerequisites

1. The `report/AI_Audit_Report.md` file exists in the repository
2. Other agent skills (`test-writer`, `test-runner`, `ai-gap-analysis`) have been invoked and their outputs are available
3. Conversation history / logs are accessible

---

## Auto-Logging Mechanism

There are 3 ways audit entries get logged:

### Method 1: Automatic via Rule (for normal chat prompts)

The file `.gemini/rules.md` contains a mandatory rule that forces the AI to
automatically append an audit entry to `report/AI_Audit_Report.md` after every
meaningful interaction. This works for normal chat prompts without needing to
invoke any skill.

**How it works**: When you open this project in Gemini Code Assist (or similar
AI tools that support `.gemini/rules.md`), the AI reads the rule and will
automatically log every interaction.

### Method 2: Built-in to other skills

Each agent skill (`test-writer`, `test-runner`, `ai-gap-analysis`) has an
"AI AUDIT LOGGING" phase as its final step. When you invoke those skills, they
automatically append an entry.

### Method 3: Manual invocation of this skill

Use this skill in `APPEND` mode to manually log an entry, or `GENERATE` mode
to compile the full report at the end.

---

## Input Parameters

| Parameter          | Required | Description                                              | Example                    |
| ------------------ | -------- | -------------------------------------------------------- | -------------------------- |
| `MODE`             | Yes      | `APPEND` (add single entry) or `GENERATE` (full report)  | `GENERATE`                 |
| `AI_TOOL_NAME`     | Yes\*    | Name of AI tool used (\*required for APPEND mode)        | `Claude Opus 4`            |
| `TASK_DESCRIPTION` | Yes\*    | What the AI was asked to do (\*required for APPEND mode) | `Domain Testing for FR-01` |
| `PROMPT_SUMMARY`   | Yes\*    | Summary of the prompt given (\*required for APPEND mode) | `Analyze FR-01 inputs...`  |
| `OUTPUT_SUMMARY`   | Yes\*    | Summary of AI output (\*required for APPEND mode)        | `Generated 15 test cases`  |
| `STUDENT_ID`       | No       | Student ID for report header                             | `25127001`                 |
| `STUDENT_NAME`     | No       | Student name for report header                           | `Nguyen Van A`             |

---

## Execution Workflow

### MODE: APPEND — Add a Single Audit Entry

Use this mode after each AI interaction to log it immediately.

#### Step 1: Collect Interaction Data

Gather the following information from the current AI interaction:

| Field        | Source                   | Description                                           |
| ------------ | ------------------------ | ----------------------------------------------------- |
| AI Tool Name | User input / system info | e.g., `Gemini 2.5 Pro`, `Claude Opus 4`, `ChatGPT-4o` |
| Date/Time    | System clock             | ISO 8601 format: `YYYY-MM-DD HH:MM:SS`                |
| Task         | Context                  | What was the AI asked to do                           |
| Prompt       | Conversation             | The actual prompt or a faithful summary               |
| Output       | Conversation             | The AI's response or a faithful summary               |
| Human Review | User                     | Was the output reviewed, modified, or used as-is      |

#### Step 2: Append Entry to AI_Audit_Report.md

Open `report/AI_Audit_Report.md` and append a new entry at the end of the detailed log section:

````markdown
### Entry {N}

| Field              | Value                         |
| ------------------ | ----------------------------- |
| **AI Tool**        | {AI_TOOL_NAME}                |
| **Date/Time**      | {YYYY-MM-DD HH:MM:SS}         |
| **Task**           | {TASK_DESCRIPTION}            |
| **Feature**        | {FEATURE_ID} — {FEATURE_NAME} |
| **Bloom-AI Level** | G9.2 (Apply) / G9.3 (Analyse) |

#### Prompt

**[Original User Prompt]**

```text
{The raw prompt written by the user/tester.}
```

**[Skill Execution Details]**

```text
{Details of the agent skill invocation, parameters, and instructions, if applicable.}
```
````

#### AI Output

```text
{Summary of AI output. Include key results, numbers, and any
important details. If output is very long, summarize and note
"[full output: see {file_path}]"}
```

#### Human Review

| Aspect           | Detail                                       |
| ---------------- | -------------------------------------------- |
| Reviewed by      | {Student name}                               |
| Review date      | {YYYY-MM-DD}                                 |
| Corrections made | {Yes/No — if Yes, describe what was changed} |
| Quality rating   | {Excellent / Good / Acceptable / Poor}       |
| Issues found     | {None / List of issues with AI output}       |

````

---

### MODE: GENERATE — Generate Complete AI Audit Report

Use this mode at the end of the homework to compile the full report.

#### Step 1: Scan for All AI Interactions

1. Read existing entries in `report/AI_Audit_Report.md`
2. Scan conversation logs for any unlogged AI interactions
3. Check all skill invocation records

#### Step 2: Generate Report Header

```markdown
# AI Audit Report — HW02 Domain Testing

## Thông tin sinh viên (Student Information)

| Field | Value |
|-------|-------|
| **MSSV (Student ID)** | {STUDENT_ID} |
| **Họ tên (Full Name)** | {STUDENT_NAME} |
| **Mã bài tập (Assignment)** | HW02-AI — Domain Testing on EShop |
| **Ngày nộp (Submission Date)** | {YYYY-MM-DD} |

## Tuyên bố sử dụng AI (AI Usage Declaration)

> "I use AI tools for the following tasks:"

## Tổng quan sử dụng AI (AI Usage Overview)

| # | AI Tool | Task Category | Feature | Date | Bloom-AI Level |
|---|---------|--------------|---------|------|----------------|
| 1 | {tool} | Domain Testing Design | {FR-XX} | {date} | G9.2 (Apply) |
| 2 | {tool} | BVA Design | {FR-XX} | {date} | G9.2 (Apply) |
| 3 | {tool} | Test Execution | {FR-XX} | {date} | G9.2 (Apply) |
| 4 | {tool} | Gap Analysis | {FR-XX} | {date} | G9.3 (Analyse) |
| 5 | {tool} | Bug Report Writing | {FR-XX} | {date} | G9.2 (Apply) |
| ... | ... | ... | ... | ... | ... |
````

#### Step 3: Compile Detailed Entries

Organize all APPEND entries chronologically under the header. Group by feature if multiple features were tested.

```markdown
---
## Chi tiết từng lần sử dụng AI (Detailed AI Interaction Log)

### Feature: {FEATURE_NAME} ({FEATURE_ID})

{ All APPEND entries related to this feature, in chronological order }
---

### Feature: {FEATURE_NAME_2} ({FEATURE_ID_2})

{All APPEND entries related to this feature}

---
```

#### Step 4: Generate Statistics Summary

```markdown
## Thống kê tổng hợp (Summary Statistics)

| Metric                                 | Value                   |
| -------------------------------------- | ----------------------- |
| Total AI interactions                  | {N}                     |
| AI tools used                          | {list of unique tools}  |
| Features covered                       | {list of features}      |
| Total test cases generated by AI       | {count}                 |
| Test cases modified after human review | {count} ({percentage}%) |
| Test cases accepted as-is              | {count} ({percentage}%) |
| AI accuracy rate (before review)       | {percentage}%           |
| Bugs found with AI assistance          | {count}                 |
| Bugs found by human only (AI missed)   | {count}                 |

### AI Contribution Breakdown

| Task                    | AI Contribution | Human Contribution |
| ----------------------- | --------------- | ------------------ |
| Domain Testing analysis | {%}             | {%}                |
| BVA analysis            | {%}             | {%}                |
| Test case writing       | {%}             | {%}                |
| Test execution          | {%}             | {%}                |
| Bug identification      | {%}             | {%}                |
| Report writing          | {%}             | {%}                |
```

#### Step 5: Cross-reference with AI Critique

Ensure the AI Audit Report is consistent with the AI Critique (Section 10 of HW02). Flag any discrepancies.

---

## AI Audit Entry Templates for Common Tasks

### Template: Domain Testing Design

````markdown
### Entry {N} — Domain Testing Design

| Field              | Value                                                              |
| ------------------ | ------------------------------------------------------------------ |
| **AI Tool**        | {tool_name}                                                        |
| **Date/Time**      | {timestamp}                                                        |
| **Task**           | Design Domain Testing test cases for {FEATURE_ID} ({FEATURE_NAME}) |
| **Bloom-AI Level** | G9.2 (Apply)                                                       |

#### Prompt

**[Original User Prompt]**

```text
{User's raw prompt prompting this task}
```
````

**[Skill Execution Details]**

```text
Invoked `domain-testing-writer` agent skill with parameters:

- FEATURE_ID: {FR-XX}
- FEATURE_NAME: {name}
- POOL: {A/B/C/D}

Detailed instruction: Follow the 5-step Domain Testing methodology
(B1→B5) as taught in class to analyze {FEATURE_NAME} and generate
comprehensive test cases with fault isolation principle.
```

#### AI Output

- Identified {X} input variables with {Y} equivalence classes
- Generated {Z} test cases following fault isolation principle
- Created boundary analysis with {W} boundary points
- Files created: {list of TC files}

#### Human Review

| Aspect           | Detail             |
| ---------------- | ------------------ |
| Reviewed by      | {name}             |
| Corrections made | {Yes/No — details} |
| Quality rating   | {rating}           |
| Issues found     | {issues or None}   |

````

### Template: Test Execution

```markdown
### Entry {N} — Test Execution

| Field              | Value                                            |
| ------------------ | ------------------------------------------------ |
| **AI Tool**        | {tool_name}                                      |
| **Date/Time**      | {timestamp}                                      |
| **Task**           | Execute test cases for {FEATURE_ID} on EShop SUT |
| **Bloom-AI Level** | G9.2 (Apply)                                     |

#### Prompt

Invoked `test-runner` agent skill with parameters:

- FEATURE_SLUG: {slug}
- TEST_LEVEL: {API/UI/BOTH}

#### AI Output

- Executed {N} test cases
- Results: {P} PASS, {F} FAIL, {B} BLOCKED
- Pass rate: {rate}%
- Bugs discovered: {count}
- Bug IDs: {list}

#### Human Review

| Aspect           | Detail                                        |
| ---------------- | --------------------------------------------- |
| Reviewed by      | {name}                                        |
| Corrections made | {details}                                     |
| False positives  | {count — tests marked FAIL but actually PASS} |
| False negatives  | {count — tests marked PASS but actually FAIL} |
````

### Template: Gap Analysis

```markdown
### Entry {N} — AI Gap Analysis

| Field              | Value                                     |
| ------------------ | ----------------------------------------- |
| **AI Tool**        | {tool_name}                               |
| **Date/Time**      | {timestamp}                               |
| **Task**           | Analyze AI coverage gaps for {FEATURE_ID} |
| **Bloom-AI Level** | G9.3 (Analyse)                            |

#### Prompt

Invoked `ai-gap-analysis` agent skill to compare AI-generated test
cases against SRS requirements and identify missing coverage.

#### AI Output

- Requirements coverage: {X}/{Y} ({percentage}%)
- Missing test cases identified: {count}
- Root causes: {prompt quality / tool limitation / feature complexity}
- Supplementary test cases generated: {count}

#### Human Review

| Aspect                         | Detail                                     |
| ------------------------------ | ------------------------------------------ |
| Reviewed by                    | {name}                                     |
| Agreement with AI analysis     | {Fully agree / Partially agree / Disagree} |
| Additional gaps found by human | {count and description}                    |
```

---

## Output Files

| File                        | Description                                   |
| --------------------------- | --------------------------------------------- |
| `report/AI_Audit_Report.md` | Complete AI Audit Report (mandatory appendix) |

---

## Compliance Checklist (HW02 §9)

Before submission, verify the AI Audit Report contains:

- [ ] AI usage declaration ("I use AI tools for the following tasks:")
- [ ] Name of each AI tool used
- [ ] Date and time of each interaction
- [ ] The prompt given to AI (or faithful summary)
- [ ] The AI output (or faithful summary)
- [ ] Human review notes for each interaction
- [ ] All interactions are logged (no gaps)
- [ ] Report is in Markdown format
- [ ] PDF export is also included in submission

---

## Tips for Human Reviewer

- [DO] Ensure EVERY AI interaction is logged — even quick questions
- [DO] Be honest about AI contributions vs human contributions
- [DO] Include interactions where AI was wrong — this shows critical thinking
- [DO] Note all corrections you made to AI output
- [DO NOT] Fabricate or backdate entries
- [DO NOT] Copy another student's audit log — prompts must be unique
