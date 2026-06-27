# TC-COUPON-ADMIN-026: Xử lý an toàn chuỗi nhập vào khi hiển thị mã coupon (chống XSS)

## Requirement ID

SEC-04 (Bảo mật / Escape đầu vào), FR-21

## Module / Test type / Technique

Coupon Admin / Security / Vulnerability Testing (XSS)

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Web Admin chạy tại `http://localhost:5174`
- Đăng nhập thành công với tài khoản Admin (`admin@eshop.com` / `Admin123!`).

## Test Data

- Để vượt qua validate UI uppercase tự động (nếu có), sử dụng API để gửi payload:
  ```json
  {
    "code": "<SCRIPT>ALERT('XSS')</SCRIPT>",
    "type": "percent",
    "discount_value": 15,
    "min_order_amount": 200000,
    "expired_at": "2099-12-31",
    "max_uses_per_user": 5
  }
  ```
- Hoặc nhập trực tiếp vào UI (nếu UI cho phép) chuỗi: `<SCRIPT>ALERT('XSS')</SCRIPT>`.

## Test Steps

1. Gửi yêu cầu `POST` tạo coupon trên bằng công cụ API hoặc nhập qua UI.
2. Đăng nhập vào Web Admin `http://localhost:5174` và điều hướng tới tab "Mã Giảm Giá".
3. Tải lại trang để danh sách mã giảm giá được lấy về và render lên UI.
4. Quan sát xem trình duyệt có bật hộp thoại cảnh báo (alert window) hay render lỗi cấu trúc HTML của bảng không.

## Expected Result

- Hệ thống không thực thi bất kỳ mã Javascript độc hại nào (không bật hộp thoại alert).
- Chuỗi `<SCRIPT>ALERT('XSS')</SCRIPT>` được hiển thị dưới dạng văn bản thuần túy (plain text) một cách an toàn trong bảng danh sách mã giảm giá.
- Cấu trúc giao diện HTML của bảng danh sách giữ nguyên, không bị phá vỡ.

## Status / Related Bugs

Not Run / None
