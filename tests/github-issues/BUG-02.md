---
name: Bug report
about: Create a report to help us improve
title: '[BUG][FR-06] TC-PRODUCT-DETAIL-004 - Double-click mới thêm được và thiếu badge giỏ hàng'
labels:
  - type:bug
  - status:new
  - priority:P1
  - severity:major
  - module:product
assignees:
  - yuran1811
milestone: hw2
---

## Found by Test Case

TC-PRODUCT-DETAIL-004

## Requirement liên quan

FR-06

## Severity / Priority

Major / P1

## Environment

Chrome, macOS, http://localhost:5173/product/1, 85af3ba875c88283615e22cb108f13e2fccaf0e9

## Steps to reproduce

1. Mở trang Product Detail.
2. Nhập quantity hợp lệ.
3. Bấm "Thêm vào giỏ hàng" một lần.

## Expected result

Sản phẩm được thêm ngay và navbar có badge số lượng.

## Actual result

Phải bấm 2 lần mới thêm được và navbar không có badge số lượng.

## Evidence

tests/test-runs/sprint-1-test-run.md, tests/test-results/product-detail-\*/error-context.md
