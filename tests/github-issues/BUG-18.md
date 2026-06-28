---
name: Bug report
about: Create a report to help us improve
title: '[BUG][FR-17] TC-COUPON-ADMIN-017 - Non-admin vẫn tạo coupon thành công'
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

TC-COUPON-ADMIN-017

## Requirement liên quan

FR-17

## Severity / Priority

Major / P1

## Environment

Chrome, macOS, http://localhost:5174, 85af3ba875c88283615e22cb108f13e2fccaf0e9

## Steps to reproduce

1. Đăng nhập bằng tài khoản role user.
2. Gửi POST /api/admin/coupons.

## Expected result

Non-admin phải nhận 403 Forbidden.

## Actual result

Middleware phân quyền thiếu và request vẫn trả về 200.

## Evidence

tests/test-runs/sprint-1-test-run.md, tests/test-results/coupon-admin-\*/error-context.md
