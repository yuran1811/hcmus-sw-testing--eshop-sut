# TC-PRODUCT-DETAIL-005: Quantity = 0 -> bị từ chối (không thêm được vào giỏ)

## Requirement ID

FR-06

## Module / Test type / Technique

Product Detail / Functional / Domain Testing & BVA (OFF point)

## Preconditions

- Backend running at `http://localhost:3000`
- Frontend Web running at `http://localhost:5173`
- Default user `test@eshop.com` / `Test1234!` is logged in.
- A product with ID = 1 exists in the database.

## Test Data

| Field                      | Value |
| -------------------------- | ----- |
| product_id (URL parameter) | `1`   |
| quantity (form field)      | `0`   |

## Test Steps

1. Truy cập trang chi tiết sản phẩm qua URL: `http://localhost:5173/products/1`
2. Nhập giá trị số lượng là `0` vào ô nhập số lượng.
3. Bấm nút "Thêm vào giỏ hàng".
4. Quan sát phản hồi và kiểm tra giỏ hàng.

## Expected Result

- Hệ thống từ chối hành động thêm vào giỏ hàng.
- Hiển thị thông báo lỗi phù hợp (ví dụ: "Số lượng tối thiểu là 1" hoặc báo lỗi trên form/toast).
- Badge giỏ hàng không thay đổi (không được tăng số lượng).

## Status / Related Bugs

Not Run / None
