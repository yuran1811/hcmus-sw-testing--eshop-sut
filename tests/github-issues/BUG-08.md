---
name: Bug report
about: Create a report to help us improve
title: '[BUG][FR-09/FR-21] TC-COUPON-006/007/010/014/015/016 - Sai định dạng tiền tệ và phân cách hàng nghìn'
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

Minor / P2

## Environment

Browser, OS, URL, build/commit

## Steps to reproduce

1. Áp dụng các coupon có liên quan tới ngưỡng và hiển thị tiền.
2. Quan sát format số tiền giảm / tổng thanh toán / thông báo lỗi.

## Expected result

Số tiền phải dùng dấu chấm phân cách hàng nghìn theo chuẩn Việt Nam.

## Actual result

Nhiều màn hình đang hiển thị dấu phẩy kiểu Anh thay vì dấu chấm.

## Evidence

tests/test-runs/sprint-1-test-run.md
