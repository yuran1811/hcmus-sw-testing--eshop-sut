## Found by Test Case

LOGIN-ACC-04

## Requirement liên quan

FR-02 / A11y

## Severity / Priority

Minor / P2

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/
- Build: nhánh `hw3/23127152`

## Steps to reproduce

Đăng nhập sai, inspect khối lỗi

## Expected result

role=alert hoặc aria-live

## Actual result

DIV thường, không ARIA

## Evidence

`../screenshots/BUG-LOGIN-011-error-no-aria-live.png`

Local path: `tests-23127152/bug-reports/login/BUG-LOGIN-011.md`

## Notes

Login.jsx error div

---
Reported by SV **23127152** — HW03 GUI Checklist (Task 1).
