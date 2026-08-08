## Found by Test Case

PROFILE-FUN-04

## Requirement liên quan

FR-04

## Severity / Priority

Major / P1

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/
- Build: nhánh `hw3/23127152`

## Steps to reproduce

Đổi Họ Tên, Cập nhật thành công, không reload

## Expected result

Header Chào, {tên mới}

## Actual result

Header giữ tên cũ (AuthContext không refresh)

## Evidence

`../screenshots/BUG-PROFILE-006-header-name-stale.png`

Local path: `tests-23127152/bug-reports/profile/BUG-PROFILE-006.md`

## Notes

PUT /users/me không setUser

---
Reported by SV **23127152** — HW03 GUI Checklist (Task 1).
