---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Quản lý Danh mục][Automation] API chấp nhận thêm mới danh mục khi payload thiếu thuộc tính name"
labels: "type: bug, module: category, severity: major, priority: P1, status: new, found-by: automation"
assignees: ""
---

- **Test Cases:** TC-CATEGORY-012
- **Test Script File:** [category-crud.spec.ts](../../../test-runs/automation/scripts/category/tests/category-crud.spec.ts)

## Requirement liên quan

FR-14 (Quản lý Danh mục)

## Environment

Browser: Chromium / Firefox / WebKit, OS: Windows, URL: http://localhost:3000

## Steps to reproduce

1. Gửi request POST đến `http://localhost:3000/api/categories` với payload trống `{}` (thiếu hoàn toàn thuộc tính `name`).

## Expected result

- API từ chối yêu cầu và phản hồi mã lỗi HTTP 400 Bad Request.

## Actual result

- API chấp nhận yêu cầu và tạo thành công danh mục mới có thuộc tính `name` là null/undefined, trả về HTTP 200/201.

## Evidence

### 1. HTTP Request/Response Log
```http
POST /api/categories HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer [Admin_Token]

{}

HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 92,
  "name": null
}
```

### 2. Playwright Test Assertion Log
```bash
[chromium] › tests\category-crud.spec.ts:240:7 › FR-14 Category CRUD — Equivalence Partitioning › TC-CATEGORY-012: Thêm danh mục thiếu thuộc tính name

Error: expect(received).toBe(expected) // Object.is equality

Expected: 400
Received: 201

  245 |     const resp = await api.createCategory(adminToken, {});
  246 |     expect(resp.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
> 247 |     expect.soft(resp.status()).toBe(tc.expected_status);
      |                                ^
```

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/242
