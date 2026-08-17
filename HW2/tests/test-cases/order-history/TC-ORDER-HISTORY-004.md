# TC-ORDER-HISTORY-004: Hiển thị trạng thái trang trống khi người dùng chưa có đơn hàng nào (Empty State - BVA: Count 0)

## Requirement ID

FR-11, FR-24

## Module / Test type / Technique

order-history / GUI Validation / Boundary Value Analysis (Order Count = 0)

## Preconditions

- Người dùng đã đăng nhập thành công vào tài khoản `newuser@eshop.com` (tài khoản mới đăng ký).
- Tài khoản này chưa thực hiện bất kỳ giao dịch mua sắm nào (0 đơn hàng trong cơ sở dữ liệu).

## Test data

| Parameter | Value |
| --- | --- |
| userSession | logged in as newuser@eshop.com |
| ordersInDB | 0 orders |

## Test steps

1. Đăng nhập vào EShop bằng tài khoản `newuser@eshop.com`.
2. Đi tới trang Lịch sử đơn hàng (`http://localhost:5173/orders`).
3. Quan sát giao diện trang.

## Expected result

- Trang Lịch sử đơn hàng không hiển thị bảng trống rỗng hoặc thông báo lỗi hệ thống.
- Hệ thống hiển thị giao diện **Trạng thái trống (Empty State)** chuẩn chỉnh theo đặc tả FR-24:
  - Có icon hoặc hình vẽ minh họa thân thiện biểu thị trạng thái không có dữ liệu.
  - Hiển thị thông báo thân thiện bằng tiếng Việt (ví dụ: "Bạn chưa có đơn hàng nào. Hãy mua sắm ngay!").
  - Có nút kêu gọi hành động (CTA) như "Tiếp tục mua sắm" điều hướng về trang danh sách sản phẩm.

## Status / Related bugs

Not Run / None
