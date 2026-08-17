# [BUG][Forgot Password] Thiếu nút hoặc liên kết "Quay lại đăng nhập" tại giao diện Bước 1

## Found by Test Case

- TC-FORGOT-PASSWORD-006

## Requirement liên quan

- FR-03 (Forgot & Reset Password)
- FR-22 (Form & GUI specifications)

## Severity / Priority

- **Severity**: Minor
- **Priority**: P2

## Environment

- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5173/forgot-password
- Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## Steps to reproduce

1. Truy cập trang chủ EShop tại `http://localhost:5173`.
2. Nhấp "Đăng nhập" -> Nhấp "Quên mật khẩu?".
3. Quan sát giao diện Quên mật khẩu Bước 1 và tìm nút hoặc liên kết để quay trở lại trang đăng nhập.

## Expected result

- Giao diện Bước 1 phải hiển thị rõ ràng nút hoặc liên kết quay trở lại trang đăng nhập (ví dụ: "Quay lại đăng nhập" hoặc "← Quay lại") để người dùng điều hướng ngược lại nếu cần thiết.

## Actual result

- Không có bất kỳ liên kết hay nút nào để quay lại trang đăng nhập tại giao diện Bước 1. Người dùng bắt buộc phải dùng nút Back của trình duyệt hoặc sửa URL thủ công. (Lưu ý: nút "Quay lại" chỉ xuất hiện ở Bước 2).

## Evidence

- Screenshot of Step 1 UI showing the lack of back button/link: [forgot_password_step1_1782468478875.png](evidence/forgot_password_step1_1782468478875.png)
- Browser recording session: [forgot_password_ui_exploration_1782468458161.webp](evidence/forgot_password_ui_exploration_1782468458161.webp)

