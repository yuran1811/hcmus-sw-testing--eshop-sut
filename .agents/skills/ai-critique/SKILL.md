---
name: ai-critique
description: >-
  Writes the mandatory HW06 AI Critique (200–300 words) on where AI was wrong,
  biased, or incomplete and what was learned about collaborating with AI. Use
  when writing AI Critique, AI reflection, or HW06 appendix critique.
---

# AI Critique (HW06)

## Overview

Produce a **200–300 word** critique paragraph (or short essay) answering the assignment prompts. Do **not** invent a new critique template file.

## Template / exemplar source (HW5 — reuse, don't recreate)

Pull style and honesty bar from branch `hw5/23127152`:

```bash
git show hw5/23127152:23127152_HW05_AI_Performance_098/AI_Critique.md
```

That exemplar: concrete wrong claim → evidence that disproves it → root cause (prompt/tooling/data) → collaboration principle. Match that rigor for API testing (not performance).

## Must address

1. Where did the AI get something **wrong, biased, or incomplete**?
2. **Why** did it fail (prompt quality, missing SUT source, model limits, trusting its own schema assumptions)?
3. What **principle** did you learn about collaborating with AI on this assignment?

Ground claims in **this homework's** artifacts (named TCs, SEC misses, audit INVALID rows, bugs AI didn't suggest).

## Output

- `23127152-hw6/ai-audit/AI_Critique.md`
- Export PDF for zip submission
- Word count 200–300 (state count at bottom)

## Process

1. Skim `AI_Audit_Report.md` + audit INVALID/INCOMPLETE + extended “Why AI missed”.
2. Pick 1–2 concrete failures (prefer security/state).
3. Draft in Vietnamese or English consistently with other HW06 docs (HW5 critique was Vietnamese — prefer Vietnamese for consistency across homeworks unless user asks otherwise).
4. Count words; trim/expand to band.
5. Log drafting help (if any) via `ai-audit-report`.

## Self-review checklist

- [ ] 200–300 words
- [ ] Names a concrete AI mistake with evidence
- [ ] Explains cause
- [ ] States a collaboration principle
- [ ] Not a generic “AI is useful but imperfect” filler

## Common mistakes

- Critique unrelated to logged audit sessions
- Under 200 / over 300 words
- Blaming the SUT instead of critiquing the AI collaboration
