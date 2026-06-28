---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Product List & Search] Trang chủ chứa 2 thẻ <h1>"
labels: "type: bug, module: product-list-and-search, severity: minor, priority: P2, status: new, found-by: test-case"
assignees: ""
---


## Found by Test Case

TC-PLAS-001

## Requirement liên quan

FR-05 (Xem danh sách & Tìm kiếm sản phẩm)

## Severity / Priority

Minor / P2

## Environment

Browser: Google Chrome / Microsoft Edge, OS: Windows, URL: http://localhost:5173

## Steps to reproduce

1. Truy cập trang chủ EShop (`http://localhost:5173`).

2. Mở Developer Tools (nhấn F12), chuyển sang tab Console.

3. Chạy lệnh: `document.querySelectorAll('h1').length`.

## Expected result

Chỉ tồn tại đúng 1 thẻ `<h1>` duy nhất trên trang chủ phục vụ chuẩn SEO.

## Actual result

Hệ thống trả về kết quả là 2 (có 2 thẻ `<h1>` tồn tại trên trang).

## Evidence

![Evidence](screenshots/TC-PLAS-001.png)