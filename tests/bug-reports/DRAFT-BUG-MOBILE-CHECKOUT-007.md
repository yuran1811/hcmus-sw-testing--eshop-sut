# [BUG][Mobile Checkout] Lỗi tính toán sai lệch giá trị mã giảm giá dạng phần trăm (%) làm tăng giá trị đơn hàng gấp 10 lần

## Found by Test Case
TC-MOBILE-CHECKOUT-007

## Requirement liên quan
FR-20, FR-09

## Severity / Priority
Critical / P0

## Environment
- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:8081
- Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## Steps to reproduce
1. Đăng nhập và thêm sản phẩm vào giỏ hàng sao cho tổng tiền lớn hơn 300.000 ₫ (ví dụ: AirPods Pro 2 + MacBook Pro M3 + Samsung S24 Ultra, tổng tiền là 103.000.000 ₫).
2. Đi tới màn hình Checkout.
3. Nhập mã giảm giá phần trăm `SAVE10` (giảm 10%) và nhấn "Áp dụng".
4. Quan sát số tiền tiết kiệm và thành tiền.

## Expected result
- Tiết kiệm hiển thị: `10.300.000 ₫` (10% của 103M).
- Thành tiền hiển thị: `92.700.000 ₫`.

## Actual result
- Tiết kiệm hiển thị: `-927.000.000 ₫` (Số tiền âm!).
- Thành tiền hiển thị: `1.030.000.000 ₫` (Tăng gấp 10 lần!).
Lỗi xảy ra do backend (`backend/server.js` dòng 399-401 và dòng 419-421) tính giá trị giảm giá bằng công thức:
```javascript
discount_amount = Math.floor(total_amount * (1 - coupon.discount_value))
```
Vì `coupon.discount_value` trong DB được lưu dạng số nguyên là `10` (tức 10%), biểu thức `1 - 10` bằng `-9`, khiến số tiền được giảm thành số âm khổng lồ và cộng thêm vào tổng đơn hàng. Công thức đúng phải là:
```javascript
discount_amount = Math.floor(total_amount * (coupon.discount_value / 100))
```

## Evidence
Ảnh chụp màn hình Checkout sau khi áp dụng mã giảm giá: [mobile_coupon_applied_error.png](evidence/mobile_coupon_applied_error.png)
