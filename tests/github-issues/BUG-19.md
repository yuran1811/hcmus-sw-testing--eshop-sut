---
name: Bug report
about: Create a report to help us improve
title: '[BUG][FR-17] TC-COUPON-ADMIN-025 - Request thiếu field code vẫn được chấp nhận'
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

TC-COUPON-ADMIN-025

## Requirement liên quan

FR-17

## Severity / Priority

Major / P1

## Environment

Browser, OS, URL, build/commit

## Steps to reproduce

1. Gửi POST /api/admin/coupons mà không có field code.
2. Kiểm tra status code.

## Expected result

Thiếu field bắt buộc phải bị từ chối.

## Actual result

Backend vẫn chấp nhận request và trả về 200.

## Evidence

tests/test-runs/sprint-1-test-run.md
