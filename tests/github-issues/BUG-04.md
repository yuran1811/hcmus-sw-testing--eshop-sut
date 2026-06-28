---
name: Bug report
about: Create a report to help us improve
title: '[BUG][FR-08] TC-PRODUCT-DETAIL-012 - Khách chưa đăng nhập vẫn thêm được vào giỏ'
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

TC-PRODUCT-DETAIL-012

## Requirement liên quan

FR-08

## Severity / Priority

Major / P1

## Environment

Chrome, macOS, http://localhost:5173/product/1, 85af3ba875c88283615e22cb108f13e2fccaf0e9

## Steps to reproduce

1. Mở trang Product Detail khi chưa đăng nhập.
2. Nhập quantity hợp lệ.
3. Bấm "Thêm vào giỏ hàng".

## Expected result

Phải yêu cầu đăng nhập hoặc chuyển hướng sang màn hình đăng nhập.

## Actual result

Khách vãng lai vẫn thêm sản phẩm vào giỏ thành công.

## Evidence

tests/test-runs/sprint-1-test-run.md, tests/test-results/product-detail-\*/error-context.md
