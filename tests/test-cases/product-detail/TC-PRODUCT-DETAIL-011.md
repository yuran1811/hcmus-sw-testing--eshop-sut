# TC-PRODUCT-DETAIL-011: Quantity = 2 (IN, vừa trên min) -> được chấp nhận

## Requirement ID

FR-06

## Module / Test type / Technique

Product Detail / Functional / BVA (IN point)

## Preconditions

- Backend running at `http://localhost:3000`
- Frontend Web running at `http://localhost:5173`
- Default user `test@eshop.com` / `Test1234!` is logged in.
- A product with ID = 1 exists in the database.

## Test Data

| Field                      | Value |
| -------------------------- | ----- |
| product_id (URL parameter) | `1`   |
| quantity (form field)      | `2`   |

## Test Steps

1. Truy cập trang chi tiết sản phẩm qua URL: `http://localhost:5173/products/1`
2. Nhập giá trị số lượng là `2` vào ô nhập số lượng (giá trị vừa trên biên tối thiểu).
3. Bấm nút "Thêm vào giỏ hàng".
4. Quan sát các phản hồi trên giao diện (toast, badge giỏ hàng).

## Expected Result

- Hệ thống chấp nhận số lượng và thêm sản phẩm vào giỏ hàng thành công.
- Hiển thị thông báo thành công (toast notification) ví dụ: "Đã thêm sản phẩm vào giỏ hàng".
- Badge giỏ hàng được cập nhật tăng thêm 2 đơn vị.

## Status / Related Bugs

Not Run / None
