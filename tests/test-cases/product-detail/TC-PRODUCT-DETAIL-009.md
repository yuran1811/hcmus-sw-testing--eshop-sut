# TC-PRODUCT-DETAIL-009: Quantity = "abc" (chuỗi ký tự không phải số) -> bị từ chối

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

| Field                      | Value   |
| -------------------------- | ------- |
| product_id (URL parameter) | `1`     |
| quantity (form field)      | `"abc"` |

## Test Steps

1. Truy cập trang chi tiết sản phẩm qua URL: `http://localhost:5173/products/1`
2. Nhập chuỗi ký tự `"abc"` vào ô nhập số lượng (hoặc nếu là input type="number", cố gắng sao chép/dán hoặc nhập ký tự chữ nếu trình duyệt cho phép).
3. Bấm nút "Thêm vào giỏ hàng".
4. Quan sát phản hồi trên giao diện.

## Expected Result

- Hệ thống từ chối thêm vào giỏ hàng.
- Hiển thị thông báo lỗi phù hợp (ví dụ: "Số lượng phải là số nguyên" hoặc báo lỗi định dạng số lượng không hợp lệ).
- Badge giỏ hàng không thay đổi.

## Status / Related Bugs

Not Run / None
