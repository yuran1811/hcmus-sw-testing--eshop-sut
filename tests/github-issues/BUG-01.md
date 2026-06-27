---
name: Bug report
about: Create a report to help us improve
title: '[BUG][FR-06] TC-PRODUCT-DETAIL-001 - Thiếu tên danh mục và sai định dạng giá'
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
2. Quan sát tên danh mục và định dạng giá.

## Expected result

Hiển thị đầy đủ tên danh mục và giá dùng dấu chấm theo chuẩn Việt Nam.

## Actual result

Thiếu tên danh mục của sản phẩm và giá hiển thị bằng dấu phẩy kiểu Anh.

## Evidence

tests/test-runs/sprint-1-test-run.md, tests/test-results/product-detail-\*/error-context.md
