---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Thanh toán][Automation] UI Checkout hiển thị thiếu thông tin sản phẩm"
labels: "type: bug, module: checkout, severity: major, priority: P1, status: new, found-by: automation"
assignees: ""
---

- **Test Cases:** TC-CHECKOUT-011
- **Test Script File:** [checkout-ui.spec.ts](../../../test-runs/automation/scripts/checkout/tests/checkout-ui.spec.ts)

## Requirement liên quan

FR-08 (Thanh toán)

## Environment

Browser: Chromium / Firefox / WebKit, OS: Windows, URL: http://localhost:5173

## Steps to reproduce

1. Thêm sản phẩm vào giỏ hàng và mở trang Checkout.
2. Kiểm tra phần hiển thị thông tin sản phẩm và tổng tiền trong form thanh toán.

## Expected result

- UI phải hiển thị rõ danh sách các sản phẩm đang thanh toán cùng số tiền tương ứng.

## Actual result

- UI hiển thị trống rỗng hoặc hiển thị thiếu thông tin sản phẩm thanh toán.

## Evidence

- **TC-CHECKOUT-011 (Giao diện hiển thị thông tin thanh toán lỗi):**
  ![Evidence](https://raw.githubusercontent.com/yuran1811/hcmus-sw-testing--eshop-sut/hw4/23127115-mqtan/tests/bug-reports/automation/checkout/screenshots/TC-CHECKOUT-011.png)

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/254
