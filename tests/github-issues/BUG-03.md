---
name: Bug report
about: Create a report to help us improve
title: '[BUG][FR-06] TC-PRODUCT-DETAIL-005/006/007/008/009 - Quantity không hợp lệ vẫn được thêm vào giỏ'
labels:
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

TC-PRODUCT-DETAIL-005 / TC-PRODUCT-DETAIL-006 / TC-PRODUCT-DETAIL-007 / TC-PRODUCT-DETAIL-008 / TC-PRODUCT-DETAIL-009

## Requirement liên quan

FR-06

## Severity / Priority

Major / P1

## Environment

Chrome, macOS, http://localhost:5173/product/1, 85af3ba875c88283615e22cb108f13e2fccaf0e9

## Steps to reproduce

1. Mở trang Product Detail.
2. Nhập quantity không hợp lệ, ví dụ: `0`, `-1`, `1.5`, `""`, `e`, `,`, `.` hoặc các giá trị tương tự.
3. Bấm "Thêm vào giỏ hàng".

## Expected result

Hệ thống từ chối quantity <= 0, quantity rỗng và các giá trị không phải số, hiển thị lỗi phù hợp.

## Actual result

Quantity không hợp lệ vẫn được chấp nhận và thêm sản phẩm vào giỏ hàng thay vì bị từ chối, bao gồm cả input rỗng.

## Evidence

tests/test-runs/sprint-1-test-run.md, tests/test-results/product-detail-\*/error-context.md
