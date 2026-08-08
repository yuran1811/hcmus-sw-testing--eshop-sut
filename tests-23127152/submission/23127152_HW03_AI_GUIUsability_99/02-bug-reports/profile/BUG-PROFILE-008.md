# BUG-PROFILE-008: Hủy đơn không có hộp thoại xác nhận

## Found by Test Case

PROFILE-FDB-03 (source)

## Requirement liên quan

FR-11

## Severity / Priority

Major / P2

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/
- Build: nhánh `hw3/23127152`

## Steps to reproduce

Bấm Hủy đơn trên đơn pending/shipping

## Expected result

confirm() trước khi gọi API

## Actual result

Gọi cancel ngay + alert

## Evidence

`../screenshots/(source) Profile.jsx cancelOrder — không có đơn seed để screenshot runtime`

## Notes

cancelOrder không window.confirm

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/154
