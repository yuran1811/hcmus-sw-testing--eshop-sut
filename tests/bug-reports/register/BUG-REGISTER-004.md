# BUG-REGISTER-004: Email sai định dạng nhưng hệ thống hiển thị lỗi mật khẩu thay vì lỗi email

## Found by Test Case

TC-REGISTER-003

## Requirement liên quan

FR-01 (Đăng ký tài khoản — Email sai định dạng phải hiển thị lỗi định dạng email)

## Severity / Priority

Major / P2

## Environment

- Browser: Chromium (Desktop Chrome)
- OS: Windows 11
- URL: http://localhost:5173 (frontend-web)
- Build: nhánh `anh-khoa`, commit `fdf93ff`

## Steps to reproduce

1. Mở trang Đăng ký.
2. Nhập Họ Tên hợp lệ; Email `nguyenvana03@` (thiếu phần domain — sai định dạng); Mật khẩu và Xác nhận mật khẩu đều là `Abcd123!`.
3. Bấm nút "Đăng ký".

## Expected result

Hệ thống hiển thị lỗi định dạng email. Không có tài khoản nào được tạo.

## Actual result

Hệ thống không hiển thị bất kỳ thông báo nào về định dạng email. Thay vào đó hiển thị: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." — không có phản hồi nào cho biết Email đang sai định dạng.

## Evidence

- Screenshot: `![BUG-REGISTER-004](../screenshots/BUG-REGISTER-004-generic-message.png)`
