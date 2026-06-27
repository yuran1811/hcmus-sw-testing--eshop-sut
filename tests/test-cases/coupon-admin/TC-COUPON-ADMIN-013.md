# TC-COUPON-ADMIN-013: Xóa coupon theo ID hợp lệ → xóa thành công

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon Admin / Functional / Domain Testing

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Web Admin chạy tại `http://localhost:5174`
- Đăng nhập thành công với tài khoản Admin (`admin@eshop.com` / `Admin123!`).
- Đã tạo sẵn một mã giảm giá mẫu dành riêng cho việc xóa, ví dụ mã `DELETEME`.

## Test Data

- Coupon ID cần xóa: Một ID nguyên dương hợp lệ tương ứng với mã `DELETEME` (ví dụ: `id = 5`).

## Test Steps

1. Truy cập vào trang quản trị Web Admin `http://localhost:5174`.
2. Tại thanh menu bên trái, nhấp chọn tab "Mã Giảm Giá".
3. Xác định vị trí của mã `DELETEME` trong bảng danh sách mã giảm giá.
4. Bấm nút "Xóa" tương ứng với dòng của mã này.
5. Quan sát danh sách mã giảm giá tải lại sau thao tác.

## Expected Result

- Hệ thống thực hiện xóa thành công mã giảm giá mà không báo lỗi.
- Dòng chứa mã `DELETEME` biến mất khỏi danh sách mã giảm giá trên giao diện.
- Gửi yêu cầu kiểm tra tới database hoặc API `GET /api/coupons` xác nhận không còn tồn tại coupon có id tương ứng.

## Status / Related Bugs

Not Run / None
