# TC-COUPON-ADMIN-014: Xóa coupon theo ID không tồn tại → trả về lỗi (status 4xx)

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon Admin / Functional / Domain Testing

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Công cụ kiểm thử API (Postman, cURL, hoặc script kiểm thử) sẵn sàng để gửi yêu cầu trực tiếp.
- Đăng nhập thành công với tài khoản Admin và lấy được JWT Token.

## Test Data

- Endpoint: `DELETE http://localhost:3000/api/admin/coupons/999999` (với `999999` là một ID chắc chắn không tồn tại).

## Test Steps

1. Gửi một yêu cầu `DELETE` tới địa chỉ `http://localhost:3000/api/admin/coupons/999999`.
2. Đính kèm Token JWT của tài khoản admin vào Header: `Authorization: Bearer <admin_token>`.
3. Quan sát mã phản hồi (status code) và nội dung JSON phản hồi từ Backend.

## Expected Result

- Hệ thống phản hồi lỗi phù hợp, ví dụ: trả về mã lỗi `404 Not Found` (hoặc `400 Bad Request`) đi kèm với thông điệp báo lỗi rõ ràng. Nếu backend chỉ xử lý im lặng, nó cần trả về mã lỗi hợp lệ thay vì báo thành công giả tạo (200 OK nhưng thực tế không có gì bị xóa).

## Status / Related Bugs

Not Run / None
