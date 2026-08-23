# AI-Driven API Test Generator — Design

**Student ID:** 23127152  
**Bloom-AI Level:** G9.5 (Create)  
**Diagram tool:** Excalidraw — source exported to `diagram.png`

> High-level pipeline diagram với **Human Review gate** (VALID / INVALID / INCOMPLETE). Chi tiết Steps A–D nằm trong skill `api-test-generate`.

---

## 1. Overview

**Input:** `api_specification.md` (+ SEC-01…07)  
**Output:** Markdown/Excel TCs + Postman collection + Newman reports + bugs + CI + main report  

Orchestrated by `hw06-api-testing`.

---

## 2. Architecture Diagram

![Architecture](diagram.png)

Reference flow: [`diagram.mmd`](diagram.mmd)

---

## 3. Skills → Diagram mapping

| `.agents/skills/` | Role on diagram |
|-------------------|-----------------|
| `hw06-api-testing` | Orchestrator (entry) |
| `api-test-generate` | AI generate TCs (domain · state · security · schema) |
| `api-test-audit` | **Human Review gate** — VALID / INVALID / INCOMPLETE (student-owned) |
| `api-test-extend` | Add ≥ 5 manual TCs |
| `api-test-execute` | Run Postman + Newman |
| `bug-report` | File GitHub Issue on spec vs SUT mismatch |
| `api-test-cicd` | After ×3 APIs — GitHub Actions CI Smoke |
| `hw06-main-report` | Main report + README + zip |
| `api-test-generator-design` | G9.5 deliverable (this diagram) |

**Per-API loop:** FR-05 → FR-11 → FR-15 (repeat pipeline ×3).

---

## 4. Pseudocode

```
FUNCTION hw06_pipeline():
    FOR api IN [FR-05, FR-11, FR-15]:
        CALL hw06-api-testing orchestrator phase for api

        suite ← api-test-generate(api)      // Steps A–D
        suite ← api-test-audit(suite)       // Human Review gate: VALID / INVALID / INCOMPLETE
        IF suite.has_invalid:
            suite ← fix_and_re_review(suite) // fix INVALID → re-review
        suite ← api-test-extend(suite, 5)   // manual gaps
        results ← api-test-execute(suite)   // Postman + Newman

        IF results.has_spec_failures:
            bug-report(results)

    api-test-cicd()                         // pass + intentional fail runs
    hw06-main-report()
    api-test-generator-design()             // G9.5 artifact
```

---

## 5. Agent Skill Integration

Pipeline skills in `.agents/skills/` — see [`README-HW06.md`](../../.agents/skills/README-HW06.md).

**Validation on EShop:** 120 AI + 18 extended TCs, 6 GitHub bugs (#300–#305), CI pass/fail samples.

**Demo video (optional):** not recorded.
