---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Home] Giá sản phẩm không dùng ký hiệu đồng nhất"
assignees: ""
---

## Found by Test Case

HOME-GUI-IA01-010

## Requirement liên quan

FR-05, FR-21

## Severity / Priority

Minor / P3

## Environment

Browser: Google Chrome / Microsoft Edge, OS: Windows, URL: `http://localhost:5173`

## Steps to reproduce

1. Mở trang Home.
2. Quan sát giá của một product card bất kỳ.
3. Kiểm tra định dạng tiền tệ đang hiển thị.

## Expected result

Giá sản phẩm phải hiển thị thống nhất với ký hiệu `₫` và dấu phân cách hàng
nghìn.

## Actual result

Giá sản phẩm đang hiển thị theo dạng `VND`, không khớp với ký hiệu tiền tệ yêu
cầu.

## Console / Repro

```text
document.querySelector('main .grid .text-red-500')?.textContent
```

## Evidence

- ![Evidence 1](BUG-HOME-GUI-IA01-010_01.png)
