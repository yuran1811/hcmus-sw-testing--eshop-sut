# BUG-PROFILE-005: Nút Cập nhật không disabled khi đang submit

## Found by Test Case

PROFILE-FUN-03

## Requirement liên quan

FR-04

## Severity / Priority

Major / P2

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/
- Build: nhánh `hw3/23127152`

## Steps to reproduce

Double-click Cập nhật khi mạng chậm

## Expected result

Disabled/loading, một request

## Actual result

Không disabled — double PUT khả dụng

## Evidence

`../screenshots/BUG-PROFILE-005-no-update-loading.png`

## Notes

Profile.jsx handleUpdate

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/151
