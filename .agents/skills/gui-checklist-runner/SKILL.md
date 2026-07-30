---
name: gui-checklist-runner
description: >
  Executes GUI testing checklists for HW03 Task 1 using Playwright automation scripts against running SUT instances. Evaluates Pass/Fail for checklist items (IA-01..IA-04), captures evidence screenshots for Failed items in HW3/Evidences/, updates CHECKLIST.md and CHECKLIST.csv with execution results, and generates Bug Reports in HW3/Bug Report/ and GitHub Issues.
---

# GUI Checklist Runner (HW03 Task 1 — Execution)

## Purpose

Execute an existing GUI Checklist (`CHECKLIST.md`) against a live EShop SUT using Playwright automation scripts to:

- Evaluate **Pass / Fail** for all checklist items across IA-01, IA-02, IA-03, IA-04
- Perform a human/student gap pass if any `Origin: STUDENT` items are needed
- Capture visual evidence screenshots for **Failed items** saved in `HW3/Evidences/`
- Update `HW3/GUI-Testing/CHECKLIST.md` and `HW3/GUI-Testing/CHECKLIST.csv` with execution status (`Pass`/`Fail`), actual results, notes (reasons for failure), and evidence links
- Generate detailed **Bug Reports** in `HW3/Bug Report/` and prepare GitHub Issue drafts (including attached screenshots) for all discovered bugs

---

## Execution Prerequisites

1. **SUT Services Running**:
   - Backend API: `http://localhost:3000`
   - Frontend Web: `http://localhost:5173`
   - Frontend Admin: `http://localhost:5174`
2. **Playwright Environment**:
   - Playwright package available in `Automation-testing/node_modules/playwright` or installed globally.
3. **Input Checklist**:
   - `HW3/GUI-Testing/CHECKLIST.md` and `HW3/GUI-Testing/CHECKLIST.csv` (contains design items with empty status columns).

---

## Workflow

### Step 1: Pre-flight & Service Verification

- Check that SUT services are active on ports 3000, 5173, 5174.
- Read `HW3/GUI-Testing/CHECKLIST.md` to collect all checklist item IDs and expected results.
- Verify if any additional student gap items (`Origin: STUDENT`) need to be appended.

### Step 2: Generate & Run Playwright Automation Script

Create a Node.js Playwright script (e.g. `scripts/run_gui_checklist.js`) that:

1. Launches Chromium browser (Viewport: 1536 × 864).
2. Sets up Dialog Listener (`page.on('dialog', dialog => ...)`):
   - Crucial for SUT screens using native `window.alert()` (e.g. `ForgotPassword.jsx`).
3. Navigates to Target Screens:
   - **Forgot Password**: `http://localhost:5173/forgot-password`
   - **Admin Orders**: `http://localhost:5174` (authenticates with `admin@eshop.com` / `Admin123!`, then opens orders tab).
4. Evaluates DOM & Visual Assertions for each Checklist Item:
   - **IA-01 General UI**: Check `<h1>`/`<h2>` tags, currency format (`₫`), Vietnamese copy, tab focus order, background colors, `dangerouslySetInnerHTML` XSS escaping.
   - **IA-02 Forms**: Check `type="email"`, `type="password"`, required `*` indicators, step indicators, OTP digit label, error message placement, password regex behavior.
   - **IA-03 Navigation**: Check active sidebar highlight, back button behavior, login link navigation, logo home link.
   - **IA-04 Feedback / State**: Check OTP display banner, step transition, alert handling, loading/empty states, canceled order state machine button restrictions.
5. Saves Evidence Screenshots for **Failed items only** to `HW3/Evidences/GUI-<ITEM-ID>.png`.

### Step 3: Update Checklist Artifacts

Update both `CHECKLIST.md` and `CHECKLIST.csv`:

- `Trạng thái` / `Status`: `Pass` or `Fail`
- `Kết quả thực tế` / `Actual Result`: Precise observable outcome from Playwright execution
- `Ghi chú` / `Notes`: Defect explanation recording the exact reason it failed (empty or brief note if Passed)
- `Bằng chứng` / `Evidence`: Markdown link to `HW3/Evidences/GUI-<ITEM-ID>.png` for Failed items

### Step 4: Generate Bug Reports & GitHub Issues

For every `Fail` item, create a Bug Report file `HW3/Bug Report/BUG-GUI-<NN>-<SHORT-NAME>.md` and prepare the GitHub Issue template format:

```markdown
# Bug Report: [BUG-GUI-NN] [Short Title]

- **ID**: `BUG-FORGOT-001`
- **Checklist ID**: `GUI-FORGOT-IA01-01`
- **Severity**: High / Medium / Low
- **Screen**: [Forgot Password / Admin Orders]
- **Component**: [Component Name]
- **Spec Violation**: FR-XX / SEC-XX

## Description
[Detailed description of the defect]

## Expected Behavior
[What spec requires]

## Actual Behavior
[What SUT actually does]

## Evidence
![Screenshot](../../Evidences/GUI-FORGOT-IA01-01.png)
```

---

## Output Artifacts

```text
HW3/
  Evidences/
    GUI-FORGOT-IA01-01.png   # Screenshots for Failed items only
    ...
  GUI-Testing/
    CHECKLIST.md       # Updated with Pass/Fail, Actual Result, Notes (reasons for failure), Evidence links
    CHECKLIST.csv      # Updated CSV export
  Bug Report/
    BUG-FORGOT-001.md
    BUG-FORGOT-002.md
    BUG-ORDERS-001.md
    ...
```
