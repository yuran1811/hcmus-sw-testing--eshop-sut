# TC-ORDER-HISTORY-005: Hiển thị bảng đơn hàng khi người dùng có đúng 1 đơn hàng (Boundary State - BVA: Count 1)

## Requirement ID

FR-11

## Module / Test type / Technique

order-history / Functional / Boundary Value Analysis (Order Count = 1)

## Preconditions

- Người dùng đã đăng nhập thành công.
- Người dùng có duy nhất đúng 1 đơn hàng trong cơ sở dữ liệu.

## Test data

| Parameter | Value |
| --- | --- |
| ordersInDB | 1 order |

## Test steps

1. Đăng nhập vào hệ thống và đi tới trang Lịch sử đơn hàng (`http://localhost:5173/orders`).
2. Quan sát giao diện trang.

## Expected result

- Hệ thống hiển thị bảng lịch sử đơn hàng chứa chính xác 1 dòng dữ liệu của đơn hàng duy nhất đó.
- Giao diện Trạng thái trống (Empty State) tuyệt đối không xuất hiện.
- Thông tin đơn hàng (Mã đơn, Ngày đặt, Tổng tiền, Trạng thái) hiển thị đầy đủ và chính xác.

## Status / Related bugs

Not Run / None
