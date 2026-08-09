# [BUG][Quên Mật Khẩu] Lỗi Regex mật khẩu mạnh bắt buộc chứa khoảng trắng

## Found by Test Case

- F03-TC-011

## Requirement liên quan

- FR-03

## Severity / Priority

- **Severity**: Major
- **Priority**: P1

## Environment

- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5173/forgot-password
- Build/Commit: 3aa95b1

## Steps to reproduce

1. Truy cập trang Quên mật khẩu tại địa chỉ http://localhost:5173/forgot-password.
2. Nhập một email đã đăng ký (ví dụ: `user_f03_11@eshop.com`) và nhấn nút "Lấy mã OTP".
3. Nhập mã OTP hợp lệ hiển thị trên màn hình.
4. Tại ô "Mật khẩu mới", nhập mật khẩu hợp lệ không chứa khoảng trắng (ví dụ: `NewPass123!`).
5. Nhấn nút "Đặt lại mật khẩu".

## Expected result

- Hệ thống chấp nhận mật khẩu, cập nhật cơ sở dữ liệu thành công và chuyển hướng người dùng về trang đăng nhập `/login` với thông báo thành công.

## Actual result

- Hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT.".
- Nguyên nhân: Biểu thức chính quy Regex trong mã nguồn frontend của SUT (`flawedStrongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\s)[A-Za-z\d\s]{8,}$/`) chứa nhóm bắt buộc khoảng trắng `(?=.*\s)`, buộc người dùng phải thêm dấu cách vào mật khẩu mới được chấp nhận.

## Evidence

- Screenshot: ![Screenshot](../Evidences/FR03/F03-TC-011.png)
