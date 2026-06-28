---
name: Bug report
about: Create a report to help us improve
title: '[NOTE][FR-09/FR-21] TC-COUPON-006/007/010/014/015/016 - Định dạng tiền tệ chấp nhận dấu phẩy hoặc dấu chấm'
labels:
  - bug
  - type:bug
  - status:new
  - priority:P2
  - severity:minor
  - module:coupon
assignees:
  - yuran1811
milestone: hw2
---

## Found by Test Case

TC-COUPON-006, TC-COUPON-007, TC-COUPON-010, TC-COUPON-014, TC-COUPON-015, TC-COUPON-016

## Requirement liên quan

FR-09, FR-21

## Severity / Priority

Info / P4

## Environment

Browser, OS, URL, build/commit

## Steps to reproduce

1. Áp dụng các coupon có liên quan tới ngưỡng và hiển thị tiền.
2. Quan sát format số tiền giảm / tổng thanh toán / thông báo lỗi.

## Expected result

Số tiền hiển thị nhất quán; dấu phẩy hoặc dấu chấm đều được chấp nhận nếu hệ thống dùng cùng một kiểu xuyên suốt.

## Actual result

Các màn hình hiển thị nhất quán theo một kiểu phân cách hàng nghìn.

## Evidence

tests/test-runs/sprint-1-test-run.md
