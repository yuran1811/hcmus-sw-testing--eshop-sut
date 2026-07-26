---
name: cross-platform-testing-tracker
description: Scope, track, and log cross-browser/cross-platform testing across at least 3 platforms (Chrome, Firefox, Safari/Android Chrome, optionally substituting Expo Go for one), reusing the GUI checklist items that are actually platform-sensitive rather than re-running the whole checklist. Produces a platform matrix tracker and batch-overlays the required `StudentID@hcmus.edu.vn` watermark onto screenshots. Use this whenever the user asks to plan cross-browser testing, set up BrowserStack/LambdaTest coverage, pick which checklist items to re-test per platform, watermark or overlay a username onto screenshots, or organize cross-platform bug findings — even if they only say "làm cross-browser testing" without naming a tool.

This skill does not operate BrowserStack/LambdaTest/Expo Go and does not generate or simulate
screenshots — those must come from the user actually running the SUT on a real browser, real
device, or real cloud-testing session. See the boundary below before doing anything else.
---

# Cross-Platform Testing Tracker

Supports the *organizing* half of cross-browser/cross-platform testing — deciding what to test
where, tracking results, and preparing evidence — not the *execution* half, which requires real
tools and real screenshots.

## Boundary — read first

Two things this skill never does:

1. **Never fabricate or simulate a screenshot, a Pass/Fail result, or a browser/OS combination
   the user hasn't actually run.** The assignment's evidence requirement exists specifically so
   a grader can verify the test happened — a plausible-looking placeholder defeats that purpose
   the same way a fabricated participant list would in usability testing.
2. **Never claim to have run BrowserStack/LambdaTest/Expo Go.** Those are the user's accounts and
   trial sessions; this skill prepares what to test and processes the resulting images, nothing
   upstream of that.

Everything below — platform selection, the tracker, the watermark script — is safe to generate
in full because none of it is observed data.

---

## Step 1 — Choose the 3 platforms

**Requirement:** at least 3 platforms, covering Chrome, Firefox, and Safari (or Android Chrome).

| Situation | Recommendation |
| --- | --- |
| Have a BrowserStack/LambdaTest trial | Use it for all 3 — real devices/OS, no logistics needed |
| Trial expired, no Mac for Safari | Substitute **Expo Go on a real phone** for one slot (commonly replacing Safari) — this counts as satisfying one of the 3 required platforms, not a bonus add-on |
| No cloud trial at all | Real physical devices are allowed, but every screenshot must clearly show the browser/OS/device name alongside the SUT's localhost URL in frame — plan the shot composition before testing, not after |

Decide and record: `Platform 1 / 2 / 3 = <...>`, and which tool produced each (BrowserStack,
LambdaTest, Expo Go, physical device + name).

---

## Step 2 — Scope which checklist items actually need re-testing

**Don't re-run the full 40+ item GUI checklist on all 3 platforms** — most items (form
validation logic, navigation routing, business rules) behave identically regardless of rendering
engine, so re-testing them per platform is wasted effort that doesn't find new defects. Pull
from the existing checklist (if `gui-checklist-builder` was used) or build fresh, filtering to
what's actually platform-sensitive:

| Include | Category | Why it varies by platform |
| --- | --- | --- |
| Yes | `VIS` Visual | Font rendering, box-shadow, gradients differ by engine |
| Yes | `RES` Responsive | Viewport/breakpoint behavior differs by device |
| Yes | `COM` Compatibility | The category that exists specifically for this |
| Usually | `FUN` items touching browser APIs | Date pickers, file upload, payment redirect, camera/QR access |
| Rarely | `VAL`, `NAV`, `FDB` | Business logic — same JS runs regardless of browser, low yield from re-testing |

Target 10–20 items per platform rather than the full set — depth on the sensitive categories
beats shallow repetition of everything.

---

## Step 3 — Build the platform matrix tracker

Write `platform-matrix.md` from `assets/platform_matrix_template.md`:

| ID | Item | Platform 1 | Platform 2 | Platform 3 |
| -- | ---- | ---------- | ---------- | ---------- |

- **ID** — reuse the exact ID from the Task 1 checklist where it came from, so a grader can trace
  `VIS-01` back to its original definition instead of re-reading a duplicated description.
- **Each platform cell** — `Passed` / `Failed` / `Blocked` + screenshot filename. Leave as
  `Not Run` until actually tested; see the boundary above.
- A row failing on exactly one platform is a genuine cross-platform defect. A row failing on all
  three is a general defect that should already exist in the Task 1 bug list — flag it there
  instead of treating it as new evidence of a platform issue.

---

## Step 4 — Screenshot requirements and naming

Every screenshot must show, in frame:
- The browser/OS/device name (BrowserStack/LambdaTest overlay this automatically; for real
  devices, include the device's settings screen or a visible browser chrome).
- The SUT's URL (localhost or deployed) visible in the address bar.
- The `StudentID@hcmus.edu.vn` watermark (Step 5).

Naming convention: `<platform-slug>_<checklist-ID>_<short-desc>.png`, e.g.
`chrome-win11_VIS-01_checkout-alignment.png`.

---

## Step 5 — Watermark the username onto screenshots

`scripts/watermark_screenshot.py` overlays `StudentID@hcmus.edu.vn` onto one image or a whole
folder, bottom-right corner by default, semi-transparent so it doesn't obscure content underneath.

```bash
pip install Pillow --break-system-packages   # already present in most environments — skip if it works without this
python scripts/watermark_screenshot.py <input-path> [--student-id ID] [--output-dir out/] [--position br|bl|tr|tl] [--opacity 0-255]
```

- `<input-path>` can be a single image or a folder — a folder processes every `.png`/`.jpg` inside.
- `--student-id 25127001` produces the exact `25127001@hcmus.edu.vn` format the assignment
  requires — **use this for anything actually submitted.** If omitted, the script falls back to
  a personal default email (`DEFAULT_EMAIL` at the top of the script) on a different domain,
  which is convenient for a quick local test render but is not the submission format.
- Output filenames are preserved; originals are never overwritten unless `--output-dir` is
  omitted, in which case pass `--in-place` explicitly (the script refuses to silently overwrite).
- Run this **after** the real screenshot is captured — the watermark step never generates image
  content, only stamps text onto an existing file.

---

## Step 6 — Log cross-platform-specific bugs

For each `Failed` cell that's genuinely platform-specific (fails on 1–2 platforms, not all 3),
write a bug report using `bug_report_template.md` from the `gui-checklist-builder` skill if that
workflow is set up — reuse it rather than inventing a new format, and fill its `Environment`
field with the exact platform/browser/OS/viewport that reproduces the defect. Note explicitly
whether it reproduces on the other platforms too (helps whoever fixes it know if the cause is
CSS/rendering-specific or a deeper logic bug that happens to only surface under one engine's
timing).

---

## Step 7 — Summary

Once execution is done, report: platforms tested (with tool used for each), items tested per
platform, pass rate per platform, and the list of platform-specific defects found (cross-
referenced to their bug IDs). This is what typically goes in the README test summary alongside
Task 1 and Task 2's numbers.

## Bundled files

- `assets/platform_matrix_template.md` — tracker structure + worked example rows.
- `scripts/watermark_screenshot.py` — batch username overlay, tested and ready to run.
