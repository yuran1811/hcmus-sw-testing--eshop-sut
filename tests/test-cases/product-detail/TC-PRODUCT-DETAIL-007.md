# TC-PRODUCT-DETAIL-007: Quantity = số thập phân (1.5) -> bị từ chối

## Requirement ID

FR-06

## Module / Test type / Technique

Product Detail / Functional / Domain Testing

## Preconditions

- Backend running at `http://localhost:3000`
- Frontend Web running at `http://localhost:5173`
- Default user `test@eshop.com` / `Test1234!` is logged in.
- A product with ID = 1 exists in the database.

## Test Data

| Field                      | Value |
| -------------------------- | ----- |
| product_id (URL parameter) | `1`   |
| quantity (form field)      | `1.5` |

## Test Steps

1. Truy cập trang chi tiết sản phẩm qua URL: `http://localhost:5173/products/1`
2. Nhập giá trị số lượng là `1.5` vào ô nhập số lượng.
3. Bấm nút "Thêm vào giỏ hàng".
4. Quan sát phản hồi và kiểm tra giỏ hàng.

## Expected Result

- Hệ thống từ chối hành động thêm vào giỏ hàng.
- Hiển thị thông báo lỗi phù hợp (ví dụ: "Số lượng phải là số nguyên").
- Badge giỏ hàng không thay đổi.

## Status / Related Bugs

Not Run / None
