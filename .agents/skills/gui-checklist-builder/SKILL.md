---
name: gui-checklist-builder
description: Design a GUI testing checklist by running four scoped generation passes in a single invocation — one per interface aspect (IA-01 General UI, IA-02 Forms, IA-03 Navigation, IA-04 Feedback/state) — each followed by a critical review that adds the items the pass missed and records why it missed them. Outputs one Markdown file per screen containing the pass log, the review table, a coverage gate, and the merged checklist (ID, Screen, Category, Checklist Item, Expected Result, Status, Notes) with every Status left as Not Run for the human to execute. Use this whenever the user asks to build/generate/design a GUI checklist, wants checklist items for one or more screens, needs coverage across IA-01..IA-04, or needs to reach a minimum item count (e.g. more than 40 items) — even if they only name a screen ("làm checklist cho màn hình Cart") without saying "skill" or "checklist" explicitly. This skill designs the checklist only; it does not execute it, mark Pass/Fail, or write bug reports.
---

# GUI Checklist Builder (4-pass design, one invocation)

Turns a set of screens into a review-ready GUI checklist in Markdown.

**The defining property: one invocation runs four separate scoped generation passes — one per
interface aspect — instead of one generic "make me a GUI checklist" prompt.** A single generic
prompt produces items that could apply to any web app; four narrow passes, each grounded in the
actual component inventory of the screen, produce items that only make sense for _this_ screen.
That difference is the point, and it is usually what gets graded.

**Scope boundary — design only.** This skill stops when the checklist is written. It does not
execute items, fill in Pass/Fail, or produce bug reports, because execution requires a human
sitting in front of the running app: a Status guessed from reading source code is worthless and
contradicts itself the moment someone re-tests. Leave every `Status` as `Not Run` and every
`Notes` cell empty, then hand off.

Run all four passes back-to-back without stopping between them. Announce progress briefly
(`Pass 1/4 — IA-01 …`) so the user can follow, but do not pause for permission mid-workflow.

---

## Step 0 — Collect inputs once, then run to completion

Ask only for what is genuinely missing, in a single question round:

1. **Screens in scope** — one or more, e.g. `Home`, `Cart`, `Checkout`, `Admin Dashboard`,
   `Mobile Home`. If a minimum item count is required (e.g. more than 40), say up front that one
   screen realistically yields 15–25 solid items, so 2–4 screens are needed; propose a set.
2. **How to inspect each screen** — a live URL to browse/screenshot, the screen's source
   components to read, or screenshots pasted in. If none of the three is available, stop and ask:
   inventing UI elements that may not exist poisons every item derived from them.
3. **Target viewports and browsers** — needed for the `RES` and `COM` items to be concrete
   rather than "responsive tốt".
4. **Project-specific requirements** — required aspect codes, whether a `Notes` column is
   expected, minimum item count, ID naming convention.

Write one Markdown file per screen: `checklist_<screen>.md`.

---

## Step 1 — Inventory the screen (per screen, before any pass)

Skipping this inventory is the single biggest reason AI-generated checklists read as generic.
List what is actually there:

- **Components**: buttons, inputs, dropdowns, checkboxes/radios, links, menus, modals, cards,
  tables, tabs, tooltips, pagination, breadcrumbs, toasts.
- **States per component** and **screen-level states** (table below).
- **Data-dependent variations**: long text overflow, zero/negative values, very large numbers,
  special characters, empty lists, pagination edges, slow network.

| Component | States worth checking                                          |
| --------- | -------------------------------------------------------------- |
| Button    | Default, Hover/Focus, Active, Disabled, Loading, Success/Error |
| Input     | Empty, Focus, Valid/Invalid, Disabled, Read-only, Required     |
| Screen    | Initial, Loading, Empty, Error, Success, No Permission         |

Most GUI defects live in the secondary states, not the default one. An inventory that only says
"there is a button and a form" cannot produce items that find them.

Also pick 1–3 **building methods** and record which were used, since a reviewer may ask where the
items came from:

| Method            | Use when                                                         |
| ----------------- | ---------------------------------------------------------------- |
| Requirement-based | A spec / user story / acceptance criteria exists for the screen  |
| Design-based      | Figma / prototype / design system available to diff against      |
| Component-based   | Step 1 inventory done — always applicable                        |
| State-based       | Screen has async/loading/error states — almost always applicable |
| Heuristic-based   | No spec; fall back to usability heuristics (Nielsen)             |
| Risk-based        | Screen touches money, auth, or data loss (cart, checkout, login) |
| Experience-based  | Known common defects for this kind of UI                         |

---

## Step 2 — The four passes

Run passes 1→4 **in order**, scoped to the inventory from Step 1. Each pass has two sub-steps:
**generate → critically review**. Carry the inventory forward between passes, but deliberately
ignore the other aspects while inside a pass; narrow scope is what forces specificity.

### Pass 1 — IA-01 General UI standards

Layout, spacing, alignment, colour, typography, icon/image quality, consistency with the rest of
the app, behaviour at each target viewport, cross-browser rendering consistency.
**Categories:** `VIS`, `RES`, `COM`. Out of scope this pass: validation, routing, loading/toasts.

### Pass 2 — IA-02 Forms

Every input on the screen: required-field marking, correct input type/keyboard, placeholder vs
label, max length, valid/invalid handling, per-field error message position and wording, submit
enable/disable, double-submit protection, data retained after a failed submit, form reset.
**Categories:** `VAL`, `FUN` (form-related only).

### Pass 3 — IA-03 Navigation

Menu/header/footer links, breadcrumbs, browser back/forward, routing and deep links, redirect
after login/logout, tab order between sections, pagination, leaving with unsaved changes,
404/unauthorized routes.
**Categories:** `NAV`.

### Pass 4 — IA-04 Feedback / state

Loading indicators, empty states, error states, success confirmations, toasts,
disabled-while-processing, optimistic UI correctness, keyboard accessibility, focus visibility,
labels for screen readers, contrast.
**Categories:** `FDB`, `USB`, `ACC`.

### Sub-step 2b (inside every pass) — critical review

Right after generating a pass, review it as a tester rather than accepting it: drop items that
don't apply to this screen, rewrite vague Expected Results, merge duplicates, then **add the
items the pass missed and record why it missed them**.

The reason must be specific — "AI is imperfect" explains nothing. Three legitimate categories:

| Reason category          | Example wording                                                                         |
| ------------------------ | --------------------------------------------------------------------------------------- |
| Weak prompt input        | "Prompt không nêu app có dark mode, nên pass IA-01 bỏ qua contrast ở dark theme."       |
| No access to the live UI | "Không chạy được screen reader thật, nên thiếu item kiểm tra ARIA label của nút Áp mã." |
| Model blind spot         | "Thiên về happy-path, nên bỏ qua state giỏ hàng rỗng và lỗi mạng chậm khi submit."      |

Record these in the review table of the output file — they are part of the checklist deliverable,
not an afterthought.

Commonly missed, worth checking every pass: accessibility (focus order, alt text, contrast),
dark mode, RTL layout, slow-network/loading states, empty-list states, long/overflowing text,
duplicate submit, browser zoom at 150%.

---

## Step 3 — Merge, gate coverage, and write the file

Merge the four passes into one checklist per screen using this exact schema:

| ID  | Screen | Category | Checklist Item | Expected Result | Status | Notes |
| --- | ------ | -------- | -------------- | --------------- | ------ | ----- |

- **ID**: `<PREFIX>-<2 digits>`, sequential per category (`VIS-01`, `VAL-03`). If one merged file
  spans several screens, prefix with the screen to stay globally unique: `CART-VIS-01`.
- **Screen**: identical string on every row of that screen, so rows can be filtered or merged.
- **Category**: one value from the taxonomy below.
- **Checklist Item**: one action or observation per row. Never bundle — "form validates _and_
  shows toast" is two rows, and as one row it can't be marked Pass/Fail honestly.
- **Expected Result**: concrete enough that a different person executes the row and reaches the
  same verdict without asking what was meant.
- **Status**: `Not Run` on every row. Do not pre-fill.
- **Notes**: empty. It exists for the human to write the failure reason during execution.

**Category taxonomy → interface aspect:**

| Category      | Prefix | Feeds aspect         |
| ------------- | ------ | -------------------- |
| Visual        | `VIS`  | IA-01                |
| Responsive    | `RES`  | IA-01                |
| Compatibility | `COM`  | IA-01                |
| Validation    | `VAL`  | IA-02                |
| Functional    | `FUN`  | IA-02 (form-related) |
| Navigation    | `NAV`  | IA-03                |
| Feedback      | `FDB`  | IA-04                |
| Usability     | `USB`  | IA-04                |
| Accessibility | `ACC`  | IA-04                |

**Coverage gate — compute and show this before finishing:**

| Aspect | Items | ≥ 1 item? |
| ------ | ----- | --------- |
| IA-01  |       |           |
| IA-02  |       |           |
| IA-03  |       |           |
| IA-04  |       |           |
| Total  |       | ≥ target? |

If an aspect is empty or the total is under target, go back and add items to the weak pass. Never
pad a strong pass with near-duplicates to hit a number: a reviewer reading 40 items sees the
padding immediately, and duplicated items produce duplicated bugs at execution time. Also check
balance — 40 items concentrated in `VAL` with 2 in `NAV` fails "cover all four aspects" even
though the total looks fine.

**Verifiability check on a sample of rows** before declaring done:

| ❌ Vague                      | ✅ Verifiable                                                                                 |
| ----------------------------- | --------------------------------------------------------------------------------------------- |
| "Kiểm tra form hoạt động tốt" | "Bỏ trống trường Email rồi nhấn Submit → hiện lỗi 'Email is required' ngay dưới trường Email" |
| "Nút bấm hiển thị đẹp"        | "Nút 'Add to Cart' cùng chiều cao và bo góc với nút 'Buy Now' trên cùng Product Card"         |
| "Responsive tốt"              | "Tại viewport 390×844, danh sách sản phẩm không xuất hiện thanh cuộn ngang"                   |

**Output** — one Markdown file per screen, following `assets/checklist_template.md`, containing:

1. Header block: screen name, how it was inspected, target viewports/browsers, building methods.
2. The 4-pass log: items generated and items added per pass.
3. The critical-review table: added items + why the pass missed them.
4. The coverage gate table.
5. The merged checklist table, all `Status = Not Run`.

Markdown only — no CSV or spreadsheet output from this skill.

---

## Step 4 (optional) — Flag automation candidates

If asked, tag rows worth scripting later: deterministic, stable selectors, no visual judgement —
login, search, add/remove cart item, form validation, checkout happy path, horizontal-overflow
checks. Leave manual anything needing human perception: visual polish, colour harmony, "does this
feel confusing".

---

## Handoff after this skill

The human executes the checklist against the running app, fills `Status` and `Notes`, captures
screenshots for failed items, and files bugs. `assets/bug_report_template.md` is included for
that phase (Bug ID, Title, Environment, Preconditions, Steps, ER, AR, Severity, Priority) — the
key rule when it's used: copy **ER verbatim** from the checklist row, so the chain
`checklist item → Failed → evidence → bug` stays traceable.

## Reusing on another screen

Nothing above is screen-specific. For a new screen, re-run Step 1 then passes 1→4, and write a
new file. Per-screen ID prefixes may restart because `Screen` disambiguates them — unless one
merged file is required, in which case prefix IDs with the screen.

## Bundled files

- `assets/checklist_template.md` — output structure: header block, pass log, review table,
  coverage gate, checklist table, with worked example rows.
- `assets/bug_report_template.md` — for the human's execution phase, not produced by this skill.
