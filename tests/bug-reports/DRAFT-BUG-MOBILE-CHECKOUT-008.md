# [BUG][Mobile Checkout] Mã giảm giá có giá trị giảm cố định lớn hơn giá trị đơn hàng dẫn đến tổng tiền thanh toán bị âm

## Found by Test Case
TC-MOBILE-CHECKOUT-026

## Requirement liên quan
FR-20, FR-09

## Severity / Priority
Major / P1

## Environment
- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:8081
- Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## Steps to reproduce
1. Tạo một mã giảm giá cố định `BIGGIFT` có giá trị giảm `100.000 ₫` và giá trị đơn hàng tối thiểu là `50.000 ₫`.
2. Đăng nhập và thêm sản phẩm vào giỏ hàng sao cho tổng tiền giỏ hàng đạt `90.000 ₫` (thỏa mãn điều kiện đơn hàng tối thiểu của mã nhưng nhỏ hơn giá trị được giảm).
3. Đi tới màn hình Checkout.
4. Nhập mã `BIGGIFT` và nhấn "Áp dụng".

## Expected result
- Mã giảm giá được áp dụng thành công.
- Tổng thanh toán được cập nhật chính xác thành: `0 ₫` (giá trị đơn hàng tối thiểu không thể âm).

## Actual result
- Backend trả về tổng tiền thanh toán cuối cùng là `-10.000 ₫` (chấp nhận giá trị âm).
Nguyên nhân do logic tính toán số tiền thanh toán cuối cùng (sau khi trừ đi giá trị giảm giá của coupon) thiếu bước khống chế cận dưới bằng 0, dẫn đến việc chấp nhận tổng số tiền thanh toán là một số âm.


## Evidence
Kết quả từ kịch bản chạy thử nghiệm trên cơ sở dữ liệu:
```json
Apply coupon BIGGIFT status: 200
Response body: {
  success: true,
  coupon_id: 5,
  discount_amount: 100000,
  final_amount: -10000,
  message: 'Áp dụng thành công! Giảm 100,000 ₫'
}
```
- Video ghi nhận phiên kiểm thử: [mobile_coupon_calc_bug.webp](evidence/mobile_coupon_calc_bug.webp)


