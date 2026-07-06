---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Profile] Thiếu server-side validation cho định dạng và độ dài số điện thoại khi cập nhật hồ sơ"
labels: "type: bug, module: profile, severity: Major, priority: P1, status: new, found-by: test-case"
assignees: ""
---

## Found by Test Case

TC-PROFILE-UCT-02, TC-PROFILE-UCT-03, TC-PROFILE-UCT-04

## Requirement liên quan

FR-04 (Quản lý hồ sơ cá nhân)

## Severity / Priority

Major / P1

## Environment

Browser: Google Chrome / Microsoft Edge, OS: Windows, URL: http://localhost:3000

## Steps to reproduce

1. Đăng nhập tài khoản người dùng và lấy Token JWT.
2. Gửi request `PUT /api/users/me` với các giá trị Số điện thoại không hợp lệ:
   - SĐT ít hơn 10 chữ số (ví dụ: `"09123"`).
   - SĐT không bắt đầu bằng số 0 (ví dụ: `"1234567890"`).
   - SĐT nhiều hơn 11 chữ số (ví dụ: `"0912345678901"`).
3. Kiểm tra phản hồi HTTP từ server và dữ liệu trong CSDL.

## Expected result

- Server phải kiểm tra hợp lệ (validate): Số điện thoại phải bắt đầu bằng số `0` và có từ 10 đến 11 chữ số.
- Trả về mã lỗi thích hợp và không lưu dữ liệu vi phạm vào CSDL.

## Actual result

- Server không thực hiện kiểm tra định dạng/độ dài của Số điện thoại, chấp nhận và lưu trực tiếp mọi chuỗi SĐT không hợp lệ vào CSDL.
