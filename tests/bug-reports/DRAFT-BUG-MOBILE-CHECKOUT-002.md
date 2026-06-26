# [BUG][Mobile Checkout] Lỗ hổng bảo mật thay đổi tham số giá (Price Parameter Tampering) tại endpoint checkout

## Found by Test Case
TC-MOBILE-CHECKOUT-013

## Requirement liên quan
FR-20, FR-08

## Severity / Priority
Critical / P0

## Environment
- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:8081
- Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## Steps to reproduce
1. Đăng nhập tài khoản khách hàng `test@eshop.com`.
2. Thêm các sản phẩm vào giỏ hàng với tổng trị giá là 450.000 ₫.
3. Gửi một yêu cầu POST trực tiếp đến `/api/checkout` với payload bị can thiệp giá trị:
   ```json
   {
     "items": [{"id": 1, "quantity": 1}],
     "total_amount": 10000
   }
   ```
4. Kiểm tra phản hồi từ backend và kiểm tra cơ sở dữ liệu hoặc lịch sử đơn hàng.

## Expected result
Backend phải thực hiện tính toán và kiểm tra lại tổng giá trị của các sản phẩm (`items`) gửi lên đối chiếu với `total_amount`. Nếu có sự sai lệch giá trị, backend phải từ chối thanh toán và trả về lỗi `400 Bad Request`.

## Actual result
Backend chấp nhận hoàn toàn giá trị `total_amount: 10000` bị thao túng từ phía client, tạo đơn hàng thành công (`200 OK`) với tổng tiền 10.000 ₫ thay vì giá trị thực tế của sản phẩm.

## Evidence
Kết quả từ file kiểm thử API `tests/api_mobile_test.js`:
```json
Checkout response status: 200
Checkout response body: { message: 'Checkout successful', orderId: 2 }
```
Và trong lịch sử đơn hàng hiển thị đơn hàng có giá trị thao túng là 10.000 ₫.
