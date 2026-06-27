# TC-COUPON-008: Chưa đăng nhập hệ thống

## Requirement ID

FR-09

## Module / Test type / Technique

Checkout / Functional / Domain Testing

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Frontend Web chạy tại `http://localhost:5173`
- Người dùng chưa đăng nhập (hoặc JWT token bị xóa/hết hạn).
- Đã thêm sản phẩm vào giỏ hàng với tư cách khách (guest, nếu frontend hỗ trợ đi tới Checkout) hoặc trực tiếp gọi API `POST /api/apply-coupon` mà không có token/user_id hợp lệ.

## Test Data

| Field        | Value      |
| ------------ | ---------- |
| code         | `"SAVE10"` |
| total_amount | `400000`   |
| user_id      | `null`     |

## Test Steps

1. Với tư cách khách chưa đăng nhập, truy cập trang Checkout hoặc gửi request trực tiếp đến API `POST /api/apply-coupon` mà không truyền token trong header và `user_id` trong body.
2. Tại phần "Mã Giảm Giá", nhập `SAVE10` vào ô nhập liệu và nhấn "Áp dụng".
3. Quan sát phản hồi hoặc mã trạng thái HTTP trả về từ API.

## Expected Result

- Hệ thống từ chối áp dụng mã giảm giá.
- Trả về mã lỗi 401 Unauthorized từ API (hoặc thông báo yêu cầu đăng nhập trên giao diện người dùng).
- Số tiền giảm giá không được áp dụng.

## Status / Related Bugs

Not Run / None
