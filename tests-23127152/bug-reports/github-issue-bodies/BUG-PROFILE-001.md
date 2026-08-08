## Found by Test Case

PROFILE-NAV-02, PROFILE-USB-01

## Requirement liên quan

FR-04

## Severity / Priority

Major / P1

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/
- Build: nhánh `hw3/23127152`

## Steps to reproduce

Logout, mở /profile

## Expected result

Có link/nút tới /login hoặc redirect

## Actual result

Chỉ text Vui lòng đăng nhập

## Evidence

`../screenshots/BUG-PROFILE-001-guest-no-login-cta.png`

Local path: `tests-23127152/bug-reports/profile/BUG-PROFILE-001.md`

## Notes

Profile.jsx early return

---
Reported by SV **23127152** — HW03 GUI Checklist (Task 1).
