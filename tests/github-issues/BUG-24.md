---
name: Bug report
about: Create a report to help us improve
title: '[BUG][FR-20] TC-CART-MOBILE-024 - Empty state thiếu hình minh họa'
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

TC-CART-MOBILE-024

## Requirement liên quan

FR-20

## Severity / Priority

Minor / P2

## Environment

Chrome, macOS, http://localhost:8081, 85af3ba875c88283615e22cb108f13e2fccaf0e9

## Steps to reproduce

1. Mở giỏ hàng trống trên mobile.
2. Quan sát khu vực empty state.

## Expected result

Empty state phải có hình minh họa hoặc icon.

## Actual result

Chỉ có text và link, không có hình minh họa.

## Evidence

tests/test-runs/sprint-1-test-run.md, tests/test-results/cart-mobile-\*/error-context.md
