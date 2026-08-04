# TC-CHECKOUT-012: Tổng tiền Checkout là giá trị tự động và không thể chỉnh sửa trực tiếp

## Requirement ID

FR-08

## Module / Test type / Technique

Checkout Web UI + API / Functional-Security / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng đã đăng nhập trên Frontend Web.
- Giỏ có 1 "Tai nghe AirPods Pro 2" và 1 "Bàn phím cơ Keychron Q1", tổng đúng 10.000.000 ₫.
- Mở DevTools để quan sát request Checkout.

## Test data

| Field                  | Value          |
| ---------------------- | -------------- |
| Server/cart total      | `10000000`     |
| Attempted UI value     | `1`            |

## Test steps

1. Mở trang Checkout và xác nhận tổng ban đầu là 10.000.000 ₫.
2. Thử focus rồi sửa trường tổng bằng bàn phím, dán clipboard, phím tăng/giảm và thao tác chuột.
3. Nếu có thể sửa DOM phía client bằng DevTools, đổi giá trị hiển thị thành `1` rồi bấm xác nhận.
4. Kiểm tra request, response và tổng tiền đơn hàng trong DB.

## Expected result

- Điều khiển tổng tiền ở UI là read-only/disabled hoặc chỉ hiển thị text; mọi thao tác nhập trực tiếp không thay đổi `10000000`.
- Dù client/DOM bị can thiệp, backend không lưu `1`; backend dùng giỏ hàng phía máy chủ để tính lại `10000000` hoặc từ chối request sai lệch.
- Không có đơn hàng nào mang tổng tiền do người dùng tự sửa.

## EC / Partition Covered

- EC15 (Automatically calculated, non-editable checkout total)
- OC10 (Immutable UI total and server-side enforcement)

## Status / Related bugs

Not Run / N/A
