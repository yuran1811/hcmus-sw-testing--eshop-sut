---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Tìm kiếm][Automation] Tìm kiếm từ khóa không tồn tại không hiển thị thông điệp báo trống (Empty State)"
labels: "type: bug, module: product-list-and-search, severity: major, priority: P1, status: new, found-by: automation"
assignees: ""
---

- **Test Cases:** TC-PLAS-003
- **Test Script File:** [plas-ep.spec.ts](../../../test-runs/automation/scripts/product-list-and-search/tests/plas-ep.spec.ts)

## Requirement liên quan

FR-05 (Danh sách sản phẩm & Tìm kiếm)

## Environment

Browser: Chromium / Firefox / WebKit, OS: Windows, URL: http://localhost:5173

## Steps to reproduce

1. Mở trang chủ E-Shop.
2. Nhập từ khóa không tồn tại (ví dụ: `notfoundproduct123`) vào ô tìm kiếm và bấm nút Search.

## Expected result

- Hệ thống hiển thị thông điệp thông báo rõ ràng: "Không tìm thấy sản phẩm nào" hoặc tương đương (Empty State message).

## Actual result

- Hệ thống ẩn toàn bộ sản phẩm nhưng trang web trống trơn, hoàn toàn không hiển thị bất kỳ dòng thông điệp báo trống nào cho người dùng.

## Evidence

### 1. DOM Source Code Log
```html
<!-- DOM Source Code của khu vực danh sách sản phẩm sau khi tìm kiếm từ khóa không tồn tại -->
<div class="product-grid">
  <!-- Trống trơn, không có thẻ p hay div hiển thị thông báo Empty State -->
</div>
```

### 2. Playwright Test Assertion Log
```bash
[chromium] › tests\plas-ep.spec.ts:120:7 › FR-05 Product List & Search › TC-PLAS-003: Tìm kiếm với từ khóa không tồn tại

Error: expect(received).toBeVisible()
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('text=Không tìm thấy sản phẩm nào')

  125 |     const emptyMessage = page.locator('text=Không tìm thấy sản phẩm nào');
> 126 |     await expect(emptyMessage).toBeVisible();
      |                                ^
```

### 3. Screenshot

![Playwright failure screenshot - missing empty state](https://raw.githubusercontent.com/yuran1811/hcmus-sw-testing--eshop-sut/hw4/23127115-mqtan/tests/bug-reports/automation/product-list-and-search/screenshots/BUG-PLAS-004.png)

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/260
