# TC-MOBILE-CHECKOUT-024: Kiểm tra Tab Order và Keyboard Navigation trên màn hình Checkout Mobile

## Requirement ID

FR-21

## Module / Test type / Technique

mobile-checkout / GUI / Tab Order

## Preconditions

- Tài khoản `test@eshop.com` đã đăng nhập trên ứng dụng di động EShop.
- Giỏ hàng di động có sản phẩm và người dùng đang đứng ở màn hình Checkout (Thanh toán).

## Test data

| Parameter | Value |
| --- | --- |
| userSession | logged in as test@eshop.com |

## Test steps

1. Mở ứng dụng di động EShop, đăng nhập và điều hướng đến màn hình Checkout.
2. Nhấp chọn (focus) vào trường nhập liệu đầu tiên trên form thông tin giao hàng (trường "Họ và tên").
3. Nhấn phím điều hướng tiếp theo ("Next", "Go" hoặc biểu tượng mũi tên trên bàn phím ảo di động, hoặc phím "Tab" nếu dùng bàn phím cứng).
4. Quan sát sự chuyển dịch của con trỏ tập trung (focus indicator) qua các thành phần tiếp theo trên giao diện Checkout.
5. Tiếp tục nhấn phím điều hướng để di chuyển qua toàn bộ các trường nhập liệu và nút hành động trên màn hình.

## Expected result

- Thứ tự di chuyển tiêu điểm (focus flow) của bàn phím phải tuân thủ nghiêm ngặt quy tắc từ trên xuống dưới, từ trái sang phải (FR-21):
  1. Trường "Họ và tên" (Full Name)
  2. Trường "Số điện thoại" (Phone Number)
  3. Trường "Địa chỉ giao hàng" (Shipping Address)
  4. Ô nhập mã giảm giá (Coupon Input)
  5. Nút "Áp dụng" mã giảm giá (Apply Button)
  6. Nút "Đặt hàng" (Place Order Button)
- Tiêu điểm di chuyển trơn tru, không có hiện tượng nhảy cóc, bỏ sót bất kỳ trường nhập liệu nào, hoặc tự động cuộn màn hình bất thường.

## Status / Related bugs

Not Run / None
