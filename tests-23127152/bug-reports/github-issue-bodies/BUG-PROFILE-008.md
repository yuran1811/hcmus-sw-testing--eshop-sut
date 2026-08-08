## Found by Test Case

PROFILE-FDB-03 (source)

## Requirement liên quan

FR-11

## Severity / Priority

Major / P2

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/
- Build: nhánh `hw3/23127152`

## Steps to reproduce

Bấm Hủy đơn trên đơn pending/shipping

## Expected result

confirm() trước khi gọi API

## Actual result

Gọi cancel ngay + alert

## Evidence

`../screenshots/(source) Profile.jsx cancelOrder — không có đơn seed để screenshot runtime`

Local path: `tests-23127152/bug-reports/profile/BUG-PROFILE-008.md`

## Notes

cancelOrder không window.confirm

---
Reported by SV **23127152** — HW03 GUI Checklist (Task 1).
