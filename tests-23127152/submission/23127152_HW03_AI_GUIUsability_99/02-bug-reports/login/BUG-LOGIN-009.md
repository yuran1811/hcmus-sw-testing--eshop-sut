# BUG-LOGIN-009: Label Username/Mật khẩu không gắn với input

## Found by Test Case

LOGIN-ACC-01

## Requirement liên quan

FR-02 / A11y

## Severity / Priority

Major / P2

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/
- Build: nhánh `hw3/23127152`

## Steps to reproduce

Bấm vào chữ nhãn

## Expected result

Focus vào input tương ứng

## Actual result

Không có for/id; click nhãn không focus

## Evidence

`../screenshots/BUG-LOGIN-009-labels-not-associated.png`

## Notes

Login.jsx labels không htmlFor

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/145
