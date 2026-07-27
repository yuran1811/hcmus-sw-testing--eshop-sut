# TC-PRODUCT-DETAIL-003: Product ID không phải số ("abc") -> hiển thị lỗi phù hợp

## Requirement ID

FR-06

## Module / Test type / Technique

Product Detail / Functional / Domain Testing

## Preconditions

- Backend running at `http://localhost:3000`
- Frontend Web running at `http://localhost:5173`
- Default user `test@eshop.com` / `Test1234!` is logged in.

## Test Data

| Field                      | Value   |
| -------------------------- | ------- |
| product_id (URL parameter) | `"abc"` |

## Test Steps

1. Mở trình duyệt và truy cập trực tiếp trang chi tiết sản phẩm qua URL: `http://localhost:5173/products/abc`
2. Quan sát giao diện và thông báo lỗi hiển thị trên trang.

## Expected Result

- Giao diện không bị crash hay hiển thị màn hình trắng.
- Hệ thống xử lý lỗi định dạng ID không hợp lệ và hiển thị thông báo lỗi phù hợp (ví dụ: "Đường dẫn không hợp lệ", "Sản phẩm không tồn tại" hoặc lỗi 400/404).

## Status / Related Bugs

Not Run / None
