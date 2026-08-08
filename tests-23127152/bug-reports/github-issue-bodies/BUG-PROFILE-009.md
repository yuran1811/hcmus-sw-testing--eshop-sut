## Found by Test Case

PROFILE-ACC-01

## Requirement liên quan

FR-04 / A11y

## Severity / Priority

Major / P2

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/
- Build: nhánh `hw3/23127152`

## Steps to reproduce

Bấm nhãn Họ Tên / SĐT / Địa chỉ

## Expected result

Focus control tương ứng

## Actual result

for=null trên mọi label

## Evidence

`../screenshots/BUG-PROFILE-009-labels-not-associated.png`

Local path: `tests-23127152/bug-reports/profile/BUG-PROFILE-009.md`

## Notes

Profile.jsx labels

---
Reported by SV **23127152** — HW03 GUI Checklist (Task 1).
