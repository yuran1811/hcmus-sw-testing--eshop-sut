# TC-PRODUCT-DETAIL-002: Product ID không tồn tại (9999) -> hiển thị thông báo lỗi phù hợp

## Requirement ID

FR-06

## Module / Test type / Technique

Product Detail / Functional / Domain Testing

## Preconditions

- Backend running at `http://localhost:3000`
- Frontend Web running at `http://localhost:5173`
- Default user `test@eshop.com` / `Test1234!` is logged in.
- Không có sản phẩm nào có ID = 9999 tồn tại trong cơ sở dữ liệu.

## Test Data

| Field                      | Value  |
| -------------------------- | ------ |
| product_id (URL parameter) | `9999` |

## Test Steps

1. Mở trình duyệt và truy cập trực tiếp trang chi tiết sản phẩm qua URL: `http://localhost:5173/products/9999`
2. Quan sát giao diện và thông báo lỗi hiển thị trên trang.

## Expected Result

- Giao diện không bị crash hay hiển thị màn hình trắng.
- Hệ thống hiển thị thông báo lỗi phù hợp trên UI (ví dụ: "Không tìm thấy sản phẩm", "Sản phẩm không tồn tại" hoặc lỗi 404).

## Status / Related Bugs

Not Run / None
