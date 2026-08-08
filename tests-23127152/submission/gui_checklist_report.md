# GUI Checklist Report — SV 23127152

## Phạm vi

- Screens: Login `/login`, Profile `/profile`
- Checklist: `../checklist/login/checklist_login.md`, `../checklist/profile/checklist_profile.md`
- Test run: `../test-runs/sprint-1-gui-execution.md` (+ COM đóng ở Task 3)
- Excel: [`checklist_and_test_summary.xlsx`](./checklist_and_test_summary.xlsx) — **65 rows** + Test Summary + Bugs
- Phương pháp: 4-pass IA (gui-checklist-builder) → execute Playwright Chromium → COM Chrome↔Firefox

## Coverage IA-01…IA-04

Cả hai màn đều có item VIS/RES/COM (IA-01), VAL/FUN (IA-02), NAV (IA-03), FDB/USB/ACC (IA-04).  
**Tổng designed: 65** (Login 33 + Profile 32) — vượt ngưỡng > 40.

## Thống kê execution

| Metric | Giá trị |
|--------|---------|
| Designed | 65 |
| Executed | 65 |
| Passed | 43 |
| Failed | 22 |
| Pass rate | 66.2% |
| Not Run | 0 (COM-01 đóng ở Task 3) |

| Screen | Designed | Passed | Failed |
|--------|----------|--------|--------|
| Login | 33 | 19 | 14 |
| Profile | 32 | 24 | 8 |

## Critical review (AI miss)

Mỗi checklist có bảng Critical review với lý do WPI / NLU / MBS (password `type=text`, tiêu đề sai, lockout message, XSS `dangerouslySetInnerHTML`, placeholder SĐT vs regex, v.v.).

## Bugs

- **20** bug Markdown: `../bug-reports/login/` (11) + `../bug-reports/profile/` (9; skip 002)
- Screenshots Fail: `../bug-reports/screenshots/` (19 ảnh; BUG-PROFILE-008 = source-only)
- GitHub Issues: **#137–#156** — [`../bug-reports/github-issues-created.md`](../bug-reports/github-issues-created.md)

## P0

- BUG-LOGIN-005 — password plaintext (`type="text"`)
- BUG-PROFILE-010 — XSS header `dangerouslySetInnerHTML`
