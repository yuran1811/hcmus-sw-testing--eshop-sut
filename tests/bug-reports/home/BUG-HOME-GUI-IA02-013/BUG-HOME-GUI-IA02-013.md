---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Home] Placeholder ô tìm kiếm chưa đủ rõ"
assignees: ""
---

## Found by Test Case

HOME-GUI-IA02-013

## Requirement liên quan

FR-05, FR-21

## Severity / Priority

Minor / P3

## Environment

Browser: Google Chrome / Microsoft Edge, OS: Windows, URL: `http://localhost:5173`

## Steps to reproduce

1. Mở trang Home.
2. Quan sát ô tìm kiếm ở đầu trang.
3. Đọc placeholder hiện tại.

## Expected result

Placeholder phải mô tả rõ hành động, ví dụ `Tìm kiếm sản phẩm...`.

## Actual result

Placeholder chỉ là `Tìm kiếm...`, chưa nói rõ người dùng đang tìm gì.

## Console / Repro

```text
document.querySelector('input[type="text"]')?.placeholder
```

## Evidence

- ![Evidence 1](BUG-HOME-GUI-IA02-013_01.png)
