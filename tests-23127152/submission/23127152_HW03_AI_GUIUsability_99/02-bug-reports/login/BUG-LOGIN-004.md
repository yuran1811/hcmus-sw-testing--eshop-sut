# BUG-LOGIN-004: UI không hiển thị thông báo tài khoản bị khóa (lockout)

## Found by Test Case

LOGIN-VAL-04, LOGIN-FDB-03

## Requirement liên quan

FR-02

## Severity / Priority

Major / P1

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/
- Build: nhánh `hw3/23127152`

## Steps to reproduce

Gây lockout API 403 rồi đăng nhập lại trên UI

## Expected result

Hiện message khóa từ API

## Actual result

catch() luôn setError chuỗi chung Đăng nhập thất bại

## Evidence

`../screenshots/BUG-LOGIN-004-lockout-generic-error.png`

## Notes

Login.jsx catch ignores err.response

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/140
