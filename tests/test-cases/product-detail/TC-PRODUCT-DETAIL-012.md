# TC-PRODUCT-DETAIL-012: Chưa đăng nhập, bấm "Thêm vào giỏ hàng" -> bị từ chối (yêu cầu đăng nhập, API trả về 401)

## Requirement ID

FR-08 (Checkout / Cart requirements) / API Specification

## Module / Test type / Technique

Product Detail / Functional / Security Testing

## Preconditions

- Backend running at `http://localhost:3000`
- Frontend Web running at `http://localhost:5173`
- Người dùng chưa đăng nhập (hoặc đã đăng xuất, không có JWT token lưu trữ ở client).
- A product with ID = 1 exists in the database.

## Test Data

| Field                      | Value |
| -------------------------- | ----- |
| product_id (URL parameter) | `1`   |
| quantity (form field)      | `1`   |

## Test Steps

1. Đảm bảo rằng bạn chưa đăng nhập tài khoản (nếu đang đăng nhập, bấm nút "Đăng xuất").
2. Truy cập trang chi tiết sản phẩm qua URL: `http://localhost:5173/products/1`
3. Nhập số lượng là `1` và bấm nút "Thêm vào giỏ hàng".
4. Quan sát phản hồi trên giao diện và kiểm tra xem có yêu cầu đăng nhập hay không.

## Expected Result

- Hệ thống từ chối thêm sản phẩm vào giỏ hàng.
- Trình duyệt/UI hiển thị thông báo lỗi yêu cầu đăng nhập (hoặc tự động chuyển hướng người dùng đến trang Đăng nhập `/login`).
- Nếu kiểm tra Network Tab trên trình duyệt, API gửi yêu cầu thêm vào giỏ hàng `POST /api/cart` trả về mã lỗi `401 Unauthorized`.

## Status / Related Bugs

Not Run / None
