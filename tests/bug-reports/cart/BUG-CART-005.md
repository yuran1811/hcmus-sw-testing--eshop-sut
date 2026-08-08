# BUG-CART-005: Sai nhãn chữ trong bảng giỏ hàng ("Giá" thay vì "Đơn giá", "Tổng tạm tính" thay vì "Tổng cộng")

## Found by Test Case

TC-CART-001, TC-CART-006

## Requirement liên quan

FR-07 (Giỏ hàng — bảng phải có cột "Đơn giá"; nhãn tổng tiền phải là "Tổng cộng")

## Severity / Priority

Minor / P3

## Environment

- Browser: Chromium, Firefox, WebKit — tái hiện trên cả 3
- OS: Windows 11
- URL: http://localhost:5173/cart
- Build: nhánh `hw04/23127211`, commit `3d2a86d`

## Steps to reproduce

1. Đăng nhập, thêm sản phẩm vào giỏ, mở trang Giỏ hàng.
2. Quan sát tiêu đề cột thứ 2 của bảng và nhãn tổng tiền phía dưới bảng.

## Expected result

Tiêu đề cột là "Đơn giá"; nhãn tổng tiền là "Tổng cộng".

## Actual result

Tiêu đề cột là **"Giá"** (`frontend-web/src/pages/Cart.jsx:36`); nhãn tổng tiền là **"Tổng tạm tính"** (`Cart.jsx:63`). Cả hai đều không khớp thuật ngữ SRS yêu cầu.

## Evidence

![BUG-CART-005](../screenshots/BUG-CART-005.png)

- HTML report: `tests/e2e/reports/html/cart-chromium/index.html` — test `TC-CART-001` (soft-fail trên cột "Đơn giá"), `TC-CART-006` (soft-fail trên nhãn "Tổng cộng").

## Notes

Lỗi cosmetic, không ảnh hưởng chức năng, nhưng vi phạm thuật ngữ nhất quán theo SRS — nên sửa cùng đợt với BUG-CART-007 (nhãn nút quay lại cũng không nhất quán).
