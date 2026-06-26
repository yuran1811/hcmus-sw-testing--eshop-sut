# [BUG][Mobile Checkout] Mã giảm giá SAVE10 từ chối đơn hàng có giá trị đúng bằng ngưỡng tối thiểu 300.000 ₫

## Found by Test Case
TC-MOBILE-CHECKOUT-005

## Requirement liên quan
FR-20

## Severity / Priority
Major / P1

## Environment
- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:8081
- Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## Steps to reproduce
1. Đăng nhập vào ứng dụng EShop Mobile bằng tài khoản `test@eshop.com`.
2. Thêm các sản phẩm vào giỏ hàng sao cho tổng giá trị đơn hàng đạt đúng 300.000 ₫.
3. Tiến hành thanh toán để vào màn hình Checkout.
4. Nhập mã giảm giá `SAVE10` (mã giảm giá có ngưỡng tối thiểu áp dụng là 300.000 ₫) và nhấn "Áp dụng".

## Expected result
Hệ thống áp dụng mã giảm giá `SAVE10` thành công vì tổng tiền đơn hàng (300.000 ₫) đạt đúng ngưỡng tối thiểu quy định (300.000 ₫).

## Actual result
Mã giảm giá bị từ chối với thông báo lỗi: `"Đơn hàng chưa đủ giá trị tối thiểu 300,000 ₫ để áp dụng mã này"`. Lỗi xảy ra do backend (server.js:379) sử dụng toán tử so sánh lớn hơn (`>`) thay vì lớn hơn hoặc bằng (`>=`): `total_amount > coupon.min_order_amount`.

## Evidence
Kết quả từ file kiểm thử API `tests/api_mobile_test.js`:
```json
Response 2b status: 400, body: {
  error: 'Đơn hàng chưa đủ giá trị tối thiểu 300,000 ₫ để áp dụng mã này'
}
```
