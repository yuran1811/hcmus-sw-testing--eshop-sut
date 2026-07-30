---
name: gui-checklist-ai
description: Build a 40-plus-item GUI usability checklist for a specific screen/flow by walking the AI through each IA aspect (UI standards, Forms, Navigation, Feedback/State) one at a time, then executing the checklist against a live site and logging Passed/Failed with notes. Use this whenever the user is doing HW03-style GUI checklist work, mentions IA-01/IA-02/IA-03/IA-04, "GUI checklist", "usability checklist for a screen", or needs to test EShop screens against a checklist. Do NOT use one generic "make me a checklist" prompt — this skill exists specifically to replace that anti-pattern with a guided, per-aspect, per-heuristic process, and to force a human-review pass that names what the AI missed and why.
---

# GUI Checklist AI (guided, per-aspect)

## Why this skill exists

The assignment explicitly forbids a single generic prompt like "create a GUI checklist and find usability bugs in this app." This skill instead drives the AI through **one IA aspect at a time**, using named heuristics as the seed for each round, so the resulting checklist is traceable to a technique rather than to model guesswork. It also builds in the mandatory "what did the AI miss, and why" review step.

## Inputs to collect first

Ask the user (or infer from context) before starting:

1. Which screen(s) or flow will be checklisted (e.g., "Checkout page", "Product search results")? Must not duplicate another team member's screen.
2. Repo/URL of the SUT (default: <https://github.com/ttbhanh/eshop-sut>, running locally).
3. Which IA aspects apply to this screen (usually all 4, but note if one is not applicable and why).

## Step-by-step process (run each step as its own turn/prompt, don't merge)

### Step 1 — IA-01 (General UI standards) pass

Prompt the model with a _specific_ heuristic seed per item, e.g.:

> "For the [screen name] screen of EShop, list GUI checklist items that verify: (a) consistent button styling and placement, (b) consistent color/contrast use for primary vs secondary actions, (c) consistent typography hierarchy, (d) consistent spacing/alignment grid, (e) consistent iconography meaning. Give 8–10 concrete, testable checklist items, each phrased as a pass/fail statement, not a vague goal."

Repeat with more heuristic seeds (Nielsen's heuristics, platform conventions, brand consistency) until you have 10+ IA-01 items.

### Step 2 — IA-02 (Forms) pass

Seed prompts, one per sub-topic:

- Field-level validation (required fields, format hints, inline error timing)
- Label/placeholder clarity and association (a11y label linkage)
- Error message specificity (does it say _what_ and _how to fix_, not just "invalid")
- Input constraints communicated up front (character limits, date formats)
- Autofill/autocomplete support, tab order, submit button state (disabled while invalid)

Ask for 8-10 items per sub-topic batch; consolidate.

### Step 3 — IA-03 (Navigation) pass

Seed prompts:

- Breadcrumb / back-navigation correctness
- Active-state indication in menus
- Deep-link / browser back-button behavior
- Number of clicks to reach key actions (info architecture depth)
- Consistent placement of nav across pages

### Step 4 — IA-04 (Feedback/State) pass

Seed prompts:

- Loading states (spinners, skeletons) on async actions
- Empty states (empty cart, no search results)
- Success/error toasts — visibility duration, dismissibility
- Disabled vs enabled button states communicated visually
- Optimistic UI vs actual server confirmation mismatches

### Step 4b — Mandatory omission sweep before consolidation

Before merging anything, explicitly run one more pass over the draft checklist and ask:

- Did we include accessibility items beyond visible focus styles, especially screen reader labels, accessible names, and focus order?
- Did we include full keyboard-only navigation for the whole screen, not just Enter on one field?
- Did we include dark mode or explicit exclusion of dark mode when the screen or repo context suggests it may matter?
- Did we include offline / slow-network / retry behavior, not only the happy-path load state?
- Did we include responsive/mobile interaction details such as tap target size, cramped layouts, and overflow at small breakpoints?
- Did we include image robustness items such as alt text, broken image fallback, and content remaining understandable when images fail?

If any of these apply to the screen, add concrete pass/fail items for them before moving on. If a category is not applicable, note that explicitly in the checklist or later in `ai_gap_analysis.md`.

### Step 5 — Consolidate and de-duplicate

Merge all four passes into one table with columns: `#, ID, IA Aspect, Item Description, Heuristic Source`. Target >40 rows total. Cut near-duplicates.

After the mandatory omission sweep, keep expanding the checklist until you have covered every applicable requirement and observable UI/UX concern from the README/SRS for that screen, not just a small sample of each category. In practice, the checklist should intentionally try to be exhaustive for the screen/flow:

- Include all applicable accessibility concerns, not only focus styles
- Include all applicable keyboard-only navigation concerns, not only one Enter-key case
- Include all applicable link/navigation integrity concerns, including broken links, dead ends, orphan pages, link destinations that do not match their labels, external link behavior, mailto links, and custom 404 recovery when relevant
- Include all applicable color/state concerns, including hover, visited, active, disabled, and grouped button/link states when relevant
- Include all applicable content concerns, including spelling, alignment, title clarity, company/privacy/help text, tooltip availability, and whether visible URLs or email addresses are actually hyperlinks when the screen contains them
- Include all applicable responsive/mobile concerns, not only a single overflow check
- Include all applicable loading, empty, error, offline, and retry concerns, not only one happy-path state
- Include all applicable image/content robustness concerns, not only a single alt-text check
- Include all applicable form-robustness concerns, including required/optional indicators, default values, field constraints, numeric/string edge cases, and whether the form behaves sensibly when users enter unusual but valid characters
- When a broader heuristic list is provided by the student, map each applicable heuristic into a screen-specific item; if a heuristic is not applicable on the current screen, write that exclusion explicitly instead of silently skipping it
- Do not limit link checks to a single "click goes somewhere" item: also consider destination correctness, dead ends, orphan pages, mailto/external-link behavior, and 404 recovery when the screen or product context makes them relevant
- Do not limit title/content checks to visible headings: also consider browser tab title clarity, spelling/grammar, help text, and whether the screen clearly communicates what it is
- Also check HTML/document metadata when relevant, especially the `lang` attribute and any page-level title metadata that screen readers and browser tabs rely on
- Do not limit form checks to the presence of the field: also consider whitespace handling, default values, input type restrictions, and how the field behaves with valid-but-unusual characters
- Include explicit exclusion items only for categories that truly do not apply, with a short reason why

Give every item a stable ID so it can be referenced from bug files and the traceability matrix, following the course's test-case naming convention: `[SCREEN]-GUI-[IA]-[NUM]`, e.g. `HOME-GUI-IA02-014` (Screen: HOME, IA-02, item 14), `CART-GUI-IA01-005` (Screen: CART). Never reuse or renumber an ID once assigned — a stable ID is what keeps "Found by Test Case" links from breaking, exactly like `TC-[MODULE]-[NUMBER]` does for formal test cases. Avoid unstable labels like "form-check-2" or "item-a".

### Step 6 — MANDATORY human-review / gap-finding pass

This is not optional and cannot be done by the AI alone. The student must:

1. Re-read the consolidated checklist.
2. Explicitly check for commonly-missed categories the AI tends to skip — accessibility (screen reader labels, focus order, contrast ratios), RTL/i18n layout, dark mode, keyboard-only operation, offline/slow-network behavior — and add items for any of these that apply to the screen.
3. For every gap found, write one sentence explaining _why_ the AI likely missed it (e.g., "prompt didn't mention accessibility," "model has no visual access to real contrast values," "RTL not relevant since EShop is Vietnamese-only LTR — explicitly excluded, not missed").
4. Add any items from the student's own judgement (not AI-suggested) that were missed during the initial run, and mark them as such in the source column. (Note: The student adds as many items as they can find; it is acceptable if no items are added if the AI checklist is already comprehensive).

**CRITICAL — What the AI does vs. what the student does:**

- AI does: Create a **blank `ai_gap_analysis.md` template** with section headers, table structure, and placeholder rows.
- AI does NOT: Fill in the gap analysis content, write the "lý do AI bỏ qua" explanations, or list the student-added items. That content must come from the student's own observation.
- If the AI fills in the gap analysis content, the file must be wiped and the student must redo it from scratch — pre-filled AI output submitted as Step 6 is a rubric violation.

### Step 7 — Execution pass

For each of the >40 items:

- Actually open the SUT screen and test it.
- Mark Passed/Failed.
- For Failed: add a Notes column entry stating the concrete failure observed.
- Screenshot every Failed item; filename convention: `IA0X_itemNN_failed.png`.

### Step 8 — Bug logging

Every Failed item becomes its own bug file first (see `bug-report-github` skill, Phase 1) — do not create a GitHub Issue directly from a checklist row. Set that row's Notes to reference the resulting `BUG-0XX` ID, so the checklist and the bug file link back to each other in both directions.

### Step 9 — Retest before marking resolved

A checklist item stays Failed until the underlying bug is fixed **and** the item has been re-executed and re-marked Passed by the tester — never flip Failed→Passed just because a developer says it's fixed. This mirrors the course rule that a bug is only closed after retest, not after a claimed fix.

## Output artifacts this produces

- `checklist.md` / `checklist.xlsx` — the >40-item table with Source, Status, Notes columns.
- `ai_gap_analysis.md` — **blank template only** (AI creates structure; student fills in all content during Step 6).
- `screenshots/` — one file per Failed item.
- Draft GitHub Issue bodies, one per failed item (hand off to `bug-report-github`).

## Common failure modes to avoid

- Don't let the AI produce all 40+ items from one mega-prompt — that is exactly the disallowed pattern.
- Don't skip Step 6; a checklist with zero student-added items and zero named AI gaps reads as unreviewed AI output, which the rubric explicitly penalizes.
- **Don't let AI fill in `ai_gap_analysis.md`** — the file must contain the student's own words. An AI-written gap analysis is indistinguishable from no gap analysis.
- Don't forget the Notes column — "Failed" with no explanation isn't gradable.
