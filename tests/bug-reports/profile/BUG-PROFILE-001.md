---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Profile] Lỗ hổng bảo mật Privilege Escalation cho phép người dùng tự nâng quyền role thành admin"
labels: "type: bug, module: profile, severity: Critical, priority: P0, status: new, found-by: test-case"
assignees: ""
---

## Found by Test Case

TC-PROFILE-UCT-06

## Requirement liên quan

FR-04 (Quản lý hồ sơ cá nhân), SEC-06

## Severity / Priority

Critical / P0

## Environment

Browser: Google Chrome / Microsoft Edge, OS: Windows, URL: http://localhost:3000

## Steps to reproduce

1. Đăng nhập tài khoản người dùng thường (`role = 'user'`).
2. Gửi request `PUT /api/users/me` kèm Token JWT hợp lệ.
3. Truyền Body JSON chứa thuộc tính `role: "admin"` (ví dụ: `{"name": "Test", "phone": "0912345678", "role": "admin"}`).
4. Gửi request `GET /api/users/me` để kiểm tra lại thông tin tài khoản.

## Expected result

- Hệ thống phải từ chối hoặc bỏ qua thuộc tính `role` từ client (tuân theo FR-04: _"Người dùng chỉ có thể cập nhật hồ sơ của chính mình; không thể tự thay đổi thuộc tính role"_ và SEC-06).
- Thuộc tính `role` của tài khoản duy trì là `'user'`.

## Actual result

- Backend xử lý câu lệnh SQL tự động nối trường `role` (`if (role) query += ", role = ?"`), cho phép người dùng thường tự đổi `role` thành `'admin'` thành công trong CSDL.
