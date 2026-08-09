---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Quản lý Danh mục][Automation] API chấp nhận thêm mới danh mục với tên chỉ chứa khoảng trắng"
labels: "type: bug, module: category, severity: major, priority: P1, status: new, found-by: automation"
assignees: ""
---

- **Test Cases:** TC-CATEGORY-003
- **Test Script File:** [category-crud.spec.ts](../../../test-runs/automation/scripts/category/tests/category-crud.spec.ts)

## Requirement liên quan

FR-14 (Quản lý Danh mục)

## Environment

Browser: Chromium / Firefox / WebKit, OS: Windows, URL: http://localhost:3000

## Steps to reproduce

1. Gửi request POST đến `http://localhost:3000/api/categories` với payload:
   ```json
   { "name": "   " }
   ```

## Expected result

- API từ chối yêu cầu và phản hồi mã lỗi HTTP 400 Bad Request.

## Actual result

- API chấp nhận yêu cầu và tạo thành công danh mục mới với tên chỉ chứa khoảng trắng, phản hồi mã trạng thái HTTP 200/201.

## Evidence

### 1. HTTP Request/Response Log
```http
POST /api/categories HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer [Admin_Token]

{
  "name": "   "
}

HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 90,
  "name": "   "
}
```

### 2. Playwright Test Assertion Log
```bash
[chromium] › tests\category-crud.spec.ts:75:7 › FR-14 Category CRUD — Equivalence Partitioning › TC-CATEGORY-003: Thêm danh mục thất bại khi tên chỉ chứa khoảng trắng (EC2 → OC2)

Error: expect(received).toBe(expected) // Object.is equality

Expected: 400
Received: 201

  80 |     const resp = await api.createCategory(adminToken, tc.payload);
  81 |     expect(resp.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
> 82 |     expect.soft(resp.status()).toBe(tc.expected_status);
     |                                ^
```

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/238
