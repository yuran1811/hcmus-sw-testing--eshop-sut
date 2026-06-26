# TC-ORDER-HISTORY-025: Hiển thị đầy đủ thông tin Phí vận chuyển và Coupon giảm giá trên trang Chi tiết Đơn hàng

## Requirement ID

FR-11, FR-21

## Module / Test type / Technique

order-history / Functional / Equivalence Partitioning

## Preconditions

- Tài khoản `test@eshop.com` đang đăng nhập và đứng tại trang Chi tiết đơn hàng `ORD-001`.
- Đơn hàng `ORD-001` được đặt trước đó với: Tổng tiền sản phẩm là 500.000 ₫, phí vận chuyển 30.000 ₫, áp dụng coupon giảm giá 50.000 ₫.

## Test data

| Parameter | Value |
| --- | --- |
| userSession | logged in as test@eshop.com |
| subtotal | 500.000 ₫ |
| shippingFee | 30.000 ₫ |
| discountAmount | -50.000 ₫ |
| finalTotal | 480.000 ₫ |

## Test steps

1. Đăng nhập và truy cập trực tiếp vào trang Chi tiết đơn hàng `ORD-001`.
2. Quan sát phần tổng kết tài chính (bảng thanh toán) hiển thị ở phía dưới danh sách sản phẩm.
3. Xác minh sự hiện diện của các trường: Tổng tiền sản phẩm, Phí vận chuyển, Giảm giá, Tổng cộng thanh toán và phương thức thanh toán.
4. Kiểm tra ngôn ngữ hiển thị và định dạng tiền tệ của các trường số tiền này.

## Expected result

- Hệ thống hiển thị đầy đủ và chính xác tất cả các cấu phần tài chính của đơn hàng:
  - Dòng "Tổng tiền sản phẩm" (hoặc tạm tính): `500.000 ₫`.
  - Dòng "Phí vận chuyển": `30.000 ₫` (nhất quán tiếng Việt, đúng ký hiệu `₫` và dấu chấm phân cách hàng nghìn).
  - Dòng "Giảm giá" (hoặc Coupon đã áp dụng): `-50.000 ₫`.
  - Dòng "Tổng số tiền thanh toán": `480.000 ₫` (tổng cộng chính xác sau khi cộng phí vận chuyển và trừ coupon).
- Toàn bộ giao diện sử dụng tiếng Việt 100%, không pha trộn từ tiếng Anh chưa dịch (FR-21).

## Status / Related bugs

Not Run / None
