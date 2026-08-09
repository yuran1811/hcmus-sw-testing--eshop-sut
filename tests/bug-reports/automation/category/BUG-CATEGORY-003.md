---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Quản lý Danh mục][Automation] Báo xóa thành công danh mục không tồn tại thay vì phản hồi lỗi hợp lý"
labels: "type: bug, module: category, severity: minor, priority: P2, status: new, found-by: automation"
assignees: ""
---

- **Test Cases:** TC-CATEGORY-006
- **Test Script File:** [category-crud.spec.ts](../../../test-runs/automation/scripts/category/tests/category-crud.spec.ts)

## Requirement liên quan

FR-14 (Quản lý Danh mục)

## Environment

Browser: Chromium / Firefox / WebKit, OS: Windows, URL: http://localhost:3000

## Steps to reproduce

1. Gửi request DELETE đến `http://localhost:3000/api/categories/999999` (ID chắc chắn không tồn tại trong database).

## Expected result

- Hệ thống nên phản hồi mã trạng thái HTTP 404 Not Found để thông báo danh mục không tồn tại.

## Actual result

- Hệ thống phản hồi mã trạng thái HTTP 200 OK với thông điệp báo xóa thành công.

## Evidence

### 1. HTTP Request/Response Log
```http
DELETE /api/categories/999999 HTTP/1.1
Host: localhost:3000
Authorization: Bearer [Admin_Token]

HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Category deleted successfully"
}
```

### 2. Playwright Test Assertion Log
```bash
[chromium] › tests\category-crud.spec.ts:130:7 › FR-14 Category CRUD — Equivalence Partitioning › TC-CATEGORY-006: Xóa danh mục không tồn tại

Error: expect(received).toBe(expected) // Object.is equality

Expected: 404
Received: 200

  135 |     const resp = await api.deleteCategory(adminToken, 999999);
  136 |     expect(resp.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
> 137 |     expect.soft(resp.status()).toBe(tc.expected_status);
      |                                ^
```

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/239
