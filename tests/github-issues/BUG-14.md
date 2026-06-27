---
name: Bug report
about: Create a report to help us improve
title: '[BUG][FR-17] TC-COUPON-ADMIN-010 - Backend chấp nhận min_order_amount âm'
labels:
  - bug
  - type:bug
  - status:new
  - priority:P1
  - severity:major
  - module:admin
assignees:
  - yuran1811
milestone: hw2
---

## Found by Test Case

TC-COUPON-ADMIN-010

## Requirement liên quan

FR-17

## Severity / Priority

Major / P1

## Environment

Browser, OS, URL, build/commit

## Steps to reproduce

1. Gửi POST /api/admin/coupons với min_order_amount = -1.
2. Kiểm tra status code.

## Expected result

Backend phải từ chối giá trị âm.

## Actual result

Backend chấp nhận min_order_amount âm và trả về 200.

## Evidence

tests/test-runs/sprint-1-test-run.md, tests/test-results/coupon-admin-\*/error-context.md
