---
name: perf-ai-audit-writer
description: >
  Use this skill to produce the two mandatory AI accountability documents for
  a performance testing report: the AI Audit Log and a 200-300 word AI
  Critique. Trigger when documenting AI usage, reviewing AI errors, or
  preparing the final performance-testing submission.
---

# AI Audit Writer for Performance Testing

## Purpose

Produce accurate, honest documentation of AI use during a performance-testing engagement. The audit log records real interactions; the critique reflects on concrete AI errors and the collaboration principles learned from them.

## AI Audit Log

Use one entry for each real prompt-response interaction:

```markdown
### Entry N
- Tool: <tool/model>
- Date/time: <YYYY-MM-DD HH:MM>
- Task context: <one sentence>
- Prompt used (verbatim):
  > <exact user prompt>
- AI output (verbatim or faithful summary):
  > <output>
- What the student changed/kept from this output: <review decision>
```

Do not split one prompt into fabricated sub-entries. Do not invent timestamps, prompts or corrections.

## AI Critique

The critique must contain 200–300 words and answer:

1. Where was AI specifically wrong, biased or incomplete?
2. Why did AI fail to catch the error?
3. What actionable principle follows for future AI collaboration?

Use evidence from the real engagement, such as incorrect p95 values, confusion between `elapsed` and `Latency`, failures hidden behind HTTP 200, wrong timestamps or optimization recommendations that assume a technology absent from the SUT.

Before submission, verify:

- word count is between 200 and 300;
- at least two concrete AI errors are named with correct values;
- every number matches raw data;
- root causes are specific;
- the final principle describes a concrete verification behavior.

## Deliverables

- `AI_Audit_Report.md`: chronological interaction log only.
- `ai-critique.md` or a dedicated main-report section: final 200–300 word critique.
