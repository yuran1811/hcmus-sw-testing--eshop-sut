---
name: Bug report
about: Create a report to help us improve
title: '[BUG][FR-23] TC-PRODUCT-DETAIL-013 - Thiếu breadcrumb trên trang chi tiết sản phẩm'
labels:
  - bug
  - type:bug
  - status:new
  - priority:P2
  - severity:minor
  - module:product
assignees:
  - yuran1811
milestone: hw2
---

## Found by Test Case

TC-PRODUCT-DETAIL-013

## Requirement liên quan

FR-23

## Severity / Priority

Minor / P2

## Environment

Browser, OS, URL, build/commit

## Steps to reproduce

1. Mở trang /product/:id.
2. Quan sát khu vực điều hướng phía trên.

## Expected result

Hiển thị breadcrumb đầy đủ.

## Actual result

Không có breadcrumb nào trên trang.

## Evidence

tests/test-runs/sprint-1-test-run.md, tests/test-results/product-detail-\*/error-context.md
