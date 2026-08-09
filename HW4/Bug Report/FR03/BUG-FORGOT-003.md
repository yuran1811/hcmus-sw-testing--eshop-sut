# [BUG][Quên Mật Khẩu] Form quên mật khẩu không chặn email sai định dạng bằng HTML5 validation

## Found by Test Case

- F03-TC-004

## Requirement liên quan

- FR-03

## Severity / Priority

- **Severity**: Minor
- **Priority**: P2

## Environment

- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5173/forgot-password
- Build/Commit: 3aa95b1

## Steps to reproduce

1. Truy cập trang Quên mật khẩu tại địa chỉ http://localhost:5173/forgot-password.
2. Nhập vào trường email một chuỗi sai định dạng (ví dụ: `invalid-email-format`).
3. Nhấn nút "Lấy mã OTP".

## Expected result

- Trình duyệt tự động chặn hành động gửi form và hiển thị thông báo lỗi HTML5 validation (ví dụ: "Please include an '@' in the email address...").

## Actual result

- Form vẫn submit bình thường mà không bị trình duyệt chặn (do ô input email sử dụng thuộc tính `type="text"` thay vì `type="email"`), dẫn đến việc gửi yêu cầu lỗi lên server và trả về thông báo lỗi "User not found" từ API.

## Evidence

- Screenshot: ![Screenshot](../Evidences/FR03/F03-TC-004.png)

