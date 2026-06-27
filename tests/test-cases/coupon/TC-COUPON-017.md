# TC-COUPON-017: Nhất quán ngôn ngữ tiếng Việt của thông báo

## Requirement ID

FR-21 (Giao diện chung / Nhất quán ngôn ngữ), FR-09

## Module / Test type / Technique

Checkout / UI-UX / GUI Testing

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Frontend Web chạy tại `http://localhost:5173`
- Đăng nhập thành công với tài khoản test `test@eshop.com` / `Test1234!`.
- Đã thêm sản phẩm vào giỏ hàng sao cho tổng tiền của giỏ hàng là 400.000 ₫.

## Test Data

| Field        | Value        |
| ------------ | ------------ |
| code_valid   | `"SAVE10"`   |
| code_invalid | `"NOTEXIST"` |

## Test Steps

1. Truy cập vào trang Checkout `http://localhost:5173/checkout`.
2. Nhập mã giảm giá không hợp lệ `NOTEXIST` và bấm "Áp dụng". Quan sát ngôn ngữ của thông báo lỗi.
3. Nhập mã giảm giá hợp lệ `SAVE10` và bấm "Áp dụng". Quan sát ngôn ngữ của thông báo thành công.

## Expected Result

- Toàn bộ các thông báo phản hồi (thành công hay thất bại) đều phải hiển thị bằng tiếng Việt rõ ràng, dễ hiểu:
  - Khi nhập mã không tồn tại: Thông báo hiển thị bằng tiếng Việt, ví dụ: "Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa" (không hiển thị tiếng Anh như "Coupon not found" hay "Invalid coupon").
  - Khi áp dụng thành công: Thông báo hiển thị bằng tiếng Việt, ví dụ: "Áp dụng thành công!" hoặc tương tự.
- Giao diện nút bấm và placeholder cũng phải hiển thị tiếng Việt ("Áp dụng", "Nhập mã giảm giá...").

## Status / Related Bugs

Not Run / None
