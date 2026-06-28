---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Quản lý Danh mục] Thêm thành công danh mục có tên rỗng mà không báo lỗi"
labels: "type: bug, module: category, severity: major, priority: P1, status: new, found-by: test-case"
assignees: ""
---

## Found by Test Case

TC-CATEGORY-002

## Requirement liên quan

FR-14 (Quản lý Danh mục)

## Severity / Priority

Major / P1

## Environment

Browser: Google Chrome / Microsoft Edge, OS: Windows, URL: http://localhost:5173

## Steps to reproduce

1. Đăng nhập vào hệ thống bằng tài khoản Admin.
2. Mở trang Admin → Categories.
3. Để trống trường Name (không nhập gì).
4. Bấm nút Thêm / Submit.

## Expected result

- Hệ thống từ chối yêu cầu (HTTP 400 Bad Request hoặc hiển thị validation error).
- Thông báo lỗi xuất hiện: trường Name là bắt buộc.
- Không có danh mục nào được thêm vào danh sách.

## Actual result

Hệ thống không báo lỗi, tạo thành công một danh mục mới có tên rỗng.

## Evidence

- **TC-CATEGORY-002 (Không báo lỗi, thêm thành công danh mục tên rỗng):**
  ![Evidence](../screenshots/category/TC-CATEGORY-002.png)
