---
name: usability-evaluation-builder
description: Build a complete moderated usability-testing package across three phases — Phase 1 Plan (objectives, a goal-oriented task scenario, a SUS or UEQ-S scale plus open-ended probe questions on clarity/error recovery/speed/trust, a 7-participant recruitment tracker, and a pilot-session plan), Phase 2 Conduct (one structured session log per participant, filled in from real observation, never fabricated), and Phase 3 Analyse (aggregated metrics and a severity-ranked findings report). Use this whenever the user asks to plan a usability test, write a task scenario, choose between SUS and UEQ-S, draft probe questions, set up participant recruitment for usability testing, log a usability session, score SUS/UEQ-S, or write a usability findings report — even if they only say "làm usability test cho flow X" without naming a phase.

This skill produces empty, ready-to-fill structures for anything that must come from real
people — Step 0 explains exactly which fields those are and why they cannot be generated.
---

# Usability Evaluation Builder (Plan → Conduct → Analyse)

Produces the document set a moderated usability study needs, aligned to ISO 9241-11
(effectiveness/efficiency/satisfaction) and structured around the three phases every course or
report expects: **Plan**, **Conduct**, **Analyse & report**.

## The one rule that overrides everything else in this skill

**Never invent the two categories of data that must come from real people:**

1. **The 7-participant list** — names, contact details, screening answers. A course's
   anti-cheat rule typically requires this list to be genuine and verifiable (a TA may call
   participants to confirm); a fabricated list is graded as academic dishonesty, not a
   formatting shortcut.
2. **Session observations** — the timeline, quotes, ratings, and researcher notes in each
   session log. These describe what a specific person actually did in a specific session; there
   is nothing to generate them *from* until the session has happened.

If asked to "just fill in the participant table" or "make up some plausible session data,"
decline and explain why, then offer the empty structure instead — that is the actually useful
deliverable. Everything this skill generates in those two categories is a **template with
placeholders**, never a plausible-looking fake.

Steps 1–7 below are safe to generate in full: they are the study *design*, not observed data.

---

## Step 0 — Collect inputs once

Ask only for what's missing:

1. **Flow under test** — the exact end-to-end flow (e.g. "U-01: Search movie → select cinema
   & showtime → pick 2 seats → view ticket summary"), plus the FR codes it touches if the
   project uses them.
2. **Target user profile** — who the 7 participants should resemble (age range, familiarity
   with the product category, device they'd naturally use). This drives both the screener
   questions in Step 5 and the task scenario's realism in Step 2.
3. **Scale choice** — SUS, UEQ-S, or "help me decide" (see Step 4's decision guide).
4. **Timebox per session** and **moderator name** — needed on every template.
5. **Number of sessions** — default to 7 main participants + 1 pilot, per typical course specs;
   confirm if different.

---

## Step 1 — Objectives

A usable objective is a **testable question about the flow**, not a restatement of the flow
itself. Push past the first draft:

| ❌ Too vague to test              | ✅ Testable                                                                                   |
| ---------------------------------- | ---------------------------------------------------------------------------------------------- |
| "Kiểm tra flow đặt vé có ổn không" | "Người dùng mới có tự chọn đúng 2 ghế cạnh nhau và đến màn hình tóm tắt vé mà không cần trợ giúp không?" |
| "Xem UX có tốt không"              | "Người dùng có hiểu vì sao phải chọn rạp trước khi chọn suất chiếu, hay bị kẹt ở bước đó?"      |

Write 1–3 objectives max. Each should be answerable from the metrics defined in Step 3 — if an
objective can't be measured by anything in the session log, it isn't really testable yet.

---

## Step 2 — Task scenario (goal-oriented, not a walkthrough)

The defining property: **state the goal and the constraints, never the steps**. A scenario that
lists steps stops testing anything — it becomes a script the participant executes rather than a
problem they solve, which is exactly what hides navigation and comprehension issues.

| ❌ Step-by-step (don't write this) | ✅ Goal-oriented (write this)                                                                                    |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| "Nhấn vào phim, sau đó chọn rạp, sau đó chọn suất 20h, sau đó chọn ghế B5 và B6, sau đó nhấn Tiếp tục." | "Bạn muốn xem một phim đang chiếu tại Lumiere Cinema vào cuối tuần này. Hãy tìm một phim phù hợp, chọn rạp, chọn suất chiếu, chọn ghế cho 2 người và hoàn tất đến khi thấy thông tin vé." |

Include:
- **The goal** in the participant's own frame (why they're doing this), not the system's.
- **Realistic constraints** that shape decisions without dictating clicks (budget, day/time,
  party size) — these create the same decision points a real user faces.
- **A fallback instruction** for data-dependent scenarios (e.g. "nếu không có suất cuối tuần,
  dùng ngày gần nhất có suất và ghi lại là deviation") so the session doesn't stall on live data
  gaps.

Also define, right next to the scenario:
- **Start state** — exactly what's on screen before the clock starts (e.g. "trang chủ đã tải,
  chưa mở menu, chưa chọn phim"). Without this, sessions aren't comparable.
- **Success state** — the precise observable state that counts as done (e.g. "đã chọn phim, rạp,
  suất chiếu, đúng 2 ghế và thấy màn hình tóm tắt thông tin vé").
- **Failure state** — abandon, timebox exceeded, or stuck with no recovery.

---

## Step 3 — Choose the standard scale, then write probe questions

### Decision guide

| Situation | Use |
| --- | --- |
| Single flow, need a widely-recognized, easy-to-score number; participants are non-technical | **SUS** — 10 items, simplest to administer and interpret, most commonly expected in course rubrics |
| Also care about emotional/attractiveness dimension (not just "works"), e.g. a consumer/e-commerce product | **UEQ-S** — 8 items, splits Pragmatic vs Hedonic quality |
| Neither fits the study's focus | A **custom scale is allowed only with a clear written justification** — state what SUS/UEQ-S would miss and why the custom items measure the objective better |

Full item text, Vietnamese phrasing suggestions, and the exact scoring formulas for both scales
are in `assets/instruments_reference.md` — read it before writing the instrument section so the
wording isn't paraphrased from memory. This scale is completed **once per session, right after
the task**, not once at the end of the whole study.

### Probe questions — minimum 4 categories

Open-ended, asked after the scale, to explain the *why* behind the number. At least one question
per category; `assets/instruments_reference.md` has a larger bank to pull from.

| Category | Example |
| --- | --- |
| Clarity | "Bước nào bạn thấy khó hiểu nhất? Vì sao?" |
| Error recovery | "Khi bạn bấm nhầm hoặc gặp lỗi, bạn có biết cách quay lại hoặc sửa không?" |
| Speed | "Bạn thấy quá trình này nhanh hay chậm hơn bạn nghĩ?" |
| Trust | "Bạn có tin thông tin hiển thị (giá, ghế, suất chiếu) là chính xác không? Vì sao?" |

Keep questions neutral — never "Bạn có thấy nút X khó tìm không?" (leading); ask "Bạn có gặp khó
khăn gì ở bước chọn ghế không?" instead.

---

## Step 4 — Recruitment tracker (structure only — see the rule above)

Build `recruitment-tracker.md` from `assets/recruitment_tracker_template.md`: one row per
participant (7 main + 1 pilot), columns for name, contact channel, masked contact, profile
(matches Step 0's target profile), consent-to-record (Y/N), scheduled date, and role
(Pilot/P01…P07).

- **Masking convention**: keep the first block and last 2 digits, mask the middle 4 — e.g. phone
  `0912345678` → `0912****78`. Apply the same idea to email/Zalo if used for contact.
- Screener questions belong here too — reuse Step 0's target profile to write 3–5 short
  qualifying questions (e.g. "6 tháng qua đã đặt vé xem phim online bao nhiêu lần?", "Đã dùng
  [product] chưa?", "Có đang học/làm trong nhóm thực hiện dự án không?" — a "yes" here disqualifies
  them if the course requires participants outside the class).
- Every cell describing a specific person stays as a placeholder until the user supplies it.

---

## Step 5 — Pilot session plan

One session, one person who matches the target profile but is **not** one of the 7 main
participants, run before the real sessions. Its only purpose is to catch problems in the
instrument, not to produce data for the findings report.

Check specifically for:
- Is the task scenario's wording ambiguous, or does it accidentally hint at the steps?
- Does the timebox fit — did the pilot participant run long, or finish suspiciously fast?
- Does every tool work (screen recording, timer, the live site's test data)?
- Do the scale and probe questions make sense read aloud to a non-technical person?

Log the pilot with the same session template as Step 6, but **exclude it from the Phase 3
aggregate metrics** — note in the findings report that it was pilot-only and why.

---

## Step 6 — Assemble the Phase 1 output

Write `test-plan.md` from `assets/test_plan_template.md`, containing: metadata (date, site,
flow, FR list, timebox, moderator, device/browser), objectives (Step 1), task scenario + start/
success/failure states (Step 2), chosen instrument + probe questions (Step 3), pre-session
checklist (consent, participant coding P01–P07 only — no personal data beyond what's needed,
device check, standardized start state, don't rehearse the flow with the participant
beforehand), and a pointer to the recruitment tracker and pilot plan.

This is the only file that gets generated in full at this stage — recruitment and pilot are
templates waiting for real people (Steps 4–5).

---

## Phase 2 — Conduct (one file per session, filled in live, not generated)

This skill's role here is **structure and terminology, not content**. Provide
`assets/session_log_template.md` and the operational definitions below so seven different
sessions get recorded consistently — inconsistent definitions across sessions is what makes
aggregated metrics in Phase 3 meaningless.

**Outcome vocabulary** (pick exactly one per session):

| Outcome | Meaning |
| --- | --- |
| `SUCCESS_UNASSISTED` | Reached the success state with zero moderator interventions |
| `SUCCESS_ASSISTED` | Reached the success state, but only after ≥1 intervention |
| `FAIL` | Did not reach the success state within the timebox, stuck with no recovery |
| `ABANDONED` | Participant chose to stop before the timebox ended |

**Event definitions** (use these exact meanings when counting, so P01's "2 errors" means the
same thing as P05's "2 errors"):

| Term | Definition |
| --- | --- |
| Error | An action producing a result that contradicts the goal, which the system did not prevent (e.g. selects the wrong showtime) |
| Wrong turn | Navigates to a screen that doesn't move toward the goal, self-corrects without it becoming a full error (e.g. opens Account settings while looking for seat selection) |
| Hesitation ≥ 5s | A pause with no action for 5+ seconds while visibly uncertain — note the timestamp |
| Intervention | Moderator says or does something to unstick the participant — log the exact wording, the state right before it, and the result |

**Filling the template**: the moderator (or someone reviewing raw notes/recording) writes the
metadata, timeline, interventions, and post-session scale/ratings from what was actually
observed. This skill can help turn messy raw notes into the structured timeline table — that is
reformatting, not fabrication — but every row must trace back to something the user provided.

Name files `sessions/P00-pilot.md`, `sessions/P01.md` … `sessions/P07.md`.

---

## Phase 3 — Analyse & report

Only run this phase once session logs actually contain data — synthesizing findings from empty
templates produces the exact fabrication Step 0's rule forbids.

1. **Aggregate the results table** — one row per participant (outcome, time, error/wrong-turn/
   hesitation/intervention counts, scale score), computed from the session files, not estimated.
2. **Score the scale** — apply the SUS or UEQ-S formula from `assets/instruments_reference.md`
   to each session's raw ratings, then report the mean/median across participants.
3. **Compute completion rates** — unassisted rate = `SUCCESS_UNASSISTED` / total; assisted rate
   adds `SUCCESS_ASSISTED`. Report median time of successful sessions only (time-on-task is not
   normally distributed — median or geometric mean, never a plain average across few samples).
4. **Synthesize findings** — group repeated pain points across sessions into `F-01`, `F-02`...
   using the exact schema in `assets/findings_report_template.md`: flow, related FR, frequency
   (`x/7`), evidence (session ID + timestamp or quote), task impact, severity + reason, probable
   cause, recommendation, and a verification criterion (what would confirm the fix worked).
   A finding needs at least one session's evidence behind it — an issue only one person
   half-mentioned is weaker evidence than one 4 of 7 people visibly got stuck on; say so rather
   than presenting them with equal confidence.
5. **Severity scale for usability findings** — this is impact-on-task severity, distinct from
   the defect severity used for GUI bug reports:

   | Level | Meaning |
   | --- | --- |
   | 0 | Not a bug — insufficient evidence to call it a usability issue |
   | 1 | Cosmetic — very minor inconvenience |
   | 2 | Minor — inconvenient, but the participant recovered on their own |
   | 3 | Major — caused a significant slowdown or repeated errors, task at risk |
   | 4 | Catastrophe — blocked task completion entirely |

6. **Cross-link real defects** — a usability finding that's actually a functional bug (not just
   friction) should also get a GUI bug report and GitHub Issue if that workflow is set up
   separately; reference the issue number here rather than duplicating the bug's full write-up.

Write `findings-report.md` from `assets/findings_report_template.md`.

---

## Bundled files

- `assets/test_plan_template.md` — Phase 1 output structure (worked example: Lumiere Cinema
  seat-selection flow).
- `assets/recruitment_tracker_template.md` — 7-participant + pilot table, masking convention,
  screener questions — placeholders only.
- `assets/session_log_template.md` — Phase 2 per-session structure with the outcome/event
  vocabulary embedded.
- `assets/findings_report_template.md` — Phase 3 aggregate + findings schema, worked example.
- `assets/instruments_reference.md` — full SUS and UEQ-S item text, Vietnamese phrasing, and
  scoring formulas; a larger probe-question bank across the 4 required categories.
