---
name: Bug report
about: Create a report to help us improve
title: '[BUG][FR-20] TC-CART-MOBILE-014 - Xóa sản phẩm khỏi giỏ không có dialog xác nhận'
labels:
  - type:bug
  - status:new
  - priority:P2
  - severity:minor
  - module:checkout-mobile
assignees:
  - yuran1811
milestone: hw2
---

## Found by Test Case

TC-CART-MOBILE-014

## Requirement liên quan

FR-20

## Severity / Priority

Minor / P2

## Environment

Chrome, macOS, http://localhost:8081, 85af3ba875c88283615e22cb108f13e2fccaf0e9

## Steps to reproduce

1. Mở giỏ hàng trên mobile.
2. Bấm nút "Xóa" của một sản phẩm.

## Expected result

Phải hiển thị dialog xác nhận trước khi xóa.

## Actual result

Sản phẩm biến mất ngay lập tức, không có dialog xác nhận.

## Evidence

tests/test-runs/sprint-1-test-run.md, tests/test-results/cart-mobile-\*/error-context.md
