# BUG-LOGIN-007: Link Quên mật khẩu dùng <a href> full reload

## Found by Test Case

LOGIN-NAV-04

## Requirement liên quan

FR-03

## Severity / Priority

Minor / P3

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/
- Build: nhánh `hw3/23127152`

## Steps to reproduce

Từ /login bấm Quên mật khẩu?

## Expected result

Client-side routing như các Link khác

## Actual result

Full document navigation tới /forgot-password

## Evidence

`../screenshots/BUG-LOGIN-007-forgot-plain-anchor.png`

## Notes

Login.jsx <a href> thay vì <Link>

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/143
