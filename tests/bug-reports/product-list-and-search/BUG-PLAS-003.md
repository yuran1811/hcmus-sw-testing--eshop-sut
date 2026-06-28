---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Product List & Search] Giá sản phẩm hiển thị đơn vị VND thay vì ký hiệu ₫"
labels: "type: bug, module: product-list-and-search, severity: major, priority: P1, status: new, found-by: test-case"
assignees: ""
---


## Found by Test Case

TC-PLAS-001, TC-PLAS-002, TC-PLAS-004, TC-PLAS-BVA-001, TC-PLAS-BVA-005

## Requirement liên quan

FR-05 (Xem danh sách & Tìm kiếm sản phẩm)

## Severity / Priority

Major / P1

## Environment

Browser: Google Chrome / Microsoft Edge, OS: Windows, URL: http://localhost:5173

## Steps to reproduce

1. Truy cập trang chủ EShop (`http://localhost:5173`).

2. Quan sát lưới hiển thị các sản phẩm trên màn hình.

## Expected result

Giá sản phẩm hiển thị có định dạng phân cách hàng nghìn và ký hiệu `₫` ở cuối (Ví dụ: `30.000.000 ₫`).

## Actual result

Giá sản phẩm hiển thị đơn vị là `VND` (Ví dụ: `30.000.000 VND`).

## Evidence

- **TC-PLAS-001 (Xem danh sách):**
  ![Evidence 1](../screenshots/TC-PLAS-001.png)
- **TC-PLAS-002 (Tìm kiếm):**
  ![Evidence 2](../screenshots/TC-PLAS-002.png)
- **TC-PLAS-004 (Tìm kiếm có dấu):**
  ![Evidence 3](../screenshots/TC-PLAS-004.png)
- **TC-PLAS-BVA-001 (Tìm kiếm 1 ký tự):**
  ![Evidence 4](../screenshots/TC-PLAS-BVA-001.png)
- **TC-PLAS-BVA-005 (Database chỉ có 1 sản phẩm):**
  ![Evidence 5](../screenshots/TC-PLAS-BVA-005b.png)
