# BUG-REGISTER-002: Cho phép đăng ký email đã tồn tại trong hệ thống

## Found by Test Case

TC-REGISTER-004

## Requirement liên quan

FR-01 (Đăng ký tài khoản — email phải là duy nhất)

## Severity / Priority

Critical / P1

## Environment

- Browser: Chromium (Desktop Chrome)
- OS: Windows 11
- URL: http://localhost:5173 (frontend-web)
- Build: nhánh `anh-khoa`, commit `a7b11fd`

## Steps to reproduce

1. Đăng ký thành công một tài khoản với email `test@example.com`
2. Thực hiện lại quy trình đăng ký với **cùng email** `test@example.com` và mật khẩu hợp lệ
3. Bấm nút "Đăng ký"

## Expected result

Hệ thống từ chối, hiển thị thông báo lỗi "Email đã được sử dụng" hoặc tương đương. Không tạo tài khoản trùng lặp.

## Actual result

Hệ thống không hiển thị thông báo lỗi trùng email. Assertion `expect(locator).toContainText(expected)` thất bại — không tìm thấy phần tử chứa thông báo lỗi mong đợi trên trang.

## Evidence

- Screenshot: `![BUG-REGISTER-002](../screenshots/BUG-REGISTER-002-duplicate-email.png)`
- Playwright log: `Error: expect(locator).toContainText(expected) failed`
