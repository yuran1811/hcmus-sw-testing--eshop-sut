---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Quản lý Danh mục][Automation] API chấp nhận thêm mới danh mục khi name sai kiểu dữ liệu (null, number, boolean, array, object)"
labels: "type: bug, module: category, severity: major, priority: P1, status: new, found-by: automation"
assignees: ""
---

- **Test Cases:** TC-CATEGORY-013-1, TC-CATEGORY-013-2, TC-CATEGORY-013-3, TC-CATEGORY-013-4, TC-CATEGORY-013-5
- **Test Script File:** [category-crud.spec.ts](../../../test-runs/automation/scripts/category/tests/category-crud.spec.ts)

## Requirement liên quan

FR-14 (Quản lý Danh mục)

## Environment

Browser: Chromium / Firefox / WebKit, OS: Windows, URL: http://localhost:3000

## Steps to reproduce

1. Gửi request POST đến `http://localhost:3000/api/categories` với thuộc tính `name` là các kiểu dữ liệu không phải string (null, number, boolean, array, object).

## Expected result

- API từ chối và phản hồi mã trạng thái HTTP 400 Bad Request.

## Actual result

- API chấp nhận yêu cầu và tạo thành công danh mục trong database, phản hồi mã trạng thái HTTP 200/201.

## Evidence

### 1. HTTP Request/Response Log
```http
POST /api/categories HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer [Admin_Token]

{
  "name": 123
}

HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 93,
  "name": 123
}
```

### 2. Playwright Test Assertion Log
```bash
[chromium] › tests\category-crud.spec.ts:265:9 › FR-14 Category CRUD — Equivalence Partitioning › TC-CATEGORY-013-2: name là number

Error: expect(received).toBe(expected) // Object.is equality

Expected: 400
Received: 201

  270 |       const resp = await api.createCategory(adminToken, variant.payload);
  271 |       expect(resp.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
> 272 |       expect.soft(resp.status()).toBe(variant.expected_status);
      |                                  ^
```
