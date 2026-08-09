---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Quản lý Danh mục][Automation] Lỗi phân quyền: Tài khoản user thường vẫn có thể thêm mới danh mục"
labels: "type: bug, module: category, severity: critical, priority: P0, status: new, found-by: automation"
assignees: ""
---

- **Test Cases:** TC-CATEGORY-008
- **Test Script File:** [category-auth.spec.ts](../../../test-runs/automation/scripts/category/tests/category-auth.spec.ts)

## Requirement liên quan

FR-14 (Quản lý Danh mục)

## Environment

Browser: Chromium / Firefox / WebKit, OS: Windows, URL: http://localhost:3000

## Steps to reproduce

1. Đăng nhập tài khoản user thường, lấy token.
2. Gửi request POST đến `http://localhost:3000/api/categories` kèm theo token của user thường.

## Expected result

- API từ chối và phản hồi mã trạng thái HTTP 403 Forbidden.

## Actual result

- API chấp nhận yêu cầu của user thường, thêm thành công danh mục mới và trả về HTTP 200/201.

## Evidence

### 1. HTTP Request/Response Log
```http
POST /api/categories HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer [Regular_User_Token]

{
  "name": "Bypass Category"
}

HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 91,
  "name": "Bypass Category"
}
```

### 2. Playwright Test Assertion Log
```bash
[chromium] › tests\category-auth.spec.ts:60:7 › FR-14 Category Authorization — Equivalence Partitioning › TC-CATEGORY-008: Thêm danh mục thất bại khi dùng token user thường (EC5 → OC6)

Error: expect(received).toBe(expected) // Object.is equality

Expected: 403
Received: 200

  67 |
  68 |     // [Pattern 1] — Forbidden status
> 69 |     expect(resp.status()).toBe(tc.expected_status);
     |                           ^
```
