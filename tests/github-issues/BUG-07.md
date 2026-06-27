---
name: Bug report
about: Create a report to help us improve
title: '[BUG][FR-09] TC-COUPON-002 - BIGBUY bị từ chối ở đúng ngưỡng tối thiểu'
labels:
  - bug
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

TC-COUPON-002

## Requirement liên quan

FR-09

## Severity / Priority

Major / P1

## Environment

Browser, OS, URL, build/commit

## Steps to reproduce

1. Áp dụng mã BIGBUY cho đơn hàng đúng min_order_amount.
2. Kiểm tra phản hồi từ hệ thống.

## Expected result

Đơn hàng bằng đúng ngưỡng tối thiểu phải được chấp nhận.

## Actual result

Hệ thống từ chối do so sánh `>` thay vì `>=`.

## Evidence

tests/test-runs/sprint-1-test-run.md
