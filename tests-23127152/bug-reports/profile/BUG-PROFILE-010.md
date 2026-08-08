# BUG-PROFILE-010: XSS qua dangerouslySetInnerHTML tên user ở header

## Found by Test Case

PROFILE-ACC-02

## Requirement liên quan

SEC / FR-04

## Severity / Priority

Critical / P0

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/
- Build: nhánh `hw3/23127152`

## Steps to reproduce

Đặt user.name chứa HTML/script, xem header

## Expected result

Escape text, không render HTML

## Actual result

App.jsx dangerouslySetInnerHTML Chào, name

## Evidence

`../screenshots/BUG-PROFILE-010-xss-dangerouslysetinnerhtml.png`

## Notes

App.jsx Header

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/156
