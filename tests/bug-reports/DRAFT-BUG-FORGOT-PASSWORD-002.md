# [BUG][Forgot Password] Biểu thức chính quy (Regex) kiểm tra mật khẩu bị lỗi - bắt buộc khoảng trắng và chặn ký tự đặc biệt

## Found by Test Case

- TC-FORGOT-PASSWORD-002
- TC-FORGOT-PASSWORD-014
- TC-FORGOT-PASSWORD-015
- TC-FORGOT-PASSWORD-016
- TC-FORGOT-PASSWORD-017
- TC-FORGOT-PASSWORD-018
- TC-FORGOT-PASSWORD-019
- TC-FORGOT-PASSWORD-024

## Requirement liên quan

- FR-03 (Forgot & Reset Password)
- FR-22 (Form & GUI specifications)

## Severity / Priority

- **Severity**: Major
- **Priority**: P1

## Environment

- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5173/forgot-password
- Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## Steps to reproduce

1. Thực hiện các bước để chuyển sang giao diện Đặt lại mật khẩu Bước 2.
2. Nhập mã OTP đúng (e.g. mã 4 số được sinh ra).
3. Nhập mật khẩu mạnh đúng chuẩn yêu cầu `Reset123!` (dài 9 ký tự, gồm chữ hoa, chữ thường, số, ký tự đặc biệt `!`).
4. Nhấp vào nút "Đặt lại mật khẩu".
5. Quan sát cảnh báo lỗi hiển thị.

## Expected result

- Mật khẩu `Reset123!` được chấp nhận và đặt lại mật khẩu thành công vì nó thỏa mãn tất cả tiêu chí bảo mật (chữ hoa, chữ thường, chữ số, ký tự đặc biệt).

## Actual result

- Hệ thống chặn lại và thông báo lỗi: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT.".
- **Nguyên nhân gốc rễ**: Tại `ForgotPassword.jsx:26`, regex kiểm tra được viết là:
  `const flawedStrongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\s)[A-Za-z\d\s]{8,}$/;`
  - Lỗi 1: Sử dụng `(?=.*\s)` bắt buộc mật khẩu phải chứa khoảng trắng (dấu cách).
  - Lỗi 2: Lớp ký tự `[A-Za-z\d\s]` chỉ cho phép chữ cái, chữ số và khoảng trắng. Toàn bộ các ký tự đặc biệt thực tế (như `!`, `@`, `#`, `$`, `%`, etc.) đều bị cấm. Mật khẩu chứa các ký tự này sẽ bị coi là không hợp lệ.
  - Kết quả là một mật khẩu như `Reset 123` (chứa khoảng trắng, không chứa ký tự đặc biệt) lại được chấp nhận, trong khi mật khẩu an toàn thực sự như `Reset123!` lại bị từ chối.

## Evidence

- Browser recording session showing validation block: [forgot_password_ui_exploration_1782468458161.webp](evidence/forgot_password_ui_exploration_1782468458161.webp)
