---
name: Bug report
about: Create a report to help us improve
title: '[BUG][FR-17] TC-COUPON-ADMIN-011 - Backend chấp nhận max_uses_per_user = 0'
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

TC-COUPON-ADMIN-011

## Requirement liên quan

FR-17

## Severity / Priority

Major / P1

## Environment

Browser, OS, URL, build/commit

## Steps to reproduce

1. Gửi POST /api/admin/coupons với max_uses_per_user = 0.
2. Kiểm tra status code.

## Expected result

Backend phải từ chối giá trị 0.

## Actual result

Backend chấp nhận max_uses_per_user = 0 và trả về 200.

## Evidence

tests/test-runs/sprint-1-test-run.md, tests/test-results/coupon-admin-\*/error-context.md
