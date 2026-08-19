# Agent Skills — HW06 API Testing (23127152)

Skills live in **`.agents/skills/`**. Report-related templates are **restored from** branch `hw5/23127152` (not rewritten).

## Technique → Skill map

| HW06 requirement / technique | Skill | Templates |
|------------------------------|-------|-----------|
| Orchestrate full homework | `hw06-api-testing` | — |
| Generate ≥35 TCs (domain · state · security · schema) | `api-test-generate` | `templates/generated-tc-template.md` |
| Human audit VALID/INVALID/INCOMPLETE | `api-test-audit` | `templates/audit-tc-template.md` |
| Extend ≥5 TCs AI missed | `api-test-extend` | `templates/extended-tc-template.md` |
| Postman + Newman + `X-Student-Id` | `api-test-execute` | `templates/execution-notes-template.md` |
| CI/CD two sample runs | `api-test-cicd` | uses `23127152-hw6/report/CI_CD_Report.md` |
| G9.5 AI test-generator design | `api-test-generator-design` | `templates/generator-pseudocode-skeleton.md` |
| Bug → GitHub Issue + local MD | `bug-report` | **from HW5** `templates/bug-report-template.md` |
| AI usage log (mandatory) | `ai-audit-report` | **from HW5** `templates/audit-log-entry-template.md` |
| AI Critique 200–300 words | `ai-critique` | **exemplar** `hw5/.../AI_Critique.md` (no new template) |
| Main report + README + zip | `hw06-main-report` | **exemplars** HW5 Main Report + README; HW06 skeletons |

## Restore / verify HW5 report skills

```bash
git checkout hw5/23127152 -- \
  .agents/skills/ai-audit-report \
  .agents/skills/bug-report
```

HW5 exemplars (read-only):

```bash
git show hw5/23127152:23127152_HW05_AI_Performance_098/AI_Critique.md
git show hw5/23127152:23127152_HW05_AI_Performance_098/AI_Audit_Report.md
git show hw5/23127152:23127152_HW05_AI_Performance_098/23127152-HW05-Main-Report.md
git show hw5/23127152:23127152_HW05_AI_Performance_098/README.md
```

## Suggested invocation order (per API)

```
ai-audit-report (ongoing)
    ↓
api-test-generate → api-test-audit → api-test-extend
    ↓
api-test-execute → bug-report (if needed)
```

After all APIs: `api-test-cicd` → `api-test-generator-design` → `ai-critique` → `hw06-main-report`.

Or start with orchestrator: **`hw06-api-testing`**.

## Locked APIs

See `23127152-hw6/PHASE0_PLANNING.md` — FR-05 / FR-11 / FR-15.

## Directory

```
.agents/skills/
├── README-HW06.md                 ← this file
├── hw06-api-testing/
├── api-test-generate/
├── api-test-audit/
├── api-test-extend/
├── api-test-execute/
├── api-test-cicd/
├── api-test-generator-design/
├── ai-critique/
├── hw06-main-report/
├── ai-audit-report/               ← from hw5/23127152
└── bug-report/                    ← from hw5/23127152
```
