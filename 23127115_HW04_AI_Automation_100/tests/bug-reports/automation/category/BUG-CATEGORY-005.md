---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Quản lý Danh mục][Automation] Lỗi phân quyền: Tài khoản user thường vẫn có thể xóa danh mục"
labels: "type: bug, module: category, severity: critical, priority: P0, status: new, found-by: automation"
assignees: ""
---

- **Test Cases:** TC-CATEGORY-011
- **Test Script File:** [category-auth.spec.ts](../../../test-runs/automation/scripts/category/tests/category-auth.spec.ts)

## Requirement liên quan

FR-14 (Quản lý Danh mục)

## Environment

Browser: Chromium / Firefox / WebKit, OS: Windows, URL: http://localhost:3000

## Steps to reproduce

1. Đăng nhập tài khoản user thường, lấy token.
2. Gửi request DELETE đến `http://localhost:3000/api/categories/5` kèm theo token của user thường.

## Expected result

- API từ chối và phản hồi mã trạng thái HTTP 403 Forbidden.

## Actual result

- API chấp nhận yêu cầu của user thường, xóa thành công danh mục khỏi database và trả về HTTP 200.

## Evidence

### 1. HTTP Request/Response Log
```http
DELETE /api/categories/5 HTTP/1.1
Host: localhost:3000
Authorization: Bearer [Regular_User_Token]

HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Category deleted successfully"
}
```

### 2. Playwright Test Assertion Log
```bash
[chromium] › tests\category-auth.spec.ts:106:7 › FR-14 Category Authorization — Equivalence Partitioning › TC-CATEGORY-011: Xóa danh mục thất bại khi dùng token user thường (EC5)

Error: expect(received).toBe(expected) // Object.is equality

Expected: 403
Received: 200

  115 |
  116 |     // [Pattern 1] — Forbidden status
> 117 |     expect(resp.status()).toBe(tc.expected_status);
      |                           ^
```

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/241
