## Found by Test Case

LOGIN-NAV-04

## Requirement liên quan

FR-03

## Severity / Priority

Minor / P3

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/
- Build: nhánh `hw3/23127152`

## Steps to reproduce

Từ /login bấm Quên mật khẩu?

## Expected result

Client-side routing như các Link khác

## Actual result

Full document navigation tới /forgot-password

## Evidence

`../screenshots/BUG-LOGIN-007-forgot-plain-anchor.png`

Local path: `tests-23127152/bug-reports/login/BUG-LOGIN-007.md`

## Notes

Login.jsx <a href> thay vì <Link>

---
Reported by SV **23127152** — HW03 GUI Checklist (Task 1).
