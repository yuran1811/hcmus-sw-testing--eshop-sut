---
name: Bug report
about: Create a report to help us improve
title: '[BUG][FR-20] TC-CART-MOBILE-008/011/020/021 - Sửa quantity làm badge giỏ và số lượng bị đếm sai'
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

TC-CART-MOBILE-008, TC-CART-MOBILE-011, TC-CART-MOBILE-020, TC-CART-MOBILE-021

## Requirement liên quan

FR-20

## Severity / Priority

Major / P1

## Environment

Chrome, macOS, http://localhost:8081, 85af3ba875c88283615e22cb108f13e2fccaf0e9

## Steps to reproduce

1. Thêm sản phẩm vào giỏ trên mobile.
2. Sửa quantity trực tiếp trong giỏ ở các giá trị 1, 2 và giá trị hợp lệ khác.
3. Quan sát badge navbar và số lượng trong giỏ.

## Expected result

Badge và quantity phải phản ánh đúng tổng số lượng sản phẩm.

## Actual result

Hệ thống đếm sai số lượng sau khi sửa trực tiếp.

## Evidence

tests/test-runs/sprint-1-test-run.md, tests/test-results/cart-mobile-\*/error-context.md
