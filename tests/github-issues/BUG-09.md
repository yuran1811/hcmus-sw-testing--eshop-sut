---
name: Bug report
about: Create a report to help us improve
title: '[BUG][FR-09] TC-COUPON-008 - API áp dụng coupon không kiểm tra token'
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

TC-COUPON-008

## Requirement liên quan

FR-09

## Severity / Priority

Major / P1

## Environment

Chrome, macOS, http://localhost:5173/checkout, 85af3ba875c88283615e22cb108f13e2fccaf0e9

## Steps to reproduce

1. Gọi API /api/apply-coupon khi chưa đăng nhập.
2. Quan sát phản hồi hệ thống.

## Expected result

Phải trả về lỗi xác thực.

## Actual result

API cho phép khách chưa đăng nhập áp dụng coupon thành công.

## Evidence

tests/test-runs/sprint-1-test-run.md
