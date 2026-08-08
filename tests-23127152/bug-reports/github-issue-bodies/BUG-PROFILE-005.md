## Found by Test Case

PROFILE-FUN-03

## Requirement liên quan

FR-04

## Severity / Priority

Major / P2

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/
- Build: nhánh `hw3/23127152`

## Steps to reproduce

Double-click Cập nhật khi mạng chậm

## Expected result

Disabled/loading, một request

## Actual result

Không disabled — double PUT khả dụng

## Evidence

`../screenshots/BUG-PROFILE-005-no-update-loading.png`

Local path: `tests-23127152/bug-reports/profile/BUG-PROFILE-005.md`

## Notes

Profile.jsx handleUpdate

---
Reported by SV **23127152** — HW03 GUI Checklist (Task 1).
