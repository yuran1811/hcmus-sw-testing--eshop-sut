---
name: perf-ai-audit-writer
description: >
  Use this skill to produce the two mandatory AI accountability documents for
  a performance testing report: the AI Audit Log (a structured record of every
  AI interaction used during the engagement) and the AI Critique (a 200-300
  word reflective analysis of where AI was wrong, biased, or incomplete).
  Trigger when the user needs to write an AI audit report, document their AI
  usage for submission, produce an AI critique section, reflect on AI errors
  made during test plan design or log analysis, or extract an interaction log
  from a session history. Also trigger when the user wants a prompt that
  automatically extracts audit metadata from a completed AI conversation.
---

# AI Audit Writer for Performance Testing

## Purpose

Produce accurate, honest documentation of how AI was used during a
performance testing engagement. This covers two documents: the interaction
log and the critical reflection. Both require the human to supply the actual
content; this skill provides the structure and guides the extraction process.

## Document A — AI Audit Log

### Structure

The audit log records every AI interaction used during the engagement.
One entry per distinct interaction (one entry per prompt-response pair,
or per logical task if multiple back-and-forth exchanges served one purpose).

```markdown
# AI Audit Log — [Application Name] Performance Testing

**Declaration:** I used AI assistance for the tasks listed below.

---

## Interaction [N]

| Field            | Content                                                       |
|------------------|---------------------------------------------------------------|
| Tool             | [Claude claude-sonnet-4-6 / ChatGPT-4o / Gemini / other]     |
| Date and time    | [YYYY-MM-DD HH:MM]                                            |
| Task             | [One sentence: what you asked AI to do]                       |
| Prompt           | [The exact prompt or a faithful paraphrase if very long]      |
| AI output        | [Summary of what AI produced, or paste verbatim if short]     |
| Used as-is       | [Yes / No — if No, describe what you changed]                 |
| Corrections made | [What you modified, added, or removed from the AI output]     |

---
```

Repeat the entry block for every interaction. If a task involved no AI
assistance, declare that explicitly:

```markdown
## Task: [Task name]
No AI assistance was used for this task.
```

### Extraction prompt

After completing a session with an AI tool, send this prompt to extract
the audit metadata for that session:

```
Review our conversation and extract an AI audit log entry for each
distinct task I asked you to help with. For each task, provide:

- Task: one sentence describing what I asked you to do
- Prompt: the key prompt I sent (quote it or paraphrase if long)
- AI output: a one-sentence summary of what you produced
- Issues in output: any errors, omissions, or unrealistic values
  that were identified during or after the session

Format each entry as a Markdown table with those four rows.
Do not add commentary. Output the entries only.
```

### Summary statistics

At the end of the log, add a summary table:

```markdown
## Summary

| Metric                                | Value |
|---------------------------------------|-------|
| Total AI interactions                 | N     |
| Outputs used as-is                    | X     |
| Outputs used after correction         | Y     |
| Outputs discarded entirely            | Z     |
| Bloom-AI levels demonstrated          | [list]|
```

---

## Document B — AI Critique

### Purpose

The critique is a 200-300 word reflective paragraph (or two to three
paragraphs) that answers three questions:
1. Where specifically did AI produce incorrect, biased, or incomplete output?
2. Why did AI fail to catch its own error?
3. What principle about working with AI did this engagement teach you?

### Writing guidance

Write this in your own voice. The critique should be grounded in specific
evidence from your engagement — cite actual incorrect metric values, wrong
parameter choices, or inapplicable recommendations the AI made. Generic
statements about AI limitations without specific examples do not satisfy
this requirement.

Structure suggestion:
- Paragraph 1 (80-110 words): Describe two or three specific errors AI made.
  For each error, state what AI claimed and what the correct value or
  approach was. Cite the specific step or document where the error appeared.
- Paragraph 2 (60-90 words): Analyze why the AI made these errors.
  Consider: missing context in the prompt, model knowledge cutoff,
  column or formula confusion, or unfounded assumptions about the stack.
- Paragraph 3 (60-80 words): State the principle you now apply when
  using AI for technical analysis. This should be actionable, not vague.

### Prompting AI to produce a draft critique

You may ask AI to produce a first draft, but you must revise it
substantially to reflect your actual experience. Use this prompt:

```
Based on these specific errors found during our performance testing session:
[list the errors from the misinterpretation findings table]

And these inapplicable optimization recommendations:
[list the not-applicable recommendations from the classification table]

Write a draft AI critique of 200-300 words covering:
1. What went wrong and specific evidence (cite the exact incorrect values)
2. Root cause of each failure
3. One actionable principle for future AI collaboration in performance testing

Do not use generic statements. Every claim must reference a specific
finding from the list above.
```

After receiving the draft:
- Verify that every number and claim in the draft matches your actual data.
- Replace any claim that AI softened or generalized with the specific case.
- Rewrite in your own voice.

### Quality check before submitting

Verify the critique meets these criteria before including it:

- Word count is between 200 and 300 words.
- At least two specific AI errors are named with exact incorrect values.
- The text references the application or scenario being tested,
  not a generic description.
- At least one root cause explanation goes beyond "AI was not given
  enough context" — identify specifically what context was missing and why.
- The concluding principle is actionable (describes a concrete behavior
  change) rather than philosophical.

## Output deliverables

- AI Audit Log Markdown file with one entry per AI interaction.
- AI Critique as a separate Markdown section or file.
- Summary statistics table.
