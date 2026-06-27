# TC-COUPON-018: Bảo mật hiển thị — Xử lý an toàn chuỗi nhập vào (chống XSS)

## Requirement ID

SEC-04 (Bảo mật / Escape đầu vào), FR-21

## Module / Test type / Technique

Checkout / Security / Vulnerability Testing (XSS)

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Frontend Web chạy tại `http://localhost:5173`
- Đăng nhập thành công với tài khoản test `test@eshop.com` / `Test1234!`.
- Đã thêm sản phẩm vào giỏ hàng với tổng tiền bất kỳ (ví dụ: 400.000 ₫).

## Test Data

| Field | Value                             |
| ----- | --------------------------------- |
| code  | `"<script>alert('XSS')</script>"` |

## Test Steps

1. Truy cập vào trang Checkout `http://localhost:5173/checkout`.
2. Tại ô nhập mã giảm giá, nhập chuỗi độc hại: `<script>alert('XSS')</script>` hoặc `<img src=x onerror=alert(1)>`.
3. Bấm nút "Áp dụng".
4. Quan sát xem trình duyệt có bật lên hộp thoại cảnh báo (alert pop-up) hoặc render lỗi HTML không.

## Expected Result

- Hệ thống từ chối áp dụng mã giảm giá và báo lỗi bình thường (ví dụ: "Mã giảm giá không tồn tại...").
- Chuỗi độc hại hiển thị trên giao diện (nếu có hiển thị lại mã đã nhập hoặc thông báo lỗi chứa chuỗi này) phải được mã hóa/escape an toàn dạng plain text.
- Không được xuất hiện hộp thoại alert, không thực thi mã JavaScript độc hại dưới bất kỳ hình thức nào.

## Status / Related Bugs

Not Run / None
