# BUG-REGISTER-009: Mật khẩu không có ký tự đặc biệt bị chặn với thông báo chung, không xác nhận rõ lý do là thiếu ký tự đặc biệt

## Found by Test Case

TC-REGISTER-010

## Requirement liên quan

FR-01 (Đăng ký tài khoản — Mật khẩu phải có ≥1 ký tự đặc biệt thuộc `@ $ ! % * ? &`)

## Severity / Priority

Minor / P3

## Environment

- Browser: Chromium (Desktop Chrome)
- OS: Windows 11
- URL: http://localhost:5173 (frontend-web)
- Build: nhánh `anh-khoa`, commit `fdf93ff`

## Steps to reproduce

1. Mở trang Đăng ký.
2. Nhập Họ Tên, Email hợp lệ; Mật khẩu và Xác nhận mật khẩu đều là `Abcd1234` (8 ký tự, đủ hoa/thường/số, hoàn toàn không có ký tự đặc biệt).
3. Bấm nút "Đăng ký".

## Expected result

Hệ thống hiển thị lỗi định dạng mật khẩu (thiếu ký tự đặc biệt). Không có tài khoản nào được tạo.

## Actual result

Tài khoản không được tạo (đúng một phần), nhưng thông báo hiển thị là một câu chung cho mọi loại lỗi mật khẩu: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." — không xác nhận cụ thể nguyên nhân chặn là do thiếu ký tự đặc biệt, dù mật khẩu đã đủ 8 ký tự và đủ các điều kiện khác.

## Evidence

- Screenshot: `![BUG-REGISTER-009](../screenshots/BUG-REGISTER-009-generic-message.png)`
