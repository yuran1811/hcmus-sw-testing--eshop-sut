# BUG-LOGIN-008: Nút Sign In có tabIndex=1 phá thứ tự Tab

## Found by Test Case

LOGIN-NAV-05

## Requirement liên quan

FR-02

## Severity / Priority

Minor / P2

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/
- Build: nhánh `hw3/23127152`

## Steps to reproduce

Từ đầu trang Tab qua các control

## Expected result

Thứ tự đọc tự nhiên

## Actual result

tabIndex=1 kéo nút lên sớm

## Evidence

`../screenshots/BUG-LOGIN-008-tabindex-signin.png`

## Notes

Login.jsx tabIndex={1}

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/144
