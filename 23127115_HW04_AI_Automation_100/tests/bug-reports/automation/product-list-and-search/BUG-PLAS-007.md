---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Tìm kiếm][Automation] Tìm kiếm từ khóa ở biên trên (255/256 ký tự) gây lỗi SQLite Error"
labels: "type: bug, module: product-list-and-search, severity: major, priority: P1, status: new, found-by: automation"
assignees: ""
---

- **Test Cases:** TC-PLAS-BVA-002, TC-PLAS-BVA-003, TC-PLAS-BVA-008
- **Test Script File:** [plas-bva.spec.ts](../../../test-runs/automation/scripts/product-list-and-search/tests/plas-bva.spec.ts)

## Requirement liên quan

FR-05 (Danh sách sản phẩm & Tìm kiếm)

## Environment

Browser: Chromium / Firefox / WebKit, OS: Windows, URL: http://localhost:5173

## Steps to reproduce

1. Mở trang chủ E-Shop.
2. Nhập một chuỗi từ khóa ở mốc biên 254, 255, hoặc 256 ký tự vào ô tìm kiếm và bấm nút Search.

## Expected result

- Hệ thống xử lý chuỗi bình thường và trả về trang báo không tìm thấy sản phẩm một cách an toàn.

## Actual result

- Backend API ném ra ngoại lệ thô (SQLite Error) và phản hồi mã lỗi HTTP 500 Internal Server Error về cho client, làm crash bộ lọc.

## Evidence

### 1. HTTP Request/Response Log
```http
GET /api/products?search=[255_Characters_Long_String] HTTP/1.1
Host: localhost:3000

HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "error": "SQLITE_ERROR: expression tree is too large"
}
```

### 2. Playwright Test Assertion Log
```bash
[chromium] › tests\plas-bva.spec.ts:110:7 › FR-05 Product List & Search BVA › TC-PLAS-BVA-002: Tìm kiếm từ khóa mốc 255 ký tự

Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not 500
Received: 500

  115 |     const response = await page.waitForResponse(r => r.url().includes('/api/products'));
> 116 |     expect(response.status()).not.toBe(500);
      |                               ^
```

### 3. Screenshot

![Playwright failure screenshot - boundary keyword causes HTTP 500](https://raw.githubusercontent.com/yuran1811/hcmus-sw-testing--eshop-sut/hw4/23127115-mqtan/tests/bug-reports/automation/product-list-and-search/screenshots/BUG-PLAS-007.png)

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/263
