---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Quản lý Danh mục][Automation] API DELETE không validate ID dạng chuỗi/số thực dẫn đến SQLite syntax error"
labels: "type: bug, module: category, severity: major, priority: P1, status: new, found-by: automation"
assignees: ""
---

- **Test Cases:** TC-CATEGORY-019-1, TC-CATEGORY-019-2
- **Test Script File:** [category-crud.spec.ts](../../../test-runs/automation/scripts/category/tests/category-crud.spec.ts)

## Requirement liên quan

FR-14 (Quản lý Danh mục)

## Environment

Browser: Chromium / Firefox / WebKit, OS: Windows, URL: http://localhost:3000

## Steps to reproduce

1. Gửi request DELETE đến `http://localhost:3000/api/categories/abc` hoặc `http://localhost:3000/api/categories/1.5`.

## Expected result

- API validate ID hợp lệ và trả về mã lỗi HTTP 400 Bad Request.

## Actual result

- API truyền trực tiếp chuỗi vào database, ném ra SQLite syntax error và trả về lỗi HTTP 500 Internal Server Error.

## Evidence

### 1. HTTP Request/Response Log
```http
DELETE /api/categories/abc HTTP/1.1
Host: localhost:3000
Authorization: Bearer [Admin_Token]

HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "error": "SQLITE_ERROR: no such column: abc"
}
```

### 2. Playwright Test Assertion Log
```bash
[chromium] › tests\category-crud.spec.ts:317:9 › FR-14 Category CRUD — Equivalence Partitioning › TC-CATEGORY-019-1: DELETE với ID sai cú pháp (abc)

Error: expect(received).toBe(expected) // Object.is equality

Expected: 400
Received: 500

  322 |       const resp = await api.deleteCategory(adminToken, variant.id);
  323 |       expect(resp.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
> 324 |       expect.soft(resp.status()).toBe(variant.expected_status);
      |                                  ^
```
