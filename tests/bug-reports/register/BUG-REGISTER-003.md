# BUG-REGISTER-003: Thiếu trường "Xác nhận mật khẩu" hoặc không validate khi trống/không khớp

## Found by Test Case

TC-REGISTER-013, TC-REGISTER-014

## Requirement liên quan

FR-01 (Đăng ký tài khoản — xác nhận mật khẩu là bắt buộc)

## Severity / Priority

Major / P1

## Environment

- Browser: Chromium (Desktop Chrome)
- OS: Windows 11
- URL: http://localhost:5173 (frontend-web)
- Build: nhánh `anh-khoa`, commit `a7b11fd`

## Steps to reproduce

**Kịch bản A — TC-REGISTER-013 (Xác nhận mật khẩu không khớp):**
1. Mở trang đăng ký
2. Điền đầy đủ các trường: Họ Tên, Email, Mật khẩu hợp lệ
3. Nhập giá trị **khác** vào trường "Xác nhận mật khẩu"
4. Bấm nút "Đăng ký"

**Kịch bản B — TC-REGISTER-014 (Xác nhận mật khẩu để trống):**
1. Mở trang đăng ký
2. Điền đầy đủ: Họ Tên, Email, Mật khẩu hợp lệ
3. Để trống trường "Xác nhận mật khẩu"
4. Bấm nút "Đăng ký"

## Expected result

- Kịch bản A: Hiển thị lỗi "Xác nhận mật khẩu không khớp", chặn submit.
- Kịch bản B: Trường "Xác nhận mật khẩu" phải tồn tại trên form và bị đánh dấu invalid (required field validation).

## Actual result

- Kịch bản A: `TimeoutError: locator.fill: Timeout 5000ms exceeded` — trường "Xác nhận mật khẩu" không tìm thấy hoặc form đã redirect trước khi test điền xong.
- Kịch bản B: `Error: Trường Xác nhận mật khẩu phải tồn tại và bị đánh dấu invalid khi trống` — trường không tồn tại hoặc không có validation khi trống.

## Evidence

- Screenshot TC-REGISTER-013: `![BUG-REGISTER-003-timeout](../screenshots/BUG-REGISTER-003-confirm-pw-timeout.png)`
- Screenshot TC-REGISTER-014: `![BUG-REGISTER-003-missing](../screenshots/BUG-REGISTER-003-confirm-pw-missing.png)`
- Playwright log TC-REGISTER-013: `TimeoutError: locator.fill: Timeout 5000ms exceeded`
- Playwright log TC-REGISTER-014: `Error: Trường Xác nhận mật khẩu phải tồn tại và bị đánh dấu invalid khi trống`
