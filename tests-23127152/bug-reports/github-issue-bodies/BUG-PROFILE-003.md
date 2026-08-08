## Found by Test Case

PROFILE-VAL-03

## Requirement liên quan

FR-04

## Severity / Priority

Minor / P2

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/
- Build: nhánh `hw3/23127152`

## Steps to reproduce

Nhập 0912345678 rồi Cập nhật

## Expected result

Hoặc chấp nhận VN phone 0 đầu, hoặc sửa placeholder

## Actual result

Alert không hợp lệ dù placeholder gợi ý 0912

## Evidence

`../screenshots/BUG-PROFILE-003-phone-placeholder-mismatch.png`

Local path: `tests-23127152/bug-reports/profile/BUG-PROFILE-003.md`

## Notes

Profile.jsx regex ^[1-9] vs placeholder

---
Reported by SV **23127152** — HW03 GUI Checklist (Task 1).
