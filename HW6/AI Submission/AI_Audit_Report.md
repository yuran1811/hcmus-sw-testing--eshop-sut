# AI Audit Report -- HW06 API Testing

## 1. Student Information

| Field | Value |
| --- | --- |
| **Student name (printed)** | Nguyen An |
| **Student ID** | 23127148 |
| **Class / Cohort** | 23CLC08 |
| **Assignment ID** | HW06-AI |
| **Assignment date** | 2026-08-22 |
| **AI tool(s) used** | Antigravity IDE (Claude Opus 4.6 / Gemini 3.7 Flash) |
| **AI used?** | Yes |

---

## 2. Instructions

This report documents all interactions with AI tools during the completion of HW06 (API Testing). Each entry corresponds to an AI-generated artifact created through a prompt batch. Prompts and outputs are recorded verbatim or linked directly to artifacts. Each artifact is evaluated with a strict verdict (`VALID`, `INVALID`, or `INCOMPLETE`), accompanied by pedagogical and technical reasoning anchored in course materials (ISTQB Foundation Level Syllabus & HW06 specifications), along with documented student interventions.

---

## 3. Audit Table

| Prompt + Tool | AI Output | Verdict | Reasoning (ISTQB / Course) | Student Fix |
|---|---|---|---|---|
| **Tool:** Antigravity IDE (Claude Opus 4.6)<br>**Time:** 19:32 22/08/2026<br>**Prompt:** "Oke first of all, i need to write agent skill first. I will give you this guide.md for more context @postman-contract-test-prompt-guide.md [...] But the agent skill will not hard code for any api. By the way, i will give you more context to refine the agent skill @report.md And fit with the right scope of HW6 and in the future with similar tasks @2026.HW06.API Testing_En (2).md" | Generated two reusable Agent Skills:<br>1. `.agents/skills/api-test-generator/SKILL.md`<br>2. `.agents/skills/api-test-executor/SKILL.md`<br>Covering 5-phase generation (domain partitions, state transitions, security SEC-01–07, schema validation) and Newman execution pipeline. | **INCOMPLETE** | Initial AI drafts hardcoded endpoints and mixed seminar contract testing (Pact) with HW06 scope. HW06 §7 requires a generic AI-driven API test generator (G9.5 Create) with $\ge 35$ cases across 4 distinct coverage dimensions and Newman CI execution. | Guided AI through multi-turn refinements: removed hardcoded API assumptions, eliminated Pact scope, aligned naming to `api-test-generator` and `api-test-executor`, enforced 5-phase generation, added anti-cheat `X-Student-Id` header handling, and separated self-drawn diagram requirements from automated skill generation. |

---

### Artifact #1 -- HW06 Agent Skills (`api-test-generator` & `api-test-executor`)

| Field | Value |
| --- | --- |
| **AI Tool** | Antigravity IDE (Claude Opus 4.6 / Gemini 3.7 Flash) |
| **Date/Time** | 2026-08-22 19:32:21 +07:00 |
| **Task** | Design and implement reusable AI Agent Skills for HW06 API Testing test generation and execution |
| **Feature / Module** | Agent Skills (HW06 §7 / Bloom-AI G9.5 Create level) |
| **Bloom-AI Level** | G9.5 Create (Collaborative design and creation of automated test generation skill) |
| **Verdict** | INCOMPLETE |

#### (1) Prompt + Tool

**Prompt (verbatim):**

```text
Oke first of all, i need to write agent skill first. I will give you this guide.md for more context
@[d:\Project\Testing\hcmus-sw-testing--eshop-sut\postman-contract-test-prompt-guide.md]

[Refinement 1]: Yeh both test-writer and test runner but change the name fit with the HW6 API Testing. Yes — this skill IS the AI-driven test generator I'll demo for Section 7 (G9.5 Create level). Fit with the scope of HW6.

[Refinement 2]: But the agent skill will not hard code for any api. By the way, i will give you more context to refine the agent skill @[d:\Project\Testing\hcmus-sw-testing--eshop-sut\report.md] And fit with the right scope of HW6 and in the future with similar tasks @[d:\Project\Testing\hcmus-sw-testing--eshop-sut\2026.HW06.API Testing_En (2).md]

[Refinement 3]: For the Create level G9.5, design an AI-driven API test generator for the SUT: given the API specification, it produces test cases automatically. Provide a self-drawn diagram and pseudocode of the design. ("Self drawn" means you make the design decisions; any diagramming tool is fine, but the diagram itself must not be AI-generated.) You are encouraged to implement it as a reusable Agent Skill and submit a demonstration video YouTube link) showing it generate tests for one API. Do you cover this requirement in HW06 for Agent Skill.

[Refinement 4]: Yeh based on my context gave you, requirement of HW06. Refine the agent skill one more time to fit with the right scope, right problem, right skill.
```

**Execution notes:**

- Mode: GENERATE & REFINE
- Tools called: `view_file`, `list_dir`, `write_to_file`, `run_command`
- Stored locations:
  - `.agents/skills/api-test-generator/SKILL.md`
  - `.agents/skills/api-test-executor/SKILL.md`

#### (2) AI Output

- Full skill definitions written to repository:
  - **Generator:** [`.agents/skills/api-test-generator/SKILL.md`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/.agents/skills/api-test-generator/SKILL.md) (380 lines)
  - **Executor:** [`.agents/skills/api-test-executor/SKILL.md`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/.agents/skills/api-test-executor/SKILL.md) (285 lines)
- Structured 5-phase test generation workflow:
  1. `Phase 1: ANALYZE` (Extract routes, parameters, types, authentication, constraints)
  2. `Phase 2: DESIGN` (Apply EP, BVA, State Transition, Security SEC-01–07, Schema Validation, DDT, E2E Chaining)
  3. `Phase 3: GENERATE` (Produce Postman Collection v2.1, Environment, and Data JSON files with `X-Student-Id` pre-request script)
  4. `Phase 4: DOCUMENT` (Generate `TC-<API>-<NNN>.md` test cases and `coverage-matrix.md`)
  5. `Phase 5: AUDIT PREP` (Produce `audit-checklist.md` and gap analysis for $\ge 5$ student-added test cases)

#### (3)-(5) Verdict, Reasoning, Student Fix

| Aspect | Detail |
| --- | --- |
| **Verdict** | INCOMPLETE |
| **Reasoning** | The initial AI proposal was overly specific to particular hardcoded endpoints from the eShop sample and included Pact contract testing from the seminar materials, which falls outside the explicit scope of HW06 API testing. Under ISTQB FL and HW06 Section 7 requirements, an automated test generator must be generic (applicable to any REST API spec), structured systematically (not relying on a single vague prompt), and strictly partitioned across Domain Partitions, State Transitions, Security, and Schema validation. |
| **Student Fix** | Directed the AI to eliminate hardcoded assumptions, remove Pact test generation, re-structure the tool into two distinct skills (`api-test-generator` and `api-test-executor`), enforce $\ge 35$ test cases per endpoint group, incorporate the mandatory `X-Student-Id` header injection, add an audit preparation step for human review, and delineate AI skill generation from the student's self-drawn architecture diagram and pseudocode. |
| **Reviewed by** | Nguyen An |
| **Review date** | 2026-08-22 |
| **Quality rating** | Excellent (after multi-turn student steering) |
| **Issues found** | Initial hallucination of endpoint hardcoding; initial inclusion of out-of-scope Pact testing; confusion regarding AI generation vs human-drawn diagram constraint. |

---

## 4. Summary of AI Accuracy

| Metric | Count | Percentage |
| --- | ---: | ---: |
| **Total AI-generated artifacts audited** | 1 | 100% |
| **VALID (correct, accepted as-is)** | 0 | 0.0% |
| **INVALID (wrong; rejected)** | 0 | 0.0% |
| **INCOMPLETE (acceptable after edits)** | 1 | 100.0% |

---

## 5. Conclusion -- When should AI be used (or not)?

AI assistants are exceptionally capable at drafting repetitive structural artifacts, boilerplate Postman test scripts, JSON schemas, and multi-file agent skills when supplied with comprehensive specification context. However, unguided AI tends to make implicit assumptions—such as hardcoding domain entities, hallucinating unspecified constraints, or conflating distinct project scopes (e.g., mixing seminar contract testing with homework API testing). 

AI must not be used as a black-box generator without human oversight. Strict human steering, verification against syllabus criteria (ISTQB FL domain partitioning, state machines, and OWASP API security), and explicit boundary setting are mandatory to ensure generated test suites are rigorous, reusable, and academically honest.

---

## 6. Mandatory Disclosure

The agent skills (`api-test-generator` and `api-test-executor`) were initially scaffolded and refined by Antigravity IDE (Claude Opus 4.6 & Gemini 3.7 Flash); I reviewed, guided the architecture, corrected the scope boundaries, and specified the 5-phase generation pipeline and anti-cheat constraints. The detailed AI Audit Report is attached as Appendix A. I confirm I did not use AI to generate any artifact listed in the prohibited category (such as fabricating test execution logs, forged headers, or self-drawn architecture diagrams).

---

## 7. Signature

| Field | Value |
| --- | --- |
| **Student name** | Nguyen An |
| **Student ID** | 23127148 |
| **Class / Cohort** | 23CLC08 |
| **Course** | CS423 / CSC13003 - Software Testing |
| **Instructor** | Dr. Lam Quang Vu / Dr. Tran Duy Hoang / MSc. Tran Thi Bich Hanh |
| **Date** | 2026-08-22 |
| **Signature** | Nguyen An |

---

## 8. Operational Appendix

### Interaction Overview

| # | AI Tool | Task Category | Feature | Date | Bloom-AI | Verdict |
|---|---|---|---|---|---|---|
| 1 | Claude Opus 4.6 / Gemini 3.7 Flash | Agent Skill Design | HW06 §7 Test Generator & Executor | 2026-08-22 | G9.5 Create | INCOMPLETE |

### Contribution Breakdown

| Task | AI % | Human % | Key Human Contribution |
|---|---:|---:|---|
| Agent Skills (`api-test-generator`, `api-test-executor`) | 60% | 40% | Architecture design, HW06 scope scoping, multi-turn refinement, anti-cheat header enforcement |

### Compliance Checklist

- [x] AI usage declaration included
- [x] Tool name(s) and versions identified
- [x] Date and time per interaction captured
- [x] Verbatim prompt per artifact recorded
- [x] AI output referenced with exact paths
- [x] Verdict + ISTQB/course reasoning documented
- [x] Student fix detailed
- [x] Accuracy summary table computed
- [x] Conclusion (80-150 words) written
- [x] Mandatory disclosure completed without placeholders
- [x] Markdown submission format verified
