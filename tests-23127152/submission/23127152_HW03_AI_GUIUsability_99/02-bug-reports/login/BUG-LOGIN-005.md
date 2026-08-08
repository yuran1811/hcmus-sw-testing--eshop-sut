# BUG-LOGIN-005: Ô mật khẩu dùng type=text — hiện plaintext

## Found by Test Case

LOGIN-FUN-03

## Requirement liên quan

FR-02 / SEC

## Severity / Priority

Critical / P0

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/
- Build: nhánh `hw3/23127152`

## Steps to reproduce

Mở /login, gõ mật khẩu

## Expected result

Ký tự bị che (type=password)

## Actual result

type=text, mật khẩu nhìn thấy rõ

## Evidence

`../screenshots/BUG-LOGIN-005-password-plaintext.png`

## Notes

Login.jsx input type=text for password

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/141
