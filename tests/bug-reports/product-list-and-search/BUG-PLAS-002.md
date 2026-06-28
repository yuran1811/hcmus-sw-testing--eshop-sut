---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Product List & Search] Hình ảnh sản phẩm thiếu thuộc tính alt mô tả"
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

3. Chạy đoạn script sau để kiểm tra thuộc tính `alt` của tất cả hình ảnh sản phẩm:
   ```javascript
   document.querySelectorAll('img').forEach((img, index) => {
       console.log(`Ảnh số ${index + 1}:`, {
           src: img.src,
           altText: img.getAttribute('alt')
       });
   });
   ```

## Expected result

Thẻ `<img>` hiển thị ảnh sản phẩm phải có thuộc tính `alt` mô tả tên sản phẩm (ví dụ: `alt="iPhone 15 Pro Max"`).

## Actual result

Thẻ `<img>` thuộc tính `alt` bị bỏ trống (`alt=""`).

## Evidence

![Evidence](screenshots/TC-PLAS-001.png)
