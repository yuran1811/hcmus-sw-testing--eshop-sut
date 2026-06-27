---
name: Bug report
about: Create a report to help us improve
title: '[BUG][FR-09] TC-COUPON-012 - SAVE10 đúng ngưỡng tối thiểu vẫn bị từ chối'
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

TC-COUPON-012

## Requirement liên quan

FR-09

## Severity / Priority

Major / P1

## Environment

Browser, OS, URL, build/commit

## Steps to reproduce

1. Áp dụng mã SAVE10 cho đơn hàng có tổng tiền đúng 300,000 ₫.
2. Quan sát phản hồi từ hệ thống.

## Expected result

Đơn hàng bằng đúng ngưỡng tối thiểu phải được chấp nhận.

## Actual result

Hệ thống từ chối do so sánh `>` thay vì `>=`.

## Evidence

tests/test-runs/sprint-1-test-run.md, tests/test-results/coupon-Coupon-FR-09-E2E-Te-70041-in-300-000---được-chấp-nhận-chromium/error-context.md
