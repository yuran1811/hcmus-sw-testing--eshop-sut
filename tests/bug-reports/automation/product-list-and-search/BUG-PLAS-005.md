---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Tìm kiếm][Automation] Lỗ hổng bảo mật SQL Injection trên thanh tìm kiếm sản phẩm"
labels: "type: bug, module: product-list-and-search, severity: critical, priority: P0, status: new, found-by: automation"
assignees: ""
---

- **Test Cases:** TC-PLAS-BVA-004
- **Test Script File(s):**
  * [plas-bva.spec.ts](../../../test-runs/automation/scripts/product-list-and-search/tests/plas-bva.spec.ts) (cho TC-PLAS-BVA-004)

## Requirement liên quan

FR-05 (Danh sách sản phẩm & Tìm kiếm)

## Environment

Browser: Chromium / Firefox / WebKit, OS: Windows, URL: http://localhost:5173

## Steps to reproduce

1. Mở trang chủ E-Shop.
2. Nhập payload SQL Injection (ví dụ: `' OR '1'='1`) vào ô tìm kiếm và bấm nút Search.

## Expected result

- Hệ thống xử lý an toàn từ khóa tìm kiếm (parameterized query hoặc escaping), trả về danh sách rỗng (hoặc báo không tìm thấy) vì không có sản phẩm nào tên là `' OR '1'='1`.

## Actual result

- Hệ thống chèn trực tiếp chuỗi tìm kiếm vào câu lệnh SQL của Database, dẫn đến việc thực thi câu lệnh SQL tiêm nhiễm và trả về toàn bộ danh sách sản phẩm trong database (bỏ qua điều kiện tìm kiếm ban đầu).

## Evidence

### 1. HTTP Request/Response Log
```http
GET /api/products?search=%27+OR+%271%27%3D%271 HTTP/1.1
Host: localhost:3000

HTTP/1.1 200 OK
Content-Type: application/json

[
  { "id": 1, "name": "iPhone 15 Pro", "price": 30000000 },
  { "id": 2, "name": "Samsung Galaxy S23", "price": 20000000 }
]
```

### 2. Playwright Test Assertion Log
```bash
[chromium] › tests\plas-bva.spec.ts:87:7 › FR-05 Product List & Search — BVA › TC-PLAS-BVA-004: Tìm kiếm bằng ký tự đặc biệt SQL Injection (' OR '1'='1)

Error: expect(received).toBe(expected) // Object.is equality

Expected: 0
Received: 14 (Trả về toàn bộ số lượng sản phẩm trong database)

  325 |     const products = page.locator('.product-card');
> 326 |     await expect(products).toHaveCount(0);
      |                            ^
```

### 3. Screenshot

![Playwright failure screenshot - SQL injection search returns products](https://raw.githubusercontent.com/yuran1811/hcmus-sw-testing--eshop-sut/hw4/23127115-mqtan/tests/bug-reports/automation/product-list-and-search/screenshots/BUG-PLAS-005.png)

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/261
