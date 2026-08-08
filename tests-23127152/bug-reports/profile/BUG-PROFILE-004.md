# BUG-PROFILE-004: Mọi feedback Profile chỉ qua alert() blocking

## Found by Test Case

PROFILE-USB-02

## Requirement liên quan

FR-04

## Severity / Priority

Major / P2

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/
- Build: nhánh `hw3/23127152`

## Steps to reproduce

Cập nhật hồ sơ / lỗi SĐT

## Expected result

Toast hoặc message inline

## Actual result

alert() chặn toàn UI

## Evidence

`../screenshots/BUG-PROFILE-004-alert-only-feedback.png`

## Notes

Profile.jsx alert()

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/150
