# BUG-LOGIN-011: Thông báo lỗi login thiếu role=alert / aria-live

## Found by Test Case

LOGIN-ACC-04

## Requirement liên quan

FR-02 / A11y

## Severity / Priority

Minor / P2

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/
- Build: nhánh `hw3/23127152`

## Steps to reproduce

Đăng nhập sai, inspect khối lỗi

## Expected result

role=alert hoặc aria-live

## Actual result

DIV thường, không ARIA

## Evidence

`../screenshots/BUG-LOGIN-011-error-no-aria-live.png`

## Notes

Login.jsx error div

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/147
