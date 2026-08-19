---
name: hw06-main-report
description: >-
  Assembles the HW06 main Markdown/PDF report, README self-assessment, test
  summary, and submission zip checklist using existing HW06 skeletons and HW5
  report exemplars for consistency. Use when writing the HW06 main report,
  README self-assessment, or packaging the Moodle zip.
---

# HW06 Main Report & Submission Pack

## Overview

Fill existing HW06 skeletons; keep narrative consistency with HW5 reports. **Do not create new report templates** — reference HW5 exemplars and the stubs already under `23127152-hw6/`.

## Exemplars from `hw5/23127152` (read-only reference)

```bash
git show hw5/23127152:23127152_HW05_AI_Performance_098/README.md
git show hw5/23127152:23127152_HW05_AI_Performance_098/23127152-HW05-Main-Report.md
git show hw5/23127152:23127152_HW05_AI_Performance_098/AI_Audit_Report.md
```

Reuse from HW5:

| Pattern | Where |
|---------|--------|
| Self-assessment table | README |
| Compact test summary tables | README |
| Numbered report sections + evidence links | Main report |
| Audit acknowledgement + session log | via skill `ai-audit-report` + HW5 entry template |
| Bug local MD | via skill `bug-report` + HW5 bug template |

## HW06 working files (already scaffolded)

| Deliverable | Path |
|-------------|------|
| Main report | `23127152-hw6/report/23127152_HW06_Report.md` |
| CI/CD report | `23127152-hw6/report/CI_CD_Report.md` |
| README | `23127152-hw6/README.md` |
| AI Audit | `23127152-hw6/ai-audit/AI_Audit_Report.md` |
| AI Critique | `23127152-hw6/ai-audit/AI_Critique.md` (skill `ai-critique`) |
| Checklist | `23127152-hw6/CHECKLIST.md` |

## Main report must cover

1. API selection (3 pools) + rationale  
2. Per API: generate → audit → extend → execute → bugs  
3. Postman features used  
4. CI/CD pointer  
5. Agent skill / generator design pointer  
6. Conclusion + counts  

## README must include

- Self-assessment grades (30+30+30+10)
- Test summary: APIs, generated, added, executed, passed, failed, bugs
- Repo / collection / Issues links

## Zip name

`23127152_HW06_AI_API_<SelfAssessedGrade>.zip`  
SelfAssessedGrade = 3 digits `000`–`100`.

## Process

1. Ensure pipelines for all 3 APIs complete.  
2. Fill main report sections from TC folders + Newman + bugs.  
3. Sync README tables.  
4. Run `ai-critique` + finalize `ai-audit-report`.  
5. Export PDFs for main + audit + critique.  
6. Export `git-commit-log.txt`.  
7. Verify Moodle zip contents against `CHECKLIST.md` Phase 7.

## Self-review checklist

- [ ] No missing required zip item (missing doc = 0)
- [ ] Counts consistent across README / report / Excel
- [ ] HW5-quality evidence linking (paths, SHAs, Issue URLs)
- [ ] Student ID header evidence present

## Common mistakes

- Inventing a second report structure beside the skeleton
- Self-assessment total ≠ sum of criteria
- Forgetting Excel / Newman HTML / commit log in zip
