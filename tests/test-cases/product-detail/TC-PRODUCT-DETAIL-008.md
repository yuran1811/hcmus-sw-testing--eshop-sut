# TC-PRODUCT-DETAIL-008: Quantity = rỗng -> bị từ chối khi bấm "Thêm vào giỏ hàng"

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

| Field                      | Value       |
| -------------------------- | ----------- |
| product_id (URL parameter) | `1`         |
| quantity (form field)      | `""` (rỗng) |

## Test Steps

1. Truy cập trang chi tiết sản phẩm qua URL: `http://localhost:5173/products/1`
2. Xóa hết ký tự trong ô nhập số lượng để trống hoàn toàn.
3. Bấm nút "Thêm vào giỏ hàng".
4. Quan sát phản hồi trên giao diện.

## Expected Result

- Hệ thống từ chối thêm vào giỏ hàng.
- Hiển thị cảnh báo hoặc thông báo lỗi phù hợp (ví dụ: "Vui lòng nhập số lượng" hoặc thông báo yêu cầu trường bắt buộc).
- Badge giỏ hàng không thay đổi.

## Status / Related Bugs

Fail / [BUG][FR-06] TC-PRODUCT-DETAIL-005/006/007/008/009 - Quantity không hợp lệ vẫn được thêm vào giỏ
