---
name: Bug report
about: Create a report to help us improve
title: '[BUG][FR-17] TC-COUPON-ADMIN-014 - Xóa coupon không tồn tại vẫn trả 200'
labels:
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

TC-COUPON-ADMIN-014

## Requirement liên quan

FR-17

## Severity / Priority

Major / P1

## Environment

Chrome, macOS, http://localhost:5174, 85af3ba875c88283615e22cb108f13e2fccaf0e9

## Steps to reproduce

1. Gửi DELETE /api/admin/coupons/999999.
2. Kiểm tra status code.

## Expected result

Phải trả về 4xx khi coupon không tồn tại.

## Actual result

API trả về 200 thay vì 404/4xx.

## Evidence

tests/test-runs/sprint-1-test-run.md
