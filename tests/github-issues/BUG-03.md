---
name: Bug report
about: Create a report to help us improve
title: '[BUG][FR-06] TC-PRODUCT-DETAIL-007 - Quantity thập phân bị làm tròn sang 1'
labels:
  - bug
  - type:bug
  - status:new
  - priority:P1
  - severity:major
  - module:product
assignees:
  - yuran1811
milestone: hw2
---

## Found by Test Case

TC-PRODUCT-DETAIL-007

## Requirement liên quan

FR-06

## Severity / Priority

Major / P1

## Environment

Browser, OS, URL, build/commit

## Steps to reproduce

1. Mở trang Product Detail.
2. Nhập quantity = 1.5.
3. Bấm "Thêm vào giỏ hàng".

## Expected result

Hệ thống từ chối quantity thập phân.

## Actual result

Quantity 1.5 bị tự chuyển thành 1 và vẫn được thêm vào giỏ.

## Evidence

tests/test-runs/sprint-1-test-run.md, tests/test-results/product-detail-\*/error-context.md
