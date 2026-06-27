# TC-PRODUCT-DETAIL-015: Tên/mô tả sản phẩm chứa ký tự HTML đặc biệt (<script>, <img>) được hiển thị an toàn (escaped), không render HTML

## Requirement ID

FR-21 / SEC-04 (Security Requirements)

## Module / Test type / Technique

Product Detail / Security / Security Testing (XSS Prevention)

## Preconditions

- Backend running at `http://localhost:3000`
- Frontend Web running at `http://localhost:5173`
- Default user `test@eshop.com` / `Test1234!` is logged in.
- Một sản phẩm đặc biệt được thêm vào database có tên hoặc mô tả chứa mã HTML độc hại. Ví dụ:
  - ID = 2
  - Tên: `<script>alert('xss-name')</script> Sản phẩm XSS`
  - Mô tả: `<img src="invalid-image.jpg" onerror="alert('xss-desc')"> Mô tả sản phẩm chứa XSS`

## Test Data

| Field                      | Value |
| -------------------------- | ----- |
| product_id (URL parameter) | `2`   |

## Test Steps

1. Truy cập trang chi tiết sản phẩm qua URL: `http://localhost:5173/products/2`
2. Quan sát xem trình duyệt có hiển thị bất kỳ hộp thoại cảnh báo (alert dialog) nào không.
3. Quan sát giao diện hiển thị tên sản phẩm và mô tả sản phẩm.

## Expected Result

- Không có hộp thoại cảnh báo (alert) nào xuất hiện trên màn hình.
- Tên sản phẩm và mô tả hiển thị nguyên văn chuỗi văn bản thuần (ví dụ: hiển thị rõ chữ `<script>alert('xss-name')</script>...` và `<img...`) thay vì render thành mã script chạy ngầm hoặc thẻ hình ảnh.
- Dữ liệu được escape an toàn trước khi hiển thị trên UI (không dùng thuộc tính `dangerouslySetInnerHTML` hoặc `innerHTML` trực tiếp mà không sanitize).

## Status / Related Bugs

Not Run / None
