## Found by Test Case

PROFILE-NAV-05

## Requirement liên quan

FR-04

## Severity / Priority

Minor / P3

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/
- Build: nhánh `hw3/23127152`

## Steps to reproduce

Sửa form chưa lưu, bấm logo Home

## Expected result

Cảnh báo unsaved changes

## Actual result

Điều hướng ngay, mất dữ liệu form

## Evidence

`../screenshots/BUG-PROFILE-007-no-unsaved-warning.png`

Local path: `tests-23127152/bug-reports/profile/BUG-PROFILE-007.md`

## Notes

Không beforeunload

---
Reported by SV **23127152** — HW03 GUI Checklist (Task 1).
