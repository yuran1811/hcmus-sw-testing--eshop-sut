# BUG-LOGIN-002: Ngôn ngữ form Login bị trộn EN/VI (Username, Sign In)

## Found by Test Case

LOGIN-VIS-03, LOGIN-USB-01

## Requirement liên quan

FR-02

## Severity / Priority

Major / P1

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/
- Build: nhánh `hw3/23127152`

## Steps to reproduce

Mở /login và đọc nhãn trường + nút submit

## Expected result

Nhãn/nút thống nhất tiếng Việt

## Actual result

Label Username + nút Sign In lẫn với Mật khẩu tiếng Việt

## Evidence

`../screenshots/BUG-LOGIN-002-mixed-language.png`

## Notes

Login.jsx labels/button text

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/138
