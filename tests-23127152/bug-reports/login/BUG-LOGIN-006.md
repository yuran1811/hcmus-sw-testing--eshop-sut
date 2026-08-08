# BUG-LOGIN-006: Không chống double-submit / không loading khi đăng nhập

## Found by Test Case

LOGIN-FUN-04, LOGIN-FDB-02

## Requirement liên quan

FR-02

## Severity / Priority

Major / P2

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/
- Build: nhánh `hw3/23127152`

## Steps to reproduce

Double-click Sign In với credentials hợp lệ

## Expected result

Một request; nút disabled/loading

## Actual result

Có thể gửi 2 POST /api/login; nút không disabled

## Evidence

`../screenshots/BUG-LOGIN-006-no-submit-loading.png`

## Notes

Login.jsx handleSubmit không set loading

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/142
