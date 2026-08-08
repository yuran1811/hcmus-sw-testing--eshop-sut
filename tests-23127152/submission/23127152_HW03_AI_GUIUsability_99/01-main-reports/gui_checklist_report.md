# Main Report — GUI Checklist (Task 1)

**SV:** 23127152 · **SUT:** EShop `http://localhost:5173/` · **Screens:** Login `/login`, Profile `/profile`

## 1. Phạm vi & phương pháp

- Skill: `.agents/skills/gui-checklist-builder/` — 4 pass IA-01…IA-04 + critical review (WPI/NLU/MBS).
- Execute: Playwright Chromium (`test-runs/execute-task1.mjs`) + đóng COM trên Chrome/Firefox (Task 3).
- Schema: `ID | Screen | Category | Checklist Item | Expected Result | Status | Notes`.

Chi tiết item: `appendix_checklist_login.md`, `appendix_checklist_profile.md`.  
Excel: `../05-excel/checklist_and_test_summary.xlsx`.

## 2. Coverage IA

| Screen | IA-01 | IA-02 | IA-03 | IA-04 | Tổng |
|--------|-------|-------|-------|-------|------|
| Login | VIS/RES/COM | VAL/FUN | NAV | FDB/USB/ACC | 33 |
| Profile | VIS/RES/COM | VAL/FUN | NAV | FDB/USB/ACC | 32 |
| **Cộng** | | | | | **65** (>40) |

## 3. Kết quả thực thi

| Metric | Giá trị |
|--------|---------|
| Designed / Executed | 65 / 65 |
| Passed | 43 |
| Failed | 22 |
| Pass rate | 66.2% |

| Screen | Passed | Failed |
|--------|--------|--------|
| Login | 19 | 14 |
| Profile | 24 | 8 |

Run report: `appendix_sprint1_gui_execution.md`.

## 4. Bugs & GitHub Issues

20 bug Markdown trong `../02-bug-reports/` + 19 screenshots Failed (BUG-PROFILE-008: source-only).  
Issues: **#137–#156** — `../02-bug-reports/github-issues-created.md`.

**P0:** BUG-LOGIN-005 (password plaintext), BUG-PROFILE-010 (XSS header).

## 5. Human-added / AI miss (tóm tắt)

Critical review trên mỗi checklist giải thích item AI bỏ sót (accessibility labels, lockout message, password type, placeholder SĐT vs regex, v.v.).
