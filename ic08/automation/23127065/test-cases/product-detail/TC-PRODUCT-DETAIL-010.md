# TC-PRODUCT-DETAIL-010: Quantity = 1 (ON, đúng min=1) -> được chấp nhận; thêm vào giỏ thành công

## Requirement ID

FR-06

## Module / Test type / Technique

Product Detail / Functional / BVA (ON point)

## Preconditions

- Backend running at `http://localhost:3000`
- Frontend Web running at `http://localhost:5173`
- Default user `test@eshop.com` / `Test1234!` is logged in.
- A product with ID = 1 exists in the database.

## Test Data

| Field                      | Value |
| -------------------------- | ----- |
| product_id (URL parameter) | `1`   |
| quantity (form field)      | `1`   |

## Test Steps

1. Truy cập trang chi tiết sản phẩm qua URL: `http://localhost:5173/products/1`
2. Nhập giá trị số lượng là `1` vào ô nhập số lượng (đây là giá trị biên nhỏ nhất được chấp nhận).
3. Bấm nút "Thêm vào giỏ hàng".
4. Quan sát các phản hồi trên giao diện (toast, badge giỏ hàng).

## Expected Result

- Hệ thống chấp nhận số lượng và thêm sản phẩm vào giỏ hàng thành công.
- Hiển thị thông báo thành công (toast notification) ví dụ: "Đã thêm sản phẩm vào giỏ hàng".
- Badge giỏ hàng được cập nhật tăng thêm 1 đơn vị.

## Status / Related Bugs

Not Run / None
