---
name: usability-writer
description: >
  Designs HW03 Task 2 moderated usability evaluation plans: objectives, goal-only
  task scenario, SUS or UEQ-S instruments, probe questions, pilot plan, participant
  profile, and observation templates. Use when planning usability test, task scenario,
  SUS, UEQ-S, usability writer, or HW03 Task 2 design.
---

# Usability Writer (HW03 Task 2 — Plan & Prepare)

## Purpose

Produce the **Phase 1 plan package** for a moderated usability evaluation of **one** end-to-end EShop flow, aligned with:

- HW03 Task 2 specification (7 real participants outside class; pilot required)
- Class mini-exercise method (`Mini_Exercise(2).md`, `test-plan.md`, seminar `N08`)
- EShop SUT feature pools (Pool A–D, IA-01 to IA-04)

This skill does **not** invent participants or session results. Execution belongs to `usability-runner`.

## When to use

- User starts Task 2 planning or says "design usability test"
- Needs task scenario, SUS/UEQ-S sheet, probes, pilot checklist
- Refining scenario after pilot feedback

## SUT context — EShop

| Item | Value |
| --- | --- |
| SUT | EShop — Vietnamese e-commerce demo for testing practice |
| Repo | https://github.com/ttbhanh/eshop-sut |
| Feature pools | Pool A (Auth/Products FR-01–FR-06), Pool B (Cart/Checkout FR-07–FR-11), Pool C (Admin FR-12–FR-19), Pool D (Mobile) |
| Interface aspects | IA-01 General UI, IA-02 Forms, IA-03 Navigation, IA-04 Feedback/State |
| SRS | `System_Requirements.md` in project root (Lumiere Cinema — adapt patterns to EShop) |

When writing scenario or objectives, reference EShop FR codes and IA aspects, not Lumiere Cinema FRs.

## Input schema

```text
### Usability Design Input
- Flow name: [e.g. Sign-up -> Browse products -> Add to cart -> Checkout with coupon]
- FR / IA IDs: [FR-01, FR-05, FR-06, FR-07, FR-08, FR-09, IA-01, IA-02, IA-04]
- SUT URL: [e.g. http://localhost:3000 or deployed URL]
- Target user profile: [non-IT preferred per HW03 §Task 2]
- Timebox per session: [e.g. 15–20 min]
- Scale choice: SUS | UEQ-S | custom (must justify)
- Language: Vietnamese (default) | English
- Moderator: [student name]
```

If flow missing, ask once. Flow must not duplicate groupmates' primary usability flow (HW03 §5).

## Design workflow

### Step 1 — Objectives

Write 2–4 measurable learning goals tied to the chosen EShop flow:

- Where users hit navigation bottlenecks (IA-03)
- Whether error messages are understandable (IA-04, FR-related)
- Whether forms are completable without confusion (IA-02)
- User confidence that the action succeeded (IA-04)

Avoid vague goals ("see if UI is good").

### Step 2 — Task scenario (goal-only)

Rules from HW03 §Task 2 + class exercise:

- Give a **goal**, not click-by-click instructions
- Realistic Vietnamese e-commerce context
- Embed constraints (budget, coupon code, product type) as **user goals**, not UI steps
- Do **not** say "click Cart then Checkout"
- Define **done** (what screen/info proves success)

**Bad:** "Bấm vào nút Giỏ hàng, chọn Thanh toán, nhập mã SAVE10..."
**Good:** "Bạn muốn mua một sản phẩm có giá dưới 500.000đ trên EShop và thanh toán bằng mã giảm giá SAVE10. Bạn hoàn thành khi thấy thông tin xác nhận đơn hàng."

Include success / fail criteria and timebox (mirror `test-plan.md` from class exercise).

### Step 3 — Instruments

#### A) Post-session scale (pick one)

| Scale | When | Details |
| --- | --- | --- |
| **SUS** (10 items) | Default; score 0–100 across 7 participants | Standard, well-benchmarked (avg ~68) |
| **UEQ-S** (8 pairs) | If comparing pragmatic vs hedonic quality; justify | Shorter but less benchmarked for Vietnamese |
| **Custom** | Only with written justification + must cover ease/confidence | Discouraged unless strong reason |

Provide the full item list in `instruments/scale.md` (Vietnamese wording). Template already exists at `HW3/Task2_Usability/instruments/scale.md`.

#### B) Probe questions (minimum 4 themes)

At least one question each per HW03 requirement:

1. **Clarity** — what was unclear
2. **Error recovery** — how errors were handled
3. **Speed** — what felt slow
4. **Trust** — confidence the system did the right thing

Optional: free quote prompt, overall impression.
Template at `HW3/Task2_Usability/instruments/probes.md`.

### Step 4 — Participant plan (template only)

Create/fill table structure for **7 participants** (P01–P07). Leave real names/contacts for the student to fill. HW03 anti-cheat rules:

- Must be **outside this class** (students enrolled in HW03 are NOT eligible)
- TA may randomly call **2** participants to verify
- Mask middle four digits of phone/Zalo (e.g. 090****789)
- Prefer non-IT / non-tester for authentic feedback
- Impersonation = **0 points for Task 2**

Template at `HW3/Task2_Usability/participants/roster.md`.

**Never generate fake people.**

### Step 5 — Pilot plan

One pilot person (can be separate from P01–P07; document the choice):

- Goals: detect unclear scenario, broken SUT flow, timing issues, instrument confusion
- Output: list of scenario/instrument edits before real sessions
- Template at `HW3/Task2_Usability/pilot/pilot-plan.md`

### Step 6 — Observation template

Reuse class `P01.md` structure. Provide blank session template at `HW3/Task2_Usability/sessions/_TEMPLATE.md`.

Key fields per session:
- Metadata (date, device, consent, timebox, deviation)
- Results (outcome enum, duration, error/wrong-turn/hesitation/intervention counts)
- Sub-goal checklist
- Observation timeline table
- Moderator interventions
- SUS raw scores
- Probe answers (verbatim)
- Researcher summary (frictions, helpers, verify-later notes)

## Output artifacts

```text
HW3/Task2_Usability/
  test-plan.md                 # objectives, scenario, data, success/fail, pre-session checklist
  instruments/
    scale.md                   # SUS or UEQ-S full text + scoring notes
    probes.md                  # open questions (clarity, error, speed, trust)
  participants/
    roster.md                  # P01-P07 table (student fills real data)
  sessions/
    _TEMPLATE.md               # blank session note
  pilot/
    pilot-plan.md              # goals + checklist for pilot run
    pilot-notes.md             # filled after pilot (runner or student)
  DESIGN_NOTES.md              # assumptions, FR→sub-goal map, AI vs human authorship
```

### test-plan.md minimum sections

Mirror class `test-plan.md`:

1. Metadata (date, URL, flow, FR/IA, timebox, moderator, device)
2. Objectives (2–4 measurable)
3. Task scenario (blockquote, goal-only)
4. Test data table
5. Start / success / fail / deviation conditions
6. Pre-session checklist (consent, think-aloud intro, start state, no coaching)

## Quality bar

Reject plan if:

- Scenario is step-by-step UI script (must be goal-only)
- No success/fail definition
- Scale missing or probes miss one of clarity/error/speed/trust
- Claims 7 participants without student-supplied roster data
- Flow spans no real E2E path (single click is not enough)
- Flow references Lumiere Cinema FRs instead of EShop FRs
- Objectives are vague / not measurable

## AI Audit

APPEND via `ai-audit-report`. Scenario drafts from AI are usually **INCOMPLETE** until goal-only rewrite + pilot.

## Related

- `usability-runner` — conduct sessions, score, findings
- HW03 spec: `HW3/2026.HW03.GUI Usability_En.md`
- Class anchors: `Mini_Exercise(2).md`, `test-plan.md`, `P01.md`, `findings-report.md`, `references.md`
- [references/scenario_rules.md](references/scenario_rules.md)
- [examples/sample_test_plan_excerpt.md](examples/sample_test_plan_excerpt.md)
