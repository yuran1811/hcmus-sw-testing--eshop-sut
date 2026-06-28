---
name: Bug report
about: Create a report to help us improve
title: '[BUG][FR-20] TC-CART-MOBILE-023 - Navbar badge đếm số dòng thay vì tổng số lượng'
labels:
  - type:bug
  - status:new
  - priority:P1
  - severity:major
  - module:checkout-mobile
assignees:
  - yuran1811
milestone: hw2
---

## Found by Test Case

TC-CART-MOBILE-023

## Requirement liên quan

FR-20

## Severity / Priority

Major / P1

## Environment

Chrome, macOS, http://localhost:8081, 85af3ba875c88283615e22cb108f13e2fccaf0e9

## Steps to reproduce

1. Thêm 1 sản phẩm với quantity = 2.
2. Thêm thêm sản phẩm khác quantity = 1.
3. Quan sát badge navbar.

## Expected result

Badge phải hiển thị tổng quantity của các item.

## Actual result

Badge đếm theo số dòng sản phẩm thay vì tổng số lượng.

## Evidence

tests/test-runs/sprint-1-test-run.md, tests/test-results/cart-mobile-\*/error-context.md
