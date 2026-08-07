---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Quản lý Danh mục] Báo xóa thành công record không tồn tại thay vì phản hồi missing/idempotent trung thực"
labels: "type: bug, module: category, severity: minor, priority: P2, status: new, found-by: test-case"
assignees: ""
---

## Found by Test Case

TC-CATEGORY-006

## Requirement liên quan

FR-14 (Quản lý Danh mục)

## Severity / Priority

Minor / P2

## Environment

Browser: Google Chrome / Microsoft Edge, OS: Windows, URL: http://localhost:5174

## Steps to reproduce

1. Đăng nhập vào hệ thống bằng tài khoản Admin.
2. Gửi DELETE request đến `DELETE /api/categories/99999` (ID 99999 là ID không tồn tại).

## Expected result

- FR-14 không chốt status code. Hệ thống có thể trả `404/410`, hoặc `200/204` idempotent nếu contract có tài liệu.
- Trong mọi trường hợp không được tuyên bố sai rằng một record vừa bị xóa; affected/deleted count phải là `0` nếu được trả về và dữ liệu không thay đổi.

## Actual result

Hệ thống trả thành công và thông báo như thể đã xóa category, dù ID không tồn tại. Bug nằm ở false-success semantics, không nằm riêng ở việc status khác `404`.

## Evidence

- **TC-CATEGORY-006 (Phản hồi false-success khi xóa ID không tồn tại):**
  ![Evidence](./screenshots/TC-CATEGORY-006.png)
