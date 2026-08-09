---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Tìm kiếm][Automation] Vi phạm tiêu chuẩn SEO: Trang web tồn tại nhiều hơn một thẻ h1"
labels: "type: bug, module: product-list-and-search, severity: cosmetic, priority: P3, status: new, found-by: automation"
assignees: ""
---

- **Test Cases:** TC-PLAS-001, TC-PLAS-002, TC-PLAS-004, TC-PLAS-005, TC-PLAS-BVA-001, TC-PLAS-BVA-005
- **Test Script Files:**
  * [plas-ep.spec.ts](../../../test-runs/automation/scripts/product-list-and-search/tests/plas-ep.spec.ts) (cho TC-PLAS-001, 002, 004, 005)
  * [plas-bva.spec.ts](../../../test-runs/automation/scripts/product-list-and-search/tests/plas-bva.spec.ts) (cho TC-PLAS-BVA-001, TC-PLAS-BVA-005)

## Requirement liên quan

FR-05 (Danh sách sản phẩm & Tìm kiếm)

## Environment

Browser: Chromium / Firefox / WebKit, OS: Windows, URL: http://localhost:5173

## Steps to reproduce

1. Mở trang chủ E-Shop tại `http://localhost:5173`.
2. Kiểm tra cấu trúc DOM để đếm số lượng thẻ `<h1>` có mặt trên trang.

## Expected result

- Trang web chỉ được có duy nhất **một** thẻ `<h1>` đại diện cho tiêu đề chính của trang để đáp ứng tiêu chuẩn tối ưu hóa công cụ tìm kiếm (SEO).

## Actual result

- Hệ thống hiển thị nhiều thẻ `<h1>` (tiêu đề logo và tiêu đề danh sách sản phẩm cùng dùng chung thẻ `<h1>`), tổng số lượng thẻ `<h1>` lớn hơn 1.

## Evidence

*(Lỗi cấu trúc SEO DOM, phát hiện qua kiểm thử tự động của Playwright).*
