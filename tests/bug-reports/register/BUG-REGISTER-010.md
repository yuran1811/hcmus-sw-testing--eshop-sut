# BUG-REGISTER-010: Mật khẩu có ký tự đặc biệt ngoài tập cho phép bị chặn với thông báo chung, không xác nhận rõ lý do

## Found by Test Case

TC-REGISTER-011

## Requirement liên quan

FR-01 (Đăng ký tài khoản — Mật khẩu chỉ chấp nhận ký tự đặc biệt thuộc tập `@ $ ! % * ? &`)

## Severity / Priority

Minor / P3

## Environment

- Browser: Chromium (Desktop Chrome)
- OS: Windows 11
- URL: http://localhost:5173 (frontend-web)
- Build: nhánh `anh-khoa`, commit `fdf93ff`

## Steps to reproduce

1. Mở trang Đăng ký.
2. Nhập Họ Tên, Email hợp lệ; Mật khẩu và Xác nhận mật khẩu đều là `Abcd1234#` (9 ký tự, đủ hoa/thường/số; ký tự đặc biệt `#` không thuộc tập cho phép `@ $ ! % * ? &`).
3. Bấm nút "Đăng ký".

## Expected result

Theo đặc tả FR-01, `#` nằm ngoài tập ký tự đặc biệt cho phép nên mật khẩu bị coi là không có ký tự đặc biệt hợp lệ. Hệ thống phải hiển thị lỗi định dạng mật khẩu và không tạo tài khoản.

## Actual result

Tài khoản không được tạo (đúng một phần), nhưng thông báo hiển thị là một câu chung cho mọi loại lỗi mật khẩu: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." — không xác nhận được liệu hệ thống có thực sự nhận diện đúng `#` là ký tự đặc biệt không hợp lệ, hay chỉ đơn giản chặn vì một lý do khác không xác định.

## Evidence

- Screenshot: `![BUG-REGISTER-010](../screenshots/BUG-REGISTER-010-generic-message.png)`
