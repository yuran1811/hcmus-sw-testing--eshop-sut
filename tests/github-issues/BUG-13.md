---
name: Bug report
about: Create a report to help us improve
title: '[BUG][FR-17] TC-COUPON-ADMIN-009 - Backend chấp nhận expired_at sai định dạng'
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

TC-COUPON-ADMIN-009

## Requirement liên quan

FR-17

## Severity / Priority

Major / P1

## Environment

Browser, OS, URL, build/commit

## Steps to reproduce

1. Gửi POST /api/admin/coupons với expired_at = 31-12-2099.
2. Kiểm tra status code.

## Expected result

Backend phải từ chối định dạng ngày không hợp lệ.

## Actual result

Backend chấp nhận ngày sai định dạng và trả về 200.

## Evidence

tests/test-runs/sprint-1-test-run.md, tests/test-results/coupon-admin-\*/error-context.md
