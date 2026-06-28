# BUG-REGISTER-006: Mật khẩu thiếu chữ hoa bị chặn với thông báo chung, không xác nhận rõ lý do là thiếu chữ hoa

## Found by Test Case

TC-REGISTER-007

## Requirement liên quan

FR-01 (Đăng ký tài khoản — Mật khẩu phải có ≥1 chữ hoa)

## Severity / Priority

Minor / P3

## Environment

- Browser: Chromium (Desktop Chrome)
- OS: Windows 11
- URL: http://localhost:5173 (frontend-web)
- Build: nhánh `anh-khoa`, commit `fdf93ff`

## Steps to reproduce

1. Mở trang Đăng ký.
2. Nhập Họ Tên, Email hợp lệ; Mật khẩu và Xác nhận mật khẩu đều là `abcd123!` (8 ký tự, đủ thường/số/ký tự đặc biệt, chỉ thiếu chữ hoa).
3. Bấm nút "Đăng ký".

## Expected result

Hệ thống hiển thị lỗi định dạng mật khẩu (thiếu chữ hoa). Không có tài khoản nào được tạo.

## Actual result

Tài khoản không được tạo (đúng một phần), nhưng thông báo hiển thị là một câu chung cho mọi loại lỗi mật khẩu: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." — không xác nhận cụ thể nguyên nhân chặn là do thiếu chữ hoa, dù mật khẩu đã đủ 8 ký tự và đủ các điều kiện khác.

## Evidence

- Screenshot: `![BUG-REGISTER-006](../screenshots/BUG-REGISTER-006-generic-message.png)`
