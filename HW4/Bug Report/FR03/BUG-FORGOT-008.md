# [BUG][Quên Mật Khẩu] Tiêu đề trang đăng nhập hiển thị sai văn bản tiếng Việt thành "Đăng Ký"

## Found by Test Case

- F03-TC-001 (và kiểm tra đăng nhập sau khi đổi mật khẩu)

## Requirement liên quan

- FR-02 (và luồng xác minh đăng nhập của FR-03)

## Severity / Priority

- **Severity**: Major
- **Priority**: P1

## Environment

- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5173/login
- Build/Commit: 3aa95b1

## Steps to reproduce

1. Truy cập trang đăng nhập tại địa chỉ http://localhost:5173/login.
2. Quan sát tiêu đề chính (heading) hiển thị trên cùng của biểu mẫu đăng nhập.

## Expected result

- Tiêu đề chính của trang đăng nhập phải được ghi là "Đăng Nhập" để phù hợp với ngữ cảnh nghiệp vụ.

## Actual result

- Tiêu đề trang lại được ghi nhầm thành "Đăng Ký" (vốn là nhãn của trang tạo tài khoản), gây nhầm lẫn nghiêm trọng cho khách hàng khi thực hiện đăng nhập.

## Evidence

- Screenshot: ![Screenshot](../Evidences/FR03/F03-TC-004.png)

