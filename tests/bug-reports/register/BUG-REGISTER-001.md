# BUG-REGISTER-001: Đăng ký thành công nhưng không redirect đến URL mong đợi

## Found by Test Case

TC-REGISTER-001, TC-REGISTER-015, TC-REGISTER-016, TC-REGISTER-017

## Requirement liên quan

FR-01 (Đăng ký tài khoản)

## Severity / Priority

Critical / P1

## Environment

- Browser: Chromium (Desktop Chrome)
- OS: Windows 11
- URL: http://localhost:5173 (frontend-web)
- Build: nhánh `anh-khoa`, commit `a7b11fd`

## Steps to reproduce

1. Mở trang đăng ký tài khoản (http://localhost:5173/register hoặc tương đương)
2. Nhập đầy đủ thông tin hợp lệ: Họ Tên, Email, Mật khẩu đáp ứng tất cả yêu cầu (≥ 8 ký tự, có chữ hoa, chữ thường, số, ký tự đặc biệt), Xác nhận mật khẩu khớp
3. Bấm nút "Đăng ký" / "Submit"

## Expected result

Đăng ký thành công, hệ thống redirect người dùng đến trang chủ hoặc trang đăng nhập với thông báo thành công (URL thay đổi sang trang tiếp theo).

## Actual result

Hệ thống xử lý request nhưng URL trang không thay đổi sang địa chỉ mong đợi sau khi đăng ký. Assertion `expect(page).toHaveURL(expected)` thất bại — trang vẫn giữ nguyên hoặc redirect sang URL không đúng.

## Evidence

- Screenshot TC-REGISTER-001: `![BUG-REGISTER-001](../screenshots/BUG-REGISTER-001-redirect-fail.png)`
- Playwright log: `Error: expect(page).toHaveURL(expected) failed`
- Các test case cùng bị ảnh hưởng bởi lỗi này: TC-REGISTER-015, TC-REGISTER-016, TC-REGISTER-017

## Notes

Lỗi này cũng khiến TC-REGISTER-015 (mật khẩu 1 chữ thường), TC-REGISTER-016 (mật khẩu 1 chữ số), TC-REGISTER-017 (kiểm tra hash mật khẩu) không thể xác minh được hành vi mong đợi vì luồng đăng ký bị gián đoạn tại bước redirect.
