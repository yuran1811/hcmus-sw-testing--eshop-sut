# BUG-PROFILE-006: Header không cập nhật tên sau khi sửa hồ sơ

## Found by Test Case

PROFILE-FUN-04

## Requirement liên quan

FR-04

## Severity / Priority

Major / P1

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/
- Build: nhánh `hw3/23127152`

## Steps to reproduce

Đổi Họ Tên, Cập nhật thành công, không reload

## Expected result

Header Chào, {tên mới}

## Actual result

Header giữ tên cũ (AuthContext không refresh)

## Evidence

`../screenshots/BUG-PROFILE-006-header-name-stale.png`

## Notes

PUT /users/me không setUser

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/152
