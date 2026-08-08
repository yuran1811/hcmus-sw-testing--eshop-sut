# BUG-LOGIN-010: html lang=en trong khi UI tiếng Việt

## Found by Test Case

LOGIN-ACC-03

## Requirement liên quan

IA-04 ACC

## Severity / Priority

Minor / P3

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/
- Build: nhánh `hw3/23127152`

## Steps to reproduce

Inspect document.documentElement.lang trên /login

## Expected result

lang=vi

## Actual result

lang=en

## Evidence

`../screenshots/BUG-LOGIN-010-html-lang-en.png`

## Notes

index.html lang=en

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/146
