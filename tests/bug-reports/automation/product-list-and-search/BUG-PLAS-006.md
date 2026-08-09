---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Tìm kiếm][Automation] Tìm kiếm từ khóa cực dài (300 ký tự) gây crash backend và lỗi HTTP 500"
labels: "type: bug, module: product-list-and-search, severity: major, priority: P1, status: new, found-by: automation"
assignees: ""
---

- **Test Cases:** TC-PLAS-006
- **Test Script File:** [plas-ep.spec.ts](../../../test-runs/automation/scripts/product-list-and-search/tests/plas-ep.spec.ts)

## Requirement liên quan

FR-05 (Danh sách sản phẩm & Tìm kiếm)

## Environment

Browser: Chromium / Firefox / WebKit, OS: Windows, URL: http://localhost:5173

## Steps to reproduce

1. Mở trang chủ E-Shop.
2. Nhập một chuỗi từ khóa cực dài (300 ký tự trở lên) vào ô tìm kiếm và bấm nút Search.

## Expected result

- Hệ thống xử lý chuỗi bình thường (cắt chuỗi/validate độ dài) và trả về trang báo không tìm thấy sản phẩm một cách an toàn.

## Actual result

- Backend API ném ra ngoại lệ thô (SQLite Error hoặc Memory Buffer Overflow) và phản hồi mã lỗi HTTP 500 Internal Server Error về cho client, làm crash bộ lọc.

## Evidence

### 1. HTTP Request/Response Log
```http
GET /api/products?search=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa HTTP/1.1
Host: localhost:3000

HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "error": "SQLITE_ERROR: String too long or SQLite buffer overflow"
}
```

### 2. Playwright Test Assertion Log
```bash
[chromium] › tests\plas-ep.spec.ts:180:7 › FR-05 Product List & Search › TC-PLAS-006: Tìm kiếm từ khóa cực dài 300 ký tự

Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not 500
Received: 500

  185 |     const response = await page.waitForResponse(r => r.url().includes('/api/products'));
> 186 |     expect(response.status()).not.toBe(500);
      |                               ^
```
