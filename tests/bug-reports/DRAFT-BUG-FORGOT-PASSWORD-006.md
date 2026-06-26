# [BUG][Forgot Password] Thông báo lỗi hiển thị bằng hộp thoại alert của trình duyệt thay vì hiển thị dạng văn bản phía trên nút submit

## Found by Test Case

- TC-FORGOT-PASSWORD-003
- TC-FORGOT-PASSWORD-004
- TC-FORGOT-PASSWORD-007
- TC-FORGOT-PASSWORD-008
- TC-FORGOT-PASSWORD-009
- TC-FORGOT-PASSWORD-010
- TC-FORGOT-PASSWORD-011
- TC-FORGOT-PASSWORD-012
- TC-FORGOT-PASSWORD-013
- TC-FORGOT-PASSWORD-014
- TC-FORGOT-PASSWORD-015
- TC-FORGOT-PASSWORD-016
- TC-FORGOT-PASSWORD-017
- TC-FORGOT-PASSWORD-018
- TC-FORGOT-PASSWORD-019
- TC-FORGOT-PASSWORD-023

## Requirement liên quan

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

1. Truy cập trang Quên mật khẩu.
2. Nhập một email chưa đăng ký hệ thống `unregistered@eshop.com` và nhấp "Lấy mã OTP".
3. Quan sát cách hệ thống hiển thị thông báo lỗi.

## Expected result

- Khi có lỗi phát sinh (ví dụ: email chưa đăng ký, sai OTP, mật khẩu yếu...), thông báo lỗi phải được hiển thị trực quan dạng văn bản màu đỏ nằm ngay phía TRÊN nút submit để đảm bảo trải nghiệm người dùng mượt mà và thẩm mỹ.

## Actual result

- Hệ thống sử dụng hàm `alert()` của trình duyệt để hiển thị lỗi dưới dạng hộp thoại cảnh báo (modal dialog). Người dùng bắt buộc phải nhấp "OK" để đóng hộp thoại, gây gián đoạn trải nghiệm và không đúng thiết kế giao diện (FR-22).
- Ví dụ: `alert("Lỗi: " + ...)` hoặc `alert("Mật khẩu quá yếu! ...")` hoặc `alert("Mã OTP không đúng hoặc có lỗi xảy ra.")`.

## Evidence

- Browser recording session: [forgot_password_ui_exploration_1782468458161.webp](evidence/forgot_password_ui_exploration_1782468458161.webp)
