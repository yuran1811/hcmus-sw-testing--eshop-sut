# TC-ORDER-HISTORY-021: Kiểm tra phân trang lịch sử đơn hàng - Số lượng đơn hàng đúng bằng kích thước trang

## Requirement ID

FR-11

## Module / Test type / Technique

order-history / Functional / Boundary Value Analysis (2-Point BVA)

## Preconditions

- Tài khoản `test@eshop.com` đang đăng nhập.
- Kích thước trang mặc định hiển thị đơn hàng là 5 đơn hàng/trang.
- Tài khoản này có đúng 5 đơn hàng trong cơ sở dữ liệu.

## Test data

| Parameter | Value |
| --- | --- |
| ordersInDB | 5 orders |
| pageSize | 5 |

## Test steps

1. Đăng nhập EShop bằng tài khoản `test@eshop.com` và truy cập trang "Lịch sử đơn hàng".
2. Quan sát bảng hiển thị và các nút điều khiển phân trang ở cuối trang.

## Expected result

- Hệ thống hiển thị bảng có đúng 5 dòng đơn hàng.
- Giao diện phân trang (các nút Trang trước, Trang sau, số trang 1, 2) hoàn toàn bị ẩn đi hoặc bị vô hiệu hóa (disabled) vì toàn bộ dữ liệu nằm trọn vẹn trong 1 trang duy nhất (BVA-PAGE-COUNT-1).

## Status / Related bugs

Not Run / None
