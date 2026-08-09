---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Quản lý Danh mục][Automation] API DELETE không validate ID nằm ngoài biên (0, -1) dẫn đến SQLite error"
labels: "type: bug, module: category, severity: major, priority: P1, status: new, found-by: automation"
assignees: ""
---

- **Test Cases:** TC-CATEGORY-BVA-003
- **Test Script File:** [category-bva.spec.ts](../../../test-runs/automation/scripts/category/tests/category-bva.spec.ts)

## Requirement liên quan

FR-14 (Quản lý Danh mục)

## Environment

Browser: Chromium / Firefox / WebKit, OS: Windows, URL: http://localhost:3000

## Steps to reproduce

1. Gửi request DELETE đến `http://localhost:3000/api/categories/0` hoặc `http://localhost:3000/api/categories/-1`.

## Expected result

- API validate ID và phản hồi mã trạng thái HTTP 400 Bad Request hoặc 404 Not Found.

## Actual result

- Hệ thống chuyển truy vấn trực tiếp vào database, ném ra ngoại lệ thô của SQLite và phản hồi HTTP 500.

## Evidence

### 1. HTTP Request/Response Log
```http
DELETE /api/categories/0 HTTP/1.1
Host: localhost:3000
Authorization: Bearer [Admin_Token]

HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "error": "SQLITE_RANGE_ERROR: Invalid ID value 0"
}
```

### 2. Playwright Test Assertion Log
```bash
[chromium] › tests\category-bva.spec.ts:180:7 › FR-14 Category BVA › TC-CATEGORY-BVA-003: DELETE với ID dưới mốc tham chiếu (0)

Error: expect(received).toBe(expected) // Object.is equality

Expected: 400
Received: 500

  185 |     const resp = await api.deleteCategory(adminToken, 0);
  186 |     expect(resp.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
> 187 |     expect.soft(resp.status()).toBe(tc.expected_status);
      |                                ^
```
