---
name: Bug report
about: Create a report to help us improve
title: '[BUG][FR-06] TC-PRODUCT-DETAIL-001 - Thiếu tên danh mục của sản phẩm'
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

TC-PRODUCT-DETAIL-001

## Requirement liên quan

FR-06

## Severity / Priority

Major / P1

## Environment

Browser, OS, URL, build/commit

## Steps to reproduce

1. Mở trang Product Detail với product ID hợp lệ.
2. Quan sát tên danh mục của sản phẩm.

## Expected result

Hiển thị đầy đủ tên danh mục của sản phẩm. Giá hiển thị đúng định dạng tiền tệ của hệ thống; dấu phẩy hoặc dấu chấm đều được chấp nhận làm phân cách hàng nghìn nếu hiển thị nhất quán.

## Actual result

Thiếu tên danh mục của sản phẩm.

## Evidence

tests/test-runs/sprint-1-test-run.md, tests/test-results/product-detail-\*/error-context.md
