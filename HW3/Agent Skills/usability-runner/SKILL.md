---
name: usability-runner
description: >
  Runs HW03 Task 2 moderated usability sessions and analysis: think-aloud
  facilitation notes, per-participant session logs, SUS/UEQ-S scoring, severity
  findings synthesis, and bug drafts. Use when conducting usability sessions,
  scoring SUS, writing findings report, severity S1-S4, or HW03 Task 2 runner.
---

# Usability Runner (HW03 Task 2 — Conduct & Analyse)

## Purpose

Execute and analyse a planned usability evaluation (`usability-writer` package):

- **Phase 2:** one moderated session per real participant (HW03: **7 sessions**)
- **Phase 3:** score SUS/UEQ-S, synthesise findings, assign severity, draft bugs
- Keep evidence honest: no fabricated participants, quotes, or recordings

## When to use

- Plan package exists in `HW3/Task2_Usability/` (test-plan, instruments, template)
- User runs pilot or P0x session and provides observation data
- User asks to score SUS / write findings report / draft bugs

## SUT context — EShop

| Item | Value |
| --- | --- |
| SUT | EShop — Vietnamese e-commerce demo |
| Feature pools | Pool A (Auth/Products FR-01–FR-06), Pool B (Cart/Checkout FR-07–FR-11), Pool C (Admin FR-12–FR-19), Pool D (Mobile) |
| Interface aspects | IA-01 General UI, IA-02 Forms, IA-03 Navigation, IA-04 Feedback/State |
| Severity scale | S1–S4 from class mini-exercise |

## Hard constraints (anti-cheat per HW03 §11)

Do **not**:

- Invent participant names, contacts, or session outcomes
- Generate fake screen recordings or fabricated quotes
- Coach the participant through the UI in notes as if unassisted when help was given
- Mark SUCCESS without student-provided outcome data

If data is missing, leave `[STUDENT: fill from session]` placeholders and list what is needed.

## Input schema

```text
### Usability Run Input
- Plan path: HW3/Task2_Usability/
- Mode: PILOT | SESSION | ANALYSE
- Participant ID: P0x (for SESSION mode)
- Observation source: student notes file | pasted timeline | audio summary (student-owned)
- Scale responses: [raw SUS/UEQ-S answers from participant]
```

## Phase 2 — Conduct (moderator protocol)

From HW03 §Task 2 + class mini-exercise:

1. **Set stage:** "Mình đang test hệ thống, không test bạn. Bạn hãy vừa làm vừa nói ra suy nghĩ." (Think aloud)
2. Give **goal-only** scenario from `test-plan.md`. No demo of the happy path.
3. **Observe neutrally.** No leading hints. Intervene only if participant is completely stuck; log every intervention.
4. **Capture evidence:** screen recording + audio (with consent); structured notes covering errors, wrong turns, hesitations ≥ 5s, verbatim quotes.
5. **Close session:** administer SUS/UEQ-S scale, then probe questions (clarity, error recovery, speed, trust).

### Session file (one per participant)

Save to `HW3/Task2_Usability/sessions/P0x.md` using the template at `sessions/_TEMPLATE.md`.

Structure mirrors class `P01.md`:

```markdown
# Phiên P0x — [Flow Name]

## Metadata
- Ngày/giờ, Thiết bị/OS/Trình duyệt
- Đồng thuận, Timebox, Deviation

## Kết quả
- Outcome: SUCCESS_UNASSISTED | SUCCESS_ASSISTED | FAIL | ABANDONED
- Thời lượng (giây), Errors, Wrong turns, Hesitations≥5s, Interventions
- Sub-goal checklist (Có/Không cho từng sub-goal)

## Timeline quan sát
| Thời gian | Stage/FR | Mục tiêu | Hành động quan sát được | Phản hồi hệ thống | Tác động | Quote nguyên văn |

## Can thiệp của moderator
## SUS raw scores (10 items)
## Câu hỏi đào sâu (Probes) — verbatim answers
## Tóm tắt của researcher
```

### Metrics to count during session

| Metric | Definition |
| --- | --- |
| **Error** | Action that produces error state or clearly wrong data entry path |
| **Wrong turn** | Navigates to wrong place / undoes work |
| **Hesitation** | Pause ≥ 5 seconds with visible uncertainty |
| **Intervention** | Moderator helps (must be logged with timestamp) |
| **Outcome** | SUCCESS_UNASSISTED, SUCCESS_ASSISTED, FAIL, ABANDONED |

## Phase 3 — Analyse

### Step 1 — Score the scale

**SUS (standard):**

1. Câu lẻ (1, 3, 5, 7, 9 — tích cực): `contribution = score - 1`
2. Câu chẵn (2, 4, 6, 8, 10 — tiêu cực): `contribution = 5 - score`
3. `SUS = sum(contributions) × 2.5` (range 0–100)
4. Report per participant (P01–P07) + **mean** (and optional median)
5. Benchmark: avg ~68 globally; ≥80.3 = Excellent, <51 = Poor

**UEQ-S:** follow official UEQ-S scoring if chosen; document formula.

Write scores to `HW3/Task2_Usability/analysis/scale-scores.md`.

### Step 2 — Synthesise findings

Write `HW3/Task2_Usability/findings-report.md` following class `findings-report.md` shape:

1. **Scope and method** (flow, FR/IA, N=7, moderated think-aloud, deviations)
2. **Overview table** (one row per participant: outcome, time, error/wrong-turn/hesitation counts, SUS score)
3. **Findings F-01..** each with:
   - Flow, FR/IA
   - Frequency (`k/7` participants)
   - Evidence (participant IDs + quotes/behaviors)
   - Task impact
   - **Severity S1–S4** (class scale)
   - Severity rationale
   - Likely cause (labeled as interpretation, not fact)
   - Recommendation
   - Verification criteria
4. **Separate product bugs vs systemic UX issues**
5. **Limits** (sample size, profile bias, specific deviations)

### Severity scale (class mini-exercise)

| Level | Meaning | Typical evidence |
| --- | --- | --- |
| **S1** | Cannot complete task | FAIL / ABANDONED due to issue |
| **S2** | Completes only with help or major mistake | SUCCESS_ASSISTED or severe wrong turn |
| **S3** | Completes but slow / much hesitation | Multiple hesitations, confusion quotes |
| **S4** | Minor annoyance, little impact | Small visual/label issues, recovered fast |

Prioritise S1/S2 in report summary.

### Step 3 — Bugs

For genuine product defects with participant evidence:

- Draft to `HW3/Task2_Usability/bugs/DRAFT-BUG-UX-NNN.md`
- Link finding ID + participant evidence + screenshot path
- Student creates GitHub Issue with screenshot attached
- Reference EShop FR codes, not Lumiere FRs

Do not open bugs for pure preference without task impact unless clearly a defect vs EShop SRS.

### Step 4 — Summary for main report

Write `HW3/Task2_Usability/analysis/SUMMARY.md`:

- Completion rates (unassisted / assisted / fail / abandoned)
- Mean SUS score + interpretation
- Top findings by severity (S1 first)
- Bug list with GitHub Issue links
- Pilot changes that were applied
- Cross-reference to Task 1 GUI checklist findings if overlapping

## Modes

| Mode | Action |
| --- | --- |
| **PILOT** | Fill `pilot/pilot-notes.md`; propose scenario/instrument edits in plan |
| **SESSION** | Write/update one `sessions/P0x.md` from student-provided evidence |
| **ANALYSE** | Requires all 7 session files present; build findings + scores + bugs |

Refuse ANALYSE mode if:
- Missing P0x session files (cannot fabricate)
- No raw SUS/UEQ-S data provided

## AI role boundary

AI **may**:

- Structure raw notes the student provides into session template
- Compute SUS from raw answers
- Cluster observations into findings and draft severity **proposals** for student confirmation
- Suggest likely causes and recommendations
- Draft bug reports from confirmed findings

AI **must not**:

- Claim observations it did not receive from student
- Fill roster contacts or participant names
- Mark SUCCESS/FAIL without student-provided outcome data
- Generate fabricated quotes or behaviors
- Run ANALYSE without all session data present

## AI Audit

APPEND via `ai-audit-report` after analyse phase. Synthesis artifacts are often **INCOMPLETE** until student confirms severity assignments and reviews finding accuracy.

## Related

- Upstream: `usability-writer`
- HW03 spec: `HW3/2026.HW03.GUI Usability_En.md`
- Class anchors: `P01.md`, `findings-report.md`, `Mini_Exercise(2).md`
- [references/severity_and_outcomes.md](references/severity_and_outcomes.md)
- [examples/sample_finding.md](examples/sample_finding.md)
