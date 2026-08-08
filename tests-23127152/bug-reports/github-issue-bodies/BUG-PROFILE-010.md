## Found by Test Case

PROFILE-ACC-02

## Requirement liên quan

SEC / FR-04

## Severity / Priority

Critical / P0

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/
- Build: nhánh `hw3/23127152`

## Steps to reproduce

Đặt user.name chứa HTML/script, xem header

## Expected result

Escape text, không render HTML

## Actual result

App.jsx dangerouslySetInnerHTML Chào, name

## Evidence

`../screenshots/BUG-PROFILE-010-xss-dangerouslysetinnerhtml.png`

Local path: `tests-23127152/bug-reports/profile/BUG-PROFILE-010.md`

## Notes

App.jsx Header

---
Reported by SV **23127152** — HW03 GUI Checklist (Task 1).
