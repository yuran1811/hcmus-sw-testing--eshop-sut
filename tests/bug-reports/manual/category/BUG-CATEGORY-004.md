---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Quản lý Danh mục] Xóa category nhưng để lại sản phẩm tham chiếu mồ côi"
labels: "type: bug, module: category, severity: critical, priority: P1, status: new, found-by: test-case"
assignees: ""
---

## Found by Test Case

TC-CATEGORY-009

## Requirement liên quan

FR-14 (Quản lý Danh mục)

## Severity / Priority

Critical / P1

## Environment

Browser: Google Chrome / Microsoft Edge, OS: Windows, URL: http://localhost:5174

## Steps to reproduce

1. Đăng nhập vào hệ thống bằng tài khoản Admin.
2. Gửi DELETE request đến `DELETE /api/categories/1` (Danh mục ID = 1 đang chứa các sản phẩm liên kết mặc định trong hệ thống).

## Expected result

- README chưa chốt restrict/cascade/reassign. Hệ thống có thể từ chối `400/409` và giữ nguyên dữ liệu, hoặc xóa thành công theo policy cascade/reassign có tài liệu.
- Sau request không được có product trỏ tới category không tồn tại; thao tác phải nguyên tử, không raw DB error/`500` hoặc partial state.

## Actual result

Hệ thống xóa category thành công nhưng không cascade/reassign các sản phẩm liên kết, khiến chúng trỏ tới category không còn tồn tại. Bug là dangling reference, không phải việc hệ thống chọn delete thay vì restrict.

## Evidence

- **TC-CATEGORY-009 (Xóa thành công danh mục có sản phẩm liên kết):**
  ![Evidence](./screenshots/TC-CATEGORY-009.png)
