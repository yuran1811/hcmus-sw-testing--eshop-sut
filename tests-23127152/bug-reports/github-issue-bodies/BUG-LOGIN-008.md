## Found by Test Case

LOGIN-NAV-05

## Requirement liên quan

FR-02

## Severity / Priority

Minor / P2

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/
- Build: nhánh `hw3/23127152`

## Steps to reproduce

Từ đầu trang Tab qua các control

## Expected result

Thứ tự đọc tự nhiên

## Actual result

tabIndex=1 kéo nút lên sớm

## Evidence

`../screenshots/BUG-LOGIN-008-tabindex-signin.png`

Local path: `tests-23127152/bug-reports/login/BUG-LOGIN-008.md`

## Notes

Login.jsx tabIndex={1}

---
Reported by SV **23127152** — HW03 GUI Checklist (Task 1).
