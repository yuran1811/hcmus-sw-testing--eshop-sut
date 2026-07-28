---
name: bug-report-github
description: Turn a Failed GUI checklist item or a severity-ranked usability finding into ONE standalone bug file per bug (with evidence attached and bidirectional links back to the checklist item/test case/session), following the course's GitHub bug-management conventions (title format, Found-by-Test-Case, Severity vs Priority, prefix labels, workflow state). The bug file is drafted and reviewed FIRST as a file on disk; it is only turned into an actual GitHub Issue (via gh CLI or by hand) when the user explicitly asks to file/create/push the issue. Use this any time the user has a Failed checklist row or a usability finding from EShop and needs it turned into a bug record. This complements gui-checklist-ai and usability-session-notes rather than replacing them.
---

# Bug Report → GitHub Issue (file-first, one bug = one file)

## Core workflow (two phases — do not skip phase 1)

**Phase 1 — Draft the bug as its own file, with evidence, and get it reviewed.**
**Phase 2 — Only when the user says something like "tạo issue này trên GitHub" / "push bug này lên" / "create the issue now", turn that file into an actual GitHub Issue.**

Never jump straight to creating a GitHub Issue from a raw observation. The file is the source of truth; the Issue is a projection of it. This mirrors the course convention: _"Bug là Issue riêng; không chỉ ghi comment trong file test case"_ — the bug gets its own artifact before it gets its own Issue.

## Input needed per bug

- Source: checklist item ID (e.g. `GUI-IA02-014`) OR usability finding ID (e.g. `F03`, sessions P02/P05).
- Related Requirement ID if known (e.g. `FR-08`).
- What was expected vs what actually happened.
- Evidence: screenshot/video/console log filename(s).
- Environment: browser/OS/URL/build or commit.

## Phase 1 — One file per bug

### Step 1 — Draft with the AI, one bug at a time

Do not batch-generate all bug reports in a single prompt — repro steps get vague and generic in bulk. For each bug, prompt:

> "Write a bug report for EShop with this raw observation: [paste raw note/failed-item detail]. Use this exact structure: Title in the format '[BUG][Module] Short description', Found by Test Case (checklist item ID or finding ID), Requirement liên quan, Severity (Blocker/Critical/Major/Minor/Trivial) AND Priority (P0/P1/P2/P3) as two separate ratings — do not conflate them, Environment, Steps to Reproduce (numbered, from a known starting state), Expected Result, Actual Result, Evidence (list filenames). Keep steps precise enough that someone unfamiliar with the flow could reproduce it."

Severity vs Priority reminder (do not let the AI collapse these into one field): **Severity** = how badly it breaks the system (e.g., wrong charge = Critical); **Priority** = how urgently it must be fixed (e.g., a typo on a promo banner might be Trivial severity but P1 priority if it's live during a sale). Assign both independently and justify any case where they diverge.

### Step 2 — Student review pass (mandatory, before any file is finalized)

For every drafted bug:

1. Re-run the repro steps yourself against the SUT — if they don't reproduce the issue exactly, fix them.
2. Confirm Severity and Priority independently match your own judgement, not just the AI's default.
3. Confirm every evidence file actually shows the described failure state (not a random screen).
4. Trim any invented detail the AI added that you didn't personally observe (e.g., don't let it guess a root cause you haven't verified).
5. Confirm the file has enough information to move to "In Progress" — per the course rule, _"Issue nào không đủ thông tin thì không được đưa vào 'In Progress'."_ If any required field is empty, the bug is not ready to file.

### Step 3 — Write the standalone bug file

One file per bug, named `bugs/BUG-0XX.md`. Template (matches the course's Bug Report standard):

```markdown
# [BUG][<Module>] <Short description>

## Found by Test Case

<checklist item ID e.g. GUI-IA02-014, or usability finding ID e.g. F03 (Sessions: P02, P05)>

## Requirement liên quan

<FR-XX, or "N/A">

## Severity / Priority

<Blocker|Critical|Major|Minor|Trivial> / <P0|P1|P2|P3>

## Environment

Browser/OS: <...>
URL / build or commit: <...>

## Steps to reproduce

1. ...
2. ...
3. ...

## Expected result

<...>

## Actual result

<...>

## Evidence

- `evidence/BUG-0XX_01.png`
- `evidence/BUG-0XX_02.mp4` (if applicable)

## Labels (planned)

type: bug | module: <...> | severity: <...> | priority: <...> | status: new | found-by: <test-case|usability-session>

## Status

New

## GitHub Issue

Not yet filed
```

### Step 4 — Bidirectional linking back into the source artifact (do this immediately, same commit)

- In the **checklist** (`checklist_and_test_summary.xlsx`, Checklist sheet): set that row's Status to Failed and Notes to reference `BUG-0XX`.
- In the **usability findings table** (`usability_evaluation_report.md` §7): set the finding's row to reference `BUG-0XX`.
- In the **bug file** itself: "Found by Test Case" already points back the other way.
  This two-way link is exactly the course requirement: _"Một bug phải ghi rõ 'Found by Test Case ID'. Một test case fail phải có 'Related bug #...'."_

## Phase 2 — Filing the GitHub Issue (only when explicitly requested)

Wait for an explicit instruction such as "tạo issue cho BUG-003", "push các bug lên GitHub", "file this as an issue now". Do not auto-create issues while still drafting bug files.

### Step 5 — Convert the file into an Issue

Two ways, pick based on what's available:

**A. `gh` CLI (if the user has it authenticated and asks for it):**

```bash
gh issue create \
  --repo ttbhanh/eshop-sut \
  --title "[BUG][<Module>] <Short description>" \
  --body-file bugs/BUG-0XX.md \
  --label "type: bug" --label "module: <...>" \
  --label "severity: <...>" --label "priority: <...>" \
  --label "status: new" --label "found-by: test-case"
```

Attach evidence by embedding image links in the body (GitHub Issues render relative-to-repo image paths only if pushed; otherwise upload the screenshot directly into the Issue's comment box, which generates a github.io asset URL, and add that URL into the file before running the command).

**B. Manual (paste into GitHub's "New Issue" form):**
Copy the bug file's body as-is (it's already in the right shape) into the Issue description, attach the evidence files via drag-and-drop into the Issue body, then apply the planned labels from the file.

### Step 6 — After filing, update the bug file

- Set `## GitHub Issue` to the real issue number/link.
- Set `## Status` to whatever the initial triage state is (`New` → `Triaged` once you or a teammate reviews it).
- Update the checklist/finding cross-reference to include the Issue number too, not just the BUG-ID.

## Workflow states to track per bug (course-standard lifecycle)

`New → Triaged → Assigned → In Progress → Ready for Retest → Verified/Closed`, with side-branches `Duplicate` (close + link the original), `Cannot reproduce` (ask for more evidence), `Won't fix` (state the reason), `Reopened` (retest failed again).

**Never close a bug without a retest.** Before moving a bug to Closed, the bug file (and the Issue) must record: which PR fixed it (`Fixes #NN`), that the checklist item / usability flow was re-executed, and the retest result with a comment — matching the course rule _"Không đóng bug chỉ vì developer nói 'đã sửa'. Tester cần retest và comment kết quả."_

## Output artifacts

- `bugs/BUG-0XX.md` — one file per bug, evidence-linked, reviewed (Phase 1 deliverable, always produced).
- `evidence/BUG-0XX_*.png|mp4` — evidence files referenced from the bug file.
- `bug_index.md` — master cross-reference table: `BUG-ID | Source (checklist item/finding) | Severity | Priority | Status | GitHub Issue # | Evidence files`.
- GitHub Issues themselves — only created in Phase 2, on explicit request.
