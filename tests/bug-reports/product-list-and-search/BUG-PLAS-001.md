---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Product List & Search] Trang chủ chứa 2 thẻ <h1>"
labels: "type: bug, module: product-list-and-search, severity: minor, priority: P2, status: new, found-by: test-case"
assignees: ""
---


## Found by Test Case

TC-PLAS-001, TC-PLAS-002, TC-PLAS-004, TC-PLAS-005, TC-PLAS-006, TC-PLAS-007, TC-PLAS-BVA-001, TC-PLAS-BVA-005

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

Hệ thống trả về kết quả là 2 hoặc 3 (có nhiều thẻ `<h1>` tồn tại trên trang).

## Evidence

- **TC-PLAS-001 (Xem danh sách):**
  ![Evidence 1](../screenshots/TC-PLAS-001.png)
- **TC-PLAS-002 (Tìm kiếm):**
  ![Evidence 2](../screenshots/TC-PLAS-002.png)
- **TC-PLAS-004 (Tìm kiếm có dấu):**
  ![Evidence 3](../screenshots/TC-PLAS-004.png)
- **TC-PLAS-005 (Tìm kiếm ký tự đặc biệt):**
  ![Evidence 4](../screenshots/TC-PLAS-005a.png)
- **TC-PLAS-006 (Trễ tải mạng - 2 thẻ h1):**
  ![Evidence 5](../screenshots/TC-PLAS-006b.png)
- **TC-PLAS-007 (Cấu trúc H1 trang chủ):**
  ![Evidence 6](../screenshots/TC-PLAS-007.png)
- **TC-PLAS-BVA-001 (Tìm kiếm 1 ký tự):**
  ![Evidence 7](../screenshots/TC-PLAS-BVA-001.png)
- **TC-PLAS-BVA-005 (Database chỉ có 1 sản phẩm):**
  ![Evidence 8](../screenshots/TC-PLAS-BVA-005b.png)