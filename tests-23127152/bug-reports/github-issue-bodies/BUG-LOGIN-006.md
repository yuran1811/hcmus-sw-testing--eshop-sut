## Found by Test Case

LOGIN-FUN-04, LOGIN-FDB-02

## Requirement liên quan

FR-02

## Severity / Priority

Major / P2

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/
- Build: nhánh `hw3/23127152`

## Steps to reproduce

Double-click Sign In với credentials hợp lệ

## Expected result

Một request; nút disabled/loading

## Actual result

Có thể gửi 2 POST /api/login; nút không disabled

## Evidence

`../screenshots/BUG-LOGIN-006-no-submit-loading.png`

Local path: `tests-23127152/bug-reports/login/BUG-LOGIN-006.md`

## Notes

Login.jsx handleSubmit không set loading

---
Reported by SV **23127152** — HW03 GUI Checklist (Task 1).
