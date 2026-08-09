---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Tìm kiếm][Automation] Ảnh sản phẩm không có thuộc tính alt hoặc alt bị bỏ trống"
labels: "type: bug, module: product-list-and-search, severity: cosmetic, priority: P3, status: new, found-by: automation"
assignees: ""
---

- **Test Cases:** TC-PLAS-007
- **Test Script File:** [plas-ui.spec.ts](../../../test-runs/automation/scripts/product-list-and-search/tests/plas-ui.spec.ts)

## Requirement liên quan

FR-05 (Danh sách sản phẩm & Tìm kiếm)

## Environment

Browser: Chromium / Firefox / WebKit, OS: Windows, URL: http://localhost:5173

## Steps to reproduce

1. Mở trang chủ E-Shop tại `http://localhost:5173`.
2. Kiểm tra phần tử thẻ ảnh `<img>` của các sản phẩm.

## Expected result

- Mỗi ảnh sản phẩm phải có thuộc tính `alt` mô tả tên sản phẩm (không được để trống) để tuân thủ tiêu chuẩn SEO và khả năng tiếp cận (Accessibility).

## Actual result

- Các thẻ `<img>` hoàn toàn thiếu thuộc tính `alt` hoặc để trống `alt=""`.

## Evidence

- **TC-PLAS-007 (Kiểm tra ảnh thiếu alt):**
  ![Evidence](./screenshots/TC-PLAS-007.png)
