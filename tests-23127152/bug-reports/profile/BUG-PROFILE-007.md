# BUG-PROFILE-007: Rời Profile khi form dirty không cảnh báo

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

## Notes

Không beforeunload

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/153
