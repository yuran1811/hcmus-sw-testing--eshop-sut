# BUG-LOGIN-003: document.title mặc định frontend-web trên /login

## Found by Test Case

LOGIN-VIS-04

## Requirement liên quan

FR-02

## Severity / Priority

Minor / P3

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/
- Build: nhánh `hw3/23127152`

## Steps to reproduce

Mở /login, đọc title tab

## Expected result

Title mô tả Đăng nhập — EShop

## Actual result

title = frontend-web

## Evidence

`../screenshots/BUG-LOGIN-003-default-title.png`

## Notes

index.html Vite default

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/139
