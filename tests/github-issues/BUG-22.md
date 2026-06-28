---
name: Bug report
about: Create a report to help us improve
title: '[BUG][FR-20] TC-CART-MOBILE-022 - Sai nhãn Tổng cộng'
labels:
  - bug
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

TC-CART-MOBILE-022

## Requirement liên quan

FR-20

## Severity / Priority

Minor / P2

## Environment

Browser, OS, URL, build/commit

## Steps to reproduce

1. Mở giỏ hàng trên mobile với sản phẩm hợp lệ.
2. Quan sát giá, thành tiền và nhãn tổng.

## Expected result

Tiền tệ hiển thị nhất quán; nhãn phải là "Tổng cộng".

## Actual result

Nhãn hiển thị là "Tổng tạm tính".

## Evidence

tests/test-runs/sprint-1-test-run.md, tests/test-results/cart-mobile-\*/error-context.md
