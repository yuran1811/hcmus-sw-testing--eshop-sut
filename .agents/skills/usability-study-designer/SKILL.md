---
name: usability-study-designer
description: Design a moderated usability study for one end-to-end flow (e.g. Register → Add to Cart → Checkout) by guiding the AI step-by-step through evaluation goals, a goal-oriented (non-step-by-step) task scenario, a measurement instrument (SUS or UEQ-S plus open questions), and a recruiting screen for 7 real, non-IT, non-classmate participants. Use this for HW03-style Task 2 Phase 1 work — anytime the user needs a usability test scenario, SUS/UEQ-S questionnaire, participant recruiting checklist, or pilot-session plan. Do NOT use this to fabricate participants or session data — this skill only produces the study design; the sessions must be run with real people.
---

# Usability Study Designer (Phase 1: plan & prepare)

## Why this skill exists

A usability evaluation is worthless if the task scenario leaks the steps, the instrument is copy-pasted without adaptation, or participants are quietly ineligible (classmates, IT professionals, fabricated contacts). This skill forces each of those decisions to be made explicitly and reviewed by the student before any session runs.

## Flow identification — clarify scope FIRST

Before drafting anything, confirm the **exact flow** being tested and which features are in/out of scope:

- Does the flow include optional steps (e.g. coupon, address entry, promo codes)? → Only include them if explicitly confirmed by the student.
- Default to the simplest complete path unless told otherwise.
- Assign a flow code following the naming convention: **U-001**, **U-002**, etc.

**Do NOT assume coupon/discount codes are part of a checkout flow unless the student explicitly says so.**

## Step 1 — Define the evaluation goal (own turn)

Prompt seed:

> "I'm running a moderated usability test of EShop's [flow name] flow. Help me write 2-3 specific evaluation goals that go beyond 'find usability bugs' — e.g., can a first-time user complete checkout without external help? Where does hesitation or error most likely occur? Is the SUS/UEQ-S score above an acceptable threshold?"

Student reviews and picks/edits goals — don't accept the AI's first draft verbatim.

## Step 2 — Write the goal-oriented task scenario

Critical constraint: the scenario must describe an **outcome**, not a click-by-click path.

Bad (step-by-step, invalid): "Click Register, enter your email, click Submit, then click Add to Cart..."

Good (goal-oriented, valid): "You just heard about EShop from a friend and want to buy a birthday gift. Create an account, find a suitable product, and complete the purchase."

Prompt seed for AI drafting:

> "Draft a goal-oriented task scenario for the flow [flow name] on EShop, an e-commerce site. The scenario should give the participant a realistic motivation and end-goal but NOT instruct which buttons or fields to use. Keep it under 80 words, in natural Vietnamese (or English, matching participant language)."

**Anti-pattern check (run this after every AI draft):**

- [ ] Does the scenario mention any button name, field name, or UI element? → Remove it.
- [ ] Does the scenario mention any discount/coupon code unless the student confirmed this flow includes coupons? → Remove it.
- [ ] Does the scenario use phrases like "nhập vào ô", "bấm nút", "click vào"? → Remove them.

Student must read it back and strip any residual step-by-step language the AI slipped in — this is a very common AI failure mode. Flag it explicitly in the AI Critique.

## Step 3 — Choose and adapt the instrument

Ask the user: SUS or UEQ-S, or a justified custom scale?

- **SUS**: 10 fixed items, alternating positive/negative, 5-point agreement scale. Do not reword the canonical items — adaptation is only in translation, not content, if you want valid norms.
- **UEQ-S**: 8 bipolar word-pair items (pragmatic vs hedonic quality).

Then have the AI draft 4 open-ended follow-up questions targeting:

1. Clarity ("Was there any point where it wasn't clear what to do next?")
2. Error recovery ("If something went wrong, how easy was it to fix?")
3. Speed/efficiency ("Did anything feel slower or more effortful than expected?")
4. Trust/reliability ("Was there anything that made you unsure the site was working correctly, e.g. payment or order confirmation?")

Student reviews wording for leading/loaded phrasing before finalizing.

## Step 4 — Recruiting screen and constraints

Hard constraints (non-negotiable, cannot be delegated to AI):

- 7 real participants, 1 session each.
- Verifiable contact info (Zalo/email/phone, middle 4 digits masked in the report).
- Must NOT be a student currently enrolled in this course.
- Prefer non-IT/non-tester backgrounds.
- TA may cold-call 2 participants at random to verify — fabrication = 0 for Task 2.

Use the AI only to draft a short recruiting message/script and a screening checklist (e.g., "have you worked in software QA/dev? Are you enrolled in [course]?"), not to generate the participant list itself.

## Step 5 — Pilot session plan

Have the AI draft a 1-page pilot-session runsheet: intro script ("we are testing the product, not you"; explain think-aloud), scenario handoff, note-taking template pointer (see `usability-session-notes` skill), and a post-pilot revision checklist (did the scenario leak steps? was any instrument item confusing? did timing work?).

## Output artifacts — folder structure

All files for a given flow go into a **dedicated subfolder** named by its flow code. A shared `README.md` at the top of `tests/usability-tests/` provides an overview of all flows.

```
tests/usability-tests/
├── README.md                  ← Overview table of all flows (code, name, status)
└── U-001/                     ← One folder per flow
    ├── evaluation_goals.md
    ├── task_scenario.md        (goal-oriented, reviewed, final)
    ├── instrument.md           (SUS or UEQ-S + 4 open questions + scoring table)
    ├── recruiting_screen.md    (script + eligibility checklist — no participant data)
    └── pilot_runsheet.md
```

When creating a new flow, always:
1. Create the `U-xxx/` subfolder with the next available code.
2. Add/update the flow row in `tests/usability-tests/README.md`.

## Handoff

Once the pilot is run and scenario/instrument are finalized, move to session facilitation using your own moderation notes, then use the `usability-session-notes` skill to structure observation logs, and `usability-synthesis` (or the analysis half of that skill) to score and prioritize findings.
