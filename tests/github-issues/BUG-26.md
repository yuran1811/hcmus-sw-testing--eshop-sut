---
name: Bug report
about: Create a report to help us improve
title: '[BUG][FR-09] TC-COUPON-013 - SAVE10 trên ngưỡng tối thiểu bị tính sai công thức giảm giá'
labels:
  - type:bug
  - status:new
  - priority:P1
  - severity:major
  - module:coupon
assignees:
  - yuran1811
milestone: hw2
---

## Found by Test Case

TC-COUPON-013

## Requirement liên quan

FR-09

## Severity / Priority

Major / P1

## Environment

Chrome, macOS, http://localhost:8081, 85af3ba875c88283615e22cb108f13e2fccaf0e9

## Steps to reproduce

1. Áp dụng mã SAVE10 cho đơn hàng có tổng tiền 300,001 ₫.
2. Quan sát số tiền giảm và tổng thanh toán.

## Expected result

Giảm giá phần trăm phải tính đúng theo `discount_value`.

## Actual result

Backend dùng công thức sai và làm tổng hóa đơn tăng vọt.

## Evidence

tests/test-runs/sprint-1-test-run.md, tests/test-results/coupon-Coupon-FR-09-E2E-Te-151e8-ỡng-SAVE10---được-chấp-nhận-chromium/error-context.md
