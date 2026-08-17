# [BUG][Quên Mật Khẩu] Thiếu trường nhập "Xác nhận mật khẩu" trên giao diện đặt lại mật khẩu

## Found by Test Case

- F03-TC-012

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
2. Nhập một email hợp lệ và bấm "Lấy mã OTP" để chuyển sang Bước 2 (Đặt lại mật khẩu).
3. Quan sát các trường nhập liệu xuất hiện trên biểu mẫu (Form).

## Expected result

- Biểu mẫu đặt lại mật khẩu ở Bước 2 phải hiển thị đầy đủ trường nhập "Mật khẩu mới" và trường "Xác nhận mật khẩu" (Confirm Password) để người dùng xác nhận và tránh gõ sai mật khẩu.

## Actual result

- Giao diện Step 2 chỉ hiển thị trường "Mã OTP" và "Mật khẩu mới", hoàn toàn thiếu trường "Xác nhận mật khẩu". Điều này vi phạm nghiêm trọng đặc tả yêu cầu và thiết kế UI/UX tiêu chuẩn.

## Evidence

- Screenshot: ![Screenshot](../Evidences/FR03/F03-TC-012.png)

